import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { useTranslations } from 'next-intl';

export function FAQ() {
    const t = useTranslations("HomePage");
    const faqs = [
        {
            question: t("faq-free-question"),
            answer: t("faq-free-answer"),
        },
        {
            question: t("faq-how-it-works-question"),
            answer: t("faq-how-it-works-answer"),
        },
        {
            question: t("faq-safe-question"),
            answer: t("faq-safe-answer"),
        },
        {
            question: t("faq-stores-question"),
            answer: t("faq-stores-answer"),
        },
    ];

    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        {t("faq-header")}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {t("faq-qestions")}
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
