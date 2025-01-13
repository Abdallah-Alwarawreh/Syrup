import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SyrupApiClientV1 } from "@/lib/sas";
import { Coupon } from "@/lib/sas/models.ts";

export const syrupApiClient = new SyrupApiClientV1("https://api.discountdb.ch/api/v1/syrup");

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetchCoupons = async (
    domain: string,
    setCoupons: React.Dispatch<React.SetStateAction<Coupon[] | null>>
) => {

    try {
        // Fetch coupons from the API and cache them for 60 seconds
        const response = await syrupApiClient.listCoupons({ domain, cache: 60 * 1000 });
        setCoupons(response.data.coupons);
    } catch (error) {
        console.error("Error fetching coupons:", error);
        setCoupons([]);
    }
};
