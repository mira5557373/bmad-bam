# Step 1: Initialize Cross-Module Story

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

Initialize the cross-module story coordination workflow by loading module architectures, facade contracts, and identifying cross-cutting user journeys that span multiple modules.

---

## Prerequisites

- Feature request or user journey requiring multiple modules
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-context-propagation

---

## Inputs

- User journey or feature request description
- Master architecture document: `{output_folder}/planning-artifacts/master-architecture.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*.md`
- Facade contracts: `{output_folder}/planning-artifacts/contracts/*.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Module Architectures

Load and parse existing module documentation:

| Module | Architecture Doc | Status | Owner |
|--------|------------------|--------|-------|
| {module_name} | {path} | {stable/in-progress} | {team} |

### 2. Load Facade Contracts

Identify existing integration contracts:

| Contract | Provider | Consumer(s) | Version |
|----------|----------|-------------|---------|
| {contract_name} | {module} | {modules} | {version} |

### 3. Identify Cross-Cutting User Journeys

Analyze the feature request to identify user journeys spanning modules:

| Journey | Description | Modules Involved | Primary Module |
|---------|-------------|------------------|----------------|
| {journey_id} | {description} | {module_list} | {owner_module} |

### 4. Reference Integration Patterns

Apply integration patterns from pattern registry:

- **Facade Pattern:** Module boundary contracts
- **Event-Driven:** Asynchronous module communication
- **Saga Pattern:** Distributed transaction coordination
- **Context Propagation:** Tenant isolation across modules

**Verify current best practices with web search:**
Search the web: "cross-module coordination patterns enterprise SaaS {date}"
Search the web: "modular monolith integration best practices {date}"

_Source: [URL]_

---

## Verification

- [ ] Master architecture loaded and understood
- [ ] All relevant module architectures identified
- [ ] Existing facade contracts cataloged
- [ ] Cross-cutting user journeys identified
- [ ] Integration patterns referenced from registry
- [ ] Patterns align with pattern registry

---

## Outputs

- Module architecture inventory
- Facade contract catalog
- Cross-cutting journey list
- Initial scope confirmation

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-02-c-analyze.md` to map module touchpoints for identified journeys.
