'use client'
import React, { useState } from 'react'
import TransactionsModal from './TransactionsModal'
import { Button } from '@/components/ui-elements/button'

export default function AddTransactionsButton() {
    const [open, setOpen] = useState(false)
    return (
        <div className='rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card'>
            <Button label="Добавить транзакцию" variant="green" onClick={() => setOpen(true)} shape="full" className="whitespace-nowrap" />
            {open && <TransactionsModal onClose={() => setOpen(false)} />}
        </div>
    )
}
