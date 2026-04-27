# Step 1: Initialize API Versioning Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize API versioning design and select versioning strategy
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load facade contracts, master architecture, and API patterns
- 🚫 Do NOT: Skip strategy selection or proceed without explicit choice
- ⚠️ Gate: API versioning informs QG-I1 (Convergence Gate)
- 🔍 Use web search: Verify versioning strategies against current best practices

---

## CONTEXT BOUNDARIES

### Primary Domain

- **API Domain:** `{project-root}/_bmad/bam/data/domains/api.md`
- Contains: API design patterns, versioning strategies, contract evolution

### Required Artifacts

- **Master Architecture:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Module inventory, API surface, integration patterns
- **Facade Contracts:** `{output_folder}/planning-artifacts/facade-*-contract.md`
- Contains: Operation definitions, schema versions, API contracts

### Pattern Registry

- **API Patterns:** `{project-root}/_bmad/bam/data/patterns/api.md`
- Contains: Versioning strategies, deprecation patterns, migration approaches

- **Tenant Patterns:** `{project-root}/_bmad/bam/data/patterns/tenant.md`
- Contains: Per-tenant version pinning, tier-based version access

---

## YOUR TASK

Initialize API versioning design by loading existing facade contracts and API specifications. Select the appropriate versioning strategy (URL path, header, or query parameter) based on multi-tenant requirements and client ecosystem needs.

---

## Prerequisites

- [ ] Master architecture document exists with module inventory
- [ ] At least one facade contract exists with API operations
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] API client ecosystem understood (web, mobile, third-party)

---

## Main Sequence

### Action 1: Load API Domain Context

**Read and internalize:**

```
{project-root}/_bmad/bam/data/domains/api.md
```

Key concepts to understand:
- API versioning strategies and trade-offs
- Multi-tenant version considerations
- Client compatibility requirements
- Deprecation lifecycle management

### Action 2: Load Facade Contracts and API Specifications

**Scan for existing API artifacts:**

```
{output_folder}/planning-artifacts/facade-*-contract.md
{output_folder}/api/openapi-*.yaml
```

Extract the following information:

| Setting | Value |
|---------|-------|
| Total Facade Contracts | (count from artifacts) |
| Total API Operations | (count across contracts) |
| Current Version Format | (if any exists) |
| Tenant Model | (from master architecture) |
| API Client Types | (web/mobile/third-party) |

### Action 3: Present Versioning Strategy Options

**Display versioning strategy selection:**

```
API Versioning Strategies:

┌─────┬────────────────────┬──────────────────────────────────────────────────┐
│ #   │ Strategy           │ Description                                      │
├─────┼────────────────────┼──────────────────────────────────────────────────┤
│ 1   │ URL Path           │ /api/v1/resource - Most visible, cache-friendly  │
│ 2   │ Header             │ X-API-Version: 1 - Clean URLs, requires header   │
│ 3   │ Query Parameter    │ /api/resource?version=1 - Easy testing, visible  │
│ 4   │ Content Negotiation│ Accept: application/vnd.api+json;version=1       │
│ 5   │ Hybrid             │ URL path for major, header for minor versions    │
└─────┴────────────────────┴──────────────────────────────────────────────────┘

Multi-Tenant Considerations:
┌─────────────────────────────────┬────────────────────────────────────────────┐
│ Factor                          │ Impact on Strategy Selection               │
├─────────────────────────────────┼────────────────────────────────────────────┤
│ Tenant Version Pinning          │ Header allows per-tenant override          │
│ Tier-Based Features             │ May need version + tier routing            │
│ Third-Party Integrations        │ URL path often preferred for clarity       │
│ Mobile Clients                  │ Consider long-lived version support        │
└─────────────────────────────────┴────────────────────────────────────────────┘

Enter strategy number or 'C' for custom configuration:
```

Wait for user selection.

### Action 4: Validate Strategy Selection

**After user selects strategy, validate compatibility:**

| Check | Status | Notes |
|-------|--------|-------|
| Compatible with API gateway | | {gateway supports selected strategy} |
| Client ecosystem support | | {clients can implement strategy} |
| Multi-tenant routing compatible | | {tenant context preserved} |
| Cache strategy aligned | | {CDN/caching works with approach} |

