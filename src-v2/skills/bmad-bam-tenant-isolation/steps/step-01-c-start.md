# Step 1: Gather Isolation Requirements

## MANDATORY EXECUTION RULES

- 🛑 NEVER generate isolation design without loading tenant domain context first
- 📖 ALWAYS read master architecture to understand selected tenant model
- 🔄 ALWAYS gather requirements for ALL 8 isolation dimensions
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ PRESENT isolation matrix template before proceeding
- 📋 CONFIRM each dimension has explicit requirements or "shared" designation
- 💬 PAUSE after matrix is populated for user confirmation
- 🌐 USE web search to verify current isolation best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Gather tenant isolation requirements across 8 dimensions
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load tenant domain and master architecture first
- 🚫 Do NOT: Skip any isolation dimension
- ⚠️ Gate: QG-M2 (Tenant Isolation Gate) governs this workflow
- 🔍 Use web search: Verify patterns against current best practices

---

## CONTEXT BOUNDARIES

### Primary Domain

- **Tenant Domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- Contains: 8-dimension isolation matrix, tenant context propagation, decision criteria

### Required Artifacts

- **Master Architecture:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Selected tenant model (RLS, schema, database, hybrid)

### Pattern Registry

- **Tenant Models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- Contains: Model characteristics, compliance fit, isolation strength, web queries

---

## YOUR TASK

Gather explicit isolation requirements for each of the 8 dimensions. The selected tenant model from master architecture sets the baseline, but each dimension may have specific overrides based on compliance, performance, or cost requirements.

---

## Prerequisites

- [ ] Master architecture document exists with tenant model selected
- [ ] User has access to compliance requirements
- [ ] Tenant tier definitions available (Free, Pro, Enterprise)

---

## Main Sequence

### Action 1: Load Tenant Domain Context

**Read and internalize:**

```
{project-root}/_bmad/bam/data/domains/tenant.md
```

Key concepts to understand:
- 8-dimension isolation matrix
- Tenant context propagation flow
- Decision matrix for model selection

### Action 2: Load Master Architecture

**Read and extract tenant model:**

```
{output_folder}/planning-artifacts/master-architecture.md
```

Document the selected tenant model:

| Setting | Value |
|---------|-------|
| Tenant Model | (RLS / Schema / Database / Hybrid) |
| Primary Reasoning | (from architecture) |
| Compliance Requirements | (from architecture) |
| Expected Tenant Count | (from architecture) |

### Action 3: Load Tenant Models Pattern Registry

**Read and filter relevant patterns:**

```
{project-root}/_bmad/bam/data/tenant-models.csv
```

Extract for the selected model:
- Isolation strength
- Compliance fit
- Storage overhead
- Migration complexity
- Web queries for current best practices

### Action 4: Gather Dimension-Specific Requirements

Present the 8-dimension isolation matrix to the user and gather explicit requirements:

#### 8-Dimension Isolation Matrix Template

| Dimension | Description | Options | Selected | Justification |
|-----------|-------------|---------|----------|---------------|
| **Data** | How tenant data is separated | Row-level (RLS), Schema-level, Database-level | | |
| **Compute** | How processing resources are shared | Shared pools, Pooled (tier-based), Dedicated | | |
| **Network** | Network boundary isolation | Shared VPC, Dedicated subnet, Dedicated VPC | | |
| **Identity** | Authentication provider isolation | Shared IdP, Tenant-configured IdP, BYOI (Bring Your Own Identity) | | |
| **Billing** | Financial data separation | Shared metering, Tenant-scoped invoicing, Dedicated payment isolation | | |
| **Limits** | Resource constraint enforcement | Global quotas, Tier-based limits, Custom resource caps | | |
| **Audit** | Log and compliance data separation | Shared logs (tenant-tagged), Tenant-scoped streams, Dedicated audit store | | |
| **Config** | Configuration and customization | Shared defaults, Tenant overrides, Full customization | | |

**For each dimension, ask:**

1. What is the baseline from the selected tenant model?
2. Are there tier-specific overrides? (Free vs Pro vs Enterprise)
3. What compliance requirements affect this dimension?
4. What are the cost constraints?

### Action 5: Document Tier-Specific Variations

If hybrid or tiered isolation is needed, document variations:

| Dimension | Free Tier | Pro Tier | Enterprise Tier |
|-----------|-----------|----------|-----------------|
| Data | RLS | RLS | Schema or Database |
| Compute | Shared | Pooled | Dedicated option |
| Network | Shared VPC | Shared VPC | Dedicated subnet |
| Identity | Shared IdP | Tenant IdP | BYOI |
| Billing | Shared meter | Scoped invoice | Payment isolation |
| Limits | Strict caps | Higher limits | Custom SLA |
| Audit | Shared logs | Scoped streams | Dedicated store |
| Config | Defaults only | Overrides | Full custom |

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "multi-tenant isolation patterns SaaS {date}"
Search the web: "PostgreSQL RLS best practices {date}"
Search the web: "tenant isolation compliance requirements {date}"

Use `web_queries` column from `tenant-models.csv` for model-specific searches.

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-6 complete the isolation requirements gathering.**

Present the populated 8-dimension matrix and ask for confirmation:

```
Isolation Requirements Summary:
- Tenant Model: {selected}
- Primary Data Isolation: {dimension value}
- Tier Variations: {yes/no}
- Compliance Drivers: {list}

Ready to proceed to analysis? (y/n)
```

---

## SUCCESS METRICS

- ✅ Tenant domain context loaded and understood
- ✅ Master architecture reviewed, tenant model extracted
- ✅ All 8 isolation dimensions have explicit values
- ✅ Tier variations documented (if applicable)
- ✅ Compliance requirements mapped to dimensions
- ✅ Web research performed for current patterns
- ✅ User confirmed isolation requirements

---

## FAILURE MODES

- ❌ **No master architecture:** Cannot proceed without tenant model selection
- ❌ **Missing dimensions:** Each dimension must have explicit value or "shared" designation
- ❌ **Compliance gaps:** Regulated industries require audit, data, and identity dimensions addressed
- ❌ **Tier conflicts:** Inconsistent isolation levels across tiers without migration path
- ❌ **Cost misalignment:** Selected isolation exceeds budget constraints

---

## Outputs

- Populated 8-dimension isolation matrix
- Tier variation table (if applicable)
- Compliance-to-dimension mapping
- Requirements confirmation

**Note:** Full design document created in later steps using:
`{project-root}/_bmad/bam/data/templates/tenant-isolation.md`

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` with:
- Isolation requirements matrix
- Tier variations (if any)
- Compliance constraints

The analysis step will validate requirements against QG-M2 criteria and identify potential conflicts.
