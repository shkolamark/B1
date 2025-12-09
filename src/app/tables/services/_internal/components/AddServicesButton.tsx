'use client'
import React, { useState } from 'react'
import ServicesModal from './ServicesModal'
import { Button } from '@/components/ui-elements/button'

export default function AddServicesButton() {
    const [open, setOpen] = useState(false)
    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
            <Button label="Добавить услугу" variant="green" onClick={() => setOpen(true)} shape="full" className="whitespace-nowrap" />
            {open && <ServicesModal onClose={() => setOpen(false)} />}
        </div>
    )
}
