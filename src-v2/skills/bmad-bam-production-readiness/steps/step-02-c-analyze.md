# Step 02: Analyze Infrastructure Readiness

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🏗️ **VERIFY infrastructure-as-code completeness** for all environments

## EXECUTION PROTOCOLS

- 🎯 Focus: Analyze infrastructure readiness for production
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Database migrations, IaC, environment parity, DR, scaling
- 🚫 Do NOT: Assess observability (that's Step 03)
- 🔍 Use web search: Verify infrastructure patterns against current cloud best practices
- ⚠️ Gate: QG-P1 - Infrastructure is CRITICAL category

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Database migration strategy and rollback plans
- Infrastructure-as-code completeness
- Environment parity (dev/staging/prod)
- Disaster recovery and backup strategies
- Load balancing and auto-scaling configuration

**OUT OF SCOPE:**
- Observability and monitoring (Step 03)
- Security and compliance (Step 04)
- Final GO/NO-GO decision (Step 05)

---

## Purpose

Analyze infrastructure readiness for production deployment, including database migration strategies, infrastructure-as-code coverage, environment parity, disaster recovery plans, and scaling configurations. Infrastructure is a CRITICAL category for QG-P1.

---

## Prerequisites

- Step 01 completed: All gate artifacts loaded
- Production environment specified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: infrastructure

---

## Inputs

- Master architecture from Step 01
- Production environment specification
- Infrastructure configuration files
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Analyze infrastructure readiness across all CRITICAL categories.

---

## Main Sequence

### 1. Database Migration Strategy

#### 1.1 Migration Mechanism

| Aspect | Implementation | Status |
|--------|----------------|--------|
| Migration Tool | {{tool}} | Configured/Missing |
| Version Control | {{approach}} | YES/NO |
| Automated Execution | {{pipeline}} | YES/NO |
| Tenant-Aware Migrations | {{approach}} | YES/NO |

**Criteria:**
- [ ] Migration tool selected and configured
- [ ] All migrations version-controlled
- [ ] Migrations run automatically in CI/CD
- [ ] Tenant isolation maintained during migrations

#### 1.2 Rollback Strategy

| Migration Type | Rollback Approach | Tested |
|----------------|-------------------|--------|
| Schema changes | {{approach}} | YES/NO |
| Data migrations | {{approach}} | YES/NO |
| Index changes | {{approach}} | YES/NO |
| Tenant schema changes | {{approach}} | YES/NO |

**Criteria:**
- [ ] Rollback scripts exist for all migrations
- [ ] Rollback tested in staging environment
- [ ] Data recovery plan documented
- [ ] Time-to-rollback estimated and acceptable

#### 1.3 Zero-Downtime Migration

| Check | Status | Notes |
|-------|--------|-------|
| Blue-green database support | YES/NO | {{notes}} |
| Online schema changes | YES/NO | {{notes}} |
| Backward-compatible migrations | YES/NO | {{notes}} |
| Connection draining | YES/NO | {{notes}} |

### 2. Infrastructure-as-Code Completeness

#### 2.1 IaC Coverage

| Resource Type | IaC Coverage | Tool | Drift Detection |
|---------------|--------------|------|-----------------|
| Compute (VMs/Containers) | {{percent}}% | {{tool}} | YES/NO |
| Networking | {{percent}}% | {{tool}} | YES/NO |
| Databases | {{percent}}% | {{tool}} | YES/NO |
| Storage | {{percent}}% | {{tool}} | YES/NO |
| Security Groups | {{percent}}% | {{tool}} | YES/NO |
| IAM/RBAC | {{percent}}% | {{tool}} | YES/NO |
| Secrets Management | {{percent}}% | {{tool}} | YES/NO |

**Criteria:**
- [ ] All production resources defined in IaC
- [ ] IaC stored in version control
- [ ] Drift detection configured and alerting
- [ ] No manual resource creation required

#### 2.2 IaC Quality

| Check | Status |
|-------|--------|
| Modules/Reusable components | YES/NO |
| Environment parameterization | YES/NO |
| State management (remote, locked) | YES/NO |
| CI/CD integration | YES/NO |
| Plan/Apply separation | YES/NO |
| Documentation | YES/NO |

### 3. Environment Parity

#### 3.1 Configuration Parity

| Environment | Config Source | Parity Score | Gaps |
|-------------|---------------|--------------|------|
| Development | {{source}} | {{percent}}% | {{count}} |
| Staging | {{source}} | {{percent}}% | {{count}} |
| Production | {{source}} | - | - |

**Criteria:**
- [ ] Same IaC templates across environments
- [ ] Environment differences parameterized
- [ ] No snowflake configurations in production

#### 3.2 Data Parity

| Aspect | Dev | Staging | Prod |
|--------|-----|---------|------|
| Database schema | Same/Different | Same/Different | Baseline |
| Sample data | Synthetic | Anonymized | Real |
| Data volume | {{size}} | {{size}} | {{size}} |
| Tenant count | {{count}} | {{count}} | {{count}} |

**Criteria:**
- [ ] Staging data representative of production
- [ ] PII/sensitive data anonymized in non-prod
- [ ] Data refresh process documented

### 4. Disaster Recovery & Backup

#### 4.1 Backup Strategy

| Data Type | Backup Frequency | Retention | Tested |
|-----------|------------------|-----------|--------|
| Database | {{freq}} | {{days}} days | YES/NO |
| File Storage | {{freq}} | {{days}} days | YES/NO |
| Configuration | {{freq}} | {{days}} days | YES/NO |
| Secrets | {{freq}} | {{days}} days | YES/NO |

**Criteria:**
- [ ] Automated backups configured
- [ ] Backup retention meets compliance requirements
- [ ] Backup restoration tested quarterly
- [ ] Point-in-time recovery available for databases

#### 4.2 Disaster Recovery Plan

| Metric | Target | Validated |
|--------|--------|-----------|
| RTO (Recovery Time Objective) | {{hours}} hours | YES/NO |
| RPO (Recovery Point Objective) | {{minutes}} minutes | YES/NO |
| DR Region | {{region}} | Configured/Missing |
| DR Runbook | {{path}} | Documented/Missing |

**Criteria:**
- [ ] RTO/RPO defined and approved
- [ ] DR environment provisioned
- [ ] DR runbook documented and tested
- [ ] Failover tested within last 6 months

#### 4.3 Tenant Data Recovery

| Scenario | Recovery Approach | Time Estimate |
|----------|-------------------|---------------|
| Single tenant restore | {{approach}} | {{time}} |
| Multi-tenant incident | {{approach}} | {{time}} |
| Full environment restore | {{approach}} | {{time}} |
| Point-in-time recovery | {{approach}} | {{time}} |

### 5. Load Balancing & Auto-Scaling

#### 5.1 Load Balancer Configuration

| Check | Status | Notes |
|-------|--------|-------|
| Health checks configured | YES/NO | {{notes}} |
| SSL/TLS termination | YES/NO | {{notes}} |
| Connection draining | YES/NO | {{notes}} |
| Sticky sessions (if required) | YES/NO | {{notes}} |
| Rate limiting | YES/NO | {{notes}} |
| DDoS protection | YES/NO | {{notes}} |

#### 5.2 Auto-Scaling Configuration

| Resource | Min | Max | Scale-Up Trigger | Scale-Down |
|----------|-----|-----|------------------|------------|
| Web servers | {{min}} | {{max}} | {{trigger}} | {{trigger}} |
| API servers | {{min}} | {{max}} | {{trigger}} | {{trigger}} |
| Workers | {{min}} | {{max}} | {{trigger}} | {{trigger}} |
| Database replicas | {{min}} | {{max}} | {{trigger}} | Manual |

**Criteria:**
- [ ] Auto-scaling tested under load
- [ ] Scale-up time acceptable for expected traffic patterns
- [ ] Scale-down graceful (connection draining)
- [ ] Cost limits configured

#### 5.3 Capacity Planning

| Resource | Current Capacity | Expected Peak | Headroom |
|----------|------------------|---------------|----------|
| Compute | {{capacity}} | {{peak}} | {{percent}}% |
| Database connections | {{capacity}} | {{peak}} | {{percent}}% |
| Storage | {{capacity}} | {{peak}} | {{percent}}% |
| Network bandwidth | {{capacity}} | {{peak}} | {{percent}}% |

---

## COLLABORATION MENUS (A/P/C)

After completing infrastructure analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific infrastructure concerns
- **P (Party Mode)**: Multi-persona review of infrastructure readiness
- **C (Continue)**: Accept analysis and proceed to observability verification
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: infrastructure findings, migration concerns, scaling gaps
- Process enhanced insights on infrastructure patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review infrastructure readiness for production: {summary}"
- Process Platform Architect (Atlas) and DevOps Engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document infrastructure analysis findings
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## SUCCESS METRICS:

- [ ] Database migration strategy documented
- [ ] IaC coverage assessed (target: 100%)
- [ ] Environment parity verified
- [ ] DR/backup strategy validated
- [ ] Auto-scaling configuration reviewed
- [ ] Capacity planning complete

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing rollback strategy | Document rollback procedures before proceeding |
| IaC coverage < 90% | Add missing resources to IaC |
| DR not tested | Schedule DR test, proceed with CONDITIONAL |
| Auto-scaling not configured | Configure scaling rules before production |

---

## Verification

- [ ] All infrastructure categories assessed
- [ ] CRITICAL issues identified
- [ ] Gaps documented with remediation plan
- [ ] Patterns align with pattern registry

---

## Outputs

- Infrastructure readiness assessment
- Migration strategy documentation
- DR/backup verification results
- Scaling configuration review
- Gap analysis with remediation plan

---

## NEXT STEP:

Proceed to `step-03-c-design.md` to verify observability and monitoring readiness.
