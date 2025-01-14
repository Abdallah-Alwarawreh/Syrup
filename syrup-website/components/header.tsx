"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

import { useTranslations } from 'next-intl';

export function Header() {
    const t = useTranslations("Common");
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const header = document.querySelector("header");
            if (window.scrollY > lastScrollY) {
                header?.classList.add("scroll");
            } else {
                header?.classList.remove("scroll");
            }
            lastScrollY = window.scrollY;
            if (window.scrollY !== 0) {
                header?.classList.add("scrolled");
            } else {
                header?.classList.remove("scrolled");
                header?.classList.remove("scroll");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="flex justify-between items-center fixed top-0 left-0 w-full px-[10%] h-[10vh] text-black z-[1000] backdrop-blur-[5px] transition-all duration-300">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/Syrup.svg"
                    alt="Syrup Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-semibold">Syrup</span>
            </Link>
            <nav className="flex justify-between items-center gap-[20%]">
                <Link
                    href="/about"
                    className="text-gray-500 hover:text-primary whitespace-nowrap"
                >
                    {t("header-about")}
                </Link>
                <Button className="whitespace-nowrap bg-[#a82c04] hover:bg-[#8a2503]" asChild>
                    <Link href="/download">{t("header-download")}</Link>
                </Button>
            </nav>
        </header>
    );
}
