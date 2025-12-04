import { z } from 'zod'

export const servicesQuerySchema = z.object({
    q: z.string().optional().default(''),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const serviceBodySchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().optional(),
    notes: z.string().optional().nullable(),
})

export const serviceUpdateBodySchema = serviceBodySchema.partial()

export type ServicesQueryInput = z.infer<typeof servicesQuerySchema>
export type ServiceBodyInput = z.infer<typeof serviceBodySchema>
export type ServiceUpdateBodyInput = z.infer<typeof serviceUpdateBodySchema>
