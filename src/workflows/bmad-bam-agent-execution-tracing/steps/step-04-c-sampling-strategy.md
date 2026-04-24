# Step 4: Sampling Strategy Design

## Purpose

Design per-tier sampling strategy balancing observability with cost and privacy.

## Prerequisites

- Step 3 complete (platform integration configured)
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-tracing.md`

## Actions

### 1. Define Per-Tier Base Sampling

| Tenant Tier | Sample Rate | Full Prompt | Retention |
|-------------|-------------|-------------|-----------|
| Enterprise | 100% | Yes (with consent) | 90 days |
| Pro | 50% | 10% | 30 days |
| Free | 10% | No | 7 days |

### 2. Configure Adaptive Sampling Rules

| Condition | Sampling Override | Rationale |
|-----------|-------------------|-----------|
| Error occurred | 100% | Debug all errors |
| Latency > SLO | 100% | Investigate slow requests |
| New agent version | 100% for 24h | Monitor rollouts |
| High cost request | 100% | Cost analysis |
| Security event | 100% | Audit requirement |

### 3. Configure Privacy-Aware Capture

| Data Type | Enterprise | Pro | Free |
|-----------|------------|-----|------|
| User input | Masked PII | Masked | Not captured |
| System prompt | Full | Partial | Not captured |
| Tool inputs | Full | Partial | Headers only |
| Tool outputs | Full | Truncated | Status only |

### 4. Cost Optimization Settings

| Setting | Purpose | Configuration |
|---------|---------|---------------|
| Sampling budget | Cost cap | $X/month per tier |
| Head sampling | Early decision | Trace ID modulo |
| Tail sampling | Keep interesting | Errors, slow, costly |

## Soft Gate Checkpoint

**Steps 1-4 complete the sampling strategy design.**

Present sampling strategy summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "distributed tracing sampling strategies {date}"
Search the web: "observability cost optimization {date}"

## Verification

- [ ] Per-tier sampling rates defined
- [ ] Adaptive rules configured
- [ ] Privacy masking specified
- [ ] Cost optimization considered

## Outputs

- Sampling strategy specification
- Per-tier sampling configuration
- Privacy masking rules

## Next Step

Proceed to `step-05-c-debug-workflows.md` with sampling strategy designed.
