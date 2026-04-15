# Extensions Reference

BAM provides **31 extensions** that enhance existing BMAD agents with multi-tenant SaaS capabilities. BAM is a pure extension module with 0 standalone agents.

## Overview

Extensions are located in `src/data/extensions/` and follow the WDS agent-guides pattern. Each extension enhances a base agent with menu items that load domain context and execute capabilities.

---

## Extension Distribution

| Target Module | Count | Extensions |
|---------------|-------|------------|
| BMM | 16 | analyst, architect, dev, pm, po, ux, tech-writer, devops, security, master-architect, billing, analytics, reseller, compliance, data, ml |
| TEA | 1 | tea-bam |
| WDS | 2 | wds-saga-bam, wds-freya-bam |
| CIS | 12 | brainstorming, design-thinking, disruption, futures, innovation, market, platform, presentation, problem-solver, scale, storyteller, value |

---

## BMM Extensions (10)

### analyst-bam.yaml

**Extends:** `bmad-agent-analyst`

**Purpose:** Multi-tenant discovery and bounded context identification

| Menu Trigger | Description |
|--------------|-------------|
| `bam-analyst-context` | Load multi-tenant discovery context |
| `bam-bounded-context-mapping` | Map tenant personas to bounded contexts |
| `bam-tenant-persona-discovery` | Discover tenant user personas |
| `bam-analyst-research` | Research current multi-tenant analysis patterns |

---

### architect-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** Platform architecture with Atlas, Nova, and Kai personas (24 menu items)

**Atlas - Platform Architect:**

| Menu Trigger | Description |
|--------------|-------------|
| `bam-platform-context` | Load platform architecture context |
| `bam-create-master-architecture` | Create frozen master architecture |
| `bam-tenant-model-isolation` | Design tenant isolation strategy |
| `bam-module-boundary-design` | Define module boundaries |
| `bam-validate-foundation` | Validate against QG-F1 |
| `bam-scaffold-foundation` | Generate project scaffolding |
| `bam-master-architecture-emergency` | Emergency architecture changes |

**Nova - AI Runtime Architect:**

| Menu Trigger | Description |
|--------------|-------------|
| `bam-ai-runtime-context` | Load AI runtime context |
| `bam-agent-runtime-architecture` | Design agent orchestration |
| `bam-ai-eval-safety-design` | Design AI safety evaluation |
| `bam-ai-agent-debug` | Debug agent issues |
| `bam-tool-definition` | Create tool definitions |

**Kai - Integration Architect:**

| Menu Trigger | Description |
|--------------|-------------|
| `bam-integration-context` | Load integration context |
| `bam-define-facade-contract` | Create facade contracts |
| `bam-evolve-facade-contract` | Evolve contracts with versioning |
| `bam-validate-tool-contract` | Validate tool contracts |
| `bam-convergence-verification` | Verify cross-module integration |
| `bam-internal-contract-design` | Design internal contracts |

**Research:**

| Menu Trigger | Description |
|--------------|-------------|
| `bam-architect-research` | Research current architecture patterns |

> **Note:** architect-bam.yaml has 24 menu items, intentionally above the 5-10 recommendation because it consolidates three architect personas (Atlas, Nova, Kai).

---

### dev-bam.yaml

**Extends:** `bmad-agent-dev`

**Purpose:** Tenant-aware development with QA and SM capabilities merged

| Menu Trigger | Description |
|--------------|-------------|
| `bam-dev-context` | Load tenant-aware development context |
| `bam-rls-implementation` | Implement row-level security |
| `bam-tenant-context-coding` | Code with tenant context |
| `bam-tenant-test-fixtures` | Create tenant test fixtures |
| `bam-isolation-testing` | Test tenant isolation |
| `bam-sprint-tenant-stories` | Plan sprints with tenant stories |
| `bam-dev-research` | Research current development patterns |

---

### pm-bam.yaml

**Extends:** `bmad-agent-pm`

**Purpose:** SaaS lifecycle planning and multi-tenant project management

| Menu Trigger | Description |
|--------------|-------------|
| `bam-pm-context` | Load SaaS lifecycle planning context |
| `bam-saas-lifecycle-planning` | Plan SaaS release lifecycle |
| `bam-tenant-release-coordination` | Coordinate tenant-specific releases |
| `bam-pm-research` | Research current PM patterns |

---

### po-bam.yaml

**Extends:** `bmad-agent-po`

**Purpose:** Product ownership with tenant-focused prioritization

