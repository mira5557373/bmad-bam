# Step 1: Define Infrastructure Baselines

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- SEARCH Use web search to verify current best practices when making technology decisions

---

## Purpose

Define security configuration baselines for infrastructure components including cloud resources, containers, and networking.

## Prerequisites

- Master architecture approved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define Cloud Security Baselines

| Resource | Baseline | CIS Benchmark |
|----------|----------|---------------|
| Compute | No public IP, IMDSv2 | CIS AWS 5.x |
| Storage | Encryption, no public | CIS AWS 2.x |
| Network | Security groups, NACLs | CIS AWS 5.x |
| IAM | Least privilege, MFA | CIS AWS 1.x |
| Logging | CloudTrail, VPC Flow | CIS AWS 3.x |

### 2. Define Container Security Baselines

| Setting | Baseline | Rationale |
|---------|----------|-----------|
| Root User | Non-root only | Privilege minimization |
| Read-only FS | Enable where possible | Tamper prevention |
| Capabilities | Drop all, add needed | Privilege minimization |
| Seccomp | Default profile | Syscall filtering |
| Network | NetworkPolicy | Segmentation |

### 3. Define Kubernetes Security Baselines

| Component | Baseline | CIS Benchmark |
|-----------|----------|---------------|
| API Server | TLS, audit logging | CIS K8s 1.x |
| etcd | Encryption at rest | CIS K8s 2.x |
| Controllers | Secure ports | CIS K8s 3.x |
| Nodes | Minimal access | CIS K8s 4.x |
| Policies | PSP/PSA restricted | CIS K8s 5.x |

### 4. Define Database Security Baselines

| Setting | Baseline | Rationale |
|---------|----------|-----------|
| Authentication | Strong passwords, rotation | Access control |
| Encryption | TLS, TDE | Data protection |
| Network | Private subnet, SG | Network isolation |
| Audit | Query logging | Compliance |
| Backup | Encrypted, tested | Recovery |

**Verify current best practices with web search:**
Search the web: "CIS benchmark cloud security {date}"
Search the web: "container security hardening {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review cloud baselines
- **A2**: Analyze container baselines
- **A3**: Evaluate Kubernetes baselines
- **A4**: Assess database baselines

### [P]ropose Changes
- **P1**: Propose cloud adjustments
- **P2**: Propose container changes
- **P3**: Suggest Kubernetes improvements
- **P4**: Recommend database enhancements

### [C]ontinue
- **C1**: Accept infrastructure baselines
- **C2**: Mark step complete and load `step-02-c-define-application-baselines.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Cloud baselines defined
- [ ] Container baselines configured
- [ ] Kubernetes baselines documented
- [ ] Database baselines specified
- [ ] Patterns align with pattern registry

## Outputs

- Cloud security baseline
- Container security baseline
- Kubernetes security baseline
- Database security baseline

## Next Step

Proceed to `step-02-c-define-application-baselines.md`.
