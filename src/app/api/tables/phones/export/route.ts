import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const phones = await prisma.phones.findMany({
            include: { Clients: true, PhoneTypes: true, Tariffs: true },
            orderBy: { id: 'asc' }
        })

        // CSV header
        const headers = ['id', 'clientId', 'clientName', 'number', 'phoneType', 'tariff']
        const rows = phones.map(p => {
            const clientName = p.Clients ? `${p.Clients.family || ''} ${p.Clients.name || ''}`.trim() : ''
            const phoneType = p.PhoneTypes?.name ?? ''
            const tariff = p.Tariffs?.name ?? ''
            return [p.id, p.clientId ?? '', clientName, p.number ?? '', phoneType, tariff]
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
                'Content-Disposition': 'attachment; filename="phones.csv"',
            },
        })
    } catch (err) {
        console.error(err)
        return new Response('Internal server error', { status: 500 })
    }
}
