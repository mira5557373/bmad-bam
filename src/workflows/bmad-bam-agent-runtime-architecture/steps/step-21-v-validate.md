# Step 21: Validate Agent Runtime Architecture

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

Validate the agent runtime architecture against QG-M3 quality gate criteria, ensuring complete orchestration patterns, tool registry with permissions, memory tier isolation, evaluation foundations, and kill switch mechanisms.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M3,QG-AI2`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`



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

### Orchestration Model
- [ ] Orchestration pattern selected and justified with ADR
- [ ] Escalation criteria documented (tool count, prompt conflicts, quality degradation)
- [ ] Kill switch fallback defined for chosen topology
- [ ] Prompt management strategy documented

### Tool Registry
- [ ] Tool catalog structure defined (name, description, module owner, permissions)
- [ ] Permission model defined (role-based, tenant-scoped, approval-required)
- [ ] Sandbox configuration defined for untrusted tools
- [ ] Policy engine rules documented
- [ ] Pre-tool safety checks defined

### Memory Tiers
- [ ] All 5 tiers defined (Session, User, Tenant, Global, Episodic)
- [ ] Each tier has scope, storage, and retention defined
- [ ] Tenant memory isolation rules explicit (no cross-tenant leakage)
- [ ] Memory tier consistent with master architecture

### Approval Workflows
- [ ] Trigger conditions defined (risk level, cost threshold, sensitivity)
- [ ] Queue design documented (per-tenant)
- [ ] Timeout handling defined
- [ ] Escalation rules documented

### Evaluation Foundation
- [ ] Golden task template defined
- [ ] Metric definitions present (accuracy, relevance, latency, cost, safety)
- [ ] Threshold configuration per metric
- [ ] Regression baseline approach documented

### Kill Switch Design
- [ ] Feature flag integration defined
- [ ] Circuit breaker configuration per agent/tool
- [ ] Manual override mechanism documented
- [ ] Rollback procedure defined

### Cross-Cutting
- [ ] All components consistent with master architecture AI runtime section
- [ ] Tenant isolation maintained across all components
- [ ] No single point of failure without fallback

### QG-M3 Agent Runtime Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M3`

| QG-M3 Pattern | Status | Evidence |
|---------------|--------|----------|
| `agent-runtime` | [ ] Pass / [ ] Fail | Agent orchestration topology documented |
| `tool-execution` | [ ] Pass / [ ] Fail | Tool registry with permissions defined |
| `run-contracts` | [ ] Pass / [ ] Fail | Budget and safety contracts documented |

**QG-M3 verification_tests:** tools registered; budget enforcement defined; kill switch specified; memory tiers configured

**QG-M3 Agent Runtime:** [ ] SATISFIED / [ ] NOT SATISFIED

### QG-AI2 AI Observability Contribution Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI2`

This workflow contributes to QG-AI2 (AI Observability):

| QG-AI2 Pattern | Status | Evidence |
|----------------|--------|----------|
| `llm_metrics_collected` | [ ] Pass / [ ] Fail | Evaluation foundation metrics section |
| `token_usage_tracked` | [ ] Pass / [ ] Fail | Budget enforcement in approval workflow |
| `latency_monitored` | [ ] Pass / [ ] Fail | Latency thresholds in evaluation |
| `cost_per_request_calculated` | [ ] Pass / [ ] Fail | Cost triggers in approval workflow |
| `quality_metrics_defined` | [ ] Pass / [ ] Fail | Accuracy/relevance/safety metrics |

**QG-AI2 verification_tests:** llm_metrics_collected,latency_monitored

**QG-AI2 AI Observability contribution:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 6 components defined, quality gates met, tenant isolation verified |
| **CONDITIONAL** | Minor gaps (e.g., evaluation thresholds not yet calibrated: accuracy baseline < 95%, latency p99 > 500ms, safety score < 0.9) — document gaps and proceed |
| **FAIL** | Missing orchestration pattern, undefined tool permissions, or no kill switch — return to Create mode |

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
- Context: "Review QG-M3 validation findings for agent runtime architecture"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
