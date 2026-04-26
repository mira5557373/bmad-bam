# Step 02: Design Horizontal Scaling

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Stateless service replication, load balancing, autoscaling
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Build on tenant model and compute requirements from Step 1
- 🚫 Do NOT: Address database scaling (Step 3) or tenant-aware scaling (Step 4)
- 🔍 Use web search: Verify horizontal scaling patterns against Kubernetes best practices

---

## Purpose

Design the horizontal scaling strategy for stateless services, including load balancing, session handling, and autoscaling policies differentiated by tenant tier.

---

## Prerequisites

- Step 01 complete with scaling dimensions established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `scale-horizontal`

**Web Research (Required):**

Search the web: "Kubernetes horizontal pod autoscaler multi-tenant best practices {date}"
Search the web: "load balancer session affinity stateless services patterns {date}"
Search the web: "autoscaling policies by customer tier SaaS {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Stateless Service Replication

Design replication strategy per service type:

| Service Type | Min Replicas | Max Replicas | Scaling Metric |
|--------------|--------------|--------------|----------------|
| API Gateway | 3 | 20 | Requests/sec |
| Core Services | 2 | 15 | CPU + Memory |
| Background Workers | 1 | 10 | Queue depth |
| WebSocket Handlers | 2 | 8 | Connection count |

**Statelessness Requirements:**

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| No local state | External cache (Redis) | Health check |
| No local files | Object storage (S3) | Startup probe |
| Session externalization | Redis/JWT | Load test |
| Graceful shutdown | SIGTERM handling | Rolling update |

### 2. Load Balancing Strategies

| Strategy | Use Case | Algorithm |
|----------|----------|-----------|
| Round Robin | General API traffic | Default |
| Least Connections | Variable request duration | AI inference |
| IP Hash | Stateful connections | WebSocket upgrade |
| Weighted | Canary deployments | Traffic splitting |

**Load Balancer Configuration:**

| Setting | Value | Rationale |
|---------|-------|-----------|
| Health Check Interval | 10s | Balance detection speed vs overhead |
| Unhealthy Threshold | 3 | Prevent flapping |
| Drain Timeout | 30s | Complete in-flight requests |
| Connection Timeout | 60s | Account for slow AI responses |

### 3. Session Affinity Considerations

| Scenario | Affinity Required | Solution |
|----------|-------------------|----------|
| REST API | No | Stateless, JWT auth |
| WebSocket | Yes | IP Hash or cookie |
| File Upload | Temp only | Multipart to object storage |
| AI Streaming | Yes | Connection ID routing |

**Affinity Tradeoffs:**

| Aspect | With Affinity | Without Affinity |
|--------|---------------|------------------|
| Load Distribution | Uneven | Even |
| Failover | Complex | Simple |
| Scaling | Constrained | Flexible |
| Implementation | Complex | Simple |

### 4. Autoscaling Policies by Tier

| Tier | Scale-Up Threshold | Scale-Up Cooldown | Scale-Down Cooldown |
|------|-------------------|-------------------|---------------------|
| Free | CPU > 80% | 60s | 300s |
| Pro | CPU > 70% | 45s | 180s |
| Enterprise | CPU > 60% | 30s | 120s |

**Tier-Specific Behaviors:**

| Behavior | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Burst Capacity | Limited | Standard | Unlimited |
| Scale Speed | Slow | Standard | Fast |
| Minimum Replicas | Shared | Dedicated pool | Dedicated |
| Priority | Normal | High | Critical |

---

## COLLABORATION MENUS (A/P/C)

After presenting horizontal scaling design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific scaling aspects
- **P (Party Mode)**: Bring architect perspectives on scaling tradeoffs
- **C (Continue)**: Proceed to database scaling design

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: horizontal scaling design, tier requirements
- Process enhanced insights on scaling tradeoffs
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review horizontal scaling strategy for multi-tenant SaaS"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document horizontal scaling decisions
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] Stateless service replication designed
- [ ] Load balancing strategy selected
- [ ] Session affinity requirements documented
- [ ] Autoscaling policies defined per tier
- [ ] Web research findings incorporated with citations

---

## Outputs

- Service replication specifications
- Load balancing configuration
- Session affinity decision matrix
- Autoscaling policies by tier

---

## Next Step

Proceed to `step-03-c-design.md` to design database scaling strategies.
