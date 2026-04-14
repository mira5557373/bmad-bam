# QG-DEV1: Pre-Commit Validation Checklist

> Gate ID: QG-DEV1 (Pre-Commit Validation)
> Code MUST pass all pre-commit checks before committing.
> Gate definition: verifies code-level quality checks pass before code is committed.
> Workflow integration: this gate triggers before any commit operation.
> Verification owner: BAM

## Security Checks

- [ ] **CRITICAL:** No secrets or credentials in code
- [ ] **CRITICAL:** No API keys, tokens, or passwords committed
- [ ] No .env files with sensitive data staged

## Code Quality

- [ ] **CRITICAL:** All unit tests pass
- [ ] Linting passes (no errors)
- [ ] Type checking passes (if applicable)
- [ ] No console.log/print debug statements in production code

## Multi-Tenant Code Standards

- [ ] Tenant context properly scoped in new code
- [ ] No hardcoded tenant IDs
- [ ] No cross-tenant query patterns
- [ ] RLS/isolation patterns followed in data access code

## Documentation

- [ ] No TODO markers without ticket reference
- [ ] Public APIs have documentation comments
- [ ] Breaking changes documented

## Gate Decision

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All checks pass | Proceed with commit |
| **CONDITIONAL** | Non-critical checks fail, all CRITICAL pass | Proceed with documented plan to address |
| **FAIL** | Any CRITICAL check fails | Block commit, fix issues |
| **WAIVED** | Explicit approval from lead | Document waiver reason, proceed |

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Secrets/Credentials | CRITICAL | N/A (never conditional) | Any secret found |
| Unit Tests | CRITICAL | <5% test failures | Any critical test fails |
| Tenant Context Scoping | CRITICAL | Minor scope gaps | No tenant context |
| Cross-Tenant Query Prevention | CRITICAL | Indirect access risk | Direct cross-tenant access |
| Linting | Non-critical | >10 lint errors | N/A |
| Type Checking | Non-critical | >5 type errors | N/A |
| TODO Markers | Non-critical | >5 TODOs without tickets | N/A |
| Debug Statements | Non-critical | >3 debug statements | N/A |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Tech Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items (secrets, unit tests, tenant context) cannot be waived.

## Recovery Protocol

**If gate fails:**

1. **Attempt 1:** Immediate remediation (target: same session)
   - Review failed check output to identify specific violations
   - For secrets: Remove and rotate any exposed credentials immediately
   - For tests: Fix failing test cases or mark as skipped with ticket reference
   - For tenant isolation: Add proper tenant context scoping
   - Re-run pre-commit validation
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Extended investigation (target: 1-2 hours)
   - If immediate fix not possible, document the blocker
   - Request waiver from tech lead for non-critical items
   - Create ticket for technical debt if waiver granted
   - Never commit secrets - this is never waivable
   - Re-run validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Tech Lead and Security if secrets involved
   - Document commit blockers with impact assessment
   - Consider architectural changes if tenant isolation repeatedly fails
   - Schedule follow-up validation after fixes applied

**Locked Categories:** Categories that passed remain locked and do not require re-validation.

## Related Workflows

- `bmad-bam-change-management-process` - Entry workflow triggering this gate
- `bmad-bam-security-review` - Exit workflow after gate passes
- `bmad-bam-cicd-pipeline-design` - CI/CD integration for automated checks

## Web Research Verification

- [ ] Search the web: "pre-commit hooks best practices {date}" - Verify pre-commit patterns are current
- [ ] Search the web: "code quality gates {date}" - Confirm gate criteria align with industry standards
- [ ] Search the web: "secrets detection in code {date}" - Validate secrets scanning approach
- [ ] _Source: [URL]_ citations documented for key decisions

**PASS CRITERIA:** All CRITICAL checkboxes completed
**OWNER:** BAM
**REVIEWERS:** Tech Lead, Security
