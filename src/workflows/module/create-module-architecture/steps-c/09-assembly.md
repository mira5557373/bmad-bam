# Step 9: Assembly

1. Combine all sections into `modules/{module-name}/architecture.md`
2. Add inheritance reference to master architecture
3. Validate against master constraints
4. Generate `module-context.md` (compact summary for story creation)
5. Register module in sprint-status.yaml as 'architecture-complete'

## COMPLEX Module Extensions

| Extension                  | Trigger                                     |
| -------------------------- | ------------------------------------------- |
| Pattern Gap Research       | Novel pattern needed not in master arch     |
| Spike Story                | High uncertainty in domain model            |
| Integration Design Session | 4+ facade dependencies                      |
| Risk Analysis              | Revenue-critical or compliance-heavy module |
