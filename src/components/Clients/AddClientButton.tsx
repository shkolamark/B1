'use client'
import React, { useState } from 'react'
import ClientModal from './ClientModal'

export default function AddClientButton() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button className="btn" onClick={() => setOpen(true)}>Добавить клиента</button>
            {open && <ClientModal onClose={() => setOpen(false)} />}
        </>
    )
}
