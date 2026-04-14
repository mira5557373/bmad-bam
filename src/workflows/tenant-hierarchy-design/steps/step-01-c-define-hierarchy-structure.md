# Step 1: Define Hierarchy Structure

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

Define the enterprise organizational hierarchy structure with tenant nesting levels.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Define Hierarchy Levels

Design the multi-level tenant structure:

| Level | Name | Description | Max Children | Typical Use |
|-------|------|-------------|--------------|-------------|
| 0 | Root | Enterprise account | Unlimited | Single enterprise customer |
| 1 | Business Unit | Major division | 100 | Regional offices, product lines |
| 2 | Department | Functional area | 50 | Engineering, Marketing, Sales |
| 3 | Team | Working group | 25 | Project teams, squads |
| 4 | Project | Leaf tenant | N/A | Individual initiatives |

### 2. Define Hierarchy Attributes

For each hierarchy level, specify:

- **Identity attributes:** Name, slug, external ID mapping
- **Metadata:** Cost center, region, compliance tier
- **Constraints:** Max depth, max breadth, naming rules
- **Lifecycle states:** Active, Suspended, Archived, Deleting

### 3. Cross-Hierarchy Relationships

Define shared service patterns:

| Relationship | Description | Use Case |
|--------------|-------------|----------|
| Shared Services | Central services accessible by multiple BUs | IT, Legal, Compliance |
| Data Sharing | Controlled data access across boundaries | Analytics, Reporting |
| Resource Pooling | Shared resource quotas | Burst capacity |

### 4. Hierarchy Constraints

Specify enforcement rules:

- Maximum nesting depth: 5 levels
- Maximum siblings per parent: Configurable per level
- Naming uniqueness: Within parent scope
- Slug format: Lowercase alphanumeric with hyphens
- Path length limit: 255 characters total

**Verify current best practices with web search:**
Search the web: "enterprise multi-tenant hierarchy patterns {date}"
Search the web: "organizational tenant structure SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the hierarchy structure above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into hierarchy edge cases and cross-org scenarios
- **P (Party Mode)**: Bring analyst and architect perspectives for hierarchy review
- **C (Continue)**: Accept hierarchy structure and proceed to permission inheritance
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass hierarchy context: levels, relationships, constraints
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into hierarchy design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant hierarchy: {summary of levels and relationships}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save hierarchy structure to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-permission-inheritance.md`

---

## Verification

- [ ] All hierarchy levels defined
- [ ] Level attributes specified
- [ ] Cross-hierarchy relationships documented
- [ ] Constraints and limits established
- [ ] Patterns align with pattern registry

---

## Outputs

- Hierarchy level definitions
- Cross-hierarchy relationship matrix
- Constraint specification
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-hierarchy-template.md`

---

## Next Step

Proceed to `step-02-c-design-permission-inheritance.md` to define permission inheritance model.
