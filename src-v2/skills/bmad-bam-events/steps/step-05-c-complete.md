# Step 05: Compile Event Architecture Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present soft gate checkpoint** before completing

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile complete event architecture document
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: All design decisions from Steps 01-04
- 🚫 Do NOT: Re-design components (use existing findings)
- 🔍 Use web search: Final verification of architecture patterns
- ⚠️ Gate: Output feeds into QG-M2 (Tenant Isolation)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling all design decisions into final document
- Generating event architecture artifact
- Creating implementation roadmap
- Documenting risks and mitigations

**OUT OF SCOPE:**
- Re-designing event schemas (Step 02)
- Re-designing routing (Step 03)
- Re-designing processing (Step 04)

---

## Purpose

Compile the final event-driven architecture document for multi-tenant systems, synthesizing all design decisions from previous steps into a comprehensive architecture specification with implementation guidance.

---

## Prerequisites

- Step 04 completed: Event processing designed
- All design components documented
- **Load template:** `{project-root}/_bmad/bam/data/templates/event-architecture-template.md`

---

## Inputs

- Event domain categorization from Step 01
- Event schema architecture from Step 02
- Event routing design from Step 03
- Event processing architecture from Step 04
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Compile the event architecture document and output to planning-artifacts.

---

## Main Sequence

### 1. Document Header and Context

#### 1.1 Architecture Metadata

| Attribute | Value |
|-----------|-------|
| Document | Event-Driven Architecture Specification |
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Tenant Model | {{tenant_model}} |
| AI Runtime | {{ai_runtime}} |

#### 1.2 Architecture Scope

| Scope Area | Included |
|------------|----------|
| Domain Events | YES |
| Integration Events | YES |
| System Events | YES |
| AI Runtime Events | YES |
| Event Schemas | YES |
| Event Routing | YES |
| Event Processing | YES |
| Saga Orchestration | YES |

### 2. Executive Summary

Compile high-level summary of event architecture:

| Component | Key Decisions |
|-----------|---------------|
| Event Envelope | CloudEvents 1.0 + BAM multi-tenant extensions |
| Schema Strategy | {{versioning_strategy}} |
| Topic Strategy | {{topic_strategy}} |
| Partition Strategy | {{partition_strategy}} |
| Consumer Pattern | {{consumer_pattern}} |
| Idempotency | {{idempotency_approach}} |
| Saga Pattern | {{saga_pattern}} |

**Architecture Principle:** Events are the source of truth for all state changes, with tenant isolation enforced at every layer.

### 3. Event Schema Section

#### 3.1 Event Envelope Specification

Include the complete event envelope structure from Step 02:
- CloudEvents base fields
- BAM multi-tenant extensions
- Tenant isolation requirements

#### 3.2 Schema Versioning Strategy

Document the versioning approach:
- Version bump rules
- Backward compatibility requirements
- Schema evolution patterns
- Version negotiation approach

#### 3.3 Event Catalog

Include the event catalog structure:
- Domain events by module
- Integration events by relationship
- System events by category
- AI runtime events

### 4. Event Routing Section

#### 4.1 Topic Architecture

Document topic design from Step 03:
- Topic naming convention
- Topic examples by category
- Tenant-aware topic strategy

#### 4.2 Partition Strategy

Document partitioning approach:
- Partition key selection
- Partition count guidance
- Hot partition mitigation

#### 4.3 DLQ Configuration

Document dead letter queue design:
- DLQ architecture
- Metadata preservation
- Access control by tenant

#### 4.4 Replay Capabilities

Document replay architecture:
- Replay scenarios
- Tenant-scoped replay constraints
- Replay configuration

### 5. Event Processing Section

#### 5.1 Consumer Group Configuration

Document consumer patterns from Step 04:
- Naming convention
- Multi-tenant configuration
- Tenant context propagation

#### 5.2 Idempotency Design

Document idempotency approach:
- Key strategy
- Storage approach
- Processing flow

#### 5.3 Ordering Guarantees

Document ordering strategy:
- Requirements matrix
- Ordering scope by event type
- Out-of-order handling

#### 5.4 Saga Orchestration

Document saga patterns:
- Pattern selection rationale
- State machine definition
- Tenant-aware constraints
- AI runtime saga integration

### 6. Implementation Roadmap

#### 6.1 Phase 1: Foundation (Week 1-2)

| Task | Priority | Dependencies |
|------|----------|--------------|
| Set up event broker (Kafka/etc.) | HIGH | Infrastructure |
| Implement event envelope | HIGH | Schema design |
| Create idempotency store | HIGH | Database |
| Configure DLQ | MEDIUM | Broker setup |

#### 6.2 Phase 2: Core Events (Week 3-4)

