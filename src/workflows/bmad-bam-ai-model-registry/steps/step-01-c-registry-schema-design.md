# Step 1: Registry Schema Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design the model metadata schema, version control strategy, and lineage tracking for the centralized model registry.

---

## Prerequisites

- Agent runtime architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Define Model Metadata Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| model_id | string | Yes | Unique identifier |
| name | string | Yes | Human-readable name |
| version | semver | Yes | Semantic version |
| provider | enum | Yes | Model provider |
| type | enum | Yes | Chat/Completion/Embedding |
| parameters | object | No | Model parameters |
| created_at | datetime | Yes | Creation timestamp |
| tenant_id | string | No | Owner (null for platform) |

### 2. Design Version Control Strategy

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Semantic Versioning | Major.Minor.Patch | Model updates |
| Git-style Hash | Content-addressable | Prompt versions |
| Timestamp-based | Auto-incrementing | Config snapshots |

### 3. Configure Lineage Tracking

| Lineage Type | Tracked Data | Storage |
|--------------|--------------|---------|
| Training | Dataset, hyperparameters | Metadata store |
| Deployment | Environment, timestamp | Audit log |
| Usage | Requests, performance | Metrics store |

**Verify current best practices with web search:**
Search the web: "ML model registry schema design {date}"
Search the web: "model versioning best practices MLOps {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into schema or versioning
- **P (Party Mode)**: Bring MLOps and data engineering perspectives
- **C (Continue)**: Accept schema design and proceed to access control
```

#### If 'C' (Continue):
- Save registry schema to output document
- Proceed to next step: `step-02-c-access-control-design.md`

---

## Verification

- [ ] Metadata schema defined
- [ ] Version control strategy selected
- [ ] Lineage tracking configured

---

## Outputs

- Registry schema specification
- Versioning strategy document

---

## Next Step

Proceed to `step-02-c-access-control-design.md` to design access controls.
