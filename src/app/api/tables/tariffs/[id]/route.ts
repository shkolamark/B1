import { jsonOk, jsonError, handleApiError } from '@/app/api/_lib/api-helpers'
import { getTariffById, updateTariff, deleteTariff } from '../_lib/tariffs.repository'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        const item = await getTariffById(id)
        if (!item) return jsonError('Not found', 404)
        return jsonOk(item)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        const data = await request.json()
        const updated = await updateTariff(id, data)
        return jsonOk(updated)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        await deleteTariff(id)
        return jsonOk({ ok: true })
    } catch (err) {
        return handleApiError(err)
    }
}
