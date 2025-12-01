import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'
import prisma from '@/lib/prisma'

export const metadata: Metadata = { title: 'Типы транзакций' }

const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Название', accessor: 'name' },
]

export default async function TransactionsTypesPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams
    const qs = new URLSearchParams(Object.entries(params ?? {})).toString()
    const transactionTypes = await prisma.transactionTypes.findMany({ take: 200 })
    return (
        <>
            <Breadcrumb pageName="Типы транзакций" />
            <div className="space-y-10">
                <Suspense fallback={<MainTableSkeleton columns={columns} />}>
                    <MainTable columns={columns} data={transactionTypes} />
                </Suspense>
            </div>
        </>
    )
}
