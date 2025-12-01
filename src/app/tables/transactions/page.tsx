import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MainTable } from "@/components/Tables/mainTable";
import { MainTableSkeleton } from "@/components/Tables/mainTable/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";
import prisma from '@/lib/prisma'

const columns = [
    { id: 'id', header: 'Номер', accessor: 'id', headerClass: '!text-left' },
    { id: 'client', header: 'Клиент', accessor: (r: any) => `${r.Clients?.family ?? ''} ${r.Clients?.name ?? ''}` },
    { id: 'phone', header: 'Телефон', accessor: (r: any) => r.Phones?.number ?? '' },
    { id: 'type', header: 'Тип', accessor: (r: any) => r.TransactionTypes?.name ?? '' },
    { id: 'amount', header: 'Счет', accessor: 'amount', render: (v: any) => `${Number(v).toFixed(2)}` },
    { id: 'minutes', header: 'Минут потрачено', accessor: 'minutesUsed' },
    { id: 'date', header: 'Дата проведения', accessor: (r: any) => new Date(r.transactionDate).toLocaleString() },
    { id: 'desc', header: 'Описание', accessor: 'description' },
]




export const metadata: Metadata = {
    title: "Транзакции",
};

const TransactionsPage = async ({ searchParams }: { searchParams: any }) => {
    const params = await searchParams
    const qs = new URLSearchParams(Object.entries(params ?? {})).toString()
    const transactions = await prisma.paymentTransactions.findMany({ include: { Clients: true, Phones: true, TransactionTypes: true, Services: true }, take: 200, orderBy: { transactionDate: 'desc' } })
    return (
        <>
            <Breadcrumb pageName="Транзакции" />

            <div className="space-y-10">

                <Suspense fallback={<MainTableSkeleton columns={columns} />}>
                    <MainTable columns={columns} data={transactions} />
                </Suspense>

            </div>
        </>
    );
};

export default TransactionsPage;
