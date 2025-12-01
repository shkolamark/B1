import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const phone = await prisma.phones.findUnique({ where: { id: Number(params.id) }, include: { Clients: true, PhoneTypes: true, Tariffs: true } })
    if (!phone) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(phone)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json()
    const updated = await prisma.phones.update({ where: { id: Number(params.id) }, data })
    return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    await prisma.phones.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ ok: true })
}
