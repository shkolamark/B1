import type { Prisma, Phones } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { PhonesQueryInput, PhoneBodyInput } from './phones.schemas'

export type PhonesListResponse = { items: Phones[]; total: number }

export async function listPhones(query: PhonesQueryInput): Promise<PhonesListResponse> {
    const { q, clientId, page, limit } = query

    const where: Prisma.PhonesWhereInput = {}

    if (q) {
        where.OR = [
            { number: { contains: q, mode: 'insensitive' } },
        ]
    }
    if (clientId) where.clientId = Number(clientId)

    const [items, total] = await Promise.all([
        prisma.phones.findMany({
            where,
            include: { Clients: true, PhoneTypes: true, Tariffs: true },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.phones.count({ where }),
    ])

    return { items: items as Phones[], total }
}

export async function createPhone(data: PhoneBodyInput): Promise<Phones> {
    return prisma.phones.create({ data: data as Prisma.PhonesCreateInput, include: { Clients: true, PhoneTypes: true, Tariffs: true } })
}

export async function getPhoneById(id: number): Promise<Phones | null> {
    return prisma.phones.findUnique({ where: { id }, include: { Clients: true, PhoneTypes: true, Tariffs: true } })
}

export async function updatePhone(id: number, data: Partial<PhoneBodyInput>): Promise<Phones> {
    return prisma.phones.update({ where: { id }, data: data as Prisma.PhonesUpdateInput, include: { Clients: true, PhoneTypes: true, Tariffs: true } })
}

export async function deletePhone(id: number): Promise<void> {
    await prisma.phones.delete({ where: { id } })
}
