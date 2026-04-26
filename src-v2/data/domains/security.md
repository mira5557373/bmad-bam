# Security - BAM Domain Context

**Loaded by:** ZSA, ZST  
**Related Workflows:** bmad-bam-security-threat-model, bmad-bam-security-baseline

---

## Overview

Security in multi-tenant SaaS requires defense in depth with tenant isolation as the primary security boundary.

## Core Concepts

[To be filled]

## Decision Matrix

[To be filled]

## Quality Checks

- [ ] Authentication enforced at all entry points
- [ ] Authorization checks include tenant validation
- [ ] Secrets management uses tenant-scoped vaults
- [ ] **CRITICAL:** No privilege escalation across tenants

## Web Research Queries

- "multi-tenant security patterns {date}"
- "SaaS security best practices {date}"
