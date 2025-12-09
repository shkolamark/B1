import { transactionsQuerySchema, transactionBodySchema } from './_lib/transactions.schemas'
import { listTransactions, createTransaction } from './_lib/transactions.repository'
import { jsonOk, jsonCreated, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const parsed = transactionsQuerySchema.parse(Object.fromEntries(url.searchParams))
        const result = await listTransactions(parsed)

        // Преобразуем Decimal в number для передачи в клиент
        const items = result.items.map((transaction: any) => ({
            ...transaction,
            amount: Number(transaction.amount),
            Clients: transaction.Clients ? { ...transaction.Clients, balance: Number(transaction.Clients.balance) } : undefined,
        }))

        return jsonOk({ ...result, items })
    } catch (err) {
        return handleApiError(err)
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = transactionBodySchema.parse(body)
        const created = await createTransaction(parsed)
        return jsonCreated(created)
    } catch (err) {
        return handleApiError(err)
    }
}
