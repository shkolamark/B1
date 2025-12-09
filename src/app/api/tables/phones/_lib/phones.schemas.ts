import { z } from 'zod'

export const phonesQuerySchema = z.object({
    q: z.string().optional().default(''),
    clientId: z.coerce.number().optional(),
    tariffId: z.coerce.number().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const phoneBodySchema = z.object({
    number: z.string().min(1),
    clientId: z.coerce.number().optional(),
    phoneTypeId: z.coerce.number().optional(),
    tariffId: z.coerce.number().optional(),
    notes: z.string().optional().nullable(),
})

export const phoneUpdateBodySchema = phoneBodySchema.partial()

export type PhonesQueryInput = z.infer<typeof phonesQuerySchema>
export type PhoneBodyInput = z.infer<typeof phoneBodySchema>
export type PhoneUpdateBodyInput = z.infer<typeof phoneUpdateBodySchema>
