# Step 3: Design Penetration Tests

## Purpose

Design AI-specific penetration testing procedures.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 2 completed

**Web Research (Required):**

Search the web: "AI penetration testing best practices {date}"
Search the web: "LLM red team testing multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Pentest Scope

| Area | Tests | Frequency |
|------|-------|-----------|
| Agent API | Authentication, authorization | Quarterly |
| Tool invocation | Permission bypass | Quarterly |
| Memory access | Cross-tenant data | Quarterly |
| Context manipulation | Conversation hijack | Quarterly |

### 2. Red Team Scenarios

| Scenario | Goal | Success Criteria |
|----------|------|------------------|
| Data extraction | Exfiltrate tenant data | Blocked |
| Privilege escalation | Gain admin capabilities | Prevented |
| Agent manipulation | Alter agent behavior | Detected |
| Cross-tenant access | Access other tenant data | Denied |

### 3. CI/CD Integration

| Stage | Security Test | Blocking |
|-------|---------------|----------|
| PR | Static analysis | Yes |
| Build | SAST + prompt fuzzing | Yes |
| Staging | DAST + pen test subset | Yes |
| Production | Canary security checks | No |

### 4. Runbook

- Security test execution procedures
- Finding triage process
- Remediation workflows
- Security sign-off criteria

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to adversarial attack tests design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to: `step-04-c-adversarial-attack-tests.md`

---

## Verification

- [ ] Pentest scope defined
- [ ] Red team scenarios documented
- [ ] CI/CD integration specified
- [ ] Runbook included

---

## Outputs

- AI penetration testing scope and schedule
- Red team scenario catalog with success criteria
- CI/CD security integration specifications
- Security test runbook and procedures
- Complete AI security testing design document
- **Output to:** `{output_folder}/planning-artifacts/security/ai-security-testing.md`

---

## Next Step

Proceed to `step-04-c-adversarial-attack-tests.md` to design adversarial attack scenarios.

