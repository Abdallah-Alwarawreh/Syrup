import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "Syrup",
    description: "Syrup, a Honey alternative",
};

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body className={roboto.className}>{children}</body>
            </html>
        </>
    );
}
