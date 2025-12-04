import type { Prisma, PaymentTransactions } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { TransactionsQueryInput, TransactionBodyInput } from './transactions.schemas'

export type TransactionsListResponse = { items: PaymentTransactions[]; total: number }

export async function listTransactions(query: TransactionsQueryInput): Promise<TransactionsListResponse> {
    const { q, phoneId, clientId, page, limit } = query
    const where: Prisma.PaymentTransactionsWhereInput = {}

    if (q) where.OR = [{ description: { contains: q, mode: 'insensitive' } }]
    if (phoneId) where.phoneId = Number(phoneId)
    if (clientId) where.clientId = Number(clientId)

    const [items, total] = await Promise.all([
        prisma.paymentTransactions.findMany({ include: { Clients: true, Phones: true, TransactionTypes: true, Services: true }, where, skip: (page - 1) * limit, take: limit, orderBy: { transactionDate: 'desc' } }),
        prisma.paymentTransactions.count({ where }),
    ])

    return { items: items as PaymentTransactions[], total }
}

export async function createTransaction(data: TransactionBodyInput): Promise<PaymentTransactions> {
    return prisma.paymentTransactions.create({ data: data as Prisma.PaymentTransactionsCreateInput, include: { Clients: true, Phones: true, TransactionTypes: true, Services: true } })
}

export async function getTransactionById(id: number): Promise<PaymentTransactions | null> {
    return prisma.paymentTransactions.findUnique({ where: { id }, include: { Clients: true, Phones: true, TransactionTypes: true, Services: true } })
}

export async function updateTransaction(id: number, data: Partial<TransactionBodyInput>): Promise<PaymentTransactions> {
    return prisma.paymentTransactions.update({ where: { id }, data: data as Prisma.PaymentTransactionsUpdateInput, include: { Clients: true, Phones: true, TransactionTypes: true, Services: true } })
}

export async function deleteTransaction(id: number): Promise<void> {
    await prisma.paymentTransactions.delete({ where: { id } })
}
