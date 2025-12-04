import { z } from 'zod'

export const phonesServicesQuerySchema = z.object({
    q: z.string().optional().default(''),
    phoneId: z.coerce.number().optional(),
    serviceId: z.coerce.number().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const phoneServiceBodySchema = z.object({
    phoneId: z.coerce.number(),
    serviceId: z.coerce.number(),
    notes: z.string().optional().nullable(),
})

export const phoneServiceUpdateBodySchema = phoneServiceBodySchema.partial()

export type PhonesServicesQueryInput = z.infer<typeof phonesServicesQuerySchema>
export type PhoneServiceBodyInput = z.infer<typeof phoneServiceBodySchema>
