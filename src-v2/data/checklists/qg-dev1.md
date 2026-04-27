---
name: qg-dev1-pre-commit
description: Pre-commit validation gate - verifies code quality, security scanning, and tenant context validation
module: bam
tags: [pre-commit, quality-gate, multi-tenant, development, validation]
version: 2.0.0
---

# QG-DEV1: Pre-Commit Validation Gate Checklist

> **Gate ID:** QG-DEV1 (Pre-Commit Validation)
> **Definition:** Code MUST pass all pre-commit checks before committing.
> **Scope:** Covers security checks, code quality, multi-tenant standards, and documentation.
> **Recovery:** Gate failure requires fixing issues before commit proceeds.

**Workflow:** bmad-bam-change-management-process, bmad-bam-cicd-pipeline-design
**Prerequisites:** None - this gate triggers on every commit attempt

---

## Purpose

The Pre-Commit Validation Gate (QG-DEV1) ensures code quality at the development stage. This gate verifies:

1. **Security checks** prevent secrets and credentials from being committed
2. **Code quality** meets linting, type checking, and test requirements
3. **Multi-tenant standards** ensure proper tenant context scoping
4. **Documentation** maintains code maintainability

Passing QG-DEV1 prevents common issues from entering the codebase.

---

## Security Checks

### Secret Detection

- [ ] **CRITICAL:** No secrets or credentials in code (detected by secret scanner)
- [ ] **CRITICAL:** No API keys, tokens, or passwords committed
- [ ] **CRITICAL:** No .env files with sensitive data staged
- [ ] AWS credentials not hardcoded
- [ ] Database connection strings use environment variables
- [ ] LLM API keys not in source code

### Dependency Security

- [ ] No known vulnerable dependencies (npm audit, pip audit)
- [ ] Lock files up to date
- [ ] No deprecated packages with security issues

---

## Code Quality

### Test Requirements

- [ ] **CRITICAL:** All unit tests pass
- [ ] **CRITICAL:** Test coverage meets threshold (minimum 70%)
- [ ] New code has corresponding unit tests
- [ ] Integration tests pass (if modified)

### Static Analysis

- [ ] **CRITICAL:** Linting passes (no errors)
- [ ] Linting warnings below threshold (<10)
- [ ] No console.log/print debug statements in production code
- [ ] No commented-out code blocks

### Type Checking

- [ ] Type checking passes (if applicable: TypeScript, Python typing)
- [ ] No any/unknown type overuse
- [ ] Public API types documented

### Code Style

- [ ] Formatting consistent (prettier, black, etc.)
- [ ] Import ordering correct
- [ ] No unused imports or variables

---

## Multi-Tenant Code Standards

### Tenant Context Validation

- [ ] **CRITICAL:** Tenant context properly scoped in new code
- [ ] **CRITICAL:** No hardcoded tenant IDs
- [ ] **CRITICAL:** No cross-tenant query patterns in data access code
- [ ] TenantContext passed through service boundaries
- [ ] Tenant ID included in log statements

### Data Access Patterns

- [ ] **CRITICAL:** RLS/isolation patterns followed in data access code
- [ ] **CRITICAL:** No direct SQL without tenant filtering
- [ ] Repository methods receive TenantContext
- [ ] Cache keys include tenant ID
- [ ] File paths include tenant isolation

### AI/Agent Context

- [ ] **CRITICAL:** Agent operations scoped to tenant
- [ ] Memory access includes tenant isolation
- [ ] Tool invocations include tenant context
- [ ] LLM calls include tenant-specific rate limiting context

---

## Documentation

### Code Documentation

- [ ] Public APIs have documentation comments (JSDoc, docstrings)
- [ ] Complex logic has inline comments
- [ ] Breaking changes documented

### Task Tracking

- [ ] No TODO markers without ticket reference
- [ ] TODO count below threshold (<5 per file)
- [ ] FIXMEs addressed or tracked

### Changelog Updates

