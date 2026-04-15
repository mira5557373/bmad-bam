# Step 1: Pipeline Architecture

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

Design the CI/CD pipeline architecture including stages, triggers, artifact management, and environment promotion flow for multi-tenant AI platforms.

---

## Prerequisites

- Master architecture document loaded
- Module architecture documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: devops
- **Web research (if available):** Search for current CI/CD best practices

---

## Inputs

- User requirements and constraints for deployment
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Pipeline Stages

Design core pipeline stages:

| Stage | Purpose | Trigger | Duration Target |
|-------|---------|---------|-----------------|
| Build | Compile, lint, unit test | Push/PR | <5 min |
| Test | Integration, E2E tests | Build success | <15 min |
| Security | SAST, DAST, dependency scan | Test success | <10 min |
| Staging | Deploy to staging env | Security pass | <5 min |
| Validation | Smoke tests, validation | Staging success | <5 min |
| Production | Deploy to production | Manual/Auto approval | <10 min |

### 2. Configure Pipeline Triggers

Define trigger conditions:

| Trigger | Action | Stages Run |
|---------|--------|------------|
| PR Created | Build + Test | Build, Test, Security |
| PR Merged to main | Full pipeline | All stages |
| Release Tag | Production deployment | Security, Staging, Production |
| Hotfix Branch | Expedited pipeline | Build, Test, Production |
| Scheduled | Nightly full test | All stages |

### 3. Design Artifact Management

Define artifact lifecycle:

| Artifact Type | Storage | Retention | Versioning |
|---------------|---------|-----------|------------|
| Container Images | Registry (ECR/GCR) | 90 days | Semantic + SHA |
| Helm Charts | Chart Museum | 180 days | Semantic |
| Build Artifacts | S3/GCS | 30 days | Build number |
| Test Reports | S3/GCS | 365 days | Build number |
| Security Reports | Vault | Indefinite | Build number |

### 4. Design Environment Promotion

Define promotion flow:

| Environment | Purpose | Tenant Data | Promotion |
|-------------|---------|-------------|-----------|
| Dev | Developer testing | Synthetic | Automatic |
| Integration | Integration testing | Synthetic | Automatic |
| Staging | Pre-production validation | Anonymized copy | Manual gate |
| Production | Live traffic | Real | Manual approval |
| DR | Disaster recovery | Replicated | Automatic sync |

**Verify current best practices with web search:**
Search the web: "CI/CD pipeline architecture best practices {date}"
Search the web: "GitOps deployment patterns multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the pipeline architecture analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific stages or artifact management
- **P (Party Mode)**: Bring DevOps and security perspectives on pipeline design
- **C (Continue)**: Accept pipeline architecture design and proceed to testing stages
- **[Specific refinements]**: Describe pipeline architecture concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: pipeline stages, triggers, artifacts, environments
- Process enhanced insights on CI/CD trade-offs
- Ask user: "Accept these refined pipeline architecture decisions? (y/n)"
- If yes, integrate into pipeline architecture specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review CI/CD pipeline architecture for multi-tenant AI platform"
- Process DevOps and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save pipeline architecture design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-testing-stages.md`

---

## Verification

- [ ] Pipeline stages defined
- [ ] Triggers configured
- [ ] Artifact management designed
- [ ] Environment promotion flow documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Pipeline stage definitions
- Trigger configuration
- Artifact management specification
- Environment promotion flow
- **Load template:** `{project-root}/_bmad/bam/data/templates/cicd-pipeline-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/cicd-gate-config-template.md`

---

## Next Step

Proceed to `step-02-c-testing-stages.md` to design testing stages.
