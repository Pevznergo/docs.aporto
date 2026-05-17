"use client";

import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <button
                className={styles.menuButton}
                type="button"
                aria-label="Open navigation"
                onClick={onMenuClick}
            >
                <span />
                <span />
                <span />
            </button>
            <Link href="https://app.aporto.tech" className={styles.dashboardButton}>
                Dashboard
            </Link>
        </header>
    );
};

export default Header;
