"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./layout.module.css";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} onNavigate={() => setIsSidebarOpen(false)} />
            <button
                className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayVisible : ""}`}
                type="button"
                aria-label="Close navigation"
                onClick={() => setIsSidebarOpen(false)}
            />
            <main className={styles.mainContent}>
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <div className={styles.contentBody}>{children}</div>
            </main>
        </div>
    );
};

export default DashboardLayout;
