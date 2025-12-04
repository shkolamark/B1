// src/app/api/_lib/api-helpers.ts
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json(data, { status: 200, ...init })
}

export function jsonCreated<T>(data: T) {
    return NextResponse.json(data, { status: 201 })
}

export function jsonError(message: string, status = 400, details?: unknown) {
    return NextResponse.json(
        { error: { message, details } },
        { status },
    )
}

// «middleware»-обёртка для try/catch + Zod
export function handleApiError(error: unknown) {
    if (error instanceof ZodError) {
        return jsonError('Invalid request data', 400, error.issues)
    }

    // здесь можно логировать в Sentry и т.п.
    console.error(error)
    return jsonError('Internal server error', 500)
}
