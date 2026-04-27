# Step 1: Initialize Data Residency Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Initialize the data residency design by loading tenant model configuration, compliance requirements, and identifying target geographic regions for data storage and processing.

---

## Prerequisites

- Master architecture document completed
- Tenant model isolation document exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: GDPR, CCPA, LGPD

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- Tenant model design: `{output_folder}/planning-artifacts/tenant-model-isolation.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Compliance frameworks: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Load Tenant Model Configuration

Review the tenant model to understand isolation approach:

| Configuration | Value | Impact on Residency |
|---------------|-------|---------------------|
| Tenant Model | {row-level-security / schema-per-tenant / database-per-tenant} | Determines data separation |
| Database Type | {PostgreSQL / MySQL / etc.} | Affects replication options |
| Cloud Provider | {AWS / GCP / Azure / multi-cloud} | Available regions |
| AI Runtime | {langgraph / crewai / autogen} | Model hosting regions |

### 2. Identify Compliance Requirements

Map applicable data residency regulations:

| Regulation | Jurisdiction | Data Residency Requirement | User Categories |
|------------|--------------|----------------------------|-----------------|
| GDPR | EU/EEA | EU data must stay in EU or adequate countries | EU residents |
| CCPA | California, USA | Disclosure required, no strict residency | CA residents |
| LGPD | Brazil | Brazil data should stay in Brazil | BR residents |
| PDPA | Singapore | Cross-border transfer restrictions | SG residents |
| PIPL | China | China data must stay in China | CN residents |
| HIPAA | USA | No specific residency, but BAA required | PHI subjects |

### 3. Identify Target Regions

Define geographic regions for data storage:

| Region Code | Description | Compliance Zones | Primary Use Case |
|-------------|-------------|------------------|------------------|
| US-EAST | US East (Virginia) | US, HIPAA | North America primary |
| US-WEST | US West (Oregon) | US, HIPAA | North America DR |
| EU-WEST | EU West (Ireland) | GDPR, EU | Europe primary |
| EU-CENTRAL | EU Central (Frankfurt) | GDPR, EU | Europe DR |
| APAC-EAST | Asia Pacific (Tokyo) | APAC | APAC primary |
| APAC-SOUTH | Asia Pacific (Singapore) | PDPA, APAC | Southeast Asia |
| SA-EAST | South America (Sao Paulo) | LGPD | Brazil primary |

### 4. Document Initial Requirements

| Requirement | Value | Source |
|-------------|-------|--------|
| Primary Regions | {list} | Business requirements |
| Compliance Zones | {list} | Legal/compliance |
| Cross-Region Allowed | {yes/no/restricted} | Policy |
| AI Model Hosting | {regional/global} | Architecture decision |

**Verify current best practices with web search:**
Search the web: "multi-tenant data residency architecture patterns {date}"
Search the web: "cloud data sovereignty compliance requirements {date}"

_Source: [URL]_

---

## Verification

- [ ] Tenant model configuration loaded
- [ ] Compliance requirements identified
- [ ] Target regions defined
- [ ] Initial requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant model configuration summary
- Compliance requirements matrix
- Target region definitions
- Initial data residency requirements
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-residency.md`

---

## Next Step

Proceed to `step-02-c-analyze.md` to design regional data storage architecture.
