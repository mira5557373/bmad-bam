# Step 1: Identity

## Purpose
Establish the module's bounded context identity, clarifying what business capability it owns and who is responsible for it.

## Actions

- Define business capability owned:
  - Single, clear capability statement
  - What problems does this module solve?
  - What would break if this module didn't exist?

- Assign module ownership:
  - Primary owner team name
  - Technical lead contact
  - Escalation path for cross-module issues

- Write purpose statement:
  - One paragraph describing the module's role
  - Key responsibilities (3-5 bullet points)
  - Explicit non-responsibilities (what this module does NOT do)

- Identify bounded context boundaries:
  - Core domain concepts owned by this module
  - Ubiquitous language terms defined here
  - Integration points with other contexts

## Outputs
- Module identity card (name, owner, purpose)
- Bounded context diagram showing this module
- Responsibility matrix (owns vs. uses vs. ignores)

## Questions to Consider
- Is this capability distinct enough to warrant its own module?
- Could this be merged with an adjacent module?
- Are the boundaries clear to other teams?
