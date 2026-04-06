# Step 1: Inventory Changes

Catalog all changes since the last API version release:

## Change Collection

Gather changes from:
- Git commits affecting API surface
- OpenAPI/Swagger specification changes
- Contract test modifications
- Documentation updates

## Change Classification

For each change, classify:

**Breaking Changes:**
- Removed endpoints
- Changed request/response schemas
- Modified authentication requirements
- Altered error codes
- Changed rate limits

**Non-Breaking Changes:**
- New endpoints
- New optional fields
- New query parameters
- Additional response fields
- Documentation improvements

**Deprecations:**
- Endpoints marked for removal
- Fields marked as deprecated
- Authentication methods being phased out

## Module Impact

Map changes to modules:
- Which modules expose these APIs
- Which modules consume these APIs
- Cross-module dependencies affected

Output: Change inventory document with classification and module mapping.
