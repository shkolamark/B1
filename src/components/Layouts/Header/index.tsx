"use client";
import React from 'react'
import { MenuIcon } from './icons'
import { useSidebarContext } from "../sidebar/sidebar-context";

export default function Header() {
    const { toggleSidebar, isMobile } = useSidebarContext();

    return (
        <>
            {isMobile &&
                <header className="sticky top-0 flex px-4 py-5">
                    <button
                        onClick={toggleSidebar}
                    >
                        <MenuIcon className="w-10 h-10" />
                    </button>
                </header>
            }
        </>
    )
}
