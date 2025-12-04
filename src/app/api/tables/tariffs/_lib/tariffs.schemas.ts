import { z } from 'zod'

export const tariffsQuerySchema = z.object({
    q: z.string().optional().default(''),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const tariffBodySchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().optional(),
    notes: z.string().optional().nullable(),
})

export const tariffUpdateBodySchema = tariffBodySchema.partial()

export type TariffsQueryInput = z.infer<typeof tariffsQuerySchema>
export type TariffBodyInput = z.infer<typeof tariffBodySchema>
export type TariffUpdateBodyInput = z.infer<typeof tariffUpdateBodySchema>
