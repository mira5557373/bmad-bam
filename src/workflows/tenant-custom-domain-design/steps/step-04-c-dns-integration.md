# Step 4: DNS Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Define DNS configuration patterns for custom domain verification, propagation monitoring, and ownership validation.

---

## Prerequisites

- Step 1: Domain Architecture completed
- Step 2: SSL/TLS Management completed
- Step 3: Routing Configuration completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Inputs

- Domain architecture from step 1
- Routing configuration from step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. DNS Verification Methods

Define methods for custom domain verification:

| Method | Record Type | Verification |
|--------|-------------|--------------|
| CNAME Challenge | CNAME | `_verify.customer.com` -> `verify.platform.com` |
| TXT Challenge | TXT | `_platform-verify.customer.com` -> `token123` |
| HTTP Challenge | N/A | `/.well-known/platform-verify` |

### 2. Propagation Monitoring

Design DNS propagation monitoring system:

1. Submit verification request
2. Poll multiple DNS resolvers (8.8.8.8, 1.1.1.1, etc.)
3. Track propagation progress (0-100%)
4. Notify tenant when fully propagated
5. Retry with exponential backoff on failure
6. Timeout after 48 hours with alert

### 3. Domain Ownership Verification

Implement ongoing ownership validation:

- Initial verification during setup
- Periodic re-verification (weekly)
- Ownership change detection
- Automatic domain suspension on verification failure
- Grace period (72 hours) before deactivation

### 4. Multi-Provider DNS Support

Support common DNS providers:

| Provider | Integration | Automation Level |
|----------|-------------|------------------|
| Route 53 | API | Full (auto-configure) |
| CloudFlare | API | Full (auto-configure) |
| GoDaddy | Manual | Partial (verification only) |
| Generic | Manual | Manual (instructions only) |

**Verify current best practices with web search:**
Search the web: "custom domain DNS verification SaaS {date}"
Search the web: "DNS propagation monitoring multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the DNS integration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into DNS edge cases and failure scenarios
- **P (Party Mode)**: Bring infrastructure and operations perspectives for review
- **C (Continue)**: Finalize custom domain design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass DNS context: verification methods, propagation, ownership
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into DNS integration design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review DNS integration: {summary of verification and monitoring}"
- Process collaborative analysis
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete custom domain design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final artifact

---

## Verification

- [ ] DNS verification methods defined
- [ ] Propagation monitoring designed
- [ ] Ownership verification implemented
- [ ] Multi-provider support documented
- [ ] Patterns align with pattern registry

---

## Outputs

- DNS verification matrix
- Propagation monitoring design
- Complete custom domain design document
- **Load template:** `{project-root}/_bmad/bam/data/templates/custom-domain-template.md`

---

## Workflow Complete

Create mode complete for tenant-custom-domain-design workflow.
