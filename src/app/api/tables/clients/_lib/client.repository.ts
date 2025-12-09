// src/app/api/tables/clients/_lib/client.repository.ts
import type { Prisma, Clients } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import {
    ClientsQueryInput,
    ClientBodyInput
} from './client.schemas'

export type ClientsListResponse = {
    items: Clients[]
    total: number
}
import { ClientUpdateBodyInput } from './client.schemas'

export async function listClients(query: ClientsQueryInput): Promise<ClientsListResponse> {
    const { q, sex, minBalance, page, limit, sort, dateStart, dateEnd } = query

    const where: Prisma.ClientsWhereInput = {}

    if (q) {
        where.OR = [
            { family: { contains: q, mode: 'insensitive' } },
            { name: { contains: q, mode: 'insensitive' } },
            { secname: { contains: q, mode: 'insensitive' } },
        ]
    }
    if (sex) where.sex = sex
    if (minBalance) where.balance = { gte: Number(minBalance) }

    // Правильная обработка дат
    if (dateStart || dateEnd) {
        where.birthday = {} as Prisma.DateTimeNullableFilter

        if (dateStart) {
            where.birthday.gte = new Date(dateStart)
        }
        if (dateEnd) {
            where.birthday.lte = new Date(dateEnd)
        }
    }

    const orderBy: Prisma.ClientsOrderByWithRelationInput = sort
        ? (() => {
            const [field, dir] = sort.split(':')
            return { [field]: dir === 'asc' ? 'asc' : 'desc' } as Prisma.ClientsOrderByWithRelationInput
        })()
        : { id: 'desc' }

    const [itemsRaw, total] = await Promise.all([
        prisma.clients.findMany({
            where,
            include: { Phones: true },
            skip: (page - 1) * limit,
            take: limit,
            orderBy,
        }),
        prisma.clients.count({ where }),
    ])

    const items: Clients[] = itemsRaw

    return { items, total }
}

export async function createClient(data: ClientBodyInput): Promise<Clients> {
    return prisma.clients.create({
        data: data as Prisma.ClientsCreateInput,
        include: { Phones: true }
    })
}

export async function getClientById(id: number): Promise<Clients | null> {
    return prisma.clients.findUnique({
        where: { id },
        include: { Phones: true },
    })
}

export async function updateClient(
    id: number,
    data: ClientUpdateBodyInput
): Promise<Clients> {
    return prisma.clients.update({
        where: { id },
        data: data as Prisma.ClientsUpdateInput,
        include: { Phones: true }
    })
}

export async function deleteClient(id: number): Promise<void> {
    await prisma.clients.delete({ where: { id } })
}
