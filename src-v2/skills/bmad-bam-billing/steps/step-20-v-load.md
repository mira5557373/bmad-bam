# Step 20: Load Billing Design for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load billing design artifact and validation checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Prepare for systematic validation against criteria
- 🚫 Do NOT: Begin validation yet - only load required materials
- 🔍 Use web search: Not required for validation loading

---

## Purpose

Load the billing design artifact and validation checklist to prepare for systematic validation against multi-tenant billing best practices and quality gate criteria.

## Prerequisites

- Billing design artifact exists at `{output_folder}/planning-artifacts/billing-design.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/billing-validation.md` (or equivalent)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `billing-*`

## Actions

### 1. Load Billing Design Artifact

Read the billing design document:
```
{output_folder}/planning-artifacts/billing-design.md
```

**Parse and index all sections:**
- Overview and pricing model
- Metering infrastructure
- Subscription management
- Invoicing and payments
- Compliance and reporting
- Quality gate checklist (if embedded)

### 2. Load Validation Criteria

Load the billing design validation checklist:

**Multi-Tenant Billing Validation Criteria:**

| Category | Criteria | Weight |
|----------|----------|--------|
| **Tenant Isolation** | All billing data tenant-scoped | CRITICAL |
| **Metering** | Events include tenant_id | CRITICAL |
| **Subscriptions** | Tier configs per-tenant | CRITICAL |
| **Invoicing** | Invoices tenant-isolated | CRITICAL |
| **Pricing** | All tiers defined with pricing | Required |
| **Feature Flags** | Flags aligned to tiers | Required |
| **Payment Integration** | Provider documented | Required |
| **Dunning** | Failed payment workflow defined | Required |
| **Compliance** | Tax handling addressed | Required |
| **Analytics** | Revenue metrics defined | Recommended |

### 3. Identify Validation Scope

Determine what to validate:

| Scope | Description | Applicable |
|-------|-------------|------------|
| **Full Validation** | All sections against all criteria | [Yes/No] |
| **Section Validation** | Specific section only | [Section name] |
| **Criteria Validation** | Specific criteria category | [Category] |
| **Post-Edit Validation** | Changed sections only | [List changes] |

### 4. Prepare Validation Context

Document validation setup:

```markdown
## Validation Context

**Artifact:** {output_folder}/planning-artifacts/billing-design.md
**Checklist:** Multi-tenant billing validation criteria
**Scope:** [Full | Section | Criteria | Post-Edit]

### Sections to Validate:
- [ ] Overview
- [ ] Metering Infrastructure
- [ ] Subscription Management
- [ ] Invoicing and Payments
- [ ] Compliance and Reporting

### Criteria Categories:
- [ ] Tenant Isolation (CRITICAL)
- [ ] Data Integrity (CRITICAL)
- [ ] Feature Completeness (Required)
- [ ] Compliance (Required)
- [ ] Best Practices (Recommended)

**Ready for validation.**
```

---

## Verification

- [ ] Billing design artifact loaded
- [ ] All sections parsed and indexed
- [ ] Validation checklist loaded
- [ ] Validation scope determined
- [ ] Validation context documented
- [ ] Ready to proceed with validation

## Outputs

- Parsed billing design (in working memory)
- Validation criteria loaded
- Validation scope defined
- Validation context summary

## Next Step

Proceed to `step-21-v-validate.md` to perform systematic validation.

---

**Navigation:** Enter 'C' to continue to validation
