# Step 10: Load Existing White-Labeling Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER proceed without locating the existing white-labeling-design.md file
- 📖 ALWAYS read the complete document including tier matrix and implementation architecture
- 🔄 ALWAYS parse the full customization configuration for current state
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all tier-specific customization settings
- 📋 PRESENT a structured summary of current design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY any tier configurations that may be affected by changes

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing white-labeling design for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract branding, domain, feature customization, and tier matrix
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Tier changes may affect multiple tenant configurations
- 🔍 Use web search: Only if user requests updated customization patterns

---

## Purpose

Load and review existing white-labeling design documents to identify sections requiring modification based on new branding requirements, tier changes, or customization enhancements.

---

## YOUR TASK

Load the existing white-labeling design document, parse its structure, extract the current customization configuration across all tiers, and present a summary showing what can be edited. Enable the user to select specific sections for modification based on new requirements.

---

## Prerequisites

- Existing white-labeling design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/customization.md`

---

## Actions

### 1. Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/white-labeling-design.md
```

If not found, check alternate locations:
- `{output_folder}/white-labeling-design.md`
- `{project-root}/docs/architecture/white-labeling-design.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing white-labeling design found
================================================================================
Expected location: {output_folder}/planning-artifacts/white-labeling-design.md

Options:
[C] Switch to Create mode to generate new design
[P] Specify alternate path to existing document
================================================================================
```

### 2. Parse Frontmatter and Metadata

**Extract document metadata:**

| Metadata | Value |
|----------|-------|
| Document Version | |
| Last Modified | |
| Tiers Configured | |
| OEM Support | {enabled/disabled} |
| Custom Domain | {enabled/disabled} |
| Completeness | |

### 3. Parse Customization Layers

**Extract branding customization state:**

| Branding Component | Status | Configuration |
|--------------------|--------|---------------|
| Logo System | {configured/missing} | {summary} |
| Color Scheme | {configured/missing} | {variable count} |
| CSS Injection | {enabled/disabled} | {scope} |
| Email Templates | {configured/missing} | {template count} |
| Document Watermarks | {configured/missing} | {document types} |

**Extract domain customization state:**

| Domain Component | Status | Configuration |
|------------------|--------|---------------|
| Custom Domain Mapping | {configured/missing} | {strategy} |
| SSL Provisioning | {configured/missing} | {provider} |
| DNS Guidance | {present/missing} | {completeness} |
| Subdomain Allocation | {configured/missing} | {strategy} |

**Extract feature customization state:**

| Feature Component | Status | Configuration |
|-------------------|--------|---------------|
| Feature Flags | {configured/missing} | {flag count} |
| UI Visibility | {configured/missing} | {component count} |
| Menu Customization | {configured/missing} | {scope} |
| Role Naming | {configured/missing} | {custom roles} |
| Terminology | {configured/missing} | {term count} |

### 4. Display Current Tier Matrix

**Full tier feature matrix:**

| Feature | Free | Pro | Enterprise | OEM |
|---------|------|-----|------------|-----|
| Logo upload | {value} | {value} | {value} | {value} |
| Color theme | {value} | {value} | {value} | {value} |
| CSS injection | {value} | {value} | {value} | {value} |
| Custom domain | {value} | {value} | {value} | {value} |
| Email branding | {value} | {value} | {value} | {value} |
| Feature toggles | {value} | {value} | {value} | {value} |
| UI customization | {value} | {value} | {value} | {value} |
| White-label billing | {value} | {value} | {value} | {value} |
| Remove platform branding | {value} | {value} | {value} | {value} |

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
WHITE-LABELING DESIGN - EDIT MODE
================================================================================
Document: white-labeling-design.md
Version: {version}
Tiers: Free | Pro | Enterprise | OEM
OEM Support: {enabled/disabled}
================================================================================

CUSTOMIZATION LAYERS:
1. Branding:    {component_count} components - {status}
2. Domain:      {component_count} components - {status}
3. Features:    {component_count} components - {status}
4. Tier Matrix: {tier_count} tiers configured

EDITABLE SECTIONS:
[1] Branding Customization - Logo, colors, CSS, email templates
[2] Domain Customization - Custom domains, SSL, DNS
[3] Feature Customization - Feature flags, UI visibility, terminology
[4] Tier Matrix - Modify feature availability per tier
[5] Implementation Architecture - Update technical approach
[6] Full Document - Major restructure (e.g., adding new tier)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ All three customization layers parsed
- ✅ Tier matrix extracted completely
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete tier matrix:** Flag tiers needing configuration before edit
- ❌ **Missing OEM section:** Warn if OEM-specific edits requested without OEM config

---

## Verification

- [ ] Existing document loaded successfully
- [ ] Document structure understood
- [ ] Branding customization layer parsed
- [ ] Domain customization layer parsed
- [ ] Feature customization layer parsed
- [ ] Current tier matrix captured
- [ ] Sections for modification identified
- [ ] User confirmed modification targets

---

## Outputs

- Document structure summary
- Customization layer status by category
- Full tier matrix
- Modification target list

---

## Next Step

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed tier matrix
- Customization layer status
