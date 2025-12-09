'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'
import { Select } from '@/components/FormElements/select'

export default function PhonesModal({
    defaults = {},
    onClose
}: {
    defaults?: any,
    onClose: () => void
}) {
    const router = useRouter()
    const [form, setForm] = useState({
        id: defaults.id || undefined,
        number: defaults.number ?? '',
        clientId: defaults.clientId ?? '',
        phoneTypeId: defaults.phoneTypeId ?? '',
        tariffId: defaults.tariffId ?? '',
    })
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState<any[]>([])
    const [phoneTypes, setPhoneTypes] = useState<any[]>([])
    const [tariffs, setTariffs] = useState<any[]>([])

    useEffect(() => {
        Promise.all([
            fetch('/api/tables/clients?limit=999').then(r => r.json()),
            fetch('/api/tables/phones-types?limit=999').then(r => r.json()),
            fetch('/api/tables/tariffs?limit=999').then(r => r.json()),
        ]).then(([clientsRes, typesRes, tariffsRes]) => {
            setClients(clientsRes.items || [])
            setPhoneTypes(typesRes.items || [])
            setTariffs(tariffsRes.items || [])
        }).catch(e => console.error('Ошибка при загрузке данных:', e))
    }, [])

    const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = field === 'clientId' || field === 'phoneTypeId' || field === 'tariffId'
            ? (e.target.value ? Number(e.target.value) : '')
            : e.target.value
        setForm({ ...form, [field]: value })
    }

    async function submit() {
        setLoading(true)
        try {
            const submitData = {
                number: form.number,
                clientId: form.clientId ? Number(form.clientId) : undefined,
                phoneTypeId: form.phoneTypeId ? Number(form.phoneTypeId) : undefined,
                tariffId: form.tariffId ? Number(form.tariffId) : undefined,
            }

            const url = form.id
                ? `/api/tables/phones/${form.id}`
                : '/api/tables/phones'

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
                    ? 'Телефон успешно обновлен!'
                    : 'Телефон успешно добавлен!'
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
                        {form.id ? 'Редактировать телефон' : 'Добавить телефон'}
                    </h3>
                    <button className="btn btn-ghost p-1" onClick={onClose}>✕</button>
                </header>

                <main className="space-y-4">
                    <InputGroup
                        label="Номер"
                        placeholder="+7 (XXX) XXX-XXXX"
                        type="text"
                        value={form.number}
                        handleChange={updateField('number')}
                    />

                    <Select
                        label="Клиент"
                        value={form.clientId}
                        onChange={updateField('clientId')}
                        items={[
                            { label: "Не выбран", value: "" },
                            ...clients.map(c => ({
                                label: `${c.family} ${c.name}`,
                                value: c.id
                            }))
                        ]}
                    />

                    <Select
                        label="Тип телефона"
                        value={form.phoneTypeId}
                        onChange={updateField('phoneTypeId')}
                        items={[
                            { label: "Не выбран", value: "" },
                            ...phoneTypes.map(t => ({
                                label: t.name,
                                value: t.id
                            }))
                        ]}
                    />

                    <Select
                        label="Тариф"
                        value={form.tariffId}
                        onChange={updateField('tariffId')}
                        items={[
                            { label: "Не выбран", value: "" },
                            ...tariffs.map(t => ({
                                label: t.name,
                                value: t.id
                            }))
                        ]}
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
