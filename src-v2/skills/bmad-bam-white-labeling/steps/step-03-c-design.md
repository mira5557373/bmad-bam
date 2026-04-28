# Step 03: Design Domain Customization

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER skip SSL certificate automation design** - manual certs don't scale
- 📖 **CRITICAL: ALWAYS include domain verification flow** (CNAME, TXT, HTML, meta tag)
- 🔄 **CRITICAL: Document reserved subdomains** - prevent conflicts with system URLs
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **INCLUDE DNS configuration guidance** for self-service tenant setup

## EXECUTION PROTOCOLS:

- 🎯 Focus: Design custom domain mapping and SSL provisioning
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Custom domains enable Enterprise+ tenant branding
- 🔍 Use web search: Verify Let's Encrypt and DNS automation patterns
- ⚠️ Gate: SSL security and certificate management

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## YOUR TASK

Design the domain customization layer including: custom domain mapping architecture (platform subdomain, custom subdomain, apex domain, multiple domains by tier), SSL certificate provisioning automation (Let's Encrypt with ACME HTTP-01/DNS-01 challenges, certificate manager integration, auto-renewal), DNS configuration guidance for tenants (CNAME, A/AAAA records, TXT verification, CAA records), subdomain allocation strategy (slug validation, uniqueness, history, reserved list), and domain verification flow (verification methods, DNS propagation checking, self-service wizard).

---

## Purpose

Design the domain customization layer including custom domain mapping, SSL certificate provisioning, DNS configuration guidance, and subdomain allocation strategies.

---

## Prerequisites

- Step 02 completed: Branding design established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/customization.md`

**Web Research (Required):**

Search the web: "multi-tenant custom domain implementation {date}"
Search the web: "SaaS SSL certificate automation Let's Encrypt {date}"
Search the web: "wildcard DNS multi-tenant architecture {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Design Custom Domain Mapping

Define domain mapping architecture:

| Domain Type | Example | Tier | Resolution |
|-------------|---------|------|------------|
| Platform subdomain | `tenant.platform.com` | Free | Automatic |
| Custom subdomain | `app.tenant.com` | Enterprise | CNAME |
| Apex domain | `tenant.com` | Enterprise+ | A record |
| Multiple domains | `app.tenant.com`, `portal.tenant.com` | OEM | Multiple mappings |

Domain resolution flow:

| Stage | Action | System |
|-------|--------|--------|
| Request | Extract hostname | Load balancer |
| Lookup | Query tenant by domain | Domain registry |
| Validation | Verify domain ownership | Verification service |
| Routing | Route to tenant context | Application router |
| Caching | Cache domain->tenant mapping | Redis/memory |

Domain verification methods:

| Method | How It Works | Time to Verify |
|--------|--------------|----------------|
| CNAME verification | Tenant adds CNAME with verification token | Minutes |
| TXT record | Tenant adds TXT record with token | Minutes |
| HTML file | Tenant uploads verification file | Immediate |
| Meta tag | Tenant adds meta tag to homepage | Immediate |

### 2. Design SSL Certificate Provisioning

Certificate automation strategy:

| Approach | Pros | Cons | Recommendation |
|----------|------|------|----------------|
| Let's Encrypt automation | Free, automated | Rate limits, 90-day renewal | Default choice |
| Managed certificates | Simple, no rate limits | Cost per certificate | Enterprise option |
| Customer-provided | Full control | Manual process | OEM/compliance needs |

Certificate provisioning flow:

| Stage | Action | Automation |
|-------|--------|------------|
| Domain verified | Trigger certificate request | Automatic |
| ACME challenge | HTTP-01 or DNS-01 challenge | Automatic |
| Certificate issued | Store in certificate manager | Automatic |
| Certificate deployed | Update load balancer/ingress | Automatic |
| Renewal | Re-issue 30 days before expiry | Automatic |

Certificate management architecture:

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Certificate manager | Store certificates | Vault, AWS ACM, Cert-Manager |
| ACME client | Automate Let's Encrypt | certbot, cert-manager, acme.sh |
| Certificate monitor | Track expiry dates | Custom + alerting |
| Load balancer | Serve certificates | SNI-based routing |

### 3. Design DNS Configuration Guidance

Provide tenant-facing DNS guidance:

| Record Type | Purpose | Example |
|-------------|---------|---------|
| CNAME | Subdomain pointing | `app CNAME tenant.platform.com` |
| A record | Apex domain pointing | `@ A <platform-ip>` |
| AAAA record | IPv6 apex domain | `@ AAAA <platform-ipv6>` |
| TXT record | Domain verification | `_verification TXT <token>` |
| CAA record | Certificate authority | `@ CAA 0 issue "letsencrypt.org"` |

DNS verification dashboard:

| Check | Status | Action if Failed |
|-------|--------|------------------|
| CNAME/A record | Pending/Verified | Show DNS instructions |
| TXT verification | Pending/Verified | Show TXT record to add |
| DNS propagation | Propagating/Complete | Show propagation status |
| SSL ready | Pending/Ready | Trigger certificate issuance |

Self-service DNS wizard flow:

| Step | User Action | System Action |
|------|-------------|---------------|
| 1 | Enter custom domain | Validate format |
| 2 | Choose verification method | Generate verification token |
| 3 | Configure DNS records | Display instructions |
| 4 | Click verify | Check DNS records |
| 5 | Confirmation | Provision SSL, activate domain |

### 4. Design Subdomain Allocation

Subdomain strategy by tier:

| Tier | Subdomain Format | Customization |
|------|------------------|---------------|
| Free | `{tenant-slug}.platform.com` | None |
| Pro | `{tenant-slug}.platform.com` | Slug editable |
| Enterprise | `{tenant-slug}.platform.com` + custom domain | Full control |
| OEM | Multiple custom domains | Full control |

Subdomain management:

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Slug validation | Alphanumeric, no reserved words | Validation rules |
| Slug uniqueness | Globally unique | Database constraint |
| Slug history | Track previous slugs | Redirect old URLs |
| Reserved slugs | Block system URLs | Reserved list |

Reserved subdomain list:

| Reserved | Reason |
|----------|--------|
| `www`, `api`, `app` | Platform use |
| `admin`, `dashboard` | System URLs |
| `mail`, `smtp`, `pop` | Email services |
| `ftp`, `sftp` | File services |
| `support`, `help` | Support portal |
| `status`, `health` | Status pages |

---

## COLLABORATION MENUS (A/P/C):

After presenting the domain customization design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into SSL automation or DNS architecture
- **P (Party Mode)**: Bring DevOps/Security perspectives on domain handling
- **C (Continue)**: Accept domain design and proceed to feature customization
- **[Specific components]**: Describe which components need refinement

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: domain mapping design, SSL strategy, DNS guidance
- Process enhanced insights on certificate automation, DNS propagation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review domain customization architecture for multi-tenant SaaS"
- Present synthesized recommendations from DevOps and security perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Document domain design decisions
- Update frontmatter: `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Custom domain mapping architecture defined
- [ ] SSL certificate provisioning strategy documented
- [ ] DNS configuration guidance designed
- [ ] Subdomain allocation strategy specified
- [ ] Domain verification flow documented
- [ ] Reserved subdomains identified
- [ ] Web research completed with citations

---

## Outputs

- Domain mapping architecture specification
- SSL certificate automation design
- DNS configuration guide for tenants
- Subdomain allocation and management rules
- Domain verification workflow

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-04-c-document.md` to design feature customization.
