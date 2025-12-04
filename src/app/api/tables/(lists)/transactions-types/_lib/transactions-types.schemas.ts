import { z } from 'zod'

export const transactionTypesQuerySchema = z.object({
    q: z.string().optional().default(''),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const transactionTypeBodySchema = z.object({
    name: z.string().min(1),
    notes: z.string().optional().nullable(),
})

export const transactionTypeUpdateBodySchema = transactionTypeBodySchema.partial()

export type TransactionTypesQueryInput = z.infer<typeof transactionTypesQuerySchema>
export type TransactionTypeBodyInput = z.infer<typeof transactionTypeBodySchema>
