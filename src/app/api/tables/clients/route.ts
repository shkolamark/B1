import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') ?? ''
    const sex = url.searchParams.get('sex') ?? ''
    const minBalance = url.searchParams.get('minBalance')
    const page = Number(url.searchParams.get('page') ?? 1)
    const limit = Number(url.searchParams.get('limit') ?? 50)
    const sort = url.searchParams.get('sort') ?? ''

    const where: any = {}
    if (q) {
        where.OR = [
            { family: { contains: q, mode: 'insensitive' } },
            { name: { contains: q, mode: 'insensitive' } },
            { secname: { contains: q, mode: 'insensitive' } },
        ]
    }
    if (sex) where.sex = sex
    if (minBalance) where.balance = { gte: Number(minBalance) }

    const orderBy = sort ? (() => {
        const [field, dir] = sort.split(':')
        return { [field]: dir === 'desc' ? 'desc' : 'asc' }
    })() : { id: 'asc' }

    const [items, total] = await Promise.all([
        prisma.clients.findMany({ where, include: { Phones: true }, skip: (page - 1) * limit, take: limit, orderBy }),
        prisma.clients.count({ where }),
    ])

    console.log('Items fetched:', items, 'Total matching:', total);
    return NextResponse.json({ items, total })
}

export async function POST(request: Request) {
    const data = await request.json()
    // Simple create; allow partial fields
    const created = await prisma.clients.create({ data })
    return NextResponse.json(created, { status: 201 })
}
