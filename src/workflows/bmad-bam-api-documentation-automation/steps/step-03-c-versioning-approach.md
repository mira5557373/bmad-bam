# Step 3: Versioning Approach

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

Define the version labeling strategy, archive workflow, version selector design, and breaking change documentation process for API documentation.

---

## Prerequisites

- Step 2 completed (OpenAPI integration configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: versioning`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: api-versioning`

---


## Inputs

- OpenAPI integration from Step 2
- API versioning strategy (if defined)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Define version labeling strategy:
  | Strategy | Format | Example | Use Case |
  |----------|--------|---------|----------|
  | Semantic | vMAJOR.MINOR | v2.1 | Standard APIs |
  | Date-based | YYYY-MM-DD | 2026-04-11 | Stripe-style |
  | URL path | /v1/, /v2/ | /api/v2/ | Path versioning |
  | Header | API-Version: 2 | X-API-Version | Header versioning |

- Design version archive and deprecation workflow:
  | Phase | Duration | Action | Documentation |
  |-------|----------|--------|---------------|
  | Current | Active | Full support | Latest docs |
  | Deprecated | 6-12 months | Bug fixes only | Warning banner |
  | Sunset | 30 days | Read-only notice | Migration guide |
  | Archived | Permanent | No support | Historical reference |

- Configure version selector in documentation:
  | Component | Implementation | User Experience |
  |-----------|----------------|-----------------|
  | Dropdown | Version picker in header | Quick switching |
  | URL structure | `/docs/v2/`, `/docs/v1/` | Shareable links |
  | Default | Latest stable | New users |
  | Banner | Deprecation warning | Version awareness |
  | Diff view | Compare versions | Migration help |

- Establish breaking change documentation process:
  1. **Identify**: Mark breaking changes in PR
  2. **Document**: Add to migration guide
  3. **Changelog**: Auto-generate from commits
  4. **Notify**: Email/webhook to consumers
  5. **Support**: Add migration examples

- Define changelog automation:
  | Source | Tool | Format |
  |--------|------|--------|
  | Git commits | conventional-changelog | CHANGELOG.md |
  | PR labels | release-drafter | GitHub Releases |
  | OpenAPI diff | oasdiff | API changelog |

**Soft Gate:** Steps 1-3 complete the documentation pipeline design. Present a summary of generation tools, OpenAPI integration, and versioning strategy. Ask for confirmation before proceeding to developer portal sync.

**Verify current best practices with web search:**
Search the web: "API documentation versioning best practices {date}"
Search the web: "breaking change documentation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the versioning approach above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into versioning strategy and deprecation workflow
- **P (Party Mode)**: Bring analyst and architect perspectives for versioning review
- **C (Continue)**: Accept versioning approach and proceed to developer portal sync
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: version strategy, deprecation workflow, changelog automation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into versioning approach
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review versioning approach: {summary of strategy and deprecation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save versioning approach to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-developer-portal-sync.md`

---

## Verification

- [ ] Version labeling strategy defined
- [ ] Deprecation workflow documented
- [ ] Version selector configured
- [ ] Breaking change process established
- [ ] Changelog automation set up
- [ ] Patterns align with pattern registry

---

## Outputs

- Version labeling specification
- Deprecation workflow document
- Version selector design
- Breaking change documentation process
- Changelog automation configuration

---

## Next Step

Proceed to `step-04-c-developer-portal-sync.md` to design portal publishing workflow.
