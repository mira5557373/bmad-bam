# Step 20: Load Master Architecture for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER modify the document during this step - load and prepare only
- 📖 CRITICAL: Read the complete step file before taking any action
- ✅ CRITICAL: Load BOTH the document AND QG-F1 checklist
- 🔄 Parse ALL document sections for validation mapping
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 📋 Extract frontmatter state and prior validation results
- 💬 Report load status before proceeding to validation
- ⚠️ If document not found, STOP and recommend Create mode
- 🚫 DO NOT validate in this step - preparation only

---

## EXECUTION PROTOCOLS

- 🎯 Search systematically for the master architecture document
- 📖 Load QG-F1 checklist for validation criteria
- 💾 Build section-to-checklist mapping structure
- 🔍 Identify sections requiring critical vs standard validation
- ⚠️ Flag any document corruption or missing mandatory sections
- 🚫 DO NOT proceed if document or checklist fails to load

---

## YOUR TASK

Locate and load the master architecture document and QG-F1 foundation gate checklist. Parse document sections, map them to validation criteria, and prepare the validation context for step-21-v-validate.md.

---

## Load Sequence

### 1. Locate Master Architecture Document

Search in priority order:

| Priority | Location |
|----------|----------|
| 1 | `{output_folder}/planning-artifacts/master-architecture.md` |
| 2 | `{project-root}/docs/architecture/master-architecture.md` |
| 3 | `{project-root}/**/master-architecture.md` (fallback search) |

**If not found:** 
- STOP validation workflow
- Report: "Master architecture document not found. Run Create mode first."
- Suggest: `step-01-c-context.md` to create the document

### 2. Load QG-F1 Checklist

Read: `{project-root}/_bmad/bam/data/checklists/qg-f1.md`

Extract validation criteria:

| Category | Checks | Pass Threshold |
|----------|--------|----------------|
| Critical | 4 checks | ALL must pass |
| Standard | 6 checks | 80% must pass |

**Critical Checks (from QG-F1):**
- [ ] Tenant isolation model selected and documented
- [ ] Module boundaries defined
- [ ] AI runtime framework selected
- [ ] Master architecture document frozen

**Standard Checks (from QG-F1):**
- [ ] Quality attributes defined
- [ ] Cross-cutting concerns documented
- [ ] Technology stack decisions recorded
- [ ] Deployment topology specified
- [ ] Data architecture outlined
- [ ] Integration patterns selected

### 3. Parse Document Sections

Map document sections to validation criteria:

| Document Section | Maps to Checklist Item | Critical |
|------------------|------------------------|----------|
| Tenant Model | Tenant isolation model | YES |
| Module Architecture | Module boundaries defined | YES |
| AI Runtime | AI runtime framework | YES |
| Document Status | Document frozen | YES |
| Quality Attributes | Quality attributes defined | NO |
| Cross-Cutting Concerns | Cross-cutting documented | NO |
| Technology Stack | Technology decisions | NO |
| Deployment | Deployment topology | NO |
| Data Architecture | Data architecture | NO |
| Integration | Integration patterns | NO |

### 4. Prepare Validation Context

Build the validation context structure:

```yaml
validation_context:
  document:
    path: "{document_path}"
    loaded: true
    sections_found: [list]
    sections_missing: [list]
  
  checklist:
    path: "{checklist_path}"
    loaded: true
    critical_checks: 4
    standard_checks: 6
  
  mapping:
    critical_mappings: [section -> check pairs]
    standard_mappings: [section -> check pairs]
  
  ready_for_validation: true|false
```

### 5. Report Load Status

Present load summary to user:

```markdown
## Validation Load Complete

**Document:** {path}
**Checklist:** QG-F1 Foundation Gate

### Document Sections Found
- [x] Tenant Model
- [x] Module Architecture
- [x] AI Runtime
- [ ] {any missing sections}

### Validation Scope
- Critical Checks: 4 (ALL must pass)
- Standard Checks: 6 (80% = 5 must pass)

### Ready for Validation: YES/NO

Proceed to validation?
```

---

## SUCCESS METRICS

- Master architecture document located and fully loaded
- QG-F1 checklist loaded with all criteria extracted
- All document sections parsed and categorized
- Section-to-checklist mapping complete
- Critical checks identified (4 items)
- Standard checks identified (6 items)
- Missing sections flagged for validation failure
- Validation context prepared for step-21
- User presented with clear load summary

---

## NEXT STEP

After confirming load success, proceed to `step-21-v-validate.md` to execute validation against QG-F1 criteria.

- If document missing: Recommend Create mode
- If checklist missing: Report configuration error
- If both loaded: Proceed with validation
