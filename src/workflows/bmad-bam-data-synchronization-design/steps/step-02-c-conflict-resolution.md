# Step 2: Conflict Resolution

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices

---

## Purpose

Design conflict resolution strategies for concurrent data modifications.

---

## Prerequisites

- Step 1: Sync Patterns completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: data`

---

## Actions

### 1. Conflict Detection Methods

Define conflict detection:

| Method | Detection Timing | Use Case |
|--------|------------------|----------|
| Version Vectors | Write time | Distributed writes |
| Timestamps | Write time | Last-write-wins |
| Hash Comparison | Sync time | Batch reconciliation |
| Logical Clocks | Write time | Causal ordering |

### 2. Resolution Strategies

Configure resolution per data type:

| Data Type | Strategy | Rationale |
|-----------|----------|-----------|
| User Preferences | Last-write-wins | User expectation |
| Document Content | Merge with conflict markers | Preserve both |
| Counter/Aggregates | CRDT (Counter) | Mathematical correctness |
| Configuration | Manual resolution | Business criticality |
| Financial Data | Reject second write | Consistency required |

### 3. Merge Strategies for Complex Objects

Define object merge behavior:

| Object Type | Merge Strategy | Conflict UI |
|-------------|----------------|-------------|
| JSON Documents | Deep merge, flag conflicts | Side-by-side diff |
| Arrays | Union or replace | Choice prompt |
| Nested Objects | Recursive merge | Tree view |
| Binary Data | Replace or reject | Preview both |

### 4. Manual Resolution Workflows

Design human intervention process:

- Conflict notification to data owner
- Resolution deadline (24h default)
- Escalation to admin if unresolved
- Audit trail of resolution decisions

**Verify current best practices with web search:**
Search the web: "conflict resolution distributed data {date}"
Search the web: "CRDT conflict-free replicated data types {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into resolution strategies
- **P (Party Mode)**: Bring data and product perspectives
- **C (Continue)**: Accept conflict resolution and proceed to tenant isolation
```

#### If 'C' (Continue):
- Save conflict resolution to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-isolation.md`

---

## Verification

- [ ] Conflict detection methods defined
- [ ] Resolution strategies specified per data type
- [ ] Merge strategies for complex objects documented
- [ ] Manual resolution workflow designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Conflict resolution design document
- Resolution strategy specification per data type
- Merge strategy configuration
- Manual resolution workflow documentation

---

## Next Step

Proceed to `step-03-c-tenant-isolation.md` to ensure tenant isolation in synchronization.
