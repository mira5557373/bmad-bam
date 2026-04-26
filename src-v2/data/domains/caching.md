# Caching - BAM Domain Context

**Loaded by:** ZCC, ZCM  
**Related Workflows:** bmad-bam-caching-strategy, bmad-bam-cache-invalidation

---

## Overview

Caching in multi-tenant systems requires tenant-aware key strategies to prevent data leakage.

## Core Concepts

[To be filled]

## Decision Matrix

[To be filled]

## Quality Checks

- [ ] Cache keys include tenant prefix
- [ ] TTL policies respect tenant tiers
- [ ] Invalidation scoped to tenant
- [ ] **CRITICAL:** No cross-tenant cache pollution

## Web Research Queries

- "multi-tenant caching patterns {date}"
- "Redis tenant isolation {date}"
