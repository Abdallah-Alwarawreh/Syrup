"use client";

import React from "react";
import NavigationHeader from "@/components/NavigationHeader";
import LaptopSyrup from "@/public/LaptopSyrup.png";
import Image from "next/image";
import { Pacifico, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import HeroAbstract from "@/public/HeroAbstract.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Testimonials from "@/components/Testimonials";

const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
});

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function Home() {
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    const userTestimonials = [
        {
            name: "Alex Johnson",
            avatar: "https://via.placeholder.com/100", // Temporary avatar placeholder
            role: "Tech Enthusiast",
            testimonial:
                "Syrup made saving money online so easy! I love that it’s open-source and transparent.",
        },
        {
            name: "Maria Lopez",
            avatar: "https://via.placeholder.com/100",
            role: "Frequent Shopper",
            testimonial:
                "I’ve tried other coupon tools, but Syrup feels so much safer and more trustworthy.",
        },
        {
            name: "James Patel",
            avatar: "https://via.placeholder.com/100",
            role: "Student",
            testimonial:
                "As a student on a budget, Syrup has been a lifesaver for finding deals effortlessly.",
        },
        {
            name: "Emily Brown",
            avatar: "https://via.placeholder.com/100",
            role: "Privacy Advocate",
            testimonial:
                "It’s refreshing to see a coupon tool that respects user privacy. Syrup is a game-changer!",
        },
    ];

    return (
        <main className={roboto.className}>
            <NavigationHeader title="Syrup" links={navLinks} />
            {/* Hero */}
            <div className="relative bg-[#A02801] flex flex-row items-center text-center px-4 sm:px-16 pt-32 overflow-hidden h-screen">
                {/* Right */}
                <motion.div
                    initial={{
                        transform: "translateY(0px)",
                    }}
                    animate={{
                        transform: "translateY(-6px)",
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2,
                        ease: "easeInOut",
                    }}
                    className="flex-1 p-8 justify-center items-center h-full hidden lg:flex"
                >
                    <Image
                        src={LaptopSyrup}
                        alt="Laptop with Syrup"
                        className="max-w-full h-auto rounded-lg"
                        quality={100}
                    />
                </motion.div>

                {/* Left */}
                <div className="flex-1 flex flex-col h-full text-primary-foreground text-left gap-8">
                    <h1 className={cn(pacifico.className, "text-5xl")}>
                        Syrup
                    </h1>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl sm:text-5xl">
                            Save Money. Stay Transparent.
                        </h1>
                        <p className="text-lg">
                            Syrup is the ethical, open-source browser extension
                            that finds and applies the best discounts,
                            <b>
                                {" "}
                                no tracking, no bullshit, just savings you can
                                trust.
                            </b>
                        </p>
                    </div>

                    <div className="flex flex-row gap-4">
                        <Button variant="default" asChild>
                            <Link href="/download">Get Now</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>

                {/* Abstract svgs */}
                <div className="absolute bottom-0 right-0 w-full h-full -z-1 select-none pointer-events-none">
                    <Image
                        src={HeroAbstract}
                        alt="Hero Abstract"
                        className="absolute bottom-0 sm:-bottom-8 md:-bottom-32 -right-8"
                    />
                </div>
            </div>

            {/* How It Works */}
            <div className="flex flex-col w-full py-16">
                <h1 className="text-5xl font-bold text-center py-16">
                    How It Works
                </h1>
                <div className="flex flex-col md:flex-row w-full justify-center px-16 gap-4 lg:gap-16">
                    <Card className="flex-1 shadow-lg transition-all hover:shadow-xl hover:scale-105">
                        <CardHeader className="flex flex-row items-center justify-center gap-2">
                            <CardTitle className="text-lg font-medium">
                                Install Syrup
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Download the extension from the Chrome Web Store
                                or Firefox Add-ons.
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Icon
                                icon="mdi:download"
                                width="32"
                                height="32"
                                className="text-primary"
                            />
                        </CardFooter>
                    </Card>

                    <Card className="flex-1 shadow-lg transition-all hover:shadow-xl hover:scale-105">
                        <CardHeader className="flex flex-row items-center justify-center gap-2">
                            <CardTitle className="text-lg font-medium">
                                Browse Your Favorite Stores
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Shop at your favorite stores and let Syrup find
                                the best discounts for you.
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Icon
                                icon="mdi:shopping"
                                width="32"
                                height="32"
                                className="text-primary"
                            />
                        </CardFooter>
                    </Card>

                    <Card className="flex-1 shadow-lg transition-all hover:shadow-xl hover:scale-105">
                        <CardHeader className="flex flex-row items-center justify-center gap-2">
                            <CardTitle className="text-lg font-medium">
                                Save Money
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Syrup will automatically apply the best
                                discounts at checkout, saving you money.
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Icon
                                icon="mdi:cash"
                                width="32"
                                height="32"
                                className="text-primary"
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* TODO: Why Choose Syrup? */}
            <div className="flex flex-col w-full py-16 ">
                {/* Section 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-start w-full bg-blue-200">
                    <div className="md:w-1/2 p-6">
                        <img
                            src="https://placehold.co/400"
                            alt="Smart Coupon Finder"
                            className="rounded-lg shadow-md float-left"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <h3 className="text-2xl font-bold mb-4">
                            Smart Coupon Finder
                        </h3>
                        <p>
                            Syrup automatically finds and applies the best
                            coupons at checkout, saving you time and money with
                            zero effort.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start w-full bg-green-200">
                    <div className="md:w-1/2 p-6">
                        <img
                            src="https://placehold.co/400"
                            alt="Privacy Focused"
                            className="rounded-lg shadow-md float-right"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <h3 className="text-2xl font-bold mb-4">
                            Privacy-Focused
                        </h3>
                        <p>
                            Unlike other tools, Syrup doesn’t track your data or
                            compromise your privacy. Your savings, your terms.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col md:flex-row items-center md:items-start w-full bg-orange-200">
                    <div className="md:w-1/2 p-6">
                        <img
                            src="https://placehold.co/400"
                            alt="Open Source & Transparent"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <h3 className="text-2xl font-bold mb-4">
                            Open Source & Transparent
                        </h3>
                        <p>
                            Syrup is built on trust and transparency. With
                            open-source code, you can verify every line and
                            contribute to the project.
                        </p>
                    </div>
                </div>
            </div>

            {/* User Testimonials */}
            <Testimonials />
        </main>
    );
}
