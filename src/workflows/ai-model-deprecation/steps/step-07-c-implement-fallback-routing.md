# Step 7: Implement Fallback Routing

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Implement intelligent routing to redirect requests from the deprecated model to replacement models, ensuring continuity of service while minimizing disruption to tenants.

---

## Prerequisites

- Step 06 (Provide Migration Support) completed
- Replacement models validated and deployed
- Routing infrastructure available
- Tenant migration status known
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-fallback
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Design Routing Strategy

Define the fallback routing architecture:

| Route Type | Description | Use Case | Priority |
|------------|-------------|----------|----------|
| Direct replacement | Route to exact replacement model | Feature parity exists | 1 |
| Capability-based | Route based on request capabilities | Mixed workloads | 2 |
| Tenant-specific | Custom routing per tenant config | Enterprise tenants | 3 |
| Graceful degradation | Route to lower-capability fallback | Emergency scenarios | 4 |

### 2. Configure Model Router

Set up routing rules for the deprecated model:

| Rule ID | Condition | Target Model | Fallback | Priority |
|---------|-----------|--------------|----------|----------|
| R001 | tenant.tier == 'enterprise' | {model} | {fallback} | 100 |
| R002 | tenant.tier == 'pro' | {model} | {fallback} | 90 |
| R003 | tenant.tier == 'free' | {model} | {fallback} | 80 |
| R004 | request.feature == 'vision' | {model} | {fallback} | 95 |
| R005 | default | {model} | {fallback} | 0 |

### 3. Implement Request Translation

Configure request/response translation layers:

| Translation Type | Source Format | Target Format | Handler | Status |
|------------------|---------------|---------------|---------|--------|
| Request schema | Deprecated API | Replacement API | Adapter A | {status} |
| Token counting | Old tokenizer | New tokenizer | Adapter B | {status} |
| Response format | New format | Old format | Adapter C | {status} |
| Error codes | New codes | Old codes | Adapter D | {status} |

### 4. Configure Tenant-Specific Routing

Set up custom routing for complex tenants:

| Tenant | Custom Route | Override Reason | Expiration | Status |
|--------|--------------|-----------------|------------|--------|
| {name} | {route} | {reason} | {date} | {status} |

Custom routing scenarios:
- Legacy integration requirements
- Contractual obligations
- Performance requirements
- Compliance constraints

### 5. Implement Traffic Shifting

Define gradual traffic migration approach:

| Phase | Deprecated Model % | Replacement Model % | Criteria to Advance | Rollback Trigger |
|-------|-------------------|---------------------|--------------------|--------------------|
| Canary | 95% | 5% | Error rate < 0.1% | Error rate > 1% |
| Limited | 80% | 20% | Latency delta < 10% | P95 > threshold |
| Moderate | 50% | 50% | No P1 issues | Any P1 issue |
| Majority | 20% | 80% | Migration > 80% | Multiple P2 issues |
| Complete | 0% | 100% | Sunset date reached | N/A |

### 6. Set Up Routing Monitoring

Configure observability for routing decisions:

| Metric | Description | Alert Threshold | Dashboard |
|--------|-------------|-----------------|-----------|
| Route decisions/sec | Routing throughput | < 1000/s | Infrastructure |
| Fallback activations | Fallback trigger rate | > 5%/hour | Reliability |
| Translation errors | Adapter failures | > 0.1%/hour | Errors |
| Latency overhead | Routing added latency | > 10ms p95 | Performance |
| Tenant route changes | Config updates | > 10/hour | Operations |

### 7. Configure Automatic Failover

Set up automatic failover for deprecated model unavailability:

| Trigger | Detection Method | Failover Target | Recovery Action |
|---------|------------------|-----------------|-----------------|
| Model unavailable | Health check failure | Primary replacement | Auto-route |
| Rate limit exceeded | 429 responses | Secondary replacement | Load balance |
| Latency spike | P95 > threshold | Fallback model | Shed load |
| Error rate spike | 5xx > 5% | Fallback chain | Alert + route |

### 8. Test Routing Configuration

Validate routing behavior:

| Test Case | Input | Expected Behavior | Actual | Status |
|-----------|-------|-------------------|--------|--------|
| Normal request | Standard request | Route to replacement | {result} | {status} |
| Enterprise tenant | Enterprise request | Custom route | {result} | {status} |
| Vision request | Image input | Vision-capable model | {result} | {status} |
| Fallback trigger | Simulate failure | Fallback activation | {result} | {status} |
| Rollback | Manual trigger | Revert to deprecated | {result} | {status} |

**Verify current best practices with web search:**
Search the web: "AI model routing patterns multi-tenant {date}"
Search the web: "LLM fallback chain implementation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into routing architecture
- **[P] Party Mode**: Collaborative routing optimization
- **[C] Continue**: Proceed to migration monitoring

### Menu Options

### [A]nalyze Options
- **A1**: Analyze routing performance characteristics
- **A2**: Review translation layer accuracy
- **A3**: Evaluate traffic shifting strategy
- **A4**: Assess failover coverage

### [P]ropose Changes
- **P1**: Propose routing rule optimizations
- **P2**: Suggest translation improvements
- **P3**: Recommend traffic shifting adjustments
- **P4**: Identify additional failover scenarios

### [C]ontinue
- **C1**: Confirm routing implemented and proceed
- **C2**: Mark step complete and load `08-monitor-migration-progress.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Routing strategy defined and documented
- [ ] Model router configured with all rules
- [ ] Request translation layers implemented
- [ ] Tenant-specific routing configured
- [ ] Traffic shifting plan implemented
- [ ] Routing monitoring operational
- [ ] Automatic failover tested
- [ ] All routing tests passed

---

## Outputs

- Routing strategy document
- Router configuration files
- Translation adapter specifications
- Tenant routing overrides
- Traffic shifting schedule
- Routing dashboard configuration
- Failover runbook
- Routing test results

---

## Next Step

Proceed to `step-08-c-monitor-migration-progress.md` to track tenant migrations.
