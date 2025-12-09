'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'
import { Select } from '@/components/FormElements/select'

export default function TransactionsFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
        clientId: searchParams.get('clientId') || '',
        transactionTypeId: searchParams.get('transactionTypeId') || '',
    })

    const [clients, setClients] = React.useState<any[]>([])
    const [transactionTypes, setTransactionTypes] = React.useState<any[]>([])

    useEffect(() => {
        Promise.all([
            fetch('/api/tables/clients?limit=999').then(r => r.json()),
            fetch('/api/tables/transactions-types?limit=999').then(r => r.json()),
        ]).then(([clientsRes, typesRes]) => {
            setClients(clientsRes.items || [])
            setTransactionTypes(typesRes.items || [])
        }).catch(e => console.error('Ошибка загрузки фильтров:', e))
    }, [])

    const applyFilter = () => {
        const params = new URLSearchParams()
        if (filters.q) params.set('q', filters.q)
        if (filters.clientId) params.set('clientId', filters.clientId)
        if (filters.transactionTypeId) params.set('transactionTypeId', filters.transactionTypeId)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    const resetFilter = () => {
        setFilters({ q: '', clientId: '', transactionTypeId: '' })
        startTransition(() => {
            router.push(pathname)
        })
    }

    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card w-full'>
            <div className='flex gap-4 justify-between flex-wrap items-end'>
                <div className='flex gap-2'>
                    <InputGroup
                        label="Описание"
                        placeholder="Поиск по описанию..."
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
                        label="Тип транзакции"
                        value={filters.transactionTypeId}
                        onChange={(e) => setFilters({ ...filters, transactionTypeId: e.target.value })}
                        items={[
                            { label: "Все типы", value: "" },
                            ...transactionTypes.map(t => ({
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
