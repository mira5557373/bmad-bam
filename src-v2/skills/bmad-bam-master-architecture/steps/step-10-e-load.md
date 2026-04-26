# Step 10: Load Existing Master Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER modify the document during this step - load only
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: Parse ALL sections of the existing document
- ✅ Verify document integrity before presenting for editing
- 📋 Extract frontmatter state and architecture decisions
- 💬 Present clear summary for user to identify changes
- ⚠️ If document not found, recommend Create mode

---

## EXECUTION PROTOCOLS

- 🎯 Search systematically for the master architecture document
- 📖 Parse frontmatter workflow state if present
- 💾 Cache document structure for step-11 modifications
- 🚫 DO NOT suggest changes in this step - load and present only
- ⚠️ Flag any document corruption or missing sections

---

## YOUR TASK

Locate, load, and parse the existing master architecture document. Extract current decisions and present a structured summary for the user to identify what needs modification.

---

## Load Sequence

### 1. Locate Document

Search in priority order:

| Priority | Location |
|----------|----------|
| 1 | `{output_folder}/planning-artifacts/master-architecture.md` |
| 2 | `{project-root}/docs/architecture/master-architecture.md` |
| 3 | `{project-root}/**/master-architecture.md` (fallback) |

**If not found:** Suggest Create mode (step-01-c-context.md) or request path.

### 2. Parse Frontmatter

Extract workflow state:

```yaml
decisions:
  tenant_model: "row-level-security"
  ai_runtime: "langgraph"
  module_count: 5
  quality_gate: "QG-F1-PASS"
```

### 3. Categorize Sections

| Section | Editable | Impact |
|---------|----------|--------|
| Project Context | Frozen | Requires re-validation |
| Tenant Model | Frozen | Requires QG-F1 re-run |
| AI Runtime | Frozen | Affects module contracts |
| Module Boundaries | Mutable | Direct edit allowed |
| Quality Patterns | Mutable | Direct edit allowed |
| Appendices | Mutable | Direct edit allowed |

### 4. Present Current State

```markdown
## Edit Mode Summary

**Document:** {path}
**Last Modified:** {date}

### Current Decisions
- Tenant Model: {tenant_model}
- AI Runtime: {ai_runtime}
- Modules: {module_count}

### Editable Areas
- Module Boundaries, Patterns, Appendices

### Protected Areas (require re-validation)
- Tenant Model, AI Runtime, Project Context

**What do you want to modify?**
```

---

## SUCCESS METRICS

- Document located and loaded
- Frontmatter state extracted
- Sections categorized (frozen vs mutable)
- Current decisions presented clearly
- User understands edit implications

---

## NEXT STEP

After user identifies modifications, proceed to `step-11-e-apply.md`.
- Frozen section changes trigger re-validation workflow
- Mutable section changes proceed directly
