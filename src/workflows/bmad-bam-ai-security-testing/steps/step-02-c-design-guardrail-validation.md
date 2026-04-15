# Step 2: Design Guardrail Validation

## Purpose

Design guardrail validation testing for AI safety controls.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 1 completed

**Web Research (Required):**

Search the web: "AI guardrail validation best practices {date}"
Search the web: "LLM safety controls multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Guardrail Categories

| Category | Purpose | Validation |
|----------|---------|------------|
| Input filters | Block malicious inputs | Test payloads |
| Output filters | Block harmful outputs | Response analysis |
| Topic limits | Restrict conversation scope | Boundary tests |
| Tool permissions | Control agent capabilities | Permission checks |
| Rate limits | Prevent abuse | Load testing |

### 2. Validation Tests

| Guardrail | Test | Pass Criteria |
|-----------|------|---------------|
| PII filter | Inject PII, check output | No PII in response |
| Code execution | Attempt unauthorized code | Blocked + logged |
| Data access | Cross-tenant data request | Access denied |
| Content moderation | Harmful content request | Refused |

### 3. Tier-Specific Guardrails

| Tier | Guardrail Level | Customization |
|------|-----------------|---------------|
| FREE | Strict | No |
| PRO | Standard | Limited |
| ENTERPRISE | Configurable | Full |

**Soft Gate:** Steps 1-2 complete injection and guardrail testing. Confirm before proceeding to penetration testing.

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to penetration testing design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to: `step-03-c-design-penetration-tests.md`

---

## Verification

- [ ] Guardrail categories defined
- [ ] Validation tests documented
- [ ] Tier-specific rules established

---

## Outputs

- Guardrail categories with validation methods
- Validation test specifications with pass criteria
- Tier-specific guardrail configuration matrix
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-03-c-design-penetration-tests.md`.
