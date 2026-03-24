"use client";

import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const sections = [
        {
            title: "Getting Started",
            items: [
                { name: "Introduction", icon: "🚀", path: "/introduction" },
                { name: "How Aporto Works", icon: "⚙️", path: "/how-it-works" },
                { name: "Quick Start", icon: "⚡", path: "/quick-start" },
                { name: "Using Services", icon: "🛠️", path: "/using-services" },
                { name: "For AI Tools", icon: "🤖", path: "/for-agents" }
            ]
        },
        {
            title: "MCP Server",
            items: [
                { name: "MCP Setup", icon: "🔌", path: "/integration/mcp-servers/setup" },
                { name: "Core Tools", icon: "🔧", path: "/integration/mcp-servers/core-tools" },
                { name: "Compute Tools", icon: "💻", path: "/integration/mcp-servers/compute" },
                { name: "Database Tools", icon: "🗄️", path: "/integration/mcp-servers/database" },
                { name: "Messaging Tools", icon: "📨", path: "/integration/mcp-servers/messaging" },
                { name: "Scraping Tools", icon: "🕸️", path: "/integration/mcp-servers/scraping" }
            ]
        },
        {
            title: "Capabilities",
            items: [
                { name: "Capabilities Overview", icon: "🎯", path: "/capabilities" },
                { name: "Verify Users", icon: "✅", path: "/capabilities/verify" },
                { name: "Search the Web", icon: "🔍", path: "/capabilities/search" },
                { name: "AI Models", icon: "🤖", path: "/capabilities/ai-models" },
                { name: "Compute", icon: "☁️", path: "/capabilities/compute" },
                { name: "Data", icon: "📊", path: "/capabilities/data" },
                { name: "Messaging", icon: "💬", path: "/capabilities/messaging" },
                { name: "Generate Images", icon: "🖼️", path: "/capabilities/images" },
                { name: "Audio Services", icon: "🎵", path: "/capabilities/audio" },
                { name: "Browser Automation", icon: "🌐", path: "/capabilities/browser" }
            ]
        },
        {
            title: "Integration",
            items: [
                { name: "Agent Frameworks", icon: "🧩", path: "/integration/agent-frameworks" },
                { name: "LangChain", icon: "🦜", path: "/integration/agent-frameworks/langchain" },
                { name: "LangChain Classic", icon: "🦜", path: "/integration/agent-frameworks/langchain-classic" },
                { name: "HTTP Clients", icon: "🌐", path: "/integration/http-clients" },
                { name: "Axios", icon: "🚀", path: "/integration/http-clients/axios" },
                { name: "Fetch", icon: "⚡", path: "/integration/http-clients/fetch" },
                { name: "Node HTTP", icon: "📦", path: "/integration/http-clients/node-http" }
            ]
        }
    ];

    return (
        <aside className={styles.sidebar}>
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
                                className={`${styles.navItem} ${pathname === item.path ? styles.activeNavItem : ""}`}
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
