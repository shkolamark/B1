import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const transactionTypes = await prisma.transactionTypes.findMany({ orderBy: { id: 'asc' } })

        // CSV header
        const headers = ['id', 'name']
        const rows = transactionTypes.map(tt => {
            return [tt.id, tt.name ?? '']
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
                'Content-Disposition': 'attachment; filename="transactions-types.csv"',
            },
        })
    } catch (err) {
        console.error(err)
        return new Response('Internal server error', { status: 500 })
    }
}
