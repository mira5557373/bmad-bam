# Step 20: Load LLM Versioning Design for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load document and validation checklists
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Load quality gate criteria for AI runtime
- 🚫 Do NOT: Perform validation checks (that's Step 21)
- 🔍 Use web search: Not applicable for validation loading
- ⚠️ Gate: QG-AI1, QG-AI2 - Load criteria only

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading LLM versioning design document
- Loading relevant quality gate checklists
- Parsing document for validation readiness
- Identifying validation scope

**OUT OF SCOPE:**
- Performing validation checks (Step 21)
- Generating validation report (Step 22)
- Making modifications to document

---

## Purpose

Load the LLM versioning design document and all relevant quality gate checklists to prepare for validation. This step gathers all artifacts needed for QG-AI1 and QG-AI2 quality gate verification.

---

## Prerequisites

- LLM versioning design document exists
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md` (Agent Runtime Gate - covers LLM versioning)
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` (AI runtime decision criteria)

---

## Inputs

- Document: `{output_folder}/planning-artifacts/ai/llm-versioning-design.md`
- Quality gate checklists
- Related artifacts for cross-reference validation

---

## YOUR TASK:

Load document and validation criteria for QG-AI1 and QG-AI2 checks.

---

## Main Sequence

### 1. Load LLM Versioning Design Document

Load the document from:

```
{output_folder}/planning-artifacts/ai/llm-versioning-design.md
```

If document does not exist, halt validation and inform user.

### 2. Parse Document Metadata

Extract document information:

| Metadata | Value | Valid |
|----------|-------|-------|
| Version | {{version}} | YES/NO |
| Date | {{date}} | YES/NO |
| Author | {{author}} | YES/NO |
| Status | {{status}} | YES/NO |

### 3. Load Quality Gate Checklists

Load all applicable quality gate checklists:

**QG-AI1: AI Runtime Configuration**

| Check Category | Checklist Path | Loaded |
|----------------|----------------|--------|
| Model registry | `checklists/qg-m3.md` | YES/NO |
| Version management | `checklists/qg-m3.md` | YES/NO |
| Fallback configuration | `checklists/ai-fallback.md` | YES/NO |

**QG-AI2: AI Operational Monitoring**

| Check Category | Checklist Path | Loaded |
|----------------|----------------|--------|
| Quality metrics | `checklists/qg-m3.md` | YES/NO |
| Cost tracking | `checklists/ai-cost.md` | YES/NO |
| Observability | `checklists/ai-observability.md` | YES/NO |

### 4. Identify Required Sections

Map document sections to quality gate checks:

| Quality Gate | Required Section | Present |
|--------------|------------------|---------|
| QG-AI1.1 | Model Inventory | YES/NO |
| QG-AI1.2 | Version Registry | YES/NO |
| QG-AI1.3 | Assignment Logic | YES/NO |
| QG-AI1.4 | Fallback Config | YES/NO |
| QG-AI2.1 | Quality Metrics | YES/NO |
| QG-AI2.2 | Cost Tracking | YES/NO |
| QG-AI2.3 | Latency Monitoring | YES/NO |
| QG-AI2.4 | Feedback Collection | YES/NO |

### 5. Load Related Artifacts for Cross-Reference

Load related documents for consistency validation:

| Artifact | Path | Loaded | Purpose |
|----------|------|--------|---------|
| Master Architecture | `architecture/master-architecture.md` | YES/NO | AI runtime alignment |
| AI Runtime Config | `ai/runtime-config.md` | YES/NO | Model compatibility |
| Tenant Tiers | `tenant/tier-definitions.md` | YES/NO | Tier consistency |

### 6. Establish Validation Scope

Define what will be validated:

**Validation Scope Summary:**

| Category | Items to Validate | Critical Checks |
|----------|-------------------|-----------------|
| Completeness | {{count}} sections | All required sections present |
| Consistency | {{count}} cross-refs | No broken references |
| Quality Gates | QG-AI1, QG-AI2 | All critical checks |
| Best Practices | {{count}} patterns | Pattern compliance |

---

## SUCCESS METRICS:

- [ ] Document loaded successfully
- [ ] All quality gate checklists loaded
- [ ] Required sections identified
- [ ] Related artifacts loaded
- [ ] Validation scope established

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Document not found | Cannot validate - run Create mode first |
| Checklist not found | Use embedded criteria |
| Related artifact missing | Note in validation report |
| Document malformed | Attempt partial validation |

---

## Verification

- [ ] Document readable and parsed
- [ ] Checklists available for all gates
- [ ] Section mapping complete
- [ ] Cross-reference artifacts loaded

---

## Outputs

- Loaded document content
- Parsed section structure
- Quality gate checklists
- Validation scope summary

---

## NEXT STEP:

Proceed to `step-21-v-validate.md` to perform validation checks against quality gate criteria.