| Menu Trigger | Description |
|--------------|-------------|
| `bam-po-context` | Load tenant-focused product context |
| `bam-tenant-backlog-prioritization` | Prioritize tenant-specific features |
| `bam-tier-feature-planning` | Plan tier-based features |
| `bam-po-research` | Research current product patterns |

---

### ux-bam.yaml

**Extends:** `bmad-agent-ux-designer`

**Purpose:** Tier-based UX design and tenant portal interfaces

| Menu Trigger | Description |
|--------------|-------------|
| `bam-ux-context` | Load tier-based UX context |
| `bam-tier-ux-flows` | Design tier-based UX flows |
| `bam-tenant-portal-design` | Design tenant admin portals |
| `bam-upgrade-flow-design` | Design tier upgrade flows |
| `bam-ux-research` | Research current UX patterns |

---

### tech-writer-bam.yaml

**Extends:** `bmad-agent-tech-writer`

**Purpose:** Multi-tenant API documentation and tenant guides

| Menu Trigger | Description |
|--------------|-------------|
| `bam-tech-writer-context` | Load tenant documentation context |
| `bam-api-documentation` | Document tenant-aware APIs |
| `bam-rls-documentation` | Document RLS implementation |
| `bam-tenant-guide-writing` | Write tenant onboarding guides |
| `bam-tech-writer-research` | Research current documentation patterns |

---

### devops-bam.yaml

**Extends:** `bmad-agent-devops`

**Purpose:** Multi-tenant deployment and observability

| Menu Trigger | Description |
|--------------|-------------|
| `bam-devops-context` | Load multi-tenant deployment context |
| `bam-tenant-deployment` | Deploy with tenant isolation |
| `bam-tenant-observability` | Configure tenant-aware monitoring |
| `bam-tenant-scaling` | Design tenant scaling strategy |
| `bam-devops-research` | Research current DevOps patterns |

---

### security-bam.yaml

**Extends:** `bmad-agent-security`

**Purpose:** Tenant isolation security review and compliance controls

| Menu Trigger | Description |
|--------------|-------------|
| `bam-security-context` | Load tenant security context |
| `bam-isolation-security-review` | Review tenant isolation security |
| `bam-compliance-controls` | Design compliance controls |
| `bam-security-audit` | Conduct security audit |
| `bam-security-research` | Research current security patterns |

---

### master-architect-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** Enterprise-wide architecture governance

| Menu Trigger | Description |
|--------------|-------------|
| `bam-master-architect-context` | Load enterprise architecture context |
| `bam-architecture-governance` | Govern cross-module architecture |
| `bam-architecture-review` | Review architecture decisions |
| `bam-master-architect-research` | Research governance patterns |

---

### billing-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** SaaS billing architecture and monetization design

| Menu Trigger | Description |
|--------------|-------------|
| `bam-billing-context` | Load billing architecture context |
| `bam-billing-metering-design` | Design usage metering pipelines |
| `bam-billing-pricing-tiers` | Design pricing tier architecture |
| `bam-billing-invoice-design` | Design invoice generation |
| `bam-billing-research` | Research current billing patterns |

---

### analytics-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** Tenant analytics and business intelligence

| Menu Trigger | Description |
|--------------|-------------|
| `bam-analytics-context` | Load analytics architecture context |
| `bam-analytics-dashboard-design` | Design tenant analytics dashboards |
| `bam-analytics-cohort-design` | Design cohort analysis |
| `bam-analytics-research` | Research current analytics patterns |

---

### reseller-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** Partner and reseller program architecture

| Menu Trigger | Description |
|--------------|-------------|
| `bam-reseller-context` | Load reseller architecture context |
| `bam-reseller-hierarchy-design` | Design partner hierarchy |
| `bam-reseller-commission-design` | Design commission structures |
| `bam-reseller-research` | Research current reseller patterns |

---

### compliance-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** Regulatory compliance and audit architecture

| Menu Trigger | Description |
|--------------|-------------|
| `bam-compliance-context` | Load compliance architecture context |
| `bam-compliance-framework-design` | Design compliance frameworks |
| `bam-compliance-evidence-design` | Design evidence collection |
| `bam-compliance-research` | Research current compliance patterns |

---

### data-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** Data architecture and governance for multi-tenant systems

| Menu Trigger | Description |
|--------------|-------------|
| `bam-data-context` | Load data architecture context |
| `bam-data-pipeline-design` | Design tenant data pipelines |
| `bam-data-governance-design` | Design data governance |
| `bam-data-research` | Research current data patterns |

