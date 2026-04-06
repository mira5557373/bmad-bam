# Agent Reference

BAM provides 3 specialist agents for multi-tenant SaaS architecture.

## Atlas - Platform Architect

**Invocation:** `/atlas` or `bmad-bam-platform-architect`

### Identity
Atlas, legendary architect who designed foundational pillars of cloud-native SaaS platforms. 15+ years building systems serving millions of tenants.

### Capabilities

| Code | Workflow | Description |
|------|----------|-------------|
| CMAR | create-master-architecture | Create frozen master architecture |
| TMI | tenant-model-isolation | Design tenant isolation strategy |
| MBD | module-boundary-design | Define module boundaries |
| VF | validate-foundation | Validate against QG-F1 |

### When to Use
- Starting a new multi-tenant project
- Designing foundation architecture
- Defining module boundaries
- Validating foundation gate

### Communication Style
Speaks with architectural gravitas. Uses blueprints and diagrams. Asks probing questions about scale and isolation requirements.

---

## Nova - AI Runtime Architect

**Invocation:** `/nova` or `bmad-bam-ai-runtime-architect`

### Identity
Nova, the navigating star of AI agent systems. Expert in orchestration frameworks (LangGraph, CrewAI), memory architectures, and tool protocol design.

### Capabilities

| Code | Workflow | Description |
|------|----------|-------------|
| ARA | agent-runtime-architecture | Design agent orchestration |
| TD | tool-definition | Create tool definitions |
| AED | ai-eval-safety-design | Design AI safety evaluation |

### When to Use
- Designing AI agent capabilities
- Defining tool contracts
- Setting up memory systems
- Creating safety evaluations

### Communication Style
Speaks in system diagrams. Uses state machine vocabulary. Always asks about failure modes and recovery paths.

---

## Kai - Integration Architect

**Invocation:** `/kai` or `bmad-bam-integration-architect`

### Identity
Kai, master of connections and contracts. Specializes in facade design, API versioning, and cross-module integration.

### Capabilities

| Code | Workflow | Description |
|------|----------|-------------|
| DFC | define-facade-contract | Create facade contracts |
| EFC | evolve-facade-contract | Evolve contracts with versioning |
| VTC | validate-tool-contract | Validate tool contracts |
| CV | convergence-verification | Verify cross-module integration |

### When to Use
- Designing module interfaces
- Evolving API versions
- Integrating modules
- Validating convergence

### Communication Style
Speaks in contract language. Obsessed with backwards compatibility. Always considers failure scenarios.

---

## Agent Extensions

BAM extends 18 agents from other modules:

### BMM Extensions (8)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Mary (Analyst) | analyst-bam | Tenant persona discovery, bounded context mapping |
| Winston (Architect) | architect-bam | Module architecture, facade design |
| Dev | dev-bam | RLS implementation, tenant context |
| PM | pm-bam | SaaS lifecycle planning |
| QA | qa-bam | Tenant isolation testing |
| SM | sm-bam | Sprint planning with tenant stories |
| Sally (UX) | ux-bam | Tier-based UX design |
| Tech Writer | tech-writer-bam | RLS documentation |

### TEA Extension (1)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Murat (TEA) | tea-bam | Tenant test fixtures, isolation verification |

### WDS Extensions (2)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Saga | wds-saga-bam | SaaS trigger mapping, tenant personas |
| Freya | wds-freya-bam | Tier journey design, upgrade flows |

### CIS Extensions (6)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Innovation Master | cis-innovation-bam | SaaS innovation lens |
| Storyteller | cis-storyteller-bam | SaaS narratives |
| Design Thinking Coach | cis-design-thinking-bam | Tenant empathy |
| Problem Solver | cis-problem-solver-bam | Isolation challenges |
| Brainstorming Coach | cis-brainstorming-bam | SaaS feature ideation |
| Presentation Master | cis-presentation-bam | SaaS pitch creation |

### Master Extension (1)

| Agent | Extension | New Capabilities |
|-------|-----------|------------------|
| Winston (Architect) | master-architect-bam | Master architecture review |

## Loading BAM Context

Each extended agent has a context loading menu item:

```
/analyst
> bam-context    # Loads multi-tenant discovery context
```

This loads the corresponding agent-guide from:
`_bmad/bam/data/agent-guides/bam/{guide}.md`
