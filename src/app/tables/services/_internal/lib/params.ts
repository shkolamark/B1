import type { Prisma } from '@/generated/prisma/client'

export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export type ServicesSearchParams = {
    q?: string
    page?: string
    limit?: string
}

export type ServicesQueryInput = {
    q: string
    page: number
    limit: number
}

export type ServicesQuery = {
    where: Prisma.ServicesWhereInput
    page: number
    limit: number
    raw: ServicesQueryInput
}

export function buildServicesQuery(searchParams: ServicesSearchParams = {}): ServicesQuery {
    const { q = '', page: pageRaw, limit: limitRaw } = searchParams

    const page = Number(pageRaw ?? DEFAULT_PAGE) || DEFAULT_PAGE
    const limit = Number(limitRaw ?? DEFAULT_LIMIT) || DEFAULT_LIMIT

    const where: Prisma.ServicesWhereInput = {}
    if (q) {
        where.OR = [{ name: { contains: q, mode: 'insensitive' } }]
    }

    return {
        where,
        page,
        limit,
        raw: { q, page, limit },
    }
}
