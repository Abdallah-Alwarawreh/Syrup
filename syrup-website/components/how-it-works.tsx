import Image from "next/image";

export function HowItWorks() {
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
                            <div className="font-semibold">Coupons Found!</div>
                            <div className="text-sm">9 coupon codes</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-gray-900">
                        How it works
                    </h2>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                1. Add in Seconds
                            </h3>
                            <p className="text-gray-600">
                                It just takes a few clicks to add to your
                                computer and it's 100% free.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                2. Shop Normally
                            </h3>
                            <p className="text-gray-600">
                                Browse your favorite stores and Syrup will
                                notify you when savings are available.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                3. Save Money
                            </h3>
                            <p className="text-gray-600">
                                Syrup automatically finds and applies the best
                                coupon codes at checkout.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
