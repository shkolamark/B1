'use client'
import React, { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function ClientsFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [loadingLocal, setLoadingLocal] = useState(false)
    const [isPending, startTransition] = useTransition()
    const q0 = searchParams.get('q') ?? ''
    const sex0 = searchParams.get('sex') ?? ''
    const [q, setQ] = useState(q0)
    const [sex, setSex] = useState(sex0)

    async function applyFilter() {
        const params = new URLSearchParams(Object.fromEntries(searchParams.entries()))
        if (q) params.set('q', q); else params.delete('q')
        if (sex) params.set('sex', sex); else params.delete('sex')
        setLoadingLocal(true)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
            setLoadingLocal(false)
        })
    }

    async function resetFilter() {
        const params = new URLSearchParams(Object.fromEntries(searchParams.entries()))
        params.delete('q')
        params.delete('sex')
        setLoadingLocal(true)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
            setLoadingLocal(false)
        })
    }

    // `loading` - show either local loading started programatically or React transition pending
    const loading = loadingLocal || isPending

    return (
        <div className="flex items-center gap-2">
            <input
                className="input"
                placeholder="Поиск(ФИО/ID...)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <select className="input" value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Все</option>
                <option value="male">Муж</option>
                <option value="female">Жен</option>
            </select>
            <button className="btn" onClick={applyFilter} disabled={loading}>Применить</button>
            <button className="btn btn-ghost" onClick={resetFilter} disabled={loading}>Сброс</button>
            {loading && <div className="ml-2">Загрузка...</div>}
        </div>
    )
}
