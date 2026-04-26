# Step 05: Compile White-Labeling Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices

---

## Purpose

Compile all white-labeling design decisions into a comprehensive design document and output to the planning artifacts folder.

---

## Prerequisites

- Steps 01-04 completed: All customization dimensions designed
- **Load template:** `{project-root}/_bmad/bam/data/templates/white-label-template.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`

---

## Actions

### 1. Compile Design Summary

Generate executive summary of white-labeling design:

| Dimension | Scope | Tiers Affected |
|-----------|-------|----------------|
| Branding | {summary} | {tiers} |
| Domain | {summary} | {tiers} |
| Email | {summary} | {tiers} |
| Features | {summary} | {tiers} |

### 2. Generate Tier Feature Matrix

Compile complete tier-based feature matrix:

| Feature Category | Free | Pro | Enterprise | OEM |
|------------------|------|-----|------------|-----|
| **Branding** | | | | |
| Logo upload | Yes | Yes | Yes | Yes |
| Color theme | Limited | Full | Full | Full |
| Custom fonts | No | Yes | Yes | Yes |
| Custom CSS | No | No | Yes | Yes |
| Email branding | No | Yes | Yes | Yes |
| Document watermarks | No | Yes | Yes | Yes |
| **Domain** | | | | |
| Platform subdomain | Yes | Yes | Yes | Yes |
| Custom subdomain | No | No | Yes | Yes |
| Apex domain | No | No | Yes | Yes |
| Multiple domains | No | No | No | Yes |
| **Features** | | | | |
| Feature toggles | Limited | Yes | Yes | Yes |
| UI customization | No | Limited | Full | Full |
| Menu customization | No | Limited | Full | Full |
| Role naming | No | No | Yes | Yes |
| Remove platform branding | No | No | Yes | Yes |

### 3. Document Implementation Architecture

Compile architecture decisions:

| Component | Decision | Rationale |
|-----------|----------|-----------|
| Asset storage | {CDN strategy} | {why} |
| Theme delivery | {CSS injection method} | {why} |
| Domain handling | {DNS/SSL approach} | {why} |
| Feature flags | {storage/evaluation} | {why} |
| Configuration | {storage/caching} | {why} |

### 4. Generate Implementation Roadmap

Compile implementation phases:

| Phase | Components | Dependencies | Effort |
|-------|------------|--------------|--------|
| 1 - Foundation | Config storage, CDN setup | None | {estimate} |
| 2 - Branding | Logo, colors, CSS | Phase 1 | {estimate} |
| 3 - Domain | Custom domain, SSL | Phase 1 | {estimate} |
| 4 - Features | Feature flags, UI visibility | Phase 1 | {estimate} |
| 5 - Advanced | OEM features, reseller | Phases 1-4 | {estimate} |

### 5. Compile ADR Summary

Document architectural decisions made:

| ADR ID | Decision | Status |
|--------|----------|--------|
| ADR-WL-001 | {Asset storage decision} | APPROVED |
| ADR-WL-002 | {Theme delivery decision} | APPROVED |
| ADR-WL-003 | {SSL automation decision} | APPROVED |
| ADR-WL-004 | {Feature flag decision} | APPROVED |

### 6. Output Complete Document

Generate complete white-labeling design document using template:

**Output location:** `{output_folder}/planning-artifacts/white-labeling-design.md`

Document structure:
1. Executive Summary
2. Scope and Objectives
3. Tier Feature Matrix
4. Branding Customization Design
5. Domain Customization Design
6. Feature Customization Design
7. Implementation Architecture
8. Implementation Roadmap
9. Architectural Decisions (ADRs)
10. Appendices (schemas, examples)

---

## COLLABORATION MENUS (A/P/C):

After compiling the design document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before finalizing
- **P (Party Mode)**: Bring multi-perspective review of complete design
- **C (Continue)**: Finalize and save the white-labeling design document
- **[Specific sections]**: Describe which sections need revision

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete design document, tier matrix, ADRs
- Process enhanced insights on implementation approach
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review complete white-labeling design for multi-tenant SaaS"
- Present synthesized recommendations from platform, UX, DevOps, and product perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete design document
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/white-labeling-design.md`
- Create mode complete

---

## Verification

- [ ] Executive summary generated
- [ ] Tier feature matrix compiled
- [ ] Implementation architecture documented
- [ ] Implementation roadmap created
- [ ] ADR summary compiled
- [ ] Complete document generated
- [ ] Document saved to correct location

---

## Outputs

- **Primary output:** `{output_folder}/planning-artifacts/white-labeling-design.md`
- Executive summary of white-labeling capabilities
- Complete tier feature matrix
- Implementation architecture specification
- Phased implementation roadmap
- Architectural decision records

---

## Next Step

Workflow complete. Run validation mode (`step-20-v-*`) if quality gate verification is required.
