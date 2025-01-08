"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import developers from "@/public/about/developer.json";
import translation from "@/public/about/translation.json";

import { useTranslations } from 'next-intl';

const Developers = JSON.stringify(developers);
const Translation = JSON.stringify(translation);

export default function About() {
    const t = useTranslations("About");
    const [DevelopersElement, setDevelopers] = useState<JSX.Element[]>([]);
    const [TranslationElement, setTranslation] = useState<JSX.Element[]>([]);
    const [ContributorsElement, setContributors] = useState<JSX.Element[]>([]);

    const contributorsRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const GITHUB_API_URL = "https://api.github.com/repos/";
    const REPO_OWNER = "Abdallah-Alwarawreh";
    const REPO_NAME = "syrup";

    useEffect(() => {
        const fetchContributors = async () => {
            const DeveloperArray: JSX.Element[] = [];
            const TranslationArray: JSX.Element[] = [];
            const ContributorsArray: JSX.Element[] = [];

            const response = await fetch(
                `${GITHUB_API_URL}${REPO_OWNER}/${REPO_NAME}/contributors`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch contributors");
            }
            const contributorsRAW = await response.json();
            contributorsRAW.forEach((contributor: any) => {
                const formattedLogin = contributor.login.replace(/-/g, " ");
                if (
                    developers.some((dev: any) => dev.name === formattedLogin)
                ) {
                    DeveloperArray.push(
                        <div
                            key={contributor.login}
                            className="flex flex-col items-center rounded-lg border bg-card p-6 text-center transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                            <img
                                src={contributor.avatar_url}
                                alt={formattedLogin}
                                className="mb-4 rounded-full w-32 h-32"
                            />
                            <h3 className="mb-1 text-xl font-semibold">
                                {formattedLogin}
                            </h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {developers.find(
                                    (dev: any) => dev.name === formattedLogin
                                )?.role || t("contributor")}
                            </p>
                            <a
                                href={contributor.html_url}
                                target="_blank"
                                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                            >
                                <Github className="lucide lucide-github mr-1 h-4 w-4" />{" "}
                                {t("github-profile")}
                            </a>
                        </div>
                    );
                } else {
                    ContributorsArray.push(
                        <div
                            key={contributor.login}
                            className="rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                            <img
                                src={contributor.avatar_url}
                                alt={formattedLogin}
                                className="mb-3 w-12 h-12 rounded-full"
                            />
                            <h3 className="mb-3 text-xl font-semibold">
                                {formattedLogin}
                            </h3>
                            <p className="text-muted-foreground">
                                {t("contributions", { contribs: contributor.contributions})}
                            </p>
                            <a
                                href={contributor.html_url}
                                target="_blank"
                                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mt-3"
                            >
                                <Github className="lucide lucide-github mr-1 h-4 w-4" />{" "}
                                {t("github-profile")}
                            </a>
                        </div>
                    );
                }
            });
            const translators = JSON.parse(Translation);
            for (const translator of translators) {
                const img = new Image();
                if (
                    [
                        "slashing5",
                        "Pavlova",
                        "ghazer",
                        "SolarPixels",
                        "ItsAdi1982",
                        "jbgl",
                        "Panda",
                        "Tijn",
                    ].includes(translator.name)
                ) {
                    img.src = `/Testimonials/placeholder.svg`;
                } else img.src = `https://github.com/${translator.name}.png`;
                img.onload = () => {
                    TranslationArray.push(
                        <div
                            key={translator.name}
                            className="rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                            <img
                                src={img.src}
                                alt={`${translator.name}'s github avatar`}
                                className="w-12 h-12 rounded-full mb-4"
                            />
                            <h3 className="mb-3 text-xl font-semibold">
                                {translator.name}
                            </h3>
                            <p className="text-muted-foreground">
                                {t("translation-template", { lang: t(translator.translation)})}
                            </p>
                        </div>
                    );
                    setTranslation([...TranslationArray]);
                };
                img.onerror = () => {
                    TranslationArray.push(
                        <div
                            key={translator.name}
                            className="rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                            <img
                                src={`/Testimonials/placeholder.svg`}
                                alt={`${translator.name}'s github avatar`}
                                className="w-12 h-12 rounded-full mb-4"
                            />
                            <h3 className="mb-3 text-xl font-semibold">
                                {translator.name}
                            </h3>
                            <p className="text-muted-foreground">
                                {t("translation-template", { lang: t(translator.translation)})}
                            </p>
                        </div>
                    );
                    setTranslation([...TranslationArray]);
                };
            }
            setDevelopers(DeveloperArray);
            setTranslation(TranslationArray);
            setContributors(ContributorsArray);
        };

        fetchContributors();

        if (window.location.hash === "#contributors") {
            contributorsRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <div className="h-[10vh]"></div>
            <main className="container mx-auto px-4 py-16 md:px-6">
                {/* Mission Section */}
                <section className="mb-20">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
                        {t("about-header")}
                    </h1>
                    <p className="mb-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                        {t("about-desc")}
                    </p>
                    <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
                        {t("about-mission")}
                    </p>
                </section>

                {/* Key Features Section */}
                <section className="mb-20">
                    <h2 className="mb-8 text-3xl font-bold text-[#0F172A]">
                        {t("about-differences")}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-105">
                            <h3 className="mb-3 text-xl font-semibold">
                                {t("about-open-source-header")}
                            </h3>
                            <p className="text-muted-foreground">
                                {t("about-open-source-desc")}
                            </p>
                        </div>
                        <div className="rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-105">
                            <h3 className="mb-3 text-xl font-semibold">
                                {t("about-privacy-header")}
                            </h3>
                            <p className="text-muted-foreground">
                                {t("about-privacy-desc")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-20">
                    <h2 className="mb-8 text-3xl font-bold text-[#0F172A]">
                        {t("about-developers")}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {DevelopersElement}
                    </div>
                    <h2
                        ref={contributorsRef}
                        className="mt-12 mb-8 text-3xl font-bold text-[#0F172A]"
                    >
                        {t("about-contributors")}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {ContributorsElement}
                    </div>
                    <h2 className="mt-12 mb-8 text-3xl font-bold text-[#0F172A]">
                        {t("about-translators")}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {TranslationElement}
                    </div>
                </section>

                {/* Join Us Section */}
                <section>
                    <div className="rounded-lg bg-[#C4401C]/10 p-8 md:p-12">
                        <h2 className="mb-4 text-3xl font-bold text-[#C4401C]">
                            {t("about-join-header")}
                        </h2>
                        <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
                            {t("about-join-desc")}
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                asChild
                                className="bg-[#C4401C] text-white hover:bg-[#C4401C]/90"
                            >
                                <Link href="https://github.com/Abdallah-Alwarawreh/syrup">
                                    <Github className="mr-2 h-4 w-4" />
                                    {t("about-view-on-github")}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="bg-white"
                            >
                                <Link href="https://github.com/Abdallah-Alwarawreh/syrup/issues">
                                    {t("about-report")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
