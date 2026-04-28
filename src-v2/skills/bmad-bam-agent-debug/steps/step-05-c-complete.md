# Step 5: Compile Debug Report

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


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Compile the comprehensive agent debug report including root cause summary, remediation recommendations, and monitoring improvements.

---

## Prerequisites

- Step 4 completed: Remediation designed
- All trace analysis and failure mode data collected
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-debug-report.md`

---

## Actions

### 1. Generate Root Cause Summary

Compile executive summary of findings:

| Finding | Root Cause | Severity | Status |
|---------|------------|----------|--------|
| {finding_1} | {root_cause} | Critical/High/Medium/Low | Confirmed |
| {finding_2} | {root_cause} | Critical/High/Medium/Low | Confirmed |
| {finding_3} | {root_cause} | Critical/High/Medium/Low | Suspected |

**Primary Root Cause:**

| Field | Value |
|-------|-------|
| Category | Prompt/Tool/Memory/Context/Isolation |
| Description | {detailed_description} |
| Impact | {business_impact} |
| Affected Scope | {agents_affected} |

**Contributing Factors:**

| Factor | Contribution Level | Evidence |
|--------|-------------------|----------|
| {factor_1} | Primary/Secondary/Minor | {evidence} |
| {factor_2} | Primary/Secondary/Minor | {evidence} |
| {factor_3} | Primary/Secondary/Minor | {evidence} |

### 2. Compile Remediation Recommendations

Prioritize remediation actions:

| Priority | Action | Owner | Effort | Impact |
|----------|--------|-------|--------|--------|
| P1 | {action_1} | {owner} | {effort} | {impact} |
| P2 | {action_2} | {owner} | {effort} | {impact} |
| P3 | {action_3} | {owner} | {effort} | {impact} |

**Implementation Timeline:**

| Phase | Actions | Duration | Dependencies |
|-------|---------|----------|--------------|
| Immediate | {actions} | 0-24h | None |
| Short-term | {actions} | 1-7 days | {deps} |
| Long-term | {actions} | 1-4 weeks | {deps} |

### 3. Document Monitoring Improvements

List observability enhancements:

| Enhancement | Type | Implementation | Priority |
|-------------|------|----------------|----------|
| {enhancement_1} | Metric/Alert/Log/Trace | {impl} | High/Med/Low |
| {enhancement_2} | Metric/Alert/Log/Trace | {impl} | High/Med/Low |
| {enhancement_3} | Metric/Alert/Log/Trace | {impl} | High/Med/Low |

**Alert Recommendations:**

| Alert Name | Condition | Threshold | Notification |
|------------|-----------|-----------|--------------|
| {alert_1} | {condition} | {threshold} | {channel} |
| {alert_2} | {condition} | {threshold} | {channel} |

### 4. Generate Debug Report

Fill the agent debug report template with all collected data:

**Report Sections:**
- Report Information (ID, Agent, Date, Investigator, Severity)
- Issue Summary (Problem, Reproduction Steps, Expected vs Actual)
- Agent Context (Configuration, Tenant Context)
- Debug Analysis (Traces, Tool Logs, Memory State, Token Usage)
- Root Cause Analysis (Issues, Contributing Factors)
- Resolution (Immediate Fix, Long-term Solution)
- Prevention (Safeguards, Monitoring)
- Verification Checklist

### 5. Save Report Artifact

Output to: `{output_folder}/planning-artifacts/agent-debug-report.md`

**Report Metadata:**

| Field | Value |
|-------|-------|
| Report ID | DEBUG-{agent_id}-{timestamp} |
| Generated | {date} |
| Version | 1.0.0 |
| Status | Complete |

---

## COLLABORATION MENUS (A/P/C):

After compiling the debug report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report sections
- **P (Party Mode)**: Bring review perspectives on report completeness
- **C (Continue)**: Finalize and save report
- **[Specific section]**: Examine a particular report section

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete debug report contents
- Process enhanced insights on report quality
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review agent debug report for completeness and accuracy"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete debug report
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/agent-debug-report.md`
- Create mode complete

---

## Verification

- [ ] Root cause summary compiled
- [ ] Remediation recommendations prioritized
- [ ] Monitoring improvements documented
- [ ] Debug report generated from template
- [ ] Report saved to correct location
- [ ] All findings traceable to evidence
- [ ] Patterns align with pattern registry

---

## Outputs

- Root cause summary with severity assessments
- Prioritized remediation recommendations
- Monitoring improvement plan
- Complete agent debug report
- **Output to:** `{output_folder}/planning-artifacts/agent-debug-report.md`

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

Create workflow complete. Agent debug report ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Agent debug investigation is complete. The debug report contains:
- Full root cause analysis with evidence
- Prioritized remediation recommendations
- Monitoring improvements for prevention
- Implementation timeline with ownership

Run Validate mode to verify report completeness against QG-AI1 criteria.
