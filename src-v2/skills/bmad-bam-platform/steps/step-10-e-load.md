# Step 10: Load Existing Platform Architecture

## MANDATORY EXECUTION RULES

- NEVER modify the architecture during this step - load only
- Load platform patterns before proceeding
- Pause after presenting findings and await user direction

---

## YOUR TASK

Locate, load, and parse the existing platform architecture document. Extract current settings and present a structured summary for the user to identify what needs modification.

---

## Load Sequence

### 1. Locate Document

Search in priority order:

| Priority | Location |
|----------|----------|
| 1 | `{output_folder}/planning-artifacts/platform-architecture.md` |
| 2 | `{project-root}/docs/architecture/platform-architecture.md` |
| 3 | `{project-root}/**/platform-architecture.md` (fallback) |

**If not found:** Suggest Create mode (step-01-c-start.md) or request path.

### 2. Parse Architecture

Extract current settings:

```yaml
platform_config:
  extensibility_model: [plugins|extensions|apps]
  plugin_isolation: [process|container|v8-isolate]
  white_label_tiers: [list]
  marketplace_type: [curated|open|hybrid]
  partner_api_tiers: [list]
```

### 3. Present Edit Menu

Display architecture summary:

```
================================================================================
PLATFORM ARCHITECTURE - EDIT MODE
================================================================================
Document: platform-architecture.md
Version: {version}
================================================================================

CURRENT CONFIGURATION:
- Extensibility Model: {model}
- Plugin Isolation: {isolation}
- White-label Tiers: {tiers}
- Marketplace Type: {marketplace}
- Partner API Tiers: {api_tiers}

EDITABLE SECTIONS:
[1] Platform Strategy - Modify extensibility approach
[2] Plugin Architecture - Update plugin system
[3] White-Label Configuration - Change customization tiers
[4] API Marketplace - Modify marketplace structure
[5] Partner API - Update API tiers
[6] Extensibility Points - Modify extension hooks
[7] Governance - Update review process

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- Platform architecture document located
- Current settings extracted and displayed
- Edit menu presented
- User has selected section(s) to edit

---

## NEXT STEP

After user identifies modifications, proceed to `step-11-e-apply.md`.
