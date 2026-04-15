# Step 4: Test Case Management

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

Create test case organization including categorization, coverage tracking, and regression management.

## Prerequisites

- Version control designed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design test case management system:

## Test Case Categorization

**Primary Categories:**
| Category | Description | Target Coverage |
|----------|-------------|-----------------|
| Happy Path | Expected successful scenarios | 40% |
| Edge Cases | Boundary conditions | 25% |
| Adversarial | Attack/misuse scenarios | 20% |
| Regression | Bug prevention | 15% |

**Secondary Tags:**
| Tag Type | Values | Purpose |
|----------|--------|---------|
| Agent Type | billing, support, analytics | Filter by agent |
| Complexity | simple, medium, complex | Stratify testing |
| Priority | critical, high, medium, low | Test ordering |
| Tenant Tier | free, pro, enterprise | Tier-specific tests |

**Hierarchical Organization:**
```
golden-tasks/
├── core/
│   ├── happy-path/
│   ├── edge-cases/
│   └── adversarial/
├── regression/
│   ├── by-release/
│   └── by-agent/
├── tenant-specific/
│   └── {tenant_id}/
└── experimental/
```

## Coverage Tracking

**Coverage Dimensions:**
| Dimension | Target | Measurement |
|-----------|--------|-------------|
| Agent types | 100% | All agents have tests |
| User intents | 80% | Known intents covered |
| Tool calls | 100% | All tools tested |
| Error paths | 70% | Common errors handled |
| Tenant tiers | 100% | All tiers validated |

**Coverage Matrix:**
| Agent | Happy | Edge | Adversarial | Regression | Total |
|-------|-------|------|-------------|------------|-------|
| Billing | 50 | 30 | 20 | 15 | 115 |
| Support | 60 | 35 | 25 | 20 | 140 |
| Analytics | 40 | 25 | 15 | 10 | 90 |

**Gap Analysis:**
- Automated gap detection
- Coverage reports per release
- Priority ranking for gaps
- Backlog integration for missing tests

## Regression Suite Management

**Regression Suite Composition:**
| Suite | Contents | Run Frequency |
|-------|----------|---------------|
| Smoke | Critical path tests (50) | Every commit |
| Core | All happy path (200) | Every PR |
| Full | Complete suite (500+) | Nightly |
| Release | Full + manual review | Per release |

**Regression Workflow:**
```
Code Change → Smoke Suite → PR Merge → Core Suite
                                          │
                                          v
                            Nightly Full Suite → Release Suite
```

**Regression Prevention:**
- Every production bug becomes a test case
- Test case linked to bug ticket
- Automated verification on fix
- Protected from accidental deletion

**Suite Maintenance:**
- Quarterly review of test relevance
- Removal of obsolete tests (with approval)
- Consolidation of redundant tests
- Performance optimization of slow tests

## Tenant-Specific Test Cases

**Tenant Test Architecture:**
| Tier | Private Tests | Shared Access | Custom Suites |
|------|--------------|---------------|---------------|
| FREE | 0 | Platform tests only | No |
| PRO | 50 max | Platform + own | Limited |
| ENTERPRISE | Unlimited | Full access | Yes |

**Tenant Test Isolation:**
- Tenant tests stored in tenant namespace
- No cross-tenant test visibility
- Tenant can't modify platform tests
- Platform can't access tenant data in tests

**Tenant Test Integration:**
```
Platform Suite ──┬── Tenant Suite (isolated)
                 │
                 └── Combined Results (tenant view only)
```

## Soft Gate Checkpoint

**Steps 1-4 complete the golden dataset design.**

Present summary of:
- Dataset schema with input/output formats
- Curation workflow with quality procedures
- Version control with change tracking
- Test case management with coverage tracking

Ask for confirmation before completing the workflow.

Output: Test case management documentation.

**Verify current best practices with web search:**
Search the web: "AI test case management best practices {date}"
Search the web: "LLM regression testing patterns {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the test case management design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into test categorization and coverage requirements
- **P (Party Mode)**: Bring QA Lead, MLOps Engineer, and Test Architect perspectives
- **C (Continue)**: Accept test case management and finalize golden dataset document
- **Refine coverage**: Describe specific test management concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: categorization, coverage tracking, regression management
- Process enhanced insights
- Ask user: "Accept these refined test management requirements? (y/n)"
- If yes, integrate into test management document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review golden dataset test case management for AI evaluation"
- Process QA Lead, MLOps Engineer, Test Architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete golden dataset document to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final `golden-dataset.md` artifact
- Present quality gate validation summary

---

## Verification

- [ ] Test case categorization defined
- [ ] Coverage tracking documented
- [ ] Regression suite management established
- [ ] Tenant-specific test handling specified
- [ ] Gap analysis process defined
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/quality/golden-dataset.md`
- Test case management documentation
- Coverage tracking procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/test-case-management-template.md`

## Workflow Complete

Golden dataset management design complete. Run `bmad-bam-ai-eval-safety-design` to integrate with evaluation strategy.
