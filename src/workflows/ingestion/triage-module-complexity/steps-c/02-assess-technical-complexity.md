# Step 2: Assess Technical Complexity

Evaluate technical complexity factors for each module:

## Assessment Questions (Technical)

### Q1: Entity Count
How many aggregate roots / entities does this module manage?
- **0 (Simple):** 1-3 entities
- **1 (Standard):** 4-7 entities
- **2 (Complex):** 8+ entities

### Q2: Business Rules
How complex are the domain invariants?
- **0 (Simple):** Basic CRUD operations, minimal validation
- **1 (Standard):** Moderate business logic, state machines, conditional rules
- **2 (Complex):** Complex domain rules, multi-step workflows, heavy invariant enforcement

### Q3: AI Involvement
Does this module have AI behaviors?
- **0 (Simple):** No AI components
- **1 (Standard):** Basic AI integration (single agent, standard prompts)
- **2 (Complex):** Multi-agent orchestration, custom evaluation, complex prompt chains

### Q4: Data Volume
What is the expected data scale?
- **0 (Simple):** Low volume, single-tenant scale
- **1 (Standard):** Moderate volume, basic multi-tenant
- **2 (Complex):** High volume, partitioning needs, time-series data

**Output:** Technical complexity scores (Q1-Q4) with justification for each.

Document specific evidence from requirements that supports each score.
