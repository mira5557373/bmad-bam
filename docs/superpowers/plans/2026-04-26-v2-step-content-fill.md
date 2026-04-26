# V2 Step Content Fill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance 300 V2 step files from stubs (28 lines avg) to BMAD-compliant format (~170 lines avg), adding ~42,600 lines of content.

**Architecture:** Each step file follows the BMAD pattern with required sections (MANDATORY EXECUTION RULES, EXECUTION PROTOCOLS, CONTEXT BOUNDARIES, YOUR TASK, Main Sequence, COLLABORATION MENUS, SUCCESS METRICS, FAILURE MODES, NEXT STEP). Content is BAM multi-tenant specific.

**Tech Stack:** Markdown with BMAD patterns, emoji protocols, A/P/C menus.

**Source Spec:** `docs/superpowers/specs/2026-04-26-v2-step-content-fill-design.md` (v7.3.0)

---

## File Structure

### Target Line Counts by Step Type

| Step Type | Files | Target Lines | Total |
|-----------|-------|--------------|-------|
| Create (01-05) | 150 | 150-250 avg 200 | 30,000 |
| Edit (10-11) | 60 | 80-120 avg 100 | 6,000 |
| Validate (20-22) | 90 | 100-150 avg 125 | 11,250 |
| **Total** | 300 | ~170 avg | ~47,250 |

### Required Sections by Mode

**Create Mode (step-01-c through step-05-c):**
- MANDATORY EXECUTION RULES (10-15 lines, with emojis 🛑📖🔄✅📋💬)
- EXECUTION PROTOCOLS (8-12 lines, with emojis 🎯💾📖🚫)
- CONTEXT BOUNDARIES (5-8 lines)
- YOUR TASK (3-5 lines)
- Main Sequence (60-100 lines, 3-5 numbered actions)
- COLLABORATION MENUS (A/P/C) (20-30 lines, steps 02-05 only)
- SUCCESS METRICS (8-12 lines, with ✅)
- FAILURE MODES (8-12 lines, with ❌)
- NEXT STEP (5-8 lines)

**Edit Mode (step-10-e, step-11-e):**
- MANDATORY EXECUTION RULES (8-10 lines)
- EXECUTION PROTOCOLS (6-8 lines)
- YOUR TASK (3-5 lines)
- Load/Apply Sequence (30-50 lines)
- SUCCESS METRICS (5-8 lines)
- NEXT STEP (3-5 lines)

**Validate Mode (step-20-v through step-22-v):**
- MANDATORY EXECUTION RULES (8-10 lines)
- EXECUTION PROTOCOLS (6-8 lines)
- YOUR TASK (3-5 lines)
- Validation Sequence (40-60 lines)
- Quality Gate Integration (15-25 lines)
- SUCCESS METRICS (8-12 lines)
- NEXT STEP (3-5 lines)

---

## Implementation Phases

### Phase 1: Core Quality Gate Skills (8 skills, 80 steps)

Priority skills that govern quality gates QG-F1, QG-M1-M3, QG-I1-I3, QG-P1.

| Skill | Create Steps | Edit Steps | Validate Steps | Total |
|-------|--------------|------------|----------------|-------|
| bmad-bam-master-architecture | 5 | 2 | 3 | 10 |
| bmad-bam-module-architecture | 5 | 2 | 3 | 10 |
| bmad-bam-tenant-isolation | 5 | 2 | 3 | 10 |
| bmad-bam-agent-runtime | 5 | 2 | 3 | 10 |
| bmad-bam-facade-contract | 5 | 2 | 3 | 10 |
| bmad-bam-convergence | 5 | 2 | 3 | 10 |
| bmad-bam-production-readiness | 5 | 2 | 3 | 10 |
| bmad-bam-tenant-testing | 5 | 2 | 3 | 10 |

### Phase 2: Tenant Lifecycle (4 skills, 40 steps)

| Skill | Steps |
|-------|-------|
| bmad-bam-onboarding | 10 |
| bmad-bam-offboarding | 10 |
| bmad-bam-tenant-metering | 10 |
| bmad-bam-tenant-config | 10 |

### Phase 3: AI/Agent (5 skills, 50 steps)

| Skill | Steps |
|-------|-------|
| bmad-bam-agent-orchestration | 10 |
| bmad-bam-tool-contracts | 10 |
| bmad-bam-agent-observability | 10 |
| bmad-bam-llm-versioning | 10 |
| bmad-bam-mcp-integration | 10 |

### Phase 4: Operations (6 skills, 60 steps)

