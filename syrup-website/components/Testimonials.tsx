import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';
import testimonials from "@/lib/Testimonials";

import { useTranslations } from 'next-intl';

export function Testimonials() {
    const t = useTranslations("HomePage");
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        {t("testimonials-header")}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {t("testimonials-desc")}
                    </p>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="break-inside-avoid mb-6 transition-all duration-300 ease-in-out hover:shadow-lg"
                        >
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={
                                                testimonial.avatar || `/Testimonials/placeholder.svg`
                                            }
                                            alt={`Avatar of ${testimonial.name}`}
                                        />
                                        <AvatarFallback>
                                            {testimonial.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-[#a82c04] text-[#a82c04]"
                                        />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    {testimonial.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

