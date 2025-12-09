import { PhonesQuery } from './params'

export function buildPhonesFetchUrl(base: string, query: PhonesQuery): string {
    const { raw, page, limit } = query
    const { q, clientId } = raw

    const qs = new URLSearchParams()

    if (q) qs.set('q', q)
    if (clientId) qs.set('clientId', String(clientId))
    qs.set('page', String(page))
    qs.set('limit', String(limit))

    const suffix = qs.toString()
    return suffix ? `${base}?${suffix}` : base
}
