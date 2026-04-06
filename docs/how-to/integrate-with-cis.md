# How to Integrate BAM with CIS

CIS (Creative Innovation System) provides brainstorming and innovation patterns. BAM extends CIS with SaaS-focused ideation capabilities.

## Prerequisites

- Both BAM and CIS installed
- Understanding of target market

## Available CIS Extensions

BAM extends 6 CIS agents:

| Agent | Extension | Use Case |
|-------|-----------|----------|
| Innovation Master | SaaS innovation lens | Platform feature discovery |
| Storyteller | SaaS narratives | Customer success stories |
| Design Thinking Coach | Tenant empathy | Tier-specific empathy maps |
| Problem Solver | Isolation challenges | Tenant isolation problems |
| Brainstorming Coach | SaaS feature ideation | Tier-differentiating features |
| Presentation Master | SaaS pitch | Investor/customer pitches |

## SaaS Feature Brainstorming

### Load Context

```
/brainstorming-coach
> bam-bs-context
```

### Run Feature Ideation

```
> saas-feature-ideation
```

Brainstorm around:
- **Tier-differentiating features** - What makes Pro worth it?
- **AI agent capabilities** - What can agents do per tier?
- **Tenant collaboration** - Cross-workspace features?
- **Platform network effects** - How do tenants benefit each other?

### Output Template

```markdown
## Feature Ideas

### Tier Differentiators
| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| API calls/day | 100 | 10K | Unlimited |
| AI agents | 1 | 5 | Custom |
| Workspaces | 1 | 10 | Unlimited |

### AI Capabilities by Tier
- Free: Basic chat, templated responses
- Pro: Custom agents, tool access
- Enterprise: Private models, custom training

### Network Effects
- Marketplace: Share templates across tenants
- Benchmarks: Anonymous performance comparison
- Integration directory: Tenant-built connectors
```

## Tenant Empathy Mapping

### Load Context

```
/design-thinking-coach
> bam-dt-context
```

### Run Empathy Exercise

```
> tenant-empathy
```

Creates empathy maps per tier:

```markdown
## Free Tier Empathy Map

### Think & Feel
- "I hope this actually helps"
- "Is my data safe?"
- "When will they force me to pay?"

### See
- Usage limits in UI
- Upgrade prompts
- Other users' success stories

### Say & Do
- Exploring features cautiously
- Comparing with alternatives
- Sharing with one teammate

### Pain
- Limited functionality
- Unclear pricing
- Fear of vendor lock-in

### Gain
- Quick setup
- No commitment
- Learning opportunity
```

## Problem Solving for Isolation

### Load Context

```
/problem-solver
> bam-ps-context
```

### Tackle Isolation Challenges

```
> isolation-problems
```

Common challenges addressed:
- **Cross-tenant data leakage** - RLS gaps, cache pollution
- **Noisy neighbor performance** - Resource limits, queue isolation
- **Tier enforcement gaps** - Feature flag consistency
- **Context propagation breaks** - Async job isolation

## SaaS Pitch Creation

### Load Context

```
/presentation-master
> bam-pres-context
```

### Create Pitch

```
> saas-pitch
```

Structures pitch as:

```markdown
## SaaS Platform Pitch

### 1. Problem
- Current solutions don't scale
- AI integration is an afterthought
- Security is bolt-on, not built-in

### 2. Solution
- Multi-tenant AI platform
- Built-in isolation from day one
- AI-native architecture

### 3. Differentiation
- Tenant isolation at database level
- AI safety evaluation built-in
- Module architecture for rapid feature development

### 4. Tiers
- Free: Try before you buy
- Pro: Power user features
- Enterprise: Full customization

### 5. Call to Action
- Start free today
- No credit card required
- Upgrade when you're ready
```

## Quality Gates

CIS + BAM integration validates:
- **Feature completeness**: All tiers have differentiated value
- **Empathy coverage**: All personas understood
- **Problem solutions**: Isolation challenges addressed
- **Pitch readiness**: Clear value proposition
