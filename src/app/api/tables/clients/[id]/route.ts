// src/app/api/tables/clients/[id]/route.ts
import { NextRequest } from 'next/server'
import { z } from 'zod'
import {
    getClientById,
    updateClient,
    deleteClient,
} from '../_lib/client.repository'
import { jsonOk, jsonError, handleApiError } from '@/app/api/_lib/api-helpers'
import { clientUpdateBodySchema } from '../_lib/client.schemas' // ← новая схема

const idSchema = z.object({
    id: z.coerce.number().int().positive(),
})

type IdParams = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: IdParams) {
    try {
        const resolvedParams = await params
        const { id } = idSchema.parse(resolvedParams)
        const client = await getClientById(id)
        if (!client) return jsonError('Not found', 404)
        return jsonOk(client)
    } catch (error) {
        return handleApiError(error)
    }
}

export async function PUT(request: NextRequest, { params }: IdParams) {
    try {
        const resolvedParams = await params
        const { id } = idSchema.parse(resolvedParams)
        const body = await request.json()
        const parsed = clientUpdateBodySchema.parse(body)

        const updated = await updateClient(id, parsed)
        return jsonOk(updated)
    } catch (error) {
        return handleApiError(error)
    }
}

export async function DELETE(_req: NextRequest, { params }: IdParams) {
    try {
        const resolvedParams = await params
        const { id } = idSchema.parse(resolvedParams)
        await deleteClient(id)
        return jsonOk({ ok: true })
    } catch (error) {
        return handleApiError(error)
    }
}
