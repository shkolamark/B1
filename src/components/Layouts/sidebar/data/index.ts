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
                                title: "Типы транзакций",
                                url: "/tables/phones-types",
                            },
                            {
                                title: "Типы телефонов",
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
            {
                title: "Forms",
                icon: Icons.Alphabet,
                items: [
                    {
                        title: "Form Elements",
                        url: "/forms/form-elements",
                    },
                    {
                        title: "Form Layout",
                        url: "/forms/form-layout",
                    },
                ],
            },
        ],
    },
    {
        label: "OTHERS",
        items: [
            {
                title: "Charts",
                icon: Icons.PieChart,
                items: [
                    {
                        title: "Basic Chart",
                        url: "/charts/basic-chart",
                    },
                ],
            },
            {
                title: "UI Elements",
                icon: Icons.FourCircle,
                items: [
                    {
                        title: "Alerts",
                        url: "/ui-elements/alerts",
                    },
                    {
                        title: "Buttons",
                        url: "/ui-elements/buttons",
                    },
                ],
            },

        ],
    },
];
