import { NextRequest, NextResponse } from "next/server";
import { setUserLocale } from "@/lib/locale";

export async function POST(request: NextRequest) {
    try {
        const { locale } = await request.json();
        if (!locale) {
            return NextResponse.json({ error: "Locale is required" }, { status: 400 });
        }
        await setUserLocale(locale);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error setting locale:", error);
        return NextResponse.json({ error: "Failed to set locale" }, { status: 500 });
    }
}
