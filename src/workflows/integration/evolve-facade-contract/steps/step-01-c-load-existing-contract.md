# Step 1: Load Existing Contract

## Purpose

Load the current facade contract that needs to evolve.

## Prerequisites

- Existing facade contract published
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- User requirements and constraints for integration - evolve facade contract
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract versioning API integration patterns {date}"
Search the web: "facade contract evolution design {date}"

_Source: [URL]_

### 1. Locate Existing Contract

- Search for existing facade contract at `{output_folder}/facade-contracts/`
- Identify contract file by module name
- Verify contract format and version

### 2. Parse Contract Structure

- Load contract metadata (version, status, last-modified)
- Extract operation definitions
- Identify current consumers and dependencies

### 3. Inventory Consumer Usage

| Consumer Module | Operations Used | Coupling Level |
|-----------------|-----------------|----------------|
| {module-a}      | {operations}    | HIGH/MEDIUM/LOW |
| {module-b}      | {operations}    | HIGH/MEDIUM/LOW |

### 4. Document Contract Baseline

- Record current version number
- Document evolution history
- Note any deferred changes from previous versions

---

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

## COLLABORATION MENUS (A/P/C)

### [A]sk
- **A1**: What consumers are most at risk from contract changes?
- **A2**: Which operations have the highest coupling across modules?
- **A3**: Are there undocumented contract dependencies?
- **A4**: What breaking changes were deferred from previous versions?
- **A5**: Which contract patterns need modernization?

### [P]roceed
- **P1**: Contract baseline documented - proceed to change identification
- **P2**: Consumer inventory complete - ready for impact analysis
- **P3**: All prerequisites satisfied - advance to Step 2

### [C]oncern
- **C1**: Consumer inventory incomplete - need more discovery time
- **C2**: Contract version unclear - multiple candidates found
- **C3**: Missing integration test coverage - cannot verify usage patterns
- **C4**: Contract history gaps - evolution patterns unclear
- **C5**: External consumers not fully identified

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Existing contract located and loaded
- [ ] Contract metadata parsed successfully
- [ ] Consumer inventory documented
- [ ] Contract baseline established
- [ ] Evolution history reviewed

---

## Outputs

- Contract baseline document
- Consumer inventory table
- Evolution history summary
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-02-c-identify-changes-needed.md` to document required changes.
