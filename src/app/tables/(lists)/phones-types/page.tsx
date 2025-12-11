import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import PhoneTypesFilter from './_internal/components/PhoneTypesFilter'
import AddPhoneTypesButton from './_internal/components/AddPhoneTypesButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import { listPhoneTypes } from '@/app/api/tables/(lists)/phones-types/_lib/phones-types.repository'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { phoneTypesColumns } from './_internal/config/columns'
import { buildPhoneTypesQuery, PhoneTypesSearchParams } from './_internal/lib/params'
import { buildPhoneTypesFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = { title: 'Типы номеров' }

type PhoneTypesPageProps = {
    searchParams?: Promise<PhoneTypesSearchParams>
}

export default async function PhonesTypesPage({ searchParams }: PhoneTypesPageProps) {
    const params = await searchParams
    const query = buildPhoneTypesQuery(params)

    const { items: phoneTypesRaw, total } = await listPhoneTypes(query.raw)

    const phoneTypes = phoneTypesRaw.map((pt) => ({
        ...pt,
    }))

    const fetchUrl = buildPhoneTypesFetchUrl('/api/tables/(lists)/phones-types', query)

    return (
        <>
            <Breadcrumb pageName="Типы номеров" exportable exportPath="/api/tables/phones-types/export" exportFileName="phones-types.csv" />
            <div className="space-y-10">
                <div className="flex items-center gap-5 justify-between">
                    <PhoneTypesFilter />
                    <div className="flex flex-col items-center gap-2 justify-between">
                        <AddPhoneTypesButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={phoneTypesColumns} />}>
                    <MainTable columns={phoneTypesColumns} data={phoneTypes} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    )
}
