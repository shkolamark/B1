import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { MainTable } from '@/components/Tables/mainTable'
import { MainTableSkeleton } from '@/components/Tables/mainTable/skeleton'
import ClientsFilter from '@/components/Tables/ClientFilters/ClientsFilter'
import RowActions from '@/components/Tables/Actions/RowActions'
import AddClientButton from '@/components/Clients/AddClientButton'
import PaginationControls from '@/components/Tables/Pagination/PaginationControls'
import prisma from '@/lib/prisma'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = { title: 'Клиенты' }

const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'ФИО', accessor: (r: any) => `${r.family ?? ''} ${r.name ?? ''} ${r.secname ?? ''}` },
    { id: 'birthday', header: 'День рождения', accessor: (r: any) => r.birthday ? new Date(r.birthday).toLocaleDateString() : '' },
    { id: 'sex', header: 'Пол', accessor: 'sex' },
    { id: 'balance', header: 'Баланс', accessor: 'balance', render: (v: any) => `${Number(v).toFixed(2)}` },
    { id: 'notes', header: 'Примечания', accessor: 'notes' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} /> },
]

export default async function ClientsPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams
    const q = params?.q ?? ''
    const sex = params?.sex ?? ''
    const minBalance = params?.minBalance
    const page = Number(params?.page ?? 1)
    const limit = Number(params?.limit ?? 50)

    // server side total calculation
    const where: any = {}
    if (q) {
        where.OR = [
            { family: { contains: q, mode: 'insensitive' } },
            { name: { contains: q, mode: 'insensitive' } },
            { secname: { contains: q, mode: 'insensitive' } },
        ]
    }
    if (sex) where.sex = sex
    if (minBalance) where.balance = { gte: Number(minBalance) }
    const total = await prisma.clients.count({ where })
    const clients = await prisma.clients.findMany({ where, include: { Phones: true }, skip: (page - 1) * limit, take: limit })
    const qs = new URLSearchParams(Object.entries(params ?? {})).toString()
    const fetchUrl = `/api/tables/clients${qs ? `?${qs}` : ''}`


    return (
        <>
            <Breadcrumb pageName="Клиенты" />
            <div className="space-y-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ClientsFilter />
                        <AddClientButton />
                    </div>
                    <PaginationControls total={total} />
                </div>
                <Suspense fallback={<MainTableSkeleton columns={columns} />}>
                    <MainTable columns={columns} data={clients} />
                </Suspense>
            </div>
        </>
    )
}
