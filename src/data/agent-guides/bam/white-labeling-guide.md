# BAM White-Labeling Guide

**When to load:** During Phase 3 (Solutioning) when designing tenant customization and branding,
or when user mentions white-label, branding, customization, theming, tenant personalization, OEM.

**Integrates with:** UX agent, Architect (Atlas persona), PM agent, Freya (Tier UX)

---

## Core Concepts

### White-Labeling vs. Customization Spectrum

Tenant customization exists on a spectrum from basic theming to full white-labeling:

| Level | Capabilities | Typical Tier |
|-------|--------------|--------------|
| Basic theming | Logo, primary color | Free |
| Advanced theming | Full color palette, fonts | Pro |
| Branding | Custom domain, email sender | Enterprise |
| White-label | Remove platform branding, custom docs | Enterprise+ |
| OEM | Full rebrand, reseller capability | Partner |

### Multi-Tenant Customization Layers

| Layer | Customization Type | Storage Location |
|-------|-------------------|------------------|
| Visual | Colors, fonts, logos | Tenant config + CDN |
| Content | Labels, messages, help text | Content CMS |
| Domain | Custom URLs | DNS + TLS config |
| Email | Sender, templates | Email service config |
| Functional | Feature availability | Feature flags |

### Tenant Branding Components

| Component | Standard | White-Label | Implementation |
|-----------|----------|-------------|----------------|
| Logo | Tenant logo | Full branding | CDN assets |
| Colors | Theme colors | Complete palette | CSS variables |
| Fonts | Platform fonts | Custom typography | Font hosting |
| Domain | Subdomain | Custom domain | DNS/TLS |
| Emails | Platform sender | Custom sender | Email config |
| Mobile app | Platform app | Branded build | App store |

## Application Guidelines

When implementing white-labeling for multi-tenant systems:

1. **Design for extensibility**: Plan for increasing customization levels
2. **Separate content from code**: Enable non-technical branding updates
3. **Cache customization aggressively**: Minimize runtime lookup overhead
4. **Support preview before publish**: Allow tenants to test changes
5. **Provide customization templates**: Make it easy to get started

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Enterprise customer request | Offer Enterprise tier with branding | Revenue opportunity + retention |
| Reseller partnership | Full white-label with OEM agreement | Enable partner business model |
| Custom domain needed | Automate TLS certificate provisioning | Scale without manual ops |
| Email deliverability concerns | Per-tenant email domain with DKIM | Protect sender reputation |
| Mobile app branding | Consider web app wrapper vs. native builds | Native builds are expensive |
| Help documentation | Tenant content override system | Maintain platform docs as fallback |

## Implementation Patterns

### Pattern 1: Visual Customization Architecture

| Component | Storage | Resolution |
|-----------|---------|------------|
| CSS variables | Tenant config DB | Runtime injection |
| Logo assets | Tenant CDN folder | CDN URL mapping |
| Font files | CDN with fallback | Font-face loading |
| Favicon | Tenant CDN | Link tag injection |
| Theme config | JSON in config DB | Cached in memory |

### Pattern 2: Custom Domain Implementation

| Stage | Action | Automation |
|-------|--------|------------|
| Configuration | Tenant enters custom domain | Self-service portal |
| DNS verification | Tenant adds CNAME/A record | Automated DNS check |
| TLS provisioning | Issue certificate | Let's Encrypt automation |
| Routing | Map domain to tenant | Ingress configuration |
| Monitoring | Certificate expiry alerts | Automated renewal |

### Pattern 3: Email Branding Strategy

| Component | Implementation | Tenant Control |
|-----------|----------------|----------------|
| Sender address | Per-tenant email domain | Full control |
| Reply-to | Tenant-configured address | Full control |
| Templates | Platform templates + overrides | Selective override |
| DKIM/SPF | Per-tenant DNS records | Guided setup |
| Bounce handling | Per-tenant tracking | Dashboard visibility |

## Multi-Tenant Customization Patterns

### Customization Inheritance

| Level | Precedence | Fallback |
|-------|------------|----------|
| User preference | Highest | Tenant setting |
| Tenant setting | High | Tier default |
| Tier default | Medium | Platform default |
| Platform default | Base | Hardcoded |

### Content Override System

| Content Type | Override Method | Versioning |
|--------------|-----------------|------------|
| UI labels | Key-value pairs | Per-tenant |
| Help articles | Full document override | Tenant versioned |
| Legal text | Template with variables | Platform managed |
| Error messages | Message catalog override | Per-tenant |
| Email content | Template override | Tenant versioned |

### Customization Caching Strategy

| Asset Type | Cache Location | TTL | Invalidation |
|------------|----------------|-----|--------------|
| Logo/images | CDN | 1 hour | Tenant publish |
| CSS theme | CDN | 1 hour | Tenant publish |
| Fonts | CDN | 1 week | Rarely changes |
| Configuration | App memory | 5 min | Config change |
| Content | Redis | 5 min | Content publish |

## Tier-Based Customization

### Feature Matrix by Tier

| Feature | Free | Pro | Enterprise | OEM |
|---------|------|-----|------------|-----|
| Logo upload | Yes | Yes | Yes | Yes |
| Color theme | Limited | Full | Full | Full |
| Custom fonts | No | Yes | Yes | Yes |
| Custom domain | No | No | Yes | Yes |
| Email branding | No | Yes | Yes | Yes |
| Remove platform branding | No | No | Yes | Yes |
| Custom mobile app | No | No | No | Yes |
| Reseller dashboard | No | No | No | Yes |

### Progressive Customization Enablement

| Upgrade Path | New Capabilities | Migration |
|--------------|------------------|-----------|
| Free -> Pro | Full theming, email branding | Automatic |
| Pro -> Enterprise | Custom domain, full rebrand | Guided setup |
| Enterprise -> OEM | Reseller tools, app builds | Account team |

## Operational Considerations

### Customization Monitoring

| Metric | Purpose | Alert |
|--------|---------|-------|
| CDN cache hit rate | Performance | < 90% hit rate |
| TLS certificate expiry | Availability | < 7 days remaining |
| Email bounce rate | Deliverability | > 5% bounce |
| Theme load time | UX | > 200ms load |
| Customization errors | Reliability | Any error |

### Support for Customization

| Support Type | Tier | SLA |
|--------------|------|-----|
| Self-service docs | All | N/A |
| Email support | Pro+ | 24h response |
| Dedicated support | Enterprise+ | 4h response |
| White-glove setup | OEM | Dedicated manager |

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Configure branding during onboarding
- `bmad-bam-tenant-portal-design` - Full customization workflow
- `bmad-bam-tenant-tier-migration` - Enable features on tier upgrade

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `customization`, `tenant-lifecycle`
- **Related guides:** `tenant-customization-patterns`

### Web Research

Use `web_queries` from pattern registry:
- Search: "white label SaaS architecture patterns {date}"
- Search: "multi-tenant custom domain implementation {date}"
- Search: "SaaS tenant branding best practices {date}"
