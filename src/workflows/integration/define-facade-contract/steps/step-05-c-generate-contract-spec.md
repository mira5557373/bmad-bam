# Step 5: Generate Contract Specification

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


## Purpose

Assemble the complete facade contract specification document.

## Prerequisites

- Error handling documented (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract specification API integration patterns {date}"
Search the web: "API specification contract design {date}"

_Source: [URL]_

1. **Create Contract Header**
   - Contract name and version (semver)
   - Provider module and bounded context
   - Consumer modules (if known)
   - Contract status (draft, published, deprecated)

2. **Assemble Contract Sections**
   - Integration points summary
   - Interface definitions
   - DTO schemas
   - Error handling specifications
   - Tenant context requirements

3. **Add Contract Metadata**
   - Owner (module team)
   - Review status
   - Last updated timestamp
   - Change history

4. **Generate Contract Artifacts**
   - TypeScript interface file
   - JSON Schema for validation
   - Contract test template

## Output

Write the contract specification to:
`{output_folder}/planning-artifacts/contracts/{provider-module}-facade-contract-v{version}.md`

The document should include:
- Complete interface definitions
- All DTO schemas
- Error codes and handling
- Version and compatibility information
- Sample request/response pairs for each operation

## Verification

- [ ] Contract header complete
- [ ] All sections assembled
- [ ] Metadata added
- [ ] Artifacts generated
- [ ] Patterns align with pattern registry

## Outputs

- Complete facade contract specification
- TypeScript interface file
- JSON Schema for validation
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help structure contract header metadata
> - `A2` - Clarify contract section organization
> - `A3` - Explain contract versioning strategy
> - `A4` - Review artifact generation requirements
>
> **[P] Proactive Options:**
> - `P1` - Suggest contract completeness improvements
> - `P2` - Flag missing consumer documentation
> - `P3` - Recommend sample request/response examples
> - `P4` - Identify contract compatibility considerations
>
> **[C] Completion Options:**
> - `C1` - Validate contract specification completeness
> - `C2` - Generate contract artifacts summary
> - `C3` - Verify contract ready for review
> - `C4` - **Complete Create Mode** (submit for validation)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Submit contract for review via `bmad-bam-validate-facade-contract`.
