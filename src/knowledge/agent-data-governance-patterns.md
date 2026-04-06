# Agent Data Governance Patterns

## Principle

Agent-generated data inherits trust properties from its input context and must be classified, retained, and governed accordingly. Classification never exceeds the highest-trust input that produced it.

## Rationale

Agents produce data that is probabilistic, may contain hallucinations, and crosses trust boundaries. Traditional data governance (classify by sensitivity) is insufficient — agent data must also track provenance, trust tier, and semantic integrity.

## Data Classification Matrix

| Data Type              | Classification        | Retention                         | Trust Tier                  | Module Boundary                 |
| ---------------------- | --------------------- | --------------------------------- | --------------------------- | ------------------------------- |
| Agent text output      | `agent_generated`     | Run contract policy (default 90d) | Inherits run output tier    | `ai-runtime` → `data-store`     |
| Intermediate reasoning | `agent_internal`      | 30 days                           | `untrusted`                 | `ai-runtime` (internal only)    |
| Tool call results      | `tool_output`         | Source tool's policy              | Tool's declared tier        | `tool-registry` → `data-store`  |
| Compiled context       | `context_compilation` | Run duration + 7d                 | Mixed (highest source tier) | `context-compiler`              |
| Decision lineage       | `audit_trail`         | 7 years                           | `system` (immutable)        | `observability` → `audit-store` |

## Context Poisoning Prevention

- RAG content is `tier_3_untrusted` — never overrides `tier_1_system`
- Cross-agent outputs re-classified as `tier_2_user` maximum
- Memory entries tagged with source agent + trust tier
- Multi-modal injection defense treats all non-text extracted content as `tier_3_untrusted`

## Governance Action Decision Matrix

| Signal                              | Threshold                                          | Action                                | Owner            |
| ----------------------------------- | -------------------------------------------------- | ------------------------------------- | ---------------- |
| Semantic drift (embedding distance) | >0.15 over 50 runs                                 | Flag for behavioral regression review | ML Ops           |
| Context poisoning attempt           | Any untrusted content influencing tier_1 decisions | Block + alert                         | Security         |
| Data retention expiry               | Per classification policy                          | Archive or delete                     | Data Platform    |
| Cross-agent trust escalation        | Output trust > input trust                         | Reject classification                 | Context Compiler |
| Multi-modal injection               | Extracted text matches injection patterns          | Quarantine + alert                    | Security         |

## Artifact Store Integration

| Concern          | Decision                            | Rationale                                 |
| ---------------- | ----------------------------------- | ----------------------------------------- |
| Storage backend  | S3 with metadata in PostgreSQL      | Reuse existing S3 infrastructure (S4.5)   |
| Versioning       | Auto-increment per artifact lineage | Track evolution across runs               |
| Trust tier       | Labeled at creation, immutable      | Prevent trust escalation                  |
| Cross-run access | Via context compiler only           | Compiler controls what enters context     |
| Size limit       | Unlimited (S3-backed)               | Unlike LangGraph checkpoints (10MB limit) |

## Anti-Patterns

| Anti-Pattern                                    | Problem                                            | Correct Approach                                            |
| ----------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| Treating agent output same as user-entered data | Missing provenance metadata, unreliable downstream | Agent outputs carry provenance (agent, model, run contract) |
| Allowing trust tier escalation                  | Untrusted content gains trusted status             | Classification never exceeds highest-trust input            |
| No retention policy for intermediate reasoning  | Storage bloat, compliance risk                     | 30-day retention for internal reasoning                     |
| Skipping semantic drift detection               | Silent quality degradation over time               | Monitor embedding distance over 50-run windows              |

## Cross-Reference

- S4.6.1: Agent data governance, artifact store integration
- S28.18: context-compiler-patterns (trust tier separation)

See also: context-compiler-patterns.md, action-gateway-patterns.md, agent-identity-tbac-patterns.md
