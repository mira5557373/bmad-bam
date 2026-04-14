# Step 3: Deployment Strategies

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

Design deployment approaches including blue-green deployments, canary releases, rolling updates, and comprehensive rollback procedures.

---

## Prerequisites

- Step 1 and 2 completed with pipeline architecture and testing stages
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: devops
- **Web research (if available):** Search for current deployment strategy best practices

---

## Inputs

- Pipeline architecture design from Step 1
- Testing stages design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Deployment requirements

---

## Actions

### 1. Define Deployment Strategies

Compare deployment approaches:

| Strategy | Risk | Rollback Speed | Resource Cost | Use Case |
|----------|------|----------------|---------------|----------|
| Blue-Green | Low | Instant | 2x | Critical services |
| Canary | Low | Fast | 1.1x | User-facing changes |
| Rolling | Medium | Medium | 1x | Stateless services |
| Recreate | High | Slow | 1x | Dev/test only |
| A/B | Low | Fast | 1.2x | Feature experiments |

### 2. Design Blue-Green Implementation

Define blue-green deployment flow:

| Phase | Blue (Current) | Green (New) | Traffic |
|-------|----------------|-------------|---------|
| 1. Deploy | Running | Deploying | 100% Blue |
| 2. Test | Running | Testing | 100% Blue |
| 3. Switch | Running | Ready | 100% Green |
| 4. Monitor | Standby | Running | 100% Green |
| 5. Cleanup | Terminated | Running | 100% Green |

### 3. Configure Canary Releases

Define canary progression:

| Stage | Traffic % | Duration | Success Criteria |
|-------|-----------|----------|------------------|
| Initial | 1% | 10 min | No errors |
| Expand 1 | 5% | 15 min | <0.1% error rate |
| Expand 2 | 25% | 30 min | <0.1% error rate |
| Expand 3 | 50% | 60 min | Latency within 10% |
| Full | 100% | - | All metrics green |

### 4. Design Rollback Procedures

Define rollback strategies:

| Trigger | Detection | Action | Recovery Time |
|---------|-----------|--------|---------------|
| Error spike | >1% error rate | Auto-rollback | <60s |
| Latency spike | p95 >2x baseline | Alert + manual | <5 min |
| Health check fail | 3 consecutive | Auto-rollback | <60s |
| Business metric | Conversion drop | Manual decision | <15 min |
| Security alert | Vulnerability found | Immediate rollback | <30s |

### 5. Configure Infrastructure as Code

Define IaC deployment:

| Component | Tool | State Management | Drift Detection |
|-----------|------|------------------|-----------------|
| Infrastructure | Terraform/Pulumi | Remote state (S3) | Scheduled |
| Kubernetes | Helm/Kustomize | GitOps (ArgoCD) | Continuous |
| Secrets | External Secrets | Vault sync | On-change |
| Networking | Terraform | Remote state | Scheduled |

**Verify current best practices with web search:**
Search the web: "blue-green canary deployment kubernetes {date}"
Search the web: "GitOps rollback strategies best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the deployment strategies analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific deployment strategies or rollback
- **P (Party Mode)**: Bring DevOps and SRE perspectives on deployment design
- **C (Continue)**: Accept deployment strategies design and proceed to tenant-aware releases
- **[Specific refinements]**: Describe deployment concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: deployment strategies, rollback, IaC
- Process enhanced insights on deployment trade-offs
- Ask user: "Accept these refined deployment strategy decisions? (y/n)"
- If yes, integrate into deployment strategies specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deployment strategies for multi-tenant AI platform"
- Process DevOps and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save deployment strategies design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-aware-releases.md`

---

## Verification

- [ ] Deployment strategies defined
- [ ] Blue-green implementation designed
- [ ] Canary release configured
- [ ] Rollback procedures documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Deployment strategy comparison
- Blue-green implementation plan
- Canary release configuration
- Rollback procedure documentation

---

## Next Step

Proceed to `step-04-c-tenant-aware-releases.md` to design tenant-aware releases.
