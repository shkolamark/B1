import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') ?? ''
    const clientId = url.searchParams.get('clientId')
    const page = Number(url.searchParams.get('page') ?? 1)
    const limit = Number(url.searchParams.get('limit') ?? 50)

    const where: any = {}
    if (q) {
        where.OR = [
            { number: { contains: q, mode: 'insensitive' } },
            { Clients: { some: { family: { contains: q, mode: 'insensitive' } } } },
        ]
    }
    if (clientId) where.clientId = Number(clientId)

    const [items, total] = await Promise.all([
        prisma.phones.findMany({ where, include: { Clients: true, PhoneTypes: true, Tariffs: true }, skip: (page - 1) * limit, take: limit }),
        prisma.phones.count({ where }),
    ])

    console.log('Fetched phones:', items);

    return NextResponse.json({ items, total })
}

export async function POST(request: Request) {
    const data = await request.json()
    const created = await prisma.phones.create({ data })
    return NextResponse.json(created, { status: 201 })
}
