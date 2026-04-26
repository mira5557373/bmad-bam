# Step 02: Select Tenant Model

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER select a model without reviewing requirements from Step 01
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Match requirements to decision criteria before recommending
- 📋 Document selection rationale with trade-offs explicitly stated
- 💬 Present recommendation with A/P/C menu for user confirmation
- 🌐 Use web search to verify current isolation pattern best practices

---

## EXECUTION PROTOCOLS

- 🎯 Present a single recommended model with clear rationale
- 💾 Record selection and rationale in output document frontmatter
- 📖 Reference `domains/tenant.md` for decision matrix
- 📖 Reference `tenant-models.csv` for detailed selection criteria
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag when requirements suggest multiple viable models
- 🔍 Use web search to verify isolation patterns for selected model

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Gathered requirements from Step 01 (project, tenant, AI, technical)
- **Domain file:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- **Pattern registry:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Output:** Selected tenant model with rationale for master architecture document
- **Quality gate:** Selection informs QG-F1 (Foundation Gate) checklist

---

## YOUR TASK

Analyze the tenant requirements gathered in Step 01 against the decision matrix and pattern registry. Recommend the optimal tenant isolation model with clear rationale and trade-offs. Present recommendation via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Load Decision Context

Read the tenant decision resources:

| Resource | Location | Purpose |
|----------|----------|---------|
| Domain context | `{project-root}/_bmad/bam/data/domains/tenant.md` | Decision matrix, isolation dimensions |
| Pattern registry | `{project-root}/_bmad/bam/data/tenant-models.csv` | Detailed criteria, compliance fit, web queries |

**Action:** Confirm resources loaded before evaluating.

---

### 2. Extract Key Requirements from Step 01

Pull the critical decision factors from gathered context:

| Factor | Value from Step 01 | Weight |
|--------|-------------------|--------|
| Tenant Count (Launch) | `{tenant.count_launch}` | High |
| Tenant Count (Year 3) | `{tenant.count_year3}` | High |
| Compliance Requirements | `{tenant.compliance}` | Critical |
| Data Sensitivity | `{tenant.data_sensitivity}` | High |
| Tier Mix | `{tenant.tier_mix}` | Medium |
| Customization Level | `{tenant.customization_level}` | Medium |
| Geographic Distribution | `{tenant.geographic}` | Medium |
| Team Experience | `{technical.team_experience}` | Medium |
| Database | `{technical.database}` | High |

**Present extracted factors to confirm correct context loaded.**

---

### 3. Apply Decision Matrix

Use the decision matrix from `domains/tenant.md`:

| Tenants | Compliance | Tier | Recommendation |
|---------|------------|------|----------------|
| <1000 | Low | All | Row-Level Security (RLS) |
| <1000 | High | Pro/Enterprise | Schema-per-Tenant |
| Any | PCI/HIPAA | Enterprise | Database-per-Tenant |
| >10000 | Low | All | RLS + Sharding |

**Match gathered requirements to matrix rows:**

```
IF tenant_count < 1000 AND compliance IN [SOC2, GDPR, basic]:
  → Row-Level Security (RLS)
  
IF tenant_count < 1000 AND compliance IN [HIPAA, PCI-DSS, SOX]:
  → Schema-per-Tenant
  
IF compliance IN [FedRAMP, HIPAA, PCI-DSS] AND tier == Enterprise:
  → Database-per-Tenant
  
IF tenant_count > 10000:
  → RLS + Sharding (hybrid approach)
```

---

### 4. Evaluate Model Fit Against CSV Criteria

Cross-reference with `tenant-models.csv` for detailed evaluation:

| Model | Signals | Complexity | Storage | Isolation |
|-------|---------|------------|---------|-----------|
| row-level-security | shared tables, cost-sensitive, <1000 tenants | Low | 1x | Logical |
| schema-per-tenant | regulatory, customization needs, 100-1000 tenants | Medium | 2-3x | Schema |
| database-per-tenant | maximum isolation, enterprise tier, <100 tenants | High | 10-20x | Physical |
| hybrid | mixed tiers, enterprise+self-serve | Variable | Variable | Variable |

**Evaluate each viable model:**

```markdown
### Model Evaluation: {model_name}

**Signals Match:**
- [ ] {signal_1}: {match/mismatch}
- [ ] {signal_2}: {match/mismatch}

**Compliance Fit:** {compliance_fit} → {match/gap}

**Complexity Assessment:** 
- Model complexity: {low/medium/high}
- Team experience: {technical.team_experience}
- Fit: {appropriate/stretch/risky}

**Trade-offs:**
- Pro: {advantage}
- Con: {disadvantage}
```

