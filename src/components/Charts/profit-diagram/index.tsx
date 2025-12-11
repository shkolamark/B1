import { PeriodPicker } from "@/components/UI/period-picker";
import { cn } from "@/lib/utils";
import { getWeeksProfitData } from "@/services/charts.services";
import { ProfitDiagramChart } from "./chart";

type PropsType = {
    timeFrame?: string;
    className?: string;
    data?: { sales: { x: string; y: number }[]; revenue: { x: string; y: number }[] };
};

export async function ProfitDiagram({ className, data: providedData }: PropsType) {
    const data = providedData ?? (await getWeeksProfitData());

    return (
        <div
            className={cn(
                "rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
                    Баланс пользователей
                </h2>
            </div>

            <ProfitDiagramChart data={data} />
        </div>
    );
}
