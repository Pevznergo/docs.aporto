"use client";

import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Introduction", icon: "🚀", path: "/introduction" },
        { name: "AI Models", icon: "🤖", path: "/capabilities/ai-models" },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
                <Link href="/" className={styles.logoLink}>
                    <div style={{ width: 32, height: 32, background: "#00dc82", borderRadius: 6 }}></div>
                    <span className={styles.logoText}>aporto</span>
                </Link>
            </div>

            <nav className={styles.sidebarNav}>
                <div className={styles.navSection}>
                    <div className={styles.navSectionTitle}>Getting Started</div>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${pathname === item.path ? styles.activeNavItem : ""}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </nav>

        </aside>
    );
};

export default Sidebar;
