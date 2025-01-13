import {
    ApiConfig,
    CouponListResponse,
    ErrorResponse,
    ListCouponsParams,
    MerchantListResponse,
    SuccessResponse,
    VersionResponse
} from "@/lib/sas/models.ts";
import { CacheManager, CacheOptions } from "@/lib/sas/cache.ts";
import { SyrupAPIV1 } from "@/lib/sas/v1/interfaces.ts";

export class SyrupApiClientV1 implements SyrupAPIV1 {
    private readonly baseUrl: string;
    private readonly apiKey?: string;
    private readonly cacheManager: CacheManager;

    constructor(baseUrl: string, config?: ApiConfig) {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        this.apiKey = config?.apiKey;
        this.cacheManager = CacheManager.getInstance();
    }

    async fetch<T>(
        endpoint: string,
        options: RequestInit = {},
        cacheOptions?: CacheOptions
    ): Promise<T> {
        // Try to get data from cache
        const cacheKey = `${this.baseUrl}:${endpoint}:${JSON.stringify(options)}`;

        if (cacheOptions?.cache || !cacheOptions?.clear_cache) {
            const cachedData = await this.cacheManager.get<T>(cacheKey, cacheOptions);
            if (cachedData) {
                return cachedData;
            }
        }

        // Proceed with API request
        if (!endpoint.startsWith("/")) {
            endpoint = `/${endpoint}`;
        }

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(this.apiKey && { "X-Syrup-API-Key": this.apiKey }),
            ...options.headers
        };

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers
        });

        const responseHeaders = {
            "X-RateLimit-Limit": Number(response.headers.get("X-RateLimit-Limit")),
            "X-RateLimit-Remaining": Number(response.headers.get("X-RateLimit-Remaining")),
            "X-RateLimit-Reset": Number(response.headers.get("X-RateLimit-Reset"))
        };

        if (!response.ok) {
            throw {
                headers: response.status === 429
                    ? { "X-RateLimit-RetryAfter": Number(response.headers.get("X-RateLimit-RetryAfter")) }
                    : undefined,
                data: await response.json()
            } as ErrorResponse;
        }

        const data = await response.json();
        const result = { headers: responseHeaders, data } as T;

        // Cache the result if cache duration is provided
        if (cacheOptions?.cache && !cacheOptions?.clear_cache) {
            this.cacheManager.set(cacheKey, result, cacheOptions.cache);
        }

        return result;
    }

    /**
     * Get API Version information
     */
    async getVersion(): Promise<VersionResponse> {
        return this.fetch<VersionResponse>("/version", {});
    }

    /**
     * Get Client Version information
     */
    async getClientVersion(): Promise<string> {
        return "1.0.0";
    }

    /**
     * Get list of coupons for a specific domain
     */
    async listCoupons(params: ListCouponsParams & CacheOptions): Promise<CouponListResponse> {
        const { domain, limit, offset, ...cacheOptions } = params;
        const queryParams = new URLSearchParams({
            domain,
            ...(limit && { limit: limit.toString() }),
            ...(offset && { offset: offset.toString() })
        });

        return this.fetch<CouponListResponse>(
            `/coupons?${queryParams}`,
            {},
            cacheOptions
        );
    }

    /**
     * Report a coupon as valid
     */
    async reportValidCoupon(couponId: string): Promise<SuccessResponse> {
        return this.fetch<SuccessResponse>(
            `/coupons/valid/${couponId}`,
            { method: "POST" }
        );
    }

    /**
     * Report a coupon as invalid
     */
    async reportInvalidCoupon(couponId: string): Promise<SuccessResponse> {
        return this.fetch<SuccessResponse>(
            `/coupons/invalid/${couponId}`,
            { method: "POST" }
        );
    }

    /**
     * Get list of all merchants
     */
    async listMerchants(options?: CacheOptions): Promise<MerchantListResponse> {
        return this.fetch<MerchantListResponse>("/merchants", {}, options);
    }
}