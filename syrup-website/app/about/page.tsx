import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Developers = [
    {
        name: "Abdallah Alwarawreh",
        role: "Creator & Lead Developer",
        avatar: "https://github.com/Abdallah-Alwarawreh.png?size=256",
        github: "https://github.com/Abdallah-Alwarawreh/",
    },
    {
        name: "mvlwarekekw",
        role: "Github Contributer",
        avatar: "https://github.com/mvlwarekekw.png?size=256",
        github: "https://github.com/mvlwarekekw",
    },
    {
        name: "1A3Dev",
        role: "Github Contributer",
        avatar: "https://github.com/1A3Dev.png?size=256",
        github: "https://github.com/1A3Dev",
    },
    {
        name: "Abstra208",
        role: "Github Contributer",
        avatar: "https://github.com/Abstra208.png?size=256",
        github: "https://github.com/Abstra208",
    },
    {
        name: "cranberry3148",
        role: "Github Contributer",
        avatar: "https://github.com/cranberry3148.png?size=256",
        github: "https://github.com/cranberry3148",
    },
    {
        name: "furdiburd",
        role: "Github Contributer",
        avatar: "https://github.com/furdiburd.png?size=256",
        github: "https://github.com/furdiburd",
    },
    {
        name: "hammerill",
        role: "Github Contributer",
        avatar: "https://github.com/hammerill.png?size=256",
        github: "https://github.com/hammerill",
    },
    {
        name: "CuriousCodingCanadian",
        role: "Github Contributer",
        avatar: "https://github.com/CuriousCodingCanadian.png?size=256",
        github: "https://github.com/CuriousCodingCanadian",
    },
    {
        name: "chipseater",
        role: "Github Contributer",
        avatar: "https://github.com/chipseater.png?size=256",
        github: "https://github.com/chipseater",
    },
    {
        name: "JxxIT",
        role: "Github Contributer",
        avatar: "https://github.com/JxxIT.png?size=256",
        github: "https://github.com/JxxIT",
    },
    {
        name: "MerkomassDev",
        role: "Github Contributer",
        avatar: "https://github.com/MerkomassDev.png?size=256",
        github: "https://github.com/MerkomassDev",
    },
    {
        name: "zzzealed",
        role: "Github Contributer",
        avatar: "https://github.com/zzzealed.png?size=256",
        github: "https://github.com/zzzealed",
    },
    {
        name: "MyFedora",
        role: "Github Contributer",
        avatar: "https://github.com/MyFedora.png?size=256",
        github: "https://github.com/MyFedora",
    },
];

export default function about() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <Header />
            <main className="container mx-auto px-4 py-16 md:px-6">
                {/* Mission Section */}
                <section className="mb-20">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
                        About Syrup
                    </h1>
                    <p className="mb-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                        Syrup is an open-source browser extension that helps you
                        save money by automatically finding and applying the
                        best coupon codes when you shop online.
                    </p>
                    <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
                        Our mission is to make online shopping more affordable
                        and accessible for everyone by eliminating the
                        frustration of searching for working coupon codes.
                    </p>
                </section>

                {/* Key Features Section */}
                <section className="mb-20">
                    <h2 className="mb-8 text-3xl font-bold text-[#0F172A]">
                        What Makes Us Different
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-105">
                            <h3 className="mb-3 text-xl font-semibold">
                                100% Open Source
                            </h3>
                            <p className="text-muted-foreground">
                                We believe in transparency. Our entire codebase
                                is open source and available for anyone to
                                inspect, contribute to, or learn from.
                            </p>
                        </div>
                        <div className="rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:scale-105">
                            <h3 className="mb-3 text-xl font-semibold">
                                Privacy First
                            </h3>
                            <p className="text-muted-foreground">
                                We don't track your personal data or shopping
                                habits.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-20">
                    <h2 className="mb-8 text-3xl font-bold text-[#0F172A]">
                        Developers
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {Developers.map((developer) => (
                            <div
                                key={developer.github}
                                className="flex flex-col items-center rounded-lg border bg-card p-6 text-center transition-all duration-200 hover:shadow-lg hover:scale-105"
                            >
                                <img
                                    src={developer.avatar}
                                    alt={`${developer.name} avatar`}
                                    className="mb-4 rounded-full w-32 h-32"
                                />
                                <h3 className="mb-1 text-xl font-semibold">
                                    {developer.name}
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {developer.role}
                                </p>
                                <Link
                                    href={developer.github}
                                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                                >
                                    <Github className="mr-1 h-4 w-4" />
                                    GitHub Profile
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Join Us Section */}
                <section>
                    <div className="rounded-lg bg-[#C4401C]/10 p-8 md:p-12">
                        <h2 className="mb-4 text-3xl font-bold text-[#C4401C]">
                            Join Our Community
                        </h2>
                        <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
                            Want to contribute to Syrup? We welcome
                            contributions of all kinds - from code to
                            documentation, bug reports to feature suggestions.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                asChild
                                className="bg-[#C4401C] text-white hover:bg-[#C4401C]/90"
                            >
                                <Link href="https://github.com/Abdallah-Alwarawreh/syrup">
                                    <Github className="mr-2 h-4 w-4" />
                                    View on GitHub
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="bg-white"
                            >
                                <Link href="https://github.com/Abdallah-Alwarawreh/syrup/issues">
                                    Report an Issue
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
