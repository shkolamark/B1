import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "./icons";

const THEMES = [
    {
        name: "light",
        Icon: Sun,
        label: "Light"
    },
    {
        name: "dark",
        Icon: Moon,
        label: "Dark"
    },
];

export function ThemeToggleSwitch() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    return (
        <div className="relative w-full">


            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="group relative flex h-[42px] w-full items-center rounded-t-full bg-gray-3 text-[#111928] outline-1 outline-primary focus-visible:outline dark:bg-[#020D1A] dark:text-current"
            >
                <span className="sr-only">
                    Switch to {theme === "light" ? "dark" : "light"} mode
                </span>

                <div className="flex h-full w-full">
                    {THEMES.map(({ name, Icon, label }) => (
                        <div
                            key={name}
                            className={cn(
                                " h-full w-1/2  gap-2 rounded-t-full relative z-10 transition-colors text-sm font-medium",
                                name === theme
                                    ? "text-current"
                                    : "text-muted-foreground"
                            )}
                        >
                            <div className={cn("h-full flex items-center justify-center",
                                name == "light" && "ml-[-10px]"
                            )}>
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                <span>{label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </button>
            {/* Indicator */}
            <div
                className={cn(
                    "absolute inset-y-0 h-[42px] w-1/2 rounded-t-full border border-gray-200 bg-white transition-all duration-300 z-0 shadow-sm",
                    isDark
                        ? "right-0"
                        : "left-0",
                    "dark:bg-dark-2 dark:border-transparent dark:shadow-md dark:group-hover:bg-dark-3"
                )}
            />

        </div>
    );
}
