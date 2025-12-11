'use client'
import React, { useState } from 'react'
import TransactionTypesModal from './TransactionTypesModal'
import { Button } from '@/components/UI/ui-elements/button'

export default function AddTransactionTypesButton() {
    const [open, setOpen] = useState(false)
    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
            <Button label="Добавить тип транзакции" variant="green" onClick={() => setOpen(true)} shape="full" className="whitespace-nowrap" />
            {open && <TransactionTypesModal onClose={() => setOpen(false)} />}
        </div>
    )
}