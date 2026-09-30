"use client";

import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onNavigate: () => void;
}

const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
    const pathname = usePathname();

    const sections = [
        {
            title: "Getting Started",
            items: [
                { name: "Quick Start", icon: "⚡", path: "/quick-start" },
                { name: "Introduction", icon: "🚀", path: "/introduction" },
            ]
        },
        {
            title: "LLM API",
            items: [
                { name: "Models & Pricing", icon: "💳", path: "/capabilities/ai-models?tab=pricing" },
                { name: "Endpoints", icon: "🔌", path: "/capabilities/ai-models?tab=endpoints" },
                { name: "API Reference", icon: "📖", path: "/api-reference" },
                { name: "Billing & RUB", icon: "₽", path: "/billing" },
            ]
        }
    ];

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
            <div className={styles.sidebarLogo}>
                <Link href="/" className={styles.logoLink}>
                    <img src="/logo.svg" alt="Aporto Logo" style={{ width: 32, height: 32 }} />
                    <span className={styles.logoText}>Aporto</span>
                </Link>
            </div>

            <nav className={styles.sidebarNav}>
                {sections.map((section) => (
                    <div key={section.title} className={styles.navSection}>
                        <div className={styles.navSectionTitle}>{section.title}</div>
                        {section.items.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navItem} ${!item.path.includes("?") && pathname === item.path ? styles.activeNavItem : ""}`}
                                onClick={onNavigate}
                            >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

        </aside>
    );
};

export default Sidebar;
