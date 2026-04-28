# Step 01: Initialize Scaling Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load tenant model and identify scaling requirements
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Maintain tenant model and compute requirements throughout
- 🚫 Do NOT: Jump to implementation details or specific technologies
- 🔍 Use web search: Verify scaling patterns against cloud-native best practices
- ⚠️ Gate: QG-F1 - Foundation Gate (scaling validated as part of master architecture)

---

## Purpose

Initialize the scaling design workflow by loading the tenant model, identifying compute requirements, and establishing the scaling dimensions that will drive the architecture.

---

## Prerequisites

- Master architecture document exists: `{output_folder}/planning-artifacts/master-architecture.md`
- Tenant model selected (row-level-security, schema-per-tenant, or database-per-tenant)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `scaling-*`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

**Web Research (Required):**

Search the web: "multi-tenant SaaS scaling patterns cloud-native {date}"
Search the web: "horizontal vs vertical scaling decision criteria {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Load Tenant Model Context

Read the master architecture and extract:

| Context Item | Source | Purpose |
|--------------|--------|---------|
| Tenant Isolation Model | master-architecture.md | Determines scaling constraints |
| Tier Definitions | master-architecture.md | Maps to resource allocation |
| Expected Tenant Count | master-architecture.md | Informs capacity planning |
| Peak Load Estimates | master-architecture.md | Drives autoscaling thresholds |

### 2. Identify Compute Requirements

Document compute requirements by module:

| Module | CPU Profile | Memory Profile | I/O Profile | Stateful |
|--------|-------------|----------------|-------------|----------|
| API Gateway | Low | Low | High | No |
| Core Services | Medium | Medium | Medium | No |
| AI Runtime | High | High | Medium | Yes* |
| Background Jobs | Variable | Medium | Low | No |
| Real-time | Low | Low | High | Yes |

*AI Runtime may have GPU requirements

### 3. Reference Scaling Patterns

From `bam-patterns.csv`, identify applicable patterns:

| Pattern ID | Name | When to Apply |
|------------|------|---------------|
| `scale-horizontal` | Horizontal Scaling | Stateless services, read-heavy |
| `scale-vertical` | Vertical Scaling | Database, memory-intensive |
| `scale-tenant-aware` | Tenant-Aware Scaling | Per-tier resource allocation |
| `scale-predictive` | Predictive Scaling | Known usage patterns |

### 4. Establish Scaling Dimensions

| Dimension | Description | Applies To |
|-----------|-------------|------------|
| Horizontal | Add/remove instances | Stateless services |
| Vertical | Increase instance size | Databases, AI workloads |
| Tenant-Aware | Per-tenant resource pools | Enterprise tier isolation |
| Temporal | Time-based scaling | Business hours patterns |

---

## Verification

- [ ] Master architecture loaded and reviewed
- [ ] Tenant model constraints understood
- [ ] Compute requirements documented per module
- [ ] Scaling patterns identified from registry
- [ ] Scaling dimensions established
- [ ] Web research findings documented with citations

---

## Outputs

- Tenant model context summary
- Compute requirements by module
- Applicable scaling patterns
- Scaling dimensions matrix

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-02-c-analyze.md` to design horizontal scaling strategies.
