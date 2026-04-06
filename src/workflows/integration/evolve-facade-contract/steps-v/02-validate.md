# Step 2: Validate Contract Evolution

## Validation Checklist

### Version Strategy
- [ ] Version bump follows semver correctly (MAJOR for breaking, MINOR for additions)
- [ ] Version justification documented
- [ ] ADR created for significant changes
- [ ] Deprecation timeline is realistic (minimum notice period met)

### Breaking Change Assessment
- [ ] All breaking changes identified
- [ ] Impact analysis completed for each breaking change
- [ ] Non-breaking alternatives documented (or explained why not feasible)
- [ ] Risk level assessed for each breaking change

### Consumer Impact
- [ ] All affected consumers identified
- [ ] Migration effort estimated per consumer
- [ ] Communication plan exists
- [ ] Rollback procedure documented

### Migration Guide
- [ ] Step-by-step migration instructions exist
- [ ] Code examples provided for each breaking change
- [ ] Testing strategy documented
- [ ] Intermediate states defined (if multi-phase migration)

### Contract Quality
- [ ] New contract passes all define-facade-contract validation criteria
- [ ] Deprecated items marked with `@deprecated` and removal date
- [ ] Change history updated in contract metadata
- [ ] Both old and new TypeScript definitions generated

### Timeline
- [ ] Deprecation announcement date specified
- [ ] Parallel operation period defined (if applicable)
- [ ] Sunset date for deprecated functionality set
- [ ] Support commitment documented

## Gate Decision

- **PASS**: Complete breaking change assessment, migration guide exists, timeline is reasonable
- **CONDITIONAL**: Minor documentation gaps - note gaps and proceed
- **FAIL**: Missing breaking change analysis, no migration guide for major changes, or unrealistic timeline - return to Create/Edit mode

Present validation results with specific findings for each category.
