import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const transactions = await prisma.paymentTransactions.findMany({
            include: { Clients: true, Phones: true, Services: true, TransactionTypes: true },
            orderBy: { id: 'asc' }
        })

        // CSV header
        const headers = ['id', 'clientId', 'clientName', 'phoneId', 'phoneNumber', 'serviceId', 'serviceName', 'transactionType', 'amount', 'minutesUsed', 'transactionDate', 'description']
        const rows = transactions.map(t => {
            const clientName = t.Clients ? `${t.Clients.family || ''} ${t.Clients.name || ''}`.trim() : ''
            const phoneNumber = t.Phones?.number ?? ''
            const serviceName = t.Services?.name ?? ''
            const transactionType = t.TransactionTypes?.name ?? ''
            const amount = Number(t.amount ?? 0)
            const transactionDate = t.transactionDate ? new Date(t.transactionDate).toISOString().split('T')[0] : ''
            return [t.id, t.clientId ?? '', clientName, t.phoneId ?? '', phoneNumber, t.serviceId ?? '', serviceName, transactionType, amount, t.minutesUsed ?? '', transactionDate, t.description ?? '']
        })

        const csvLines = [
            headers.join(','),
            ...rows.map(r => r.map(cell => {
                const s = String(cell)
                if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
                    return '"' + s.replace(/"/g, '""') + '"'
                }
                return s
            }).join(','))
        ]

        const csvBody = csvLines.join('\r\n')
        const csv = '\uFEFF' + csvBody

        return new Response(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename="transactions.csv"',
            },
        })
    } catch (err) {
        console.error(err)
        return new Response('Internal server error', { status: 500 })
    }
}
