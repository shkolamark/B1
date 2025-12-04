// src/app/api/tables/clients/_lib/client.schemas.ts
import { z } from 'zod'

// query для списка клиентов
export const clientsQuerySchema = z.object({
    q: z.string().optional().default(''),
    sex: z.enum(['male', 'female']).optional(),
    minBalance: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(50),
    sort: z.string().optional().default(''),
    dateStart: z.string().optional().default(''),
    dateEnd: z.string().optional().default(''),
})

export const clientBodySchema = z.object({
    family: z.string().min(1),
    name: z.string().min(1),
    secname: z.string().optional().nullable(),
    birthday: z.string().datetime().optional().nullable(),
    sex: z.enum(['male', 'female']),
    notes: z.string().optional().nullable(),
    balance: z.number().optional(),
})

export const clientUpdateBodySchema = z.object({
    family: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    secname: z.string().optional().nullable(),
    birthday: z.string().optional().nullable(),
    sex: z.enum(['male', 'female']).optional(),
    notes: z.string().optional().nullable(),
    balance: z.number().optional(),
})

export type ClientsQueryInput = z.infer<typeof clientsQuerySchema>
export type ClientBodyInput = z.infer<typeof clientBodySchema>
export type ClientUpdateBodyInput = z.infer<typeof clientUpdateBodySchema>