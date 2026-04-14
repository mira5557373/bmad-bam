# Step 1: Classify Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define change classification framework with risk levels and approval requirements.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Change Types

| Type | Description | Examples | Frequency |
|------|-------------|----------|-----------|
| Standard | Pre-approved, low risk | Config updates, minor patches | Daily |
| Normal | Moderate risk, CAB approval | Feature releases, schema changes | Weekly |
| Emergency | Urgent, expedited approval | Security patches, critical fixes | As needed |
| Major | High risk, full CAB review | Architecture changes, migrations | Monthly |

### 2. Risk Classification

| Risk Level | Tenant Impact | Rollback Time | Approval |
|------------|---------------|---------------|----------|
| Low | No impact | < 5 min | Auto-approved |
| Medium | < 1% tenants | < 15 min | Team lead |
| High | 1-10% tenants | < 30 min | CAB |
| Critical | > 10% tenants | < 60 min | Executive + CAB |

### 3. Change Categories

| Category | Scope | Assessment Required |
|----------|-------|---------------------|
| Infrastructure | Compute, network, storage | Capacity impact |
| Database | Schema, indexes, migrations | Data integrity |
| Application | Code, config, features | Functional testing |
| Security | Access, encryption, policies | Security review |
| AI/ML | Models, prompts, pipelines | Evaluation metrics |

### 4. Tenant Impact Matrix

| Change Type | Single Tenant | Tier-Specific | All Tenants |
|-------------|---------------|---------------|-------------|
| Standard | Auto-approved | Team lead | Team lead |
| Normal | Team lead | CAB | CAB |
| Emergency | Team lead | CAB | Executive |
| Major | CAB | Executive | Board |

**Verify current best practices with web search:**
Search the web: "ITIL change management SaaS best practices {date}"
Search the web: "multi-tenant change control processes {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing change classification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change categories and risk levels
- **P (Party Mode)**: Bring DevOps and compliance perspectives for review
- **C (Continue)**: Accept change classification and proceed to tenant impact
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save change classification to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-impact.md`

---

## Verification

- [ ] Change types defined
- [ ] Risk levels established
- [ ] Categories documented
- [ ] Tenant impact matrix complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Change classification framework
- Risk level definitions
- Tenant impact matrix

---

## Next Step

Proceed to `step-02-c-tenant-impact.md` to design tenant impact assessment.
