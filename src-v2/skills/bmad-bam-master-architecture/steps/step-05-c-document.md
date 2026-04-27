# Step 05: Document Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER generate document without all prior step decisions loaded
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When presenting checkpoint, ensure ALL decisions are compiled
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Document MUST reflect decisions from steps 01-04 accurately
- 📋 Use master architecture template as structural guide
- 💬 Present QG-F1 soft gate checkpoint before completion
- 🌐 Verify web research findings are incorporated from prior steps

---

## EXECUTION PROTOCOLS

- 🎯 Compile all decisions into a single cohesive document
- 💾 Save artifact to configured output location
- 📖 Reference template: `{project-root}/_bmad/bam/data/templates/master-architecture.md`
- 🚫 DO NOT modify decisions made in prior steps - document as decided
- ⚠️ Flag any inconsistencies between step decisions
- 🔍 Verify web research citations are preserved in final document

---

## CONTEXT BOUNDARIES

- **Step 01:** Project basics, tenant requirements, AI requirements, technical constraints
- **Step 02:** Tenant isolation model selection with rationale
- **Step 03:** Module boundaries, dependencies, bounded contexts
- **Step 04:** Architecture patterns, cross-cutting concerns
- **Template:** `{project-root}/_bmad/bam/data/templates/master-architecture.md`
- **Output:** `{output_folder}/planning-artifacts/master-architecture.md`

---

## YOUR TASK

Compile all architecture decisions from steps 01-04 into the master architecture document. Present at QG-F1 soft gate checkpoint for user approval before finalizing.

---

## Main Sequence

### 1. Load Template

| Resource | Location |
|----------|----------|
| Template | `{project-root}/_bmad/bam/data/templates/master-architecture.md` |
| QG-F1 | `{project-root}/_bmad/bam/data/checklists/qg-f1.md` |

### 2. Compile Decisions

| Step | Artifacts |
|------|-----------|
| 01 | `project`, `tenant`, `ai_agents`, `technical` YAML |
| 02 | `tenant_model.selected`, rationale, trade_offs |
| 03 | Module catalog, dependency graph |
| 04 | Pattern selections, cross-cutting concerns |

### 3. Fill Template Sections

| Section | Source | Content |
|---------|--------|---------|
| Version History | N/A | Initial version entry |
| Tenant Model | Step 02 | Isolation strategy, tiers, RLS |
| AI Runtime | Step 01,04 | Orchestration, tools, memory |
| Module Rules | Step 03 | Catalog, dependencies, facades |
| Technology | Step 01 | Stack, database, cloud |
| Contracts | Step 04 | Facades, events, patterns |

### 4. Generate Document

Create header with project name and version history. Fill all sections with values from prior steps. Include web research citations from steps 01, 02, and 04.

**Verify current documentation best practices with web search:**

Search the web: "architecture decision record best practices {date}"
Search the web: "master architecture document structure {date}"

Incorporate relevant findings into document structure.
_Source: [URL]_ for key methodology updates.

### 5. QG-F1 Soft Gate Checkpoint

**HALT** - Present for review:

```
================================================================================
QG-F1 SOFT GATE CHECKPOINT: Master Architecture Review
================================================================================

PROJECT: {project.name}
TENANT MODEL: {tenant_model.selected}
AI RUNTIME: {ai_agents.orchestration}
MODULES: {count} defined

DOCUMENT: {output_folder}/planning-artifacts/master-architecture.md

================================================================================
[A] Approve - Accept architecture and complete workflow
[E] Edit - Revise decisions, return to this checkpoint
[V] Validate - Run `bmad-bam-validate-foundation` workflow
================================================================================
```

**If 'A':** Save document, mark workflow complete, show completion message.

**If 'E':** Ask which section needs revision, process changes, return to checkpoint.

**If 'V':** Save draft, invoke validation workflow, return with results.

### 6. Save Output

**Path:** `{output_folder}/planning-artifacts/master-architecture.md`

- [ ] File created
- [ ] All sections populated
- [ ] No `{{}}` placeholders remaining
- [ ] Citations included

---

## COLLABORATION MENUS (A/P/C):

Before proceeding to QG-F1 checkpoint, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document completeness
- **P (Party Mode)**: Multi-persona review of architecture
- **C (Continue)**: Proceed to QG-F1 checkpoint

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Section depth:** Are all template sections fully populated?
- **Decision confidence:** Are rationale statements clear and complete?
- **Gap identification:** Are there any missing decisions from prior steps?
- **Consistency check:** Do all sections align with each other?
- **Citation verification:** Are all web research sources cited?

Pass context: compiled decisions from steps 01-04, document sections, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review master architecture document completeness:
- Project: {project.name}
- Tenant Model: {tenant_model.selected}
- AI Runtime: {ai_agents.orchestration}
- Modules: {module_count} defined
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Platform Architect | Structure | Is the document technically complete? Are module boundaries clear? |
| Security Architect | Compliance | Are security decisions documented? Is tenant isolation addressed? |
| DevOps Engineer | Operations | Are deployment considerations included? Is observability planned? |
| Business Analyst | Requirements | Does the document trace to requirements? Are stakeholder needs met? |

Process multi-perspective analysis and synthesize into final document refinements.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

Record that user chose to proceed.
Proceed to QG-F1 soft gate checkpoint (Section 5).

---

## SUCCESS METRICS

- ✅ All prior step decisions compiled into document
- ✅ Template structure followed with all sections filled
- ✅ No placeholder text remaining
- ✅ Web research findings incorporated with citations
- ✅ QG-F1 checkpoint presented to user
- ✅ User approved document via 'A' option
- ✅ Document saved to output location
- ✅ Workflow marked complete

---

## FAILURE MODES

- ❌ Missing decisions from prior steps
- ❌ Template sections unfilled
- ❌ Inconsistent decisions across steps
- ❌ Skipping QG-F1 checkpoint
- ❌ Missing web research citations
- ❌ File not written to output location

---

## WORKFLOW COMPLETE

After user approves:

```
================================================================================
WORKFLOW COMPLETE: Master Architecture Created
================================================================================

ARTIFACT: {output_folder}/planning-artifacts/master-architecture.md

NEXT WORKFLOWS:
- `bmad-bam-module-architecture` - Design individual modules
- `bmad-bam-tenant-isolation` - Detail tenant isolation
- `bmad-bam-validate-foundation` - Run formal QG-F1 validation
================================================================================
```
