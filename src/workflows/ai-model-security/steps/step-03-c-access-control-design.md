# Step 3: Access Control Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design comprehensive access control for AI model assets ensuring tenant isolation and least privilege.

## Prerequisites

- Model integrity verification designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: rbac, abac
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation, api-security

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design model access control framework:

## Tenant-Scoped Model Access

**Model Isolation:**
- Shared models with tenant context enforcement
- Per-tenant fine-tuned model isolation
- Cross-tenant model access prevention
- Enterprise tier dedicated model instances

**Access Boundaries:**
| Model Type | FREE Tier | PRO Tier | ENTERPRISE Tier |
|------------|-----------|----------|-----------------|
| Base Models | Shared | Shared | Dedicated |
| Fine-Tuned | N/A | Tenant-scoped | Tenant-scoped |
| Custom | N/A | N/A | Isolated |

## Role-Based Model Permissions

**Model Operations Matrix:**
| Role | Read Model | Invoke Model | Fine-Tune | Deploy | Delete |
|------|------------|--------------|-----------|--------|--------|
| Viewer | Yes | No | No | No | No |
| User | Yes | Yes | No | No | No |
| Developer | Yes | Yes | Read Config | No | No |
| Admin | Yes | Yes | Yes | Yes | No |
| Owner | Yes | Yes | Yes | Yes | Yes |

**Permission Enforcement:**
- Policy engine integration (OPA, Cedar)
- Permission caching with TTL
- Audit logging of all permission checks

## API Authentication

**Token Management:**
- Short-lived access tokens (15-60 min)
- Refresh token rotation
- API key scoping (per-tenant, per-model)
- Service account tokens for automation

**Endpoint Protection:**
- Model endpoints not publicly accessible
- VPC/private network deployment
- IP allowlisting for enterprise
- mTLS for service-to-service

## Fine-Tuned Model Access

**Tenant Ownership:**
- Fine-tuned models owned by training tenant
- No cross-tenant access to fine-tuned weights
- Model export controls (blocked by default)
- Tenant deletion removes fine-tuned models

Output: Access control design with role matrix and authentication configuration.

**Verify current best practices with web search:**
Search the web: "AI model access control multi-tenant patterns {date}"
Search the web: "ML model API security best practices {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the access control design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into access control requirements and permission boundaries
- **P (Party Mode)**: Bring Identity Architect, Platform Engineer, and Compliance Officer perspectives
- **C (Continue)**: Accept access control design and proceed to Step 4: Audit Logging
- **Refine permissions**: Describe specific access control concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant isolation, role matrix, API authentication
- Process enhanced insights
- Ask user: "Accept these refined access controls? (y/n)"
- If yes, integrate into access control document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review model access control design for tenant isolation and API security"
- Process Identity Architect, Platform Engineer, Compliance Officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save access control design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-audit-logging.md`

---

## Verification

- [ ] Tenant-scoped model access defined
- [ ] Role-based permissions specified
- [ ] API authentication configured
- [ ] Fine-tuned model access restricted
- [ ] Endpoint protection documented
- [ ] Patterns align with pattern registry

## Outputs

- Access control design document
- Role matrix
- Authentication configuration
- **Load template:** `{project-root}/_bmad/bam/templates/access-control-template.md`

## Next Step

Proceed to `step-04-c-audit-logging.md` to design model audit logging.
