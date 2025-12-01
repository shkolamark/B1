import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = { title: 'Услуги' }

const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Название', accessor: 'name' },
    { id: 'fee', header: 'Ежемесячная плата', accessor: 'serviceFee', render: (v: any) => v ? `${v}` : '' },
    { id: 'desc', header: 'Описание', accessor: 'description' },
]

import prisma from '@/lib/prisma'

export default async function ServicesPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams
    const qs = new URLSearchParams(Object.entries(params ?? {})).toString()
    const services = await prisma.services.findMany({ take: 100 })
    return (
        <>
            <Breadcrumb pageName="Услуги" />
            <div className="space-y-10">
                <Suspense fallback={<MainTableSkeleton columns={columns} />}>
                    <MainTable columns={columns} data={services} />
                </Suspense>
            </div>
        </>
    )
}
