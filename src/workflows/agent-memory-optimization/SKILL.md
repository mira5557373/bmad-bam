---
name: agent-memory-optimization
displayName: Agent Memory Optimization
description: Design memory tier optimization for AI agents. Use when the user requests to 'optimize agent memory' or 'design memory architecture'.
module: bam
tags: [ai-runtime, memory, optimization]
---

# Agent Memory Optimization

## Overview

This workflow designs memory tier optimization for AI agents including memory audit, tier allocation, eviction policies, tenant quotas, performance tuning, cost controls, monitoring, testing, and documentation. It produces comprehensive memory optimization specifications that ensure efficient resource usage while maintaining tenant isolation.

Act as an AI Platform Architect specializing in agent memory systems and multi-tenant resource optimization.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Optimizing agent memory usage across tiers
- Designing memory eviction and retention policies
- Implementing tenant-scoped memory quotas
- Tuning memory performance for cost efficiency

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new memory optimization design | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against quality criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Memory Audit

Audit current memory usage patterns:
- Session memory utilization
- User memory growth rates
- Tenant memory footprint
- Global memory hot spots

### Step 2: Tier Allocation

Design memory tier allocation:
- Session (Redis, short-lived)
- User (Mem0, configurable)
- Tenant (Mem0 + Redis)
- Global (Mem0, permanent)
- Episodic (PostgreSQL)

### Step 3: Eviction Policies

Define memory eviction strategies:
- LRU for session memory
- TTL-based for user memory
- Importance-weighted for tenant
- Never-evict for global

### Step 4: Tenant Quotas

Design tenant quota system:
- Memory limits per tier
- Soft vs hard limits
- Overage handling
- Tier-based allocations

### Step 5: Performance Tuning

Optimize memory performance:
- Hot path optimization
- Cache warming strategies
- Memory compression
- Batch operations

### Step 6: Cost Controls

Implement cost control mechanisms:
- Storage tiering by access frequency
- Cold storage offloading
- Compression ratios
- Cleanup schedules

### Step 7: Monitoring

Design monitoring and alerting:
- Memory utilization metrics
- Eviction rate tracking
- Quota violation alerts
- Performance regression detection

### Step 8: Testing

Plan memory testing strategy:
- Load testing scenarios
- Eviction policy verification
- Quota enforcement testing
- Failover testing

### Step 9: Documentation

Generate comprehensive documentation:
- Architecture decisions
- Operations runbook
- Tuning guide

### Quality Gates

- [ ] Memory tiers properly isolated
- [ ] Eviction policies verified
- [ ] Quota enforcement working
- [ ] Performance meets SLAs
- [ ] Cost projections validated

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates memory tier design
- **QG-I2** (Tenant Safety) - Ensures tenant memory isolation

### Entry Gate
- Agent runtime architecture completed (bmad-bam-agent-runtime-architecture)
- Memory tier baseline documented

### Exit Gate
- Memory optimization documented
- Eviction policies tested
- Cost projections validated

## Output

- `{output_folder}/planning-artifacts/architecture/agent-memory-optimization.md`
- `{output_folder}/planning-artifacts/architecture/memory-operations-runbook.md`

## References

- Template: `bam/templates/memory-tiers-template.md`
- Knowledge: `bam/knowledge/memory-tiers.md`
- Checklist: `bam/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
