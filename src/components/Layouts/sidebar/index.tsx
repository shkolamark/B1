"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import { RecursiveMenuItem } from "./RecursiveMenuItem";
import { ThemeToggleSwitch } from "./theme-toggle";

export function Sidebar() {
    const pathname = usePathname();
    const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpanded = (title: string) => {
        setExpandedItems(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    useEffect(() => {
        // Keep collapsible open, when it's subpage is active
        NAV_DATA.some((section) => {
            return section.items.some((item) => {
                return item.items.some((subItem) => {
                    if (subItem.url === pathname) {
                        if (!expandedItems.includes(item.title)) {
                            toggleExpanded(item.title);
                        }

                        // Break the loop
                        return true;
                    }
                });
            });
        });
    }, [pathname]);

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={cn(
                    "max-w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark flex flex-col justify-between",
                    isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
                    isOpen ? "w-full" : "w-0",
                )}
                aria-label="Main navigation"
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
                    <div className="relative pr-4.5">
                        <Link
                            href={"/"}
                            onClick={() => isMobile && toggleSidebar()}
                            className="px-0 py-2.5 min-[850px]:py-0"
                        >
                            <Logo />
                        </Link>

                        {isMobile && (
                            <button
                                onClick={toggleSidebar}
                                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
                            >
                                <span className="sr-only">Close Menu</span>

                                <ArrowLeftIcon className="ml-auto size-7" />
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
                        {NAV_DATA.map((section) => (
                            <div key={section.label} className="mb-6">
                                <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                                    {section.label}
                                </h2>
                                <nav role="navigation" aria-label={section.label}>
                                    <ul className="space-y-2">
                                        {section.items.map((item) => (
                                            <RecursiveMenuItem
                                                key={item.title}
                                                item={item}
                                                pathname={pathname}
                                                expandedItems={expandedItems}
                                                toggleExpanded={toggleExpanded}
                                                level={0}
                                            />
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="fixed bottom-0 w-[290px]">
                    <ThemeToggleSwitch />
                </div>
            </aside>
        </>
    );
}
