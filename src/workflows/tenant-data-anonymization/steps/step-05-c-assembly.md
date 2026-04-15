# Step 5: Assembly

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Assemble all data anonymization components into a complete design document.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`

---

## Actions

### 1. Document Assembly

Compile sections from previous steps:

| Section | Source | Content |
|---------|--------|---------|
| Data Classification | Step 1 | PII categories, sensitivity levels |
| Anonymization Rules | Step 2 | Techniques, field mappings |
| Verification | Step 3 | Testing, re-identification checks |
| Erasure Procedures | Step 4 | RTBF, DSAR handling |

### 2. Cross-Reference Validation

Ensure consistency across sections:

| Check | Validation |
|-------|------------|
| Classification coverage | All PII types have anonymization rules |
| Technique alignment | Rules match sensitivity levels |
| Verification completeness | All techniques have verification methods |
| Compliance mapping | All regulations have procedures |

### 3. Compliance Framework Mapping

| Framework | Requirements Addressed |
|-----------|----------------------|
| GDPR | Articles 17 (erasure), 20 (portability), 15 (access) |
| CCPA | Right to delete, right to know, opt-out |
| HIPAA | PHI de-identification, safe harbor, expert determination |
| SOC 2 | Data handling controls, privacy commitments |

### 4. Implementation Roadmap

| Phase | Deliverable | Priority |
|-------|-------------|----------|
| Phase 1 | PII classification automation | P0 |
| Phase 2 | Core anonymization techniques | P0 |
| Phase 3 | DSAR workflow automation | P1 |
| Phase 4 | Self-service privacy portal | P2 |

### 5. Output Document Structure

```markdown
# Tenant Data Anonymization Design

## Overview
- Purpose and scope
- Compliance framework alignment

## Data Classification
- PII categories
- Sensitivity levels
- Tenant-specific data mapping

## Anonymization Strategies
- Technique selection
- Field-level mappings
- Pseudonymization approach

## Verification Framework
- Re-identification testing
- K-anonymity validation
- Automated checks

## Erasure Procedures
- Right to erasure workflow
- DSAR handling
- Retention exceptions
- Audit trail

## Test Data Generation
- Production data masking
- Synthetic data approach
- Referential integrity

## Compliance Evidence
- Documentation requirements
- Audit readiness
- Reporting

## Operational Runbook
- Standard procedures
- Exception handling
- Incident response
```

**Verify current best practices with web search:**
Search the web: "data anonymization design documentation best practices {date}"
Search the web: "privacy by design multi-tenant architecture {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the assembly, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections for enhancement
- **P (Party Mode)**: Final review with compliance and legal perspectives
- **C (Continue)**: Accept design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save complete design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/compliance/tenant-data-anonymization.md`
- Create mode complete

---

## Verification

- [ ] All sections assembled
- [ ] Cross-references validated
- [ ] Compliance mapping complete
- [ ] Implementation roadmap defined
- [ ] Output document generated
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete data anonymization design document
- **Output to:** `{output_folder}/planning-artifacts/compliance/tenant-data-anonymization.md`

---

## Next Step

Create workflow complete. Data anonymization design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Data anonymization design is complete. The artifact is ready for validation or implementation.
