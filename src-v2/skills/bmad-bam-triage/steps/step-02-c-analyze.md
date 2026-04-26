# Step 02: Score Module Complexity

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📊 **CALCULATE scores objectively** using defined criteria

## EXECUTION PROTOCOLS

- 🎯 Focus: Score module complexity across all five dimensions
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Use complexity dimensions from Step 01
- 🚫 Do NOT: Prioritize modules (that's Step 03)
- 🔍 Use web search: Verify complexity scoring criteria against industry standards
- ⚠️ Gate: QG-PL1 - Accurate scoring required for prioritization

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Scoring technical complexity for each module
- Scoring business criticality for each module
- Scoring integration, multi-tenant, and AI complexity
- Calculating weighted composite scores

**OUT OF SCOPE:**
- Prioritizing modules (Step 03)
- Defining implementation phases (Step 04)
- Generating triage report (Step 05)

---

## Purpose

Score each module across the five complexity dimensions established in Step 01. This systematic scoring provides objective data for prioritization decisions in the next step.

---

## Prerequisites

- Step 01 completed: Module list and complexity dimensions established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: complexity
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → for multi-tenant scoring
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → for AI complexity scoring

---

## Inputs

- Module list from Step 01
- Complexity dimensions with weights
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration: `{project-root}/_bmad/bam/config.yaml`

---

## YOUR TASK:

Score each module across all five complexity dimensions using defined criteria.

---

## Main Sequence

### 1. Technical Complexity Scoring

For each module, assess technical complexity:

| Factor | Weight | Score Criteria |
|--------|--------|---------------|
| Dependencies | 30% | 1-3: <5 deps, 4-6: 5-15 deps, 7-10: >15 deps |
| Technology Stack | 25% | 1-3: Standard, 4-6: Specialized, 7-10: Novel/Cutting-edge |
| Integration Points | 25% | 1-3: <3 points, 4-6: 3-8 points, 7-10: >8 points |
| Data Complexity | 20% | 1-3: Simple, 4-6: Moderate, 7-10: Complex relationships |

**Technical Complexity Matrix:**

| Module | Dependencies | Tech Stack | Integrations | Data | Weighted Score |
|--------|--------------|------------|--------------|------|----------------|
| {{module}} | {{score}} | {{score}} | {{score}} | {{score}} | {{weighted}} |

### 2. Business Criticality Scoring

For each module, assess business criticality:

| Factor | Weight | Score Criteria |
|--------|--------|---------------|
| Revenue Impact | 35% | 1-3: Indirect, 4-6: Supporting, 7-10: Direct revenue |
| User Reach | 25% | 1-3: Internal, 4-6: Partial users, 7-10: All users |
| Regulatory Requirements | 25% | 1-3: None, 4-6: Compliance, 7-10: Critical compliance |
| Time Sensitivity | 15% | 1-3: Flexible, 4-6: Targeted, 7-10: Hard deadline |

**Business Criticality Matrix:**

| Module | Revenue | User Reach | Regulatory | Time | Weighted Score |
|--------|---------|------------|------------|------|----------------|
| {{module}} | {{score}} | {{score}} | {{score}} | {{score}} | {{weighted}} |

### 3. Integration Complexity Scoring

For each module, assess integration complexity:

| Factor | Weight | Score Criteria |
|--------|--------|---------------|
| API Dependencies | 35% | 1-3: <3 APIs, 4-6: 3-7 APIs, 7-10: >7 APIs |
| Event Subscriptions | 30% | 1-3: <3 events, 4-6: 3-10 events, 7-10: >10 events |
| Shared State | 20% | 1-3: None, 4-6: Read-only, 7-10: Bidirectional |
| Facade Complexity | 15% | 1-3: Simple, 4-6: Moderate, 7-10: Complex contracts |

**Integration Complexity Matrix:**

| Module | API Deps | Events | Shared State | Facades | Weighted Score |
|--------|----------|--------|--------------|---------|----------------|
| {{module}} | {{score}} | {{score}} | {{score}} | {{score}} | {{weighted}} |

### 4. Multi-Tenant Complexity Scoring

For each module, assess multi-tenant complexity:

| Factor | Weight | Score Criteria |
|--------|--------|---------------|
| Isolation Model | 40% | 1-3: RLS, 4-6: Schema, 7-10: Database-per-tenant |
| Data Sensitivity | 30% | 1-3: Public, 4-6: Tenant-private, 7-10: PII/PHI |
| Resource Isolation | 20% | 1-3: Shared, 4-6: Quotas, 7-10: Dedicated |
| Tenant Lifecycle | 10% | 1-3: Static, 4-6: Standard, 7-10: Complex |

**Multi-Tenant Complexity Matrix:**

| Module | Isolation | Data Sensitivity | Resources | Lifecycle | Weighted Score |
|--------|-----------|------------------|-----------|-----------|----------------|
| {{module}} | {{score}} | {{score}} | {{score}} | {{score}} | {{weighted}} |

### 5. AI Complexity Scoring

For each module, assess AI complexity:

| Factor | Weight | Score Criteria |
|--------|--------|---------------|
| Agent Count | 30% | 1-3: 0-1 agents, 4-6: 2-4 agents, 7-10: >4 agents |
| Tool Registry | 25% | 1-3: <5 tools, 4-6: 5-15 tools, 7-10: >15 tools |
| Memory Tiers | 25% | 1-3: Session only, 4-6: Conversation, 7-10: Long-term |
| Orchestration | 20% | 1-3: Linear, 4-6: Conditional, 7-10: Complex DAG |

**AI Complexity Matrix:**

| Module | Agents | Tools | Memory | Orchestration | Weighted Score |
|--------|--------|-------|--------|---------------|----------------|
| {{module}} | {{score}} | {{score}} | {{score}} | {{score}} | {{weighted}} |

### 6. Composite Complexity Score

Calculate weighted composite score for each module:

| Module | Technical (25%) | Business (25%) | Integration (20%) | Multi-Tenant (15%) | AI (15%) | **Composite** |
|--------|-----------------|----------------|-------------------|--------------------|---------|----|
| {{module}} | {{score}} | {{score}} | {{score}} | {{score}} | {{score}} | **{{composite}}** |

---

## COLLABORATION MENUS (A/P/C):

After completing complexity scoring, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific module scoring rationale
- **P (Party Mode)**: Bring technical and business perspectives on complexity
- **C (Continue)**: Accept scores and proceed to prioritization
- **[Module name]**: Describe a specific module to adjust scoring

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: module complexity scores, scoring rationale
- Process enhanced insights on complexity factors
- Ask user: "Accept these enhanced scores? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module complexity scoring: {summary}"
- Process Technical Lead and Product Owner perspectives
- Present synthesized score adjustments
- Ask user: "Accept these adjustments? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document complexity scores
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## SUCCESS METRICS:

- [ ] All modules scored across all five dimensions
- [ ] Weighted composite scores calculated
- [ ] Scoring rationale documented
- [ ] User has confirmed scoring accuracy
- [ ] Edge cases and exceptions noted

---

## FAILURE MODES:

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Missing module data | Unable to score dimension | Request additional information |
| Inconsistent scoring | Score variance >3 within dimension | Review and recalibrate |
| User disputes score | User rejects score | Enter A mode for deep dive |

---

## Verification

- [ ] Technical complexity scored for all modules
- [ ] Business criticality scored for all modules
- [ ] Integration complexity scored for all modules
- [ ] Multi-tenant complexity scored for all modules
- [ ] AI complexity scored for all modules
- [ ] Composite scores calculated

---

## Outputs

- Complexity scoring matrices for all five dimensions
- Weighted composite scores per module
- Scoring rationale documentation

---

## Next Step

Proceed to `step-03-c-design.md` to prioritize modules based on complexity scores.
