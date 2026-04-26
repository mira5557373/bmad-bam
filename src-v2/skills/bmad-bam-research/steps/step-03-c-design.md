# Step 3: Evaluate Integration Fit

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

Evaluate how well candidate technologies integrate with the existing architecture, including architecture compatibility, security implications, operational complexity, and team skill alignment.

---

## Prerequisites

- Technology evaluation completed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: integration
- **Load patterns:** `{project-root}/_bmad/bam/data/section-pattern-map.csv`

---

## Inputs

- Candidate ranking from Step 2
- Master architecture document
- Current technology stack
- Team skill inventory
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Architecture Compatibility Assessment

Evaluate fit with existing architecture:

#### 1.1 Modular Monolith Compatibility

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Module isolation support | Yes/No/Partial | | |
| Facade pattern compatible | Yes/No | | |
| Event-driven support | Native/Adapter/None | | |
| Shared kernel friendly | Yes/No | | |
| Future extraction ready | Yes/No | | |

#### 1.2 Stack Compatibility

| Layer | Current Stack | Option A | Option B | Option C |
|-------|---------------|----------|----------|----------|
| Language/Runtime | {current} | Compatible/Adapter/Incompatible | | |
| Framework | {current} | | | |
| Database | {current} | | | |
| Cache | {current} | | | |
| Queue | {current} | | | |
| API Layer | {current} | | | |

#### 1.3 Integration Patterns

| Pattern | Option A | Option B | Option C |
|---------|----------|----------|----------|
| REST API | Native/Adapter | | |
| GraphQL | Native/Adapter | | |
| gRPC | Native/Adapter | | |
| Event streaming | Native/Adapter | | |
| Batch processing | Native/Adapter | | |

### 2. Security Implications Assessment

Evaluate security posture:

#### 2.1 Authentication/Authorization

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| SSO integration | Native/Adapter | | |
| RBAC support | Native/Custom | | |
| Tenant isolation | Built-in/Custom | | |
| API key management | Yes/No | | |
| OAuth2/OIDC | Native/Adapter | | |

#### 2.2 Data Protection

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Encryption at rest | Native/Manual | | |
| Encryption in transit | TLS/mTLS | | |
| Key management | Integrated/External | | |
| Data masking | Native/Custom | | |
| Audit logging | Native/Custom | | |

#### 2.3 Compliance Considerations

| Compliance | Option A | Option B | Option C |
|------------|----------|----------|----------|
| SOC 2 certified | Yes/No/Pending | | |
| HIPAA compliant | Yes/No/N/A | | |
| GDPR features | Native/Custom | | |
| PCI DSS ready | Yes/No/N/A | | |
| Data residency | Configurable/Fixed | | |

### 3. Operational Complexity Evaluation

Assess operational burden:

#### 3.1 Deployment

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Container support | Native/Adapter | | |
| Kubernetes ready | Yes/Partial/No | | |
| CI/CD integration | Easy/Moderate/Hard | | |
| Blue-green deploy | Native/Custom | | |
| Rollback support | Native/Manual | | |

#### 3.2 Observability

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Metrics (Prometheus) | Native/Adapter | | |
| Logging (structured) | Native/Adapter | | |
| Tracing (OpenTelemetry) | Native/Adapter | | |
| Health checks | Native/Custom | | |
| Alerting integration | Native/Adapter | | |

#### 3.3 Maintenance

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Upgrade path | Clear/Complex | | |
| Breaking changes | Rare/Frequent | | |
| Backup/Restore | Native/Custom | | |
| Disaster recovery | Built-in/Manual | | |
| SLA availability | {percent} | | |

#### 3.4 Operational Complexity Score

| Factor | Weight | Option A | Option B | Option C |
|--------|--------|----------|----------|----------|
| Deployment ease | 25% | /5 | /5 | /5 |
| Observability | 25% | /5 | /5 | /5 |
| Maintenance burden | 25% | /5 | /5 | /5 |
| Support quality | 25% | /5 | /5 | /5 |
| **Total** | 100% | {score} | {score} | {score} |

### 4. Team Skill Alignment

Assess team readiness:

#### 4.1 Current Skills Inventory

| Skill Area | Team Proficiency | Required for Option A | Required for Option B | Required for Option C |
|------------|------------------|----------------------|----------------------|----------------------|
| {Skill 1} | High/Medium/Low | Essential/Helpful/N/A | | |
| {Skill 2} | High/Medium/Low | | | |
| {Skill 3} | High/Medium/Low | | | |

#### 4.2 Learning Investment

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Learning curve | Weeks to proficiency | | |
| Training available | Yes/Limited/No | | |
| Documentation quality | Excellent/Good/Poor | | |
| Community resources | Rich/Moderate/Sparse | | |
| Hiring difficulty | Easy/Moderate/Hard | | |

#### 4.3 Risk Assessment

| Risk | Option A | Option B | Option C |
|------|----------|----------|----------|
| Knowledge silos | High/Medium/Low | | |
| Bus factor | {number} | | |
| Vendor dependency | High/Medium/Low | | |
| Obsolescence risk | High/Medium/Low | | |

### 5. Integration Fit Summary

Compile integration fit scores:

| Dimension | Weight | Option A | Option B | Option C |
|-----------|--------|----------|----------|----------|
| Architecture compatibility | 30% | /5 | /5 | /5 |
| Security posture | 25% | /5 | /5 | /5 |
| Operational complexity | 25% | /5 | /5 | /5 |
| Team alignment | 20% | /5 | /5 | /5 |
| **Integration Fit Score** | 100% | {score} | {score} | {score} |

**Verify current best practices with web search:**
Search the web: "{technology} integration patterns enterprise {date}"
Search the web: "{technology} security best practices {date}"
Search the web: "{technology} operational complexity production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the integration fit evaluation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific integration concerns
- **P (Party Mode)**: Bring security and devops perspectives on integration risks
- **C (Continue)**: Accept integration fit analysis and proceed to document recommendations
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: architecture compatibility, security assessment, operational complexity, team alignment
- Process enhanced insights on integration challenges
- Ask user: "Accept these enhanced integration findings? (y/n)"
- If yes, integrate into fit analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review integration fit for {technology choices}: {summary of compatibility and risks}"
- Process collaborative analysis from security and devops personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save integration fit analysis to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Architecture compatibility assessed
- [ ] Security implications evaluated
- [ ] Operational complexity scored
- [ ] Team skill alignment analyzed
- [ ] Integration fit scores calculated
- [ ] Risks identified and documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Architecture compatibility matrix
- Security implications assessment
- Operational complexity evaluation
- Team skill alignment analysis
- Integration fit scores

---

## Next Step

Proceed to `step-04-c-document.md` to document recommendations.
