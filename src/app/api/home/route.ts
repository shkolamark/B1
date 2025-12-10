import { NextRequest } from 'next/server'
import { jsonOk, handleApiError } from '@/app/api/_lib/api-helpers'
import { getDashboardData } from '@/app/api/home/_lib/server'

export async function GET(request: NextRequest) {
    try {
        const data = await getDashboardData()
        return jsonOk(data)
    } catch (err) {
        return handleApiError(err)
    }
}
