import { z } from 'zod'

export const transactionsQuerySchema = z.object({
    q: z.string().optional().default(''),
    phoneId: z.coerce.number().optional(),
    clientId: z.coerce.number().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const transactionBodySchema = z.object({
    amount: z.coerce.number(),
    phoneId: z.coerce.number().optional(),
    clientId: z.coerce.number().optional(),
    serviceId: z.coerce.number().optional(),
    transactionTypeId: z.coerce.number().optional(),
    description: z.string().optional().nullable(),
    transactionDate: z.string().optional(),
})

export const transactionUpdateBodySchema = transactionBodySchema.partial()

export type TransactionsQueryInput = z.infer<typeof transactionsQuerySchema>
export type TransactionBodyInput = z.infer<typeof transactionBodySchema>
export type TransactionUpdateBodyInput = z.infer<typeof transactionUpdateBodySchema>
