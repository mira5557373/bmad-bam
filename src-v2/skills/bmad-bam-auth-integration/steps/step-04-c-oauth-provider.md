# Step 4: OAuth Provider Design (ZAO)

## Purpose

Design OAuth 2.0 authorization server capabilities for the platform, enabling third-party integrations and API access.

## Prerequisites

- [ ] Step 3 completed (IdP integration)
- [ ] API access requirements documented

## Actions

### 1. OAuth 2.0 Grant Types

Define supported grant types per use case:

| Grant Type | Use Case | Tenant Scope | Security Level |
|------------|----------|--------------|----------------|
| Authorization Code + PKCE | Web/Mobile apps | Required | High |
| Client Credentials | Service-to-service | Required | High |
| Refresh Token | Session extension | Inherited | Medium |
| Device Code | CLI/IoT devices | Required | Medium |

### 2. Authorization Server Configuration

```yaml
oauth_server:
  issuer: "https://auth.example.com/{tenant_id}"
  
  endpoints:
    authorization: "/oauth/authorize"
    token: "/oauth/token"
    revocation: "/oauth/revoke"
    introspection: "/oauth/introspect"
    userinfo: "/oauth/userinfo"
    jwks: "/.well-known/jwks.json"
    
  token_settings:
    access_token:
      type: "JWT"
      lifetime_seconds: 3600
      signing_algorithm: "RS256"
      include_claims:
        - sub
        - tenant_id
        - scope
        - roles
        
    refresh_token:
      type: "opaque"
      lifetime_seconds: 604800  # 7 days
      rotation: true
      reuse_detection: true
      
    id_token:
      lifetime_seconds: 3600
      signing_algorithm: "RS256"
      
  client_registration:
    dynamic_registration: false
    require_approval: true
    
  scopes:
    predefined:
      - name: "read"
        description: "Read access to tenant resources"
      - name: "write"
        description: "Write access to tenant resources"
      - name: "admin"
        description: "Administrative access"
      - name: "agent:execute"
        description: "Execute AI agents"
    tenant_custom_scopes: true
```

### 3. Client Application Management

```yaml
oauth_client:
  client_id: string
  tenant_id: uuid
  
  client_type: enum[confidential, public]
  
  credentials:
    client_secret_hash: string  # For confidential clients
    pkce_required: bool         # For public clients
    
  registration:
    name: string
    description: string
    logo_uri: string
    redirect_uris: string[]
    post_logout_redirect_uris: string[]
    
  grants:
    allowed_grant_types:
      - authorization_code
      - refresh_token
    allowed_scopes: string[]
    
  constraints:
    token_endpoint_auth_method: enum[client_secret_basic, client_secret_post, private_key_jwt, none]
    require_consent: bool
    consent_lifetime_seconds: int
    
  rate_limits:
    requests_per_minute: int
    tokens_per_hour: int
    
  audit:
    created_at: timestamp
    created_by: string
    last_used: timestamp
```

### 4. Token Security

```
┌─────────────────────────────────────────────────────────────────┐
│                    Token Lifecycle                               │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   Client     │    │   Auth       │    │   Resource       │  │
│  │   App        │    │   Server     │    │   Server         │  │
│  └──────┬───────┘    └──────┬───────┘    └────────┬─────────┘  │
│         │                   │                      │            │
│         │  1. AuthZ Code    │                      │            │
│         │     + PKCE        │                      │            │
│         │──────────────────►│                      │            │
│         │                   │                      │            │
│         │  2. Access Token  │                      │            │
│         │     + Refresh     │                      │            │
│         │◄──────────────────│                      │            │
│         │                   │                      │            │
│         │  3. API Request   │                      │            │
│         │     + Access Token│                      │            │
│         │─────────────────────────────────────────►│            │
│         │                   │                      │            │
│         │                   │  4. Token Validation │            │
│         │                   │◄─────────────────────│            │
│         │                   │                      │            │
│         │                   │  5. Claims + tenant  │            │
│         │                   │─────────────────────►│            │
│         │                   │                      │            │
│         │  6. API Response  │                      │            │
│         │◄─────────────────────────────────────────│            │
│         │                   │                      │            │
│         │  7. Refresh       │                      │            │
│         │     (when expired)│                      │            │
│         │──────────────────►│                      │            │
│         │                   │                      │            │
│         │  8. New Tokens    │                      │            │
│         │     (rotated)     │                      │            │
│         │◄──────────────────│                      │            │
└─────────────────────────────────────────────────────────────────┘
```

### 5. Access Token Claims (JWT)

```json
{
  "iss": "https://auth.example.com/tenant_abc123",
  "sub": "user_xyz789",
  "aud": "https://api.example.com",
  "exp": 1704067200,
  "iat": 1704063600,
  "tenant_id": "tenant_abc123",
  "tenant_tier": "enterprise",
  "scope": "read write agent:execute",
  "roles": ["admin", "agent_operator"],
  "client_id": "app_456",
  "jti": "unique_token_id"
}
```

## Verification

- [ ] Grant types selected for use cases
- [ ] Authorization server configured
- [ ] Client management designed
- [ ] Token security measures defined
- [ ] Tenant isolation in tokens verified

## Outputs

- OAuth authorization server specification
- Client application management design
- Token security architecture

## Next Step

Proceed to `step-05-c-api-keys.md` for API key management design.
