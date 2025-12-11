import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const clients = await prisma.clients.findMany({ orderBy: { id: 'asc' } })

        // CSV header
        const headers = ['id', 'family', 'name', 'secname', 'birthday', 'sex', 'notes', 'balance', 'isPositive']
        const rows = clients.map(c => {
            const birthday = c.birthday ? new Date(c.birthday).toISOString().split('T')[0] : ''
            const balance = Number((c.balance as any) ?? 0)
            return [c.id, c.family ?? '', c.name ?? '', c.secname ?? '', birthday, c.sex ?? '', c.notes ?? '', balance, c.isPositive ?? '']
        })

        const csvLines = [
            headers.join(','),
            ...rows.map(r => r.map(cell => {
                const s = String(cell)
                // escape quotes
                if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
                    return '"' + s.replace(/"/g, '""') + '"'
                }
                return s
            }).join(','))
        ]

        // Use CRLF line endings and prepend UTF-8 BOM so Excel opens Cyrillic correctly
        const csvBody = csvLines.join('\r\n')
        const csv = '\uFEFF' + csvBody

        return new Response(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename="clients.csv"',
            },
        })
    } catch (err) {
        console.error(err)
        return new Response('Internal server error', { status: 500 })
    }
}
