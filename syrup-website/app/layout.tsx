import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
    title: "Syrup",
    description: "Syrup, a Honey alternative",
};

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();
    return (
        <>
            <html lang={locale} suppressHydrationWarning>
                <head />
                <body className={roboto.className}>
                    <NextIntlClientProvider messages={messages}>
                        <Header />
                        {children}
                        <Footer />
                    </NextIntlClientProvider>
                </body>
            </html>
        </>
    );
}