| Skill | Steps |
|-------|-------|
| bmad-bam-observability | 10 |
| bmad-bam-disaster-recovery | 10 |
| bmad-bam-capacity-planning | 10 |
| bmad-bam-incident-response | 10 |
| bmad-bam-compliance | 10 |
| bmad-bam-security | 10 |

### Phase 5: Planning (4 skills, 40 steps)

| Skill | Steps |
|-------|-------|
| bmad-bam-requirements | 10 |
| bmad-bam-epics | 10 |
| bmad-bam-stories | 10 |
| bmad-bam-api-versioning | 10 |

### Phase 6: Specialized (3 skills, 30 steps)

| Skill | Steps |
|-------|-------|
| bmad-bam-data-migration | 10 |
| bmad-bam-white-labeling | 10 |
| bmad-bam-plugin-system | 10 |

---

## Task Execution

### Task 1: Master Architecture - Create Mode Steps

**Files:**
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-01-c-context.md`
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-02-c-model.md`
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-03-c-boundaries.md`
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-04-c-patterns.md`
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-05-c-document.md`

- [ ] **Step 1.1: Fill step-01-c-context.md (Gather Context)**

Replace stub content with BMAD-compliant structure (~200 lines):

```markdown
# Step 01: Gather Context

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate architecture without gathering project context
- 📖 CRITICAL: ALWAYS read complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ ALWAYS treat this as collaborative discovery with the architect
- 📋 YOU ARE A FACILITATOR guiding context gathering
- 💬 FOCUS on context gathering only - don't design yet
- 🌐 ALWAYS search web to verify current multi-tenant patterns
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in Agent communication style

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before recommending approaches
- 🌐 Search web to verify current best practices
- ⚠️ Present summary before proceeding
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## CONTEXT BOUNDARIES:

- **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/ai-runtime.md`
- Decision Matrix from domains is available
- Don't assume architecture decisions yet - that's step 2

## YOUR TASK:

Facilitate collaborative context gathering by asking about project requirements, constraints, and goals. Capture enough information to inform tenant model and AI runtime decisions.

## CONTEXT GATHERING SEQUENCE:

### 1. Load Project Context

Check for existing project context:
- `{project-root}/**/project-context.md` (if exists)
- `{project-root}/_bmad/project-knowledge/**/*.md` (if exists)

Present any found context to user for confirmation.

### 2. Gather Tenant Requirements

Ask user for critical inputs:

"Let's gather context for your master architecture. I need to understand:

1. **Project Name**: What is this SaaS platform called?
2. **Domain**: What business domain does it serve?
3. **Tenant Count**: Expected tenants now and in 2 years?
4. **Compliance**: Any requirements (SOC2, HIPAA, PCI-DSS, GDPR)?
5. **Tier Distribution**: % of free/pro/enterprise tenants?
6. **Data Sensitivity**: Classification level of tenant data?"

Record responses for Decision Matrix matching.

### 3. Gather AI Requirements

Ask about AI agent needs:

"Now let's understand your AI agent requirements:

1. **Agent Types**: What kinds of AI agents will tenants use?
2. **Orchestration**: Single agent or multi-agent workflows?
3. **State Management**: Stateless or stateful conversations?
4. **Tool Access**: What tools will agents need?
5. **Tenant Scoping**: How isolated should agent operations be?"

### 4. Gather Technical Constraints

"What technical constraints should I know about?

1. **Stack**: Primary language/framework?
2. **Database**: PostgreSQL, MySQL, or other?
3. **Cloud**: AWS, GCP, Azure, or multi-cloud?
4. **Team Size**: How many developers?
5. **Timeline**: When do you need to launch?"

### 5. Verify Current Best Practices

**Web research:**
Search the web: "multi-tenant SaaS architecture best practices 2026"
Search the web: "AI agent orchestration patterns SaaS 2026"

Integrate findings with gathered context.
_Source: [URL]_ for key findings.

### 6. Present Context Summary

"**Context Summary**

**Project:** {project_name}
**Domain:** {domain}
**Tenant Profile:** {count} tenants, {compliance} compliance, {tier_mix} tier mix

**AI Profile:** {agent_types}, {orchestration_style}

**Technical Stack:** {language}, {database}, {cloud}

**Key Constraints:**
- {constraint_1}
- {constraint_2}

This context will inform our tenant model and AI runtime decisions in the next steps."

## SUCCESS METRICS:

✅ Project context gathered (name, domain, purpose)
✅ Tenant requirements captured (count, compliance, tiers, sensitivity)
✅ AI requirements captured (agent types, orchestration, scoping)
✅ Technical constraints documented (stack, cloud, team, timeline)
✅ Web research performed for current best practices
✅ Context summary presented and confirmed by user
✅ User selected Continue to proceed

## FAILURE MODES:

❌ Making architecture decisions without gathering context
❌ Skipping tenant or AI requirement questions
❌ Not verifying constraints with user
❌ Proceeding without user confirmation (C selection)
❌ Not recording context in output document
❌ **CRITICAL**: Reading only partial step file

## NEXT STEP:

After user selects [C] and context is recorded, load `./step-02-c-model.md` to select tenant model based on gathered requirements.

Remember: Do NOT proceed until user explicitly selects [C]!
```

