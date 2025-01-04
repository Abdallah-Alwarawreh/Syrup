import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">
                            About Syrup
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-300 p-0 h-auto"
                                    asChild
                                >
                                    <Link href="/about">About</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-300 p-0 h-auto"
                                    asChild
                                >
                                    <Link href="https://github.com/Abdallah-Alwarawreh/Syrup">
                                        GitHub
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-300 p-0 h-auto"
                                >
                                    <Link href="https://dsc.gg/Hexium">
                                        Contact Us
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-300 p-0 h-auto"
                                    asChild
                                >
                                    <Link href="/PrivacyPolicy">
                                        Privacy Policy
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">
                            Download
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-300 p-0 h-auto"
                                    asChild
                                >
                                    <Link href="https://chromewebstore.google.com/detail/syrup/odfgjmajnbkiabjnfiijllkihjpilfch">
                                        Chrome Extension
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-300 p-0 h-auto"
                                    asChild
                                >
                                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/syrup/">
                                        Firefox Extension
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p>
                        © {"2024 - " + new Date().getFullYear()} Syrup. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
