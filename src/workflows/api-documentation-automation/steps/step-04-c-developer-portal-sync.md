# Step 4: Developer Portal Sync

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

Design the developer portal publishing workflow, API explorer integration, authentication for try-it-out functionality, and feedback collection mechanism.

---

## Prerequisites

- Step 3 completed (versioning approach defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: developer-portal`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: developer-experience`

---


## Inputs

- Versioning approach from Step 3
- Portal platform selection (if made)
- Authentication infrastructure
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Design portal publishing workflow:
  | Stage | Trigger | Action | Validation |
  |-------|---------|--------|------------|
  | Build | PR merge | Generate docs | Link check |
  | Preview | PR open | Deploy preview | Visual review |
  | Stage | Release branch | Deploy staging | QA review |
  | Production | Release tag | Deploy production | Smoke test |

- Configure API explorer integration:
  | Feature | Implementation | Purpose |
  |---------|----------------|---------|
  | Try-it-out | Swagger UI / Redoc | Live API testing |
  | Code samples | Multi-language tabs | Quick start |
  | Request builder | Form inputs | Parameter testing |
  | Response viewer | Formatted JSON | Response inspection |
  | Authentication | OAuth flow integration | Secure testing |

- Set up authentication for try-it-out functionality:
  | Auth Method | Portal Implementation | Security |
  |-------------|----------------------|----------|
  | API Key | Stored in session | Encrypted storage |
  | OAuth | Portal OAuth client | Token refresh |
  | JWT | Manual token input | Expiry warning |
  | Sandbox | Auto-generated keys | Test environment only |

- Define feedback collection mechanism:
  | Channel | Tool | Response |
  |---------|------|----------|
  | Page feedback | Thumbs up/down | Analytics tracking |
  | Inline comments | Commenting system | GitHub issue creation |
  | Support tickets | Help desk integration | SLA response |
  | Community | Discord/Slack | Community support |
  | Surveys | Periodic NPS | Quarterly review |

- Design portal analytics:
  | Metric | Purpose | Tool |
  |--------|---------|------|
  | Page views | Popular docs | GA4/Plausible |
  | Search queries | Missing content | Algolia analytics |
  | Try-it-out usage | API exploration | Custom tracking |
  | Feedback scores | Doc quality | Feedback tool |
  | Time on page | Engagement | Analytics |

**Verify current best practices with web search:**
Search the web: "developer portal best practices {date}"
Search the web: "API documentation feedback collection {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the developer portal sync design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into portal workflow and feedback mechanisms
- **P (Party Mode)**: Bring analyst and architect perspectives for portal review
- **C (Continue)**: Accept developer portal sync and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: publishing workflow, API explorer, feedback collection
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into portal sync design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review developer portal sync: {summary of workflow and features}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save developer portal sync to output document
- Generate final api-documentation-pipeline.md
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Complete Create mode

---

## Verification

- [ ] Portal publishing workflow defined
- [ ] API explorer integration configured
- [ ] Try-it-out authentication set up
- [ ] Feedback collection mechanism designed
- [ ] Portal analytics defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Portal publishing workflow
- API explorer configuration
- Authentication integration spec
- Feedback collection design
- Analytics tracking plan
- **Save to:** `{output_folder}/planning-artifacts/documentation/api-documentation-pipeline.md`
- **Load template:** `{project-root}/_bmad/bam/templates/api-docs-automation-template.md`

---

## Workflow Complete

Create mode complete. The API documentation pipeline is now available at:
`{output_folder}/planning-artifacts/documentation/api-documentation-pipeline.md`

Proceed to Edit mode to modify or Validate mode to check completeness.
