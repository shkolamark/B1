import { TransactionsQuery } from './params'

export function buildTransactionsFetchUrl(base: string, query: TransactionsQuery): string {
    const { raw, page, limit } = query
    const { q, phoneId, clientId } = raw

    const qs = new URLSearchParams()

    if (q) qs.set('q', q)
    if (phoneId) qs.set('phoneId', String(phoneId))
    if (clientId) qs.set('clientId', String(clientId))
    qs.set('page', String(page))
    qs.set('limit', String(limit))

    const suffix = qs.toString()
    return suffix ? `${base}?${suffix}` : base
}
