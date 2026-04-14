# Step 2: Design Verification Procedures

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

Design data verification procedures that validate data integrity after DR failover, including comparison methods, tolerances, and verification checklists per data type and tenant tier.

## Prerequisites

- Reconciliation scope defined (Step 1)
- Tenant tier model confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-integrity
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery


---

## Inputs

- Reconciliation scope and priorities from Step 1
- User requirements for verification procedures
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Verification Methods

Design verification methods per data type:

| Method | Description | Use Case | Accuracy |
|--------|-------------|----------|----------|
| Row Count | Compare record counts | Quick validation | Low |
| Checksum | Hash comparison of data | Data integrity | High |
| Sample Verification | Random sample comparison | Large datasets | Medium |
| Full Comparison | Row-by-row comparison | Critical data | Highest |
| Schema Verification | Structure comparison | Migration state | High |
| Sequence Verification | ID sequence alignment | Consistency check | Medium |

### 2. Map Methods to Data Types

Define verification methods per data asset:

| Data Asset | Primary Method | Secondary Method | Tolerance |
|------------|----------------|------------------|-----------|
| User Accounts | Full Comparison | Checksum | 0% deviation |
| Tenant Config | Full Comparison | Checksum | 0% deviation |
| Transactions | Checksum | Sample (10%) | 0% deviation |
| API Keys | Full Comparison | N/A | 0% deviation |
| Audit Logs | Row Count | Sample (5%) | < 0.1% deviation |
| Analytics Data | Row Count | Sample (1%) | < 1% deviation |
| Cache Data | Existence Check | N/A | N/A |

### 3. Design Comparison Tolerances

Define acceptable tolerances for verification:

| Tolerance Type | Description | Threshold |
|----------------|-------------|-----------|
| Count Tolerance | Acceptable row count difference | 0 for P1, <0.1% for P2 |
| Timestamp Tolerance | Acceptable time drift | < lag tolerance |
| Checksum Mismatch | Acceptable hash differences | 0 for P1/P2, <0.01% P3 |
| Sample Failure Rate | Failed samples in set | 0 for P1, <1% for P2 |

### 4. Create Verification Checklists

Define verification checklist per priority:

**P1 Critical Data Checklist:**
| Check | Method | Pass Criteria | Automated |
|-------|--------|---------------|-----------|
| User count match | Row Count | Exact match | Yes |
| User data integrity | Full Compare | 100% match | Yes |
| Tenant config match | Full Compare | 100% match | Yes |
| Secret availability | Existence | All present | Yes |
| Auth flow test | Functional | Success | Semi-auto |

**P2 High Priority Checklist:**
| Check | Method | Pass Criteria | Automated |
|-------|--------|---------------|-----------|
| Transaction count | Row Count | Within tolerance | Yes |
| Transaction checksum | Checksum | Match | Yes |
| Audit log count | Row Count | Within tolerance | Yes |
| Sample verification | Sample (10%) | 100% match | Yes |

**P3 Medium Priority Checklist:**
| Check | Method | Pass Criteria | Automated |
|-------|--------|---------------|-----------|
| Analytics count | Row Count | Within tolerance | Yes |
| Sample verification | Sample (1%) | >99% match | Yes |
| Report generation | Functional | Success | Semi-auto |

### 5. Define Manual Verification Steps

Document manual verification procedures:

| Step | Description | Owner | Estimated Time |
|------|-------------|-------|----------------|
| Auth Flow Test | Verify login/logout works | SRE | 5 minutes |
| API Endpoint Test | Test critical API endpoints | SRE | 10 minutes |
| Tenant Access Test | Verify tenant isolation | Security | 15 minutes |
| Transaction Test | Create test transaction | SRE | 5 minutes |
| Report Generation | Generate sample reports | SRE | 10 minutes |
| Integration Test | Verify external integrations | SRE | 15 minutes |

### 6. Design Verification Workflow

Define the verification execution workflow:

| Phase | Duration | Activities |
|-------|----------|------------|
| Phase 1: Quick Check | 0-5 min | Row counts, existence checks |
| Phase 2: Integrity Check | 5-30 min | Checksums, critical comparisons |
| Phase 3: Sample Check | 30-60 min | Sample verification, functional tests |
| Phase 4: Full Check | 60+ min | Deep verification, edge cases |

**Verify current best practices with web search:**
Search the web: "data verification after database failover best practices {date}"
Search the web: "database checksum verification patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Review verification methods for coverage
- **A2**: Analyze method-to-data mapping for completeness
- **A3**: Evaluate tolerance thresholds for business needs
- **A4**: Assess verification checklists for thoroughness

### [P]ropose Changes
- **P1**: Propose verification method adjustments
- **P2**: Propose tolerance threshold modifications
- **P3**: Suggest checklist enhancements
- **P4**: Recommend workflow phase changes

### [C]ontinue
- **C1**: Accept current verification design and proceed to automated checks
- **C2**: Mark step complete and load `step-03-c-configure-automated-checks.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Verification methods defined for all data types
- [ ] Methods mapped to data assets
- [ ] Tolerances established
- [ ] Verification checklists created per priority
- [ ] Manual verification steps documented
- [ ] Verification workflow phases defined
- [ ] Patterns align with pattern registry

## Outputs

- Verification methods specification
- Data type to method mapping
- Tolerance thresholds documentation
- Priority-based verification checklists
- Manual verification procedures
- Verification workflow documentation
- **Load template:** `{project-root}/_bmad/bam/templates/data-reconciliation-dr-template.md`

## Next Step

Proceed to `step-03-c-configure-automated-checks.md` to configure automated integrity checks.
