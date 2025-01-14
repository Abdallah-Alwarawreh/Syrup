import Image from "next/image";

import { useTranslations } from 'next-intl';

export function HowItWorks() {
    const t = useTranslations("HomePage");
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative bg-white rounded-lg shadow-xl p-6 border">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0" />
                        <div className="space-y-2 flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </div>
                    </div>
                    <div className="absolute top-4 right-4">
                        <Image
                            src="/Syrup.svg"
                            alt="Syrup Logo"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                        <div className="bg-amber-100 text-[#a82c04] p-4 rounded-lg shadow-lg">
                            <div className="font-semibold">{t("how-coupon-found")}</div>
                            <div className="text-sm">{t("how-9-coupons")}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {t("how-header")}
                    </h2>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                {t("how-first-step")}
                            </h3>
                            <p className="text-gray-600">
                                {t("how-first-step-desc")}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                {t("how-second-step")}
                            </h3>
                            <p className="text-gray-600">
                                {t("how-second-step-desc")}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                {t("how-third-step-desc")}
                            </h3>
                            <p className="text-gray-600">
                                {t("how-third-step-desc")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
