# AutoGen Runtime - BAM Pattern

**Loaded by:** ZAA  
**Applies to:** AI agent orchestration

---

## When to Use

- Multi-agent conversations
- Debate/consensus workflows
- Human proxy patterns
- Code generation tasks

## When NOT to Use

- Simple task completion
- State machine workflows
- Deterministic flows needed

## Architecture

```
┌────────────────────────────────────┐
│        Conversation Manager        │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent A  │◄─┤ Agent B  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       │  Messages   │             │
│       └──────►◄─────┘             │
└────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Natural conversation | Less control |
| Flexible patterns | Unpredictable length |
| Easy setup | Cost management |

## Web Research Queries

- "AutoGen production patterns {date}"
- "AutoGen multi-agent multi-tenant {date}"
