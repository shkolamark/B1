import { TransactionTypesQuery } from './params'

export function buildTransactionTypesFetchUrl(base: string, query: TransactionTypesQuery): string {
    const { raw, page, limit } = query
    const { q } = raw

    const qs = new URLSearchParams()

    if (q) qs.set('q', q)
    qs.set('page', String(page))
    qs.set('limit', String(limit))

    const suffix = qs.toString()
    return suffix ? `${base}?${suffix}` : base
}
