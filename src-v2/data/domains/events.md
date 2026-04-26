# Events - BAM Domain Context

**Loaded by:** ZED, ZEP  
**Related Workflows:** bmad-bam-event-architecture, bmad-bam-event-sourcing

---

## Overview

Event-driven architecture in multi-tenant systems requires tenant context in all events.

## Core Concepts

[To be filled]

## Decision Matrix

[To be filled]

## Quality Checks

- [ ] All events include tenant_id field
- [ ] Event routing respects tenant boundaries
- [ ] Dead letter queues are tenant-scoped
- [ ] **CRITICAL:** No cross-tenant event leakage

## Web Research Queries

- "multi-tenant event driven architecture {date}"
- "Kafka tenant isolation patterns {date}"
