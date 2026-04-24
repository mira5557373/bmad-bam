# Step 4: Isolation Mechanisms

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Configure cgroups, namespaces, and resource limits to provide strong isolation between tenants at the infrastructure level.

---

## Prerequisites

- Quota enforcement completed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Configure cgroups v2 Resource Limits

Define cgroup configuration for tenant isolation:

| cgroup Controller | Parameter | Purpose | Per-Tenant Setting |
|-------------------|-----------|---------|-------------------|
| cpu | cpu.max | CPU time limit | quota period (e.g., 100000 100000) |
| cpu | cpu.weight | Scheduling priority | 1-10000 by tier |
| memory | memory.max | Hard memory limit | Tier allocation |
| memory | memory.high | Throttle threshold | 80% of max |
| io | io.max | Disk I/O limit | rbps wbps riops wiops |
| io | io.weight | I/O scheduling priority | 1-10000 by tier |
| pids | pids.max | Process count limit | 100-10000 by tier |

### 2. Configure Kubernetes Resource Management

Define Kubernetes resource specifications:

| Resource Type | Limit Type | Free | Starter | Pro | Enterprise |
|---------------|------------|------|---------|-----|------------|
| CPU | requests | 100m | 500m | 2000m | 8000m |
| CPU | limits | 200m | 1000m | 4000m | 16000m |
| Memory | requests | 128Mi | 512Mi | 2Gi | 8Gi |
| Memory | limits | 256Mi | 1Gi | 4Gi | 16Gi |
| Ephemeral Storage | limits | 1Gi | 10Gi | 50Gi | 200Gi |

### 3. Configure Namespace Isolation

Define namespace isolation strategy:

| Isolation Type | Implementation | Scope | Purpose |
|----------------|----------------|-------|---------|
| Network Namespace | NetworkPolicy | Per-tenant | Network isolation |
| PID Namespace | Pod Security | Per-pod | Process isolation |
| IPC Namespace | Pod Security | Per-pod | Memory isolation |
| Resource Namespace | ResourceQuota | Per-tenant | Resource limits |
| RBAC Namespace | RoleBinding | Per-tenant | Permission isolation |

### 4. Configure Network Policies

Define network isolation rules:

| Policy Type | Source | Destination | Action | Purpose |
|-------------|--------|-------------|--------|---------|
| Ingress | External | Tenant NS | Allow (filtered) | External access |
| Ingress | Same NS | Same NS | Allow | Intra-tenant |
| Ingress | Other NS | Tenant NS | Deny | Cross-tenant block |
| Egress | Tenant NS | Shared Services | Allow | Platform services |
| Egress | Tenant NS | External | Allow (filtered) | Internet access |
| Egress | Tenant NS | Other NS | Deny | Cross-tenant block |

### 5. Configure Storage Isolation

Define storage isolation mechanisms:

| Storage Type | Isolation Method | Per-Tenant | Encryption |
|--------------|------------------|------------|------------|
| Block Storage | PV per tenant | Yes | At-rest |
| Object Storage | Bucket per tenant | Yes | At-rest + transit |
| Shared FS | Subdirectory + quota | Yes | At-rest |
| Database | Schema/DB isolation | Per model | At-rest + transit |
| Cache | Keyspace isolation | Yes | Optional |

### 6. Configure Runtime Security

Define runtime security controls:

| Control | Implementation | Enforcement | Purpose |
|---------|----------------|-------------|---------|
| Seccomp | Pod Security Policy | Required | Syscall filtering |
| AppArmor | Pod annotations | Recommended | Process confinement |
| Read-only FS | Pod Security Context | Required | Integrity protection |
| Non-root | Pod Security Context | Required | Privilege reduction |
| Drop capabilities | Pod Security Context | Required | Capability restriction |

**Verify current best practices with web search:**
Search the web: "cgroups v2 multi-tenant isolation {date}"
Search the web: "Kubernetes namespace isolation best practices {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 4 completes the isolation mechanisms design.**

Present summary of:
- cgroups configuration
- Kubernetes resource limits
- Namespace isolation
- Network policies
- Storage isolation
- Runtime security

Ask for confirmation before proceeding to monitoring and alerts.

---

## COLLABORATION MENUS (A/P/C):

After completing the isolation mechanisms above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation edge cases and security
- **P (Party Mode)**: Bring analyst and architect perspectives for isolation review
- **C (Continue)**: Accept isolation design and proceed to monitoring alerts
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass isolation context: cgroups, namespaces, network policies
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into isolation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review isolation mechanisms: {summary of controls and policies}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save isolation mechanisms to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-monitoring-alerts.md`

---

## Verification

- [ ] cgroups configuration documented
- [ ] Kubernetes resource limits defined
- [ ] Namespace isolation configured
- [ ] Network policies specified
- [ ] Storage isolation mechanisms defined
- [ ] Runtime security controls documented
- [ ] Patterns align with pattern registry

---

## Outputs

- cgroups v2 configuration
- Kubernetes resource specifications
- Namespace isolation design
- Network policy definitions
- Storage isolation architecture
- Runtime security controls

---

## Next Step

Proceed to `step-05-c-monitoring-alerts.md` to set up noisy neighbor detection and alerting.
