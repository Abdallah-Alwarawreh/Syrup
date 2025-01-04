import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function GET(req: NextRequest, context: any) {
    const { params } = context;
    const domain = params.domain;

    if (!validator.isFQDN(domain)) {
        return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
    }

    return NextResponse.json({ domain });
}
