import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { ToastContainer } from 'react-toastify'
import Header from "@/components/Layouts/Header";
export const metadata: Metadata = {
    title: {
        template: "%s | B1 Admin",
        default: "B1 Admin",
    },
    description:
        "Admin panel of a mobile operator B1",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body>
                <Providers>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <NextTopLoader color="#5750F1" showSpinner={false} />

                    <div className="flex min-h-screen">
                        <Sidebar />

                        <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                            <Header />

                            <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                                {children}
                            </main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
