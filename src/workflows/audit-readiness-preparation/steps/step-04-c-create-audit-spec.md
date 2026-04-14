# Step 4: Create Audit Readiness Specification

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

Generate the comprehensive audit readiness specification document consolidating evidence inventory, collection procedures, testing plan, and auditor coordination.

## Prerequisites

- Evidence inventory (Step 1), Collection design (Step 2), Testing plan (Step 3) complete
- Soft gate checkpoint passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Compile Evidence Section

| Section | Content | Source |
|---------|---------|--------|
| Control-Evidence Mapping | Complete mapping | Step 1 |
| Evidence Sources | Source inventory | Step 1 |
| Quality Requirements | Quality criteria | Step 1 |

### 2. Document Collection Procedures

| Component | Implementation | Automation |
|-----------|----------------|------------|
| Automated collection | Procedures | Yes/Partial |
| Manual collection | Runbooks | No |
| Storage | Architecture | Yes |
| Chain of custody | Requirements | Partial |

### 3. Include Testing Plan

| Test Type | Coverage | Frequency | Owner |
|-----------|----------|-----------|-------|
| Automated | {X} controls | Continuous | {Owner} |
| Manual | {Y} controls | Quarterly | {Owner} |

### 4. Define Auditor Coordination

| Coordination Element | Process | Timeline |
|---------------------|---------|----------|
| Engagement kickoff | Meeting, scope review | Week 1 |
| Evidence delivery | Staged delivery | Weeks 2-4 |
| Walkthroughs | Scheduled sessions | Weeks 3-6 |
| Draft review | Findings review | Week 7 |
| Final report | Sign-off | Week 8 |

### 5. Generate Audit Readiness Specification

| Document Section | Content |
|------------------|---------|
| Executive Summary | Scope, timeline, readiness status |
| Evidence Inventory | Control-evidence mapping |
| Collection Procedures | Automated and manual procedures |
| Testing Plan | Methodology, samples, tracking |
| Auditor Coordination | Schedule, contacts, logistics |
| Readiness Checklist | Pre-audit checklist |
| Appendices | Templates, contacts |

**Verify current best practices with web search:**
Search the web: "audit readiness checklist best practices {date}"
Search the web: "auditor coordination procedures {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Finish Create Mode - export specification to `{output_folder}/planning-artifacts/audit-readiness-spec.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-audit.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-audit.md`

---

## Verification

- [ ] Evidence section complete
- [ ] Collection procedures documented
- [ ] Testing plan included
- [ ] Auditor coordination defined
- [ ] Specification exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/audit-readiness-spec.md`
- Evidence inventory matrix
- Collection procedures
- Testing plan

## Next Step

Audit readiness specification complete. Options:
- Switch to Edit mode (`step-10-e-load-audit.md`) for modifications
- Switch to Validate mode (`step-20-v-load-audit.md`) for readiness checks
