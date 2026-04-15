# Step 4: Define Acceptance Criteria

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

Add acceptance criteria to each story and finalize the epics document.

---

## Prerequisites

- Stories generated (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Acceptance Criteria Structure

For each story, define acceptance criteria using Given/When/Then format:

```markdown
**Acceptance Criteria:**

**AC1:** {Criteria title}
- Given: {precondition}
- When: {action}
- Then: {expected outcome}

**AC2:** {Criteria title}
- Given: {precondition}
- When: {action}
- Then: {expected outcome}
```

### 2. Required Criteria Categories

Each story must have acceptance criteria covering:

#### Functional Criteria
- Core functionality works as specified
- Edge cases handled appropriately

#### Tenant Isolation Criteria
- Operations respect tenant_id boundaries
- No cross-tenant data leakage
- Tenant context propagated correctly

#### Facade Contract Criteria (if story modifies facade)
- Facade method signature matches contract
- DTOs validated against schema
- Error types follow master architecture error contract

#### AI Behavior Criteria (if applicable)
- Agent operates within tool permission bounds
- Memory scope correctly isolated
- Kill switch can disable AI behavior

### 3. BAM Developer Notes

Add developer notes to each story:

```markdown
**BAM Dev Notes:**
- Module boundary: {enforcement guidance}
- Tenant context: {how to access and validate}
- Facade dependencies: {facades to import, versions}
- Testing: {integration test requirements}
```

### 4. Final Assembly

1. Compile all epics and stories into `epics.md`
2. Validate story count matches complexity guidelines
3. Verify no stories cross module boundaries without facade contracts
4. Check spike stories exist for all flagged unknowns (COMPLEX only)

### 5. Output and Status Update

Write final document to: `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

Update sprint-status.yaml: module status to 'epics-complete'

Present summary:
- Total epics: {count}
- Total stories: {count}
- Spike stories: {count}
- Estimated complexity: {SIMPLE/STANDARD/COMPLEX}

**Verify current best practices with web search:**
Search the web: "acceptance criteria module patterns {date}"
Search the web: "tenant isolation testing bounded context {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing acceptance criteria and assembly, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into acceptance criteria quality
- **P (Party Mode)**: Bring QA and developer perspectives for criteria validation
- **C (Continue)**: Accept epics document and complete workflow
- **[Specific refinements]**: Describe what you'd like to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: acceptance criteria, BAM dev notes, final epics summary
- Process enhanced insights on criteria completeness
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into epics document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review acceptance criteria and epics: {summary of epics and stories}"
- Process collaborative analysis from QA and developer personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final epics document
- Update sprint-status.yaml
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Mark workflow as complete

---

## Verification

- [ ] All stories have acceptance criteria
- [ ] Functional criteria defined
- [ ] Tenant isolation criteria included
- [ ] Facade contract criteria added (where applicable)
- [ ] BAM developer notes included
- [ ] Epics document assembled and written
- [ ] Sprint status updated
- [ ] Patterns align with pattern registry

---

## Outputs

- Final epics.md document
- Updated sprint-status.yaml
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-epic-template.md`

---

## Next Step

Proceed to sprint planning with the completed epics document.
