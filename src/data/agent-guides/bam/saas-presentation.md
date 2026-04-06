# BAM SaaS Presentation Context

**When to load:**
- When creating tenant isolation architecture diagrams
- When building tier comparison presentations
- When preparing platform architecture decks
- When communicating with stakeholders about multi-tenant design
- When user mentions "presentation", "diagrams", or "stakeholder communication"

**Integrates with:** Architect agents, PM agents, Executive communication personas

---

## Tenant Isolation Diagrams

### Isolation Visualization Patterns

| Diagram Type | Purpose | Audience |
|--------------|---------|----------|
| **Boundary diagram** | Show tenant data boundaries | Architects, Security |
| **Flow diagram** | Request path with isolation points | Developers |
| **Layer diagram** | Isolation at each stack layer | Technical leadership |
| **Comparison diagram** | Isolation levels (RLS vs schema vs DB) | Decision makers |

### Standard Isolation Diagram Components

```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                          │
│                    (Tenant ID Extraction)                   │
└─────────────────────┬───────────────────────────────────────┘
                      │ JWT with tenant_id
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│              (Tenant Context Middleware)                    │
└─────────────────────┬───────────────────────────────────────┘
                      │ tenant_id in context
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     Database Layer                          │
│                  (Row-Level Security)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Tenant A │  │ Tenant B │  │ Tenant C │  (Isolated rows) │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

### Diagram Best Practices

| Practice | Rationale |
|----------|-----------|
| Color-code tenants | Visual distinction between isolation zones |
| Show security checkpoints | Emphasize where isolation is enforced |
| Include failure modes | What happens if isolation breaks |
| Layer by stack | Network, app, data isolation layers |

### Isolation Diagram Checklist

- [ ] All tenant touchpoints identified
- [ ] Isolation enforcement points marked
- [ ] Cross-tenant boundaries clearly shown
- [ ] Compliance requirements annotated
- [ ] Legend explains symbols/colors

---

## Tier Comparison Visuals

### Feature Matrix Design

```
                    FREE        PRO         ENTERPRISE
─────────────────────────────────────────────────────────
Users               5           50          Unlimited
Storage             1 GB        10 GB       100 GB
API Rate            10/min      100/min     1000/min
─────────────────────────────────────────────────────────
SSO                 ✗           ✗           ✓
Custom Domain       ✗           ✓           ✓
Audit Logs          ✗           30 days     Unlimited
─────────────────────────────────────────────────────────
Support             Community   Email       Dedicated
SLA                 None        99.9%       99.99%
─────────────────────────────────────────────────────────
                   FREE        $29/mo      Custom
```

### Tier Visualization Options

| Visual Type | Best For |
|-------------|----------|
| **Feature matrix** | Detailed comparison |
| **Pricing table** | Sales pages, quick comparison |
| **Value pyramid** | Showing tier progression |
| **Slider** | Interactive upgrade exploration |

### Tier Visual Design Principles

1. **Visual hierarchy** - Enterprise prominent, Free minimal
2. **Progressive disclosure** - Core features visible, details expandable
3. **Call to action** - Clear upgrade path per tier
4. **Social proof** - Logos/testimonials per tier
5. **Price anchoring** - Show Enterprise first or highlight Pro

---

## Platform Architecture Decks

### Deck Structure Template

| Slide | Content | Audience Focus |
|-------|---------|----------------|
| 1 | Title + positioning | All |
| 2 | Problem statement | Business |
| 3 | Solution overview | All |
| 4 | Architecture diagram | Technical |
| 5 | Tenant isolation detail | Security/Compliance |
| 6 | Tier model | Business/Sales |
| 7 | Technology stack | Technical |
| 8 | Security & compliance | Security/Legal |
| 9 | Roadmap | Product/Business |
| 10 | Q&A / Next steps | All |

### Architecture Diagram Levels

| Level | Detail | Audience |
|-------|--------|----------|
| **C-Level** | 3-5 boxes, business capabilities | Executives |
| **Director** | Major components, data flows | Leadership |
| **Architect** | Full stack, integration points | Technical |
| **Developer** | Detailed implementation | Engineering |

### Deck Customization by Audience

| Audience | Emphasis | Skip/Minimize |
|----------|----------|---------------|
| **Investors** | Scale, market, team | Technical deep-dives |
| **Enterprise buyers** | Security, compliance, SLA | Pricing details |
| **Technical evaluators** | Architecture, APIs, integration | Business metrics |
| **Internal stakeholders** | Roadmap, resources, risks | Sales positioning |

---

## Stakeholder Communication

### Communication Matrix

| Stakeholder | Cares About | Communication Style |
|-------------|-------------|---------------------|
| **CEO/CFO** | Revenue, growth, risk | Executive summary, KPIs |
| **CTO** | Architecture, scalability | Technical depth, diagrams |
| **CISO** | Security, compliance | Risk assessment, controls |
| **Product** | Features, roadmap | User stories, metrics |
| **Sales** | Differentiation, objection handling | Competitive positioning |
| **Support** | Operational concerns | Runbooks, escalation paths |

### Presentation Tailoring Framework

```
AUDIENCE → CONCERNS → MESSAGE → FORMAT → DEPTH
    ↓          ↓         ↓         ↓        ↓
  Who is    What do    What's    How to   How much
  present   they care  the key   present  detail
            about      takeaway
```

### Multi-Tenant Talking Points

| Topic | Technical Framing | Business Framing |
|-------|-------------------|------------------|
| **RLS** | "Row-level security policies" | "Data never visible to other customers" |
| **Tier limits** | "Rate limiting and quotas" | "Fair usage, scalable pricing" |
| **Isolation** | "Separate compute/storage paths" | "Your data is yours alone" |
| **Compliance** | "SOC2, GDPR controls" | "Enterprise-ready security" |

### Objection Handling Visuals

| Objection | Visual Response |
|-----------|-----------------|
| "Is my data secure?" | Isolation diagram with encryption |
| "Can you scale?" | Load test results, architecture |
| "What about other tenants?" | Noisy neighbor prevention diagram |
| "Compliance?" | Compliance matrix with certifications |

---

## Visual Design Guidelines

### Diagram Standards

| Element | Standard |
|---------|----------|
| Colors | Consistent palette, accessibility-friendly |
| Fonts | Sans-serif, minimum 14pt for presentations |
| Icons | Consistent icon set (e.g., Lucide, Heroicons) |
| Layout | Grid-aligned, consistent spacing |
| Annotations | Brief, action-oriented labels |

### Tool Recommendations

| Purpose | Tools |
|---------|-------|
| Architecture diagrams | Excalidraw, Mermaid, draw.io |
| Presentations | Slides, Keynote, Pitch |
| Feature matrices | Tables in docs, Notion |
| Interactive demos | Figma prototypes, live product |

---

## Application Guidelines

1. **Know your audience** - Tailor depth and terminology
2. **Lead with value** - Business outcomes before technical details
3. **Visualize isolation** - Diagrams build confidence
4. **Prepare for questions** - Have backup slides ready
5. **Tell a story** - Connect architecture to customer success

---

## Integration with BAM Workflows

- `bmad-bam-tenant-model-isolation` - Source for isolation diagrams
- `bmad-bam-create-master-architecture` - Architecture deck content
- `bmad-bam-tier-ux` - Tier comparison visuals
- PM workflows for roadmap presentations
