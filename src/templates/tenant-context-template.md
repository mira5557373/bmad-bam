---
name: tenant-context-template
description: Documents tenant context design for multi-tenant applications
category: tenant-isolation
version: "1.0.0"
---

# Tenant Context Design Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Module** | {{module_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the tenant context design for multi-tenant applications, defining how tenant information is extracted, validated, propagated, and used throughout the request lifecycle.

## Context Architecture

### Context Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       Request Lifecycle                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Request] ──► [Extract] ──► [Validate] ──► [Enrich] ──► [Store]│
│                                                                  │
│       │            │             │            │           │      │
│       ▼            ▼             ▼            ▼           ▼      │
│   JWT/Header    Tenant ID     Exists?      Tier/Limits   Thread  │
│                 Parsing       Active?      Features      Local   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Context Available to All Layers             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  [Controller] ──► [Service] ──► [Repository] ──► [Database]     │
│      ctx            ctx            ctx            RLS            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Context Definition

### Core Context Structure

```typescript
interface TenantContext {
  // Identity
  tenantId: string;
  tenantName: string;
  
  // Classification
  tier: TenantTier;
  status: TenantStatus;
  
  // Configuration
  features: FeatureFlags;
  limits: TenantLimits;
  settings: TenantSettings;
  
  // Request metadata
  requestId: string;
  correlationId: string;
  userId?: string;
  
  // Timestamps
  extractedAt: Date;
  expiresAt?: Date;
}

enum TenantTier {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  TRIAL = 'trial',
  CHURNED = 'churned'
}
```

### Extended Context

```typescript
interface TenantLimits {
  maxUsers: number;
  maxStorage: number;
  maxApiCalls: number;
  maxAgents: number;
  maxTokensPerDay: number;
  maxConcurrentRequests: number;
}

interface TenantSettings {
  timezone: string;
  locale: string;
  dateFormat: string;
  customDomain?: string;
}

interface FeatureFlags {
  [featureName: string]: boolean | string | number;
}
```

## Context Extraction

### Extraction Sources

| Source | Priority | Use Case |
|--------|----------|----------|
| JWT claim | 1 | API requests with auth |
| X-Tenant-ID header | 2 | Internal service calls |
| Subdomain | 3 | Web application |
| Path parameter | 4 | Admin APIs |

### Extraction Logic

```typescript
interface TenantExtractor {
  extract(request: Request): string | null;
  priority: number;
}

// JWT extractor
class JwtTenantExtractor implements TenantExtractor {
  priority = 1;
  
  extract(request: Request): string | null {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) return null;
    
    const decoded = verifyJwt(token);
    return decoded.tenant_id;
  }
}

// Header extractor
class HeaderTenantExtractor implements TenantExtractor {
  priority = 2;
  
  extract(request: Request): string | null {
    return request.headers['x-tenant-id'];
  }
}

// Subdomain extractor
class SubdomainTenantExtractor implements TenantExtractor {
  priority = 3;
  
  extract(request: Request): string | null {
    const host = request.headers.host;
    const subdomain = host.split('.')[0];
    return subdomain !== 'www' ? subdomain : null;
  }
}
```

## Context Validation

### Validation Rules

| Rule | Check | Action on Failure |
|------|-------|-------------------|
| Exists | Tenant ID in database | 404 Not Found |
| Active | Status = ACTIVE | 403 Forbidden |
| Not Suspended | Status != SUSPENDED | 403 Forbidden |
| Authorized | User belongs to tenant | 403 Forbidden |

### Validation Implementation

```typescript
async function validateTenantContext(
  tenantId: string,
  userId?: string
): Promise<TenantContext> {
  // Fetch tenant
  const tenant = await tenantRepository.findById(tenantId);
  
  if (!tenant) {
    throw new TenantNotFoundError(tenantId);
  }
  
  if (tenant.status === TenantStatus.SUSPENDED) {
    throw new TenantSuspendedError(tenantId);
  }
  
  // Verify user membership if userId provided
  if (userId) {
    const isMember = await membershipService.verify(tenantId, userId);
    if (!isMember) {
      throw new UnauthorizedTenantAccessError(tenantId, userId);
    }
  }
  
  return buildContext(tenant);
}
```

