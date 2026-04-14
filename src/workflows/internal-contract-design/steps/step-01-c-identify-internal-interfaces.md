# Step 1: Identify Internal Interfaces

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

Discover all interfaces that require formal contracts within the module.

## Prerequisites

- Module architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`


---

## Inputs

- User requirements and constraints for internal contract design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "internal interface API integration patterns {date}"
Search the web: "module interface contract design {date}"

_Source: [URL]_

Discover all interfaces that require formal contracts within the module:

## Interface Discovery

Survey the module for interfaces between:
- Internal services/components
- Sub-modules or packages
- Shared utilities and libraries
- Data access layers

## Interface Classification

**Facade Interfaces:**
- Module's public API exposed to other modules
- Must follow master architecture facade pattern
- Version controlled and documented

**Internal Service Interfaces:**
- Interfaces between internal components
- May be less formal but need clear contracts
- Used for component isolation and testing

**Data Interfaces:**
- Repository patterns for data access
- Event schemas for internal messaging
- Cache interfaces for state management

**Integration Interfaces:**
- External service adapters
- Third-party API wrappers
- Infrastructure service clients

## Interface Inventory

For each interface, document:
- Interface name and location
- Provider component
- Consumer components
- Current state (documented/undocumented/implicit)
- Criticality (high/medium/low)

Output: Interface inventory with classification and criticality assessment.

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

**[A]pprove** - Interface inventory approved, proceed to contract definition
**[P]ause** - Save progress, review interface classifications
**[C]oncern** - Discuss interface discovery, coverage gaps, or classification issues

Select an option:

---

## Verification

- [ ] All internal interfaces discovered
- [ ] Interfaces classified by type
- [ ] Provider/consumer relationships documented
- [ ] Criticality assessed
- [ ] Patterns align with pattern registry

## Outputs

- Interface inventory document
- Classification matrix

## Next Step

Proceed to `step-02-c-define-contracts.md` to create formal contract definitions.
