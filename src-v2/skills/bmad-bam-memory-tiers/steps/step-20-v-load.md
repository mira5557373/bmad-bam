# Step 20: Load Memory Tier Design for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load memory tier design and validation checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Load QG-M3 checklist and design document
- 🚫 Do NOT: Run validation checks (that's Step 21)
- 🔍 Use web search: Not required (loading step)
- ⚠️ Note: Validation against QG-M3 (Agent Runtime) quality gate

---

## Purpose

Load the memory tier design document and QG-M3 validation checklist in preparation for validation. Establish validation scope and criteria.

---

## Prerequisites

- Memory tier design document exists
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: QG-M3

---

## Actions

### 1. Load Memory Tier Design Document

Load the document to validate:

```
{output_folder}/planning-artifacts/ai/memory-tiers-design.md
```

If document does not exist, inform user and exit validation mode.

### 2. Load QG-M3 Validation Checklist

Load the Agent Runtime quality gate checklist:

```
{project-root}/_bmad/bam/data/checklists/qg-m3.md
```

### 3. Parse Document for Validation

Identify sections present in the document:

| Required Section | Present | Notes |
|------------------|---------|-------|
| Executive Summary | YES/NO | |
| Memory Tier Inventory | YES/NO | |
| Session Memory Design | YES/NO | |
| Conversation Memory Design | YES/NO | |
| Tenant Memory Design | YES/NO | |
| Global Memory Design | YES/NO | |
| Vector Store Architecture | YES/NO | |
| Context Window Management | YES/NO | |
| TTL and Eviction Policies | YES/NO | |
| Memory Isolation | YES/NO | |
| Audit Logging | YES/NO | |
| Data Export (GDPR) | YES/NO | |
| Tenant Deletion | YES/NO | |
| Compliance Mapping | YES/NO | |
| Implementation Roadmap | YES/NO | |

### 4. Identify Validation Criteria

Extract validation criteria from QG-M3:

**Memory Tier Requirements:**

| Criterion | Description | Critical |
|-----------|-------------|----------|
| MT-01 | All memory tiers defined | YES |
| MT-02 | Storage technology selected | YES |
| MT-03 | TTL policies specified | NO |
| MT-04 | Eviction strategies defined | NO |
| MT-05 | Context window managed | YES |

**Isolation Requirements:**

| Criterion | Description | Critical |
|-----------|-------------|----------|
| ISO-01 | Tenant isolation for all tiers | **CRITICAL** |
| ISO-02 | Vector store namespace isolation | **CRITICAL** |
| ISO-03 | Retrieval includes tenant filter | **CRITICAL** |
| ISO-04 | Cross-tenant verification designed | **CRITICAL** |

**Compliance Requirements:**

| Criterion | Description | Critical |
|-----------|-------------|----------|
| COMP-01 | Audit logging designed | YES |
| COMP-02 | Data export capability | YES |
| COMP-03 | Tenant deletion process | YES |
| COMP-04 | GDPR mapping complete | NO |

### 5. Establish Validation Scope

Confirm validation scope with user:

| Validation Type | Include |
|-----------------|---------|
| Completeness Check | YES |
| Critical Requirements | YES |
| Isolation Verification | YES |
| Compliance Check | YES |
| Implementation Feasibility | OPTIONAL |
| Performance Assessment | OPTIONAL |

---

## COLLABORATION MENUS (A/P/C):

After loading documents and establishing scope, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation criteria
- **P (Party Mode)**: Bring perspectives on validation priorities
- **C (Continue)**: Proceed to run validation checks

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: document summary, validation criteria
- Process enhanced insights on validation approach
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Prepare to validate memory tier design against QG-M3"
- Present synthesized recommendations on validation priorities
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm validation scope
- Proceed to: `step-21-v-validate.md`

---

## Verification

- [ ] Memory tier design document loaded
- [ ] QG-M3 checklist loaded
- [ ] Document sections identified
- [ ] Validation criteria extracted
- [ ] Validation scope established

---

## Outputs

- Document section inventory
- Validation criteria list
- Validation scope confirmation

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
