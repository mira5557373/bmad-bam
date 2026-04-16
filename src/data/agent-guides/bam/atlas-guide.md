# Atlas Guide - BAM Extension

**When to load:** During any phase when managing architectural knowledge or documentation, or when user mentions shared kernel, knowledge management, or architectural decisions.
**Integrates with:** Architect+Atlas (architect-bam.yaml), platform architecture, infrastructure design

This guide provides BAM-specific context for Atlas (documentation/knowledge management) working on multi-tenant agentic AI platforms.

## Core Concepts

### Platform Foundation

Platform foundation encompasses the core architectural decisions that underpin the entire multi-tenant system. This includes tenant model selection, isolation strategy, shared kernel design, and module boundary definitions. Foundation decisions must be made and documented before module implementation begins, as they constrain all subsequent architecture choices.

### Infrastructure Patterns

Infrastructure patterns describe reusable approaches to implementing multi-tenant capabilities at the platform level. These include tenant context propagation, RLS policy implementation, cache isolation, and background job tenancy. Patterns should be documented with clear guidance on when to apply them and how they interact with each other.

### Architectural Knowledge Management

Architectural knowledge management maintains the living documentation of platform decisions, patterns, and their rationale. This includes Architecture Decision Records (ADRs), module catalogs, facade registries, and event catalogs. Knowledge must be searchable, version-controlled, and connected to the code it describes.

---

## Role Context

As Atlas on a BAM project, you focus on:
- Maintaining architectural knowledge across the platform
- Documenting multi-tenant patterns and their applications
- Ensuring shared kernel patterns are well-documented
- Creating navigable documentation for the modular monolith

## Platform Architecture Checklist

Use this comprehensive checklist when documenting and managing platform architecture knowledge:

### Foundation Documentation

- [ ] **Tenant Model Decision** - Document chosen isolation strategy (RLS, Schema, Database) with rationale
- [ ] **Module Catalog** - Maintain list of all modules with owners, boundaries, and responsibilities
- [ ] **Facade Registry** - Document all public facades with version history and contracts
- [ ] **Shared Kernel Inventory** - List all shared types, utilities, and cross-cutting concerns
- [ ] **Event Catalog** - Document all domain events with schemas, producers, and consumers
- [ ] **Technology Decisions** - Record ADRs for all significant technology choices

### Multi-Tenant Documentation

- [ ] **Tier Definitions** - Document each tier with capabilities, limits, and SLAs
- [ ] **Isolation Boundaries** - Visualize where tenant isolation is enforced
- [ ] **Context Flow** - Document how tenant context propagates through the system
- [ ] **Compliance Matrix** - Map compliance requirements to implementation details
- [ ] **Data Residency** - Document data storage locations and residency rules

### Operational Documentation

- [ ] **Runbooks** - Create operational procedures for tenant-related scenarios
- [ ] **Troubleshooting Guides** - Document common tenant-related issues and resolutions
- [ ] **Monitoring Dashboards** - Document available dashboards and their interpretation
- [ ] **Escalation Procedures** - Define escalation paths for tenant-impacting issues

## Decision Framework

| Documentation Need | Priority | Audience | Update Frequency |
|-------------------|----------|----------|------------------|
| Architecture Overview | Critical | All teams | Quarterly |
| Module Boundaries | High | Developers | Per release |
| Facade Contracts | High | Integrators | Per change |
| API Documentation | High | External developers | Per release |
| Tenant Configuration | Medium | Ops/Support | Per feature |
| Compliance Evidence | Medium | Security/Legal | Per audit |
| Troubleshooting Guides | Medium | Support/Ops | Continuous |
| Design Rationale (ADRs) | Medium | Future architects | Per decision |

## Actionable Guidance

### Establishing Architecture Knowledge Base

1. **Create Central Repository** - Set up a dedicated location for all architecture documentation
2. **Define Documentation Standards** - Establish templates and conventions for consistency
3. **Assign Ownership** - Designate module owners responsible for keeping docs current
4. **Implement Review Process** - Require architecture review for documentation changes
5. **Enable Search** - Ensure documentation is searchable and discoverable
6. **Link to Code** - Connect documentation to relevant code locations
7. **Version Documentation** - Track documentation versions alongside code versions

