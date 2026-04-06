# Step 2: Assess Impact

Evaluate the full impact of the proposed architecture change:

## Architecture Impact Analysis

**Master Architecture Components Affected:**
- List each section of master architecture to be modified
- Current state of each component
- Proposed change to each component
- Rationale for each change

**Module Impact:**
| Module | Impact Type | Severity | Changes Required |
|--------|-------------|----------|------------------|
| ... | Breaking/Minor/None | High/Med/Low | Description |

## Dependency Analysis

**Upstream Impact:**
- Services that depend on changed components
- Contract changes required
- Migration complexity

**Downstream Impact:**
- Services that the changed components depend on
- Integration changes required
- Testing implications

## Risk Assessment

**Technical Risks:**
- What could go wrong during implementation
- Data integrity risks
- Performance risks
- Rollback complexity

**Business Risks:**
- Service disruption duration
- Customer impact
- Revenue impact
- Compliance implications

**Risk Mitigation:**
For each risk:
- Mitigation strategy
- Contingency plan
- Owner responsible

## Change Scope

Define the minimal change:
- What is the smallest change that addresses the emergency
- What can be deferred to post-emergency
- What additional changes would be beneficial but not critical

Output: Impact assessment document with risk analysis and mitigation plan.
