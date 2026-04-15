# Step 2: Assess Infrastructure Readiness

## Purpose

Assess infrastructure readiness for production workloads including capacity, reliability, and scaling.

## Prerequisites

- Step 1 complete (all gates passed)
- Infrastructure documentation available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `infrastructure`

## Actions

### 1. Capacity Assessment

| Component | Current Capacity | Expected Load | Headroom | Status |
|-----------|------------------|---------------|----------|--------|
| Compute (CPU) | | | 50% | |
| Memory | | | 40% | |
| Storage | | | 60% | |
| Network | | | 50% | |
| Database connections | | | 40% | |

### 2. High Availability Verification

| Component | HA Configuration | Failover Tested | RTO/RPO Met | Status |
|-----------|------------------|-----------------|-------------|--------|
| Application | Multi-AZ | | | |
| Database | Primary + Replica | | | |
| Cache | Cluster mode | | | |
| Load balancer | Active-Active | | | |
| DNS | Failover routing | | | |

### 3. Auto-Scaling Configuration

| Service | Min Instances | Max Instances | Scale Trigger | Status |
|---------|---------------|---------------|---------------|--------|
| API servers | | | CPU > 70% | |
| Workers | | | Queue depth | |
| AI inference | | | Request latency | |

### 4. Infrastructure Security

| Control | Requirement | Implementation | Status |
|---------|-------------|----------------|--------|
| Network segmentation | VPC/Subnets | | |
| Firewall rules | Least privilege | | |
| DDoS protection | WAF + Shield | | |
| Secrets management | KMS/Vault | | |

**Verify infrastructure patterns with web search:**
Search the web: "production infrastructure checklist AI platforms {date}"

## Verification

- [ ] Capacity sufficient with headroom
- [ ] HA verified and tested
- [ ] Auto-scaling configured
- [ ] Infrastructure security verified

## Outputs

- Infrastructure readiness assessment

## Next Step

Proceed to `step-03-c-validate-observability.md`
