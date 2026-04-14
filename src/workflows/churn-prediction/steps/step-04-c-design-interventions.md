# Step 4: Design Intervention Strategies

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design intervention strategies and retention playbooks.

---

## Prerequisites

- Step 3 completed (Scoring defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Intervention Triggers

| Risk Level | Trigger | Owner | SLA |
|------------|---------|-------|-----|
| Moderate | Score enters 41-60 | CSM | 48 hours |
| High | Score enters 61-80 | CSM + Manager | 24 hours |
| Critical | Score > 80 | Executive + CSM | 4 hours |
| Rapid Decline | -20 pts in 7 days | CSM | 12 hours |

### 2. Intervention Playbooks

| Risk Driver | Playbook | Key Actions |
|-------------|----------|-------------|
| Engagement | Re-activation | Training, success call, feature showcase |
| Usage | Value Realization | Use case workshop, ROI review |
| Financial | Save | Discount offer, payment plan, downgrade |
| Support | Relationship | Executive sponsor, dedicated support |

### 3. Automated Interventions

| Trigger | Automation | Escalation |
|---------|------------|------------|
| Login gap 7 days | Re-engagement email | CSM if no response |
| Feature underuse | In-app guidance | CSM task |
| Payment fail | Dunning sequence | CSM + Finance |
| NPS < 6 | Survey follow-up | CSM priority |

### 4. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Save Rate | >40% of at-risk | Churned vs saved |
| Intervention Speed | <SLA 90% | Time to first touch |
| Score Recovery | +15 pts avg | Post-intervention delta |
| False Positive Rate | <20% | Manual review sample |

**Verify current best practices with web search:**
Search the web: "churn intervention strategies SaaS {date}"
Search the web: "customer retention playbooks {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into playbook details
- **P (Party Mode)**: Bring CS and product perspectives
- **C (Continue)**: Accept interventions and complete Create mode
```

#### If 'C' (Continue):
- Save complete churn prediction design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Output to: `{output_folder}/planning-artifacts/analytics/churn-prediction-design.md`
- Create mode complete

---

## Verification

- [ ] Triggers defined with SLAs
- [ ] Playbooks documented
- [ ] Automation configured
- [ ] Success metrics established
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete churn prediction design document
- Intervention playbooks
- Automation rules
- Success metrics

---

## Next Step

Create mode complete. Based on outcome:
- **Success**: Proceed to implementation
- **Refinement needed**: Use Edit mode
- **Validation required**: Use Validate mode