---

### 5. Verify Current Best Practices

Search for current isolation pattern guidance:

Search the web: "PostgreSQL RLS multi-tenant best practices {date}"
Search the web: "{selected_model} isolation patterns SaaS {date}"
Search the web: "multi-tenant compliance {compliance_requirements} {date}"

_Source: [URL]_

**Incorporate findings into recommendation rationale.**

---

### 6. Formulate Recommendation

Synthesize analysis into a clear recommendation:

```markdown
## Tenant Model Recommendation

### Selected Model: {MODEL_NAME}

**Primary Rationale:**
Based on the gathered requirements:
- Tenant count: {tenant.count_launch} launch → {tenant.count_year3} Year 3
- Compliance: {tenant.compliance}
- Data sensitivity: {tenant.data_sensitivity}

This aligns with the {model_name} model because:
1. {Reason 1 - tied to specific requirement}
2. {Reason 2 - tied to specific requirement}
3. {Reason 3 - compliance/scale/cost fit}

**Trade-offs Accepted:**
| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| {trade_off_1} | {impact_1} | {mitigation_1} |
| {trade_off_2} | {impact_2} | {mitigation_2} |

**Implementation Complexity:**
- Complexity level: {low/medium/high}
- Team fit: {appropriate/stretch} for {team_experience} experience
- Migration path: {migration_complexity} from {current_state}

**Rejected Alternatives:**
| Model | Why Rejected |
|-------|--------------|
| {alt_model_1} | {rejection_reason_1} |
| {alt_model_2} | {rejection_reason_2} |
```

---

### 7. Present for Confirmation

Display the recommendation and await user decision via A/P/C menu.

---

## COLLABORATION MENUS (A/P/C):

After presenting recommendation:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation requirements
- **P (Party Mode)**: Bring analyst, security, and compliance perspectives
- **C (Continue)**: Accept model and proceed to next step

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Isolation depth:** What level of physical vs logical separation is truly needed?
- **Compliance nuances:** Are there specific clauses requiring physical separation?
- **Future scaling:** How might tenant mix change over time?
- **Cost sensitivity:** What are the infrastructure budget constraints?
- **Migration concerns:** Will tenants need to upgrade isolation tiers?

Pass context: gathered requirements, current model considered, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review tenant model selection: {model_name} for {tenant_count} tenants
with compliance requirements: {compliance_list}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Analyst | Requirements fit | Does model match stated needs? |
| Security | Isolation adequacy | Does isolation level match data sensitivity? |
| Compliance | Regulatory fit | Does model satisfy compliance requirements? |
| DevOps | Operational complexity | Can team operate this model effectively? |

Process multi-perspective analysis and synthesize into refined recommendation.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the decision in output document:

```yaml
# Add to master-architecture.md frontmatter
tenant_model:
  selected: {model_name}
  rationale: {primary_rationale}
  trade_offs: {accepted_trade_offs}
  compliance_fit: {compliance_assessment}
  decided_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-context
  - step-02-c-model  # Add this
currentStep: step-03-c-boundaries
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Decision matrix applied to gathered requirements
- ✅ Pattern registry consulted for detailed criteria
- ✅ Web search performed for current best practices
- ✅ Single model recommended with clear rationale
- ✅ Trade-offs explicitly documented and accepted
- ✅ Rejected alternatives documented with reasons
- ✅ User confirmed selection via A/P/C menu
- ✅ Decision recorded in output document frontmatter

---

## FAILURE MODES

- ❌ Selecting model without referencing Step 01 context - decision not grounded in requirements
- ❌ Recommending multiple models without clear preference - creates decision paralysis
- ❌ Missing compliance evaluation - may select model that fails compliance audits
- ❌ Ignoring team experience - may select model team cannot implement
- ❌ Not presenting trade-offs - user cannot make informed decision
- ❌ Proceeding without A/P/C confirmation - user not engaged in decision
- ❌ Skipping web search - may miss current isolation best practices

---

## NEXT STEP

After user confirms tenant model selection with 'C':

1. Record the selected model and rationale in master architecture document
2. Proceed to `step-03-c-boundaries.md` to design module boundaries
3. The selected tenant model informs:
   - Module boundary design (isolation-aware boundaries)
   - Cross-cutting concerns (tenant context propagation)
   - Quality gate QG-F1 checklist (tenant isolation criteria)

**Transition to Step 03 with:**
- Selected tenant model: `{model_name}`
- Isolation requirements: `{isolation_strength}`
- Compliance constraints: `{compliance_fit}`
