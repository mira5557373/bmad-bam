# Step 5: Compile Data Residency Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Compile the complete data residency design document, consolidating all design decisions from Steps 1-4, and output to the planning artifacts folder.

---

## Prerequisites

- Steps 1-4 completed with all design decisions
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-residency.md`

---

## Inputs

- Data residency requirements (Step 1)
- Regional data storage design (Step 2)
- Cross-region handling design (Step 3)
- Tenant region assignment design (Step 4)

---

## Actions

### 1. Consolidate Design Sections

Compile the following sections into the final document:

| Section | Source Step | Status |
|---------|-------------|--------|
| 1. Executive Summary | Synthesized | To generate |
| 2. Compliance Requirements | Step 1 | Complete |
| 3. Target Regions | Step 1 | Complete |
| 4. Regional Database Architecture | Step 2 | Complete |
| 5. Regional Storage Configuration | Step 2 | Complete |
| 6. Cache Region Affinity | Step 2 | Complete |
| 7. Event Routing by Region | Step 2 | Complete |
| 8. Data Replication Restrictions | Step 3 | Complete |
| 9. Cross-Region API Routing | Step 3 | Complete |
| 10. Backup Storage Policies | Step 3 | Complete |
| 11. Disaster Recovery Strategy | Step 3 | Complete |
| 12. Region Selection Workflow | Step 4 | Complete |
| 13. Region Migration Workflow | Step 4 | Complete |
| 14. Compliance Verification | Step 4 | Complete |
| 15. Edge Location Configuration | Step 4 | Complete |

### 2. Generate Executive Summary

Create executive summary covering:

| Summary Element | Content |
|-----------------|---------|
| Purpose | Data residency strategy for multi-tenant platform |
| Scope | {number} geographic regions, {number} compliance zones |
| Key Decisions | Primary region strategy, cross-region restrictions |
| Compliance Coverage | GDPR, CCPA, LGPD, PDPA, PIPL as applicable |
| Migration Support | Supported with compliance verification |
| DR Strategy | Same-zone DR with compliance preservation |

### 3. Create Implementation Roadmap

Define implementation phases:

| Phase | Duration | Deliverables | Dependencies |
|-------|----------|--------------|--------------|
| Phase 1: Foundation | 2-3 weeks | Regional DB, storage buckets | Infrastructure |
| Phase 2: Routing | 1-2 weeks | API gateway, event routing | Phase 1 |
| Phase 3: Tenant Assignment | 1-2 weeks | Onboarding flow, region lock | Phase 2 |
| Phase 4: Migration | 2-3 weeks | Migration workflow, tooling | Phase 3 |
| Phase 5: Compliance | 1-2 weeks | Audit trail, dashboards | Phase 4 |

### 4. Document ADRs

Capture key architectural decisions:

| ADR ID | Decision | Rationale |
|--------|----------|-----------|
| ADR-DR-001 | Regional database deployment | Compliance isolation, latency |
| ADR-DR-002 | Strict cross-region replication restrictions | GDPR/LGPD/PIPL compliance |
| ADR-DR-003 | Region immutability at onboarding | Prevent compliance violations |
| ADR-DR-004 | Same-zone disaster recovery | Maintain compliance during DR |
| ADR-DR-005 | Edge caching for non-PII only | Performance vs compliance |

### 5. Output Document

Save complete document:
- **Output location:** `{output_folder}/planning-artifacts/data-residency-design.md`

**Document Frontmatter:**

```yaml
---
title: Data Residency Design
version: 1.0.0
status: DRAFT
created: {date}
stepsCompleted: [1, 2, 3, 4, 5]
complianceZones: [EU, US, APAC, BR]
targetRegions: [US-EAST, US-WEST, EU-WEST, EU-CENTRAL, APAC-EAST, SA-EAST]
---
```

---

## COLLABORATION MENUS (A/P/C):

After compiling the document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before finalizing
- **P (Party Mode)**: Bring final review perspectives from all stakeholders
- **C (Continue)**: Accept compiled document and complete Create mode
- **[Specific refinements]**: Describe sections to refine before completion

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete document structure, implementation roadmap
- Process enhanced insights on completeness and consistency
- Ask user: "Accept these refinements? (y/n)"
- If yes, integrate into final document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Final review of data residency design document"
- Process all stakeholder perspectives
- Present synthesized final recommendations
- Ask user: "Accept these final recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete document to: `{output_folder}/planning-artifacts/data-residency-design.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark Create mode complete

---

## Verification

- [ ] All sections consolidated
- [ ] Executive summary generated
- [ ] Implementation roadmap defined
- [ ] ADRs documented
- [ ] Document saved to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete data residency design document
- **Output to:** `{output_folder}/planning-artifacts/data-residency-design.md`

---

## Next Step

Create workflow complete. Data residency design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Data residency design is complete. The document includes:
- Compliance requirements and target regions
- Regional data storage architecture
- Cross-region handling policies
- Tenant region assignment workflows
- Implementation roadmap and ADRs
