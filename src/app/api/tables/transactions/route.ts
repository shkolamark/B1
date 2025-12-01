// app/api/transactions/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') ?? ''
    const phoneId = url.searchParams.get('phoneId')
    const clientId = url.searchParams.get('clientId')
    const page = Number(url.searchParams.get('page') ?? 1)
    const limit = Number(url.searchParams.get('limit') ?? 50)

    const where: any = {}
    if (q) {
        where.OR = [
            { description: { contains: q, mode: 'insensitive' } },
        ]
    }
    if (phoneId) where.phoneId = Number(phoneId)
    if (clientId) where.clientId = Number(clientId)

    const [items, total] = await Promise.all([
        prisma.paymentTransactions.findMany({ include: { Clients: true, Phones: true, TransactionTypes: true, Services: true }, where, skip: (page - 1) * limit, take: limit, orderBy: { transactionDate: 'desc' } }),
        prisma.paymentTransactions.count({ where }),
    ])

    return NextResponse.json({ items, total })
}

export async function POST(request: Request) {
    const data = await request.json()
    const transaction = await prisma.paymentTransactions.create({ data })
    return NextResponse.json(transaction, { status: 201 })
}
