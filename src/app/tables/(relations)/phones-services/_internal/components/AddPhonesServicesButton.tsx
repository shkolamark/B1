'use client'
import React, { useState } from 'react'
import PhonesServicesModal from './PhonesServicesModal'
import { Button } from '@/components/UI/ui-elements/button'

export default function AddPhonesServicesButton() {
    const [open, setOpen] = useState(false)
    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
            <Button label="Добавить услугу к телефону" variant="green" onClick={() => setOpen(true)} shape="full" className="whitespace-nowrap" />
            {open && <PhonesServicesModal onClose={() => setOpen(false)} />}
        </div>
    )
}