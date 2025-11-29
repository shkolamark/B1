import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { MainTable } from "@/components/Tables/mainTable";
import { TopChannelsSkeleton } from "@/components/Tables/mainTable/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Tables",
};

const TransactionsPage = () => {
    return (
        <>
            <Breadcrumb pageName="Tables" />

            <div className="space-y-10">

                <Suspense fallback={<TopChannelsSkeleton />}>
                    <MainTable />
                </Suspense>

            </div>
        </>
    );
};

export default TransactionsPage;
