# Step 05: Compile Memory Tier Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile all memory tier designs into final document
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: Consolidate all step outputs
- 🚫 Do NOT: Add new design content (consolidation only)
- 🔍 Use web search: Not required (compilation step)
- ⚠️ Note: Ensure all CRITICAL items are documented

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling all memory tier designs into single document
- Generating executive summary
- Creating implementation roadmap
- Producing final output artifact

**OUT OF SCOPE:**
- New design work (should have been completed in Steps 01-04)
- Implementation details beyond architecture

---

## Purpose

Compile all memory tier design work from Steps 01-04 into a comprehensive, actionable memory tier design document. This document serves as the authoritative reference for AI agent memory implementation.

---

## Prerequisites

- Steps 01-04 completed
- All memory tier designs documented
- **Load template:** `{project-root}/_bmad/bam/data/templates/memory-tier.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## Actions

### 1. Generate Executive Summary

Compile key findings into executive summary:

| Section | Content |
|---------|---------|
| AI Runtime | {{ai_runtime}} with {{orchestration_pattern}} |
| Memory Tiers | Session, Conversation, Working, Tenant, Global |
| Tenant Isolation | {{isolation_strategy}} with {{verification_method}} |
| Vector Store | {{vector_db}} with {{embedding_model}} |
| Compliance | {{compliance_frameworks}} |

### 2. Compile Memory Tier Inventory

| Tier | Scope | Storage | TTL | Isolation |
|------|-------|---------|-----|-----------|
| Session | Request | In-memory | Request duration | Process |
| Conversation | Session | Redis | {{conversation_ttl}} | Tenant-keyed |
| Working | Task | Redis + SQLite | Task duration | Tenant-keyed |
| Tenant | Tenant lifetime | PostgreSQL + Vector DB | Persistent | Namespace/Collection |
| Global | System | Vector DB | Admin-managed | Read-only |

### 3. Compile Design Decisions

Consolidate all architectural decisions:

| Decision | Choice | Rationale | Alternatives Considered |
|----------|--------|-----------|------------------------|
| Vector Database | {{vector_db}} | {{rationale}} | {{alternatives}} |
| Embedding Model | {{embedding_model}} | {{rationale}} | {{alternatives}} |
| Tenant Isolation | {{isolation_strategy}} | {{rationale}} | {{alternatives}} |
| Context Management | {{context_strategy}} | {{rationale}} | {{alternatives}} |
| Compression Strategy | {{compression_strategy}} | {{rationale}} | {{alternatives}} |

### 4. Generate Implementation Roadmap

| Phase | Deliverable | Dependencies | Estimated Effort |
|-------|-------------|--------------|------------------|
| 1. Foundation | Memory service interfaces | None | 1 week |
| 2. Short-term | Session + Conversation tiers | Phase 1 | 1-2 weeks |
| 3. Long-term | Vector DB + Tenant memory | Phase 1, 2 | 2-3 weeks |
| 4. Isolation | Verification + Audit logging | Phase 1, 2, 3 | 1-2 weeks |
| 5. Compliance | Export + Deletion features | Phase 1, 2, 3, 4 | 1 week |
| 6. Testing | Integration + Security tests | All phases | 1-2 weeks |

### 5. Compile Critical Requirements

**CRITICAL Memory Requirements:**

| Requirement | Category | Implementation Status |
|-------------|----------|----------------------|
| Tenant isolation for all retrieval | Security | Designed |
| Embedding namespace per tenant | Security | Designed |
| Memory access audit logging | Compliance | Designed |
| GDPR data export capability | Compliance | Designed |
| Complete tenant deletion | Compliance | Designed |
| Cross-tenant verification | Security | Designed |
| Context window management | Performance | Designed |
| Memory compression | Performance | Designed |

### 6. Generate Output Document

Compile final document using template:

**Document Structure:**

```markdown
# Memory Tier Design - {{project_name}}

## Document Metadata
- Version: 1.0
- Date: {{date}}
- Status: Draft
- Author: AI Architect

## Executive Summary
{summary from Step 1}

## Memory Tier Inventory
{inventory from Step 2}

## Short-Term Memory Design
### Session Memory
{from Step 02}

### Conversation Memory
{from Step 02}

### Context Window Management
{from Step 02}

### TTL and Eviction
{from Step 02}

## Long-Term Memory Design
### Vector Store Architecture
{from Step 03}

### Tenant Memory Tier
{from Step 03}

### Global Memory Tier
{from Step 03}

### Memory Consolidation
{from Step 03}

## Memory Isolation and Compliance
### Isolation Verification
{from Step 04}

### Audit Logging
{from Step 04}

### Data Export (GDPR)
{from Step 04}

### Tenant Deletion
{from Step 04}

### Compliance Mapping
{from Step 04}

## Design Decisions
{decisions from Step 5}

## Implementation Roadmap
{roadmap from Step 4}

## Critical Requirements
{requirements from Step 5}

## Appendices
### A. Memory Key Patterns
### B. Audit Log Schema
### C. Export Format Specification
### D. Deletion Verification Checklist
```

### 7. Save Output Document

Save to: `{output_folder}/planning-artifacts/ai/memory-tiers-design.md`

---

## COLLABORATION MENUS (A/P/C):

After generating the complete document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections
- **P (Party Mode)**: Final review from architect perspectives
- **C (Continue)**: Complete Create mode and save document

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete memory tier design document
- Process enhanced insights on any section
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Final review of memory tier design"
- Present synthesized recommendations from Atlas, Nova, Kai
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/ai/memory-tiers-design.md`
- Create mode complete

---

## Verification

- [ ] Executive summary generated
- [ ] Memory tier inventory complete
- [ ] All design sections compiled
- [ ] Implementation roadmap created
- [ ] Critical requirements documented
- [ ] **CRITICAL:** All isolation requirements included
- [ ] **CRITICAL:** All compliance requirements included
- [ ] Document saved to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete memory tier design document
- **Output to:** `{output_folder}/planning-artifacts/ai/memory-tiers-design.md`

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Create workflow complete. Memory tier design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Memory tier design is complete. The design covers:
- 5 memory tiers (Session, Conversation, Working, Tenant, Global)
- Short-term memory with context management
- Long-term memory with vector stores
- Tenant isolation verification
- GDPR compliance features
- Implementation roadmap

Run Validate mode to verify the design meets QG-M3 (Agent Runtime) quality gate requirements.
