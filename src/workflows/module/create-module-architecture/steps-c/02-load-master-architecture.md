# Step 2: Load Master Architecture

## Purpose
Load and analyze the master architecture document to extract patterns, constraints, and interfaces that this module must inherit and implement.

## Actions

- Load master architecture document:
  - Read `{output_folder}/planning-artifacts/master-architecture.md`
  - Identify sections relevant to this module type
  - Note any module-specific overrides or exceptions

- Extract relevant patterns:
  - Repository pattern requirements
  - Service layer conventions
  - Error handling patterns
  - Logging and observability standards

- Document inherited constraints:
  - Technology stack constraints (languages, frameworks)
  - Security requirements (authentication, authorization)
  - Performance requirements (latency, throughput)
  - Compliance requirements (data residency, audit)

- Identify shared kernel interfaces:
  - BaseEntity and value object base classes
  - TenantContext interface requirements
  - Event publishing interfaces
  - Common DTOs and error types

## Outputs
- Extracted pattern checklist for this module
- Constraint compliance matrix
- List of shared kernel interfaces to implement
- Gap analysis (patterns needed but not in master)

## Questions to Consider
- Are there patterns in master that don't apply to this module?
- Does this module need patterns not yet in master architecture?
- What shared kernel version is this module targeting?
