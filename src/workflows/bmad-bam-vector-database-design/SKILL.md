---
name: bmad-bam-vector-database-design
displayName: Vector Database Design
description: Design tenant-isolated vector storage for RAG systems. Use when the user requests to 'design vector database' or 'create vector storage architecture'.
module: bam
tags: [ai-runtime, vector-database, rag]
---

# Vector Database Design

## Overview

This workflow designs the vector database architecture for multi-tenant RAG systems, including index strategy, tenant isolation patterns, query optimization, scaling policies, backup strategies, monitoring, and security controls. It produces comprehensive vector storage specifications that ensure tenant data isolation while optimizing for performance.

Act as an AI Platform Architect specializing in vector databases and semantic search with multi-tenant isolation requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing vector storage for RAG-based AI features
- Implementing tenant-isolated embedding storage
- Optimizing vector search performance at scale
- Planning vector database backup and recovery

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new vector database design | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against quality criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Vector Storage Requirements

Gather requirements for vector storage:
- Expected embedding dimensions (384, 768, 1024, 1536)
- Estimated vector count per tenant
- Query latency requirements (p50, p95, p99)
- Concurrent query load expectations

### Step 2: Index Strategy Selection

Select appropriate indexing strategy:
- HNSW (Hierarchical Navigable Small World) for high recall
- IVF (Inverted File Index) for large-scale deployments
- Flat index for small datasets with exact search
- Hybrid approaches for balanced requirements

### Step 3: Tenant Isolation Architecture

Design tenant isolation for vector storage:
- Collection-per-tenant vs. filtered single collection
- Namespace partitioning strategies
- Metadata-based tenant filtering
- Cross-tenant query prevention

### Step 4: Query Optimization

Optimize vector search performance:
- Pre-filtering vs. post-filtering strategies
- Approximate vs. exact search trade-offs
- Batch query optimization
- Caching strategies for frequent queries

### Step 5: Scaling Strategy

Plan horizontal and vertical scaling:
- Sharding strategies by tenant or hash
- Replica configuration for read scaling
- Auto-scaling policies based on query load
- Capacity planning per tier

### Step 6: Backup and Recovery

Design backup and disaster recovery:
- Incremental vs. full backup strategies
- Point-in-time recovery requirements
- Cross-region replication options
- Tenant-specific restore procedures

### Step 7: Monitoring and Observability

Define monitoring requirements:
- Query latency metrics per tenant
- Index health and fragmentation
- Storage utilization alerts
- Recall/precision monitoring

### Step 8: Security Controls

Implement security measures:
- Encryption at rest and in transit
- Access control and authentication
- Audit logging for vector operations
- Data residency compliance

### Step 9: Documentation

Generate comprehensive documentation:
- Architecture decision records
- Operations runbook
- Performance tuning guide
- Disaster recovery procedures

### Quality Gates

- [ ] Tenant isolation verified with no cross-tenant data access
- [ ] Query latency meets SLA requirements
- [ ] Scaling strategy supports projected growth
- [ ] Backup and recovery procedures tested
- [ ] Security controls implemented and audited

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates vector storage integration with agent runtime
- **QG-I2** (Tenant Safety) - Ensures tenant data isolation in vector storage

### Entry Gate
- RAG pipeline design completed (bmad-bam-rag-pipeline-design)
- Embedding strategy decisions available

### Exit Gate
- Vector database architecture documented
- Tenant isolation verified
- Performance benchmarks established

## Output

- `{output_folder}/planning-artifacts/architecture/vector-database-design.md`
- `{output_folder}/planning-artifacts/architecture/vector-operations-runbook.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/vector-database-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/vector-database-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
