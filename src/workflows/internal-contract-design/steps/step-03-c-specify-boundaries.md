# Step 3: Specify Boundaries

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

Define clear boundaries and constraints for each contract.

## Prerequisites

- Contracts defined (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: agent-runtime`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract boundary API integration patterns {date}"
Search the web: "service boundary contract design {date}"

_Source: [URL]_

Define clear boundaries and constraints for each contract:

## Access Boundaries

**Authorization Requirements:**
- Who can call this interface
- Permission levels required
- Tenant scope restrictions
- Rate limits (if applicable)

**Data Boundaries:**
- What data can be accessed through this interface
- Tenant isolation requirements
- PII handling requirements
- Data retention scope

## Operational Boundaries

**Performance Boundaries:**
- Expected latency SLO
- Throughput limits
- Resource consumption limits
- Timeout configurations

**Reliability Boundaries:**
- Availability expectations
- Retry policy
- Circuit breaker configuration
- Fallback behavior

## Dependency Boundaries

**Upstream Dependencies:**
- What this interface depends on
- Failure propagation policy
- Caching requirements

**Downstream Impact:**
- What depends on this interface
- Breaking change policy
- Notification requirements for changes

## Boundary Enforcement

Define how boundaries are enforced:
- Compile-time checks (types, interfaces)
- Runtime validation (guards, middleware)
- Testing requirements (contract tests)
- Monitoring and alerting

Output: Boundary specification document with enforcement mechanisms.

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

**[A]pprove** - Boundary specifications approved, proceed to documentation
**[P]ause** - Save progress, review access and operational boundaries
**[C]oncern** - Discuss boundary constraints, enforcement mechanisms, or SLOs

Select an option:

---

## Verification

- [ ] Access boundaries defined
- [ ] Operational boundaries specified
- [ ] Dependency boundaries documented
- [ ] Enforcement mechanisms identified
- [ ] Patterns align with pattern registry

## Outputs

- Boundary specification document
- Enforcement mechanism configuration

## Next Step

Proceed to `step-04-c-document-contract.md` to create comprehensive documentation.
