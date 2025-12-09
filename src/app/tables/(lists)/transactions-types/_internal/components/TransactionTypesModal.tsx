'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'

export default function TransactionTypesModal({
    defaults = {},
    onClose
}: {
    defaults?: any,
    onClose: () => void
}) {
    const router = useRouter()
    const [form, setForm] = useState({
        id: defaults.id || undefined,
        name: defaults.name ?? '',
        description: defaults.description ?? '',
    })
    const [loading, setLoading] = useState(false)

    const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [field]: e.target.value })
    }

    async function submit() {
        setLoading(true)
        try {
            const submitData = {
                name: form.name,
                description: form.description || undefined,
            }

            const url = form.id
                ? `/api/tables/transactions-types/${form.id}`
                : '/api/tables/transactions-types'

            const method = form.id ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `Ошибка ${response.status}`)
            }

            toast.success(
                form.id
                    ? 'Тип транзакции успешно обновлен!'
                    : 'Тип транзакции успешно добавлен!'
            )

            router.refresh()
            onClose()

        } catch (e: any) {
            console.error(e)
            toast.error(e.message || 'Произошла ошибка при сохранении')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-dark rounded-lg shadow-lg w-[500px] p-7.5 max-h-[90vh] overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">
                        {form.id ? 'Редактировать тип транзакции' : 'Добавить тип транзакции'}
                    </h3>
                    <button className="btn btn-ghost p-1" onClick={onClose}>✕</button>
                </header>

                <main className="space-y-4">
                    <InputGroup
                        label="Название"
                        placeholder="Например: Пополнение, Платеж, Возврат"
                        type="text"
                        value={form.name}
                        handleChange={updateField('name')}
                    />

                    <InputGroup
                        label="Описание"
                        placeholder="Опциональное описание типа транзакции"
                        type="textarea"
                        value={form.description}
                        handleChange={updateField('description')}
                    />
                </main>

                <footer className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        label="Отмена"
                        variant="outlineDark"
                        shape="full"
                        onClick={onClose}
                        disabled={loading}
                    />
                    <Button
                        label={loading ? 'Сохраняем...' : 'Сохранить'}
                        shape="full"
                        onClick={submit}
                        disabled={loading}
                    />
                </footer>
            </div>
        </div>
    )
}