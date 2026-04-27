# Step 2: Design Version Lifecycle

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER design lifecycle without loading Step 01 versioning strategy first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Define deprecation policy with tenant-aware timelines
- 📋 Document Sunset header implementation requirements
- 💬 Present lifecycle analysis with A/P/C menu for user confirmation
- 🌐 Use web search to verify current API lifecycle best practices

---

## EXECUTION PROTOCOLS

- 🎯 Design version lifecycle including deprecation and sunset policies
- 💾 Record lifecycle analysis in working document for Step 03
- 📖 Reference `patterns/api.md` for lifecycle patterns
- 📖 Reference `patterns/tenant.md` for per-tenant version pinning
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag deprecation timelines that may impact high-value tenants
- 🔍 Use web search to verify lifecycle patterns against current best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Versioning strategy and format from Step 01
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/api.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/tenant.md`
- **Output:** Version lifecycle design with deprecation and tenant policies
- **Quality gate:** Lifecycle design informs QG-I1 (Convergence) readiness

---

## YOUR TASK

Design the complete version lifecycle including version numbering scheme (semver), deprecation policy with defined timelines, Sunset header implementation, and per-tenant version pinning capabilities for multi-tenant SaaS.

---

## Main Sequence

### 1. Define Version Numbering Scheme

Establish semantic versioning rules for the API:

| Version Component | Change Type | Examples | Breaking |
|-------------------|-------------|----------|----------|
| Major (X.0.0) | Breaking changes | Removed endpoints, changed schemas | Yes |
| Minor (0.X.0) | New features, additive | New endpoints, optional fields | No |
| Patch (0.0.X) | Bug fixes, docs | Behavior fixes, typos | No |

**Semver Rules Template:**

```markdown
### API Semantic Versioning Rules

**Major Version Bump (Breaking Change):**
- Endpoint removed or renamed
- Required field added to request
- Field removed from response
- Field type changed
- Authentication/authorization changed
- Error code meanings changed

**Minor Version Bump (Non-Breaking):**
- New endpoint added
- Optional field added to request
- New field added to response
- New error code added
- New query parameter option

**Patch Version Bump (Bug Fix):**
- Bug fix that doesn't change API contract
- Documentation update
- Performance improvement
- Security patch (same behavior)
```

Search the web: "semantic versioning REST API best practices {date}"

---

### 2. Design Deprecation Policy

Define the deprecation timeline and communication process:

| Phase | Duration | Actions | Tenant Notification |
|-------|----------|---------|---------------------|
| Announcement | Day 0 | Mark as deprecated in docs | Email to API users |
| Active Deprecation | 0-6 months | Deprecation header returned | Dashboard warning |
| Sunset Warning | 6-12 months | Increased urgency, usage reports | Direct outreach |
| Sunset | 12+ months | Version removed | Final migration deadline |

**Deprecation Policy Template:**

```markdown
### Deprecation Timeline

**Standard Deprecation (Non-Enterprise):**
| Milestone | Timeline | Headers | Notifications |
|-----------|----------|---------|---------------|
| Deprecation | T+0 | Deprecation: true | Email, docs |
| Sunset Warning | T+6 months | Sunset: {date} | Dashboard, email |
| End of Life | T+12 months | 410 Gone | Final notice |

**Enterprise Deprecation (Extended):**
| Milestone | Timeline | Headers | Notifications |
|-----------|----------|---------|---------------|
| Deprecation | T+0 | Deprecation: true | Account manager |
| Sunset Warning | T+12 months | Sunset: {date} | Direct outreach |
| End of Life | T+24 months | 410 Gone | Migration support |

**Per-Tenant Override:**
- Enterprise tenants may request extended timelines
- Override tracked in tenant configuration
- Maximum extension: {months} beyond standard
```

Search the web: "API deprecation policy best practices {date}"

---

### 3. Design Sunset Header Implementation

Define HTTP header standards for version lifecycle communication:

| Header | Purpose | Example | When Sent |
|--------|---------|---------|-----------|
| Deprecation | Marks deprecated | `Deprecation: true` | Deprecated versions |
| Sunset | End date | `Sunset: Sat, 26 Apr 2027 00:00:00 GMT` | All deprecated responses |
| X-API-Version | Current version | `X-API-Version: 2.1.0` | All responses |
| X-API-Deprecated | Deprecated flag | `X-API-Deprecated: true` | Deprecated versions |

**Sunset Header Implementation Template:**

```markdown
### Response Headers (All API Responses)

**Standard Response:**
```http
HTTP/1.1 200 OK
X-API-Version: 2.1.0
X-Tenant-ID: {tenant_id}
Content-Type: application/json
```

**Deprecated Version Response:**
```http
HTTP/1.1 200 OK
X-API-Version: 1.0.0
X-API-Deprecated: true
Deprecation: true
Sunset: Sat, 26 Apr 2027 00:00:00 GMT
Link: <https://api.example.com/docs/migration/v1-to-v2>; rel="successor-version"
X-Tenant-ID: {tenant_id}
Content-Type: application/json
```

**Post-Sunset Response:**
```http
HTTP/1.1 410 Gone
X-API-Version: 1.0.0
X-API-Sunset: true
Link: <https://api.example.com/v2/resource>; rel="successor-version"
Content-Type: application/json

{
  "error": "version_sunset",
  "message": "API v1 has been sunset. Please migrate to v2.",
  "migration_guide": "https://api.example.com/docs/migration/v1-to-v2",
  "successor_version": "v2"
}
```
```

Search the web: "HTTP Sunset header RFC 8594 implementation {date}"

---

### 4. Design Per-Tenant Version Pinning

Enable tenants to control their API version independently:

| Capability | Description | Multi-Tenant Impact |
|------------|-------------|---------------------|
| Default Version | System default for new requests | Applies to all tenants |
| Tenant Pinned Version | Tenant-specific locked version | Per-tenant configuration |
| Version Override | Request-level version override | Header: X-API-Version |
| Tier Version Access | Certain versions for certain tiers | Feature gating |

**Per-Tenant Version Pinning Template:**

```markdown
### Tenant Version Configuration

