import type { Prisma } from '@/generated/prisma/client'

export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export type PhonesServicesSearchParams = {
    q?: string
    phoneId?: string
    serviceId?: string
    page?: string
    limit?: string
}

export type PhonesServicesQueryInput = {
    q: string
    phoneId?: number
    serviceId?: number
    page: number
    limit: number
}

export type PhonesServicesQuery = {
    where: Prisma.PhoneServicesWhereInput
    page: number
    limit: number
    raw: PhonesServicesQueryInput
}

export function buildPhonesServicesQuery(searchParams: PhonesServicesSearchParams = {}): PhonesServicesQuery {
    const { q = '', phoneId: phoneIdRaw, serviceId: serviceIdRaw, page: pageRaw, limit: limitRaw } = searchParams

    const phoneId = phoneIdRaw ? Number(phoneIdRaw) : undefined
    const serviceId = serviceIdRaw ? Number(serviceIdRaw) : undefined
    const page = Number(pageRaw ?? DEFAULT_PAGE) || DEFAULT_PAGE
    const limit = Number(limitRaw ?? DEFAULT_LIMIT) || DEFAULT_LIMIT

    const where: Prisma.PhoneServicesWhereInput = {}
    if (phoneId) where.phoneId = phoneId
    if (serviceId) where.serviceId = serviceId

    return {
        where,
        page,
        limit,
        raw: { q, phoneId, serviceId, page, limit },
    }
}
