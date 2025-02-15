# Syrup API Documentation

## Overview

The Syrup API provides a standardized interface for coupon code providers to integrate with the Syrup browser extension.
This document outlines the required endpoints and data structures that providers must implement to be compatible with
Syrup.

[Refer to @ImGajeed76 backend](https://github.com/ImGajeed76/discountdb-api)

View the API documentation
here: [Syrup API Standard](https://app.swaggerhub.com/apis/GITHUBSTAGING362/syrup-api-standard/1.0.0)

## Base URL Configuration

The API endpoints must be accessible under the `/syrup` path, but providers have complete flexibility in choosing their
base URL. The base URL can be any valid HTTP/HTTPS URL where you host your API. Examples include:

```
https://api.provider.com/syrup/
https://my.database.com/v1/syrup/
https://coupons.example.org/api/syrup/
```

This flexibility allows providers to integrate the Syrup endpoints into their existing API infrastructure. The only
requirement is that all Syrup endpoints must be accessible under the `/syrup` path segment of whatever base URL you
choose.

## Authentication

Authentication in the Syrup API uses API key authentication via the `X-Syrup-API-Key` header. While authentication is
optional, all endpoints are configured to accept this authentication method.

Key characteristics of the authentication system:

- The API key is configured by users in the Syrup extension settings, alongside the base URL
- By default, the API key is empty
- Providers can choose to:
    - Completely ignore the API key header
    - Implement basic validation (e.g., check against a whitelist)
    - Use it as part of a more complex authentication system
- If authentication is implemented, invalid keys should return 401 Unauthorized
- Missing or empty API keys should be handled according to the provider's authentication policy

## Data Structures

### Coupon

The Coupon structure represents a single coupon code and its metadata:

```jsonc
{
    "id": "string",           // Unique identifier for the coupon
    "title": "string",        // Display title with discount amount
    "description": "string",  // Detailed coupon information
    "code": "string",         // The actual coupon code
    "score": number           // Relevance/reliability score
}
```

Field Details:

- `id`: Recommended to use incremental numbers for database performance. This makes database indexing and lookups more
  efficient.
- `title`: Must include the actual discount amount. This is crucial for user understanding and decision-making.
  Examples:
    - "20% Off Everything"
    - "$30 Off Orders Over $100"
    - "Free Shipping on Orders Over $50"
    - "Buy One Get One Free"
    - "Save $15 on First Purchase"
- `description`: Can include additional information such as:
    - Exclusions or restrictions
    - Minimum purchase requirements
    - Product category limitations
    - Additional terms and conditions
- `code`: The actual coupon code that users will input at checkout
- `score`: A number indicating the coupon's relevance and reliability. Providers can implement their own scoring system.

### Merchant

The Merchant structure represents a store and its associated domains:

```jsonc
{
    "merchant_name": "string",  // Name of the merchant
    "domains": ["string"]       // List of domains associated with the merchant
}
```

## Endpoints

### Get API Version

Returns information about the API implementation.

```
GET /syrup/version
```

#### Response

```jsonc
{
    "version": "1.0.0",     // Semantic versioning recommended
    "provider": "string"    // Provider's name or identifier
}
```

### List Coupons

Returns a paginated list of coupons for a specific domain.

```
GET /syrup/coupons
```

#### Query Parameters

| Parameter | Type    | Required | Default | Description                         |
|-----------|---------|----------|---------|-------------------------------------|
| domain    | string  | Yes      | -       | The website domain to fetch coupons |
| limit     | integer | No       | 20      | Maximum number of coupons to return |
| offset    | integer | No       | 0       | Number of coupons to skip           |

#### Response

```jsonc
{
    "coupons": [Coupon],    // Array of coupon objects
    "total": number,        // Total number of coupons available
    "merchant_name": string // Name of the merchant
}
```

### Report Valid/Invalid Coupon

Report the success or failure of a coupon code.

```
POST /syrup/coupons/valid/{id}
POST /syrup/coupons/invalid/{id}
```

#### Path Parameters

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| id        | string | The ID of the coupon |

#### Response

A success message object:

```jsonc
{
    "success": "string"    // Success message
}
```

### List Merchants

Returns a list of all merchants and their domains.

```
GET /syrup/merchants
```

#### Response

```jsonc
{
    "merchants": [Merchant], // Array of merchant objects
    "total": number         // Total number of merchants available
}
```

## Rate Limiting

The API implements rate limiting with the following response headers:

| Header                | Description                                                 |
|-----------------------|-------------------------------------------------------------|
| X-RateLimit-Limit     | The maximum number of requests allowed per time window      |
| X-RateLimit-Remaining | The number of requests remaining in the time window         |
| X-RateLimit-Reset     | The time when the rate limit window resets (Unix timestamp) |

When the rate limit is exceeded, the API returns a 429 Too Many Requests status with an additional header:

| Header                 | Description                            |
|------------------------|----------------------------------------|
| X-RateLimit-RetryAfter | Time to wait before retrying (seconds) |

## Error Handling

The API uses standard HTTP status codes with JSON error responses:

- 400 Bad Request: Invalid parameters or request
- 401 Unauthorized: Invalid API key
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Server-side errors

Error responses follow this format:

```jsonc
{
    "error": "string",    // Error type
    "message": "string"   // Detailed error message (optional)
}
```

## Scoring Guidelines

The scoring system helps users identify the most reliable and relevant coupons. Providers implement their own scoring
algorithm and can use any numerical range they prefer. Common factors to consider:

- Success rate in validations
- Recent usage patterns
- Total number of validations
- Discount amount
- Coupon age

Codes must be returned sorted by their score. A higher score means it's a better coupon.

## Security Best Practices

When implementing the Syrup API, providers should:

- Implement proper input validation for all parameters
- Sanitize domain parameters and other user inputs
- Use HTTPS for all API endpoints
- Implement rate limiting to prevent abuse
- Properly validate API keys if authentication is implemented
- Follow secure error handling practices to prevent information leakage