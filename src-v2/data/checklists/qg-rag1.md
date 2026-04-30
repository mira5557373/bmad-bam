---
name: qg-rag1-rag-pipeline
description: RAG pipeline validation gate ensuring vector store isolation and retrieval quality
module: bam
version: 1.0.0
tags: [rag, quality-gate, multi-tenant, knowledge]
---

# QG-RAG1: RAG Pipeline Gate

> **Gate ID:** QG-RAG1 (RAG Pipeline)
> **Definition:** RAG pipeline gate validates tenant-isolated vector storage and retrieval quality.
> **Scope:** Covers vector store isolation, embedding management, retrieval accuracy, and citation tracking.
> **Recovery:** Gate failure recovery requires fixing vector store isolation before production deployment.

**Workflow:** bmad-bam-rag-pipeline
**Prerequisites:** QG-F1 (Foundation)

---

## Purpose

The RAG Pipeline Gate (QG-RAG1) validates that Retrieval-Augmented Generation pipelines meet multi-tenant isolation and quality requirements. This gate ensures:

1. **Vector store isolation** - Tenant data is segregated at index or namespace level
2. **Retrieval safety** - No cross-tenant retrieval is possible
3. **Embedding governance** - Embeddings tagged and versioned with tenant context
4. **Quality assurance** - Retrieval accuracy meets minimum thresholds

Passing QG-RAG1 enables safe production deployment of tenant-aware knowledge retrieval.

---

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Vector store has tenant isolation (index-per-tenant or namespace)
- [ ] **CRITICAL:** No cross-tenant retrieval possible
- [ ] **CRITICAL:** Embeddings tagged with tenant_id
- [ ] **CRITICAL:** Search results filtered by tenant context
- [ ] **CRITICAL:** Vector store access requires tenant authentication

---

## Vector Store Isolation

- [ ] **CRITICAL:** Tenant isolation strategy implemented (index/namespace/collection)
- [ ] **CRITICAL:** Metadata filtering enforces tenant boundaries
- [ ] **CRITICAL:** No shared vectors across tenants
- [ ] Index naming convention includes tenant identifier
- [ ] Tenant deletion cascades to vector data
- [ ] Backup/restore operations tenant-scoped

---

## Embedding Management

- [ ] **CRITICAL:** Embedding model version tracked per tenant
- [ ] **CRITICAL:** Re-embedding triggered on model upgrades
- [ ] Embedding metadata includes source document reference
- [ ] Embedding cache respects tenant boundaries
- [ ] Embedding pipeline logs include tenant context
- [ ] Cost attribution for embedding operations per tenant

---

## Chunking and Processing

- [ ] Semantic chunking configured appropriately for content types
- [ ] Chunk overlap parameters documented per tenant tier
- [ ] Maximum chunk size enforced
- [ ] Document metadata preserved through chunking
- [ ] Chunking strategy logged for audit
- [ ] Custom chunking rules configurable per tenant

---

## Retrieval Quality

- [ ] Query transformation applied for semantic accuracy
- [ ] Context window optimization active
- [ ] Relevance scoring calibrated for tenant data
- [ ] Top-k retrieval limits enforced
- [ ] Hybrid search (keyword + semantic) available
- [ ] Retrieval latency within SLA thresholds

---

## Citation and Provenance

- [ ] Citation tracking implemented for all retrievals
- [ ] Source documents linkable from retrieved chunks
- [ ] Citation format configurable per tenant
- [ ] Provenance chain verifiable
- [ ] Citation metadata includes timestamp
- [ ] Deleted source handling documented

---

## Rate Limiting and Quotas

- [ ] Embedding requests rate limited per tenant
- [ ] Query rate limiting enforced per tenant
- [ ] Storage quotas tracked per tenant
- [ ] Quota exceeded events logged
- [ ] Tier-based limits configured
- [ ] Overage handling defined

---

## Tests Passing

- [ ] **CRITICAL:** Cross-tenant retrieval test fails (isolation verified)
- [ ] **CRITICAL:** Tenant context propagation test passes
- [ ] **CRITICAL:** Metadata filtering test passes
- [ ] Embedding versioning test passes
- [ ] Citation tracking test passes
- [ ] Retrieval quality benchmark test passes

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block production deployment until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Vector Store Isolation | CRITICAL | Isolation partial | Cross-tenant retrieval possible |
| Embedding Management | CRITICAL | Version tracking gaps | No tenant tagging |
| Search Filtering | CRITICAL | Filtering incomplete | Unfiltered results returned |
| Tests (isolation) | CRITICAL | <80% isolation tests pass | Any cross-tenant test failure |
| Chunking/Processing | Non-critical | Partial configuration | N/A |
| Retrieval Quality | Non-critical | Below benchmark | N/A |
| Citation Tracking | Non-critical | Partial implementation | N/A |

---

## Recovery Protocol

**If QG-RAG1 fails:**

### Attempt 1: Immediate Remediation (target: 1-2 days)

1. Identify failed CRITICAL categories from checklist
2. Review vector store isolation configuration
3. Add tenant filtering to search queries
4. Verify embedding tenant tagging
5. Re-run QG-RAG1 validation after fixes
6. **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Investigation (target: 2-3 days)

1. Analyze root cause of continued failures
2. Review vector store architecture decisions
3. Re-index affected tenant data with proper isolation
4. Validate metadata filtering at query level
5. Re-run QG-RAG1 validation after remediation
6. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to Platform Architect and Data Lead
2. Document failure patterns and blocking issues
3. Conduct RAG architecture review
4. Consider vector store migration if isolation inadequate
5. Create remediation plan with executive sign-off
6. Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Vector Store Isolation | Add tenant namespaces/indices | Cross-tenant retrieval persists |
| Embedding Management | Add tenant_id to embedding metadata | Re-embedding required |
| Search Filtering | Implement metadata filter injection | Filtering bypassed |
| Tests Passing | Fix isolation gaps; re-index affected data | Cross-tenant test failure |
| Retrieval Quality | Tune chunking and relevance scoring | Quality below threshold |

---

## Related Workflows

- `bmad-bam-rag-pipeline` - RAG pipeline workflow (primary)
- `bmad-bam-validate-foundation` - Foundation validation
- `bmad-bam-knowledge-management` - Knowledge base management
- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns

---

## Required Templates

- `rag-pipeline-template.md` - RAG pipeline configuration
- `vector-store-template.md` - Vector store setup
- `embedding-policy-template.md` - Embedding management policies

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **RAG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `rag-*`
- **Knowledge patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `knowledge-*`
- **Tenant patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` - filter by selected model

### Web Research

- Search: "RAG multi-tenant vector store isolation {date}"
- Search: "vector database tenant segregation patterns {date}"
- Search: "retrieval augmented generation enterprise security {date}"

---

## Web Research Verification

- [ ] Search the web: "multi-tenant RAG pipeline patterns {date}" - Verify isolation approach
- [ ] Search the web: "vector store tenant isolation best practices {date}" - Confirm storage patterns
- [ ] Search the web: "RAG citation tracking implementation {date}" - Validate citation requirements
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, RAG pipeline ready for production
**OWNER:** BAM (AI Runtime Architect persona - Nova)
**REVIEWERS:** Platform Architect, AI Runtime Lead, Data Architect

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-30 | BAM V2 NEXUS | Initial RAG pipeline gate for NEXUS patterns |
