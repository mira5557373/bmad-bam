# Step 1: Cross-Module Integration Verification

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Verify that all modules integrate correctly through their defined facades and contracts. This step ensures that cross-module communication works as documented, events flow correctly between publishers and consumers, and no contract version mismatches exist that could cause runtime failures.

## Prerequisites

- All modules developed and tested
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i1-convergence.md`


---

## Inputs

- User requirements and constraints for convergence verification
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "cross-module integration API integration patterns {date}"
Search the web: "module integration contract design {date}"

_Source: [URL]_

1. **Run Cross-Module Test Suites (Facade Contract Tests)**
   - Execute contract test suite for each module facade
   - Verify request/response schemas match documented contracts
   - Test all public facade methods with valid and invalid inputs
   - Confirm error responses follow standardized error contract
   - Validate pagination, filtering, and sorting contract compliance

2. **Verify Event Flows (Published Events Consumed Correctly)**
   - Map all event publishers to their registered consumers
   - Run integration tests that publish events and verify consumption
   - Validate event payload schemas match consumer expectations
   - Test event ordering guarantees where required
   - Verify dead letter queue handling for failed events
   - Confirm idempotency in event handlers

3. **Validate Contract Compliance (All Facades Match Documented Contracts)**
   - Compare runtime facade signatures against documentation
   - Verify OpenAPI/AsyncAPI specs match implementation
   - Check that all required fields are present in responses
   - Validate type safety across module boundaries
   - Ensure backward compatibility with previous contract versions

4. **Check for Contract Version Mismatches**
   - Scan all module dependencies for version conflicts
   - Identify deprecated contract methods still in use
   - Verify all consumers use compatible contract versions
   - Document any version skew requiring migration

## Outputs

- Contract test execution report with pass/fail status
- Event flow verification matrix
- Contract compliance audit document
- Version mismatch report with remediation plan
- **Load template:** `{project-root}/_bmad/bam/data/templates/compliance-checklist-template.md`

---

## Soft Gate Checkpoint

**Step 1 completes the cross-module integration verification phase.**

Present summary of:
- Facade contract test results
- Event flow verification status
- Contract compliance findings
- Version mismatch issues identified

Ask for confirmation before proceeding to tenant safety verification.

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

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze facade contracts | Review all module facade definitions for QG-I1 compliance |
| A2 | Analyze event flows | Map publisher-consumer relationships across modules |
| A3 | Analyze version compatibility | Check contract versions across module boundaries |
| A4 | Analyze test coverage | Evaluate integration test coverage gaps |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Execute contract tests | Run facade contract test suite |
| P2 | Execute event flow tests | Run event integration tests |
| P3 | Generate compliance report | Create contract compliance audit |
| P4 | Document version issues | Create version mismatch report |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Continue to Step 2 | Proceed to tenant safety verification |
| C2 | Return to workflow | Go back to workflow.md for mode selection |
| C3 | Jump to validation | Skip to step-20-v-load-artifact.md |

**Convergence Gate Context:** This step validates QG-I1 (Cross-Module Integration). All facade contracts must pass before proceeding to QG-I2 tenant safety verification.

---

## Verification

- [ ] All facade contract tests pass (100% coverage of public methods)
- [ ] Event flow tests confirm all consumers receive expected events
- [ ] No undocumented facade methods exist
- [ ] Zero contract version mismatches across modules
- [ ] Error contracts are consistent across all modules
- [ ] Patterns align with pattern registry

## Next Step

Proceed to `step-02-c-tenant-safety-verification.md` to verify tenant isolation.
