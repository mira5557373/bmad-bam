# Agent Reference

BAM is a **pure extension module** with 0 standalone agents. All capabilities are delivered through extensions to existing BMAD agents.

## Architect Personas (via architect-bam.yaml)

The following personas are consolidated into the `architect-bam.yaml` extension, which extends `bmad-agent-architect` with 24 menu items:

### Atlas - Platform Architect Persona

**Invocation:** Load via `bam-platform-context` menu item

Atlas, legendary architect who designed foundational pillars of cloud-native SaaS platforms. 15+ years building systems serving millions of tenants.

**Capabilities:**

| Code | Workflow | Description |
|------|----------|-------------|
| CMAR | create-master-architecture | Create frozen master architecture |
| TMI | tenant-model-isolation | Design tenant isolation strategy |
| MBD | module-boundary-design | Define module boundaries |
| VF | validate-foundation | Validate against QG-F1 |

**When to Use:** Starting a new multi-tenant project, designing foundation architecture, defining module boundaries, validating foundation gate.

---

### Nova - AI Runtime Architect Persona

**Invocation:** Load via `bam-ai-runtime-context` menu item

Nova, the navigating star of AI agent systems. Expert in orchestration frameworks (LangGraph, CrewAI), memory architectures, and tool protocol design.

**Capabilities:**

| Code | Workflow | Description |
|------|----------|-------------|
| ARA | agent-runtime-architecture | Design agent orchestration |
| TD | tool-definition | Create tool definitions |
| AED | ai-eval-safety-design | Design AI safety evaluation |

**When to Use:** Designing AI agent capabilities, defining tool contracts, setting up memory systems, creating safety evaluations.

---

### Kai - Integration Architect Persona

**Invocation:** Load via `bam-integration-context` menu item

Kai, master of connections and contracts. Specializes in facade design, API versioning, and cross-module integration.

**Capabilities:**

| Code | Workflow | Description |
|------|----------|-------------|
| DFC | define-facade-contract | Create facade contracts |
| EFC | evolve-facade-contract | Evolve contracts with versioning |
| VTC | validate-tool-contract | Validate tool contracts |
| CV | convergence-verification | Verify cross-module integration |

**When to Use:** Designing module interfaces, evolving API versions, integrating modules, validating convergence.

---

## Agent Extensions

BAM extends agents from other modules through **25 extensions**:

### BMM Extensions (10)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Mary (Analyst) | analyst-bam | Tenant persona discovery, bounded context mapping |
| Winston (Architect) | architect-bam | Module architecture, facade design, Atlas/Nova/Kai personas (24 menu items) |
| Dev | dev-bam | RLS implementation, tenant context, QA capabilities (tenant isolation testing), SM capabilities (sprint planning with tenant stories) |
| PM | pm-bam | SaaS lifecycle planning |
| PO | po-bam | Product ownership with tenant focus |
| Sally (UX) | ux-bam | Tier-based UX design |
| Tech Writer | tech-writer-bam | RLS documentation |
| DevOps | devops-bam | Multi-tenant deployment |
| Security | security-bam | Tenant isolation security |
| Master Architect | master-architect-bam | Master architecture review |

> **Note:** QA and SM capabilities have been merged into `dev-bam.yaml` following BMM consolidation patterns.

### TEA Extension (1)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Murat (TEA) | tea-bam | Tenant test fixtures, isolation verification |

### WDS Extensions (2)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Saga | wds-saga-bam | SaaS trigger mapping, tenant personas |
| Freya | wds-freya-bam | Tier journey design, upgrade flows |

### CIS Extensions (12)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Innovation Master | cis-innovation-bam | SaaS innovation lens |
| Storyteller | cis-storyteller-bam | SaaS narratives |
| Design Thinking Coach | cis-design-thinking-bam | Tenant empathy |
| Problem Solver | cis-problem-solver-bam | Isolation challenges |
| Brainstorming Coach | cis-brainstorming-bam | SaaS feature ideation |
| Presentation Master | cis-presentation-bam | SaaS pitch creation |
| Disruption Analyst | cis-disruption-bam | Market disruption analysis |
| Futures Strategist | cis-futures-bam | Platform evolution planning |
| Market Analyst | cis-market-bam | SaaS market analysis |
| Platform Strategist | cis-platform-bam | Platform strategy |
| Scale Architect | cis-scale-bam | Scaling strategies |
| Value Designer | cis-value-bam | Value proposition design |

## Loading BAM Context

Each extended agent has a context loading menu item:

```
/analyst
> bam-context    # Loads multi-tenant discovery context
```

This loads the corresponding agent-guide from:
`_bmad/bam/data/agent-guides/bam/{guide}.md`
