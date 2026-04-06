# Step 2: Apply Targeted Modifications

Apply the requested changes to the existing facade contract.

## Tasks

1. **Identify Affected Sections**
   - Determine which contract sections are impacted by the requested changes
   - Check for ripple effects (e.g., DTO changes affect multiple operations)
   - Note any potential breaking changes

2. **Present Current Content**
   - Show the current state of each affected section
   - Highlight the specific elements that will change

3. **Apply Modifications**
   - Update interface definitions as requested
   - Modify DTO schemas if needed
   - Update error codes if applicable
   - Preserve unchanged sections exactly

4. **Verify Contract Consistency**
   - Ensure all DTO references are still valid
   - Verify error codes are still referenced correctly
   - Check tenant context handling remains consistent

5. **Update Contract Metadata**
   - Increment version if changes are significant
   - Update change history with modification summary
   - Update last modified timestamp

## Output

Write updated contract to its original location.

Present a diff summary showing:
- Changed operations
- Modified DTOs
- Updated error codes
- Version change (if any)

Ask for confirmation before finalizing.
