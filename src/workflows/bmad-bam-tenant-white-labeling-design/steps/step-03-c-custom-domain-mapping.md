# Step 3: Custom Domain Mapping

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Establish custom domain infrastructure for tenant white-labeling.

---

## Prerequisites

- Steps 1-2 completed (Assets, Theming)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `domain-management`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Branding and theming from Steps 1-2
- Infrastructure requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Establish custom domain infrastructure:

## Domain Options by Tier

```yaml
domain_tiers:
  FREE:
    type: subdomain
    format: "{tenant_slug}.platform.com"
    ssl: Shared wildcard certificate
    
  PRO:
    type: subdomain
    format: "{tenant_slug}.platform.com"
    ssl: Shared wildcard certificate
    custom_subdomain: Optional
    
  ENTERPRISE:
    type: custom_domain
    format: "app.{customer_domain}"
    ssl: Dedicated certificate
    apex_domain: Supported
```

## Domain Verification

```yaml
domain_verification:
  methods:
    dns_txt:
      record_type: TXT
      record_name: _platform-verification
      record_value: "verify={tenant_id}_{verification_token}"
      ttl_check: 60 seconds
      
    dns_cname:
      record_type: CNAME
      record_name: app
      record_value: "{tenant_slug}.platform.com"
      
  process:
    1. Tenant adds domain in settings
    2. Platform generates verification token
    3. Tenant adds DNS record
    4. Platform polls for verification (every 5 min)
    5. On success, domain is activated
    6. SSL provisioning begins
    
  expiration:
    verification_token: 7 days
    retry_attempts: 1008 (7 days at 10 min intervals)
```

## SSL Certificate Management

```yaml
ssl_management:
  provider: Let's Encrypt / AWS ACM
  
  certificate_types:
    subdomain:
      method: Wildcard certificate
      scope: *.platform.com
      renewal: Automatic (30 days before expiry)
      
    custom_domain:
      method: Per-domain certificate
      validation: DNS-01 challenge
      renewal: Automatic
      
  provisioning:
    timeout: 15 minutes
    retry: 3 attempts
    fallback: Show configuration instructions
    
  monitoring:
    expiry_alert: 14 days before
    validation_check: Daily
```

## DNS Configuration

```yaml
dns_requirements:
  subdomain:
    record_type: CNAME
    target: "{region}.platform.com"
    
  custom_domain:
    option_1:  # CNAME (recommended)
      record_type: CNAME
      record_name: app
      target: "{tenant_slug}.platform.com"
      
    option_2:  # Apex domain with ALIAS
      record_type: ALIAS/ANAME
      record_name: "@"
      target: "{tenant_slug}.platform.com"
      
  cdn_integration:
    provider: CloudFront / Cloudflare
    cname: "{tenant_slug}.d.platform.com"
    
  documentation:
    auto_generated: Per-tenant DNS instructions
    formats: [Markdown, PDF]
    provider_specific: Yes (Route53, Cloudflare, GoDaddy)
```

## Fallback and Error Handling

```yaml
error_handling:
  dns_propagation:
    timeout: 72 hours
    message: "DNS propagation in progress"
    check_interval: 10 minutes
    
  ssl_failure:
    retry: 3 times over 24 hours
    notification: Email tenant admin
    fallback: Subdomain remains active
    
  domain_issues:
    misconfigured:
      detection: Health check failure
      action: Email notification
      fallback: Redirect to subdomain
      
    expired:
      grace_period: 30 days
      action: Revert to subdomain
      notification: 7, 3, 1 days before
```

## Multi-Region Routing

```yaml
multi_region:
  strategy: GeoDNS
  
  regions:
    us_east:
      endpoint: us-east.platform.com
      locations: [North America, South America]
      
    eu_west:
      endpoint: eu-west.platform.com
      locations: [Europe, Africa]
      
    ap_southeast:
      endpoint: ap-southeast.platform.com
      locations: [Asia Pacific, Oceania]
      
  tenant_preference:
    primary_region: Configurable
    failover: Automatic
    
  custom_domains:
    resolution: Same region logic
    cdn_edge: Global distribution
```

**Verify current best practices with web search:**
Search the web: "custom domain multi-tenant SaaS {date}"
Search the web: "SSL certificate automation Let's Encrypt {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the custom domain mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into domain requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for domain analysis
- **C (Continue)**: Accept domain mapping and proceed to tenant portal theming
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass domain context: verification, SSL, DNS, multi-region
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into domain mapping summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review custom domain mapping for white-labeling: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save domain mapping to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-portal-theming.md`

---

## Verification

- [ ] Domain tiers defined
- [ ] Verification process established
- [ ] SSL management configured
- [ ] DNS requirements documented
- [ ] Error handling designed
- [ ] Multi-region routing planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Domain mapping specification
- SSL configuration
- DNS documentation templates

---

## Next Step

Proceed to `step-04-c-tenant-portal-theming.md` to design portal theming.
