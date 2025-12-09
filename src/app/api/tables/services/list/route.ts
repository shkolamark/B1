import { NextRequest } from 'next/server'
import { listServices } from '../_lib/services.repository'
import { jsonOk, handleApiError } from '@/app/api/_lib/api-helpers'

export async function GET(request: NextRequest) {
    try {
        const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50')
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1')

        // Простой запрос без сложной валидации
        const result = await listServices({
            q: '',
            page: Math.max(1, page),
            limit: Math.min(limit, 999),
        })

        return jsonOk(result)
    } catch (error) {
        return handleApiError(error)
    }
}
