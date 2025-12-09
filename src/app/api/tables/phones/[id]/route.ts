import { jsonOk, jsonError, handleApiError } from '@/app/api/_lib/api-helpers'
import { getPhoneById, updatePhone, deletePhone } from '../_lib/phones.repository'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        const phone = await getPhoneById(id)
        if (!phone) return jsonError('Not found', 404)
        return jsonOk(phone)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        const data = await request.json()
        const updated = await updatePhone(id, data)
        return jsonOk(updated)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params
        const id = Number(idStr)
        await deletePhone(id)
        return jsonOk({ ok: true })
    } catch (err) {
        return handleApiError(err)
    }
}
