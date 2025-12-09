import { jsonOk, jsonError, handleApiError } from '@/app/api/_lib/api-helpers'
import { getServiceById, updateService, deleteService } from '../_lib/services.repository'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        const item = await getServiceById(id)
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
        const updated = await updateService(id, data)
        return jsonOk(updated)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        await deleteService(id)
        return jsonOk({ ok: true })
    } catch (err) {
        return handleApiError(err)
    }
}
