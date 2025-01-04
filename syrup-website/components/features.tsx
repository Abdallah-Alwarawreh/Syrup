import { ShoppingCart, Percent, Clock, Shield } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function Features() {
    const features = [
        {
            icon: ShoppingCart,
            title: "Shop Smarter",
            description:
                "Automatically find and apply the best coupon codes when you shop online.",
        },
        {
            icon: Percent,
            title: "Save More",
            description:
                "Get exclusive access to the best deals and discounts across thousands of stores.",
        },
        {
            icon: Clock,
            title: "Save Time",
            description:
                "No more searching for coupon codes. We do the work for you in seconds.",
        },
        {
            icon: Shield,
            title: "Shop Securely",
            description:
                "Your privacy and security are our top priority. Shop with confidence.",
        },
    ];

    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Why Choose Syrup?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Join smart shoppers who save time and money with Syrup.
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
