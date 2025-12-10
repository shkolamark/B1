import { OverviewDiagram } from "@/components/Charts/overview-diagram";
import { DonutDiagram } from "@/components/Charts/donut-diagram";
import { ProfitDiagram } from "@/components/Charts/profit-diagram";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { OverviewCardsGroup } from "../../components/Charts/overview-cards";
import { OverviewCardsSkeleton } from "../../components/Charts/overview-cards/skeleton";
import { getDashboardData } from "../api/home/_lib/server";


type PropsType = {
    searchParams: Promise<{
        selected_time_frame?: string;
    }>;
};

export default async function Home({ searchParams }: PropsType) {
    const { selected_time_frame } = await searchParams;
    const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

    const dashboard = await getDashboardData()

    return (
        <>
            <Suspense fallback={<OverviewCardsSkeleton />}>
                <OverviewCardsGroup data={dashboard.overview} />
            </Suspense>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
                <OverviewDiagram
                    className="col-span-12 xl:col-span-7"
                    key={extractTimeFrame("payments_overview")}
                    data={dashboard.transactionsOverTime}
                />

                <ProfitDiagram
                    key={extractTimeFrame("weeks_profit")}
                    timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
                    className="col-span-12 xl:col-span-5"
                    data={dashboard.balanceSummary}
                />

                <DonutDiagram
                    className="col-span-12 xl:col-span-5"
                    key={extractTimeFrame("used_devices")}
                    title="Использование тарифов"
                    data={dashboard.tariffsUsage}
                />
                <DonutDiagram
                    className="col-span-12 xl:col-span-5"
                    key={extractTimeFrame("used_devices")}
                    title="Использование услуг"
                    data={dashboard.servicesUsage}
                />

            </div>
        </>
    );
}
