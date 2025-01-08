import { ShoppingCart, Percent, Clock, Shield } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useTranslations } from 'next-intl';

export function Features() {
    const t = useTranslations("HomePage");
    const features = [
        {
            icon: ShoppingCart,
            title: t("features-shop-smarter"),
            description: t("features-shop-smarter-desc"),
        },
        {
            icon: Percent,
            title: t("features-save-more"),
            description: t("features-save-more-desc"),
        },
        {
            icon: Clock,
            title: t("features-save-time"),
            description: t("features-save-time-desc"),
        },
        {
            icon: Shield,
            title: t("features-shop-securely"),
            description: t("features-shop-securely-desc"),
        },
    ];

    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        {t("features-why-syrup")}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {t("features-why-syrup-answer")}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            <CardHeader>
                                <feature.icon className="w-12 h-12 text-[#a82c04] mb-4" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
