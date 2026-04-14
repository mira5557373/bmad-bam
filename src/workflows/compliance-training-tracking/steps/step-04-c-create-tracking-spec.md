# Step 4: Create Training Tracking Specification

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

Generate the comprehensive compliance training tracking specification document consolidating requirements, curriculum, tracking system, and reporting.

## Prerequisites

- Requirements (Step 1), Curriculum (Step 2), Tracking (Step 3) complete
- Soft gate checkpoint passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Compile Requirements Section

| Section | Content | Source |
|---------|---------|--------|
| Framework Requirements | Training mandates | Step 1 |
| Role-Based Requirements | Per-role training | Step 1 |
| Timing Requirements | Frequency and deadlines | Step 1 |
| Assessment Requirements | Testing standards | Step 1 |

### 2. Document Curriculum

| Component | Coverage | Status |
|-----------|----------|--------|
| Course Catalog | {X} courses | Designed |
| Learning Paths | {Y} role paths | Designed |
| Content Structure | Standard template | Defined |
| Certifications | {Z} certifications | Specified |

### 3. Include Tracking System

| Feature | Implementation | Priority |
|---------|----------------|----------|
| Completion tracking | LMS integration | High |
| Compliance reporting | Dashboard + exports | High |
| Reminder system | Automated emails | Medium |
| Audit evidence | Auto-generation | High |

### 4. Generate Training Tracking Specification

| Document Section | Content |
|------------------|---------|
| Executive Summary | Scope, compliance coverage |
| Training Requirements | Framework and role requirements |
| Curriculum Design | Course catalog, learning paths |
| Tracking System | Completion, reporting, reminders |
| Audit Evidence | Evidence generation, retention |
| Implementation Plan | Timeline, resources |
| Appendices | Templates, sample reports |

**Verify current best practices with web search:**
Search the web: "compliance training program documentation {date}"
Search the web: "training compliance audit requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Finish Create Mode - export specification to `{output_folder}/planning-artifacts/compliance-training-tracking-spec.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-training.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-training.md`

---

## Verification

- [ ] Requirements section complete
- [ ] Curriculum documented
- [ ] Tracking system included
- [ ] Specification exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/compliance-training-tracking-spec.md`
- Training requirements matrix
- Curriculum design
- Tracking system requirements

## Next Step

Training tracking specification complete. Options:
- Switch to Edit mode (`step-10-e-load-training.md`) for modifications
- Switch to Validate mode (`step-20-v-load-training.md`) for compliance checks
