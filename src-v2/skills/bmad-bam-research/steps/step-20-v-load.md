# Step 20: Load Artifact for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER modify the research report during validation - load and verify only
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Load BOTH the research report AND validation checklist
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on preparing validation context - do not validate in this step
- ✅ PARSE all sections for completeness inventory
- 📋 EXTRACT citation list for credibility verification
- 🔍 IDENTIFY methodology quality indicators
- ⚠️ FLAG missing mandatory sections before proceeding

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## YOUR TASK

Locate and load the research report and research validation checklist. Parse all document sections, extract citation inventory, assess methodology indicators, and prepare the validation context for step-21. Report load status showing section presence/completeness and confirm readiness for comprehensive validation.

---

## Purpose

Load the research report and validation checklist to prepare for comprehensive quality validation.

---

## Prerequisites

- Research report exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: technology-selection
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-rr1.md`

---

## Inputs

- Research report file path
- Validation criteria checklist
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Research Report

Load the research report artifact:
- `{output_folder}/planning-artifacts/research-report.md`

If the file does not exist, inform the user and suggest running Create mode first.

### 2. Load Validation Checklist

Load the research report validation criteria:

```markdown
## Research Report Validation Criteria

### Completeness Criteria
- [ ] Executive summary present and complete
- [ ] Research scope clearly defined
- [ ] Evaluation criteria documented with weights
- [ ] All candidates evaluated against criteria
- [ ] Integration fit analysis complete
- [ ] Primary recommendation documented
- [ ] Risk assessment present
- [ ] POC plan defined
- [ ] Migration strategy outlined

### Quality Criteria
- [ ] Recommendations supported by evidence
- [ ] Scores consistent with analysis
- [ ] Risks have mitigations defined
- [ ] POC objectives are measurable
- [ ] Migration phases are actionable
- [ ] Sources cited for key claims

### Multi-Tenant Criteria (BAM-Specific)
- [ ] Tenant isolation evaluated
- [ ] Scalability per tenant assessed
- [ ] Tenant-aware observability considered
- [ ] Per-tenant configuration capability reviewed

### Consistency Criteria
- [ ] Executive summary matches detailed findings
- [ ] Rankings align with weighted scores
- [ ] Risk summary matches risk tables
- [ ] ADR (if present) matches recommendation
```

### 3. Extract Report Summary

Parse the research report and extract:

#### 3.1 Document Status

| Field | Value |
|-------|-------|
| Report Date | {date} |
| Last Updated | {date} |
| Version | {version} |
| Research Topic | {topic} |

#### 3.2 Section Inventory

| Section | Present | Word Count | Status |
|---------|---------|------------|--------|
| Executive Summary | Yes/No | {count} | Complete/Partial/Missing |
| Research Scope | Yes/No | {count} | Complete/Partial/Missing |
| Technology Evaluation | Yes/No | {count} | Complete/Partial/Missing |
| Integration Fit | Yes/No | {count} | Complete/Partial/Missing |
| Recommendations | Yes/No | {count} | Complete/Partial/Missing |
| Risk Assessment | Yes/No | {count} | Complete/Partial/Missing |
| POC Plan | Yes/No | {count} | Complete/Partial/Missing |
| Migration Strategy | Yes/No | {count} | Complete/Partial/Missing |
| Appendices | Yes/No | {count} | Complete/Partial/Missing |

#### 3.3 Recommendation Summary

| Aspect | Value |
|--------|-------|
| Primary Recommendation | {technology} |
| Recommendation Score | {score}/5 |
| Number of Alternatives | {count} |
| Number of Rejected | {count} |

#### 3.4 Risk Summary

| Category | Total Risks | High | Medium | Low |
|----------|-------------|------|--------|-----|
| Technical | {n} | {n} | {n} | {n} |
| Operational | {n} | {n} | {n} | {n} |
| Business | {n} | {n} | {n} | {n} |

### 4. Prepare Validation Context

Compile context for validation:

| Validation Area | Data Points to Check |
|-----------------|---------------------|
| Completeness | Section inventory status |
| Quality | Evidence links, score consistency |
| Multi-Tenant | BAM-specific evaluation areas |
| Consistency | Cross-section alignment |

### 5. Confirm Validation Scope

Present validation scope to user:

**Full Validation (Recommended):**
- All completeness criteria
- All quality criteria
- All multi-tenant criteria
- All consistency criteria

**Partial Validation (Optional):**
- [ ] Completeness only
- [ ] Quality only
- [ ] Multi-tenant only
- [ ] Consistency only

---

## SUCCESS METRICS

- ✅ Research report located and fully loaded without errors
- ✅ Validation checklist loaded with all 4 category criteria extracted
- ✅ Document metadata parsed (version, date, topic, author)
- ✅ Section inventory completed (9 sections with presence/completeness status)
- ✅ Citation inventory extracted (total count, verified count, missing count)
- ✅ Recommendation summary parsed (primary, alternatives, rejected)
- ✅ Risk summary extracted (by category and severity)
- ✅ Validation context YAML structure prepared for step-21
- ✅ User presented with clear load summary
- ✅ Validation scope confirmed (full or partial)

---

## FAILURE MODES

- ❌ **Report not found:** STOP validation, report expected path, recommend Create mode, do NOT proceed to step-21
- ❌ **Checklist not found:** Report configuration error, recommend running `npm run verify-install`, do NOT proceed
- ❌ **Document corrupted:** Report parse errors, suggest Edit mode to fix structure, do NOT proceed
- ❌ **No evaluations found:** Flag as incomplete research report, allow proceed with expected FAIL outcome
- ❌ **Zero citations:** Warn that research lacks credibility verification, flag for quality validation

---

## Verification

- [ ] Research report loaded successfully
- [ ] Validation checklist loaded
- [ ] Document summary extracted
- [ ] Section inventory completed
- [ ] Validation scope confirmed
- [ ] Patterns align with pattern registry

---

## Outputs

- Document summary
- Section inventory with status
- Loaded validation checklist
- Confirmed validation scope

---

## Next Step

Proceed to `step-21-v-validate.md` with loaded artifact and validation checklist.
