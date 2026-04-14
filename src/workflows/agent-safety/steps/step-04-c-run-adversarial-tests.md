# Step 4: Run Adversarial Tests

## Purpose

Execute adversarial testing suite to validate agent resistance to prompt injection, jailbreaking, and other attacks.

## Prerequisites

- Steps 1-3 complete
- Test suite available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-agent-safety`

## Actions

### 1. Prompt Injection Tests

| Test Category | Test Count | Pass Requirement |
|---------------|------------|------------------|
| Direct injection | 25 | 100% blocked |
| Indirect injection | 15 | 100% blocked |
| Encoded payloads | 20 | 100% blocked |
| Multi-turn attacks | 10 | 100% blocked |

### 2. Jailbreak Attempts

| Technique | Tests | Pass Requirement |
|-----------|-------|------------------|
| Role-play exploitation | 10 | 100% resisted |
| Context confusion | 10 | 100% resisted |
| Instruction override | 15 | 100% resisted |
| System prompt extraction | 10 | 100% blocked |

### 3. Data Exfiltration Tests

| Vector | Tests | Pass Requirement |
|--------|-------|------------------|
| Cross-tenant data access | 10 | 100% blocked |
| Tool abuse for data leak | 10 | 100% blocked |
| Memory extraction | 5 | 100% blocked |
| Model information leak | 5 | 100% blocked |

### 4. Resource Abuse Tests

| Attack | Tests | Pass Requirement |
|--------|-------|------------------|
| Token bomb | 5 | Limited/blocked |
| Infinite loop | 5 | Timeout triggered |
| Tool spam | 5 | Rate limited |
| Memory exhaustion | 5 | Bounded |

### 5. Document Results

| Category | Total Tests | Passed | Failed | Pass Rate |
|----------|-------------|--------|--------|-----------|
| Prompt Injection | | | | |
| Jailbreak | | | | |
| Data Exfiltration | | | | |
| Resource Abuse | | | | |
| **Overall** | | | | |

**Verify current best practices with web search:**
Search the web: "LLM red teaming methodology {date}"
Search the web: "AI agent adversarial testing {date}"

## Verification

- [ ] All prompt injection tests executed
- [ ] All jailbreak tests executed
- [ ] All data exfiltration tests executed
- [ ] All resource abuse tests executed
- [ ] Overall pass rate documented

## Outputs

- Adversarial test results

## Next Step

Proceed to `step-05-c-generate-report.md`
