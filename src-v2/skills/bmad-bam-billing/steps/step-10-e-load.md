# Step 10: Load Existing Billing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing billing design artifact and understand current state
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Parse all sections of existing billing design
- 🚫 Do NOT: Make any changes yet - only load and analyze
- 🔍 Use web search: Not required for Edit mode loading

---

## Purpose

Load the existing billing design artifact for editing. Parse all sections to understand the current state before applying requested changes.

## Prerequisites

- Billing design artifact exists at `{output_folder}/planning-artifacts/billing-design.md`
- User has identified specific changes to make

## Actions

### 1. Load Existing Artifact

Read the billing design document:
```
{output_folder}/planning-artifacts/billing-design.md
```

### 2. Parse Document Sections

Identify and catalog existing sections:

| Section | Status | Content Summary |
|---------|--------|-----------------|
| Overview | [Present/Missing] | [Summary] |
| Metering Infrastructure | [Present/Missing] | [Summary] |
| Subscription Management | [Present/Missing] | [Summary] |
| Invoicing and Payments | [Present/Missing] | [Summary] |
| Compliance and Reporting | [Present/Missing] | [Summary] |
| Quality Gate Checklist | [Present/Missing] | [Summary] |

### 3. Identify Change Context

Understand the requested changes:

**Change Request Categories:**
| Category | Examples |
|----------|----------|
| **Tier Changes** | Add/remove tier, change pricing, modify limits |
| **Feature Changes** | Add/remove feature flags, update tier features |
| **Integration Changes** | Change payment provider, add tax integration |
| **Compliance Changes** | Add tax jurisdiction, update retention policy |
| **Metric Changes** | Add/modify billing metrics, update reports |

### 4. Document Current State Summary

Present findings to user:

```markdown
## Current Billing Design State

**Artifact Location:** {output_folder}/planning-artifacts/billing-design.md
**Last Modified:** [date if available]

### Sections Present:
- [x] Overview
- [x] Metering Infrastructure
- [ ] Subscription Management (partial)
- [x] Invoicing and Payments
- [ ] Compliance (missing)

### Identified Issues:
1. [Issue 1]
2. [Issue 2]

### Ready for Edit:
Awaiting specific change instructions.
```

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] All sections identified and cataloged
- [ ] Current state summary presented
- [ ] Ready to receive change instructions

## Outputs

- Parsed billing design content (in working memory)
- Section inventory table
- Current state summary

## Next Step

Proceed to `step-11-e-apply.md` to apply requested changes.

---

**Navigation:** Enter 'C' to continue to apply changes
