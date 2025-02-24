# Syrup API Documentation

## Overview

The Syrup API provides a standardized interface for coupon code providers to integrate with the Syrup browser extension.
This document outlines the required endpoints and data structures that providers must implement to be compatible with
Syrup.

[Refer to @ImGajeed76 backend](https://github.com/ImGajeed76/discountdb-api)

## Base URL

The API endpoints must be accessible under the `/syrup/v2` path. The default base URL is:

```
https://db.joinsyrup.com
```

## Authentication

The API supports two authentication methods:

1. Bearer Token Authentication

    - HTTP Bearer scheme with JWT token support
    - Implementation details are left to the provider

2. API Key Authentication
    - Uses the `X-API-Key` header
    - Should be a simple string token (not JWT)
    - Implementation details are left to the provider

Authentication can be optional, and providers can choose which method to implement or require none at all.

## Features

Providers can implement various optional features:

-   Coupon reporting
-   Coupon suggestions
-   Merchant suggestions
-   Merchant updates
-   Autofill suggestions
-   Autofill updates

## Core Endpoints

### System Information

```
GET /syrup/v2/info
```

Returns information about the API implementation including version, provider name, authentication requirements, and
supported features.

This may also return an API token for either Bearer Token or API Key authentication. This token may be used if the
client doesn't have a token yet.

### Coupons

```
GET /syrup/v2/coupons
POST /syrup/v2/coupons
GET /syrup/v2/coupons/{coupon_id}
POST /syrup/v2/coupons/{coupon_id}/reports
GET /syrup/v2/coupons/{coupon_id}/history/votes
```

Supports searching, suggesting, retrieving, and reporting coupons. The search endpoint includes comprehensive filtering,
sorting, and pagination capabilities.

### Merchants

```
GET /syrup/v2/merchants
POST /syrup/v2/merchants
GET /syrup/v2/merchants/{merchant_id}
PATCH /syrup/v2/merchants/{merchant_id}
```

Manages merchant information with support for searching, suggesting, retrieving, and updating merchant details.

### Autofill

```
GET /syrup/v2/autofill/{domain}
PATCH /syrup/v2/autofill/{domain}
POST /syrup/v2/autofill/{domain}
```

Manages domain-specific autofill configurations for automated coupon entry.

## Data Structures

### Coupon

```typescript
{
    id: number;
    created_at: string;  // ISO datetime
    code: string;
    title: string;
    description: string;
    discount_value: number;
    discount_type: "PERCENTAGE_OFF" | "FIXED_AMOUNT" | "BOGO" | "FREE_SHIPPING";
    merchant: Merchant;
    start_date?: string;  // ISO datetime
    end_date?: string;    // ISO datetime
    terms_conditions?: string;
    minimum_purchase_amount?: number;
    maximum_discount_amount?: number;
    up_votes?: number;
    down_votes?: number;
    categories?: string[];
    tags?: string[];
    regions?: string[];
    store_type?: "online" | "in_store" | "both";
    is_stackable?: boolean;
    score: number;
    metadata?: Record<string, any>;
}
```

### Merchant

```typescript
{
    id: string;
    created_at: string;  // ISO datetime
    updated_at: string;  // ISO datetime
    name: string;
    domains: string[];   // URI format
    logo_url?: string;   // URI format
    banner_url?: string; // URI format
}
```

### AutoFill Configuration

```typescript
{
    id: string;
    domain: string;      // e.g., "amazon.com"
    steps: {
        selector: string;  // CSS selector
        action: "click" | "type_coupon";
    }
    [];
    validator: {
        priceSelector: string;
        priceRegex?: string;
        successSelector: string;
        failureSelector: string;
        timeout: number;   // milliseconds
    }
    ;
    revertSelector: string;
}
```

## Pagination

The API uses cursor-based pagination with the following parameters:

-   `limit`: Maximum number of items per page (1-100, default 20)
-   `cursor`: Opaque cursor for the next page
-   Response includes `next_cursor` and `has_more` fields

## Rate Limiting

All endpoints include rate limiting headers:

-   `X-RateLimit-Limit`: Maximum requests allowed
-   `X-RateLimit-Remaining`: Requests remaining
-   `X-RateLimit-Reset`: Seconds until reset

When rate limit is exceeded (429 status):

-   `Retry-After`: Seconds to wait before retry

## Error Handling

Standard HTTP status codes are used with consistent error response format:

```typescript
{
    error: string; // Error type/code
    message: string; // User-friendly message
    code: string; // Machine-readable code
}
```

Common status codes:

-   400: Bad Request
-   401: Unauthorized
-   403: Forbidden
-   429: Too Many Requests
-   500: Internal Server Error

## Search Capabilities

The API provides powerful search functionality for both coupons and merchants:

### Filtering

-   Complex filter combinations using `filterBy` parameter
-   Supports numeric ranges, date ranges, arrays, and simple matches
-   Flexible date formats for temporal queries

### Sorting

-   Multiple sort fields available
-   Ascending/descending options
-   Score-based default sorting

### Search Options

-   Fuzzy matching support
-   Field-specific searching
-   Faceted search results

## Security Recommendations

1. Use HTTPS for all API endpoints
2. Implement proper input validation
3. Sanitize user inputs, especially domain parameters
4. Apply rate limiting to prevent abuse
5. Validate authentication tokens when implemented
6. Follow secure error handling practices
7. Monitor and log API usage

## Implementation Notes

-   All timestamps should be in ISO format at GMT0
-   URIs should be properly formatted and validated
-   CSS selectors in autofill configurations should be tested for reliability
-   Score calculations should consider multiple factors for accuracy
-   Implement proper caching strategies for improved performance
