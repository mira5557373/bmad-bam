---
name: shared-kernel-template
description: Documents shared kernel design for modular monolith architectures
category: architecture
version: "1.0.0"
---

# Shared Kernel Design Template

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

This template documents the shared kernel design for modular monolith architectures, defining the common components, types, and utilities shared across bounded contexts while maintaining clear boundaries.

## Shared Kernel Overview

### Architecture Position

```
┌─────────────────────────────────────────────────────────────────┐
│                        Module A        Module B        Module C │
│                            │              │              │      │
│                            ▼              ▼              ▼      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     Shared Kernel                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │   │
│  │  │  Types   │  │  Utils   │  │ Contracts│  │ Events  │ │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                               │                                  │
│                    No business logic here                        │
└─────────────────────────────────────────────────────────────────┘
```

## Shared Components

### Core Types

| Type | Description | Used By |
|------|-------------|---------|
| `TenantId` | Tenant identifier value object | All modules |
| `UserId` | User identifier value object | All modules |
| `Money` | Currency-safe money type | Billing, Payments |
| `TimeRange` | Date/time range type | Analytics, Reporting |
| `Result<T>` | Success/error wrapper | All modules |

### Type Definitions

```typescript
// Shared value objects
interface TenantId {
  value: string;
  validate(): boolean;
}

interface UserId {
  value: string;
  tenantId: TenantId;
}

interface Money {
  amount: number;
  currency: string;
  add(other: Money): Money;
  subtract(other: Money): Money;
}

interface TimeRange {
  start: Date;
  end: Date;
  contains(date: Date): boolean;
  overlaps(other: TimeRange): boolean;
}

type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };
```

## Tenant Context

### Context Definition

```typescript
interface TenantContext {
  tenantId: TenantId;
  tier: TenantTier;
  features: FeatureFlags;
  limits: TenantLimits;
}

enum TenantTier {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

interface TenantLimits {
  maxUsers: number;
  maxStorage: number;
  maxApiCalls: number;
  maxAgents: number;
}
```

### Context Propagation

```
Request → Extract Tenant → Create Context → Pass to Modules
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
               Module A     Module B     Module C
               (context)    (context)    (context)
```

## Shared Contracts

### Integration Events

| Event | Publisher | Subscribers | Payload |
|-------|-----------|-------------|---------|
| `TenantCreated` | Tenant Module | All modules | TenantId, Tier |
| `UserCreated` | User Module | Billing, Analytics | UserId, TenantId |
| `SubscriptionChanged` | Billing Module | All modules | TenantId, NewTier |

### Event Schema

```typescript
interface DomainEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  tenantId: TenantId;
  payload: unknown;
  metadata: EventMetadata;
}

interface EventMetadata {
  correlationId: string;
  causationId: string;
  userId?: UserId;
}
```

## Shared Utilities

### Utility Categories

| Category | Utilities | Purpose |
|----------|-----------|---------|
| Validation | `validate()`, `assertValid()` | Input validation |
| Date/Time | `formatDate()`, `parseDate()` | Date handling |
| Security | `hash()`, `encrypt()`, `decrypt()` | Security operations |
| Logging | `logger`, `auditLog()` | Observability |

### Utility Interfaces

```typescript
// Validation utilities
interface Validator<T> {
  validate(input: unknown): Result<T>;
  assertValid(input: unknown): T;
}

// Logging utilities
interface Logger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error: Error, context?: LogContext): void;
}

interface LogContext {
  tenantId?: TenantId;
  userId?: UserId;
  correlationId?: string;
  [key: string]: unknown;
}
```

## Boundaries

### What Belongs in Shared Kernel

| Include | Rationale |
|---------|-----------|
| Value objects (TenantId, UserId) | Universal identifiers |
| Common types (Money, TimeRange) | Prevent duplication |
| Integration events | Cross-module communication |
| Logging/observability | Consistent instrumentation |
| Error types | Uniform error handling |

### What Does NOT Belong

| Exclude | Rationale |
|---------|-----------|
| Business logic | Belongs in bounded contexts |
| Domain entities | Module-specific |
| Repository interfaces | Module-specific |
| API contracts | Module-specific |
| Feature code | Module-specific |

## Governance

### Change Management

| Change Type | Process | Approval |
|-------------|---------|----------|
| New type | RFC, review | Architecture team |
| Breaking change | RFC, migration plan | All stakeholders |
| Bug fix | PR, tests | 2 reviewers |
| Deprecation | 90-day notice | Architecture team |

### Versioning Strategy

```yaml
versioning:
  strategy: semver
  
  breaking_changes:
    - Type signature changes
    - Removed exports
    - Changed event schemas
    
  non_breaking:
    - New types added
    - New utility functions
    - Bug fixes
```

## Module Dependencies

### Dependency Matrix

| Module | Shared Types | Shared Utils | Events |
|--------|--------------|--------------|--------|
| Tenant | TenantId | Logger | Publishes |
| User | TenantId, UserId | Logger, Validator | Publishes |
| Billing | TenantId, Money | Logger | Subscribes |
| Analytics | TenantId, TimeRange | Logger | Subscribes |
| AI Agent | TenantId, UserId | Logger | Publishes |

### Dependency Rules

1. Modules MAY depend on shared kernel
2. Shared kernel MUST NOT depend on modules
3. Modules MUST NOT import from other modules directly
4. Cross-module communication MUST use events

## Testing

### Shared Kernel Tests

| Test Type | Coverage | Purpose |
|-----------|----------|---------|
| Unit tests | All types | Value object behavior |
| Contract tests | All events | Event schema validation |
| Integration tests | Utilities | Cross-module compatibility |

## Verification Checklist

- [ ] Only universal concepts in shared kernel
- [ ] No business logic in shared kernel
- [ ] All types have validation
- [ ] All events have schemas
- [ ] Change management process defined
- [ ] Versioning strategy documented
- [ ] Dependency rules enforced
- [ ] Tests cover all components

## Web Research Queries

- Search: "shared kernel DDD patterns {date}"
- Search: "modular monolith shared code {date}"
- Search: "bounded context integration patterns {date}"

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial template creation |
