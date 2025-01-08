import React from "react";

import { useTranslations, useFormatter } from 'next-intl';

const PrivacyPolicy = () => {
    const t = useTranslations("PrivacyPolicy");
    const format = useFormatter();
    const effectiveDate = new Date("2025-01-05T00:00:00.000Z");
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="h-[10vh]"></div>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    {t("header")}
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    {t("effective-date", {
                        date: format.dateTime(effectiveDate, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                        })
                    })}
                </p>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("intro-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("intro-body")}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("collected-info-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("collected-info-intro")}
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>
                            {t.rich("collected-info-no-personal-data", {
                                strong: (txt) => <strong>{txt}</strong>
                            })}
                        </li>
                        <li>
                            {t.rich("collected-info-minimal-usage-data", {
                                strong: (txt) => <strong>{txt}</strong>
                            })}
                            <ul className="list-disc list-inside ml-4">
                                <li>
                                    {t("collected-info-minimal-usage-data-1")}
                                </li>
                                <li>
                                    {t("collected-info-minimal-usage-data-2")}
                                </li>
                            </ul>
                        </li>
                        <li>
                            {t.rich("collected-info-ip-adress", {
                                strong: (txt) => <strong>{txt}</strong>
                            })}
                        </li>
                        <li>
                            {t.rich("collected-data-no-tracking", {
                                strong: (txt) => <strong>{txt}</strong>
                            })}
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{t("how-we-use-info-header")}</h2>
                    <p className="text-gray-700 leading-relaxed">{t("how-we-use-info-intro")}</p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>{t("how-we-use-info-list-1")}</li>
                        <li>{t("how-we-use-info-list-2")}</li>
                        <li>{t("how-we-use-info-list-3")}</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("info-we-share-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("info-we-share-intro")}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("coockies-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("coockies-intro")}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("your-choices-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("your-choices-intro")}
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>
                            {t("your-choices-list-1")}
                        </li>
                        <li>
                            {t("your-choices-list-2")}
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("data-security-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("data-security-intro")}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("changes-to-this-policy-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("changes-to-this-policy-intro")}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {t("contact-us-header")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t.rich("contact-us-intro", {
                            link: () => <a
                                href="https://dsc.gg/hexium"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                https://dsc.gg/hexium
                            </a>
                        })}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
