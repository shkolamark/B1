import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const client = await prisma.clients.findUnique({ where: { id: Number(params.id) }, include: { Phones: true } })
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(client)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json()
    const updated = await prisma.clients.update({ where: { id: Number(params.id) }, data })
    return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    await prisma.clients.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ ok: true })
}
