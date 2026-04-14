# Local Development Setup

**When to load:** When setting up development environment, configuring local multi-tenant simulation, or when user mentions local dev, Docker compose, or dev environment setup.

**Integrates with:** Dev agent, DevOps agent, Architect (Atlas persona)

---

## Core Concepts

### What is Local Development for Multi-Tenant?

Local development setup enables developers to simulate multi-tenant behavior on their local machines, including tenant isolation, feature flags, and tier-based functionality without requiring cloud infrastructure.

### Local Dev Requirements

| Requirement | Description | Solution |
|-------------|-------------|----------|
| Tenant simulation | Multiple tenant contexts | Seed data + headers |
| Service dependencies | Database, cache, queue | Docker Compose |
| Feature flags | Local flag config | File-based overrides |
| AI services | LLM access | Mock or dev keys |

### Local Development Architecture

```
Developer Machine
    │
    ├── Application Server (hot reload)
    │   └── Tenant middleware (reads X-Dev-Tenant)
    │
    ├── Docker Compose Stack
    │   ├── PostgreSQL (with seed tenants)
    │   ├── Redis (sessions, cache)
    │   ├── LocalStack (S3, SQS emulation)
    │   └── Mailhog (email capture)
    │
    └── Configuration
        ├── .env.local (secrets)
        ├── flags.local.json (feature flags)
        └── tenants.seed.json (tenant data)
```

---

## Key Patterns

### Pattern 1: Docker Compose Stack

| Service | Image | Purpose |
|---------|-------|---------|
| postgres | postgres:16 | Primary database |
| redis | redis:7 | Cache + sessions |
| localstack | localstack/localstack | AWS emulation |
| mailhog | mailhog/mailhog | Email testing |

### Docker Compose Configuration Example

| Service | Port | Health Check | Depends On |
|---------|------|--------------|------------|
| postgres | 5432 | pg_isready | - |
| redis | 6379 | redis-cli ping | - |
| localstack | 4566 | curl localhost:4566 | - |
| app | 3000 | /health | postgres, redis |

### Pattern 2: Tenant Seed Data

| Tenant | Tier | Purpose |
|--------|------|---------|
| `dev-free` | Free | Test free tier limits |
| `dev-pro` | Pro | Test pro features |
| `dev-enterprise` | Enterprise | Test enterprise features |
| `dev-test` | Free | Automated test tenant |

### Seed Data Structure

| Entity | Per Tenant | Purpose |
|--------|------------|---------|
| Users | 3-5 | Different roles |
| Workspaces | 1-2 | Team simulation |
| Sample data | 10-50 records | Realistic testing |
| API keys | 2 | Integration testing |

### Pattern 3: Local Configuration

| Config | Source | Override |
|--------|--------|----------|
| Database URL | `.env.local` | Environment |
| Feature flags | `flags.local.json` | File |
| Tenant context | Request header | `X-Dev-Tenant` |
| AI models | `.env.local` | Mock or dev API |

---

## Decision Criteria

### When to Mock vs Use Real Services

| Service | Mock When | Use Real When |
|---------|-----------|---------------|
| Database | Never | Always (Docker) |
| Redis | Never | Always (Docker) |
| LLM APIs | Cost concern, offline dev | Integration testing |
| External APIs | Rate limits, cost | Pre-release validation |
| Email | Always | Never in local |

### Environment Parity Checklist

| Aspect | Local | CI | Production |
|--------|-------|-----|------------|
| Database engine | Same version | Same version | Same version |
| Feature flags | File override | Environment | Feature service |
| Secrets | .env.local | CI secrets | Vault/KMS |
| Logging | Console | JSON | Aggregator |

---

## Application Guidelines

- Onboarding new developers
- Setting up CI/CD test environments
- Debugging tenant-specific issues
- Testing feature flag combinations
- Developing without cloud costs

---

## Quick Start Checklist

- [ ] Clone repository
- [ ] Copy `.env.example` to `.env.local`
- [ ] Run `docker compose up -d`
- [ ] Run database migrations
- [ ] Seed tenant data
- [ ] Verify with health check

---

## Development Workflows

| Workflow | Command | Description |
|----------|---------|-------------|
| Start services | `docker compose up -d` | Launch dependencies |
| Reset database | `npm run db:reset` | Clean + seed |
| Switch tenant | Set `X-Dev-Tenant` header | Change context |
| Mock AI | Set `AI_MOCK=true` | Use mock responses |

### Advanced Development Scenarios

| Scenario | Setup | Notes |
|----------|-------|-------|
| Test RLS policies | Multiple tenant requests | Verify isolation |
| Debug tier limits | Switch tenant headers | Test quota enforcement |
| Feature flag testing | Edit flags.local.json | Hot reload |
| Cross-tenant workflow | Multiple browser profiles | Saga testing |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Shared .env file | Secrets in git | gitignore .env.local |
| Hard-coded tenant | Tests break | Use X-Dev-Tenant header |
| No seed data | Empty state confusion | Seed script in setup |
| Outdated Docker images | Version mismatch | Pin versions, regular updates |
| Missing health checks | Silent failures | Health check all services |
| Large seed datasets | Slow startup | Minimal viable seed |

### Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| Port already in use | Another instance | docker compose down, check ports |
| Database connection refused | Container not ready | Wait for health check |
| Tenant context empty | Header not set | Add X-Dev-Tenant |
| Feature flag not working | Cache stale | Restart or clear cache |

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Tenant Context | X-Dev-Tenant header | Multi-tenant simulation |
| Feature Toggles | flags.local.json | Local flag testing |
| Testing Isolation | Seed tenants | Isolation verification |
| Parallel Development | Independent setup | No shared state |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Development patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `local-dev`
- **Related guides:** `parallel-development-guide`, `testing-tenant-isolation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant local development setup {date}"
- Search: "Docker compose multi-tenant SaaS {date}"
- Search: "developer experience SaaS platforms {date}"
- Search: "localstack multi-tenant testing {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to mock external services vs use real APIs? | Mock LLM and external APIs for cost/offline dev; always use real database and cache | Database behavior must match production; external API mocking reduces cost and enables offline work |
| How many seed tenants to provision locally? | 4 tenants: dev-free, dev-pro, dev-enterprise, dev-test | Covers all tier testing scenarios; dedicated test tenant prevents data pollution |
| What level of production parity is needed? | Same database engine version; feature flags via file; logging to console | Critical components must match; local conveniences acceptable for developer experience |
| When to use X-Dev-Tenant header vs real auth? | Header for rapid context switching during development; real auth for integration testing | Developer productivity during feature work; auth testing validates actual flows |
| How large should seed datasets be? | Minimal viable (10-50 records per entity type); optional large dataset script for performance testing | Fast startup for daily development; large datasets available when needed |

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design tenant seed data provisioning scripts
- `bmad-bam-chaos-engineering-design` - Test multi-tenant behavior in local environment
- `bmad-bam-create-module-architecture` - Design modules for local development compatibility
- `bmad-bam-tenant-model-isolation` - Verify RLS policies work in local PostgreSQL
