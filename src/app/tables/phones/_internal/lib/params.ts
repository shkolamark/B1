import type { Prisma } from '@/generated/prisma/client'

export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export type PhonesSearchParams = {
    q?: string
    clientId?: string
    page?: string
    limit?: string
}

export type PhonesQueryInput = {
    q: string
    clientId?: number
    page: number
    limit: number
}

export type PhonesQuery = {
    where: Prisma.PhonesWhereInput
    page: number
    limit: number
    raw: PhonesQueryInput
}

export function buildPhonesQuery(searchParams: PhonesSearchParams = {}): PhonesQuery {
    const { q = '', clientId: clientIdRaw, page: pageRaw, limit: limitRaw } = searchParams

    const clientId = clientIdRaw ? Number(clientIdRaw) : undefined
    const page = Number(pageRaw ?? DEFAULT_PAGE) || DEFAULT_PAGE
    const limit = Number(limitRaw ?? DEFAULT_LIMIT) || DEFAULT_LIMIT

    const where: Prisma.PhonesWhereInput = {}
    if (q) {
        where.OR = [{ number: { contains: q, mode: 'insensitive' } }]
    }
    if (clientId) where.clientId = clientId

    return {
        where,
        page,
        limit,
        raw: { q, clientId, page, limit },
    }
}
