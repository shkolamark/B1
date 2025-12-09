import { ClientsQuery } from './params'

export function buildClientsFetchUrl(base: string, query: ClientsQuery): string {
    const { raw, page, limit } = query
    const { q, sex, minBalance, sort, dateStart, dateEnd } = raw

    const qs = new URLSearchParams()

    if (q) qs.set('q', q)
    if (sex) qs.set('sex', sex)
    if (minBalance) qs.set('minBalance', String(minBalance))
    if (dateStart) qs.set('dateStart', dateStart)
    if (dateEnd) qs.set('dateEnd', dateEnd)
    if (sort) qs.set('sort', sort)

    qs.set('page', String(page))
    qs.set('limit', String(limit))

    const suffix = qs.toString()
    return suffix ? `${base}?${suffix}` : base
}
