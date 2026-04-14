# Step 4: Define Routing Rules

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Create route configurations, design request transformation, configure response handling, and plan failover routes.

## Prerequisites

- Steps 1-3 completed: Requirements, rate limiting, authentication
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: routing
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: resilience

---

## Inputs

- Output from Steps 1-3
- Service topology
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "API gateway routing patterns microservices {date}"
Search the web: "request transformation API gateway {date}"

_Source: [URL]_

### 1. Create Route Configurations

| Route | Path Pattern | Backend | Load Balancing |
|-------|--------------|---------|----------------|
| Users API | /api/v*/users/* | user-service | Round robin |
| Auth API | /api/v*/auth/* | auth-service | Sticky session |
| Tenant API | /api/v*/tenants/* | tenant-service | Weighted |
| AI API | /api/v*/ai/* | ai-runtime | Least connections |

### 2. Design Request Transformation

| Transformation | Trigger | Action |
|----------------|---------|--------|
| Header injection | All requests | Add X-Request-ID, X-Tenant-ID |
| Path rewrite | Version routing | /v1/* -> /api/* |
| Body transformation | Legacy support | XML -> JSON |
| Query normalization | Pagination | Standardize page/limit |

### 3. Configure Response Handling

| Response Type | Handling | Transformation |
|---------------|----------|----------------|
| Success | Pass through | Add standard headers |
| Client Error | Standardize | Uniform error format |
| Server Error | Mask details | Generic error + correlation ID |
| Timeout | Circuit break | 504 + retry guidance |

### 4. Plan Failover Routes

| Scenario | Detection | Failover Action |
|----------|-----------|-----------------|
| Service down | Health check fails | Route to standby |
| Region failure | Latency spike | Route to DR region |
| Rate limit | 429 responses | Queue or reject |
| Circuit open | Error threshold | Return cached/degraded |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the routing rules above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into routing and failover strategies
- **P (Party Mode)**: Bring DevOps and architect perspectives for routing review
- **C (Continue)**: Complete Create mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass routing context: routes, transformations, failover
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, finalize routing rules
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review routing configuration: {summary of routes and failover}"
- Process collaborative analysis from DevOps and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save routing configuration
- Create mode complete

---

## Verification

- [ ] Route configurations created
- [ ] Request transformations designed
- [ ] Response handling configured
- [ ] Failover routes planned
- [ ] Patterns align with pattern registry

## Outputs

- Route configuration document
- Transformation rules
- Failover strategy

## Next Step

Workflow complete. Present API Gateway Design with routing configuration to user for review and approval.
