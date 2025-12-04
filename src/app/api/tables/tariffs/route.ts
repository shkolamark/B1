import { tariffsQuerySchema, tariffBodySchema } from './_lib/tariffs.schemas'
import { listTariffs, createTariff } from './_lib/tariffs.repository'
import { jsonOk, jsonCreated, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const parsed = tariffsQuerySchema.parse(Object.fromEntries(url.searchParams))
        const result = await listTariffs(parsed)
        return jsonOk(result)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = tariffBodySchema.parse(body)
        const created = await createTariff(parsed)
        return jsonCreated(created)
    } catch (err) {
        return handleApiError(err)
    }
}
