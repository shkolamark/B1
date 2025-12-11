import * as Icons from "../icons";

export const NAV_DATA = [
    {
        label: "ОСНОВНОЕ МЕНЮ",
        items: [
            {
                title: "Панель",
                icon: Icons.HomeIcon,
                url: '/',
                items: [],
            },
            {
                title: "Таблицы",
                icon: Icons.Table,
                items: [
                    {
                        title: "Транзакции",
                        url: "/tables/transactions",
                    },
                    {
                        title: "Клиенты",
                        url: "/tables/clients",
                    },
                    {
                        title: "Телефоны",
                        url: "/tables/phones",
                    },
                    {
                        title: "Тарифы",
                        url: "/tables/services",
                    },
                    {
                        title: "Услуги",
                        url: "/tables/tariffs",
                    },
                    {
                        title: "Справочники",
                        items: [
                            {
                                title: "Типы телефонов",
                                url: "/tables/phones-types",
                            },
                            {
                                title: "Типы транзакций",
                                url: "/tables/transactions-types",
                            },
                        ]
                    },
                    {
                        title: "Связи",
                        items: [
                            {
                                title: "Услуги к телефонам",
                                url: "/tables/phones-services",
                            },
                        ]
                    },
                ],
            },
        ],
    },
];
