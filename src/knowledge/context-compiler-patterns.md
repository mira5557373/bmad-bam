# Context Compiler Patterns

## Principle

Context is compiled per-step from multiple sources using signal-quality scoring, not appended from a static allocation. The compiler evaluates each signal's relevance to the current step and assembles context within the model's window budget.

## Rationale

Static context allocation (e.g., 25% RAG, 50% conversation) wastes tokens on irrelevant content and starves relevant signals. The compiler scores signal quality per-step, ensuring the most relevant information occupies the limited context window.

## Context Compiler Decision Matrix

| Signal Source          | Trust Tier      | Priority    | Eviction Order           | Module Source                 |
| ---------------------- | --------------- | ----------- | ------------------------ | ----------------------------- |
| System instructions    | `verified`      | 1 (highest) | Never                    | AI runtime config             |
| Run contract objective | `verified`      | 2           | Never                    | AI runtime shared-kernel      |
| Active procedure steps | `verified`      | 3           | Completed first          | AI runtime procedure registry |
| Current-run artifacts  | `corroborated`  | 4           | Oldest first             | Artifact store (S3)           |
| User messages          | `user-provided` | 5           | Summarized after 3 turns | Session memory (S4.6)         |
| RAG chunks             | `unverified`    | 6           | Lowest-relevance first   | RAG facade (S4.6)             |
| Conversation history   | `user-provided` | 7           | Aggressive summarization | Session memory (S4.6)         |
| Cross-run memory       | `corroborated`  | 8           | Relevance-scored         | Mem0 (S4.6)                   |

## Trust-Tier Separation Rules

- Verified content never mixed with unverified in instruction position
- RAG content is `tier_3_untrusted` — never overrides `tier_1_system`
- Cross-agent outputs re-classified as `tier_2_user` maximum
- Memory entries tagged with source agent + trust tier
- Context poisoning prevention relies on strict trust tier boundaries

## Eviction Strategy

| Priority Level            | Eviction Behavior              | Trigger                 |
| ------------------------- | ------------------------------ | ----------------------- |
| System instructions (P1)  | Never evicted                  | N/A                     |
| Run contract (P2)         | Never evicted                  | N/A                     |
| Procedure steps (P3)      | Completed steps evicted first  | Context budget exceeded |
| Artifacts (P4)            | Oldest artifacts evicted first | Context budget exceeded |
| User messages (P5)        | Summarized after 3 turns       | Turn count threshold    |
| RAG chunks (P6)           | Lowest-relevance evicted first | Context budget exceeded |
| Conversation history (P7) | Aggressive summarization       | Always after 3 turns    |
| Cross-run memory (P8)     | Relevance-scored eviction      | Context budget exceeded |

## Budget-Fit Calculation

Compiled context must fit within: `model_context_window - output_budget - safety_margin`

| Component             | Budget Source                    | Typical Allocation       |
| --------------------- | -------------------------------- | ------------------------ |
| Model context window  | Model config (e.g., 128K tokens) | Fixed                    |
| Output budget         | Run contract or tier default     | 2K-8K tokens             |
| Safety margin         | System config                    | 512 tokens               |
| Available for context | Calculated                       | Window - output - margin |

## Conversation History Strategy

| Tier       | Strategy                        | Trigger Threshold | Max Messages Kept    | Summarization Model |
| ---------- | ------------------------------- | ----------------- | -------------------- | ------------------- |
| FREE       | Aggressive summarization        | >20 messages      | Last 10 + summary    | Cheapest available  |
| PRO        | Moderate summarization          | >50 messages      | Last 25 + summary    | Same tier model     |
| ENTERPRISE | Full history + periodic summary | >80 messages      | All + summary prefix | Same tier model     |

On conversation close, the final summary is written to user-scope memory if the tenant tier allows it.

## Consistency Model

| Operation                 | Consistency            | Implementation                     | Module Boundary              |
| ------------------------- | ---------------------- | ---------------------------------- | ---------------------------- |
| Context compilation cache | Strong within run      | Redis, run-scoped keys             | `context-compiler` → `cache` |
| Cross-run memory          | Eventual (1-5s)        | Mem0 async replication             | `memory`                     |
| Compiled context storage  | Per-step, run duration | `context-compiler` → `memory`      |
| Context decisions         | Permanent audit        | `context-compiler` → `audit-store` |

## Verification Criteria (Foundation Gate)

- [ ] Context compiler functional with trust-tier priority
- [ ] Trust-tier separation enforced — unverified content never in instruction position
- [ ] Per-step recompilation operational — context refreshed before every LLM call
- [ ] Eviction by priority working — system instructions never evicted
- [ ] Budget-fit calculation correct — compiled context fits within window

## Anti-Patterns

| Anti-Pattern                               | Problem                                   | Correct Approach                                                 |
| ------------------------------------------ | ----------------------------------------- | ---------------------------------------------------------------- |
| Static percentage allocation               | Wastes tokens on irrelevant content       | Compiler scores signal quality per-step                          |
| Appending all conversation history         | Context window overflow, irrelevant noise | Summarize aggressively after 3 turns                             |
| Mixing trust tiers in instruction position | Context poisoning vulnerability           | Verified content only in instruction position                    |
| Skipping per-step recompilation            | Stale context from previous steps         | Recompile before every LLM call                                  |
| No eviction strategy                       | Context overflow crashes                  | Priority-based eviction with never-evict for system instructions |

## Cross-Reference

- S4.6.1: Context compiler decision matrix, trust tier definitions
- S28.10: memory-tier-patterns (memory scope classification and retention)

See also: memory-tier-patterns.md, run-contract-patterns.md, action-gateway-patterns.md, agent-data-governance-patterns.md
