# BAM Kubernetes Multi-Tenancy Guide

**When to load:** During infrastructure phase when designing Kubernetes-based tenant isolation, pod security policies, or multi-cluster deployment strategies. Load when implementing namespace isolation, network policies, or resource quotas for tenant workloads.

**Integrates with:** DevOps agents, Security agents, Platform Architect (Atlas)

---

## Core Concepts for Kubernetes Multi-Tenancy

### Namespace Isolation Strategy

Kubernetes namespaces provide the foundational boundary for tenant isolation. Each tenant should have dedicated namespaces that encapsulate their workloads, configurations, and secrets.

#### Namespace Naming Convention

| Pattern | Example | Use Case |
|---------|---------|----------|
| Tenant-based | `tenant-{tenant_id}` | Simple tenant isolation |
| Environment-scoped | `tenant-{tenant_id}-{env}` | Multi-environment per tenant |
| Module-scoped | `tenant-{tenant_id}-{module}` | Microservice isolation within tenant |

#### Namespace Labels for Automation

Every tenant namespace must include standard labels for automation, policy enforcement, and observability:

| Label | Purpose | Example Value |
|-------|---------|---------------|
| `tenant-id` | Identifies owning tenant | `abc123` |
| `tier` | Tenant subscription tier | `free`, `pro`, `enterprise` |
| `environment` | Deployment environment | `dev`, `staging`, `prod` |
| `cost-center` | Billing attribution | `tenant-abc123` |
| `compliance` | Regulatory requirements | `hipaa`, `gdpr`, `soc2` |

### Network Policies for Tenant Isolation

Network policies are critical for preventing cross-tenant communication at the network level. Every tenant namespace requires a default-deny policy with explicit allow rules.

#### Default Deny All Traffic Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: tenant-{tenant_id}
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

#### Allow Intra-Tenant Communication

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-intra-tenant
  namespace: tenant-{tenant_id}
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              tenant-id: {tenant_id}
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              tenant-id: {tenant_id}
```

#### Allow Egress to Shared Services

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-shared-services
  namespace: tenant-{tenant_id}
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              purpose: shared-services
      ports:
        - protocol: TCP
          port: 443
```

### Resource Quotas by Tenant Tier

Resource quotas prevent any single tenant from consuming excessive cluster resources. Quotas should be tiered based on subscription level.

#### Resource Quota Configuration

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: tenant-quota
  namespace: tenant-{tenant_id}
spec:
  hard:
    requests.cpu: "{cpu_request_limit}"
    requests.memory: "{memory_request_limit}"
    limits.cpu: "{cpu_limit}"
    limits.memory: "{memory_limit}"
    persistentvolumeclaims: "{pvc_count}"
    pods: "{max_pods}"
    services: "{max_services}"
    secrets: "{max_secrets}"
    configmaps: "{max_configmaps}"
```

#### Tier-Based Quota Matrix

| Resource | FREE Tier | PRO Tier | ENTERPRISE Tier |
|----------|-----------|----------|-----------------|
| CPU Requests | 2 cores | 8 cores | 32+ cores |
| Memory Requests | 4Gi | 16Gi | 64Gi+ |
| CPU Limits | 4 cores | 16 cores | 64+ cores |
| Memory Limits | 8Gi | 32Gi | 128Gi+ |
| Pods | 20 | 100 | 500+ |
| PVCs | 5 | 20 | 100+ |
| Services | 10 | 50 | 200+ |

### Limit Ranges for Pod Defaults

Limit ranges ensure pods have default resource constraints even when not explicitly specified:

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: tenant-limits
  namespace: tenant-{tenant_id}
spec:
  limits:
    - default:
        cpu: "500m"
        memory: "512Mi"
      defaultRequest:
        cpu: "100m"
        memory: "128Mi"
      type: Container
    - max:
        cpu: "2"
        memory: "4Gi"
      min:
        cpu: "50m"
        memory: "64Mi"
      type: Container
```

### Pod Security Standards

Kubernetes Pod Security Standards (PSS) enforce security contexts at the namespace level. Tenant namespaces should use the `restricted` profile for maximum isolation.

#### Pod Security Admission Labels

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tenant-{tenant_id}
  labels:
    tenant-id: {tenant_id}
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

#### Security Context Constraints

Pods in tenant namespaces must run with minimal privileges:

| Constraint | Value | Purpose |
|------------|-------|---------|
| `runAsNonRoot` | true | Prevent root container execution |
| `allowPrivilegeEscalation` | false | Block privilege escalation |
| `readOnlyRootFilesystem` | true | Immutable container filesystem |
| `seccompProfile.type` | RuntimeDefault | Default seccomp profile |
| `capabilities.drop` | ALL | Drop all Linux capabilities |

