'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import ClientModal from '@/components/Clients/ClientModal'

export default function RowActions({ row }: { row: any }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    async function onDelete() {
        if (!confirm('Удалить запись?')) return
        setDeleting(true)
        try {
            await axios.delete(`/api/tables/clients/${row.id}`)
            router.refresh()
        } catch (e) {
            console.error(e)
            alert('Ошибка при удалении')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="flex gap-2 items-center justify-center">
            <button className="btn btn-ghost" onClick={() => setIsOpen(true)}>Изменить</button>
            <button className="btn btn-danger" onClick={onDelete} disabled={deleting}>{deleting ? 'Удаление...' : 'Удалить'}</button>
            {isOpen && <ClientModal defaults={row} onClose={() => setIsOpen(false)} />}
        </div>
    )
}
