'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui-elements/button'
import InputGroup from '@/components/FormElements/InputGroup'
import { Select } from '@/components/FormElements/select'
import DatePicker from '@/components/FormElements/DatePicker/DatePicker'

export default function ClientsFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
        sex: searchParams.get('sex') || '',
        birthdayFrom: searchParams.get('birthdayFrom') || '',
        birthdayTo: searchParams.get('birthdayTo') || '',
    })

    const applyFilter = () => {
        const params = new URLSearchParams()
        if (filters.q) params.set('q', filters.q)
        if (filters.sex) params.set('sex', filters.sex)
        if (filters.birthdayFrom) params.set('birthdayFrom', filters.birthdayFrom)
        if (filters.birthdayTo) params.set('birthdayTo', filters.birthdayTo)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    const resetFilter = () => {
        setFilters({ q: '', sex: '', birthdayFrom: '', birthdayTo: '' })
        startTransition(() => {
            router.push(pathname)
        })
    }

    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card w-full'>
            <div className='flex gap-4 justify-between flex-wrap  items-end'>
                <div className='flex gap-2'>
                    <InputGroup
                        label="ФИО"
                        placeholder="Поиск по имени или фамилии"
                        type="text"
                        value={filters.q}
                        handleChange={(e) => setFilters({ ...filters, q: e.target.value })}
                    />

                    <Select
                        label="Пол"
                        value={filters.sex}
                        onChange={(e) => setFilters({ ...filters, sex: e.target.value })}
                        items={[
                            { label: "Все", value: "" },
                            { label: "Мужской", value: "M" },
                            { label: "Женский", value: "F" },
                        ]}
                    />
                    <DatePicker
                        label="Дата рождения с"
                        value={filters.birthdayFrom}
                        onChange={(date) => setFilters({ ...filters, birthdayFrom: date })}

                    />
                    <DatePicker
                        label="Дата рождения по"
                        value={filters.birthdayTo}
                        onChange={(date) => setFilters({ ...filters, birthdayTo: date })}
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
                        shape="full"
                        variant="outlineDark"
                        onClick={resetFilter}
                        disabled={isPending}
                    />
                </div>
            </div>
        </div>
    )
}