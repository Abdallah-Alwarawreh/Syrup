# Syrup API Standard Documentation V2.1.0

## Overview

The Syrup API Standard defines a standardized interface for coupon code providers to integrate with the Syrup browser
extension and potentially other clients. This document outlines the required endpoints and data structures that
providers must implement to be compatible with this standard (Version 2.1.0).

This standard aims to provide a consistent way to search, retrieve, suggest, and manage coupon, site, merchant, and
autofill data.

## Base URL

The API endpoints defined in this standard **must** be accessible under the `/syrup/v2` path prefix. The actual base
URL (e.g., `https://provider.example.com`) is specific to each provider implementing this standard.

Example full endpoint URL: `https://provider.example.com/syrup/v2/info`

Providers should clearly document their base URL. The `GET /syrup/v2/info` endpoint can also potentially provide
information relevant to accessing the API.

## Authentication

The API standard defines two optional authentication methods. A provider may choose to implement one, both, or none (
allowing public access). The specific requirements are indicated in the `auth` object returned by the
`GET /syrup/v2/info` endpoint.

1. **Bearer Token Authentication** (`bearer_auth`)
    * Uses the standard HTTP `Authorization: Bearer <token>` header.
    * The token can be a JWT or any other opaque bearer token format defined by the provider.
    * Token distribution and management are implementation-dependent.

2. **API Key Authentication** (`api_key_auth`)
    * Uses a custom HTTP header: `X-Api-Key: <key>`.
    * The API key should typically be a standard string token (not JWT).
    * Key distribution and management are implementation-dependent.

The `GET /syrup/v2/info` endpoint might return an initial `new_token` which the client can use immediately if
authentication is required and the client doesn't possess credentials yet. A `signup_url` may also be provided for
users/developers to obtain credentials.

## Features

Providers can optionally implement various features beyond the basic read operations. The `GET /syrup/v2/info` endpoint
returns a list (`features`) indicating which optional capabilities are supported. Clients should check this list before
attempting to use optional endpoints or expecting specific functionality.

Supported optional features identifiers:

- `coupons_suggest`: Ability to suggest new coupons (`POST /coupons`).
- `coupons_vote`: Ability to vote on coupons (`POST /coupons/{id}/votes`).
- `coupons_vote_history`: Ability to retrieve vote history (`GET /coupons/{id}/history/votes`).
- `sites_suggest`: Ability to suggest new sites (`POST /sites`).
- `sites_suggest_change`: Ability to suggest changes to existing sites (`POST /sites/{id}/suggestions`).
- `merchants_suggest`: Ability to suggest new merchants (`POST /merchants`).
- `merchants_suggest_change`: Ability to suggest changes to existing merchants (`POST /merchants/{id}/suggestions`).
- `autofill_suggest`: Ability to suggest new or updated autofill configurations (`POST /autofill/{domain}`).
- `coupon_search_facets`: Coupon search results include facets (`GET /coupons`).
- `coupon_search_fuzzy`: Coupon search supports the `fuzzy` parameter (`GET /coupons`).

## Core Endpoints

Endpoints are grouped by resource type.

### System (`system` tag)

```
GET /syrup/v2/info
```

Returns information about the provider's API implementation including the implemented API standard version, provider
name, authentication requirements/details, and supported optional features. **This endpoint should ideally be accessible
without authentication.**

### Coupons (`coupons` tag)

```
GET    /syrup/v2/coupons
POST   /syrup/v2/coupons                           # Feature: coupons_suggest
GET    /syrup/v2/coupons/{coupon_id}
POST   /syrup/v2/coupons/{coupon_id}/votes         # Feature: coupons_vote
GET    /syrup/v2/coupons/{coupon_id}/history/votes # Feature: coupons_vote_history
```

Supports searching coupons with comprehensive filtering, sorting, and pagination. Allows retrieving details for a
specific coupon. Optionally supports suggesting new coupons and submitting votes on coupon validity (up/down).
Optionally provides access to historical vote timestamps.

### Sites (`sites` tag)

```
GET    /syrup/v2/sites
POST   /syrup/v2/sites                       # Feature: sites_suggest
GET    /syrup/v2/sites/{site_id}
POST   /syrup/v2/sites/{site_id}/suggestions # Feature: sites_suggest_change
```

Supports searching sites (specific domains/storefronts) with filtering, sorting, and pagination. Allows retrieving
details for a specific site. Optionally supports suggesting new sites and suggesting changes to existing sites.

### Merchants (`merchants` tag)

```
GET    /syrup/v2/merchants
POST   /syrup/v2/merchants                           # Feature: merchants_suggest
GET    /syrup/v2/merchants/{merchant_id}
POST   /syrup/v2/merchants/{merchant_id}/suggestions # Feature: merchants_suggest_change
```

Supports searching merchants (brands/companies) with filtering, sorting, and pagination. Allows retrieving details for a
specific merchant. Optionally supports suggesting new merchants and suggesting changes to existing merchants.