- [ ] CHANGELOG updated for user-facing changes
- [ ] Migration notes for breaking changes

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass - proceed with commit |
| **CONDITIONAL** | CRITICAL items pass, non-critical fail - proceed with documented plan |
| **FAIL** | Any CRITICAL item fails - block commit until fixed |
| **WAIVED** | Explicit approval from tech lead with documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Secret Detection | CRITICAL | N/A (never conditional) | Any secret found |
| .env Files | CRITICAL | N/A (never conditional) | Sensitive .env staged |
| Dependency Security | Non-critical | Medium vulnerabilities | High/Critical vulnerabilities |
| Unit Tests | CRITICAL | <5% test failures | Any critical test fails |
| Test Coverage | Non-critical | Coverage <70% | N/A |
| Linting Errors | CRITICAL | N/A | Any lint error |
| Linting Warnings | Non-critical | >10 warnings | N/A |
| Type Checking | Non-critical | >5 type errors | N/A |
| Tenant Context Scoping | CRITICAL | Minor scope gaps | No tenant context |
| Cross-Tenant Prevention | CRITICAL | Indirect access risk | Direct cross-tenant access |
| RLS Patterns | CRITICAL | Minor gaps | RLS bypassed |
| Agent Tenant Scoping | CRITICAL | Partial scoping | No tenant scope |
| API Documentation | Non-critical | Missing docs | N/A |
| TODO Markers | Non-critical | >5 TODOs without tickets | N/A |
| Debug Statements | Non-critical | >3 debug statements | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed immediately:
1. Document the specific item and reason for waiver
2. Identify business justification (e.g., hotfix urgency)
3. Obtain stakeholder sign-off (Tech Lead)
4. Record waiver with expiration date
5. Create follow-up ticket for remediation within 48 hours

**Note:** CRITICAL items (secrets, unit tests, tenant context) CANNOT be waived.

---

## Recovery Protocol

**If QG-DEV1 fails:**

1. **Attempt 1:** Immediate remediation (target: same session)
   - Review failed check output to identify specific violations
   - **For secrets:** Remove immediately and rotate any exposed credentials
   - **For tests:** Fix failing test cases or mark as skipped with ticket reference
   - **For tenant isolation:** Add proper tenant context scoping
   - **For linting:** Fix errors shown in output
   - Re-run pre-commit validation
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Extended investigation (target: 1-2 hours)
   - If immediate fix not possible, document the blocker
   - Request waiver from tech lead for non-critical items only
   - Create ticket for technical debt if waiver granted
   - **Never commit secrets** - this is never waivable
   - Re-run validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Tech Lead and Security if secrets involved
   - Document commit blockers with impact assessment
   - Consider architectural changes if tenant isolation repeatedly fails
   - Schedule pair programming session if pattern unclear
   - Update pre-commit hooks if false positives identified

---

## Pre-Commit Hook Configuration

### Recommended Tools

| Language | Secret Scanner | Linter | Type Checker | Test Runner |
|----------|---------------|--------|--------------|-------------|
| TypeScript | git-secrets, trufflehog | ESLint | tsc | Jest |
| Python | detect-secrets | ruff, flake8 | mypy | pytest |
| Go | git-secrets | golangci-lint | built-in | go test |

### Hook Setup

```yaml
# Example .pre-commit-config.yaml structure
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    hooks:
      - id: detect-private-key
      - id: check-added-large-files
  - repo: local
    hooks:
      - id: tenant-context-check
        name: Verify tenant context in data access
        entry: scripts/check-tenant-context.sh
        language: script
```

---

## Web Research Verification

- [ ] Search the web: "pre-commit hooks best practices {date}" - Verify pre-commit patterns
- [ ] Search the web: "secrets detection in code {date}" - Validate secrets scanning approach
- [ ] Search the web: "multi-tenant code review patterns {date}" - Confirm tenant isolation checks
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Related Patterns

Load decision criteria from pattern registry:

- **Development patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `development-*`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `security-*`

---

## Related Workflows

- `bmad-bam-change-management-process` - Entry workflow triggering this gate
- `bmad-bam-security-review` - Exit workflow after gate passes
- `bmad-bam-cicd-pipeline-design` - CI/CD integration for automated checks
- `bmad-bam-tenant-context-design` - Tenant context implementation

**PASS CRITERIA:** All CRITICAL checkboxes pass, code ready to commit
**OWNER:** Developer (individual contributor)
**REVIEWERS:** Tech Lead, Security (for secrets-related failures)

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | V2 BMAD format with full sections |
| 1.0.0 | - | Platform Architect | Initial V1 checklist |
