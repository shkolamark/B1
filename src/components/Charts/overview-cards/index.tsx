import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";

type PropsType = {
    data?: {
        totalClients: number;
        transactionsCount: number;
        transactionsSum: number;
        negativeClients: number;
    };
};

export async function OverviewCardsGroup({ data: providedData }: PropsType = {}) {
    const data = providedData ?? {
        totalClients: 0,
        transactionsCount: 0,
        transactionsSum: 0,
        negativeClients: 0,
    };

    const views = { value: data.totalClients };
    const profit = { value: data.transactionsSum };
    const products = { value: data.transactionsCount };
    const users = { value: data.negativeClients };

    return (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <OverviewCard
                label="Всего клиентов"
                data={{
                    ...views,
                    value: compactFormat(views.value),
                }}
                Icon={icons.Views}
            />

            <OverviewCard
                label="Сумма транзакций"
                data={{
                    ...profit,
                    value: compactFormat(profit.value),
                }}
                Icon={icons.Profit}
            />

            <OverviewCard
                label="Количество транзакций"
                data={{
                    ...products,
                    value: compactFormat(products.value),
                }}
                Icon={icons.Product}
            />

            <OverviewCard
                label="Количество отрицательных клиентов"
                data={{
                    ...users,
                    value: compactFormat(users.value),
                }}
                Icon={icons.Users}
            />
        </div>
    );
}
