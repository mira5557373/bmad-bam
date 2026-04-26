# Step 01: Initialize White-Labeling Design

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
- 🔍 Use web search to verify current best practices

---

## Purpose

Initialize the white-labeling design workflow by loading tier configurations, pattern references, and identifying the customization dimensions relevant to the project.

---

## Prerequisites

- Project context established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/white-labeling-guide.md`

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

## Next Step

Proceed to `step-02-c-analyze.md` to design branding customization.
