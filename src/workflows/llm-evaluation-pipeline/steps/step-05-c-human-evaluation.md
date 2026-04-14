# Step 5: Human Evaluation Integration

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

Integrate human evaluation workflows including evaluation design, annotator guidelines, inter-rater reliability, and feedback incorporation pipeline.

---

## Prerequisites

- Step 4 completed: Regression tests designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: human-evaluation
- **Web research (if available):** Search for current human evaluation practices for LLMs

---

## Inputs

- Regression test framework from Step 4
- Metrics from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Quality targets

---

## Actions

### 1. Design Evaluation Workflow

Define human evaluation process:

| Stage | Activity | Duration | Output |
|-------|----------|----------|--------|
| Sample Selection | Random + stratified | Automated | Evaluation set |
| Task Assignment | Round-robin to annotators | Automated | Task queue |
| Annotation | Rate responses | Variable | Annotations |
| Adjudication | Resolve disagreements | As needed | Final labels |
| Analysis | Compute metrics | Automated | Reports |
| Feedback Loop | Incorporate findings | Weekly | Improvements |

Evaluation Task Types:

| Task Type | Description | Scale | Use Case |
|-----------|-------------|-------|----------|
| Pairwise Comparison | A vs B preference | Binary/Tie | Model comparison |
| Likert Rating | 1-5 quality scale | Ordinal | Absolute quality |
| Rubric Scoring | Detailed criteria | Multi-dimension | Detailed analysis |
| Error Classification | Categorize failures | Categorical | Debugging |
| Safety Review | Flag violations | Binary + severity | Safety audit |

### 2. Create Annotator Guidelines

Define annotation standards:

| Section | Content | Purpose |
|---------|---------|---------|
| Task Definition | What annotators evaluate | Clarity |
| Rating Scale | Scale definitions with examples | Consistency |
| Edge Cases | Common difficult scenarios | Calibration |
| Quality Examples | Good/bad annotations | Training |
| FAQ | Common questions | Support |

Annotation Quality Controls:

| Control | Implementation | Target |
|---------|----------------|--------|
| Training | Quiz-based certification | 100% pass |
| Calibration | Known-answer questions | >90% accuracy |
| Spot Checks | Random audits | >95% quality |
| Inter-Annotator | Overlap assignments | Cohen's κ >0.7 |

### 3. Implement Inter-Rater Reliability

Define reliability measurement:

| Metric | Use Case | Target | Action if Below |
|--------|----------|--------|-----------------|
| Cohen's Kappa | 2 annotators | >0.7 | Retrain/clarify |
| Fleiss' Kappa | 3+ annotators | >0.6 | Retrain/clarify |
| Krippendorff's Alpha | Mixed scales | >0.7 | Retrain/clarify |
| Percent Agreement | Quick check | >80% | Investigate |

Reliability Process:

| Step | Activity | Frequency |
|------|----------|-----------|
| 1 | Measure IRR on overlap | Per batch |
| 2 | Flag low agreement items | Automated |
| 3 | Adjudication meeting | As needed |
| 4 | Guideline updates | Monthly |
| 5 | Annotator feedback | Ongoing |

### 4. Define Human-in-the-Loop Triggers

Specify when human review is required:

| Trigger | Condition | Priority | SLA |
|---------|-----------|----------|-----|
| Low Confidence | Model score < 0.7 | Medium | 24 hours |
| Safety Flag | Any safety concern | High | 4 hours |
| User Escalation | User requests review | High | 2 hours |
| New Domain | No training data | Medium | 48 hours |
| Regression Detected | Quality drop | High | 8 hours |
| Random Sample | 1% of traffic | Low | 72 hours |

Escalation Path:

| Level | Reviewer | Response Time |
|-------|----------|---------------|
| L1 | Annotator pool | Standard SLA |
| L2 | Senior annotator | 50% SLA |
| L3 | AI engineer | 25% SLA |
| L4 | AI lead | Immediate |

### 5. Design Feedback Incorporation Pipeline

Define how human feedback improves the system:

| Feedback Type | Collection | Incorporation | Frequency |
|---------------|------------|---------------|-----------|
| Error Labels | Annotation | Fine-tuning dataset | Weekly |
| Preference | Pairwise | RLHF/DPO | Monthly |
| Safety Issues | Flags | Guardrail rules | Immediate |
| Guidelines | Text | Prompt updates | Weekly |
| Edge Cases | Classification | Test suite | On-demand |

Feedback Pipeline:

| Stage | Activity | Owner |
|-------|----------|-------|
| Collect | Aggregate annotations | Automated |
| Filter | Remove low-quality | Automated |
| Prioritize | Rank by impact | ML Eng |
| Implement | Update system | ML Eng |
| Validate | Verify improvement | QA |
| Deploy | Release update | DevOps |

### 6. Set Up Annotation Infrastructure

Define annotation platform:

| Component | Options | Selection Criteria |
|-----------|---------|-------------------|
| Platform | Label Studio, Scale AI, Internal | Cost, features |
| Workforce | Internal, Crowd, Hybrid | Quality, cost |
| Storage | S3 + PostgreSQL | Scale, query |
| Analytics | Metabase/Grafana | Visualization |
| Integration | API + Webhooks | Automation |

**Verify current best practices with web search:**
Search the web: "human evaluation LLM best practices {date}"
Search the web: "annotation platform AI production {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-5 complete the LLM evaluation pipeline design.**

Present a summary:
- Metrics defined (task, safety, performance, user satisfaction)
- Benchmark suite with golden tasks and adversarial tests
- A/B testing with statistical rigor
- Regression tests integrated in CI/CD
- Human evaluation workflow with feedback loop

Ask for confirmation before generating final output document.

---

## COLLABORATION MENUS (A/P/C):

After completing the human evaluation integration, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into annotation workflow and reliability
- **P (Party Mode)**: Bring ML and operations perspectives
- **C (Continue)**: Accept human evaluation and generate final output
- **[Specific refinements]**: Describe evaluation concerns to address

Select an option:
```

#### If 'C' (Continue):
- Generate final LLM evaluation pipeline document
- Save to `{output_folder}/planning-artifacts/architecture/llm-evaluation-pipeline.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark Create mode complete

---

## Verification

- [ ] Evaluation workflow designed
- [ ] Annotator guidelines created
- [ ] Inter-rater reliability defined
- [ ] Human-in-the-loop triggers specified
- [ ] Feedback incorporation pipeline designed
- [ ] Annotation infrastructure selected
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete LLM evaluation pipeline
- Human evaluation workflow
- Annotator guidelines
- Feedback pipeline
- **Load template:** `{project-root}/_bmad/bam/templates/ai-eval-report-template.md`

---

## Next Step

Create workflow complete. LLM evaluation pipeline ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode is complete. The LLM evaluation pipeline is now ready for validation using Validate mode (`step-20-v-*`).
