# Step 2: Design Consent Collection

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

Design GDPR-compliant consent collection mechanisms including consent forms, cookie banners, preference centers, and consent versioning.

## Prerequisites

- Processing purposes defined (Step 1 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: GDPR


---

## Inputs

- Purpose specifications from Step 1
- Tenant model requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Consent Form Requirements

Define GDPR-compliant consent collection UI:

| Requirement | GDPR Article | Implementation |
|-------------|--------------|----------------|
| Freely given | Art. 7 | No service denial, separate checkboxes |
| Specific | Art. 7 | Granular purpose selection |
| Informed | Art. 13 | Clear, plain language descriptions |
| Unambiguous | Art. 7 | Affirmative action, no pre-ticks |
| Withdrawable | Art. 7(3) | Easy withdrawal mechanism |

### 2. Design Consent Collection Points

Identify where consent is collected:

| Collection Point | Purposes | Consent Type | UI Component |
|------------------|----------|--------------|--------------|
| Registration | Essential, Marketing | Mixed | Sign-up form |
| Cookie Banner | Analytics, Marketing | Opt-in | Banner + modal |
| AI Features | AI Training | Explicit | Feature dialog |
| Email Subscribe | Marketing | Double opt-in | Subscription form |
| Preference Center | All | Management | Settings page |

### 3. Design Cookie Consent (ePrivacy)

Define cookie consent mechanism:

| Cookie Category | Purpose | Consent Required | Default State |
|-----------------|---------|------------------|---------------|
| Strictly Necessary | Session, security | No | Enabled |
| Functional | Preferences, language | Recommended | Off |
| Analytics | Usage tracking | Yes | Off |
| Marketing | Ad targeting, retargeting | Yes | Off |
| AI/ML | Model training cookies | Yes | Off |

### 4. Design Consent Versioning

Manage consent form changes:

| Version | Date | Changes | Re-consent Required |
|---------|------|---------|---------------------|
| v1.0 | {Date} | Initial version | N/A |
| v1.1 | {Date} | Added AI training purpose | Yes - affected users |
| v2.0 | {Date} | Major policy update | Yes - all users |

### 5. Design Tenant Consent Customization

Allow tenant-specific consent configuration:

| Customization | Scope | Constraints |
|---------------|-------|-------------|
| Branding | Logo, colors | Style only |
| Additional purposes | Tenant-specific | Must comply with GDPR |
| Language | Translations | Base content required |
| Collection points | Placement | Core points mandatory |

**Verify current best practices with web search:**
Search the web: "GDPR consent collection UI best practices {date}"
Search the web: "cookie consent banner GDPR compliance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Collection Analysis
- **A1**: Analyze cookie consent implementation options
- **A2**: Evaluate double opt-in requirements for marketing
- **A3**: Assess accessibility requirements for consent forms
- **A4**: Review consent fatigue mitigation strategies

### [P] Propose - Collection Recommendations
- **P1**: Propose consent UX design patterns
- **P2**: Suggest cookie banner implementation approach
- **P3**: Recommend preference center layout
- **P4**: Propose consent form A/B testing strategy

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Design Consent Storage) - load `step-03-c-design-storage.md`
- **C2**: Return to workflow overview
- **C3**: Export current collection design

---

## Verification

- [ ] Consent form requirements defined
- [ ] Collection points identified
- [ ] Cookie consent designed
- [ ] Versioning strategy established
- [ ] Tenant customization defined
- [ ] Patterns align with pattern registry

## Outputs

- Consent form requirements
- Collection point specifications
- Cookie consent design
- Consent versioning strategy
- Tenant customization rules

## Next Step

Proceed to `step-03-c-design-storage.md` to design consent storage architecture.
