# Step 3: Design Deletion Execution

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design deletion execution procedures including deletion methods, cascading requirements, exception handling, and verification procedures.

## Prerequisites

- Data discovery designed (Step 2 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Define Deletion Methods

| Data Type | Deletion Method | Verification | Reversible |
|-----------|-----------------|--------------|------------|
| Account records | Hard delete | Query returns null | No |
| Activity logs | Anonymization | PII removed | No |
| ML training data | Model retrain flag | Exclusion verified | No |
| Search index | Index removal | Search returns nothing | No |
| Object storage | File deletion | 404 response | No |

### 2. Design Cascading Deletion

| Primary Entity | Dependent Entities | Deletion Order | Constraints |
|----------------|-------------------|----------------|-------------|
| User account | Sessions, preferences, tokens | Children first | FK constraints |
| User content | Comments, uploads, reactions | Soft delete option | Content policy |
| Transactions | Audit logs (exempt) | Selective | Retention rules |

### 3. Define Exception Handling

| Exception Type | GDPR Basis | Action | Documentation |
|----------------|------------|--------|---------------|
| Legal hold | Art. 17(3)(e) | Retain | Legal order ref |
| Regulatory retention | Art. 17(3)(b) | Retain | Regulation ref |
| Public interest | Art. 17(3)(d) | Retain | Public interest doc |
| Legal claims | Art. 17(3)(e) | Retain | Claim reference |
| Archiving purposes | Art. 17(3)(d) | Anonymize | Archive policy |

### 4. Design Verification Procedures

| Verification Step | Method | Success Criteria |
|-------------------|--------|------------------|
| Primary data | Query all systems | Zero results |
| Search index | Search all indices | Zero results |
| Third-party | Confirmation receipt | All confirmations |
| Audit trail | Log review | Deletion logged |

**Verify current best practices with web search:**
Search the web: "GDPR Article 17 deletion execution best practices {date}"
Search the web: "right to erasure exception handling {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the request intake, data discovery, and deletion execution design.**

Present summary to user:
- Request intake channels and SLA
- Data discovery coverage
- Deletion execution procedures

Ask for confirmation before proceeding to deletion procedure specification creation.

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Deletion Analysis
- **A1**: Analyze deletion method completeness
- **A2**: Evaluate cascading deletion safety
- **A3**: Assess exception handling adequacy
- **A4**: Review verification procedure coverage

### [P] Propose - Deletion Recommendations
- **P1**: Propose automated deletion workflow
- **P2**: Suggest deletion verification automation
- **P3**: Recommend exception documentation templates
- **P4**: Propose deletion metrics dashboard

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create Deletion Spec) - load `step-04-c-create-deletion-spec.md`
- **C2**: Return to workflow overview
- **C3**: Export current deletion design

---

## Verification

- [ ] Deletion methods defined per data type
- [ ] Cascading deletion designed
- [ ] Exception handling documented
- [ ] Verification procedures specified
- [ ] Patterns align with pattern registry

## Outputs

- Deletion method matrix
- Cascading deletion design
- Exception handling procedures
- Verification procedures

## Next Step

Proceed to `step-04-c-create-deletion-spec.md` to create the comprehensive deletion procedure specification.
