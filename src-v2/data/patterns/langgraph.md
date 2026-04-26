# LangGraph Runtime - BAM Pattern

**Loaded by:** ZAL  
**Applies to:** AI agent orchestration

---

## When to Use

- Complex state machine workflows
- Conditional branching logic
- Human-in-the-loop patterns
- Persistent agent state required

## When NOT to Use

- Simple single-agent tasks
- No state persistence needed
- Team prefers different framework

## Architecture

```
┌────────────────────────────────────┐
│         LangGraph Graph            │
│  ┌─────────┐    ┌─────────┐       │
│  │ Node A  │───►│ Node B  │       │
│  │ (Tool)  │    │ (LLM)   │       │
│  └─────────┘    └────┬────┘       │
│                      │            │
│              ┌───────▼───────┐    │
│              │   Conditional  │    │
│              │     Router     │    │
│              └───┬───────┬───┘    │
│                  │       │        │
│           ┌──────▼─┐ ┌───▼────┐   │
│           │ Node C │ │ Node D │   │
│           └────────┘ └────────┘   │
└────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| State persistence | Learning curve |
| Visual debugging | Complexity overhead |
| Conditional flows | Python-centric |

## Web Research Queries

- "LangGraph production patterns {date}"
- "LangGraph state management multi-tenant {date}"
