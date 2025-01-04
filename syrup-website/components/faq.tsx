import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
    const faqs = [
        {
            question: "Is Syrup really free?",
            answer: "Yes! Syrup is completely free to use. We only make money from donations.",
        },
        {
            question: "How does Syrup work?",
            answer: "Syrup works by automatically finding and testing coupon codes when you shop online. When you're checking out at a supported store, Syrup will pop up and try all available coupon codes to find you the best deal.",
        },
        {
            question: "Is Syrup safe to use?",
            answer: "Yes, Syrup is safe to use. We are an open-source project, and our code is publicly available for review.",
        },
        {
            question: "Which stores work with Syrup?",
            answer: "Syrup works with over 30,000 stores online, including most major retailers. You'll see the Syrup icon appear automatically when you're shopping at a supported store.",
        },
    ];

    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Got questions? We've got answers.
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
