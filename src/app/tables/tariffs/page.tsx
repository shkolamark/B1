import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'




export const metadata: Metadata = { title: 'Тарифы' }

const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Название', accessor: 'name' },
    { id: 'monthlyFee', header: 'Месячная плата', accessor: 'monthlyFee' },
    { id: 'minutes', header: 'Минут в пакете', accessor: 'minutesIncluded' },
    { id: 'pricePerMin', header: 'Цена за минуту (сверх)', accessor: 'pricePerMinOver' },
]

import prisma from '@/lib/prisma'

const TariffsPage = async ({ searchParams }: { searchParams: any }) => {
    const params = await searchParams
    const qs = new URLSearchParams(Object.entries(params ?? {})).toString()
    const tariffs = await prisma.tariffs.findMany({ take: 100 })
    return (
        <>
            <Breadcrumb pageName="Тарифы" />
            <div className="space-y-10">
                <Suspense fallback={<MainTableSkeleton columns={columns} />}>
                    <MainTable columns={columns} data={tariffs} />
                </Suspense>
            </div>
        </>
    )
}

export default TariffsPage;
