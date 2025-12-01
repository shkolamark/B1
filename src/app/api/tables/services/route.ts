import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') ?? ''
    const page = Number(url.searchParams.get('page') ?? 1)
    const limit = Number(url.searchParams.get('limit') ?? 50)

    const where: any = {}
    if (q) where.name = { contains: q, mode: 'insensitive' }

    const [items, total] = await Promise.all([
        prisma.services.findMany({ where, skip: (page - 1) * limit, take: limit }),
        prisma.services.count({ where }),
    ])

    return NextResponse.json({ items, total })
}

export async function POST(request: Request) {
    const data = await request.json()
    const created = await prisma.services.create({ data })
    return NextResponse.json(created, { status: 201 })
}
