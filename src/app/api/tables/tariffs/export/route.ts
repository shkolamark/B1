import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const tariffs = await prisma.tariffs.findMany({ orderBy: { id: 'asc' } })

        // CSV header
        const headers = ['id', 'name', 'monthlyFee', 'minutesIncluded', 'pricePerMinOver', 'description']
        const rows = tariffs.map(t => {
            return [t.id, t.name ?? '', t.monthlyFee ?? '', t.minutesIncluded ?? '', t.pricePerMinOver ?? '', t.description ?? '']
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
                'Content-Disposition': 'attachment; filename="tariffs.csv"',
            },
        })
    } catch (err) {
        console.error(err)
        return new Response('Internal server error', { status: 500 })
    }
}
