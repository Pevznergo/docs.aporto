import type { Metadata } from "next";
import { Inter, Montserrat, Roboto } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

const inter = Inter({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700", "800"], variable: "--font-docs-inter" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700"], variable: "--font-docs-montserrat" });
const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500"], variable: "--font-docs-roboto" });

const themeBoot = `var t;try{var c=document.cookie.split('; ').find(function(v){return v.indexOf('aporto-theme=')===0});t=c&&c.slice(13)}catch(e){}try{if(t!=='light'&&t!=='dark')t=localStorage.getItem('aporto-theme')||localStorage.getItem('aporto-llm-theme')}catch(e){}if(t==='light'||t==='dark')document.documentElement.dataset.llmTheme=t`;

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
  const [locale, cookieStore] = await Promise.all([requestLocale(), cookies()]);
  const theme = cookieStore.get("aporto-theme")?.value === "dark" ? "dark" : "light";
  return (
    <html lang={locale} data-llm-theme={theme} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBoot }} /></head>
      <body className={`${inter.variable} ${montserrat.variable} ${roboto.variable}`}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
