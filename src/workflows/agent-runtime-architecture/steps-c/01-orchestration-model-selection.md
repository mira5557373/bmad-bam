# Step 1: Orchestration Model Selection

Apply Principle 11 — Start Simple, Escalate Deliberately:

- Default: single agent with tools
- Escalate to manager + specialists only when justified (tool count >15, conflicting system prompts, multi-step quality degradation)
- Document escalation decision as ADR
- Every multi-agent topology must have a kill switch fallback to simpler topology

Prompt management: system prompts stored as version-controlled templates in AI runtime module, with tier-specific overrides.
