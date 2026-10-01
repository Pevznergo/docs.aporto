export type AportoTheme = "light" | "dark";

export function themeCookie(theme: AportoTheme, hostname: string, protocol: string): string {
    const shared = hostname === "aporto.tech" || hostname.endsWith(".aporto.tech");
    return `aporto-theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax${shared ? "; Domain=.aporto.tech" : ""}${protocol === "https:" ? "; Secure" : ""}`;
}
