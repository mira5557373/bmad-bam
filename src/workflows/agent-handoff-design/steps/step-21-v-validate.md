# Step 21: Validate Agent Handoff Architecture

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

Validate the agent handoff architecture against QG-M3 (Agent Runtime) quality gate criteria.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-orchestration

---

## Inputs

- Loaded artifact from Step 20
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Perform the following validation checks:

### Validation Checklist

### Handoff Protocol
- [ ] Handoff pattern selected with justification
- [ ] Message contract defined
- [ ] Handoff triggers specified
- [ ] Priority and preemption rules defined
- [ ] Tenant context propagation designed

### State Sharing
- [ ] State sharing pattern selected
- [ ] State structure defined
- [ ] Serialization format chosen
- [ ] State versioning designed
- [ ] Conflict resolution specified
- [ ] Tenant isolation implemented

### Circuit Breaker
- [ ] Circuit breaker configuration defined
- [ ] Timeout policies specified per agent
- [ ] Retry strategies designed
- [ ] Fallback mechanisms implemented
- [ ] Health monitoring configured

### Recovery Patterns
- [ ] Failure detection mechanisms defined
- [ ] Automatic recovery implemented
- [ ] Manual intervention triggers specified
- [ ] State reconciliation designed
- [ ] Audit trail configured

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, tenant isolation verified, recovery tested |
| **CONDITIONAL** | Minor gaps - document and proceed |
| **FAIL** | Missing handoff protocol, no circuit breaker, or no recovery |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring QA and architect perspectives on gaps
- **C (Continue)**: Accept validation and generate report
- **[Specific concerns]**: Describe validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Document validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Gaps documented with remediation
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation checklist results
- Gate decision (PASS/CONDITIONAL/FAIL)
- Gap analysis with remediation steps

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
