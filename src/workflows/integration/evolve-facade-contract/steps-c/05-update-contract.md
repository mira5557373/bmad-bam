# Step 5: Update Contract

Apply the planned changes to create the new contract version.

## Tasks

1. **Create New Contract Version**
   - Copy current contract as baseline
   - Update version number
   - Add deprecation notices to affected operations

2. **Apply Planned Changes**
   - Add new operations
   - Modify existing operations per change manifest
   - Update DTO schemas
   - Add/modify error codes
   - Mark deprecated items with `@deprecated` and removal date

3. **Update Contract Metadata**
   - Increment version
   - Add change history entry
   - Update owner and reviewer info
   - Set status (draft for review)

4. **Generate Migration Artifacts**
   - Updated TypeScript definitions
   - New JSON schemas
   - Migration guide document
   - Contract test updates

5. **Prepare Consumer Communication**
   - Breaking changes summary
   - Migration timeline
   - Code examples for common changes
   - Support contact for questions

## Output

Write updated contract to:
`{output_folder}/planning-artifacts/contracts/{provider-module}-facade-contract-v{new-version}.md`

Also generate:
- Migration guide: `{output_folder}/planning-artifacts/contracts/{provider-module}-migration-v{old}-to-v{new}.md`
- Updated TypeScript definitions
- Contract change announcement draft