### Documenting Shared Kernel Components

1. **Inventory Base Types** - Document all tenant-aware base types (TenantContext, BaseEntity, etc.)
2. **Document Contracts** - Specify interfaces that modules must implement
3. **Explain Cross-Cutting Concerns** - Document logging, tracing, metrics patterns
4. **Provide Usage Examples** - Include code examples showing correct usage
5. **Note Versioning Policy** - Explain how shared kernel versions are managed
6. **List Dependencies** - Document what shared kernel depends on externally

### Managing Architecture Decision Records (ADRs)

1. **Use Standard Format** - Title, Status, Context, Decision, Consequences
2. **Number Sequentially** - ADR-001, ADR-002, etc. for easy reference
3. **Link Related Decisions** - Cross-reference related or superseded ADRs
4. **Include Multi-Tenant Context** - Always address tenant isolation implications
5. **Review Periodically** - Revisit decisions when context changes significantly
6. **Announce Significant ADRs** - Communicate important decisions to all teams

## Key Considerations

### Multi-Tenant Documentation
- Document tenant isolation boundaries clearly
- Explain how patterns apply differently per tenant tier
- Maintain glossary of tenant-related terminology

### Shared Kernel Knowledge
- Document base types and their tenant-aware extensions
- Explain cross-cutting concerns in shared kernel
- Keep track of shared kernel versioning

### Architecture Documentation
- Map modules and their relationships
- Document facade contracts and their evolution
- Maintain decision records for architectural choices

## SaaS-Specific Considerations

### Documentation for Different Audiences

**Platform Team (Internal):**
- Detailed architecture diagrams with implementation details
- Module interaction patterns and anti-patterns
- Performance characteristics and scaling considerations
- Incident post-mortems and lessons learned

**Tenant Developers (Integration):**
- API reference documentation with authentication details
- Webhook documentation with payload schemas
- SDK documentation with quickstart guides
- Rate limiting and quota documentation

**Operations Team:**
- Tenant provisioning procedures
- Monitoring and alerting documentation
- Incident response procedures
- Capacity planning guidelines

**Compliance/Security:**
- Security architecture documentation
- Data flow diagrams for compliance
- Audit log documentation
- Penetration testing procedures

### Multi-Tenant Pattern Documentation

For each documented pattern, include:
- **Pattern Name** - Clear, memorable identifier
- **Tenant Context** - How the pattern applies in multi-tenant scenarios
- **Tier Variations** - How the pattern differs across tenant tiers
- **Implementation Notes** - Key considerations for implementation
- **Testing Guidance** - How to verify correct multi-tenant behavior
- **Anti-Patterns** - What NOT to do and why

### Knowledge Graph Considerations

- Connect tenant concepts to related patterns and implementations
- Link compliance requirements to technical controls
- Map features to the modules that implement them
- Track which tenants use which features for impact analysis

## Application Guidelines

When establishing platform documentation:
1. Create central repository for all architecture documentation before implementation begins
2. Define documentation standards and templates for consistency across modules
3. Assign module owners responsible for keeping documentation current
4. Link documentation to relevant code locations for traceability
5. Version documentation alongside code to maintain alignment

When documenting multi-tenant patterns:
1. Include tenant context in every pattern description
2. Document tier variations showing how patterns differ across Free/Pro/Enterprise
3. Provide implementation notes with key multi-tenant considerations
4. Add testing guidance for verifying correct tenant isolation
5. Document anti-patterns explaining what NOT to do and why

---

## Outputs

| Deliverable | Format | Template |
|-------------|--------|----------|
| Architecture Knowledge Base | Markdown | N/A |
| Module Catalog | Markdown | `module-catalog-template.md` |
| Architecture Decision Records | Markdown | `adr-template.md` |
| Shared Kernel Documentation | Markdown | `shared-kernel-template.md` |

## Related Workflows

- `create-master-architecture` - Create the frozen master architecture document
- `scaffold-foundation` - Scaffold the initial platform foundation
- `validate-foundation` - Validate foundation against QG-F1 quality gate

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Platform patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `platform-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "platform engineering architecture patterns {date}"
- Search: "multi-tenant platform isolation strategies {date}"
- Search: "modular monolith vs microservices decision framework {date}"
