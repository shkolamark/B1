import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import PhonesFilter from './_internal/components/PhonesFilter'
import AddPhonesButton from './_internal/components/AddPhonesButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import { listPhones } from '@/app/api/tables/phones/_lib/phones.repository'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { phonesColumns } from './_internal/config/columns'
import { buildPhonesQuery, PhonesSearchParams } from './_internal/lib/params'
import { buildPhonesFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = { title: 'Номера' }

type PhonesPageProps = {
    searchParams?: Promise<PhonesSearchParams>
}

export default async function PhonesPage({ searchParams }: PhonesPageProps) {
    const params = await searchParams
    const query = buildPhonesQuery(params)

    const { items: phonesRaw, total } = await listPhones(query.raw)

    const phones = phonesRaw.map((p: any) => ({
        ...p,
        Clients: p.Clients ? { ...p.Clients, balance: Number(p.Clients.balance) } : undefined,
    }))

    const fetchUrl = buildPhonesFetchUrl('/api/tables/phones', query)

    return (
        <>
            <Breadcrumb pageName="Номера" exportable exportPath="/api/tables/phones/export" exportFileName="phones.csv" />
            <div className="space-y-10">
                <div className="flex items-center gap-5 justify-between">
                    <PhonesFilter />
                    <div className="flex flex-col items-center gap-2 justify-between">
                        <AddPhonesButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={phonesColumns} />}>
                    <MainTable columns={phonesColumns} data={phones} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    )
}
