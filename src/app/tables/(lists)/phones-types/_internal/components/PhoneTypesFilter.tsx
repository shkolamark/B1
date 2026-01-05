'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'

export default function PhoneTypesFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
    })

    const applyFilter = () => {
        const params = new URLSearchParams()
        if (filters.q) params.set('q', filters.q)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    const resetFilter = () => {
        setFilters({ q: '' })
        startTransition(() => {
            router.push(pathname)
        })
    }

    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card w-full'>
            <div className='flex gap-4 justify-between flex-wrap items-end'>
                <div className='flex gap-2'>
                    <InputGroup
                        label="Поиск по названию"
                        placeholder="Поиск..."
                        type="text"
                        value={filters.q}
                        handleChange={(e) => setFilters({ ...filters, q: e.target.value })}
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