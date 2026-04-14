# Step 2: Design Data Seeding

## Purpose

Design sample data seeding for sandbox environments.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 1 completed

**Web Research (Required):**

Search the web: "sandbox data seeding best practices {date}"
Search the web: "synthetic test data generation multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Seed Data Categories

| Category | Content | Purpose |
|----------|---------|---------|
| Users | Sample users with roles | Demo access control |
| Agents | Pre-configured agents | Demo AI capabilities |
| Conversations | Sample interactions | Demo agent behavior |
| Documents | Sample knowledge base | Demo RAG features |

### 2. Data Generation

| Approach | Use Case | Privacy |
|----------|----------|---------|
| Synthetic | All sandboxes | Safe |
| Anonymized production | Demo scenarios | Compliant |
| Customer-provided | Specific demos | NDA required |

### 3. Seed Data Refresh

| Trigger | Action |
|---------|--------|
| Sandbox creation | Full seed |
| Weekly | Reset to baseline |
| User request | On-demand reset |
| Conversion | Preserve user data, clear seed |

**Soft Gate:** Steps 1-2 complete sandbox creation and data seeding. Confirm before proceeding to cleanup.

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to cleanup design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to: `step-03-c-design-cleanup.md`

---

## Verification

- [ ] Seed data categories defined
- [ ] Data generation approach specified
- [ ] Refresh strategy documented

---

## Outputs

- Seed data category specifications with content and purpose
- Data generation approach specifications with privacy considerations
- Seed data refresh strategy and triggers
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-03-c-design-cleanup.md`.
