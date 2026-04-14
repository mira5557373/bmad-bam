# Step 1: Transport Layer Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design the transport layer selection between SSE and WebSocket, connection management, and backpressure handling.

---

## Prerequisites

- Agent runtime architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Select Transport Protocol

| Protocol | Pros | Cons | Use Case |
|----------|------|------|----------|
| SSE | Simple, HTTP-based, auto-reconnect | Unidirectional | Read-only streaming |
| WebSocket | Bidirectional, low latency | Complex, stateful | Interactive chat |
| HTTP/2 Push | Multiplexed, efficient | Browser support | API clients |

### 2. Design Connection Management

| Aspect | Strategy | Implementation |
|--------|----------|----------------|
| Keep-alive | 30s heartbeat | Ping/pong |
| Timeout | 5 min idle | Auto-close |
| Reconnection | Exponential backoff | Client-side |
| Load balancing | Sticky sessions | Header-based |

### 3. Configure Backpressure

| Mechanism | When | Action |
|-----------|------|--------|
| Client buffer full | Consumer slow | Pause stream |
| Server overloaded | High load | Queue + timeout |
| Network congestion | Packet loss | Rate reduction |

**Verify current best practices with web search:**
Search the web: "SSE vs WebSocket LLM streaming {date}"
Search the web: "real-time streaming architecture patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into protocol selection
- **P (Party Mode)**: Bring infrastructure and frontend perspectives
- **C (Continue)**: Accept transport design and proceed to chunking
```

#### If 'C' (Continue):
- Save transport layer design to output document
- Proceed to next step: `step-02-c-chunking-strategy-design.md`

---

## Verification

- [ ] Transport protocol selected
- [ ] Connection management designed
- [ ] Backpressure configured

---

## Outputs

- Transport protocol selection
- Connection management design
- Backpressure configuration

---

## Next Step

Proceed to `step-02-c-chunking-strategy-design.md` to design chunking.
