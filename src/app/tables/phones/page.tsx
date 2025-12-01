import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = { title: 'Номера' }

const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'number', header: 'Номер', accessor: 'number' },
    { id: 'client', header: 'Клиент', accessor: (r: any) => `${r.Clients?.family ?? ''} ${r.Clients?.name ?? ''}` },
    { id: 'type', header: 'Тип', accessor: (r: any) => r.PhoneTypes?.name ?? '' },
    { id: 'tariff', header: 'Тариф', accessor: (r: any) => r.Tariffs?.name ?? '' },
]

import prisma from '@/lib/prisma'

export default async function PhonesPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams
    const qs = new URLSearchParams(Object.entries(params ?? {})).toString()
    // server data fetch for now to confirm server connectivity
    const phones = await prisma.phones.findMany({ include: { Clients: true, PhoneTypes: true, Tariffs: true }, take: 100 })
    return (
        <>
            <Breadcrumb pageName="Номера" />
            <div className="space-y-10">
                <Suspense fallback={<MainTableSkeleton columns={columns} />}>
                    <MainTable columns={columns} data={phones} />
                </Suspense>
            </div>
        </>
    )
}
