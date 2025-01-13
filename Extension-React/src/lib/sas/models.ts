// Base Models
export interface Coupon {
    id: string;
    title: string;
    description: string;
    code: string;
    score: number;
    copied?: boolean;
}

export interface CouponList {
    coupons: Coupon[];
    total: number;
    merchant_name: string;
}

export interface VersionInfo {
    version: string;
    provider: string;
}

export interface Error {
    error: string;
    message?: string;
}

export interface Success {
    success: string;
}

export interface Merchant {
    merchant_name: string;
    domains: string[];
}

export interface MerchantList {
    merchants: Merchant[];
    total: number;
}

// API Response Types
export interface ApiResponse {
    headers: {
        'X-RateLimit-Limit': number;
        'X-RateLimit-Remaining': number;
        'X-RateLimit-Reset': number;
    };
}

export interface VersionResponse extends ApiResponse {
    data: VersionInfo;
}

export interface CouponListResponse extends ApiResponse {
    data: CouponList;
}

export interface SuccessResponse extends ApiResponse {
    data: Success;
}

export interface MerchantListResponse extends ApiResponse {
    data: MerchantList;
}

export interface ErrorResponse {
    headers?: {
        'X-RateLimit-RetryAfter'?: number;
    };
    data: Error;
}

// Request Parameters
export interface ListCouponsParams {
    domain: string;
    limit?: number;
    offset?: number;
}

// API Configuration
export interface ApiConfig {
    apiKey?: string;
}