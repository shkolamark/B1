import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const phoneServices = await prisma.phoneServices.findMany({
            include: { Phones: true, Services: true },
            orderBy: { id: 'asc' }
        })

        // CSV header
        const headers = ['id', 'phoneId', 'phoneNumber', 'serviceId', 'serviceName', 'connectDate', 'paymentId']
        const rows = phoneServices.map(ps => {
            const phoneNumber = ps.Phones?.number ?? ''
            const serviceName = ps.Services?.name ?? ''
            const connectDate = ps.connectDate ? new Date(ps.connectDate).toISOString().split('T')[0] : ''
            return [ps.id, ps.phoneId ?? '', phoneNumber, ps.serviceId ?? '', serviceName, connectDate, ps.paymentId ?? '']
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
                'Content-Disposition': 'attachment; filename="phones-services.csv"',
            },
        })
    } catch (err) {
        console.error(err)
        return new Response('Internal server error', { status: 500 })
    }
}
