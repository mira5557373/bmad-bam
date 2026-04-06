# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify which verification phases need to be re-run
2. Present the previous results for those phases
3. Re-run the specified verification phases:
   - Cross-module integration (if facade contracts changed)
   - Tenant safety (if isolation rules changed)
   - Agent safety (if AI features changed)
   - Performance (if infrastructure or high-traffic paths changed)
4. Merge new results with existing results for unchanged phases
5. Update the release recommendation based on combined results
6. Write the updated report to `{output_folder}/planning-artifacts/quality/convergence-report.md`

Present a summary of what changed and the updated release recommendation.
