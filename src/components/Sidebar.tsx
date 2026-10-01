"use client";

import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { localeFromPathname, withLocale } from "@/lib/docs-locale";

interface SidebarProps {
    isOpen: boolean;
    onNavigate: () => void;
}

const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = localeFromPathname(pathname);
    const currentPath = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`;

    const sections = locale === "ru" ? [
        {
            title: "Начало работы",
            items: [
                { name: "Быстрый старт", icon: "⚡", path: "/quick-start" },
                { name: "Введение", icon: "🚀", path: "/introduction" },
            ]
        },
        {
            title: "LLM API",
            items: [
                { name: "Модели и цены", icon: "💳", path: "/capabilities/ai-models?tab=pricing" },
                { name: "Эндпоинты", icon: "🔌", path: "/capabilities/ai-models?tab=endpoints" },
                { name: "Справочник API", icon: "📖", path: "/api-reference" },
                { name: "Баланс и оплата", icon: "💳", path: "/billing" },
            ]
        }
    ] : [
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
                { name: "Models & Pricing", icon: "🤖", path: "/capabilities/ai-models?tab=pricing" },
                { name: "Endpoints", icon: "🔌", path: "/capabilities/ai-models?tab=endpoints" },
                { name: "API Reference", icon: "📖", path: "/api-reference" },
                { name: "Billing", icon: "💳", path: "/billing" },
            ]
        }
    ];

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
            <div className={styles.sidebarLogo}>
                <Link href={withLocale("/introduction", locale)} className={styles.logoLink} onClick={onNavigate}>
                    <img src="/logo.svg" alt="Aporto" style={{ width: 32, height: 32 }} />
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
                                href={withLocale(item.path, locale)}
                                aria-label={item.name}
                                aria-current={currentPath === withLocale(item.path, locale) ? "page" : undefined}
                                className={`${styles.navItem} ${currentPath === withLocale(item.path, locale) ? styles.activeNavItem : ""}`}
                                onClick={onNavigate}
                            >
                                <span aria-hidden="true">{item.icon}</span>
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
