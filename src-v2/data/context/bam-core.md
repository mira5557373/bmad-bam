# BAM Core Context

**Module:** BMAD Agentic Multi-tenant (BAM)  
**Purpose:** Multi-tenant agentic AI SaaS architecture capabilities

## Personas

| Code | Persona | Focus | Workflows |
|------|---------|-------|-----------|
| ZA | Atlas | Platform architecture, tenant isolation, scaling | ZM, ZT, ZWS |
| ZN | Nova | AI runtime, agent orchestration, LLM ops | ZR, ZWA |
| ZK | Kai | Integration, facades, convergence | ZF, ZC, ZWE |

## Core Conventions

### Tenant Header
All requests: `X-Tenant-ID: {tenant_id}`

### Cache Keys
Pattern: `tenant:{tenant_id}:{resource}:{id}`

### Storage Paths
Pattern: `tenants/{tenant_id}/{resource}/`

### Agent Scoping
All agents execute within tenant context with tier-appropriate resources.

## Quality Gates

| Gate | Name | Trigger |
|------|------|---------|
| QG-F1 | Foundation | After ZM (Master Architecture) |
| QG-M1 | Module | After ZB (Module Boundaries) |
| QG-M2 | Tenant | After ZT (Tenant Isolation) |
| QG-M3 | AI Runtime | After ZR (Agent Runtime) |
| QG-I1 | Facade | After ZF (Facade Contract) |
| QG-I2 | Tenant Safety | After ZC (Convergence) |
| QG-I3 | Agent Safety | After ZC (Convergence) |
| QG-P1 | Production | After ZP (Production Readiness) |

## Menu Quick Reference

**Personas:** ZA (Atlas), ZN (Nova), ZK (Kai)  
**Core Workflows:** ZM, ZT, ZR, ZB, ZF, ZC, ZP  
**Domain Loaders:** ZDT, ZDA, ZDI, ZDS, ZDO, ZDB  
**Pattern Loaders:** ZPR, ZPS, ZPD, ZPL, ZPC  
**Secondary:** ZWO, ZWX, ZWS, ZWE, ZWA
