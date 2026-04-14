# Step 1: Gather Requirements

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

Load, validate, and parse source requirement documents to prepare for module decomposition. This step handles large feature catalogs (typically 180K-330K characters) and extracts structured requirement data.

## Prerequisites

- Input file path provided by user
- Access to project document storage
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`


---

## Inputs

- User requirements and constraints for ingestion - requirement ingestion
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Validate Input File

Apply validation checks from patterns:
- Verify file path is provided and valid
- Confirm file exists and is accessible
- Check file size is within limits (<500KB)
- Validate file is parseable markdown

### 2. Parse Document Structure

Extract hierarchical structure following patterns in knowledge:

| Element | Detection Pattern | Purpose |
|---------|------------------|---------|
| H1 | `^# ` | Major feature areas |
| H2 | `^## ` | Feature categories |
| H3 | `^### ` | Individual features |
| Lists | `^- ` or `^\d+\.` | Requirements/details |
| Tables | `^\|.*\|$` | Structured specs |

### 3. Identify Document Format

Determine parsing strategy based on format:

| Format | Indicators | Parsing Strategy |
|--------|------------|------------------|
| User Stories | "As a... I want..." | Extract persona/action/benefit |
| Specifications | Tables, schemas | Extract field definitions |
| Feature List | Bullet hierarchy | Extract features/sub-features |
| Mixed | Combination | Multi-pass extraction |

### 4. Extract Requirements

Using requirement extraction patterns from knowledge:
- Generate unique ID for each requirement
- Extract title and description
- Infer category from document structure
- Capture source line number for traceability
- Extract nested sub-requirements
- Preserve metadata (priorities, estimates, tags)

### 5. Store in Working Memory

Save parsed requirements for subsequent steps:
- Source file path and size
- Total requirement count
- Categories detected
- Parsing timestamp

## Input Validation Checklist

- [ ] File path provided and valid
- [ ] File exists and is accessible
- [ ] File size within limits (<500KB)
- [ ] Document is parseable markdown
- [ ] Contains identifiable feature sections
- [ ] No encoding issues detected

**Verify current best practices with web search:**
Search the web: "gather requirements best practices {date}"
Search the web: "gather requirements enterprise SaaS {date}"

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

---

## Verification

- [ ] Validation rules applied from pattern references
- [ ] Document structure correctly parsed
- [ ] Requirements extracted with unique IDs
- [ ] Categories properly inferred
- [ ] Working memory updated
- [ ] Patterns align with pattern registry

## Outputs

- Parsed requirement document
- Requirement count and categories summary
- Working memory state updated
- Validation report
- **Load template:** `{project-root}/_bmad/bam/templates/requirement-summary-template.md`

## Next Step

Proceed to `step-02-c-categorize-by-domain.md` with parsed requirements.
