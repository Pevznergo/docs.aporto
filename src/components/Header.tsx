"use client";

import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type DocsLocale, withLocale } from "@/lib/docs-locale";

interface HeaderProps {
    locale: DocsLocale;
    pathname: string;
    onMenuClick: () => void;
}

const Header = ({ locale, pathname, onMenuClick }: HeaderProps) => {
    const searchParams = useSearchParams();
    const [hash, setHash] = useState("");

    useEffect(() => {
        const updateHash = () => setHash(window.location.hash);
        updateHash();
        window.addEventListener("hashchange", updateHash);
        return () => {
            window.removeEventListener("hashchange", updateHash);
        };
    }, [pathname]);
    const query = new URLSearchParams(searchParams.toString());
    query.delete("lang");
    const locationSuffix = `${query.size ? `?${query}` : ""}${hash}`;

    return (
        <header className={styles.header}>
            <button
                className={styles.menuButton}
                type="button"
                aria-label={locale === "ru" ? "Открыть навигацию" : "Open navigation"}
                onClick={onMenuClick}
            >
                <span />
                <span />
                <span />
            </button>
            <div className={styles.headerActions}>
                <nav className={styles.languageSwitch} aria-label={locale === "ru" ? "Язык документации" : "Documentation language"}>
                    {(["en", "ru"] as const).map((target) => (
                        <a
                            key={target}
                            href={withLocale(pathname, target, locationSuffix)}
                            hrefLang={target}
                            lang={target}
                            aria-current={locale === target ? "page" : undefined}
                            className={`${styles.languageLink} ${locale === target ? styles.activeLanguageLink : ""}`}
                        >
                            {target.toUpperCase()}
                        </a>
                    ))}
                </nav>
                <nav className={`${styles.languageSwitch} ${styles.contactLinks}`} aria-label={locale === "ru" ? "Связаться с Aporto" : "Contact Aporto"}>
                    <a href="mailto:pevzner@aporto.tech" className={styles.languageLink}>Email</a>
                    <a href="https://t.me/apitoai_bot" className={styles.languageLink}>Telegram</a>
                </nav>
                <Link href={locale === "ru" ? "https://app.aporto.tech/?lang=ru" : "https://app.aporto.tech"} className={styles.dashboardButton}>
                    {locale === "ru" ? "Личный кабинет" : "Dashboard"}
                </Link>
            </div>
        </header>
    );
};

export default Header;
