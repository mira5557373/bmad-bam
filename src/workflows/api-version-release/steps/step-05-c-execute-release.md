# Step 5: Execute Release

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

Deploy the new API version following the release process.

## Prerequisites

- Changelog generated (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,deployment
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "API release deployment integration patterns {date}"
Search the web: "release execution contract design {date}"

_Source: [URL]_

## Pre-Release Checklist

- [ ] All changes tested in staging environment
- [ ] Contract tests pass for new version
- [ ] Documentation reviewed and approved
- [ ] Migration guides validated
- [ ] Rollback plan documented
- [ ] Monitoring dashboards ready
- [ ] Support team briefed

## Release Steps

1. **Tag Release**
   - Create git tag for version
   - Generate release artifacts
   - Update version in API gateway

2. **Deploy to Production**
   - Blue/green or canary deployment
   - Enable new version routing
   - Maintain old version parallel

3. **Verify Deployment**
   - Health checks pass
   - Contract tests against production
   - Sample API calls successful
   - Monitoring shows expected metrics

4. **Announce Release**
   - Publish changelog
   - Send notification emails
   - Update status page
   - Post to developer community

## Post-Release Monitoring

Watch for:
- Error rate changes
- Latency changes
- Consumer adoption rate
- Support ticket volume

## Rollback Triggers

Initiate rollback if:
- Error rate exceeds threshold
- Critical functionality broken
- Security issue discovered
- Data integrity concerns

## Release Completion

- [ ] New version serving traffic
- [ ] Old version running in parallel (if applicable)
- [ ] Monitoring confirms stability
- [ ] Communication sent to consumers
- [ ] Release retrospective scheduled

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing release execution above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into deployment strategy and monitoring
- **P (Party Mode)**: Bring DevOps and architect perspectives for release review
- **C (Continue)**: Complete Create mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass release context: deployment strategy, rollback triggers, monitoring
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into release plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review release execution plan for API version: {summary of deployment and monitoring}"
- Process collaborative analysis from DevOps and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save release execution log to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Create mode complete

---

## Verification

- [ ] Pre-release checklist complete
- [ ] Release steps executed
- [ ] Deployment verified
- [ ] Release announced
- [ ] Post-release monitoring active
- [ ] Rollback triggers defined
- [ ] Release completion checklist done
- [ ] Patterns align with pattern registry

## Outputs

- Release execution log
- Deployment evidence
- Post-release metrics
- **Load template:** `{project-root}/_bmad/bam/templates/rollback-plan-template.md`

## Next Step

Monitor post-release metrics and schedule release retrospective.
