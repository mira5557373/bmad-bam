# Step 1: Document Emergency

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

Formally document the emergency requiring master architecture change.

---

## Prerequisites

- Emergency situation identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- User requirements and constraints for master architecture emergency change
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### Emergency Classification

**Severity Level:**
- **Critical**: Production down, data loss imminent, security breach
- **High**: Significant degradation, compliance violation risk
- **Medium**: Performance impact, blocked development

**Emergency Type:**
- Security vulnerability
- Compliance requirement
- Critical bug
- Infrastructure failure
- External dependency breaking change

### Emergency Details

Document the following:

**Problem Statement:**
- Clear description of the issue
- When it was discovered
- How it was discovered
- Current impact (users affected, revenue impact, compliance risk)

**Root Cause:**
- Technical root cause
- Why current architecture cannot address it
- Why normal change process is insufficient

**Urgency Justification:**
- Time constraint (SLA, deadline, exposure window)
- Consequences of delayed resolution
- Why this cannot wait for normal architecture review

### Evidence Collection

Gather supporting evidence:
- Incident reports
- Error logs
- Security advisories
- Compliance audit findings
- Performance metrics
- Customer escalations

### Initial Stakeholder Notification

Notify immediately:
- Platform Architect (Atlas)
- Engineering Leadership
- Security Team (if security-related)
- Compliance Team (if compliance-related)

**Verify current best practices with web search:**
Search the web: "document emergency best practices {date}"
Search the web: "document emergency enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the emergency documentation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into emergency root cause analysis
- **P (Party Mode)**: Bring architect and security perspectives for emergency assessment
- **C (Continue)**: Accept emergency documentation and proceed to impact assessment
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass emergency context: severity, type, root cause analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into emergency documentation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review emergency documentation for master architecture change: {summary of problem and urgency}"
- Process collaborative analysis from architect and security personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save emergency documentation to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-assess-impact.md`

---

## Verification

- [ ] Severity level classified
- [ ] Emergency type identified
- [ ] Problem statement complete
- [ ] Root cause documented
- [ ] Urgency justified
- [ ] Evidence collected
- [ ] Stakeholders notified
- [ ] Patterns align with pattern registry

---

## Outputs

- Emergency change request document
- Evidence collection
- **Load template:** `{project-root}/_bmad/bam/templates/change-request-template.md`

---

## Next Step

Proceed to `step-02-c-assess-impact.md` to evaluate change impact.
