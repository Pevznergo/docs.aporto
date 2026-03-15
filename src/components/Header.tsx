"use client";

import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link href="https://app.aporto.tech" className={styles.dashboardButton}>
                Dashboard
            </Link>
        </header>
    );
};

export default Header;
