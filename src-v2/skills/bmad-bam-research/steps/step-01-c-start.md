# Step 1: Initialize Research Scope

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Initialize the technology research scope by loading architecture constraints, identifying research areas, and establishing evaluation criteria for frameworks, services, and patterns.

---

## Prerequisites

- Master architecture exists or architecture constraints defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: technology-selection
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` (if AI/ML research)
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` (if tenant technology research)

---

## Inputs

- Research request from user (technology category, problem to solve)
- Architecture constraints from master architecture
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Current technology stack documentation (if exists)

---

## Actions

### 1. Load Architecture Constraints

Load and review existing architecture context:

1. **Master Architecture**: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
   - Technology stack decisions already made
   - Non-negotiable constraints (language, cloud provider, compliance)
   - Integration requirements

2. **Configuration**: `{project-root}/_bmad/bam/config.yaml`
   - `tenant_model`: Row-level security, schema-per-tenant, or database-per-tenant
   - `ai_runtime`: LangGraph, CrewAI, AutoGen, DSPy, Instructor, or custom
   - Design-first and test architecture flags

### 2. Identify Research Areas

Capture research scope from user input:

| Research Category | Examples | Key Considerations |
|-------------------|----------|-------------------|
| **Frameworks** | Web frameworks, ORM, testing | Language compatibility, team experience |
| **Services** | Database, cache, queue, search | Multi-tenant isolation, scaling |
| **Patterns** | Architecture, integration, data | Fit with modular monolith |
| **AI/ML** | LLM providers, embedding stores, orchestration | Token costs, latency, tenant isolation |
| **Infrastructure** | Cloud services, containers, observability | Vendor lock-in, cost, compliance |

### 3. Define Evaluation Criteria

Establish criteria for technology evaluation:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Multi-tenant support | High | Native tenant isolation, RLS support, per-tenant configuration |
| Scalability | High | Horizontal scaling, performance at scale |
| Team expertise | Medium | Current skills, learning curve |
| Community/Support | Medium | Documentation, community size, enterprise support |
| Cost | Medium | Licensing, infrastructure, operational cost |
| Security | High | Compliance certifications, security features |
| Integration fit | High | Compatibility with existing stack |

### 4. Scope Research Boundaries

Define what is in scope and out of scope:

**In Scope:**
- Technologies that address the identified research areas
- Options compatible with architecture constraints
- Solutions within budget and timeline constraints

**Out of Scope:**
- Technologies requiring fundamental architecture changes (unless explicitly requested)
- Options incompatible with compliance requirements
- Solutions exceeding defined cost parameters

### 5. Document Research Plan

Create research plan outline:

```markdown
## Research Plan

**Research Topic:** {topic}
**Initiated:** {date}
**Architecture Context:** {constraints summary}

### Research Areas
1. {Area 1}: {specific question to answer}
2. {Area 2}: {specific question to answer}
3. {Area 3}: {specific question to answer}

### Evaluation Criteria
- {Criterion 1}: Weight {high/medium/low}
- {Criterion 2}: Weight {high/medium/low}

### Scope
- **In Scope:** {boundaries}
- **Out of Scope:** {exclusions}
```

**Verify current best practices with web search:**
Search the web: "technology evaluation frameworks enterprise SaaS {date}"
Search the web: "{research_topic} comparison enterprise {date}"

_Source: [URL]_

---

## Verification

- [ ] Architecture constraints loaded and understood
- [ ] Research areas clearly identified
- [ ] Evaluation criteria established with weights
- [ ] Scope boundaries defined (in/out of scope)
- [ ] Research plan documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Research plan outline
- Evaluation criteria matrix
- Architecture constraints summary
- Defined research scope and boundaries

---

## Next Step

Proceed to `step-02-c-analyze.md` to conduct technology evaluation.
