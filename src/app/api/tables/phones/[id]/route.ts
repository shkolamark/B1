import { jsonOk, jsonError, handleApiError } from '@/app/api/_lib/api-helpers'
import { getPhoneById, updatePhone, deletePhone } from '../_lib/phones.repository'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const phone = await getPhoneById(id)
        if (!phone) return jsonError('Not found', 404)
        return jsonOk(phone)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        const data = await request.json()
        const updated = await updatePhone(id, data)
        return jsonOk(updated)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id)
        await deletePhone(id)
        return jsonOk({ ok: true })
    } catch (err) {
        return handleApiError(err)
    }
}
