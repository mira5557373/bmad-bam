# Step 4: Public Facade Design

## Purpose
Design the module's public facade that serves as the only entry point for other modules, enforcing encapsulation and tenant-scoping.

## Actions

- Define facade methods:
  - All methods must accept TenantContext as first parameter
  - Use verb-noun naming (create_agent, get_execution)
  - Group related operations logically
  - Document method contracts with pre/post conditions

- Design input DTOs:
  - Separate DTO per operation (CreateAgentInput, UpdateAgentInput)
  - Validate at facade boundary
  - Never expose internal entity structure
  - Include only fields needed for operation

- Design output DTOs:
  - Separate DTO per operation or shared read DTOs
  - Include computed/derived fields as needed
  - Pagination wrapper for list operations
  - Never expose sensitive internal state

- Define error types:
  - Follow master architecture error contract
  - Module-specific error codes with prefix
  - Include error context for debugging
  - Map to appropriate HTTP status codes

- Apply facade template:
  - Inherit from base facade class
  - Implement required lifecycle hooks
  - Add observability decorators (logging, metrics)

## Outputs
- Facade interface definition with all methods
- DTO schemas (input and output)
- Error type enumeration with descriptions
- Facade implementation skeleton

## Questions to Consider
- Are there operations that should be async?
- How do you handle bulk operations efficiently?
- What operations need idempotency keys?