---

### ml-bam.yaml

**Extends:** `bmad-agent-architect`

**Purpose:** Machine learning and AI model lifecycle management

| Menu Trigger | Description |
|--------------|-------------|
| `bam-ml-context` | Load ML architecture context |
| `bam-ml-pipeline-design` | Design ML training pipelines |
| `bam-ml-model-registry-design` | Design model registry |
| `bam-ml-research` | Research current MLOps patterns |

---

## TEA Extension (1)

### tea-bam.yaml

**Extends:** `bmad-tea`

**Purpose:** Tenant isolation testing and AI safety evaluation

| Menu Trigger | Description |
|--------------|-------------|
| `bam-tea-context` | Load tenant testing context |
| `bam-tenant-test-design` | Design tenant isolation tests |
| `bam-ai-safety-evaluation` | Evaluate AI agent safety |
| `bam-isolation-verification` | Verify isolation boundaries |
| `bam-tea-research` | Research current testing patterns |

---

## WDS Extensions (2)

### wds-saga-bam.yaml

**Extends:** `wds-agent-saga-analyst`

**Purpose:** Multi-tenant user personas and journey mapping

| Menu Trigger | Description |
|--------------|-------------|
| `bam-saga-context` | Load tenant persona context |
| `bam-tenant-persona-mapping` | Map tenant user personas |
| `bam-tenant-journey-design` | Design tenant user journeys |
| `bam-saga-research` | Research current journey patterns |

---

### wds-freya-bam.yaml

**Extends:** `wds-agent-freya-ux`

**Purpose:** Tier-specific UX and upgrade flow design

| Menu Trigger | Description |
|--------------|-------------|
| `bam-freya-context` | Load tier UX context |
| `bam-tier-journey-design` | Design tier-specific journeys |
| `bam-upgrade-flow-ux` | Design tier upgrade UX |
| `bam-freya-research` | Research current tier UX patterns |

---

## CIS Extensions (12)

### cis-brainstorming-bam.yaml

**Extends:** `bmad-cis-agent-brainstorming`

**Purpose:** SaaS feature ideation and tenant capability brainstorming

| Menu Trigger | Description |
|--------------|-------------|
| `bam-brainstorming-context` | Load SaaS ideation context |
| `bam-saas-feature-ideation` | Brainstorm SaaS features |
| `bam-tenant-capability-brainstorm` | Ideate tenant capabilities |
| `bam-brainstorming-research` | Research current ideation patterns |

---

### cis-design-thinking-bam.yaml

**Extends:** `bmad-cis-agent-design-thinking`

**Purpose:** Tenant-centric design thinking workshops

| Menu Trigger | Description |
|--------------|-------------|
| `bam-design-thinking-context` | Load design thinking context |
| `bam-tenant-empathy-mapping` | Map tenant empathy |
| `bam-saas-prototype-ideation` | Ideate SaaS prototypes |
| `bam-design-thinking-research` | Research design thinking patterns |

---

### cis-disruption-bam.yaml

**Extends:** `bmad-cis-agent-disruption`

**Purpose:** Market disruption analysis for SaaS platforms

| Menu Trigger | Description |
|--------------|-------------|
| `bam-disruption-context` | Load disruption analysis context |
| `bam-market-disruption-analysis` | Analyze market disruption opportunities |
| `bam-competitive-displacement` | Design competitive displacement strategy |
| `bam-disruption-research` | Research disruption patterns |

---

### cis-futures-bam.yaml

**Extends:** `bmad-cis-agent-futures`

**Purpose:** Platform evolution planning and technology forecasting

| Menu Trigger | Description |
|--------------|-------------|
| `bam-futures-context` | Load futures planning context |
| `bam-platform-evolution` | Plan platform evolution |
| `bam-technology-forecast` | Forecast technology trends |
| `bam-futures-research` | Research futures planning patterns |

---

### cis-innovation-bam.yaml

**Extends:** `bmad-cis-agent-innovation`

**Purpose:** SaaS innovation lens and AI capability innovation

| Menu Trigger | Description |
|--------------|-------------|
| `bam-innovation-context` | Load SaaS innovation context |
| `bam-ai-capability-innovation` | Innovate AI capabilities |
| `bam-saas-innovation-workshop` | Run innovation workshops |
| `bam-innovation-research` | Research innovation patterns |

---

### cis-market-bam.yaml

**Extends:** `bmad-cis-agent-market`

**Purpose:** SaaS market analysis and competitive positioning

