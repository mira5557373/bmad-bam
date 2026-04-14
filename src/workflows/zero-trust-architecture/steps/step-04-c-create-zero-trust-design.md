# Step 4: Create Zero Trust Design Document

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- SEARCH Use web search to verify current best practices when making technology decisions

---

## Purpose

Assemble the comprehensive zero-trust architecture document.

## Prerequisites

- All previous steps completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Assemble Document

| Section | Source | Status |
|---------|--------|--------|
| Executive Summary | New | Draft |
| Identity Architecture | Step 1 | Complete |
| Network Segmentation | Step 2 | Complete |
| Continuous Verification | Step 3 | Complete |
| Implementation Roadmap | New | Draft |
| Maturity Model | New | Draft |

### 2. Define Implementation Roadmap

| Phase | Focus | Timeline |
|-------|-------|----------|
| Phase 1 | Identity foundation | Q1 |
| Phase 2 | Network segmentation | Q2 |
| Phase 3 | Continuous verification | Q3 |
| Phase 4 | Behavioral analytics | Q4 |

### 3. Define Maturity Model

| Level | Description | Capabilities |
|-------|-------------|--------------|
| L1 Basic | Traditional security | Perimeter-based |
| L2 Emerging | Identity-centric | MFA, RBAC |
| L3 Advanced | Microsegmented | Service mesh, mTLS |
| L4 Optimal | Continuous verification | Context-aware, behavioral |

**Verify current best practices with web search:**
Search the web: "zero trust implementation roadmap {date}"
Search the web: "zero trust maturity model {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review document completeness
- **A2**: Analyze roadmap feasibility
- **A3**: Evaluate maturity model

### [P]ropose Changes
- **P1**: Propose document additions
- **P2**: Propose roadmap changes
- **P3**: Suggest maturity adjustments

### [C]ontinue
- **C1**: Finalize zero-trust design
- **C2**: Mark workflow complete and output

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All sections populated
- [ ] Roadmap defined
- [ ] Maturity model documented
- [ ] Document ready for approval

## Outputs

- `{output_folder}/planning-artifacts/zero-trust-architecture.md`

## Next Step

Workflow complete.
