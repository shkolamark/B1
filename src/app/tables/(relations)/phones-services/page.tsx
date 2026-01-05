import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import PhonesServicesFilter from './_internal/components/PhonesServicesFilter'
import AddPhonesServicesButton from './_internal/components/AddPhonesServicesButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import { listPhoneServices } from '@/app/api/tables/(relations)/phones-services/_lib/phones-services.repository'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { phonesServicesColumns } from './_internal/config/columns'
import { buildPhonesServicesQuery, PhonesServicesSearchParams } from './_internal/lib/params'
import { buildPhonesServicesFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = { title: 'Услуги к телефонам' }

type PhonesServicesPageProps = {
    searchParams?: Promise<PhonesServicesSearchParams> 
}

export default async function PhonesServicesPage({ searchParams }: PhonesServicesPageProps) {
    const params = await searchParams
    const query = buildPhonesServicesQuery(params)

    const { items: phonesServicesRaw, total } = await listPhoneServices(query.raw)

    const phonesServices = phonesServicesRaw.map((ps) => ({
        ...ps,
    }))

    const fetchUrl = buildPhonesServicesFetchUrl('/api/tables/(relations)/phones-services', query)

    return (
        <>
            <Breadcrumb pageName="Услуги к телефонам" exportable exportPath="/api/tables/phones-services/export" exportFileName="phones-services.csv" />
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
                    <div className="w-full md:flex-1">
                        <PhonesServicesFilter />
                    </div>
                    <div className="flex w-full md:w-auto flex-col items-center gap-2">
                        <AddPhonesServicesButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={phonesServicesColumns} />}>
                    <MainTable columns={phonesServicesColumns} data={phonesServices} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    )
}