| Menu Trigger | Description |
|--------------|-------------|
| `bam-market-context` | Load market analysis context |
| `bam-saas-market-analysis` | Analyze SaaS market |
| `bam-competitive-positioning` | Position against competitors |
| `bam-market-research` | Research market patterns |

---

### cis-platform-bam.yaml

**Extends:** `bmad-cis-agent-platform`

**Purpose:** Platform strategy and ecosystem design

| Menu Trigger | Description |
|--------------|-------------|
| `bam-platform-strategy-context` | Load platform strategy context |
| `bam-ecosystem-design` | Design platform ecosystem |
| `bam-platform-monetization` | Design monetization strategy |
| `bam-platform-research` | Research platform patterns |

---

### cis-presentation-bam.yaml

**Extends:** `bmad-cis-agent-presentation`

**Purpose:** Stakeholder presentations and SaaS pitch creation

| Menu Trigger | Description |
|--------------|-------------|
| `bam-presentation-context` | Load presentation context |
| `bam-saas-pitch-creation` | Create SaaS pitch decks |
| `bam-stakeholder-presentation` | Create stakeholder presentations |
| `bam-presentation-research` | Research presentation patterns |

---

### cis-problem-solver-bam.yaml

**Extends:** `bmad-cis-agent-problem-solver`

**Purpose:** Technical problem solving for isolation challenges

| Menu Trigger | Description |
|--------------|-------------|
| `bam-problem-solver-context` | Load problem solving context |
| `bam-isolation-challenge-solving` | Solve isolation challenges |
| `bam-technical-debt-analysis` | Analyze technical debt |
| `bam-problem-solver-research` | Research problem solving patterns |

---

### cis-scale-bam.yaml

**Extends:** `bmad-cis-agent-scale`

**Purpose:** Scaling strategies for multi-tenant platforms

| Menu Trigger | Description |
|--------------|-------------|
| `bam-scale-context` | Load scaling strategy context |
| `bam-scaling-strategy-design` | Design scaling strategy |
| `bam-capacity-planning` | Plan capacity requirements |
| `bam-scale-research` | Research scaling patterns |

---

### cis-storyteller-bam.yaml

**Extends:** `bmad-cis-agent-storyteller`

**Purpose:** Platform narrative and SaaS storytelling

| Menu Trigger | Description |
|--------------|-------------|
| `bam-storyteller-context` | Load storytelling context |
| `bam-platform-narrative` | Create platform narrative |
| `bam-saas-story-creation` | Create SaaS success stories |
| `bam-storyteller-research` | Research storytelling patterns |

---

### cis-value-bam.yaml

**Extends:** `bmad-cis-agent-value`

**Purpose:** Value proposition design for tenant tiers

| Menu Trigger | Description |
|--------------|-------------|
| `bam-value-context` | Load value proposition context |
| `bam-tier-value-proposition` | Design tier value propositions |
| `bam-roi-analysis` | Analyze ROI for features |
| `bam-value-research` | Research value creation patterns |

---

## Extension Pattern

All extensions follow the WDS agent-guides pattern:

```yaml
agent:
  metadata:
    extends: 'bmad-agent-{base}'    # REQUIRED: Base agent to extend
    module: 'bam'                    # REQUIRED: Always 'bam'
    description: 'Brief description' # OPTIONAL

# NEVER include memories: field

menu:
  - trigger: bam-{domain}-context
    action: "#load-{domain}-context-prompt"
    description: Load BAM {domain} context

  - trigger: bam-{capability}
    action: "#{capability}-prompt"
    description: {What it does}

  - trigger: bam-{domain}-research
    action: "#bam-{domain}-research-prompt"
    description: Research current {domain} patterns

prompts:
  - id: load-{domain}-context-prompt
    content: |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
      
      Confirm when loaded.

  - id: {capability}-prompt
    content: |
      ## {Capability Title}
      
      Prerequisites: Ensure BAM context loaded via `bam-{domain}-context`
      
      {Detailed instructions...}

  - id: bam-{domain}-research-prompt
    content: |
      ## Research Current {Domain} Patterns
      
      Search the web: "{domain} multi-tenant best practices {date}"
      Search the web: "{specific topic} patterns {date}"
      
      Synthesize findings with _Source: [URL]_ citations.
```

## Related Documentation

- [Agents Reference](agents.md) - Agent personas and capabilities
- [Agent Guides Reference](agent-guides.md) - Context injection guides
- [Workflows Reference](workflows.md) - Workflow catalog
