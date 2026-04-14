# BAM Memory Tiers Guide

**When to load:** During AI agent design, memory architecture planning, or when user mentions conversation context, knowledge base, learned patterns.

**Integrates with:** Nova (AI Runtime Architect), Developer (implementation), Architect (design)

---

## Core Concepts

### Memory Tier Overview

AI agents require multiple memory tiers with different scopes, persistence, and isolation requirements.

| Tier | Scope | Persistence | Primary Use |
|------|-------|-------------|-------------|
| Working | Single request | Request duration | Active reasoning context |
| Episodic | Conversation/Session | Hours to days | Conversation continuity |
| Semantic | Tenant knowledge | Months to permanent | Domain knowledge |
| Procedural | Learned behaviors | Months to permanent | Task optimization |
| Collective | Cross-tenant (anonymized) | Permanent | Platform intelligence |

---

## Application Guidelines

When implementing memory tiers for AI agents:

1. **Scope memory to tenant**: All persistent memory must be tenant-isolated
2. **Design for context window limits**: Working memory must fit within model constraints
3. **Balance freshness and relevance**: Episodic memory should prioritize recent but allow important historical recall
4. **Protect collective memory privacy**: Any cross-tenant learning must anonymize data
5. **Monitor memory costs**: Vector storage and retrieval costs scale with memory tier usage

---

## Working Memory

### Purpose

Immediate context for active reasoning within a single request/turn.

### Characteristics

| Attribute | Value |
|-----------|-------|
| Scope | Single request |
| Storage | In-memory (RAM) |
| TTL | Request duration |
| Size limit | Model context window |
| Tenant isolation | Implicit (request-scoped) |

### Contents

| Component | Description | Size Budget |
|-----------|-------------|-------------|
| System prompt | Agent instructions | 10-20% |
| User input | Current request | 5-10% |
| Retrieved context | RAG results | 30-40% |
| Tool results | Function outputs | 20-30% |
| Reasoning trace | Chain-of-thought | 10-20% |

### Context Window Management

| Strategy | When to Use | Trade-off |
|----------|-------------|-----------|
| Truncation | Simple overflow | May lose important context |
| Summarization | Long conversations | Compute cost |
| Sliding window | Streaming input | Recent bias |
| Importance scoring | Quality-critical | Complexity |

---

## Episodic Memory

### Purpose

Conversation and session history for continuity across multiple turns.

### Characteristics

| Attribute | Value |
|-----------|-------|
| Scope | Conversation/Session |
| Storage | Redis / Session store |
| TTL | 1 hour (active) to 7 days (inactive) |
| Size limit | 100KB-1MB per session |
| Tenant isolation | Session-level (tenant_id + session_id) |

### Contents

| Component | Description | Retention |
|-----------|-------------|-----------|
| Turn history | User/assistant exchanges | Session duration |
| Decision points | Key choices made | Session duration |
| Error context | Failed attempts | Session duration |
| User preferences | Expressed preferences | Extended (30 days) |
| Task state | Incomplete workflows | Session duration |

### Per-Tier Episodic Memory

| Tier | Max Sessions | History Depth | Storage Quota |
|------|--------------|---------------|---------------|
| Free | 10 active | 50 turns | 10MB |
| Pro | 100 active | 200 turns | 100MB |
| Enterprise | Unlimited | Unlimited | 1GB+ |

---

## Semantic Memory

### Purpose

Long-term knowledge base including documents, embeddings, and facts.

### Characteristics

| Attribute | Value |
|-----------|-------|
| Scope | Tenant-level |
| Storage | Vector DB + Document store |
| TTL | Permanent (with versioning) |
| Size limit | Tier-dependent |
| Tenant isolation | Collection/namespace per tenant |

### Contents

| Component | Description | Storage Type |
|-----------|-------------|--------------|
| Document embeddings | RAG corpus | Vector DB |
| Entity facts | Extracted knowledge | Graph DB / KV |
| Conversation summaries | Compressed history | Document store |
| User profiles | Aggregated preferences | Structured DB |
| Domain ontology | Tenant-specific concepts | Graph DB |

### Vector Storage Isolation

| Strategy | Implementation | Isolation Level |
|----------|----------------|-----------------|
| Collection-per-tenant | Separate vector collections | Strong |
| Namespace-per-tenant | Shared collection, namespace filter | Medium |
| Filter-per-tenant | Shared collection, metadata filter | Basic |

### Per-Tier Semantic Memory