- [ ] **Step 1.2: Fill step-02-c-model.md (Select Tenant Model)**

Replace stub content with BMAD-compliant structure (~220 lines):

```markdown
# Step 02: Select Tenant Model

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER recommend tenant model without consulting Decision Matrix
- 📖 CRITICAL: ALWAYS read complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ ALWAYS treat this as collaborative discovery
- 📋 YOU ARE A FACILITATOR guiding tenant model selection
- 💬 FOCUS on tenant model only - don't design isolation yet
- 🌐 ALWAYS verify recommendations with current best practices
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in Agent communication style

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before recommending any model
- 🌐 Search web to verify current multi-tenant best practices
- ⚠️ Present A/P/C menu after presenting recommendation
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## CONTEXT BOUNDARIES:

- **Previous context:** Step 1 gathered project, tenant, AI, technical requirements
- **Load domain:** `{project-root}/_bmad/bam/data/domains/tenant.md` - Decision Matrix
- **Load CSV:** `{project-root}/_bmad/bam/data/tenant-models.csv` - Detailed criteria
- Don't design isolation dimensions yet - that's step 3

## YOUR TASK:

Facilitate tenant model selection by analyzing gathered requirements against the Decision Matrix, presenting a recommendation with rationale and trade-offs.

## TENANT MODEL SEQUENCE:

### 1. Load Decision Criteria

**Load from domain:** Read Decision Matrix from `domains/tenant.md`:

| Tenants | Compliance | Tier Mix | Recommendation |
|---------|------------|----------|----------------|
| <1000 | Low/Medium | All | Row-Level Security (RLS) |
| <1000 | High | Pro/Enterprise | Schema-per-Tenant |
| Any | PCI/HIPAA | Enterprise-heavy | Database-per-Tenant |
| >10000 | Low | All | RLS + Sharding |

**Load from CSV:** Read `tenant-models.csv` for detailed trade-offs.

### 2. Match Requirements to Models

Using context from Step 1:
- Tenant count: {count} → suggests {model}
- Compliance: {level} → requires {model}
- Tier mix: {mix} → supports {model}
- Technical stack: {stack} → compatible with {model}

### 3. Verify Current Best Practices

**Web research:**
Search the web: "PostgreSQL RLS vs schema isolation {date}"
Search the web: "{database} multi-tenant patterns {date}"

Integrate findings with Decision Matrix.
_Source: [URL]_ for key findings.

### 4. Present Model Recommendation

"**Tenant Model Recommendation**

Based on your context:
- Tenant count: {count}
- Compliance: {compliance}
- Tier mix: {tier_mix}
- Stack: {stack}

**Recommended Model:** {model}

**Why This Model:**
{Detailed rationale matching requirements to Decision Matrix}

**Trade-offs:**
| Aspect | Benefit | Cost |
|--------|---------|------|
| Isolation | {benefit} | {cost} |
| Scalability | {benefit} | {cost} |
| Operations | {benefit} | {cost} |
| Cost | {benefit} | {cost} |

**Alternative Considered:** {alternative_model}
**Why Not Chosen:** {reason}

**Implementation Complexity:** {low/medium/high}"

## COLLABORATION MENUS (A/P/C):

After presenting recommendation:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation requirements
- **P (Party Mode)**: Bring analyst, security, and compliance perspectives
- **C (Continue)**: Accept model and proceed to isolation design

Select an option:
```

### If 'A' (Advanced Elicitation):
- Invoke `bmad-advanced-elicitation` skill
- Pass context: requirements gathered, model considered
- Topics to explore: data residency, cross-tenant queries, tenant hierarchy
- Process enhanced insights
- Return to A/P/C menu

### If 'P' (Party Mode):
- Invoke `bmad-party-mode` skill
- Context: "Review tenant model selection: {model} for {tenant_count} tenants with {compliance} compliance"
- Bring perspectives: Platform Architect (isolation), Security Architect (compliance), Operations (complexity)
- Process multi-perspective analysis
- Return to A/P/C menu

