# Step 01: Initialize White-Labeling Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER skip tier applicability analysis** - customization varies by tier
- 📖 **CRITICAL: ALWAYS verify OEM/reseller requirements** if applicable
- 🔄 **CRITICAL: Include all three customization dimensions** - Branding, Domain, Email
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **IDENTIFY feature customization scope** - UI components, menu structure, role naming

## EXECUTION PROTOCOLS:

- 🎯 Focus: Initialize white-labeling design scope across tiers
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: White-labeling enables tenant branding and customization
- 🔍 Use web search: Verify current white-label patterns
- ⚠️ Gate: ADR documentation required for customization decisions

---

## YOUR TASK

Initialize the white-labeling design by loading tier configurations (Free/Pro/Enterprise/OEM), identifying the three customization dimensions (Branding, Domain, Email), loading pattern references from `bam-patterns.csv` filtered by `customization`, and capturing initial project requirements including target tiers, branding scope, custom domain needs, email branding, feature customization, and OEM/reseller support requirements. Verify current best practices via web research.

---

## Purpose

Initialize the white-labeling design workflow by loading tier configurations, pattern references, and identifying the customization dimensions relevant to the project.

---

## Prerequisites

- Project context established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/customization.md`

**Web Research (Required):**

Search the web: "white label SaaS architecture patterns {date}"
Search the web: "multi-tenant customization best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Load Tier Configurations

Review the tier-based customization matrix:

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

Confirm with user which tiers apply to their project.

### 2. Reference White-Labeling Patterns

Load pattern categories from registry:

| Pattern Category | Description | Relevance |
|------------------|-------------|-----------|
| `customization` | Tenant customization patterns | Core |
| `tenant-lifecycle` | Tenant management patterns | Supporting |
| `partner-ecosystem` | Partner/OEM patterns | Optional |

### 3. Identify Customization Dimensions

Present the three primary customization dimensions:

| Dimension | Components | Complexity |
|-----------|------------|------------|
| **Branding** | Logo, colors, fonts, themes, document watermarks | Medium |
| **Domain** | Custom domains, SSL certificates, DNS configuration | High |
| **Email** | Custom sender, templates, DKIM/SPF, bounce handling | Medium |

Ask user to confirm which dimensions are in scope.

### 4. Capture Project Requirements

Gather initial requirements:

| Requirement | User Response |
|-------------|---------------|
| Target tiers | {Free/Pro/Enterprise/OEM} |
| Branding scope | {Yes/No} |
| Custom domain needed | {Yes/No} |
| Email branding needed | {Yes/No} |
| Feature customization | {Yes/No} |
| OEM/reseller support | {Yes/No} |

---

## Soft Gate Checkpoint

**Step 1 establishes the white-labeling scope.**

Present summary and ask:
- "I have identified the following dimensions in scope: {list}. Shall I proceed with the branding customization design?"

---

## Verification

- [ ] Tier configurations loaded
- [ ] Pattern references identified
- [ ] Customization dimensions confirmed
- [ ] Initial requirements captured
- [ ] Web research completed with citations

---

## Outputs

- Tier applicability matrix
- Customization dimensions scope document
- Initial requirements capture

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

Proceed to `step-02-c-analyze.md` to design branding customization.
