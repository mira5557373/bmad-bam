# Step 1: Define Processing Purposes

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

Define all data processing purposes requiring consent, map to appropriate lawful bases under GDPR Article 6, and establish purpose granularity for meaningful user choice.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: GDPR


---

## Inputs

- User requirements and constraints for consent management
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Processing Activities

Catalog all personal data processing activities:

| Activity ID | Processing Activity | Data Categories | Data Subjects |
|-------------|---------------------|-----------------|---------------|
| PA-001 | User account creation | Name, email, password | Platform users |
| PA-002 | Service personalization | Usage data, preferences | Platform users |
| PA-003 | Marketing communications | Email, name | Newsletter subscribers |
| PA-004 | Analytics and improvement | Aggregated usage | All users |
| PA-005 | AI model training | Interaction data | Opted-in users |

### 2. Map Lawful Bases

Determine appropriate lawful basis per GDPR Article 6:

| Activity ID | Lawful Basis | Justification | Consent Required |
|-------------|--------------|---------------|------------------|
| PA-001 | Contract (Art. 6(1)(b)) | Necessary for service | No (but disclosure) |
| PA-002 | Legitimate Interest (Art. 6(1)(f)) | LIA documented | No (opt-out provided) |
| PA-003 | Consent (Art. 6(1)(a)) | Direct marketing | Yes - explicit |
| PA-004 | Legitimate Interest (Art. 6(1)(f)) | Service improvement | No (anonymized) |
| PA-005 | Consent (Art. 6(1)(a)) | AI training | Yes - explicit |

### 3. Define Purpose Categories

Group purposes for user-friendly presentation:

| Category | Purposes Included | Consent Type |
|----------|-------------------|--------------|
| Essential | Account, authentication, security | Disclosure only |
| Functional | Preferences, personalization | Opt-out available |
| Marketing | Newsletters, promotions, retargeting | Explicit opt-in |
| Analytics | Usage analytics, performance | Opt-out available |
| AI Training | Model improvement, ML training | Explicit opt-in |

### 4. Document Purpose Specifications

Detail each purpose per GDPR Article 13/14:

| Purpose | Description | Data Processed | Retention | Recipients |
|---------|-------------|----------------|-----------|------------|
| Marketing emails | Send promotional content and offers | Email, name | Until withdrawal | Email provider |
| AI model training | Improve AI responses using interaction data | Anonymized chat logs | 24 months | None (internal) |

**Verify current best practices with web search:**
Search the web: "GDPR consent purpose specification best practices {date}"
Search the web: "GDPR Article 6 lawful basis determination {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Purpose Analysis
- **A1**: Analyze AI-specific processing purposes and consent requirements
- **A2**: Evaluate legitimate interest assessments (LIA) requirements
- **A3**: Assess special category data processing needs (Article 9)
- **A4**: Review cross-border transfer purpose implications

### [P] Propose - Purpose Recommendations
- **P1**: Propose purpose granularity strategy for meaningful choice
- **P2**: Suggest purpose bundling approach for UX optimization
- **P3**: Recommend tenant-specific purpose configuration
- **P4**: Propose purpose versioning and update strategy

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Design Consent Collection) - load `step-02-c-design-collection.md`
- **C2**: Return to workflow overview
- **C3**: Export current purpose analysis

---

## Verification

- [ ] All processing activities identified
- [ ] Lawful bases determined per activity
- [ ] Purpose categories defined
- [ ] Purpose specifications documented
- [ ] Patterns align with pattern registry

## Outputs

- Processing activities inventory
- Lawful basis mapping
- Purpose category structure
- Purpose specifications (Article 13/14 ready)

## Next Step

Proceed to `step-02-c-design-collection.md` to design consent collection mechanisms.
