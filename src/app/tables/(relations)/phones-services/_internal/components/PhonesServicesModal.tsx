'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Button } from '@/components/UI/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'
import { Select } from '@/components/FormElements/select'
import DatePicker from '@/components/FormElements/DatePicker/DatePicker'

export default function PhonesServicesModal({
    defaults = {},
    onClose
}: {
    defaults?: any,
    onClose: () => void
}) {
    const router = useRouter()
    const [form, setForm] = useState({
        id: defaults.id || undefined,
        phoneId: defaults.phoneId ?? '',
        serviceId: defaults.serviceId ?? '',
        connectDate: defaults.connectDate ?? '',
        paymentId: defaults.paymentId ?? '',
    })
    const [loading, setLoading] = useState(false)
    const [phones, setPhones] = useState<any[]>([])
    const [services, setServices] = useState<any[]>([])

    useEffect(() => {
        Promise.all([
            fetch('/api/tables/phones/list?limit=999').then(r => r.json()),
            fetch('/api/tables/services/list?limit=999').then(r => r.json()),
        ]).then(([phonesRes, servicesRes]) => {
            setPhones(phonesRes.items || [])
            setServices(servicesRes.items || [])
        }).catch(e => console.error('Ошибка при загрузке данных:', e))
    }, [])

    const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
        const value = typeof e === 'string' ? e : e.target.value
        setForm({ ...form, [field]: value })
    }

    async function submit() {
        setLoading(true)
        try {
            const submitData = {
                phoneId: form.phoneId ? Number(form.phoneId) : undefined,
                serviceId: form.serviceId ? Number(form.serviceId) : undefined,
                connectDate: form.connectDate || undefined,
                paymentId: form.paymentId || undefined,
            }

            const url = form.id
                ? `/api/tables/phones-services/${form.id}`
                : '/api/tables/phones-services'

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
                    ? 'Подключение услуги успешно обновлено!'
                    : 'Услуга успешно подключена!'
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
                        {form.id ? 'Редактировать подключение услуги' : 'Подключить услугу'}
                    </h3>
                    <button className="btn btn-ghost p-1" onClick={onClose}>✕</button>
                </header>

                <main className="space-y-4">
                    <Select
                        label="Номер телефона"
                        value={form.phoneId}
                        onChange={updateField('phoneId')}
                        items={[
                            { label: "Выберите номер", value: "" },
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
                            { label: "Выберите услугу", value: "" },
                            ...services.map(s => ({
                                label: s.name,
                                value: s.id
                            }))
                        ]}
                    />

                    <DatePicker
                        label="Дата подключения"
                        value={form.connectDate}
                        onChange={(v) => setForm({ ...form, connectDate: v })}
                    />

                    <InputGroup
                        label="ID платежа"
                        placeholder="Опциональное ID платежа"
                        type="text"
                        value={form.paymentId}
                        handleChange={updateField('paymentId')}
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