### RBAC Per Tenant

Role-Based Access Control ensures tenants can only access resources within their namespace boundaries.

#### Tenant Admin Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: tenant-admin
  namespace: tenant-{tenant_id}
rules:
  - apiGroups: [""]
    resources: ["pods", "services", "configmaps", "secrets"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]
  - apiGroups: ["apps"]
    resources: ["deployments", "replicasets", "statefulsets"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]
  - apiGroups: ["batch"]
    resources: ["jobs", "cronjobs"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]
```

#### Tenant Viewer Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: tenant-viewer
  namespace: tenant-{tenant_id}
rules:
  - apiGroups: [""]
    resources: ["pods", "services", "configmaps"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments", "replicasets"]
    verbs: ["get", "list", "watch"]
```

#### RoleBinding to Tenant Users

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: tenant-admin-binding
  namespace: tenant-{tenant_id}
subjects:
  - kind: Group
    name: tenant-{tenant_id}-admins
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: tenant-admin
  apiGroup: rbac.authorization.k8s.io
```

### Multi-Cluster Strategies

For enterprise-scale deployments, consider multi-cluster architectures for tenant isolation.

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Namespace-per-tenant | Single cluster, multiple namespaces | Cost-efficient, <100 tenants |
| Cluster-per-tier | Dedicated clusters per tier | Compliance requirements |
| Cluster-per-tenant | Complete isolation | Enterprise customers, regulatory |
| Federation | Federated control across clusters | Global distribution |

#### Cluster Selection Criteria

| Factor | Single Cluster | Multi-Cluster |
|--------|----------------|---------------|
| Tenant count | <100 | 100+ |
| Compliance needs | Standard | HIPAA, PCI-DSS, FedRAMP |
| Blast radius tolerance | Acceptable | Zero tolerance |
| Operational complexity | Low | High |
| Cost efficiency | High | Lower |

---

## Application Guidelines

When implementing Kubernetes multi-tenancy:

1. **Start with namespace isolation** - Create tenant namespaces with proper labels before deploying workloads
2. **Apply network policies immediately** - Default-deny policies should be in place before any tenant pods run
3. **Enforce resource quotas** - Prevent noisy neighbor issues with tier-appropriate quotas
4. **Use Pod Security Standards** - Apply restricted profile to all tenant namespaces
5. **Implement RBAC early** - Define roles and bindings during tenant onboarding
6. **Monitor cross-tenant traffic** - Alert on any unexpected network connections between tenant namespaces

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`, `tenant-routing`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `performance-isolation`, `deployment`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "Kubernetes multi-tenant isolation patterns {date}"
- Search: "Kubernetes network policy best practices {date}"
- Search: "Kubernetes Pod Security Standards multi-tenant {date}"
- Search: "vCluster virtual Kubernetes clusters multi-tenant {date}"
- Search: "Kubernetes resource quota strategies SaaS {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should each tenant have a dedicated Kubernetes namespace? | Yes, namespace-per-tenant is the baseline isolation strategy | Provides RBAC boundaries, network policy scope, and resource quota enforcement at the Kubernetes level |
| When should I use multi-cluster for tenant isolation? | For tenants with regulatory requirements (HIPAA, PCI-DSS) or zero blast radius tolerance | Single cluster with namespaces is cost-effective but shares control plane; multi-cluster provides complete isolation |
| How should network policies be configured for tenant namespaces? | Default-deny all traffic, explicitly allow intra-tenant and shared services | Prevents accidental cross-tenant communication; explicit allowlists document intended connectivity |
| Should resource quotas be enforced at the namespace level? | Yes, with tier-based limits (Free: 2 CPU/4Gi, Pro: 8 CPU/16Gi, Enterprise: custom) | Prevents noisy neighbor resource exhaustion; tier-based limits align cost with value delivered |
| Which Pod Security Standard should tenant namespaces use? | Restricted profile with enforce, audit, and warn modes enabled | Maximum security posture; prevents privilege escalation and container breakout attacks |

---

## Related Workflows

- `create-master-architecture` - Define cluster topology for tenants
- `bmad-bam-tenant-model-isolation` - Map tenant model to Kubernetes isolation
- `bmad-bam-tenant-network-isolation-design` - Verify Kubernetes isolation implementation
- `bmad-bam-tenant-onboarding-design` - Automate namespace provisioning
- `bmad-bam-security-review` - Review network policies and pod security standards
