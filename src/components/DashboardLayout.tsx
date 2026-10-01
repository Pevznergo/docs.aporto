"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./layout.module.css";
import { localeFromPathname } from "@/lib/docs-locale";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const locale = localeFromPathname(pathname);

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} onNavigate={() => setIsSidebarOpen(false)} />
            <button
                className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayVisible : ""}`}
                type="button"
                aria-label={locale === "ru" ? "Закрыть навигацию" : "Close navigation"}
                onClick={() => setIsSidebarOpen(false)}
            />
            <main className={styles.mainContent}>
                <Header locale={locale} pathname={pathname} onMenuClick={() => setIsSidebarOpen(true)} />
                <div className={styles.contentBody}>{children}</div>
            </main>
        </div>
    );
};

export default DashboardLayout;
