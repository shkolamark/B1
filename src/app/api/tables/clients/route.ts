// src/app/api/tables/clients/route.ts
import { NextRequest } from 'next/server'
import { clientsQuerySchema, clientBodySchema } from './_lib/client.schemas'
import {
    listClients,
    createClient,
} from './_lib/client.repository'
import { jsonOk, jsonCreated, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        // преобразуем searchParams в обычный объект
        const rawQuery = Object.fromEntries(searchParams.entries())

        const parsed = clientsQuerySchema.parse(rawQuery)
        const result = await listClients(parsed)

        return jsonOk(result)
    } catch (error) {
        return handleApiError(error)
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const parsed = clientBodySchema.parse(body)

        const created = await createClient(parsed)
        return jsonCreated(created)
    } catch (error) {
        return handleApiError(error)
    }
}