**Tenant Config Schema:**
```yaml
tenant_id: "tenant_abc123"
api_config:
  default_version: "2.1.0"        # Tenant's default
  pinned_version: "1.5.0"         # Locked to specific version
  version_override_allowed: true  # Can override via header
  tier: "enterprise"
  extended_deprecation: true      # Extended sunset timeline
  version_history:
    - version: "1.0.0"
      pinned_date: "2025-01-15"
      migration_planned: "2026-06-01"
```

**Version Resolution Order:**
1. Request header (X-API-Version) - if override allowed
2. Tenant pinned version
3. Tenant default version
4. System default version

**Tier-Based Version Access:**
| Tier | Early Access | Extended Deprecation | Version Lock |
|------|--------------|---------------------|--------------|
| Free | No | No | No |
| Pro | No | No | Yes |
| Enterprise | Yes | Yes | Yes |
```

Search the web: "multi-tenant API version management {date}"

---

### 5. Define Version Lifecycle States

Document all possible version states:

| State | Description | Headers | Tenant Access |
|-------|-------------|---------|---------------|
| Preview | Pre-release, unstable | `X-API-Preview: true` | Opted-in only |
| Current | Active, recommended | Standard headers | All tenants |
| Deprecated | Supported but sunset planned | `Deprecation: true` | All tenants |
| Sunset | No longer available | `410 Gone` | None |
| Legacy | Extended for enterprise | `X-API-Legacy: true` | Enterprise only |

**Version Lifecycle State Machine:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        API Version Lifecycle                                 │
│                                                                              │
│   ┌─────────┐    ┌─────────┐    ┌────────────┐    ┌────────┐               │
│   │ Preview │───►│ Current │───►│ Deprecated │───►│ Sunset │               │
│   └─────────┘    └─────────┘    └────────────┘    └────────┘               │
│       │              │                │                                      │
│       │              │                ▼                                      │
│       │              │         ┌────────────┐                               │
│       │              │         │   Legacy   │──► (Enterprise Extended)      │
│       │              │         └────────────┘                               │
│       │              │                                                       │
│       ▼              ▼                                                       │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    Tenant Version Pinning                           │   │
│   │  Tenant can pin to any non-sunset version based on tier             │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## COLLABORATION MENUS (A/P/C)

After presenting complete lifecycle analysis:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific lifecycle questions
- **P (Party Mode)**: Bring API, platform, and customer success perspectives
- **C (Continue)**: Accept lifecycle design and proceed to compatibility step

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Deprecation timelines:** Are 12 months sufficient for all clients?
- **Enterprise exceptions:** What extended timelines are acceptable?
- **Tenant communication:** How will tenants be notified of deprecations?
- **Emergency deprecation:** Process for security-driven rapid deprecation?
- **Version analytics:** How to track tenant version adoption?

Pass context: Versioning strategy from Step 01, current lifecycle analysis.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review API version lifecycle design for:
Versioning Strategy: {strategy}
Deprecation Policy: {timeline}
Per-Tenant Pinning: {enabled/disabled}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| API Architect | Lifecycle completeness | Is versioning strategy comprehensive? |
| Platform Engineer | Implementation | Can infrastructure support version routing? |
| Customer Success | Tenant impact | Will deprecation timelines work for customers? |
| Developer | Usability | Is version management clear for API consumers? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the lifecycle analysis in working document:

```yaml
# Add to api-versioning-analysis.md
versioning_strategy: {strategy}
version_format: semver
deprecation_policy:
  standard_timeline_months: 12
  enterprise_timeline_months: 24
  announcement_required: true
sunset_headers:
  deprecation: true
  sunset: true
  link_successor: true
tenant_version_pinning:
  enabled: true
  override_allowed: true
  tier_restrictions: true
lifecycle_states:
  - preview
  - current
  - deprecated
  - sunset
  - legacy
analysis_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze  # Add this
currentStep: step-03-c-design
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Version numbering scheme (semver) fully defined
- ✅ Deprecation policy with timelines documented
- ✅ Sunset header implementation specified
- ✅ Per-tenant version pinning designed
- ✅ Version lifecycle states defined
- ✅ Web search performed for lifecycle patterns
- ✅ Step 01 versioning strategy referenced
- ✅ User confirmed analysis via A/P/C menu
- ✅ Analysis recorded in working document

---

## FAILURE MODES

- ❌ Skipping deprecation policy - leaves tenants without migration time
- ❌ Analyzing without Step 01 context - no versioning strategy defined
- ❌ Missing Sunset headers - RFC 8594 compliance gap
- ❌ No per-tenant pinning - enterprise customers need version control
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current best practices

---

## NEXT STEP

After user confirms lifecycle analysis with 'C':

1. Record the analysis in working document
2. Proceed to `step-03-c-design.md` to design backward compatibility strategy
3. The analysis informs:
   - Breaking vs non-breaking change definitions
   - Response schema evolution rules
   - Request validation versioning
   - Default version negotiation

**Transition to Step 03 with:**
- Semver rules: `{version_rules}`
- Deprecation timeline: `{deprecation_policy}`
- Sunset headers: `{header_spec}`
- Tenant pinning: `{pinning_config}`
- Lifecycle states: `{state_definitions}`

---

## Outputs

- Analysis findings documented
- Options comparison completed
- Recommendation prepared

