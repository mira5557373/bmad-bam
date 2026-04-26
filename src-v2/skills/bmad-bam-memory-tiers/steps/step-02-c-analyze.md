# Step 02: Design Short-Term Memory

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design session-scoped and conversation memory tiers
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Use AI runtime configuration and memory tier patterns
- 🚫 Do NOT: Design long-term memory (that's Step 03)
- 🔍 Use web search: Verify current best practices for LLM context management
- ⚠️ Note: TTL and eviction policies are critical for resource management

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Session memory design (single request context)
- Conversation memory design (multi-turn dialog)
- Memory key patterns with tenant scoping
- TTL and eviction policies
- Context window management

**OUT OF SCOPE:**
- Long-term memory / vector stores (Step 03)
- Memory isolation verification (Step 04)
- Final compilation (Step 05)

---

## Purpose

Design the short-term memory tiers (session and conversation) that maintain context within and across agent interactions. These tiers handle immediate context, dialog history, and working memory for active tasks.

---

## Prerequisites

- Step 01 completed: AI runtime configuration loaded
- Memory tier requirements identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: context-compression
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-context

**Web Research (Required):**

Search the web: "LLM context window management best practices {date}"
Search the web: "AI agent conversation memory patterns {date}"
Search the web: "Redis session management for AI agents {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Design Session Memory

Session memory maintains context within a single agent request:

| Attribute | Specification |
|-----------|---------------|
| Scope | Single request/tool call |
| Storage | In-memory (agent process) |
| TTL | Request duration |
| Max Size | {{max_session_tokens}} tokens |
| Eviction | Automatic on request completion |

**Session Memory Contents:**

| Content Type | Description | Priority |
|--------------|-------------|----------|
| User Input | Current user message/query | Critical |
| Tool Calls | In-progress tool invocations | Critical |
| Intermediate Results | Step outputs within request | High |
| System Prompt | Active system context | High |
| Scratchpad | Agent reasoning/planning | Medium |

### 2. Design Conversation Memory

Conversation memory maintains context across multiple turns:

| Attribute | Specification |
|-----------|---------------|
| Scope | Multi-turn dialog session |
| Storage | Redis with tenant namespacing |
| TTL | {{conversation_ttl}} (default: 30 minutes inactive) |
| Max Size | {{max_conversation_tokens}} tokens |
| Eviction | LRU with importance weighting |

**Memory Key Pattern (Tenant-Scoped):**

```
conversation:{tenant_id}:{session_id}:{turn_number}
```

Example: `conversation:tenant_abc123:sess_xyz789:turn_5`

**Conversation Memory Contents:**

| Content Type | Storage Strategy | Retention |
|--------------|------------------|-----------|
| Message History | Sliding window (last N turns) | Session |
| Summarized Context | Periodic compression | Session |
| Entity Memory | Key-value extraction | Session |
| Intent History | User intent progression | Session |
| Tool Results | Summary of tool outputs | Session |

### 3. Design Context Window Management

Manage context window to prevent overflow:

| Strategy | When to Use | Token Budget |
|----------|-------------|--------------|
| Full History | Short conversations (<10 turns) | 100% |
| Sliding Window | Medium conversations (10-50 turns) | 70% history, 30% summary |
| Compression | Long conversations (>50 turns) | 30% history, 70% summary |

**Context Allocation:**

| Component | Allocation | Notes |
|-----------|------------|-------|
| System Prompt | 15-20% | Fixed overhead |
| User Input | 10-15% | Current turn |
| Conversation History | 40-50% | Sliding window |
| Tool Results | 15-20% | Recent tool outputs |
| Response Buffer | 10-15% | Reserved for generation |

### 4. Design TTL and Eviction Policies

**Session TTL:**

| Condition | TTL | Action |
|-----------|-----|--------|
| Normal Request | Request duration | Auto-cleanup |
| Long-running Task | {{task_timeout}} | Force cleanup |
| Error State | Immediate | Cleanup + log |

**Conversation TTL:**

| Condition | TTL | Action |
|-----------|-----|--------|
| Active Conversation | Reset on activity | Extend |
| Inactive | {{idle_ttl}} (30 min default) | Compress + archive |
| Max Duration | {{max_duration}} (24 hr default) | Archive + cleanup |
| User Logout | Immediate | Archive |

**Eviction Strategy:**

| Tier | Strategy | Priority Order |
|------|----------|----------------|
| Session | FIFO | Oldest intermediate results first |
| Conversation | LRU + Importance | Low-importance messages first |

**Importance Weighting:**

| Message Type | Weight | Eviction Priority |
|--------------|--------|-------------------|
| User Query | 1.0 | Never evict |
| Agent Response | 0.8 | Last resort |
| Tool Call | 0.6 | Keep if referenced |
| Tool Result | 0.4 | Summarize, then evict |
| System Message | 0.3 | Summarize, then evict |
| Intermediate | 0.2 | First to evict |

### 5. Design Memory Compression

When context window pressure increases:

| Stage | Trigger | Action |
|-------|---------|--------|
| Normal | <70% utilized | No action |
| Warning | 70-85% utilized | Begin summarization |
| Critical | 85-95% utilized | Aggressive compression |
| Emergency | >95% utilized | Drop low-priority content |

**Compression Techniques:**

| Technique | Use Case | Token Reduction |
|-----------|----------|-----------------|
| Message Summarization | Long agent responses | 50-70% |
| Tool Result Truncation | Large tool outputs | 60-80% |
| History Compression | Old conversation turns | 70-90% |
| Entity Extraction | Replace verbose text with entities | 40-60% |

---

## COLLABORATION MENUS (A/P/C):

After presenting short-term memory design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into context management strategies
- **P (Party Mode)**: Bring architect perspectives on memory optimization
- **C (Continue)**: Proceed to long-term memory design

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: session/conversation design, context window strategy
- Process enhanced insights on compression and eviction
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review short-term memory design for multi-tenant AI agents"
- Present synthesized recommendations from Atlas (Platform), Nova (AI Runtime)
- Return to A/P/C menu

#### If 'C' (Continue):
- Save short-term memory design
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to: `step-03-c-design.md`

---

## Verification

- [ ] Session memory design documented
- [ ] Conversation memory design documented
- [ ] Memory key patterns include tenant scoping
- [ ] TTL policies defined for all scenarios
- [ ] Eviction strategies established
- [ ] Context window management designed
- [ ] Compression techniques specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Session memory specification
- Conversation memory specification
- Memory key pattern with tenant namespacing
- TTL and eviction policy matrix
- Context window allocation strategy
- Compression technique catalog

---

## NEXT STEP:

Proceed to `step-03-c-design.md` to design long-term memory (vector stores and semantic memory).
