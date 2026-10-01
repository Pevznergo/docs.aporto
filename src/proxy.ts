import { NextResponse, type NextRequest } from "next/server";
import { withLocale } from "./lib/docs-locale";

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (pathname === "/api" || pathname.startsWith("/api/") || pathname.startsWith("/_next/") || /\.[^/]+$/.test(pathname)) {
        return NextResponse.next();
    }

    if (request.nextUrl.searchParams.get("lang") === "ru") {
        const url = request.nextUrl.clone();
        url.pathname = withLocale(pathname, "ru");
        url.searchParams.delete("lang");
        return NextResponse.redirect(url, 308);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-docs-locale", pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en");
    return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
    matcher: ["/:path*"],
};
