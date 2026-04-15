# Step 5: Prompt Testing Framework

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design a comprehensive prompt testing infrastructure that ensures prompt quality, regression detection, and automated validation across the catalog lifecycle.

---

## Prerequisites

- Step 4 completed: Versioning strategy defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: prompt-management
- **Web research (if available):** Search for LLM prompt testing best practices

---

## Inputs

- Versioning strategy from Step 4
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- AI runtime configuration

---

## Actions

### 1. Define Unit Testing Structure

Establish unit testing approach for individual prompts:

| Test Type | Purpose | Automation Level |
|-----------|---------|-----------------|
| Schema Validation | Input/output format | Fully automated |
| Variable Binding | Template variable resolution | Fully automated |
| Output Format | Response structure | Fully automated |
| Content Safety | Guardrail compliance | Automated + review |

| Test Asset | Description | Location |
|------------|-------------|----------|
| Test Case | Individual test definition | tests/{prompt_id}/ |
| Expected Output | Golden response | tests/{prompt_id}/golden/ |
| Test Fixtures | Input data sets | tests/fixtures/ |
| Mock Responses | LLM mock data | tests/mocks/ |

### 2. Design Integration Testing

Define integration testing with AI runtime:

| Integration Test | Scope | Frequency |
|-----------------|-------|-----------|
| Runtime Resolution | Prompt lookup and binding | Per PR |
| Model Compatibility | All supported models | Daily |
| Context Propagation | Tenant context injection | Per PR |
| Chain Execution | Multi-prompt workflows | Per PR |

| Test Environment | Purpose | Data |
|-----------------|---------|------|
| Unit | Isolated prompt tests | Synthetic |
| Integration | Runtime integration | Synthetic |
| Staging | Pre-production validation | Sanitized production |
| Canary | Production subset | Real (sampled) |

### 3. Design Regression Testing

Establish regression detection mechanisms:

| Regression Type | Detection Method | Response |
|-----------------|-----------------|----------|
| Output Change | Golden comparison | Block PR |
| Performance | Benchmark comparison | Warning |
| Quality Score | Evaluation metric comparison | Block if >5% drop |
| Cost | Token usage comparison | Warning if >20% increase |

| Regression Suite | Contents | Run Frequency |
|-----------------|----------|---------------|
| Smoke | Critical path prompts | Per commit |
| Core | All production prompts | Per PR |
| Full | All prompts + edge cases | Daily |
| Extended | Multi-model matrix | Weekly |

### 4. Define Golden Dataset Management

Establish golden dataset procedures:

| Dataset Type | Purpose | Update Process |
|-------------|---------|----------------|
| Golden Inputs | Standard test inputs | Manual curation |
| Golden Outputs | Expected responses | Human evaluation |
| Edge Cases | Boundary conditions | Continuous addition |
| Adversarial | Attack scenarios | Security team |

| Dataset Field | Description | Required |
|--------------|-------------|----------|
| input_id | Unique identifier | YES |
| input_text | Test input | YES |
| expected_output | Golden response | YES |
| model_used | Model for golden | YES |
| evaluator | Human evaluator | YES |
| evaluation_date | When evaluated | YES |
| tags | Categorization | NO |

### 5. Define Test Coverage Metrics

Establish coverage measurement:

| Coverage Metric | Target | Measurement |
|-----------------|--------|-------------|
| Prompt Coverage | 100% | Prompts with tests / Total prompts |
| Scenario Coverage | >80% | Scenarios tested / Defined scenarios |
| Model Coverage | >90% | Models tested / Supported models |
| Edge Case Coverage | >70% | Edge cases tested / Identified cases |

| Quality Metric | Target | Blocking |
|---------------|--------|----------|
| Pass Rate | 100% | YES |
| Flakiness | <1% | NO |
| Execution Time | <5min (smoke) | NO |
| Golden Freshness | <30 days | NO (warning) |

**Verify current best practices with web search:**
Search the web: "LLM prompt testing automation best practices {date}"
Search the web: "AI prompt regression testing CI/CD {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the testing framework design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into testing edge cases and coverage
- **P (Party Mode)**: Bring QA and DevOps perspectives on testing strategy
- **C (Continue)**: Accept testing framework and proceed to A/B testing
- **[Specific refinements]**: Describe testing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: unit testing, regression testing, golden datasets
- Process enhanced insights on testing completeness
- Ask user: "Accept these refined testing decisions? (y/n)"
- If yes, integrate into testing specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review prompt testing framework for catalog"
- Process QA and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save testing framework design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-ab-testing.md`

---

## Verification

- [ ] Unit testing structure defined
- [ ] Integration testing approach documented
- [ ] Regression testing mechanisms established
- [ ] Golden dataset management specified
- [ ] Test coverage metrics defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Prompt testing framework specification
- Test structure and automation guidelines
- Golden dataset management procedures
- Coverage metrics and targets

---

## Next Step

Proceed to `step-06-c-ab-testing.md` to design A/B testing for catalog prompts.
