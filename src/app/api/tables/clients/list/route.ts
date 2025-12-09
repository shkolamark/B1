import { NextRequest } from 'next/server'
import { listClients } from '../_lib/client.repository'
import { jsonOk, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: NextRequest) {
    try {
        const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50')
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1')

        // Простой запрос без сложной валидации
        const result = await listClients({
            q: '',
            page: Math.max(1, page),
            limit: Math.min(limit, 999),
            sort: '',
            dateStart: '',
            dateEnd: '',
        })

        // Преобразуем Decimal в number для передачи в клиент
        const items = result.items.map((client: any) => ({
            ...client,
            balance: Number(client.balance),
        }))

        return jsonOk({ ...result, items })
    } catch (error) {
        return handleApiError(error)
    }
}
