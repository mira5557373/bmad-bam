# Step 3: Specify Data Transfer

Define the data transfer objects and serialization rules for the facade contract.

## Tasks

1. **Define DTO Schemas**
   - Create JSON Schema or TypeScript types for each DTO
   - Document field-level validation rules
   - Mark required vs optional fields explicitly

2. **Specify Tenant Context Propagation**
   - Define how tenant context is passed (header, parameter, envelope)
   - Document context extraction and validation
   - Specify fallback behavior for missing context

3. **Handle Collections and Pagination**
   - Define pagination strategy (cursor-based recommended)
   - Specify maximum page sizes
   - Document sorting and filtering capabilities

4. **Define Serialization Rules**
   - Specify date/time formats (ISO 8601)
   - Define decimal/money handling
   - Document null vs undefined semantics

## Output

Add to the contract specification:
- Complete DTO schemas with validation rules
- Tenant context propagation rules
- Pagination specifications
- Serialization format documentation
