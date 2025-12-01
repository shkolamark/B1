import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const tx = await prisma.paymentTransactions.findUnique({ where: { id: Number(params.id) }, include: { Clients: true, Phones: true, TransactionTypes: true, Services: true } })
    if (!tx) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(tx)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json()
    const updated = await prisma.paymentTransactions.update({ where: { id: Number(params.id) }, data })
    return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    await prisma.paymentTransactions.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ ok: true })
}
