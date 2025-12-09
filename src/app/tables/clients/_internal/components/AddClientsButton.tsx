'use client'
import React, { useState } from 'react'
import ClientsModal from './ClientsModal'
import { Button } from '@/components/ui-elements/button'

export default function AddClientsButton() {
    const [open, setOpen] = useState(false)
    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
            <Button label="Добавить клиента" variant="green" onClick={() => setOpen(true)} shape="full" className="whitespace-nowrap" />
            {open && <ClientsModal onClose={() => setOpen(false)} />}
        </div>
    )
}