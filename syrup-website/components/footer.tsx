import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LanguageDropdown } from "@/components/LanguageSelector";

import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations("Common");
    return (
        <footer className="relative overflow-hidden bg-gradient-to-t from-amber-50 to-white text-gray-900">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-radial from-blue-500 to-transparent blur-2xl" />
                <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-radial from-purple-500 to-transparent blur-2xl" />
            </div>

            <div className="container relative mx-auto px-4 py-16">
                {/* Main Footer Content */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-black">Syrup</h3>
                        <p className="text-gray-700">
                            {t("footer-description")}
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="https://github.com/Abdallah-Alwarawreh/Syrup">
                                    <svg
                                        className="h-5 w-5"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>GitHub</title>
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="https://discord.com/invite/SxTjmsS2g9">
                                    <svg
                                        className="h-5 w-5"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Discord</title>
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                    </svg>
                                    <span className="sr-only">Discord</span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Product Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">
                            {t("footer-product")}
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-gray-700 hover:text-black"
                                    asChild
                                >
                                    <Link href="/about">{t("footer-about")}</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-gray-700 hover:text-black"
                                    asChild
                                >
                                    <Link href="/PrivacyPolicy">
                                        {t("footer-privacy-policy")}
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">
                            {t("footer-support")}
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-gray-700 hover:text-black"
                                    asChild
                                >
                                    <Link href="https://github.com/Abdallah-Alwarawreh/Syrup">
                                        {t("footer-documentation")}
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-gray-700 hover:text-black"
                                    asChild
                                >
                                    <Link href="https://dsc.gg/Hexium">
                                        {t("footer-contact-us")}
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* Download Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">
                            {t("footer-download")}
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-gray-700 hover:text-black gap-2"
                                    asChild
                                >
                                    <Link href="https://chromewebstore.google.com/detail/syrup/odfgjmajnbkiabjnfiijllkihjpilfch">
                                        <svg
                                            className="h-4 w-4"
                                            role="img"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>Google Chrome</title>
                                            <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z" />
                                        </svg>
                                        {t("footer-download-chrome")}
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-gray-700 hover:text-black gap-2"
                                    asChild
                                >
                                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/syrup/">
                                        <svg
                                            className="h-4 w-4"
                                            role="img"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>Firefox</title>
                                            <path d="M20.452 3.445a11.002 11.002 0 00-2.482-1.908C16.944.997 15.098.093 12.477.032c-.734-.017-1.457.03-2.174.144-.72.114-1.398.292-2.118.56-1.017.377-1.996.975-2.574 1.554.583-.349 1.476-.733 2.55-.992a10.083 10.083 0 013.729-.167c2.341.34 4.178 1.381 5.48 2.625a8.066 8.066 0 011.298 1.587c1.468 2.382 1.33 5.376.184 7.142-.85 1.312-2.67 2.544-4.37 2.53-.583-.023-1.438-.152-2.25-.566-2.629-1.343-3.021-4.688-1.118-6.306-.632-.136-1.82.13-2.646 1.363-.742 1.107-.7 2.816-.242 4.028a6.473 6.473 0 01-.59-1.895 7.695 7.695 0 01.416-3.845A8.212 8.212 0 019.45 5.399c.896-1.069 1.908-1.72 2.75-2.005-.54-.471-1.411-.738-2.421-.767C8.31 2.583 6.327 3.061 4.7 4.41a8.148 8.148 0 00-1.976 2.414c-.455.836-.691 1.659-.697 1.678.122-1.445.704-2.994 1.248-4.055-.79.413-1.827 1.668-2.41 3.042C.095 9.37-.2 11.608.14 13.989c.966 5.668 5.9 9.982 11.843 9.982C18.62 23.971 24 18.591 24 11.956a11.93 11.93 0 00-3.548-8.511z" />
                                        </svg>
                                        {t("footer-download-firefox")}
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator className="my-8 bg-gray-800" />

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-700">
                    <p>
                        {t("footer-rights", {year: new Date().getFullYear()})}
                    </p>
                    <div className="flex gap-6">
                        <LanguageDropdown/>
                        <Button
                            variant="link"
                            className="h-auto p-0 text-gray-700 hover:text-black"
                            asChild
                        >
                            <Link href="/PrivacyPolicy">{t("footer-privacy")}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
