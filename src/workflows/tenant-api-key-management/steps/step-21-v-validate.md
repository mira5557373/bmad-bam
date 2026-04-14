# Step 21: Validate API Key Management Design

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

---

## Purpose

Validate the completeness and security of the API key management design.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: encryption-key-management`

---

## Verification

### Key Creation
- [ ] Key format defined with prefix, version, tenant binding
- [ ] Cryptographic requirements (CSPRNG, 256-bit entropy) specified
- [ ] Storage pattern (hashed, salted) follows best practices
- [ ] Metadata schema complete
- [ ] Scope/permission binding mechanism defined

### Key Rotation
- [ ] All rotation triggers defined
- [ ] Rotation policies configurable per tier
- [ ] State machine documented
- [ ] Zero-downtime process specified
- [ ] Notification strategy complete

### Key Revocation
- [ ] Revocation types (immediate, graceful, temporary, cascade) defined
- [ ] All triggers documented
- [ ] Cascade effects specified
- [ ] Recovery procedures complete
- [ ] Compliance evidence requirements met

### Audit Logging
- [ ] Event categories defined
- [ ] Event schema complete
- [ ] Usage tracking specified
- [ ] Anomaly detection rules documented
- [ ] Compliance reports defined
- [ ] Retention policies established

### Operational Runbook
- [ ] Standard operations documented
- [ ] Incident response procedures complete
- [ ] Emergency procedures defined
- [ ] Troubleshooting guide comprehensive
- [ ] Monitoring dashboards specified

### Cross-Cutting
- [ ] Consistent with tenant isolation design
- [ ] Security best practices followed
- [ ] Patterns align with pattern registry

---

## Gate Decision

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S3`

**Load Checklist:** `{project-root}/_bmad/bam/checklists/qg-security-audit.md`

- **PASS**: All security controls complete, lifecycle management operational
- **CONDITIONAL**: Minor gaps - document gaps and proceed
- **FAIL**: Missing security controls or incomplete lifecycle - return to Create mode

---

## Actions

1. Load the relevant documents
2. Apply modifications as specified
3. Generate summary of changes

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring security perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated API key management design
- Validation gate decision (PASS/CONDITIONAL/FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
