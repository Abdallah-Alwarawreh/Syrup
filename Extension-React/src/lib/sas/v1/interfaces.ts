import {
    CouponListResponse,
    ListCouponsParams,
    MerchantListResponse,
    SuccessResponse,
    VersionResponse
} from "@/lib/sas/models.ts";
import { CacheOptions } from "@/lib/sas/cache.ts";

export interface SyrupAPIV1 {
    getVersion(): Promise<VersionResponse>;

    getClientVersion(): Promise<string>;

    listCoupons(params: ListCouponsParams & CacheOptions): Promise<CouponListResponse>;

    reportValidCoupon(couponId: string): Promise<SuccessResponse>;

    reportInvalidCoupon(couponId: string): Promise<SuccessResponse>;

    listMerchants(options?: CacheOptions): Promise<MerchantListResponse>;
}