### If 'C' (Continue):
- Record tenant model decision in output document
- Update frontmatter:
  ```yaml
  stepsCompleted: [1, 2]
  currentStep: 3
  decisions:
    tenant_model: "{model}"
  ```
- Proceed to NEXT STEP

## SUCCESS METRICS:

✅ Decision Matrix from domain file consulted
✅ Requirements matched to model criteria
✅ Web research performed for current best practices
✅ Model recommendation presented with rationale
✅ Trade-offs clearly articulated
✅ Alternative model considered and documented
✅ User confirmed model selection via A/P/C menu
✅ Decision recorded in output document

## FAILURE MODES:

❌ Recommending model without consulting Decision Matrix
❌ Not matching requirements to criteria
❌ Skipping web research for current practices
❌ Not presenting trade-offs
❌ Proceeding without user confirmation (C selection)
❌ Not recording decision in output document
❌ **CRITICAL**: Reading only partial step file

## NEXT STEP:

After user selects [C] and model is recorded, load `./step-03-c-boundaries.md` to design module boundaries for the selected tenant model.

Remember: Do NOT proceed until user explicitly selects [C]!
```

- [ ] **Step 1.3: Fill step-03-c-boundaries.md (Define Module Boundaries)**

Create BMAD-compliant content (~200 lines) covering:
- MANDATORY EXECUTION RULES with emojis
- Module decomposition for multi-tenant SaaS
- Bounded context identification
- Facade contract planning
- A/P/C collaboration menu
- SUCCESS METRICS and FAILURE MODES

- [ ] **Step 1.4: Fill step-04-c-patterns.md (Select Architecture Patterns)**

Create BMAD-compliant content (~200 lines) covering:
- MANDATORY EXECUTION RULES with emojis
- Pattern selection from pattern registry
- Modular monolith vs microservices decision
- AI runtime integration patterns
- A/P/C collaboration menu
- SUCCESS METRICS and FAILURE MODES

- [ ] **Step 1.5: Fill step-05-c-document.md (Document Architecture)**

Create BMAD-compliant content (~180 lines) covering:
- MANDATORY EXECUTION RULES with emojis
- Master architecture document generation
- Template loading and filling
- QG-F1 soft gate checkpoint
- A/P/C collaboration menu
- SUCCESS METRICS and FAILURE MODES
- CHECKPOINT pattern for approval

---

### Task 2: Master Architecture - Edit Mode Steps

**Files:**
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-10-e-load.md`
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-11-e-apply.md`

- [ ] **Step 2.1: Fill step-10-e-load.md (Load Existing Architecture)**

Create BMAD-compliant content (~100 lines) covering:
- MANDATORY EXECUTION RULES (edit-specific)
- Load existing master-architecture.md
- Parse frontmatter for current state
- Present current decisions for review
- SUCCESS METRICS

- [ ] **Step 2.2: Fill step-11-e-apply.md (Apply Changes)**

Create BMAD-compliant content (~100 lines) covering:
- MANDATORY EXECUTION RULES (edit-specific)
- Capture user change requests
- Apply changes preserving consistency
- Update frontmatter version
- SUCCESS METRICS

---

### Task 3: Master Architecture - Validate Mode Steps

**Files:**
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-20-v-load.md`
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-21-v-validate.md`
- Modify: `src-v2/skills/bmad-bam-master-architecture/steps/step-22-v-report.md`

- [ ] **Step 3.1: Fill step-20-v-load.md (Load for Validation)**

Create BMAD-compliant content (~100 lines) covering:
- MANDATORY EXECUTION RULES (validate-specific)
- Load master-architecture.md
- Load QG-F1 checklist from `data/checklists/qg-f1.md`
- Prepare validation context

- [ ] **Step 3.2: Fill step-21-v-validate.md (Execute Validation)**

Create BMAD-compliant content (~130 lines) covering:
- MANDATORY EXECUTION RULES
- Run each QG-F1 check against document
- Track PASS/FAIL/CONDITIONAL for each item
- CRITICAL checks must all pass
- Web research for validation criteria

- [ ] **Step 3.3: Fill step-22-v-report.md (Generate Report)**

Create BMAD-compliant content (~120 lines) covering:
- MANDATORY EXECUTION RULES
- Generate validation report
- Present outcome (PASS/CONDITIONAL/FAIL)
- Recovery protocol if FAIL (3 attempts)
- Output to `planning_artifacts/master-architecture-validation.md`

---

### Task 4: Tenant Isolation - Create Mode Steps

**Files:**
- Modify: `src-v2/skills/bmad-bam-tenant-isolation/steps/step-01-c-*.md`
- Modify: `src-v2/skills/bmad-bam-tenant-isolation/steps/step-02-c-*.md`
- Modify: `src-v2/skills/bmad-bam-tenant-isolation/steps/step-03-c-*.md`
- Modify: `src-v2/skills/bmad-bam-tenant-isolation/steps/step-04-c-*.md`
- Modify: `src-v2/skills/bmad-bam-tenant-isolation/steps/step-05-c-*.md`

- [ ] **Step 4.1: Fill step-01-c-* (Tenant Model Definition)**

Using example from spec (lines 1236-1384) as reference:
- 8-dimension isolation matrix (data, compute, network, identity, billing, limits, audit, config)
- Decision Matrix consultation
- Web research for current patterns
- A/P/C menu integration

- [ ] **Step 4.2: Fill step-02-c-* (Isolation Matrix Design)**

Design isolation for each dimension based on selected model.

- [ ] **Step 4.3: Fill step-03-c-* (Context Propagation)**

Design tenant context propagation patterns (JWT, middleware, RLS).

- [ ] **Step 4.4: Fill step-04-c-* (Sharing Rules)**

Design cross-tenant sharing rules and exceptions.

- [ ] **Step 4.5: Fill step-05-c-* (Compliance Mapping)**

Map isolation decisions to compliance requirements.

---

### Task 5-8: Remaining Core Quality Gate Skills

Follow same pattern for:
- **Task 5:** Module Architecture (10 steps)
- **Task 6:** Agent Runtime (10 steps)
- **Task 7:** Facade Contract (10 steps)
- **Task 8:** Convergence (10 steps)

Each task creates 5 Create steps (~200 lines each), 2 Edit steps (~100 lines each), 3 Validate steps (~125 lines each).

---

### Tasks 9-14: Tenant Lifecycle Skills

Follow same pattern for:
- **Task 9:** Onboarding (10 steps)
- **Task 10:** Offboarding (10 steps)
- **Task 11:** Tenant Metering (10 steps)
- **Task 12:** Tenant Config (10 steps)

---

### Tasks 15-20: AI/Agent Skills

Follow same pattern for:
- **Task 15:** Agent Orchestration (10 steps)
- **Task 16:** Tool Contracts (10 steps)
- **Task 17:** Agent Observability (10 steps)
- **Task 18:** LLM Versioning (10 steps)
- **Task 19:** MCP Integration (10 steps)

---

### Tasks 21-26: Operations Skills

Follow same pattern for remaining operations skills.

---

### Tasks 27-30: Planning & Specialized Skills

Follow same pattern for remaining skills.

---

## Validation Tests

After completing each task, verify:

```bash
# Check line counts
find src-v2/skills -name "step-*.md" -exec wc -l {} \; | awk '{sum+=$1; count++} END {print "Total:", sum, "Avg:", sum/count}'

