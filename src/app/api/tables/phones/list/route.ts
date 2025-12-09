import { NextRequest } from 'next/server'
import { listPhones } from '../_lib/phones.repository'
import { jsonOk, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: NextRequest) {
    try {
        const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50')
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1')

        // Простой запрос без сложной валидации
        const result = await listPhones({
            q: '',
            page: Math.max(1, page),
            limit: Math.min(limit, 999),
        })

        // Преобразуем Decimal в number для передачи в клиент
        const items = result.items.map((phone: any) => ({
            ...phone,
            Clients: phone.Clients ? { ...phone.Clients, balance: Number(phone.Clients.balance) } : undefined,
        }))

        return jsonOk({ ...result, items })
    } catch (error) {
        return handleApiError(error)
    }
}