### Autofill (`autofill` tag)

```
GET    /syrup/v2/autofill/{domain}
POST   /syrup/v2/autofill/{domain}       # Feature: autofill_suggest
```

Retrieves the autofill configuration (steps, validation logic) for a specific domain. Optionally supports suggesting new
or updated autofill configurations for a domain.

## Data Structures

Key data structures returned or accepted by the API. Refer to the OpenAPI specification for full details, including
required fields and constraints.

### Coupon

Represents a discount coupon.

```json
{
  "id": "coup_123abc",
  "created_at": "2025-01-25T15:30:00Z",
  "code": "SUMMER20",
  "title": "20% Off Sitewide",
  "description": "Get 20% off on all items. Excludes final sale.",
  "discount_value": 20,
  "discount_type": "PERCENTAGE_OFF",
  "site": {
    "id": "site_456def",
    "created_at": "2025-01-10T10:00:00Z",
    "updated_at": "2025-04-10T11:30:00Z",
    "name": "Example Store US",
    "domain": "example.com",
    "merchant": {
      "id": "merch_789ghi",
      "created_at": "2024-12-01T09:00:00Z",
      "updated_at": "2025-03-15T14:20:00Z",
      "name": "Example Inc.",
      "logo_url": "https://example.com/logo.png",
      "banner_url": "https://example.com/banner.jpg"
    }
  },
  "start_date": "2025-06-01T00:00:00Z",
  "end_date": "2025-06-30T23:59:59Z",
  "terms_conditions": "Valid on orders over $50. Cannot be combined with other offers.",
  "minimum_purchase_amount": 50,
  "maximum_discount_amount": 100,
  "up_votes": 150,
  "down_votes": 12,
  "categories": [
    "clothing",
    "accessories"
  ],
  "tags": [
    "summer_sale",
    "apparel",
    "free_shipping_over_75"
  ],
  "regions": [
    "US",
    "CA"
  ],
  "store_type": "online",
  "is_stackable": false,
  "score": 0.92,
  "metadata": {
    "provider_specific_key": "value"
  }
}
```

### DiscountType (Enum)

```
"PERCENTAGE_OFF" | "FIXED_AMOUNT" | "BUY_ONE_GET_ONE_FREE" | "FREE_SHIPPING" | "OTHER"
```

### Site

Represents a specific domain or storefront, linked to a Merchant.

```json
{
  "id": "site_456def",
  "created_at": "2025-01-10T10:00:00Z",
  "updated_at": "2025-04-10T11:30:00Z",
  "name": "Example Store UK",
  "domain": "example.co.uk",
  "merchant": {
    "id": "merch_789ghi",
    "created_at": "2024-12-01T09:00:00Z",
    "updated_at": "2025-03-15T14:20:00Z",
    "name": "Example Inc.",
    "logo_url": "https://example.com/logo.png",
    "banner_url": "https://example.com/banner.jpg"
  }
}
```

### Merchant

Represents the overall brand or company.

```json
{
  "id": "merch_789ghi",
  "created_at": "2024-12-01T09:00:00Z",
  "updated_at": "2025-03-15T14:20:00Z",
  "name": "Example Inc.",
  "logo_url": "https://example.com/logo.png",
  "banner_url": "https://example.com/banner.jpg"
}
```

### AutoFillConfig

Defines how to automatically apply a coupon on a specific domain.

```json
{
  "id": "af_example_com",
  "domain": "example.com",
  "steps": [
    {
      "selector": "#coupon-code-input",
      "action": "type_coupon"
    },
    {
      "selector": "button.apply-coupon",
      "action": "click"
    }
  ],
  "validator": {
    "price_selector": ".cart-total > .price",
    "price_regex": "\\$([\\d,]+\\.\\d{2})",
    "success_selector": ".coupon-applied-success",
    "failure_selector": ".coupon-error-message",
    "timeout": 5000
  },
  "revert_selector": ".remove-coupon-link"
}
```

## Pagination

Search endpoints (`/coupons`, `/sites`, `/merchants`) use cursor-based pagination.

- `limit`: Query parameter to specify the maximum number of items per page (default 20, max 100).
- `cursor`: Query parameter holding an opaque string provided by the server (`next_cursor`) to fetch the subsequent
  page. Omit for the first page.

Search responses include pagination information alongside the `data` array:

- `count`: Number of items in the current page's `data` array.
- `total`: Total number of items available across all pages for the query. May be an estimate or `-1` if too costly to
  compute.
- `next_cursor`: Opaque string to use for the `cursor` parameter to get the next page. Only present if `has_more` is
  true.
- `has_more`: Boolean indicating if more pages are available.

## Rate Limiting

Providers should implement rate limiting. All responses (including errors) should include the following headers:

- `X-RateLimit-Limit`: The maximum number of requests allowed in the current window.
- `X-RateLimit-Remaining`: The number of requests remaining in the current window.
- `X-RateLimit-Reset`: The number of seconds until the rate limit window resets.

