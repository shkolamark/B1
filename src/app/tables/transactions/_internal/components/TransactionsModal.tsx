'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'
import { Select } from '@/components/FormElements/select'
import DatePicker from '@/components/FormElements/DatePicker/DatePicker'

export default function TransactionsModal({
    defaults = {},
    onClose
}: {
    defaults?: any,
    onClose: () => void
}) {
    const router = useRouter()
    const [form, setForm] = useState({
        id: defaults.id || undefined,
        clientId: defaults.clientId ?? '',
        phoneId: defaults.phoneId ?? '',
        serviceId: defaults.serviceId ?? '',
        transactionTypeId: defaults.transactionTypeId ?? '',
        amount: defaults.amount ?? '',
        minutesUsed: defaults.minutesUsed ?? '',
        transactionDate: defaults.transactionDate ?? '',
        description: defaults.description ?? '',
    })
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState<any[]>([])
    const [phones, setPhones] = useState<any[]>([])
    const [services, setServices] = useState<any[]>([])
    const [transactionTypes, setTransactionTypes] = useState<any[]>([])

    useEffect(() => {
        Promise.all([
            fetch('/api/tables/clients?limit=999').then(r => r.json()),
            fetch('/api/tables/phones?limit=999').then(r => r.json()),
            fetch('/api/tables/services?limit=999').then(r => r.json()),
            fetch('/api/tables/transactions-types?limit=999').then(r => r.json()),
        ]).then(([clientsRes, phonesRes, servicesRes, typesRes]) => {
            setClients(clientsRes.items || [])
            setPhones(phonesRes.items || [])
            setServices(servicesRes.items || [])
            setTransactionTypes(typesRes.items || [])
        }).catch(e => console.error('Ошибка при загрузке данных:', e))
    }, [])

    const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = ['clientId', 'phoneId', 'serviceId', 'transactionTypeId', 'minutesUsed'].includes(field)
            ? (e.target.value ? Number(e.target.value) : '')
            : e.target.value
        setForm({ ...form, [field]: value })
    }

    async function submit() {
        setLoading(true)
        try {
            const submitData = {
                clientId: form.clientId ? Number(form.clientId) : undefined,
                phoneId: form.phoneId ? Number(form.phoneId) : undefined,
                serviceId: form.serviceId ? Number(form.serviceId) : undefined,
                transactionTypeId: form.transactionTypeId ? Number(form.transactionTypeId) : undefined,
                amount: form.amount ? form.amount : undefined,
                minutesUsed: form.minutesUsed ? Number(form.minutesUsed) : undefined,
                transactionDate: form.transactionDate ? new Date(form.transactionDate) : undefined,
                description: form.description || undefined,
            }

            const url = form.id
                ? `/api/tables/transactions/${form.id}`
                : '/api/tables/transactions'

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
                    ? 'Транзакция успешно обновлена!'
                    : 'Транзакция успешно добавлена!'
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
                        {form.id ? 'Редактировать транзакцию' : 'Добавить транзакцию'}
                    </h3>
                    <button className="btn btn-ghost p-1" onClick={onClose}>✕</button>
                </header>

                <main className="space-y-4">
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
                        label="Телефон"
                        value={form.phoneId}
                        onChange={updateField('phoneId')}
                        items={[
                            { label: "Не выбран", value: "" },
                            ...phones.map(p => ({
                                label: p.number,
                                value: p.id
                            }))
                        ]}
                    />

                    <Select
                        label="Услуга"
                        value={form.serviceId}
                        onChange={updateField('serviceId')}
                        items={[
                            { label: "Не выбрана", value: "" },
                            ...services.map(s => ({
                                label: s.name,
                                value: s.id
                            }))
                        ]}
                    />

                    <Select
                        label="Тип транзакции"
                        value={form.transactionTypeId}
                        onChange={updateField('transactionTypeId')}
                        items={[
                            { label: "Не выбран", value: "" },
                            ...transactionTypes.map(t => ({
                                label: t.name,
                                value: t.id
                            }))
                        ]}
                    />

                    <InputGroup
                        label="Сумма"
                        placeholder="0.00"
                        type="number"
                        value={form.amount}
                        handleChange={updateField('amount')}
                    />

                    <InputGroup
                        label="Использовано минут"
                        placeholder="0"
                        type="number"
                        value={form.minutesUsed}
                        handleChange={updateField('minutesUsed')}
                    />

                    <DatePicker
                        label="Дата транзакции"
                        value={form.transactionDate}
                        onChange={(v) => setForm({ ...form, transactionDate: v })}
                    />

                    <InputGroup
                        label="Описание"
                        placeholder="Описание"
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
