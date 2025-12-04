import { phonesServicesQuerySchema, phoneServiceBodySchema } from './_lib/phones-services.schemas'
import { listPhoneServices, createPhoneService } from './_lib/phones-services.repository'
import { jsonOk, jsonCreated, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const parsed = phonesServicesQuerySchema.parse(Object.fromEntries(url.searchParams))
        const result = await listPhoneServices(parsed)
        return jsonOk(result)
    } catch (err) {
        return handleApiError(err)
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = phoneServiceBodySchema.parse(body)
        const created = await createPhoneService(parsed)
        return jsonCreated(created)
    } catch (err) {
        return handleApiError(err)
    }
}