**If compatibility issues found:**
```
================================================================================
VERSIONING STRATEGY WARNING
================================================================================
Selected Strategy: {strategy}
Compatibility Issue: {issue_description}

Options:
[R] Select different strategy
[O] Override with documented exception
[H] Hybrid approach combining strategies
================================================================================
```

### Action 5: Define Version Format

**Establish version numbering scheme:**

| Component | Format | Description |
|-----------|--------|-------------|
| Major Version | v{N} | Breaking changes (v1, v2, v3) |
| Minor Version | {N}.{M} | Non-breaking additions (1.1, 1.2) |
| Patch Version | {N}.{M}.{P} | Bug fixes only (1.1.1, 1.1.2) |

**Version Format Decision:**

```
Version Numbering Options:

┌─────┬───────────────┬────────────────────────────────────────────────────────┐
│ #   │ Format        │ Use Case                                               │
├─────┼───────────────┼────────────────────────────────────────────────────────┤
│ 1   │ Major Only    │ v1, v2 - Simple, clear breaking changes                │
│ 2   │ Semver Full   │ 1.2.3 - Precise, complex management                    │
│ 3   │ Date-Based    │ 2026-04-26 - Time-based releases                       │
│ 4   │ Semver Major  │ v1.2 - Balance of clarity and precision                │
└─────┴───────────────┴────────────────────────────────────────────────────────┘

Recommended: {recommendation based on client ecosystem}

Select format number:
```

### Action 6: Identify Current API Surface

**Catalog existing APIs requiring versioning:**

| Facade | Operations | Current Version | Clients | Priority |
|--------|------------|-----------------|---------|----------|
| {Facade1} | {op_count} | {version/none} | {clients} | {high/med/low} |
| {Facade2} | {op_count} | {version/none} | {clients} | {high/med/low} |

### Action 7: Web Research Verification

**Verify current best practices with web search:**

Search the web: "API versioning best practices multi-tenant SaaS {date}"
Search the web: "REST API versioning strategies comparison {date}"
Search the web: "API versioning URL vs header {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 1 complete: Versioning strategy and format selected.**

Present summary and ask for confirmation:

```
API Versioning Setup Summary:

Versioning Strategy: {selected_strategy}
Version Format: {selected_format}
Current Version: {initial_version}

API Surface:
- Facade Contracts: {count} identified
- Total Operations: {op_count} to version
- Client Types: {client_list}

Multi-Tenant Impact:
- Tenant Version Pinning: {supported/not applicable}
- Tier-Based Versions: {applicable/not applicable}
- Per-Tenant Override: {strategy supports/does not support}

Ready to proceed to version lifecycle design? (y/n)
```

---

## SUCCESS METRICS

- ✅ API domain context loaded and understood
- ✅ Facade contracts and API specs reviewed
- ✅ User selected versioning strategy explicitly
- ✅ Version format established (semver/major/date)
- ✅ Current API surface cataloged
- ✅ Multi-tenant considerations evaluated
- ✅ Web research performed for current patterns
- ✅ User confirmed strategy selection

---

## FAILURE MODES

- ❌ **No facade contracts:** Cannot proceed without API definitions
- ❌ **No strategy selection:** User must explicitly choose versioning approach
- ❌ **Incompatible strategy:** API gateway or clients cannot support selection
- ❌ **Missing tenant context:** Multi-tenant implications not evaluated

---

## Outputs

- Selected versioning strategy (URL path, header, query param, hybrid)
- Version format (major only, semver, date-based)
- Initial version designation (v1, 1.0.0, etc.)
- API surface inventory with priorities
- Multi-tenant version considerations

**Note:** Full API versioning design document created in later steps using:
`{project-root}/_bmad/bam/data/templates/api-version.md`

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` with:
- Versioning strategy: `{selected_strategy}`
- Version format: `{selected_format}`
- Initial version: `{initial_version}`
- API surface inventory
- Multi-tenant considerations

The analysis step will design the version lifecycle including deprecation policies and sunset timelines.
