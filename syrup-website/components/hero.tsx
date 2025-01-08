"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LaptopSyrup from "@/public/LaptopSyrup.png";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

import { useTranslations } from 'next-intl';

export function Hero() {
    const t = useTranslations("HomePage");
    const [browser, setBrowser] = useState("Chrome");

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Chrome")) {
            setBrowser("Chrome");
        } else if (userAgent.includes("Firefox")) {
            setBrowser("Firefox");
        } else if (userAgent.includes("Safari")) {
            setBrowser("Safari");
        } else if (userAgent.includes("Edge")) {
            setBrowser("Edge");
        } else if (userAgent.includes("Opera")) {
            setBrowser("Opera");
        } else if (userAgent.includes("Arc")) {
            setBrowser("Arc");
        } else {
            setBrowser("Chromium based");
        }
    }, []);

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center h-[400px] order-1 md:order-none">
                <Image
                    src={LaptopSyrup}
                    alt="Laptop with Syrup"
                    className="rounded-lg hidden md:block"
                />
            </div>

            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                    {t.rich("hero-desc", {
                        br: () => <br/>
                    })}
                </h1>
                <p className="text-xl text-gray-600">
                    {t("hero-desc-detailed")}
                </p>
                <Button
                    size="lg"
                    className="bg-[#a82c04] hover:bg-[#8a2503] text-white px-8 mr-6"
                    asChild
                >
                    <Link href="/download">{t("hero-browser", {browser: browser})}</Link>
                </Button>
                <Button
                    size="lg"
                    className="bg-[#a82c04] hover:bg-[#8a2503] text-white px-8"
                    asChild
                >
                    <Link href="https://github.com/Abdallah-Alwarawreh/Syrup">
                        {t("hero-github")}
                    </Link>
                </Button>
            </div>
        </section>
    );
}
