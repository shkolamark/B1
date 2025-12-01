import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const item = await prisma.services.findUnique({ where: { id: Number(params.id) } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json()
    const updated = await prisma.services.update({ where: { id: Number(params.id) }, data })
    return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    await prisma.services.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ ok: true })
}
