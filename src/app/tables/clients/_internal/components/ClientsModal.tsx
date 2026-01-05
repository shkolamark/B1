'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'
import { Select } from '@/components/FormElements/select'
import DatePicker from '@/components/FormElements/DatePicker/DatePicker'

export default function ClientsModal({
    defaults = {},
    onClose
}: {
    defaults?: any,
    onClose: () => void
}) {
    const router = useRouter()
    const [form, setForm] = useState({
        id: defaults.id || undefined,
        family: defaults.family ?? '',
        name: defaults.name ?? '',
        secname: defaults.secname ?? '',
        birthday: defaults.birthday ?? '',
        sex: defaults.sex ?? '',
        balance: defaults.balance ?? '',
        notes: defaults.notes ?? '',
    })
    const [loading, setLoading] = useState(false)

    const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [field]: e.target.value })
    }

    async function submit() {
        setLoading(true)
        try {
            const submitData = {
                family: form.family,
                name: form.name,
                secname: form.secname || undefined,
                birthday: form.birthday || undefined,
                sex: form.sex || undefined,
                balance: form.balance ? Number(form.balance) : undefined,
                notes: form.notes || undefined,
            }

            const url = form.id
                ? `/api/tables/clients/${form.id}`
                : '/api/tables/clients'

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
                    ? 'Клиент успешно обновлен!'
                    : 'Клиент успешно добавлен!'
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
                        {form.id ? 'Редактировать клиента' : 'Добавить клиента'}
                    </h3>
                    <button className="btn btn-ghost p-1" onClick={onClose}>✕</button>
                </header>

                <main className="space-y-4">
                    <InputGroup
                        label="Фамилия"
                        placeholder="Фамилия"
                        type="text"
                        value={form.family}
                        handleChange={updateField('family')}
                    />
                    <InputGroup
                        label="Имя"
                        placeholder="Имя"
                        type="text"
                        value={form.name}
                        handleChange={updateField('name')}
                    />
                    <InputGroup
                        label="Отчество"
                        placeholder="Отчество"
                        type="text"
                        value={form.secname}
                        handleChange={updateField('secname')}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <DatePicker
                            label="Дата рождения"
                            value={form.birthday}
                            onChange={(v) => setForm({ ...form, birthday: v })}
                        />
                        <Select
                            label="Пол"
                            value={form.sex}
                            onChange={(e) => setForm({ ...form, sex: e.target.value })}
                            items={[
                                { label: "Не указан", value: "" },
                                { label: "Муж", value: "male" },
                                { label: "Жен", value: "female" },
                            ]}
                        />
                    </div>

                    <InputGroup
                        label="Баланс"
                        placeholder="0.00"
                        type="number"
                        value={form.balance}
                        handleChange={updateField('balance')}
                    />

                    <InputGroup
                        label="Примечания"
                        placeholder="Примечания"
                        type="textarea"
                        value={form.notes}
                        handleChange={updateField('notes')}
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