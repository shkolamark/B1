import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import TransactionTypesFilter from './_internal/components/TransactionTypesFilter'
import AddTransactionTypesButton from './_internal/components/AddTransactionTypesButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import { listTransactionTypes } from '@/app/api/tables/(lists)/transactions-types/_lib/transactions-types.repository'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { transactionTypesColumns } from './_internal/config/columns'
import { buildTransactionTypesQuery, TransactionTypesSearchParams } from './_internal/lib/params'
import { buildTransactionTypesFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = { title: 'Типы транзакций' }

type TransactionTypesPageProps = {
    searchParams?: Promise<TransactionTypesSearchParams>
}

export default async function TransactionsTypesPage({ searchParams }: TransactionTypesPageProps) {
    const params = await searchParams
    const query = buildTransactionTypesQuery(params)

    const { items: transactionTypesRaw, total } = await listTransactionTypes(query.raw)

    const transactionTypes = transactionTypesRaw.map((tt) => ({
        ...tt,
    }))

    const fetchUrl = buildTransactionTypesFetchUrl('/api/tables/(lists)/transactions-types', query)

    return (
        <>
            <Breadcrumb pageName="Типы транзакций" exportable exportPath="/api/tables/transactions-types/export" exportFileName="transactions-types.csv" />
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
                    <div className="w-full md:flex-1">
                        <TransactionTypesFilter />
                    </div>
                    <div className="flex w-full md:w-auto flex-col items-center gap-2">
                        <AddTransactionTypesButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={transactionTypesColumns} />}>
                    <MainTable columns={transactionTypesColumns} data={transactionTypes} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    )
}
