# Step 7: Module-Specific Decisions

## Purpose
Document architectural decisions specific to this module that extend or adapt patterns from the master architecture.

## Actions

- Identify decision points:
  - What patterns from master need adaptation?
  - What new patterns are needed for this module?
  - What technology choices are module-specific?

- Document module ADRs:
  - Follow ADR template (context, decision, consequences)
  - Reference master architecture where applicable
  - Include alternatives considered
  - Document trade-offs explicitly

- Track pattern variations:
  - Explain why standard pattern doesn't fit
  - Document the variation clearly
  - Note any risks or technical debt

- Plan pattern promotion:
  - If pattern proves useful, flag for promotion
  - After 2+ modules use same pattern, promote to master
  - Follow formal ADR process for promotion

## Outputs
- Module-specific ADR documents
- Pattern variation registry
- Technical debt log (if patterns diverge)
- Promotion candidates list

## Questions to Consider
- Is this decision truly module-specific or broadly applicable?
- Does this decision create technical debt?
- How will this decision impact module maintainability?
- Should you consult with other module teams first?

**SIMPLE modules:** Skip if all decisions inherited from master