When the rate limit is exceeded, the API must return a `429 Too Many Requests` status code and include the following
header:

- `Retry-After`: The number of seconds the client should wait before making a new request.

## Error Handling

Standard HTTP status codes are used to indicate the success or failure of requests. Error responses (`4xx` and `5xx`)
should conform to the `ErrorResponse` schema:

```json
{
  "error": "invalid_parameter",
  "message": "The 'limit' parameter must be between 1 and 100.",
  "code": "VALIDATION_ERROR"
}
```

- `error`: Short identifier for the error type (e.g., `not_found`, `auth_required`).
- `message`: User-friendly explanation of the error.
- `code`: Optional machine-readable code for client handling (e.g., `RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`).

Common status codes used:

- `200`: OK - Request successful.
- `201`: Created - Resource suggestion accepted (e.g., new coupon, site, merchant).
- `202`: Accepted - Change suggestion accepted for processing (e.g., site/merchant update).
- `400`: Bad Request - Malformed request, invalid parameters, validation errors.
- `401`: Unauthorized - Authentication is required and missing or invalid.
- `403`: Forbidden - Authentication succeeded, but the client lacks permission.
- `404`: Not Found - The requested resource (coupon, site, merchant, domain config) does not exist.
- `406`: Not Acceptable - Server cannot fulfill the request based on `Accept` headers.
- `429`: Too Many Requests - Rate limit exceeded.
- `500`: Internal Server Error - An unexpected error occurred on the server.
- `501`: Not Implemented - The requested endpoint or feature is not supported by the provider.

## Search Capabilities

Search endpoints (`/coupons`, `/sites`, `/merchants`) offer robust searching features:

### Filtering (`filter_by`)

- Allows filtering results based on resource properties using the `filter_by` query parameter with `deepObject` style.
- Supports:
- Exact matches (e.g., `filter_by[site_id]=site_123`).
- Array matches (e.g., `filter_by[categories][]=food&filter_by[categories][]=drinks`).
- Numeric ranges (e.g., `filter_by[discount_value]=10,50` for 10-50, `10,` for >=10, `,50` for <=50).
- Date ranges (YYYY-MM-DD format, e.g., `filter_by[end_date]=2024-01-01,2024-12-31`).

### Sorting (`sort_by`)

- Allows sorting results using the `sort_by` query parameter (e.g., `sort_by=score:desc`, `sort_by=created_at:asc`).
- Available sort fields depend on the resource (see OpenAPI spec for details).
- Default sort order is typically specified (e.g., `score:desc` for coupons).

### Text Search (`q`)

- General text search across specified fields using the `q` query parameter.
- `search_in`: Query parameter to specify which fields `q` should search within (e.g., `search_in=title,description`).
  Defaults vary by resource.
- `fuzzy`: Optional boolean query parameter (`fuzzy=true`) to enable typo-tolerant (fuzzy) searching, if supported by
  the provider (`coupon_search_fuzzy` feature).

### Facets (Coupons Only)

- If the `coupon_search_facets` feature is supported, the `GET /coupons` response may include a `facets` object.
- Provides counts of results broken down by attributes like `categories` or `discount_types`, helping users refine
  searches.

## Security Recommendations

Implementers should follow security best practices:

1. **HTTPS:** Always use HTTPS for all API communication.
2. **Input Validation:** Rigorously validate all input parameters (query params, path params, request bodies) against
   the defined schemas and constraints.
3. **Sanitization:** Sanitize inputs where necessary, especially free-text fields or those used in database queries. Pay
   attention to domain names and selectors.
4. **Rate Limiting:** Implement effective rate limiting to prevent abuse.
5. **Authentication:** Securely validate authentication credentials (Bearer tokens, API keys) if implemented.
6. **Authorization:** Ensure proper authorization checks are performed for endpoints requiring specific permissions (
   e.g., suggesting changes).
7. **Error Handling:** Avoid leaking sensitive information (stack traces, internal paths) in error messages. Use generic
   messages for server errors.

## Implementation Notes

- **Timestamps:** All date-time fields should be returned in ISO 8601 format. UTC (Zulu time, `Z` suffix) is strongly
  recommended (e.g., `2025-04-11T14:27:04Z`).
- **URIs/Hostnames:** Ensure fields specified with `format: uri` or `format: hostname` contain valid, well-formed
  values.
- **IDs:** Resource IDs (`coupon_id`, `site_id`, `merchant_id`) are strings and should be unique within the provider's
  system.
- **CSS Selectors:** Autofill selectors (`selector`, `price_selector`, etc.) should be robust but are inherently
  dependent on the target website's structure. Providers should have a process for updating these as sites change.
- **Score Calculation:** The `Coupon.score` field calculation is provider-specific but should aim to reflect
  reliability, considering factors like votes, recency, savings potential, etc.
- **Caching:** Implement appropriate caching strategies (e.g., for `/info`, merchant details) to improve performance and
  reduce load.