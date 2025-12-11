'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/UI/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'
import { Select } from '@/components/FormElements/select'

export default function PhonesFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
        clientId: searchParams.get('clientId') || '',
        tariffId: searchParams.get('tariffId') || '',
    })

    const [clients, setClients] = React.useState<any[]>([])
    const [tariffs, setTariffs] = React.useState<any[]>([])

    React.useEffect(() => {
        Promise.all([
            fetch('/api/tables/clients/list?limit=999').then(r => r.json()),
            fetch('/api/tables/tariffs/list?limit=999').then(r => r.json()),
        ]).then(([clientsRes, tariffsRes]) => {
            setClients(clientsRes.items || [])
            setTariffs(tariffsRes.items || [])
        }).catch(e => console.error('Ошибка:', e))
    }, [])

    const applyFilter = () => {
        const params = new URLSearchParams()
        if (filters.q) params.set('q', filters.q)
        if (filters.clientId) params.set('clientId', filters.clientId)
        if (filters.tariffId) params.set('tariffId', filters.tariffId)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    const resetFilter = () => {
        setFilters({ q: '', clientId: '', tariffId: '' })
        startTransition(() => {
            router.push(pathname)
        })
    }

    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card w-full'>
            <div className='flex gap-4 justify-between flex-wrap items-end'>
                <div className='flex gap-2'>
                    <InputGroup
                        label="Номер телефона"
                        placeholder="Поиск по номеру..."
                        type="text"
                        value={filters.q}
                        handleChange={(e) => setFilters({ ...filters, q: e.target.value })}
                    />

                    <Select
                        label="Клиент"
                        value={filters.clientId}
                        onChange={(e) => setFilters({ ...filters, clientId: e.target.value })}
                        items={[
                            { label: "Все клиенты", value: "" },
                            ...clients.map(c => ({
                                label: `${c.family} ${c.name}`,
                                value: c.id
                            }))
                        ]}
                    />

                    <Select
                        label="Тариф"
                        value={filters.tariffId}
                        onChange={(e) => setFilters({ ...filters, tariffId: e.target.value })}
                        items={[
                            { label: "Все тарифы", value: "" },
                            ...tariffs.map(t => ({
                                label: t.name,
                                value: t.id
                            }))
                        ]}
                    />
                </div>

                <div className='flex gap-2'>
                    <Button
                        label="Применить"
                        variant="primary"
                        shape="full"
                        onClick={applyFilter}
                        disabled={isPending}
                    />
                    <Button
                        label="Сброс"
                        variant="outlineDark"
                        shape="full"
                        onClick={resetFilter}
                        disabled={isPending}
                    />
                </div>
            </div>
        </div>
    )
}
