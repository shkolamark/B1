import { PeriodPicker } from "@/components/UI/period-picker";
import { cn } from "@/lib/utils";
import { getDevicesUsedData } from "@/services/charts.services";
import { DonutChart } from "./chart";

type PropsType = {
    title?: string;
    className?: string;
    timeFrame?: string;
    data?: { name: string; percentage?: number; amount: number }[];
};

export async function DonutDiagram({
    title,
    className,
    timeFrame,
    data: providedData,
}: PropsType) {
    const data = providedData ?? (await getDevicesUsedData(timeFrame as any));

    return (
        <div
            className={cn(
                "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
                    {title}
                </h2>
            </div>

            <div className="grid place-items-center">
                <DonutChart data={data} />
            </div>
        </div>
    );
}

export const UsedDevices = DonutDiagram;
