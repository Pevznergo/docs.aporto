import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

async function requestLocale() {
  return (await headers()).get("x-docs-locale") === "ru" ? "ru" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  return await requestLocale() === "ru" ? {
    title: "Документация Aporto LLM API",
    description: "Быстрый старт, эндпоинты, модели, цены, потоковые ответы, ошибки и оплата Aporto LLM API.",
  } : {
    title: "Aporto LLM API Documentation",
    description: "Quick start, endpoints, model pricing, streaming, errors, and billing for the Aporto LLM API",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await requestLocale();
  return (
    <html lang={locale}>
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
