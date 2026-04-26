# Step 2: Categorize Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- :pencil: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making decisions
- :paperclip: Reference pattern registry `web_queries` for search topics

---

## Purpose

Categorize all identified requirements into functional, non-functional, multi-tenant, AI/agent, and compliance categories for structured analysis.

---

## Prerequisites

- Step 1 completed (Initialize Requirements Ingestion)
- Requirements sources identified and loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Requirements sources from Step 1
- Loaded documents
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Compliance frameworks: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Functional Requirements Analysis

Extract and categorize functional requirements:

```yaml
functional_requirements:
  user_facing:
    - id: FR-001
      description: "{requirement}"
      source: "{source document}"
      priority: HIGH | MEDIUM | LOW
      module: "{target module}"
      
  system_operations:
    - id: FR-002
      description: "{requirement}"
      source: "{source document}"
      priority: HIGH | MEDIUM | LOW
      module: "{target module}"
      
  integration:
    - id: FR-003
      description: "{requirement}"
      source: "{source document}"
      priority: HIGH | MEDIUM | LOW
      module: "{target module}"
```

### 2. Non-Functional Requirements Analysis

Identify performance, scalability, and quality requirements:

| Category | Requirement | Target | Measurement |
|----------|-------------|--------|-------------|
| Performance | Response time | < 200ms p95 | APM metrics |
| Scalability | Concurrent users | 10,000+ | Load testing |
| Availability | Uptime SLA | 99.9% | Monitoring |
| Security | Authentication | MFA required | Security audit |
| Maintainability | Code coverage | > 80% | CI pipeline |
| Reliability | MTTR | < 4 hours | Incident tracking |

```yaml
non_functional_requirements:
  performance:
    - id: NFR-001
      metric: response_time
      target: "< 200ms p95"
      tier_specific: true
      
  scalability:
    - id: NFR-002
      metric: concurrent_tenants
      target: "1000+ tenants"
      tier_specific: true
      
  reliability:
    - id: NFR-003
      metric: availability
      target: "99.9%"
      tier_specific: true
```

### 3. Multi-Tenant Requirements

Extract tenant-specific requirements:

```yaml
multi_tenant_requirements:
  isolation:
    - id: MT-001
      description: "Data isolation between tenants"
      model: "{tenant_model}"
      critical: true
      
    - id: MT-002
      description: "Tenant-scoped configurations"
      model: "{tenant_model}"
      critical: true
      
  tier_differentiation:
    - id: MT-003
      description: "Feature gating by tier"
      tiers: [FREE, PRO, ENTERPRISE]
      
    - id: MT-004
      description: "Resource limits by tier"
      tiers: [FREE, PRO, ENTERPRISE]
      
  lifecycle:
    - id: MT-005
      description: "Tenant onboarding workflow"
      priority: HIGH
      
    - id: MT-006
      description: "Tenant offboarding with data retention"
      priority: HIGH
```

### 4. AI/Agent Requirements

Identify AI and agent-specific requirements:

```yaml
ai_agent_requirements:
  orchestration:
    - id: AI-001
      description: "Agent runtime selection"
      runtime: "{ai_runtime}"
      critical: true
      
    - id: AI-002
      description: "Multi-agent coordination"
      pattern: "{orchestration pattern}"
      
  tenant_context:
    - id: AI-003
      description: "Agent tenant awareness"
      requirement: "All agents must operate within tenant context"
      critical: true
      
    - id: AI-004
      description: "Agent memory isolation"
      requirement: "Agent memory must be tenant-scoped"
      critical: true
      
  safety:
    - id: AI-005
      description: "Agent execution limits"
      limits:
        max_iterations: 10
        timeout: 300s
        
    - id: AI-006
      description: "Agent output validation"
      requirement: "All outputs must be validated before delivery"
```

### 5. Compliance Requirements

Map compliance framework requirements:

| Framework | Requirement | Impact | BAM Pattern |
|-----------|-------------|--------|-------------|
| SOC 2 | Access controls | HIGH | tenant-isolation |
| GDPR | Data residency | HIGH | tenant-schema |
| HIPAA | Audit logging | HIGH | audit-trail |
| PCI-DSS | Encryption | HIGH | encryption-patterns |

```yaml
compliance_requirements:
  data_protection:
    - id: COMP-001
      framework: GDPR
      requirement: "Right to erasure"
      tenant_impact: true
      
    - id: COMP-002
      framework: GDPR
      requirement: "Data portability"
      tenant_impact: true
      
  audit:
    - id: COMP-003
      framework: SOC2
      requirement: "Audit logging"
      tenant_impact: true
      
  security:
    - id: COMP-004
      framework: SOC2
      requirement: "Access control matrix"
      tenant_impact: true
```

**Verify current best practices with web search:**
Search the web: "requirements categorization best practices {date}"
Search the web: "multi-tenant compliance requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing requirements categorization above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into requirement categories using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for categorization review
- **C (Continue)**: Accept categorization and proceed to module mapping
- **[Specific refinements]**: Describe what categories you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: categorized requirements, compliance mappings, AI requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into requirements categorization
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review requirements categorization: {summary of categories and counts}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save categorized requirements to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] All functional requirements categorized
- [ ] Non-functional requirements with measurable targets
- [ ] Multi-tenant requirements identified with isolation model
- [ ] AI/agent requirements with runtime context
- [ ] Compliance requirements mapped to frameworks
- [ ] Patterns align with pattern registry

---

## Outputs

- Categorized requirements matrix
- Functional requirements catalog
- Non-functional requirements specification
- Multi-tenant requirements document
- AI/agent requirements specification
- Compliance requirements mapping

---

## Next Step

Proceed to `step-03-c-design.md` to map requirements to modules.
