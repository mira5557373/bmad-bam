# Step 01: Gather Platform Requirements

## MANDATORY EXECUTION RULES

- NEVER generate architecture without understanding requirements
- Load platform patterns before proceeding
- Pause after gathering requirements for user confirmation

---

## YOUR TASK

Gather platform architecture requirements including:
- Extensibility strategy (plugins, extensions, apps)
- White-label requirements
- Marketplace needs
- Partner API scope

---

## Main Sequence

### 1. Load Platform Patterns

Read: `{project-root}/_bmad/bam/data/patterns/plugin-*.md`

### 2. Gather Requirements

| Dimension | Question |
|-----------|----------|
| Extensibility | What types of extensions? (UI, data, AI, workflow) |
| Plugin Isolation | What isolation level? (process, container, V8 isolate) |
| White-label | What customization tiers? (branding, domain, reseller) |
| Marketplace | Curated, open, or hybrid marketplace? |
| Partner API | What API tiers? (public, partner, enterprise) |

### 3. Confirm Requirements

Present summary and await user confirmation.

---

## NEXT STEP

Proceed to `step-05-c-document.md` for architecture documentation.
