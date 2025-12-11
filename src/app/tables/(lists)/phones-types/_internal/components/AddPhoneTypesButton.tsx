'use client'
import React, { useState } from 'react'
import PhoneTypesModal from './PhoneTypesModal'
import { Button } from '@/components/UI/ui-elements/button'

export default function AddPhoneTypesButton() {
    const [open, setOpen] = useState(false)
    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
            <Button label="Добавить тип телефона" variant="green" onClick={() => setOpen(true)} shape="full" className="whitespace-nowrap" />
            {open && <PhoneTypesModal onClose={() => setOpen(false)} />}
        </div>
    )
}