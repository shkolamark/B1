import { PeriodPicker } from "@/components/ui/period-picker";
import { standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { getPaymentsOverviewData } from "@/services/charts.services";
import { OverviewDiagramChart } from "./chart";

type PropsType = {
    className?: string;
    data?: {
        received: { x: unknown; y: number }[];
        due: { x: unknown; y: number }[];
    };
};

export async function OverviewDiagram({
    className,
    data: providedData,
}: PropsType) {
    const data = providedData ?? (await getPaymentsOverviewData());

    return (
        <div
            className={cn(
                "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
                    Транзакции
                </h2>

            </div>

            <OverviewDiagramChart data={data} />

        </div>
    );
}
