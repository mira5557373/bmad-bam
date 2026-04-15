# Step 2: Threat Modeling

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

Perform systematic threat modeling using STRIDE methodology to identify potential threats to the multi-tenant AI platform.

---

## Prerequisites

- Step 1 completed: Scope assessment with trust boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Apply STRIDE to Trust Boundaries

For each trust boundary, identify STRIDE threats:

**Internet → Platform Boundary:**

| Threat | Category | Description | Risk |
|--------|----------|-------------|------|
| T-001 | Spoofing | Attacker impersonates legitimate user | High |
| T-002 | Tampering | Request modification in transit | Medium |
| T-003 | Repudiation | User denies actions | Low |
| T-004 | Info Disclosure | Sensitive data in responses | Medium |
| T-005 | Denial of Service | Resource exhaustion | High |
| T-006 | Elevation of Privilege | Bypass auth to admin | Critical |

**Tenant A → Tenant B Boundary:**

| Threat | Category | Description | Risk |
|--------|----------|-------------|------|
| T-101 | Spoofing | Tenant spoofs another tenant_id | Critical |
| T-102 | Info Disclosure | Query leaks cross-tenant data | Critical |
| T-103 | Tampering | Modify another tenant's data | Critical |
| T-104 | Elevation of Privilege | Access higher tier features | High |

**User → AI Agent Boundary:**

| Threat | Category | Description | Risk |
|--------|----------|-------------|------|
| T-201 | Tampering | Prompt injection | High |
| T-202 | Info Disclosure | Agent reveals sensitive info | High |
| T-203 | Denial of Service | Agent resource exhaustion | Medium |
| T-204 | Elevation of Privilege | Agent bypasses approval | Critical |

**AI Agent → Tools Boundary:**

| Threat | Category | Description | Risk |
|--------|----------|-------------|------|
| T-301 | Spoofing | Agent impersonates user | High |
| T-302 | Tampering | Agent modifies tool parameters | Medium |
| T-303 | Elevation of Privilege | Agent uses unauthorized tools | Critical |
| T-304 | Denial of Service | Agent exhausts tool resources | Medium |

### 2. Identify Attack Trees

Document attack trees for critical threats:

**Attack Tree: Cross-Tenant Data Access**
```
Goal: Access Tenant B's data from Tenant A
├── Bypass RLS policy
│   ├── SQL injection in query
│   ├── Missing tenant_id in query
│   └── RLS policy misconfiguration
├── Spoof tenant_id
│   ├── Modify JWT claims
│   ├── Parameter tampering
│   └── Session hijacking
└── Exploit shared resources
    ├── Cache poisoning
    ├── Shared file storage access
    └── Background job data leak
```

**Attack Tree: AI Agent Privilege Escalation**
```
Goal: Execute unauthorized actions via AI agent
├── Bypass approval workflow
│   ├── Manipulate risk assessment
│   ├── Exploit async processing
│   └── Kill switch failure
├── Prompt injection
│   ├── Direct prompt manipulation
│   ├── Indirect via data injection
│   └── Tool output manipulation
└── Tool permission bypass
    ├── Missing permission check
    ├── Permission escalation via agent chain
    └── Sandbox escape
```

### 3. Risk Assessment

Prioritize threats by risk:

| Threat ID | Description | Likelihood | Impact | Risk Score |
|-----------|-------------|------------|--------|------------|
| T-101 | Tenant ID spoofing | Medium | Critical | Critical |
| T-102 | Cross-tenant data leak | Medium | Critical | Critical |
| T-204 | Agent approval bypass | Low | Critical | High |
| T-201 | Prompt injection | High | High | High |
| T-303 | Unauthorized tool access | Medium | High | High |
| T-001 | User impersonation | Medium | Medium | Medium |

### 4. Document Existing Controls

Map existing controls to threats:

| Threat ID | Existing Controls | Control Effectiveness |
|-----------|-------------------|----------------------|
| T-101 | JWT validation, tenant_id in context | Partial |
| T-102 | RLS policies, query auditing | Strong |
| T-201 | NeMo Guardrails, input validation | Partial |
| T-204 | Approval workflow, risk assessment | Partial |

**Verify current best practices with web search:**
Search the web: "threat modeling best practices {date}"
Search the web: "threat modeling enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the threat model above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific threat scenarios
- **P (Party Mode)**: Bring security researcher and SRE perspectives on threats
- **C (Continue)**: Accept threat model and proceed to tenant isolation review
- **[Specific refinements]**: Describe threat concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: STRIDE threats, attack trees, risk assessment
- Process enhanced insights on threat completeness
- Ask user: "Accept these refined threat models? (y/n)"
- If yes, integrate into threat model
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review threat model for multi-tenant AI platform"
- Process security researcher and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save threat model to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-isolation-review.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the threat identification phase.**

Present summary of:
- STRIDE threat matrix for each trust boundary
- Attack trees for critical scenarios (cross-tenant access, AI privilege escalation)
- Risk-prioritized threat list with likelihood and impact scores

Ask for confirmation before proceeding to tenant isolation review.

---

## Verification

- [ ] STRIDE applied to all trust boundaries
- [ ] Attack trees documented for critical threats
- [ ] Risk assessment completed
- [ ] Existing controls mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete threat model
- Attack trees for critical scenarios
- Risk-prioritized threat list
- **Output to:** `{output_folder}/planning-artifacts/security/threat-model.md`

---

## Next Step

Proceed to `step-03-c-tenant-isolation-review.md` to review tenant isolation.
