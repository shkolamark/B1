import { phoneTypesQuerySchema, phoneTypeBodySchema } from './_lib/phones-types.schemas'
import { listPhoneTypes, createPhoneType } from './_lib/phones-types.repository'
import { jsonOk, jsonCreated, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const parsed = phoneTypesQuerySchema.parse(Object.fromEntries(url.searchParams))
        const result = await listPhoneTypes(parsed)
        return jsonOk(result)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = phoneTypeBodySchema.parse(body)
        const created = await createPhoneType(parsed)
        return jsonCreated(created)
    } catch (err) {
        return handleApiError(err)
    }
}
