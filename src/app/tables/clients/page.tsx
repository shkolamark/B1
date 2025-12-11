// app/clients/page.tsx
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import ClientsFilter from './_internal/components/ClientsFilter'
import AddClientsButton from './_internal/components/AddClientsButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import { listClients } from '@/app/api/tables/clients/_lib/client.repository'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { clientColumns } from './_internal/config/columns'
import { buildClientsQuery, ClientsSearchParams } from './_internal/lib/params'
import { buildClientsFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = { title: 'Клиенты' }

type ClientsPageProps = {
    searchParams?: Promise<ClientsSearchParams>
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
    const params = await searchParams
    const query = buildClientsQuery(params)


    const { items: clientsRaw, total } = await listClients(query.raw)

    const clients = clientsRaw.map((c) => ({
        ...c,
        balance: Number(c.balance),
    }))

    const fetchUrl = buildClientsFetchUrl('/api/tables/clients', query)

    return (
        <>
            <Breadcrumb pageName="Клиенты" exportable exportPath="/api/tables/clients/export" exportFileName="clients.csv" />
            <div className="space-y-10">
                <div className="flex items-center gap-5 justify-between">
                    <ClientsFilter />
                    <div className="flex flex-col items-center gap-2 justify-between grow">
                        <AddClientsButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={clientColumns} />}>
                    <MainTable columns={clientColumns} data={clients} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    )
}
