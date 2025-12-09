import type { Prisma } from '@/generated/prisma/client'

export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export type TransactionsSearchParams = {
    q?: string
    phoneId?: string
    clientId?: string
    page?: string
    limit?: string
}

export type TransactionsQueryInput = {
    q: string
    phoneId?: number
    clientId?: number
    page: number
    limit: number
}

export type TransactionsQuery = {
    where: Prisma.PaymentTransactionsWhereInput
    page: number
    limit: number
    raw: TransactionsQueryInput
}

export function buildTransactionsQuery(searchParams: TransactionsSearchParams = {}): TransactionsQuery {
    const { q = '', phoneId: phoneIdRaw, clientId: clientIdRaw, page: pageRaw, limit: limitRaw } = searchParams

    const phoneId = phoneIdRaw ? Number(phoneIdRaw) : undefined
    const clientId = clientIdRaw ? Number(clientIdRaw) : undefined
    const page = Number(pageRaw ?? DEFAULT_PAGE) || DEFAULT_PAGE
    const limit = Number(limitRaw ?? DEFAULT_LIMIT) || DEFAULT_LIMIT

    const where: Prisma.PaymentTransactionsWhereInput = {}
    if (q) {
        where.OR = [{ description: { contains: q, mode: 'insensitive' } }]
    }
    if (phoneId) where.phoneId = phoneId
    if (clientId) where.clientId = clientId

    return {
        where,
        page,
        limit,
        raw: { q, phoneId, clientId, page, limit },
    }
}
