import type { Prisma } from '@/generated/prisma/client'

export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export type TariffsSearchParams = {
    q?: string
    page?: string
    limit?: string
}

export type TariffsQueryInput = {
    q: string
    page: number
    limit: number
}

export type TariffsQuery = {
    where: Prisma.TariffsWhereInput
    page: number
    limit: number
    raw: TariffsQueryInput
}

export function buildTariffsQuery(searchParams: TariffsSearchParams = {}): TariffsQuery {
    const { q = '', page: pageRaw, limit: limitRaw } = searchParams

    const page = Number(pageRaw ?? DEFAULT_PAGE) || DEFAULT_PAGE
    const limit = Number(limitRaw ?? DEFAULT_LIMIT) || DEFAULT_LIMIT

    const where: Prisma.TariffsWhereInput = {}
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