| Tier | Vector Limit | Document Limit | Embedding Model |
|------|--------------|----------------|-----------------|
| Free | 10K vectors | 100 docs | Shared (text-embedding-3-small) |
| Pro | 500K vectors | 5K docs | Shared (text-embedding-3-large) |
| Enterprise | 10M vectors | 100K docs | Dedicated (custom fine-tuned) |

---

## Procedural Memory

### Purpose

Learned patterns, preferences, and optimized behaviors from past interactions.

### Characteristics

| Attribute | Value |
|-----------|-------|
| Scope | User/Tenant level |
| Storage | Mem0 / Custom store |
| TTL | 90 days to permanent |
| Size limit | Tier-dependent |
| Tenant isolation | User/tenant scoped |

### Contents

| Component | Description | Learning Source |
|-----------|-------------|-----------------|
| Task templates | Successful workflows | Repeated success |
| Preference weights | User choices | Explicit + implicit |
| Error patterns | Failure avoidance | Repeated failures |
| Optimization hints | Performance tuning | A/B testing |
| Communication style | Tone/format preferences | Feedback signals |

### Memory Learning Pipeline

| Stage | Input | Output | Frequency |
|-------|-------|--------|-----------|
| Collection | User interactions | Raw events | Real-time |
| Extraction | Events | Candidate memories | Per-session |
| Validation | Candidates | Confirmed memories | Batch (daily) |
| Consolidation | Memories | Compressed knowledge | Batch (weekly) |
| Decay | All memories | Relevance scores | Continuous |

### Per-Tier Procedural Memory

| Tier | Memory Limit | Learning Rate | Persistence |
|------|--------------|---------------|-------------|
| Free | 100 memories | Slow (weekly) | 30 days |
| Pro | 1K memories | Medium (daily) | 90 days |
| Enterprise | 10K memories | Fast (real-time) | Permanent |

---

## Collective Memory

### Purpose

Platform-wide intelligence derived from anonymized, aggregated patterns.

### Characteristics

| Attribute | Value |
|-----------|-------|
| Scope | Platform-wide |
| Storage | Centralized analytics |
| TTL | Permanent |
| Size limit | Platform capacity |
| Tenant isolation | Anonymized aggregation only |

### Contents

| Component | Description | Anonymization |
|-----------|-------------|---------------|
| Usage patterns | Common workflows | K-anonymity (k >= 100) |
| Error solutions | Fix patterns | De-identified |
| Performance baselines | Expected metrics | Aggregated only |
| Feature effectiveness | What works | Statistical only |

### Privacy Safeguards

| Safeguard | Implementation | Verification |
|-----------|----------------|--------------|
| Minimum aggregation | k >= 100 tenants | Automated check |
| Differential privacy | Noise injection | Privacy budget |
| PII removal | NER + pattern matching | Before aggregation |
| Opt-out support | Tenant preference flag | Per-tenant |
| Audit trail | Aggregation logs | Compliance review |

---

## Tenant Isolation Matrix

| Memory Tier | Isolation Mechanism | Cross-Tenant Risk |
|-------------|---------------------|-------------------|
| Working | Request scope | None |
| Episodic | Session + tenant_id | Low (session hijacking) |
| Semantic | Collection/namespace | Medium (query injection) |
| Procedural | Tenant_id scope | Low (preference leak) |
| Collective | Anonymization | Low (re-identification) |

### Isolation Verification Tests

| Test | Method | Pass Criteria |
|------|--------|---------------|
| Cross-tenant query | Tenant A queries with B's ID | Zero results |
| Memory injection | Malicious memory content | Sanitization applied |
| Session isolation | Switch tenant mid-session | Context cleared |
| RAG boundary | Embedding similarity search | Only tenant's docs |

---

## Decision Framework

### When to Use Each Tier

| Scenario | Primary Tier | Secondary Tier |
|----------|--------------|----------------|
| Single question | Working | - |
| Multi-turn chat | Working + Episodic | - |
| Document Q&A | Working + Semantic | Episodic |
| Personalized assistant | All tiers | Collective (opt-in) |
| Anonymous analytics | Collective | - |

### Memory Architecture Selection

| Factor | Small Scale | Large Scale |
|--------|-------------|-------------|
| < 100 tenants | Shared stores, filter isolation | - |
| 100-1000 tenants | - | Namespace isolation |
| > 1000 tenants | - | Collection-per-tenant |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `memory-tiers`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent memory tiers architecture {date}"
- Search: "multi-tenant Mem0 implementation {date}"
- Search: "LLM conversation memory patterns {date}"

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Memory architecture design
- `bmad-bam-tenant-model-isolation` - Tenant isolation for memory
- `bmad-bam-ai-eval-safety-design` - Memory safety evaluation
