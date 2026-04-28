# Step 10: Load Existing Billing Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing billing-design.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse metering infrastructure, subscription tiers, and payment integrations
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all tier definitions, pricing models, and revenue recognition rules
- 📋 PRESENT a structured summary of current billing design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY billing validation status from frontmatter to understand compliance state
- ⚠️ FLAG any tiers marked as "TODO" or missing pricing configurations

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing billing design for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Extract metering events, subscription tiers, invoicing rules, payment provider config
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate billing compliance status
- 🔍 Use web search: Only if user requests updated SaaS billing best practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## YOUR TASK

Load the existing billing design document, parse its metering infrastructure and subscription management structure, extract the current tier definitions and payment integrations, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

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

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
BILLING DESIGN - EDIT MODE
================================================================================
Document: billing-design.md
Version: {version}
Billing Validation Status: {status}
================================================================================

CURRENT SUBSCRIPTION TIERS:
1. Free:        ${price}/mo - {features_count} features - {status}
2. Pro:         ${price}/mo - {features_count} features - {status}
3. Enterprise:  ${price}/mo - {features_count} features - {status}

METERING: {event_count} billable events defined
PAYMENT PROVIDER: {provider} - {integration_status}
REVENUE RECOGNITION: {asc606_status}

EDITABLE SECTIONS:
[1] Subscription Tiers - Modify tier pricing and limits
[2] Feature Flags - Update tier-specific feature toggles
[3] Metering Events - Change billable usage metrics
[4] Payment Integration - Update provider configuration
[5] Invoicing Rules - Modify invoice generation and dunning
[6] Tax Configuration - Update tax jurisdictions and rates
[7] Revenue Recognition - Modify ASC 606/IFRS 15 compliance
[8] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ All subscription tiers parsed with pricing
- ✅ Metering event schema documented
- ✅ Payment provider integration status extracted
- ✅ Revenue recognition compliance state identified
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Missing tier pricing:** Flag tiers needing configuration before edit
- ❌ **Billing validation failed:** Warn that edits require full re-validation
- ❌ **Incomplete metering schema:** Flag events needing completion before edit

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
