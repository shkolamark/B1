import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'
import prisma from '@/lib/prisma'

export const metadata: Metadata = { title: 'Услуги к телефонам' }

const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'client', header: 'Услуга', accessor: (r: any) => r.Services?.name ?? '' },
    { id: 'phone', header: 'Телефон', accessor: (r: any) => r.Phones?.number ?? '' },
    { id: 'date', header: 'Оплата', accessor: (r: any) => r.PaymentTransactions.amount ?? "" },
    { id: 'payment', header: 'Дата подключения', accessor: (r: any) => new Date(r.connectDate).toLocaleString() },
]
export default async function PhonesServicesPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams
    const qs = new URLSearchParams(Object.entries(params ?? {})).toString()
    const phonesServices = await prisma.phoneServices.findMany({ include: { Phones: true, PaymentTransactions: true, Services: true }, take: 200, orderBy: { connectDate: 'desc' } })
    const fetchUrl = `/api/tables/phones-services${qs ? `?${qs}` : ''}`
    return (
        <>
            <Breadcrumb pageName="Услуги к телефонам" />
            <div className="space-y-10">
                <Suspense fallback={<MainTableSkeleton columns={columns} />}>
                    <MainTable columns={columns} data={phonesServices} />
                </Suspense>
            </div>
        </>
    )
}
