"use client";

import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import type { DocsLocale } from "@/lib/docs-locale";
import { themeCookie, type AportoTheme } from "@/lib/theme";

export default function ThemeToggle({ locale }: { locale: DocsLocale }) {
    const [theme, setTheme] = useState<AportoTheme>("light");

    useEffect(() => {
        setTheme(document.documentElement.dataset.llmTheme === "dark" ? "dark" : "light");
    }, []);

    const label = locale === "ru" ? "Сменить тему" : "Switch theme";

    return (
        <button
            type="button"
            className={styles.themeButton}
            aria-label={label}
            title={label}
            aria-pressed={theme === "dark"}
            onClick={() => {
                const next: AportoTheme = theme === "dark" ? "light" : "dark";
                document.documentElement.dataset.llmTheme = next;
                try {
                    localStorage.setItem("aporto-theme", next);
                    localStorage.setItem("aporto-llm-theme", next);
                } catch {
                    // The page-level switch still works when storage is blocked.
                }
                try {
                    document.cookie = themeCookie(next, location.hostname, location.protocol);
                } catch {
                    // The page-level switch still works when cookies are blocked.
                }
                setTheme(next);
            }}
        >
            <span className={styles.lightThemeIcon} aria-hidden="true">☾</span>
            <span className={styles.darkThemeIcon} aria-hidden="true">☀</span>
        </button>
    );
}
