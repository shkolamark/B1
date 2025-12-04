import { z } from 'zod'

export const phoneTypesQuerySchema = z.object({
    q: z.string().optional().default(''),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const phoneTypeBodySchema = z.object({
    name: z.string().min(1),
    notes: z.string().optional().nullable(),
})

export const phoneTypeUpdateBodySchema = phoneTypeBodySchema.partial()

export type PhoneTypesQueryInput = z.infer<typeof phoneTypesQuerySchema>
export type PhoneTypeBodyInput = z.infer<typeof phoneTypeBodySchema>
