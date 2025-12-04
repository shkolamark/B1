import { phonesQuerySchema, phoneBodySchema } from './_lib/phones.schemas'
import { listPhones, createPhone } from './_lib/phones.repository'
import { jsonOk, jsonCreated, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const parsed = phonesQuerySchema.parse(Object.fromEntries(url.searchParams))
        const result = await listPhones(parsed)
        return jsonOk(result)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = phoneBodySchema.parse(body)
        const created = await createPhone(parsed)
        return jsonCreated(created)
    } catch (err) {
        return handleApiError(err)
    }
}
