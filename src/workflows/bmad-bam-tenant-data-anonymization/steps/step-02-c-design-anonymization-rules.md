# Step 2: Design Anonymization Rules

## Purpose

Define anonymization techniques for each data type.

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

Search the web: "data anonymization techniques best practices {date}"
Search the web: "PII anonymization multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Anonymization Techniques

| Technique | Description | Use Case |
|-----------|-------------|----------|
| Pseudonymization | Replace with consistent token | Cross-reference needed |
| Generalization | Reduce precision | Location, age |
| Suppression | Remove entirely | Rare values |
| Perturbation | Add noise | Numeric values |
| Tokenization | Replace with random token | Identifiers |
| Hashing | One-way transformation | Matching only |

### 2. Per-Field Rules

| Field | Technique | Output Format |
|-------|-----------|---------------|
| Email | Pseudonymization | user_xxxxx@anon.local |
| Name | Suppression | NULL or "User" |
| Phone | Generalization | First 6 digits only |
| IP | Generalization | Mask last octet |
| DOB | Generalization | Year only |
| Address | Generalization | City/region only |

### 3. K-Anonymity Requirements

| Data Set | K Value | Quasi-Identifiers |
|----------|---------|-------------------|
| User analytics | k=5 | Age, location, role |
| Usage metrics | k=10 | Tenant, feature |
| Support tickets | k=3 | Category, severity |

**Soft Gate:** Steps 1-2 complete classification and rules. Confirm before proceeding to verification.

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to verification design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to: `step-03-c-design-verification.md`

---

## Verification

- [ ] Anonymization techniques defined
- [ ] Per-field rules documented
- [ ] K-anonymity requirements specified

---

## Outputs

- Anonymization technique specifications with use cases
- Per-field anonymization rules with output formats
- K-anonymity requirements by data set
- Design decisions documented in frontmatter
- **Load template:** `{project-root}/_bmad/bam/data/templates/anonymization-spec-template.md`

---

## Next Step

Proceed to `step-03-c-design-verification.md`.
