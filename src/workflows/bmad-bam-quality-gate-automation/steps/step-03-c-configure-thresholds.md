# Step 3: Configure Thresholds

## Purpose

Configure pass/fail thresholds for automated gate checks.

## Actions

### 1. Define Coverage Thresholds

| Metric | Minimum | Target | Action if Below |
|--------|---------|--------|-----------------|
| Unit test coverage | 80% | 90% | Block |
| Integration coverage | 70% | 85% | Block |
| Isolation test pass | 100% | 100% | Block |
| E2E test pass | 95% | 100% | Warn |

### 2. Define Security Thresholds

| Finding Type | Allowed | Action |
|--------------|---------|--------|
| Critical | 0 | Block |
| High | 0 | Block |
| Medium | 5 | Warn |
| Low | 20 | Info |

### 3. Define Performance Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| P95 latency | < 500ms | Block if exceeded |
| Error rate | < 0.1% | Block if exceeded |
| Throughput | > 1000 rps | Warn if below |

## Web Research Verification

Search the web: "quality gate threshold best practices {date}"
Search the web: "SaaS security threshold standards {date}"

## Verification

- [ ] Coverage thresholds defined
- [ ] Security thresholds defined
- [ ] Performance thresholds defined

## Outputs

- Threshold configuration

## Next Step

Proceed to `step-04-c-define-bypass-policy.md`.
