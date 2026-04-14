# Step 2: Tenant Isolation Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Ensure tenant data isolation throughout the entire ETL pipeline.

---

## Prerequisites

- Step 1 completed (Pipeline Architecture)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-security`

---


## Inputs

- Pipeline architecture from Step 1
- Tenant model configuration
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Ensure tenant data isolation throughout the pipeline:

## Tenant Context Injection

```yaml
context_injection:
  extraction_phase:
    method: Parameter injection
    implementation:
      - Tenant ID from job parameters
      - Tenant context in connection config
      - RLS policy activation on connect
      
  propagation:
    method: Context carrier
    fields:
      - tenant_id: Required in all records
      - extraction_timestamp: For audit
      - source_system: For lineage
      
  validation:
    at_extraction: Verify tenant ownership
    at_transform: Validate context present
    at_load: Confirm isolation before write
```

## Data Partitioning Strategies

```yaml
partitioning:
  physical:
    strategy: Tenant-based partitions
    benefits:
      - Efficient tenant-specific queries
      - Easy tenant data deletion
      - Isolation at storage level
      
  logical:
    strategy: Tenant ID column filtering
    enforcement:
      - Query filters always include tenant_id
      - RLS policies on destination tables
      
  hybrid:
    strategy: Tenant type determines partition
    rules:
      ENTERPRISE: Dedicated partition
      PRO: Shared partition with RLS
      FREE: Shared partition with RLS
```

## Isolated Processing Environments

```yaml
processing_isolation:
  compute_isolation:
    ENTERPRISE:
      dedicated_workers: true
      resource_pool: tenant-specific
      
    PRO:
      shared_workers: true
      resource_limits: per-tenant quotas
      
    FREE:
      shared_workers: true
      resource_limits: strict quotas
      
  memory_isolation:
    strategy: Process-level isolation
    implementation:
      - Separate worker processes per tenant
      - Memory limits enforced by orchestrator
      - No shared state between tenants
      
  temporary_storage:
    strategy: Tenant-prefixed paths
    cleanup: Automatic after pipeline completion
    encryption: Tenant-specific keys
```

## Tenant-Scoped Credentials

```yaml
credentials_management:
  vault_integration:
    provider: HashiCorp Vault / AWS Secrets Manager
    structure: /secrets/tenants/{tenant_id}/{credential_type}
    
  credential_types:
    - database_connections
    - api_keys
    - encryption_keys
    - oauth_tokens
    
  access_control:
    method: Dynamic secrets
    ttl: Pipeline duration + buffer
    audit: All access logged with tenant context
```

## Cross-Tenant Prevention

```yaml
cross_tenant_prevention:
  design_principles:
    - No tenant data in shared caches
    - No tenant IDs in logs (use masked IDs)
    - No tenant data in error messages
    
  runtime_checks:
    - Validate tenant context before every operation
    - Assert tenant_id matches expected value
    - Fail-fast on tenant mismatch
    
  code_patterns:
    - All queries MUST include tenant_id filter
    - No SELECT * without tenant filter
    - Stored procedures enforce tenant context
```

## Audit Trail

```yaml
audit_trail:
  events_captured:
    - Pipeline start/end with tenant context
    - Data extraction count per source
    - Transform operations applied
    - Load record counts
    - Any errors or warnings
    
  storage:
    location: Tenant-scoped audit logs
    retention: Per compliance requirements
    format: Structured JSON with tenant_id
    
  access_logging:
    - Who initiated pipeline
    - What data was accessed
    - When operations occurred
    - Where data was loaded
```

**Verify current best practices with web search:**
Search the web: "multi-tenant data isolation best practices {date}"
Search the web: "ETL tenant isolation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant isolation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for isolation analysis
- **C (Continue)**: Accept isolation design and proceed to error handling
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass isolation context: context injection, partitioning, credentials
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into isolation summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation design for ETL pipelines: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant isolation design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-error-handling.md`

---

## Verification

- [ ] Context injection defined
- [ ] Data partitioning established
- [ ] Processing isolation configured
- [ ] Credentials management designed
- [ ] Cross-tenant prevention rules created
- [ ] Audit trail specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant isolation specification
- Context propagation design
- Audit requirements

---

## Next Step

Proceed to `step-03-c-error-handling.md` to define error handling.
