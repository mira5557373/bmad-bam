# Step 5: Compile Tracing Design

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

Compile the complete agent tracing design document from all previous steps and output to the planning artifacts directory.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-trace.md`
- All design components documented

---

## Inputs

- Trace dimension definitions (Step 1)
- Trace schema (Step 2)
- Trace propagation design (Step 3)
- Trace analysis design (Step 4)
- Template file

---

## Actions

### 1. Assemble Complete Specification

Combine all previous outputs into the final document:

| Section | Source | Validation |
|---------|--------|------------|
| Executive Summary | Generated | Completeness check |
| Trace Dimensions | Step 1 | All dimensions covered |
| Trace Schema | Step 2 | All attributes defined |
| Propagation Design | Step 3 | All patterns covered |
| Analysis Design | Step 4 | All capabilities specified |
| Implementation Notes | Generated | Feasibility check |

### 2. Document Integration Points

| Integration | Protocol | Tracing Role | Configuration |
|-------------|----------|--------------|---------------|
| OpenTelemetry SDK | OTLP | Span creation | Auto-instrumentation |
| Trace backend | OTLP | Span storage | Endpoint config |
| LLM providers | API | Token metrics | Provider adapters |
| Cost system | Events | Cost correlation | Event routing |
| Alert system | Webhooks | Alert triggers | Alert rules |
| Dashboard | Query API | Visualization | Dashboard config |

### 3. Define Implementation Phases

| Phase | Components | Duration | Dependencies |
|-------|------------|----------|--------------|
| Phase 1: Foundation | SDK integration, basic spans | 2 weeks | None |
| Phase 2: Enrichment | Tenant attributes, token metrics | 2 weeks | Phase 1 |
| Phase 3: Propagation | Cross-agent context, tool tracing | 2 weeks | Phase 2 |
| Phase 4: Analysis | Dashboards, alerts, comparison | 3 weeks | Phase 3 |

Implementation Checklist:

| Component | Effort | Risk | Priority |
|-----------|--------|------|----------|
| OpenTelemetry SDK | Medium | Low | CRITICAL |
| Span naming | Low | Low | HIGH |
| Tenant attributes | Medium | Medium | CRITICAL |
| Token tracking | Medium | Low | HIGH |
| Context propagation | High | Medium | HIGH |
| Memory tracing | Medium | Low | MEDIUM |
| Dashboards | High | Low | MEDIUM |
| Alerting | Medium | Low | HIGH |

### 4. Document Quality Gate Alignment

| Quality Gate | Tracing Contribution | Verification |
|--------------|---------------------|--------------|
| QG-M3 (Agent Runtime) | Agent execution tracing | Span coverage |
| QG-I2 (Tenant Safety) | Tenant attribution | Isolation validation |
| QG-I3 (Agent Safety) | Tool execution tracing | Audit trail |
| QG-P1 (Production) | Observability stack | Dashboard readiness |

### 5. Generate Output Document

Write to: `{output_folder}/planning-artifacts/agent-tracing-design.md`

Document Structure:

```markdown
# Agent Tracing Design

**Version:** 1.0.0
**Date:** {{date}}
**AI Runtime:** {{ai_runtime}}
**Tenant Model:** {{tenant_model}}

## Executive Summary

{Summary of tracing approach}

## 1. Trace Dimensions

### 1.1 Spans
{Span definitions}

### 1.2 Events
{Event definitions}

### 1.3 Attributes
{Attribute schema}

## 2. Trace Schema

### 2.1 Span Naming Conventions
{Naming patterns}

### 2.2 Tenant Attribution
{Tenant attributes}

### 2.3 Token Metrics
{Token tracking}

### 2.4 Cost Integration
{Cost tracking}

## 3. Trace Propagation

### 3.1 Cross-Agent Context
{Context propagation}

### 3.2 Tool Execution
{Tool tracing}

### 3.3 Memory Operations
{Memory tracing}

### 3.4 External APIs
{API tracing}

## 4. Trace Analysis

### 4.1 Search and Filtering
{Query capabilities}

### 4.2 Latency Analysis
{Dashboard design}

### 4.3 Error Tracking
{Error monitoring}

### 4.4 Performance Comparison
{Agent comparison}

## 5. Implementation Plan

{Phased implementation}

## 6. Quality Gates

{QG alignment}
```

---

## COLLABORATION MENUS (A/P/C):

After compiling the tracing design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Review specific sections in detail
- **P (Party Mode)**: Bring implementation team perspectives
- **C (Continue)**: Finalize document and complete workflow
- **[Specific refinements]**: Describe final adjustments needed

Select an option:
```

#### If 'C' (Continue):
- Write complete document to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark Create mode complete

---

## Verification

- [ ] All sections from Steps 1-4 included
- [ ] Integration points documented
- [ ] Implementation phases defined
- [ ] Quality gate alignment documented
- [ ] Output document generated
- [ ] Document passes template validation

---

## Outputs

- `agent-tracing-design.md` - Complete specification
- Ready for QG-M3 validation (agent runtime component)

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

Workflow complete. Recommended next actions:
- Run Validate mode to verify against QG-M3
- Proceed to `bmad-bam-observability` for full observability stack
- Implement tracing according to phases defined
