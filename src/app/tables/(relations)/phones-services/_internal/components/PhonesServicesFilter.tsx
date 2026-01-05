'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/ui-elements/button'
import { Select } from '@/components/FormElements/select'

export default function PhonesServicesFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const [filters, setFilters] = useState({
        phoneId: searchParams.get('phoneId') || '',
        serviceId: searchParams.get('serviceId') || '',
    })
    const [phones, setPhones] = useState<any[]>([])
    const [services, setServices] = useState<any[]>([])

    useEffect(() => {
        Promise.all([
            fetch('/api/tables/phones/list?limit=999').then(r => r.json()),
            fetch('/api/tables/services/list?limit=999').then(r => r.json()),
        ]).then(([phonesRes, servicesRes]) => {
            setPhones(phonesRes.items || [])
            setServices(servicesRes.items || [])
        }).catch(e => console.error('Ошибка:', e))
    }, [])

    const applyFilter = () => {
        const params = new URLSearchParams()
        if (filters.phoneId) params.set('phoneId', filters.phoneId)
        if (filters.serviceId) params.set('serviceId', filters.serviceId)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    const resetFilter = () => {
        setFilters({ phoneId: '', serviceId: '' })
        startTransition(() => {
            router.push(pathname)
        })
    }

    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card w-full'>
            <div className='flex gap-4 justify-between flex-wrap items-end'>
                <div className='flex gap-2'>
                    <Select
                        label="Номер телефона"
                        value={filters.phoneId}
                        onChange={(e) => setFilters({ ...filters, phoneId: e.target.value })}
                        items={[
                            { label: "Все номера", value: "" },
                            ...phones.map(p => ({
                                label: p.number,
                                value: p.id
                            }))
                        ]}
                    />

                    <Select
                        label="Услуга"
                        value={filters.serviceId}
                        onChange={(e) => setFilters({ ...filters, serviceId: e.target.value })}
                        items={[
                            { label: "Все услуги", value: "" },
                            ...services.map(s => ({
                                label: s.name,
                                value: s.id
                            }))
                        ]}
                    />
                </div>

                <div className='flex gap-2'>
                    <Button
                        label="Применить"
                        variant="primary"
                        onClick={applyFilter}
                        disabled={isPending}
                        shape="full"
                    />
                    <Button
                        label="Сброс"
                        variant="outlineDark"
                        onClick={resetFilter}
                        disabled={isPending}
                        shape="full"
                    />
                </div>
            </div>
        </div>
    )
}