# Step 3: Design Backward Compatibility

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER design compatibility rules without Step 02 lifecycle context
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Define breaking vs non-breaking change classifications
- 📋 Document response schema evolution with tenant impact assessment
- 💬 Present compatibility design with A/P/C menu for user confirmation
- 🌐 Use web search to verify current API compatibility best practices

---

## EXECUTION PROTOCOLS

- 🎯 Design backward compatibility strategy for API evolution
- 💾 Record compatibility design in working document for Step 04
- 📖 Reference `patterns/api.md` for evolution patterns
- 📖 Reference `patterns/tenant.md` for tenant-specific compatibility
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag changes that require tenant migration coordination
- 🔍 Use web search to verify compatibility patterns against current practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Version lifecycle from Step 02
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/api.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/schema.md`
- **Output:** Backward compatibility design with schema evolution rules
- **Quality gate:** Compatibility rules inform QG-I1 contract validation

---

## YOUR TASK

Design backward compatibility strategy including clear classifications of breaking vs non-breaking changes, response schema evolution rules, request validation versioning, and default version negotiation for multi-tenant API consumers.

---

## Main Sequence

### 1. Define Breaking vs Non-Breaking Changes

Establish clear classification criteria for API changes:

| Change Type | Classification | Tenant Impact | Action Required |
|-------------|----------------|---------------|-----------------|
| Remove endpoint | Breaking | High | Migration required |
| Rename endpoint | Breaking | High | Migration required |
| Add required request field | Breaking | High | Client update |
| Remove response field | Breaking | Medium | Client update |
| Change field type | Breaking | High | Client update |
| Add optional request field | Non-breaking | None | Optional adoption |
| Add response field | Non-breaking | None | Graceful handling |
| Add new endpoint | Non-breaking | None | Optional adoption |
| Change default value | Context-dependent | Varies | Review behavior |

**Breaking Change Classification Template:**

```markdown
### Breaking Change Categories

**BREAKING - Requires Major Version Bump:**

| Category | Examples | Tenant Notification |
|----------|----------|---------------------|
| Structural Removal | Endpoint removed, field removed | 90+ days notice |
| Type Change | string→number, array→object | 90+ days notice |
| Semantic Change | Field meaning changed | 90+ days notice |
| Auth/Authz Change | New permissions required | 60+ days notice |
| Error Code Change | Code meanings changed | 60+ days notice |
| Validation Tightening | Stricter input validation | 30+ days notice |

**NON-BREAKING - Minor or Patch Version:**

| Category | Examples | Tenant Notification |
|----------|----------|---------------------|
| Additive Fields | New optional request/response fields | Changelog only |
| New Endpoints | Additional API operations | Changelog only |
| Validation Relaxing | Accept broader input | Changelog only |
| Default Changes | New default values (careful!) | Changelog + docs |
| Performance | Faster responses | None required |
| Documentation | Updated descriptions | None required |

**CONTEXT-DEPENDENT - Requires Analysis:**

| Category | Examples | Analysis Required |
|----------|----------|-------------------|
| Default Value | New default where none existed | Check client behavior |
| Null Handling | null vs undefined behavior | Check client handling |
| Array Ordering | Order guarantee added/removed | Check client assumptions |
| Pagination | Default page size change | Check client pagination |
```

Search the web: "REST API breaking change definition {date}"

---

### 2. Design Response Schema Evolution

Define rules for evolving response schemas without breaking clients:

| Evolution Type | Allowed | Versioning | Client Impact |
|----------------|---------|------------|---------------|
| Add optional field | Yes | Minor | Ignore unknown |
| Add nested object | Yes | Minor | Ignore unknown |
| Remove field | No | Major | Break if used |
| Rename field | No | Major | Break on access |
| Change type | No | Major | Parse error |
| Add enum value | Context | Minor | May break strict |
| Remove enum value | No | Major | Invalid data |

**Response Schema Evolution Template:**

```markdown
### Response Evolution Rules

**Safe Evolutions (Non-Breaking):**

```json
// v1.0 Response
{
  "id": "123",
  "name": "Resource"
}

// v1.1 Response (additive - safe)
{
  "id": "123",
  "name": "Resource",
  "created_at": "2026-04-26T10:00:00Z",  // New field - ignored by old clients
  "metadata": {                           // New object - ignored by old clients
    "tenant_id": "tenant_abc"
  }
}
```

**Breaking Evolutions (Require Major Version):**

```json
// v1 Response
{
  "user_name": "john_doe",
  "status": "active"
}

// v2 Response (breaking changes)
{
  "username": "john_doe",     // Renamed: user_name → username
  "state": "active",          // Renamed: status → state
  "profile": {                // Restructured: flat → nested
    "display_name": "John"
  }
}
```