# Check required sections (Create steps)
grep -l "MANDATORY EXECUTION RULES" src-v2/skills/*/steps/step-0*-c-*.md | wc -l

# Check A/P/C menus (Create steps 02-05)
grep -l "COLLABORATION MENUS" src-v2/skills/*/steps/step-0[2-5]-c-*.md | wc -l

# Check SUCCESS METRICS
grep -l "SUCCESS METRICS" src-v2/skills/*/steps/*.md | wc -l

# Check FAILURE MODES
grep -l "FAILURE MODES" src-v2/skills/*/steps/*.md | wc -l
```

---

## Quality Metrics

| Metric | Current | Target | After Phase 1 |
|--------|---------|--------|---------------|
| Total lines | 8,534 | ~47,250 | ~15,000 |
| Avg lines | 28 | ~170 | ~170 |
| MANDATORY RULES | 0% | 100% | 100% (80 files) |
| A/P/C Menus | 0% | 100% Create | 100% (40 files) |
| SUCCESS METRICS | 0% | 100% | 100% (80 files) |

---

## Execution Order

1. **Pilot:** Task 1 (Master Architecture Create) - validate pattern works
2. **Core:** Tasks 2-8 (remaining Core Quality Gate skills)
3. **Lifecycle:** Tasks 9-12 (Tenant Lifecycle)
4. **AI:** Tasks 13-18 (AI/Agent skills)
5. **Ops:** Tasks 19-24 (Operations skills)
6. **Final:** Tasks 25-30 (Planning & Specialized)

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-26 | Initial plan from v2-step-content-fill-design.md spec (v7.3.0) |
