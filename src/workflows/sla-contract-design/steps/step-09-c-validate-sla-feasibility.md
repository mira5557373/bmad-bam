# Step 9: Validate SLA Feasibility

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Verify that all proposed SLAs are achievable with current infrastructure, team capacity, and budget constraints, identifying gaps and proposing mitigations.

---

## Prerequisites

- Steps 1-8 completed
- All SLA components documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `capacity-planning`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SLA1`

---

## Inputs

- Complete SLA design from Steps 1-8
- Infrastructure architecture documentation
- Current performance metrics (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/quality-gates.csv`

---

## Actions

### 1. Validate Infrastructure Capacity

Assess infrastructure against SLA requirements:

| SLA Requirement | Infrastructure Check | Status | Gap |
|-----------------|---------------------|--------|-----|
| 99.99% availability | Multi-AZ deployment | [ ] | |
| 99.99% availability | Auto-failover configured | [ ] | |
| 99.99% availability | No single points of failure | [ ] | |
| <100ms TTFT | Edge compute presence | [ ] | |
| <100ms TTFT | LLM provider latency | [ ] | |
| 1000 req/min | Auto-scaling configured | [ ] | |
| 1000 req/min | Queue capacity sufficient | [ ] | |

### 2. Validate LLM Provider Dependencies

Assess AI provider capabilities against commitments:

| Provider | Their SLA | Our Commitment | Feasible | Mitigation |
|----------|-----------|----------------|----------|------------|
| Primary LLM | 99.9% | 99.95% | Requires fallback | Multi-provider |
| Secondary LLM | 99.9% | Fallback | Yes | N/A |
| Embedding Model | 99.9% | 99.9% | Yes | Caching |
| Vector DB | 99.95% | 99.95% | Yes | Replication |

### 3. Validate Team Capacity

Assess support and engineering capacity:

| Support Commitment | Required Capacity | Current Capacity | Gap |
|--------------------|-------------------|------------------|-----|
| 15-min P1 response | 24/7 on-call | [ ] Available | |
| 1-hr P2 response | Extended coverage | [ ] Available | |
| 24/7 Enterprise support | Follow-the-sun team | [ ] Available | |
| TAM for Premium | Dedicated TAMs | [ ] Available | |

### 4. Validate Financial Exposure

Calculate maximum credit exposure:

| Scenario | Credit Exposure | Risk Assessment |
|----------|-----------------|-----------------|
| Single P1 incident (4 hours) | X% of MRR | Acceptable |
| Extended outage (24 hours) | Y% of MRR | Material risk |
| Latency breach (month-long) | Z% of MRR | Manageable |
| Multiple concurrent issues | Max 100% of month | Capped |
| Worst case (all Enterprise) | $XX,XXX | Reserve required |

### 5. Validate Monitoring Readiness

Confirm monitoring capabilities exist:

| Monitoring Requirement | Implementation Status | Gap |
|------------------------|----------------------|-----|
| Synthetic monitoring | [ ] Deployed | |
| Per-tenant metrics | [ ] Tagged | |
| Real-time dashboards | [ ] Built | |
| Automated alerting | [ ] Configured | |
| Error budget tracking | [ ] Implemented | |
| SLA breach detection | [ ] Automated | |

### 6. Identify Feasibility Gaps

Document any gaps between commitments and capabilities:

| Gap ID | SLA Component | Gap Description | Severity | Mitigation |
|--------|---------------|-----------------|----------|------------|
| GAP-1 | | | | |
| GAP-2 | | | | |
| GAP-3 | | | | |

### 7. Create Remediation Plan

For each gap, define remediation:

| Gap ID | Remediation Action | Owner | Timeline | Cost |
|--------|-------------------|-------|----------|------|
| GAP-1 | | | | |
| GAP-2 | | | | |
| GAP-3 | | | | |

### 8. Conduct Risk Assessment

Assess overall SLA program risk:

| Risk Category | Risk | Likelihood | Impact | Mitigation |
|---------------|------|------------|--------|------------|
| Infrastructure | Provider outage | Medium | High | Multi-provider |
| Financial | High credit payout | Low | Medium | Cap at 100% |
| Operational | On-call burnout | Medium | Medium | Team rotation |
| Legal | SLA dispute | Low | High | Clear language |
| Competitive | Undercommit | Medium | Low | Tier appropriately |

### 9. Obtain Stakeholder Sign-off

Document required approvals:

| Stakeholder | Area of Approval | Status |
|-------------|------------------|--------|
| Engineering Lead | Technical feasibility | [ ] Approved |
| Operations Lead | Support capacity | [ ] Approved |
| Finance | Credit exposure | [ ] Approved |
| Legal | Liability terms | [ ] Approved |
| Product | Competitive positioning | [ ] Approved |
| Executive | Overall commitment | [ ] Approved |

**Verify current best practices with web search:**
Search the web: "SLA feasibility validation process {date}"
Search the web: "SLA risk assessment methodology {date}"
Search the web: "multi-tenant SLA capacity planning {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the feasibility validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific gaps and mitigation strategies
- **P (Party Mode)**: Bring engineering and finance perspectives for feasibility review
- **C (Continue)**: Accept feasibility validation and proceed to contract finalization
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: gaps identified, risk assessment, remediation plan
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into feasibility validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SLA feasibility: {summary of gaps, risks, remediations}"
- Process collaborative analysis from engineering and finance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save feasibility validation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Proceed to next step: `step-10-c-finalize-contract-templates.md`

---

## Verification

- [ ] Infrastructure capacity validated
- [ ] Provider dependencies assessed
- [ ] Team capacity confirmed
- [ ] Financial exposure calculated
- [ ] Monitoring readiness verified
- [ ] All gaps identified
- [ ] Remediation plans documented
- [ ] Risk assessment completed
- [ ] Stakeholder sign-offs obtained
- [ ] Patterns align with pattern registry

---

## Outputs

- Feasibility assessment report
- Gap analysis with remediations
- Risk assessment matrix
- Stakeholder approval record

---

## Next Step

Proceed to `step-10-c-finalize-contract-templates.md` to create final SLA contract templates.
