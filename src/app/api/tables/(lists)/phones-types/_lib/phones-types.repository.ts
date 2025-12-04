import type { Prisma, PhoneTypes } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { PhoneTypesQueryInput, PhoneTypeBodyInput } from './phones-types.schemas'

export type PhoneTypesListResponse = { items: PhoneTypes[]; total: number }

export async function listPhoneTypes(query: PhoneTypesQueryInput): Promise<PhoneTypesListResponse> {
    const { q, page, limit } = query
    const where: Prisma.PhoneTypesWhereInput = {}
    if (q) where.name = { contains: q, mode: 'insensitive' }

    const [items, total] = await Promise.all([
        prisma.phoneTypes.findMany({ where, skip: (page - 1) * limit, take: limit }),
        prisma.phoneTypes.count({ where }),
    ])

    return { items: items as PhoneTypes[], total }
}

export async function createPhoneType(data: PhoneTypeBodyInput): Promise<PhoneTypes> {
    return prisma.phoneTypes.create({ data: data as Prisma.PhoneTypesCreateInput })
}

export async function getPhoneTypeById(id: number): Promise<PhoneTypes | null> {
    return prisma.phoneTypes.findUnique({ where: { id } })
}

export async function updatePhoneType(id: number, data: Partial<PhoneTypeBodyInput>): Promise<PhoneTypes> {
    return prisma.phoneTypes.update({ where: { id }, data: data as Prisma.PhoneTypesUpdateInput })
}

export async function deletePhoneType(id: number): Promise<void> {
    await prisma.phoneTypes.delete({ where: { id } })
}
