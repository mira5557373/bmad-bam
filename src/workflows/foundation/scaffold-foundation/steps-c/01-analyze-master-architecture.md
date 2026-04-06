# Step 1: Analyze Master Architecture

Load the master architecture document from `{output_folder}/planning-artifacts/master-architecture.md`.

If the file does not exist, inform the user and suggest running `bmad-bam-create-master-architecture` first.

Extract and validate the following key decisions:

## Technology Stack
- Primary language and framework (e.g., Python/FastAPI, TypeScript/NestJS)
- Database technology and version
- Cache layer technology
- Message queue / event bus technology
- AI runtime dependencies (LLM providers, embedding models)

## Tenant Model
- Isolation strategy (RLS / schema / database per tenant)
- TenantContext interface shape
- Tenant lifecycle states

## AI Runtime Requirements
- Agent registry design
- Tool registry structure
- Memory tier configuration
- Kill switch mechanisms

## Shared Kernel Interfaces
- BaseEntity requirements
- EventBus interface
- Common value objects and DTOs

Present a summary of extracted decisions and confirm with the user before proceeding.

**Validation:** All required sections must be present in the master architecture. If any are missing, report gaps and request the user to complete the master architecture first.
