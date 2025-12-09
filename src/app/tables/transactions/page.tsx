import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MainTable } from "@/components/Tables/mainTable";
import { MainTableSkeleton } from "@/components/Tables/mainTable/skeleton";
import TransactionsFilter from "./_internal/components/TransactionsFilter";
import AddTransactionsButton from "./_internal/components/AddTransactionsButton";
import PaginationControls from "@/components/Tables/Pagination/PaginationControls";
import { listTransactions } from "@/app/api/tables/transactions/_lib/transactions.repository";
import { Metadata } from "next";
import { Suspense } from "react";
import { transactionsColumns } from './_internal/config/columns'
import { buildTransactionsQuery, TransactionsSearchParams } from './_internal/lib/params'
import { buildTransactionsFetchUrl } from './_internal/lib/url'

export const metadata: Metadata = {
    title: "Транзакции",
};

type TransactionsPageProps = {
    searchParams?: Promise<TransactionsSearchParams>
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
    const params = await searchParams
    const query = buildTransactionsQuery(params)

    const { items: transactionsRaw, total } = await listTransactions(query.raw)

    const transactions = transactionsRaw.map((t) => ({
        ...t,
        amount: Number(t.amount),
    }))

    const fetchUrl = buildTransactionsFetchUrl('/api/tables/transactions', query)

    return (
        <>
            <Breadcrumb pageName="Транзакции" />
            <div className="space-y-10">
                <div className="flex items-center gap-5 justify-between">
                    <TransactionsFilter />
                    <div className="flex flex-col items-center gap-2 justify-between">
                        <AddTransactionsButton />
                        <PaginationControls total={total} limit={query.limit || 10} />
                    </div>
                </div>

                <Suspense fallback={<MainTableSkeleton columns={transactionsColumns} />}>
                    <MainTable columns={transactionsColumns} data={transactions} fetchUrl={fetchUrl} />
                </Suspense>
            </div>
        </>
    );
};

export default TransactionsPage;
