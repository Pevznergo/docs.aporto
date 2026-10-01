export type DocsLocale = "en" | "ru";

export function localeFromPathname(pathname: string): DocsLocale {
    return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";
}

export function withLocale(pathname: string, locale: DocsLocale, suffix = ""): string {
    const englishPath = pathname === "/ru"
        ? "/"
        : pathname.startsWith("/ru/")
            ? pathname.slice(3)
            : pathname;

    const localizedPath = locale === "en" ? englishPath : englishPath === "/" ? "/ru" : `/ru${englishPath}`;
    return `${localizedPath}${suffix}`;
}
