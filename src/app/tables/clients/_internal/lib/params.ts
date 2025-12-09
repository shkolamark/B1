// app/clients/_internal/lib/params.ts
import type { Prisma } from '@/generated/prisma/client'

export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export type ClientsSearchParams = {
    q?: string
    sex?: string
    minBalance?: string
    page?: string
    limit?: string
    sort?: string
    dateStart?: string
    dateEnd?: string
}

export type ClientsQueryInput = {
    q: string
    sex?: 'male' | 'female'
    minBalance?: string
    page: number
    limit: number
    sort: string
    dateStart: string
    dateEnd: string
}


export type ClientsQuery = {
    where: Prisma.ClientsWhereInput
    orderBy: Prisma.ClientsOrderByWithRelationInput
    page: number
    limit: number
    raw: ClientsQueryInput
}

export function buildClientsQuery(
    searchParams: ClientsSearchParams = {},
): ClientsQuery {
    const {
        q = '',
        sex: sexRaw,
        minBalance,
        page: pageRaw,
        limit: limitRaw,
        sort = '',
        dateStart = '',
        dateEnd = '',
    } = searchParams

    const sex: 'male' | 'female' | undefined =
        sexRaw === 'male' ? 'male' :
            sexRaw === 'female' ? 'female' : undefined

    const page = Number(pageRaw ?? DEFAULT_PAGE) || DEFAULT_PAGE
    const limit = Number(limitRaw ?? DEFAULT_LIMIT) || DEFAULT_LIMIT

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
    if (dateStart || dateEnd) {
        where.birthday = {} as Prisma.DateTimeNullableFilter
        if (dateStart) where.birthday.gte = new Date(dateStart)
        if (dateEnd) where.birthday.lte = new Date(dateEnd)
    }

    const orderBy: Prisma.ClientsOrderByWithRelationInput = sort
        ? (() => {
            const [field, dir] = String(sort).split(':')
            return { [field]: dir === 'desc' ? 'desc' : 'asc' } as Prisma.ClientsOrderByWithRelationInput
        })()
        : { id: 'asc' }

    return {
        where,
        orderBy,
        page,
        limit,
        raw: {
            q,
            sex,
            minBalance,
            sort,
            dateStart,
            dateEnd,
            page,
            limit,
        },
    }
}
