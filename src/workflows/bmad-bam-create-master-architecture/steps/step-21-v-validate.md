# Step 21: Validate Master Architecture

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

---

## Purpose

Validate the master architecture document against QG-F1 foundation gate criteria, ensuring all required sections are present, tenant model is fully specified, AI runtime requirements are documented, and code patterns are provided.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,agent-runtime,module-boundaries
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-F1`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/foundation-gate.md`



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Validation Checklist

### Structural Completeness
- [ ] All 7 required sections present: tenant model, AI runtime, module boundaries, shared kernel, tech stack, contracts, code patterns
- [ ] Table of contents with section anchors present
- [ ] Document follows master-architecture-template.md structure

### Tenant Model
- [ ] Isolation strategy defined (RLS / schema / database per tenant)
- [ ] TenantContext class shape documented
- [ ] Tenant lifecycle states defined (provisioning → active → suspended → archived → deleted)
- [ ] Isolation matrix covers all asset types (data, cache, logs, memory, tools, jobs, vectors, analytics)

### AI Runtime
- [ ] Agent registry design documented
- [ ] Tool registry with permission policies defined
- [ ] Memory tier rules defined (session, user, tenant, global)
- [ ] Safety requirements documented (guardrails, kill switches, fallback)
- [ ] Evaluation requirements documented (golden tasks, metrics, thresholds)

### Module Boundaries
- [ ] Facade requirements defined
- [ ] Forbidden dependency patterns documented
- [ ] Event ownership rules defined
- [ ] Database ownership rules defined

### Shared Kernel
- [ ] TenantContext interface defined
- [ ] BaseEntity requirements documented
- [ ] EventBus interface defined
- [ ] Common value objects and DTOs listed

### Technology Stack
- [ ] Technology decisions per layer documented
- [ ] Version pins present for all technologies
- [ ] Limp mode architecture defined

### Core Contracts
- [ ] Tenant context interface contract defined
- [ ] AI runtime interface contract defined
- [ ] Event bus interface contract defined
- [ ] Module facade template defined

### Code Patterns
- [ ] At least 4 code pattern examples present
- [ ] Repository pattern (tenant-scoped) included
- [ ] Facade pattern included
- [ ] Domain event pattern included
- [ ] Service pattern included

### Cross-Cutting
- [ ] No module-specific decisions present (master arch is module-agnostic)
- [ ] All TSA technologies have version pins
- [ ] Document is internally consistent (no contradictions between sections)

### QG-F1 Foundation Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-F1`

| QG-F1 Pattern | Status | Evidence |
|---------------|--------|----------|
| `tenant-isolation` | [ ] Pass / [ ] Fail | Tenant model section complete |
| `agent-runtime` | [ ] Pass / [ ] Fail | AI runtime section complete |
| `module-boundaries` | [ ] Pass / [ ] Fail | Module boundary rules documented |

**QG-F1 verification_tests:** master-arch exists; tenant model selected; run-contract defined; module boundaries documented

**QG-F1 Foundation Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All required sections present, all critical items checked, no contradictions |
| **CONDITIONAL** | Minor gaps (e.g., missing version pins for non-critical tech) — document gaps and proceed |
| **FAIL** | Missing required sections, undefined isolation strategy, or no code patterns — return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and security perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on quality gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-F1 validation findings for master architecture"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per section
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per section
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation findings per category
- Preliminary gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per section

---

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
