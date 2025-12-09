import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import TariffsFilter from './_internal/components/TariffsFilter'
import AddTariffsButton from './_internal/components/AddTariffsButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import { listTariffs } from '@/app/api/tables/tariffs/_lib/tariffs.repository'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { tariffsColumns } from './_internal/config/columns'
import { buildTariffsQuery, TariffsSearchParams } from './_internal/lib/params'
import { buildTariffsFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = { title: 'Тарифы' }

type TariffsPageProps = {
    searchParams?: Promise<TariffsSearchParams>
}

export default async function TariffsPage({ searchParams }: TariffsPageProps) {
    const params = await searchParams
    const query = buildTariffsQuery(params)

    const { items: tariffsRaw, total } = await listTariffs(query.raw)

    const tariffs = tariffsRaw.map((t) => ({
        ...t,
    }))

    const fetchUrl = buildTariffsFetchUrl('/api/tables/tariffs', query)

    return (
        <>
            <Breadcrumb pageName="Тарифы" />
            <div className="space-y-10">
                <div className="flex items-center gap-5 justify-between">
                    <TariffsFilter />
                    <div className="flex flex-col items-center gap-2 justify-between">
                        <AddTariffsButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={tariffsColumns} />}>
                    <MainTable columns={tariffsColumns} data={tariffs} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    )
}
