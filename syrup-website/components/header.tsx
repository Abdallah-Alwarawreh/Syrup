import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="container mx-auto px-4 py-8 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/Syrup.svg"
                    alt="Syrup Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-semibold">Syrup</span>
            </Link>
        </header>
    );
}
