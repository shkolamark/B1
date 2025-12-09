'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function RowActions({
    row,
    modalComponent: ModalComponent,
    apiPath,
    successMessage = 'Запись успешно удалена!',
    errorMessage = 'Ошибка при удалении'
}: {
    row: any
    modalComponent: React.ComponentType<{ defaults?: any; onClose: () => void }>
    apiPath: string
    successMessage?: string
    errorMessage?: string
}) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    async function onDelete() {
        if (!confirm('Удалить запись?')) return
        setDeleting(true)
        try {
            await axios.delete(`${apiPath}/${row.id}`)
            toast.success(successMessage)
            router.refresh()
        } catch (e) {
            console.error(e)
            toast.error(errorMessage)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="flex items-center justify-start">
            <button className="btn btn-ghost text-primary mr-5" onClick={() => setIsOpen(true)}>Изменить</button>
            <button className="btn btn-danger text-red-600" onClick={onDelete} disabled={deleting}>
                {deleting ? 'Удаление...' : 'Удалить'}
            </button>
            {isOpen && <ModalComponent defaults={row} onClose={() => setIsOpen(false)} />}
        </div>
    )
}