| Task | Priority | Dependencies |
|------|----------|--------------|
| Implement domain events | HIGH | Phase 1 |
| Set up consumer groups | HIGH | Broker setup |
| Add tenant context extraction | HIGH | Auth integration |
| Create event catalog | MEDIUM | Schema design |

#### 6.3 Phase 3: Integration (Week 5-6)

| Task | Priority | Dependencies |
|------|----------|--------------|
| Implement integration events | HIGH | Phase 2 |
| Set up saga orchestrator | HIGH | Event processing |
| Add replay service | MEDIUM | Event store |
| Configure monitoring | MEDIUM | Observability |

#### 6.4 Phase 4: AI Runtime (Week 7-8)

| Task | Priority | Dependencies |
|------|----------|--------------|
| Implement AI runtime events | HIGH | AI runtime setup |
| Add agent saga patterns | HIGH | Saga orchestrator |
| Integrate with billing | MEDIUM | Usage tracking |
| Add tracing integration | MEDIUM | Observability |

### 7. Risk Assessment

#### 7.1 Identified Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R-001 | Cross-tenant event leakage | LOW | CRITICAL | Tenant_id validation at every layer |
| R-002 | Event ordering violation | MEDIUM | HIGH | Sequence numbers + buffering |
| R-003 | Idempotency key collision | LOW | MEDIUM | Composite keys with tenant scope |
| R-004 | Saga stuck in pending | MEDIUM | MEDIUM | Timeout + compensation |
| R-005 | DLQ overflow | LOW | MEDIUM | Alerting + auto-scaling |

#### 7.2 Technical Debt

| Item | Priority | Effort | Impact |
|------|----------|--------|--------|
| Event schema registry | HIGH | MEDIUM | Schema validation |
| Event versioning automation | MEDIUM | MEDIUM | Schema evolution |
| Replay UI dashboard | LOW | HIGH | Operations |

### 8. Quality Gate Alignment

#### 8.1 QG-M2 (Tenant Isolation) Alignment

| Check | Event Architecture Support |
|-------|---------------------------|
| Data isolation | Tenant_id in all events, partition-based |
| Cross-tenant access blocked | Tenant validation in consumers |
| Audit trail | All events include tenant context |

#### 8.2 QG-M3 (Agent Runtime) Alignment

| Check | Event Architecture Support |
|-------|---------------------------|
| Agent isolation | Agent events include tenant context |
| Tool boundaries | Tool events scoped to saga |
| Execution tracking | Run events with correlation_id |

### 9. Generate Architecture Artifact

Output event architecture document to:
```
{output_folder}/planning-artifacts/event-architecture.md
```

Include all sections:
- Executive summary
- Event schema specification
- Event routing architecture
- Event processing design
- Implementation roadmap
- Risk assessment
- Quality gate alignment

---

## COLLABORATION MENUS (A/P/C):

After compiling the event architecture document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific architecture areas
- **P (Party Mode)**: Bring architect perspectives for final review
- **C (Continue)**: Accept architecture and complete workflow
- **[Specific section]**: Describe section to review further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete event architecture, risks, roadmap
- Process enhanced insights on architecture
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, update document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review event-driven architecture for multi-tenant system: {summary}"
- Process Platform Architect (Atlas), AI Runtime Architect (Nova), and Integration Architect (Kai) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save event architecture document to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Workflow complete

---

## Soft Gate Checkpoint

**Steps 1-5 complete the event architecture design workflow.**

Present summary of:
- Event envelope design
- Topic and routing strategy
- Processing and idempotency approach
- Saga orchestration patterns
- Implementation roadmap
- Key risks and mitigations

Ask for confirmation before finalizing document.

---

## SUCCESS METRICS:

- [ ] All design sections compiled
- [ ] Implementation roadmap documented
- [ ] Risk assessment complete
- [ ] Quality gate alignment verified
- [ ] Architecture document generated

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing design section | Return to relevant step |
| Inconsistent decisions | Review and reconcile |
| Quality gate misalignment | Update design to align |

---

## Verification

- [ ] Document includes all design decisions
- [ ] Implementation roadmap is actionable
- [ ] Risks are identified with mitigations
- [ ] Quality gates are addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/event-architecture.md`
- Implementation roadmap
- Risk assessment matrix
- Quality gate alignment matrix
- **Load template:** `{project-root}/_bmad/bam/data/templates/event-architecture-template.md`

---

## NEXT STEP:

Based on outcome:
- **Architecture approved:** Proceed to implementation
- **Changes requested:** Return to relevant step (Edit mode)
- **Quality gate validation needed:** Run validate mode (step-20-v)

## Workflow Complete

Event-driven architecture design workflow complete. See `event-architecture.md` for full specification.
