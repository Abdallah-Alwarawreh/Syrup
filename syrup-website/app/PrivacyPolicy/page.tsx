import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    Privacy Policy for Syrup
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    <strong>Effective Date:</strong> 29/12/2024
                </p>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Introduction
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        At Syrup, your privacy is a top priority. We are
                        committed to protecting your data and being transparent
                        about how we handle it. This privacy policy outlines the
                        information we collect, how we use it, and your rights
                        regarding your data.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Information We Collect
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Syrup is designed with privacy in mind. Here’s what we
                        do and do not collect:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>
                            <strong>No Personal Data Collected:</strong> Syrup
                            does not collect your name, email address, or any
                            other personal information.
                        </li>
                        <li>
                            <strong>Minimal Usage Data:</strong> To improve
                            functionality, Syrup may collect anonymous data such
                            as:
                            <ul className="list-disc list-inside ml-4">
                                <li>
                                    The number of times discounts are applied
                                    successfully.
                                </li>
                                <li>
                                    General usage statistics (e.g., which
                                    websites discounts are most frequently
                                    applied to).
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>No Tracking:</strong> Syrup does not track
                            your browsing history, search history, or online
                            activity.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        How We Use Your Information
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        The limited anonymous data we collect is used solely
                        for:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>
                            Improving Syrup’s performance and ensuring it
                            functions as intended.
                        </li>
                        <li>Identifying and fixing bugs.</li>
                        <li>
                            Enhancing compatibility with supported websites.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Information We Share
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Syrup does not share, sell, or rent your data to third
                        parties. Any collected data is processed securely and
                        used internally for the purposes outlined above.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Cookies and Third-Party Services
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Syrup does not use cookies or integrate with third-party
                        services that track your activity.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Your Choices and Control
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        As a user, you have full control over Syrup:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>
                            You can disable or uninstall the extension at any
                            time through your browser settings.
                        </li>
                        <li>
                            All usage data is anonymous and cannot be linked
                            back to you.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Data Security
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        We take security seriously and implement appropriate
                        measures to protect any data processed by Syrup.
                        However, no system is 100% secure, and we encourage you
                        to practice safe browsing habits.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Changes to This Privacy Policy
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        We may update this privacy policy from time to time to
                        reflect improvements or changes in regulations. Any
                        updates will be published on our official website or
                        GitHub repository, and we encourage you to review this
                        page periodically.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Contact Us
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        If you have questions or concerns about Syrup’s privacy
                        policy, please reach out to us at:{" "}
                        <a
                            href="https://dsc.gg/hexium"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://dsc.gg/hexium
                        </a>
                        .
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
