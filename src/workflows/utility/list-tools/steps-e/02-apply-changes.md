# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the requested modification type
2. Apply the modification:
   - **Refresh**: Re-scan specified locations
   - **Filter**: Apply new filter criteria to existing inventory
   - **Format**: Re-render output in new format
   - **Sort**: Re-order by new criteria
3. Preserve:
   - Tool inventory cache (unless refreshing)
   - User preferences
4. If refreshing specific categories:
   - Scan only those locations
   - Merge with existing inventory
   - Update timestamps
5. If changing filters:
   - Apply to cached inventory
   - No re-scan needed
6. Update the cache with any changes
7. Regenerate output in requested format

Present the updated listing.
