# Observability - BAM Domain Context

**Loaded by:** ZOB, ZOM  
**Related Workflows:** bmad-bam-tenant-aware-observability, bmad-bam-agent-execution-tracing

---

## Overview

Observability in multi-tenant systems requires tenant-aware metrics, logs, and traces while maintaining cross-tenant operational visibility.

## Core Concepts

[To be filled]

## Decision Matrix

[To be filled]

## Quality Checks

- [ ] All logs include tenant_id label
- [ ] Metrics are tagged with tenant dimension
- [ ] Traces propagate tenant context
- [ ] **CRITICAL:** Tenant data not exposed in shared dashboards

## Web Research Queries

- "multi-tenant observability patterns {date}"
- "tenant-aware logging metrics {date}"
