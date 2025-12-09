import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import ServicesFilter from './_internal/components/ServicesFilter'
import AddServicesButton from './_internal/components/AddServicesButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import { listServices } from '@/app/api/tables/services/_lib/services.repository'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { servicesColumns } from './_internal/config/columns'
import { buildServicesQuery, ServicesSearchParams } from './_internal/lib/params'
import { buildServicesFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = { title: 'Услуги' }

type ServicesPageProps = {
    searchParams?: Promise<ServicesSearchParams>
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
    const params = await searchParams
    const query = buildServicesQuery(params)

    const { items: servicesRaw, total } = await listServices(query.raw)

    const services = servicesRaw.map((s) => ({
        ...s,
    }))

    const fetchUrl = buildServicesFetchUrl('/api/tables/services', query)

    return (
        <>
            <Breadcrumb pageName="Услуги" />
            <div className="space-y-10">
                <div className="flex items-center gap-5 justify-between">
                    <ServicesFilter />
                    <div className="flex flex-col items-center gap-2 justify-between">
                        <AddServicesButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={servicesColumns} />}>
                    <MainTable columns={servicesColumns} data={services} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    )
}
