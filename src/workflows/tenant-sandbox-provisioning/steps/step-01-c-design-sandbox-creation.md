# Step 1: Design Sandbox Creation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design sandbox/trial environment creation process.

---

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---

## Actions

### 1. Sandbox Types

| Type | Duration | Resources | Use Case |
|------|----------|-----------|----------|
| Trial | 14 days | Limited | New customer evaluation |
| Demo | 24 hours | Pre-configured | Sales demonstrations |
| Dev | Persistent | Full | Development testing |
| Staging | Persistent | Production-like | Pre-production testing |

### 2. Provisioning Workflow

| Step | Action | Duration |
|------|--------|----------|
| 1 | Create tenant record | < 1s |
| 2 | Provision isolated resources | < 30s |
| 3 | Apply sandbox constraints | < 5s |
| 4 | Seed sample data | < 60s |
| 5 | Configure access | < 5s |

### 3. Resource Constraints

| Resource | Trial | Demo | Dev |
|----------|-------|------|-----|
| Users | 5 | 3 | 10 |
| Storage | 1GB | 500MB | 10GB |
| API calls | 1000/day | 500/day | 10000/day |
| Agents | 2 | 1 | 5 |

### 4. Isolation Requirements

| Concern | Mitigation |
|---------|------------|
| Data isolation | Separate namespace |
| Resource isolation | Quota enforcement |
| Network isolation | Sandbox flag in context |
| Cost isolation | No billing integration |

**Verify current best practices with web search:**
Search the web: "SaaS sandbox provisioning best practices {date}"
Search the web: "trial environment isolation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to data seeding design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1]`
- Proceed to: `step-02-c-design-data-seeding.md`

---

## Verification

- [ ] Sandbox types defined
- [ ] Provisioning workflow documented
- [ ] Resource constraints specified
- [ ] Isolation requirements addressed

---

## Outputs

- Sandbox type specifications with duration and use cases
- Provisioning workflow with steps and timing
- Resource constraint matrix by sandbox type
- Isolation requirements and mitigations
- Design decisions documented in frontmatter
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-sandbox-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-fixture-template.md`

---

## Next Step

Proceed to `step-02-c-design-data-seeding.md`.
