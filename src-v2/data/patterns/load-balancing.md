---
pattern_id: load-balancing
shortcode: ZLB
category: scaling
qg_ref: QG-SC4
version: 1.0.0
last_reviewed: 2026-04-30
---

# Load Balancing - BAM Pattern

**Loaded by:** ZLB  
**Applies to:** Multi-tenant SaaS platforms distributing traffic across instances

---

## When to Use

- Multiple application instances serving traffic
- High availability requirements
- Tenant-aware traffic routing
- Blue-green or canary deployments
- API gateway traffic distribution
- WebSocket/long-connection workloads

## When NOT to Use

- Single instance deployments
- Purely serverless architectures (managed by provider)
- Internal batch processing only
- Development/testing environments

## Architecture

### Load Balancing Layers

```
                        Internet
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 7 (Application)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   Path routing, header inspection, tenant routing     │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────┐
│                    LAYER 4 (Transport)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   TCP/UDP distribution, connection pooling            │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
    ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
    │  Instance 1 │   │  Instance 2 │   │  Instance 3 │
    │  (Pool A)   │   │  (Pool A)   │   │  (Pool B)   │
    └─────────────┘   └─────────────┘   └─────────────┘
```

### Tenant-Aware Routing

| Tier | Pool Assignment | Sticky Sessions | Priority |
|------|-----------------|-----------------|----------|
| Free | Shared pool | Optional | Normal |
| Pro | Shared pool (weighted) | Enabled | High |
| Enterprise | Dedicated pool | Enabled | Highest |
| Dedicated | Isolated instances | Required | Reserved |

### Routing Algorithm Selection

```
Request Analysis
      │
      ▼
┌─────────────────┐
│ Extract tenant  │ ← From JWT, header, subdomain
│ context         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check tenant    │ ◄─── Dedicated? ──► Route to dedicated pool
│ tier/config     │
└────────┬────────┘
         │ Shared pool
         ▼
┌─────────────────┐
│ Apply algorithm │
│ per pool config │
└────────┬────────┘
         │
    ┌────┴────┬─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│Round  │ │Least  │ │Weighted│
│Robin  │ │Conn   │ │Random  │
└───────┘ └───────┘ └───────┘
```

### Configuration Schema

```yaml
load_balancing:
  tenant_id: uuid
  tier: enum[free, pro, enterprise, dedicated]
  bam_controlled: true
  
  routing:
    algorithm: enum[round_robin, least_connections, weighted, ip_hash, consistent_hash]
    health_check_path: string
    health_check_interval_seconds: int
    unhealthy_threshold: int
    
  sticky_sessions:
    enabled: bool
    cookie_name: string
    ttl_seconds: int
    
  pool_assignment:
    pool_id: string
    weight: int  # for weighted distribution
    priority: int
    max_connections: int
    
  connection_management:
    connection_timeout_ms: int
    idle_timeout_ms: int
    keepalive_enabled: bool
    max_requests_per_connection: int
    
  rate_limiting:
    requests_per_second: int
    burst_size: int
    response_on_limit: enum[429, queue, shed_low_priority]
```

### Health Check Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    HEALTH CHECK SYSTEM                       │
│                                                              │
│  LB ──▶ Health Endpoint ──▶ App ──▶ Dependencies ──▶ Result │
│          │                   │           │                   │
│          ▼                   ▼           ▼                   │
│     /health/live        /health/ready  DB, Cache, etc.      │
│     (is process up?)    (can serve?)   (are deps ok?)       │
│                                                              │
│  Results:                                                    │
│  ┌────────┐  ┌────────┐  ┌────────┐                        │
│  │ 200 OK │  │ 503    │  │ Timeout│                        │
│  │ healthy│  │ unhealthy│ │ unhealthy│                      │
│  └────────┘  └────────┘  └────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Blue-Green Deployment Support

```
                    Load Balancer
                         │
                    ┌────┴────┐
                    │ Traffic │
                    │ Split   │
                    └────┬────┘
                         │
           ┌─────────────┴─────────────┐
           │                           │
           ▼ (100% → 0%)              ▼ (0% → 100%)
    ┌─────────────┐            ┌─────────────┐
    │ BLUE Pool   │            │ GREEN Pool  │
    │ (current)   │            │ (new)       │
    └─────────────┘            └─────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Round robin | Simple, even distribution | No awareness of load | Homogeneous workloads |
| Least connections | Adapts to load | Overhead tracking | Variable request duration |
| Weighted | Gradual rollouts | Manual weight management | Canary deployments |
| Consistent hash | Session affinity | Uneven on node changes | Stateful connections |

## Quality Checks

- [ ] Tenant routing rules configured
- [ ] Health checks passing
- [ ] Sticky sessions tested for stateful workloads
- [ ] Failover behavior verified
- [ ] **CRITICAL:** No cross-tenant traffic routing

## Web Research Queries

- "load balancing algorithms comparison {date}"
- "Kubernetes ingress tenant routing {date}"
- "HAProxy multi-tenant configuration {date}"
- "AWS ALB tenant-based routing {date}"
- "sticky sessions distributed systems {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-SC4 | Pattern implementation verified |

## Related Patterns

- [vertical-scaling.md](vertical-scaling.md) - Capacity planning
- [circuit-breaker.md](circuit-breaker.md) - Fault tolerance
