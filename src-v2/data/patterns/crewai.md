# CrewAI Runtime - BAM Pattern

**Loaded by:** ZAC  
**Applies to:** AI agent orchestration

---

## When to Use

- Role-based agent collaboration
- Task delegation patterns
- Hierarchical agent structures
- Team-based workflows

## When NOT to Use

- Simple single-agent tasks
- Complex state machines needed
- Fine-grained control required

## Architecture

```
┌────────────────────────────────────┐
│            Crew Manager            │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent 1  │  │ Agent 2  │       │
│  │(Analyst) │  │(Writer)  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       └──────┬──────┘             │
│              │                    │
│       ┌──────▼──────┐             │
│       │ Task Queue  │             │
│       └─────────────┘             │
└────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Role clarity | Less state control |
| Easy setup | Limited branching |
| Task focus | Sequential execution |

## Web Research Queries

- "CrewAI production deployment {date}"
- "CrewAI multi-tenant patterns {date}"
