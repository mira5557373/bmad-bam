# Step 1: Detect Mismatch

Identify and document the facade contract mismatch.

## Tasks

1. **Gather Mismatch Evidence**
   - Collect error logs or test failures indicating mismatch
   - Identify the provider module and affected operation(s)
   - Note the consumer module(s) experiencing issues
   - Document the symptoms (type errors, runtime failures, data issues)

2. **Load Contract Documents**
   - Load the documented facade contract from `{output_folder}/planning-artifacts/contracts/`
   - Load the actual implementation (TypeScript interfaces, API definitions)
   - Identify version numbers for both contract and implementation

3. **Identify Mismatch Type**
   - **Schema Mismatch**: DTO structure differs from contract
   - **Signature Mismatch**: Operation parameters or return types differ
   - **Semantic Mismatch**: Same interface, different behavior
   - **Version Mismatch**: Consumer expecting different contract version

4. **Document Discovery Context**
   - How was the mismatch discovered (test, production, review)?
   - When did the mismatch likely occur?
   - What changes may have caused it?

## Output

Create mismatch detection report:
- Affected provider module and operations
- Mismatch type classification
- Symptoms and evidence
- Discovery context and timeline
