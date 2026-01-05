// components/Tables/Pagination/PaginationControls.tsx
'use client'

import React, { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/ui-elements/button'

type Props = {
    total: number
    limit: number
}

export default function PaginationControls({ total, limit }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [loadingLocal, setLoadingLocal] = useState(false)
    const [isPending, startTransition] = useTransition()

    const page = Number(searchParams.get('page') ?? 1) || 1

    const last = Math.max(1, Math.ceil(total / limit))

    const goto = (p: number) => {
        if (p < 1 || p > last) return

        const params = new URLSearchParams(searchParams)

        if (p <= 1) {
            params.delete('page')
        } else {
            params.set('page', String(p))
        }

        setLoadingLocal(true)

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
            // после смены URL начнётся навигация, компонент перерисуется;
            // можно полагаться на isPending, но локный флаг тоже ок
            setLoadingLocal(false)
        })
    }

    const loading = loadingLocal || isPending

    return (
        <div className="flex items-center gap-2 justify-end">
            <Button
                className="btn btn-primary"
                variant="dark"
                shape="full"
                size="soSmall"
                onClick={() => goto(page - 1)}
                disabled={page <= 1 || loading}
                label="Назад"
            />
            <span>{page} / {last}</span>
            <Button
                className="btn btn-primary"
                variant="dark"
                shape="full"
                size="soSmall"
                onClick={() => goto(page + 1)}
                disabled={page >= last || loading}
                label="Вперед"
            />
        </div>
    )
}
