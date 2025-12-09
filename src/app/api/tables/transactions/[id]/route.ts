import { jsonOk, jsonError, handleApiError } from '@/app/api/_lib/api-helpers'
import { getTransactionById, updateTransaction, deleteTransaction } from '../_lib/transactions.repository'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        const tx = await getTransactionById(id)
        if (!tx) return jsonError('Not found', 404)
        return jsonOk(tx)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        const data = await request.json()
        const updated = await updateTransaction(id, data)
        return jsonOk(updated)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        await deleteTransaction(id)
        return jsonOk({ ok: true })
    } catch (err) {
        return handleApiError(err)
    }
}
