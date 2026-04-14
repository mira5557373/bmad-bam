# Step 1: Mesh Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Select and design service mesh architecture for multi-tenant microservices communication.

---

## Prerequisites

- Master architecture defined
- Microservices architecture documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Actions

### 1. Service Mesh Selection

Evaluate service mesh options:

| Option | Complexity | Performance | Multi-Tenant Support |
|--------|------------|-------------|---------------------|
| Istio | High | Good | Excellent |
| Linkerd | Low | Excellent | Good |
| AWS App Mesh | Medium | Good | AWS-integrated |
| Cilium | High | Excellent | Excellent |

### 2. Architecture Design

Define mesh architecture components:

| Component | Purpose | Configuration |
|-----------|---------|---------------|
| Control Plane | Config distribution | HA, dedicated namespace |
| Data Plane | Traffic proxying | Sidecar injection |
| Gateway | Ingress/Egress | Tenant-aware routing |
| Telemetry | Observability | Per-tenant metrics |

### 3. mTLS Configuration

Design mutual TLS setup:

- Automatic certificate issuance
- Certificate rotation (24h default)
- Strict mTLS between services
- External service exceptions

**Verify current best practices with web search:**
Search the web: "service mesh comparison Kubernetes {date}"
Search the web: "Istio multi-tenant configuration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the mesh architecture design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into mesh selection
- **P (Party Mode)**: Bring infrastructure perspectives
- **C (Continue)**: Accept mesh architecture and proceed to traffic management
```

#### If 'C' (Continue):
- Save mesh architecture to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-traffic-management.md`

---

## Verification

- [ ] Service mesh selected with rationale
- [ ] Architecture components defined
- [ ] mTLS configuration specified
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-02-c-traffic-management.md` to configure traffic management policies.
