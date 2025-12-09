import type { Prisma } from '@/generated/prisma/client'

export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export type PhoneTypesSearchParams = {
    q?: string
    page?: string
    limit?: string
}

export type PhoneTypesQueryInput = {
    q: string
    page: number
    limit: number
}

export type PhoneTypesQuery = {
    where: Prisma.PhoneTypesWhereInput
    page: number
    limit: number
    raw: PhoneTypesQueryInput
}

export function buildPhoneTypesQuery(searchParams: PhoneTypesSearchParams = {}): PhoneTypesQuery {
    const { q = '', page: pageRaw, limit: limitRaw } = searchParams

    const page = Number(pageRaw ?? DEFAULT_PAGE) || DEFAULT_PAGE
    const limit = Number(limitRaw ?? DEFAULT_LIMIT) || DEFAULT_LIMIT

    const where: Prisma.PhoneTypesWhereInput = {}
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
