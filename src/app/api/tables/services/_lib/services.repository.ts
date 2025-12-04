import type { Prisma, Services } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { ServicesQueryInput, ServiceBodyInput } from './services.schemas'

export type ServicesListResponse = { items: Services[]; total: number }

export async function listServices(query: ServicesQueryInput): Promise<ServicesListResponse> {
    const { q, page, limit } = query
    const where: Prisma.ServicesWhereInput = {}
    if (q) where.name = { contains: q, mode: 'insensitive' }

    const [items, total] = await Promise.all([
        prisma.services.findMany({ where, skip: (page - 1) * limit, take: limit }),
        prisma.services.count({ where }),
    ])

    return { items: items as Services[], total }
}

export async function createService(data: ServiceBodyInput): Promise<Services> {
    return prisma.services.create({ data: data as Prisma.ServicesCreateInput })
}

export async function getServiceById(id: number): Promise<Services | null> {
    return prisma.services.findUnique({ where: { id } })
}

export async function updateService(id: number, data: Partial<ServiceBodyInput>): Promise<Services> {
    return prisma.services.update({ where: { id }, data: data as Prisma.ServicesUpdateInput })
}

export async function deleteService(id: number): Promise<void> {
    await prisma.services.delete({ where: { id } })
}
