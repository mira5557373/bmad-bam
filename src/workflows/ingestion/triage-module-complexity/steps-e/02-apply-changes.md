# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. **Identify affected questions:**
   - Which of Q1-Q8 need re-evaluation
   - Whether new evidence affects existing scores
   - If classification change is required

2. **Re-assess specified questions:**
   - Apply the same assessment criteria from Steps 2-3
   - Document new evidence supporting score change
   - Note what changed since previous assessment

3. **Recalculate classification:**
   - Sum updated Q1-Q8 scores
   - Re-apply one-way upgrade rule
   - Compare new vs. previous classification

4. **Handle classification changes:**
   - If upgrading (SIMPLE->STANDARD or STANDARD->COMPLEX):
     - Document additional requirements triggered
     - Note impact on sprint planning
   - If downgrading (rare, requires explicit justification):
     - Document why previous assessment was incorrect
     - Confirm with user before applying

5. **Update artifacts:**
   - Write updated complexity-assessment.md
   - Update sprint-status.yaml with new scores
   - Add change history/rationale

6. **Validate consistency:**
   - Verify score breakdown matches total
   - Confirm upgrade rule correctly applied
   - Check classification aligns with score range

Present a diff summary showing:
- Previous scores vs. new scores
- Classification change (if any)
- Impact on implementation approach

Ask for confirmation before finalizing changes.
