"use client"
import React, { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function PaginationControls({ total }: { total?: number }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [loadingLocal, setLoadingLocal] = useState(false)
    const [isPending, startTransition] = useTransition()
    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 50)
    const last = total ? Math.max(1, Math.ceil(total / limit)) : undefined

    const goto = async (p: number) => {
        const params = new URLSearchParams(Object.fromEntries(searchParams.entries()))
        if (p <= 1) { params.delete('page') } else { params.set('page', String(p)) }
        setLoadingLocal(true)
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
            setLoadingLocal(false)
        })
    }

    // loading state managed by component and React transition
    const loading = loadingLocal || isPending

    return (
        <div className="flex items-center gap-2 justify-end">
            <button className="btn btn-ghost" onClick={() => goto(page - 1)} disabled={page <= 1 || loading}>Prev</button>
            <span>{page}{last ? ` / ${last}` : ''}</span>
            <button className="btn btn-ghost" onClick={() => goto(page + 1)} disabled={(last && page >= last) || loading}>Next</button>
        </div>
    )
}