**Tenant Context Evolution:**

All responses MUST include tenant context that evolves safely:

```json
// All versions include tenant context
{
  "tenant_id": "tenant_abc",      // Always present
  "tenant_tier": "enterprise",    // Added in v1.1, optional in v1.0
  "data": { ... }
}
```
```

Search the web: "API response schema evolution patterns {date}"

---

### 3. Design Request Validation Versioning

Define how request validation evolves across versions:

| Validation Change | Version Impact | Migration Strategy |
|-------------------|----------------|-------------------|
| Add required field | Major | Provide migration period |
| Remove required field | Minor | Accept both |
| Tighten validation | Context | Grace period |
| Loosen validation | Minor | Accept broader |
| Change format | Major | Support both during transition |

**Request Validation Versioning Template:**

```markdown
### Request Validation Evolution

**Version-Aware Validation:**

| Version | Field | Validation | Notes |
|---------|-------|------------|-------|
| v1 | email | string | No format check |
| v2 | email | email format | Stricter validation |
| v1 | tenant_id | required | Injected by middleware |
| v2 | tenant_id | required | Injected by middleware |

**Validation Relaxation (Safe):**
```yaml
# v1 - stricter
field: username
validation:
  type: string
  minLength: 5
  maxLength: 20
  pattern: "^[a-z]+$"

# v2 - relaxed (safe, accepts more)
field: username
validation:
  type: string
  minLength: 3
  maxLength: 50
  pattern: "^[a-zA-Z0-9_]+$"
```

**Validation Tightening (Breaking):**
```yaml
# v1 - accepts more
field: description
validation:
  type: string
  maxLength: 5000

# v2 - stricter (breaking for long descriptions)
field: description
validation:
  type: string
  maxLength: 1000
  # Requires deprecation period!
```

**Grace Period Strategy:**

| Change | Grace Period | Behavior During Grace |
|--------|--------------|----------------------|
| New required field | 90 days | Accept requests without field, return warning |
| Tighter validation | 60 days | Log warning, accept old format |
| Format change | 90 days | Accept both formats |
```

Search the web: "API request validation versioning {date}"

---

### 4. Design Default Version Negotiation

Define how the system determines which API version to use:

| Priority | Source | Example | Tenant Override |
|----------|--------|---------|-----------------|
| 1 | Request Header | `X-API-Version: 2.0` | Allowed |
| 2 | Query Parameter | `?api_version=2.0` | Allowed |
| 3 | Tenant Configuration | Pinned version | N/A |
| 4 | Tenant Default | Tenant's default | N/A |
| 5 | System Default | Platform default | N/A |

**Version Negotiation Template:**

```markdown
### Version Resolution Algorithm

**Resolution Order:**
```
1. Check request header: X-API-Version
2. Check query parameter: ?api_version
3. Check tenant pinned version in tenant_config
4. Check tenant default version in tenant_config
5. Use system default version

For each candidate version:
- Verify version exists
- Verify version is not sunset
- Verify tenant tier allows version access
- Verify tenant override permission (if explicit)
```

**Version Resolution Flow:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Version Resolution Flow                                │
│                                                                              │
│  Request ──► Check Header ──► Check Query ──► Check Tenant ──► System       │
│     │            │                │               │            Default       │
│     │            │                │               │               │          │
│     │            ▼                ▼               ▼               ▼          │
│     │      X-API-Version    ?api_version   tenant_config    platform_      │
│     │          2.1              2.0         pinned: 1.5      default: 2.0   │
│     │            │                │               │               │          │
│     │            └────────────────┴───────────────┴───────────────┘          │
│     │                              │                                          │
│     │                              ▼                                          │
│     │                    ┌────────────────────┐                              │
│     │                    │ Version Validator  │                              │
│     │                    │ - Exists?          │                              │
│     │                    │ - Not sunset?      │                              │
│     │                    │ - Tier allowed?    │                              │
│     │                    │ - Override ok?     │                              │
│     │                    └────────────────────┘                              │
│     │                              │                                          │
│     └──────────────────────────────┴──────────────────────────────────────────│
│                                    ▼                                          │
│                           Resolved Version                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Error Responses:**

