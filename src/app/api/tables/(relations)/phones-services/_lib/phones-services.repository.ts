import type { Prisma, PhoneServices } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { PhonesServicesQueryInput, PhoneServiceBodyInput } from './phones-services.schemas'

export type PhonesServicesListResponse = { items: PhoneServices[]; total: number }

export async function listPhoneServices(query: PhonesServicesQueryInput): Promise<PhonesServicesListResponse> {
    const { q, phoneId, serviceId, page, limit } = query
    const where: Prisma.PhoneServicesWhereInput = {}
    if (q) where.notes = { contains: q, mode: 'insensitive' }
    if (phoneId) where.phoneId = Number(phoneId)
    if (serviceId) where.serviceId = Number(serviceId)

    const [items, total] = await Promise.all([
        prisma.phoneServices.findMany({ where, skip: (page - 1) * limit, take: limit, include: { Phones: true, Services: true } }),
        prisma.phoneServices.count({ where }),
    ])

    return { items: items as PhoneServices[], total }
}

export async function createPhoneService(data: PhoneServiceBodyInput): Promise<PhoneServices> {
    return prisma.phoneServices.create({ data: data as Prisma.PhoneServicesCreateInput, include: { Phones: true, Services: true } })
}

export async function getPhoneServiceById(id: number): Promise<PhoneServices | null> {
    return prisma.phoneServices.findUnique({ where: { id }, include: { Phones: true, Services: true } })
}

export async function updatePhoneService(id: number, data: Partial<PhoneServiceBodyInput>): Promise<PhoneServices> {
    return prisma.phoneServices.update({ where: { id }, data: data as Prisma.PhoneServicesUpdateInput, include: { Phones: true, Services: true } })
}

export async function deletePhoneService(id: number): Promise<void> {
    await prisma.phoneServices.delete({ where: { id } })
}
