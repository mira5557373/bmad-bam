# Step 2: Analyze Divergence

Perform detailed analysis of how the contract and implementation diverged.

## Tasks

1. **Generate Contract Diff**
   - Compare documented contract with actual implementation
   - Identify specific fields, types, or behaviors that differ
   - Quantify the scope of divergence

2. **Trace Divergence Origin**
   - Review recent changes to the provider module
   - Check for contract updates that weren't implemented
   - Look for implementation changes without contract updates
   - Check git history for both contract and implementation

3. **Categorize Divergences**
   For each difference found:
   - Is the contract or implementation correct?
   - Is this a documentation drift or implementation bug?
   - Is this a breaking change that was unplanned?

4. **Assess Impact Scope**
   - Which consumers are affected?
   - What functionality is broken or at risk?
   - Is data integrity compromised?
   - Are there tenant isolation concerns?

5. **Identify Root Cause**
   - Process failure (missing contract update step)
   - Communication failure (team unaware of contract)
   - Tooling gap (no contract validation in CI)
   - Emergency change without full process

## Output

Divergence analysis report:
- Detailed diff (contract vs implementation)
- Divergence origin and root cause
- Impact assessment by consumer
- Risk classification (critical/high/medium/low)