## Context Storage

### Storage Mechanisms

| Mechanism | Scope | Use Case |
|-----------|-------|----------|
| AsyncLocalStorage | Request | Node.js async context |
| Thread Local | Request | Python/Java context |
| Request attributes | Request | Framework-specific |
| Database session | Query | PostgreSQL RLS |

### Node.js Implementation

```typescript
import { AsyncLocalStorage } from 'async_hooks';

const tenantStorage = new AsyncLocalStorage<TenantContext>();

// Middleware to set context
function tenantMiddleware(req, res, next) {
  const context = extractAndValidateContext(req);
  
  tenantStorage.run(context, () => {
    next();
  });
}

// Access context anywhere
function getCurrentTenant(): TenantContext {
  const context = tenantStorage.getStore();
  if (!context) {
    throw new NoTenantContextError();
  }
  return context;
}
```

### Database Context

```typescript
// Set database context before queries
async function withTenantContext<T>(
  tenantId: string,
  operation: () => Promise<T>
): Promise<T> {
  await db.query(`SELECT set_config('app.tenant_id', $1, false)`, [tenantId]);
  
  try {
    return await operation();
  } finally {
    await db.query(`SELECT set_config('app.tenant_id', '', false)`);
  }
}
```

## Context Propagation

### Propagation Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| HTTP Header | REST calls | X-Tenant-ID header |
| gRPC Metadata | gRPC calls | Metadata key |
| Message Header | Async events | Message property |
| OpenTelemetry | Tracing | Baggage item |

### Inter-Service Propagation

```yaml
propagation:
  http:
    header: X-Tenant-ID
    required: true
    
  grpc:
    metadata_key: tenant-id
    required: true
    
  events:
    property: tenantId
    required: true
    
  tracing:
    baggage_key: tenant.id
```

## Context Usage

### Service Layer

```typescript
class UserService {
  async createUser(data: CreateUserDto): Promise<User> {
    const context = getCurrentTenant();
    
    // Validate against tenant limits
    const currentCount = await this.userRepo.countByTenant(context.tenantId);
    if (currentCount >= context.limits.maxUsers) {
      throw new TenantLimitExceededError('maxUsers');
    }
    
    // Create with tenant context
    return this.userRepo.create({
      ...data,
      tenantId: context.tenantId
    });
  }
}
```

### Repository Layer

```typescript
class UserRepository {
  async findAll(): Promise<User[]> {
    const context = getCurrentTenant();
    
    // RLS handles filtering, but explicit for clarity
    return this.db.query(
      'SELECT * FROM users WHERE tenant_id = $1',
      [context.tenantId]
    );
  }
}
```

## Error Handling

### Context Errors

| Error | HTTP Status | Description |
|-------|-------------|-------------|
| TenantNotFoundError | 404 | Tenant doesn't exist |
| TenantSuspendedError | 403 | Tenant is suspended |
| NoTenantContextError | 500 | Context not set |
| UnauthorizedTenantAccessError | 403 | User not in tenant |

## Monitoring

### Context Metrics

| Metric | Description | Labels |
|--------|-------------|--------|
| `tenant_context_extractions` | Extraction count | source, success |
| `tenant_context_validations` | Validation count | result |
| `tenant_context_errors` | Error count | error_type |

## Verification Checklist

- [ ] All extraction sources implemented
- [ ] Validation rules enforced
- [ ] Context stored in request scope
- [ ] Database context set for RLS
- [ ] Propagation headers configured
- [ ] Error handling complete
- [ ] Monitoring metrics exposed
- [ ] Security review passed

## Web Research Queries

- Search: "multi-tenant context propagation patterns {date}"
- Search: "AsyncLocalStorage tenant isolation {date}"
- Search: "request scoped tenant context {date}"

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial template creation |
