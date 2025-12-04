import type { Prisma, TransactionTypes } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { TransactionTypesQueryInput, TransactionTypeBodyInput } from './transactions-types.schemas'

export type TransactionTypesListResponse = { items: TransactionTypes[]; total: number }

export async function listTransactionTypes(query: TransactionTypesQueryInput): Promise<TransactionTypesListResponse> {
    const { q, page, limit } = query
    const where: Prisma.TransactionTypesWhereInput = {}
    if (q) where.name = { contains: q, mode: 'insensitive' }

    const [items, total] = await Promise.all([
        prisma.transactionTypes.findMany({ where, skip: (page - 1) * limit, take: limit }),
        prisma.transactionTypes.count({ where }),
    ])

    return { items: items as TransactionTypes[], total }
}

export async function createTransactionType(data: TransactionTypeBodyInput): Promise<TransactionTypes> {
    return prisma.transactionTypes.create({ data: data as Prisma.TransactionTypesCreateInput })
}

export async function getTransactionTypeById(id: number): Promise<TransactionTypes | null> {
    return prisma.transactionTypes.findUnique({ where: { id } })
}

export async function updateTransactionType(id: number, data: Partial<TransactionTypeBodyInput>): Promise<TransactionTypes> {
    return prisma.transactionTypes.update({ where: { id }, data: data as Prisma.TransactionTypesUpdateInput })
}

export async function deleteTransactionType(id: number): Promise<void> {
    await prisma.transactionTypes.delete({ where: { id } })
}
