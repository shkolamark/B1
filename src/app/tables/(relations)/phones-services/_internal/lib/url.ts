import { PhonesServicesQuery } from './params'

export function buildPhonesServicesFetchUrl(base: string, query: PhonesServicesQuery): string {
    const { raw, page, limit } = query
    const { q, phoneId, serviceId } = raw

    const qs = new URLSearchParams()

    if (q) qs.set('q', q)
    if (phoneId) qs.set('phoneId', String(phoneId))
    if (serviceId) qs.set('serviceId', String(serviceId))
    qs.set('page', String(page))
    qs.set('limit', String(limit))

    const suffix = qs.toString()
    return suffix ? `${base}?${suffix}` : base
}
