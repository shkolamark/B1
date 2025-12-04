import type { Prisma, Tariffs } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { TariffsQueryInput, TariffBodyInput } from './tariffs.schemas'

export type TariffsListResponse = { items: Tariffs[]; total: number }

export async function listTariffs(query: TariffsQueryInput): Promise<TariffsListResponse> {
    const { q, page, limit } = query
    const where: Prisma.TariffsWhereInput = {}
    if (q) where.name = { contains: q, mode: 'insensitive' }

    const [items, total] = await Promise.all([
        prisma.tariffs.findMany({ where, skip: (page - 1) * limit, take: limit }),
        prisma.tariffs.count({ where }),
    ])

    return { items: items as Tariffs[], total }
}

export async function createTariff(data: TariffBodyInput): Promise<Tariffs> {
    return prisma.tariffs.create({ data: data as Prisma.TariffsCreateInput })
}

export async function getTariffById(id: number): Promise<Tariffs | null> {
    return prisma.tariffs.findUnique({ where: { id } })
}

export async function updateTariff(id: number, data: Partial<TariffBodyInput>): Promise<Tariffs> {
    return prisma.tariffs.update({ where: { id }, data: data as Prisma.TariffsUpdateInput })
}

export async function deleteTariff(id: number): Promise<void> {
    await prisma.tariffs.delete({ where: { id } })
}