| Condition | Status | Response |
|-----------|--------|----------|
| Version not found | 400 | `{"error": "invalid_version", "available": ["1.0", "2.0"]}` |
| Version sunset | 410 | `{"error": "version_sunset", "successor": "2.0"}` |
| Tier not allowed | 403 | `{"error": "version_tier_restricted", "required_tier": "enterprise"}` |
| Override not allowed | 403 | `{"error": "version_override_disabled"}` |
```

Search the web: "API version negotiation content negotiation {date}"

---

### 5. Design Compatibility Testing Strategy

Define how to verify backward compatibility:

| Test Type | Purpose | Automation |
|-----------|---------|------------|
| Contract tests | Verify schema compatibility | Consumer-driven |
| Regression tests | Ensure old behavior works | CI/CD pipeline |
| Migration tests | Validate upgrade path | Manual + automated |
| Sunset tests | Confirm version removed | Post-sunset verification |

**Compatibility Testing Template:**

```markdown
### Backward Compatibility Test Matrix

**Contract Tests:**
| Test | Description | Trigger |
|------|-------------|---------|
| Response schema additive | New fields don't break parsers | Every deploy |
| Request schema backward | Old requests still accepted | Every deploy |
| Error contract stable | Error codes unchanged | Every deploy |
| Tenant context present | All responses include tenant_id | Every deploy |

**Upgrade Path Tests:**
| Migration | Test Scenario | Success Criteria |
|-----------|---------------|------------------|
| v1 → v2 | v1 client against v2 | No errors on unchanged operations |
| v2 → v3 | v2 client against v3 | Graceful handling of new fields |

**Tenant Compatibility Matrix:**
| Tenant Tier | v1 | v2 | v3 (preview) |
|-------------|----|----|--------------|
| Free | ✓ | ✓ | ✗ |
| Pro | ✓ | ✓ | ✗ |
| Enterprise | ✓ | ✓ | ✓ (opt-in) |
```

---

## COLLABORATION MENUS (A/P/C)

After presenting complete compatibility design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific compatibility questions
- **P (Party Mode)**: Bring API, QA, and client ecosystem perspectives
- **C (Continue)**: Accept compatibility design and proceed to migration step

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Breaking change edge cases:** Are all breaking changes identified?
- **Schema evolution:** How to handle deeply nested objects?
- **Validation grace periods:** Are timelines sufficient?
- **Version negotiation:** Edge cases in resolution?
- **Testing coverage:** What compatibility tests are missing?

Pass context: Version lifecycle from Step 02, current compatibility analysis.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review API backward compatibility design for:
Versioning Strategy: {strategy}
Breaking Change Rules: {classification}
Schema Evolution: {rules}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| API Architect | Compatibility rules | Are rules comprehensive and clear? |
| QA Engineer | Testing strategy | Can compatibility be verified? |
| SDK Developer | Client impact | How will SDKs handle changes? |
| Customer Success | Tenant migration | Will customers accept timelines? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the compatibility design in working document:

```yaml
# Add to api-versioning-design.md
breaking_changes:
  structural_removal: breaking
  type_change: breaking
  semantic_change: breaking
  additive_fields: non_breaking
  new_endpoints: non_breaking
schema_evolution:
  add_optional_field: allowed
  remove_field: major_version
  change_type: major_version
request_validation:
  relaxation: safe
  tightening: requires_grace_period
  grace_period_days: 60
version_negotiation:
  priority_order: [header, query, tenant_pinned, tenant_default, system_default]
  error_handling: documented
compatibility_testing:
  contract_tests: required
  regression_tests: required
  migration_tests: required
design_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design  # Add this
currentStep: step-04-c-document
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Breaking vs non-breaking changes clearly classified
- ✅ Response schema evolution rules defined
- ✅ Request validation versioning documented
- ✅ Default version negotiation designed
- ✅ Compatibility testing strategy established
- ✅ Web search performed for compatibility patterns
- ✅ Step 02 lifecycle context referenced
- ✅ User confirmed design via A/P/C menu
- ✅ Design recorded in working document

---

## FAILURE MODES

- ❌ Skipping breaking change classification - unclear migration requirements
- ❌ Designing without Step 02 context - no lifecycle foundation
- ❌ Missing version negotiation - clients cannot select version
- ❌ No compatibility testing - regressions possible
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current best practices

---

## NEXT STEP

After user confirms compatibility design with 'C':

1. Record the design in working document
2. Proceed to `step-04-c-document.md` to design version migration strategy
3. The design informs:
   - Tenant migration notifications
   - Gradual rollout by tier
   - Version analytics and adoption tracking
   - Emergency rollback procedures

**Transition to Step 04 with:**
- Breaking change classification: `{change_rules}`
- Schema evolution rules: `{evolution_rules}`
- Validation versioning: `{validation_rules}`
- Version negotiation: `{negotiation_spec}`
- Testing strategy: `{testing_plan}`
