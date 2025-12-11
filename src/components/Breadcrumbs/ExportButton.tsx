"use client"
import React from 'react'
import { Button } from '@/components/ui-elements/button'
import excelImg from '@/assets/excel.png'

type Props = {
    exportPath?: string
    fileName?: string
}

export default function ExportButton({ exportPath = '/api/tables/clients/export', fileName = 'clients.csv' }: Props) {
    const handleExport = async () => {
        try {
            const res = await fetch(exportPath)
            if (!res.ok) throw new Error('Export failed')
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Export error', err)
            // optionally show toast
        }
    }

    const excelIcon = (
        <img src={excelImg.src} alt="excel" className="w-4 h-4" />
    )

    return (
        <Button label="" icon={excelIcon} variant="green" shape="full" size="soSmall" onClick={handleExport} />
    )
}
