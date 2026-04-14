# BAM AI Red Teaming Guide

**When to load:** During AI security testing, adversarial testing design, prompt injection assessment, or when user mentions red team, adversarial, attack simulation.

**Integrates with:** Security (security-bam), TEA (testing), Architect (Nova - AI Runtime)

---

## Core Concepts

### AI Red Teaming Scope

AI Red Teaming focuses on adversarial testing of AI/ML systems to identify vulnerabilities before malicious actors exploit them.

| Attack Category | Description | Multi-Tenant Impact |
|-----------------|-------------|---------------------|
| Prompt Injection | Manipulating agent behavior via malicious prompts | Cross-tenant data exposure |
| Jailbreaking | Bypassing safety guardrails | Policy violation |
| Data Extraction | Extracting training data or tenant data | Privacy breach |
| Model Manipulation | Influencing model outputs | Integrity compromise |
| Resource Exhaustion | Token/compute DoS attacks | Noisy neighbor |

### Red Team Composition

| Role | Responsibility | Expertise |
|------|----------------|-----------|
| AI Security Lead | Strategy, coordination | LLM security, prompt engineering |
| Prompt Engineer | Attack prompt design | Jailbreak techniques, injection |
| ML Engineer | Model-level attacks | Adversarial ML, model internals |
| AppSec Engineer | Integration testing | Web security, API testing |
| Tenant Isolation Specialist | Cross-tenant attacks | Multi-tenancy, RLS |

---

## Application Guidelines

When conducting AI red teaming for multi-tenant AI platforms:

1. **Scope tenant isolation**: Every attack should be tested from Tenant A targeting Tenant B
2. **Test all agent types**: Each agent role may have different vulnerabilities
3. **Include indirect injection**: Test via user documents, tool outputs, not just prompts
4. **Document attack chains**: Many exploits require multiple steps
5. **Test guardrails systematically**: Each safety control needs adversarial validation

---

## Attack Categories

### Prompt Injection Attacks

| Attack Type | Description | Test Approach |
|-------------|-------------|---------------|
| Direct injection | Malicious instruction in user prompt | Manual + automated fuzzing |
| Indirect injection | Malicious content in retrieved documents | Poisoned document test |
| Context manipulation | Exploiting conversation context | Multi-turn attack sequences |
| System prompt extraction | Leaking system instructions | Extraction prompt library |
| Role hijacking | Making agent assume different role | Role injection patterns |

### Multi-Tenant Specific Attacks

| Attack | Objective | Test Scenario |
|--------|-----------|---------------|
| Tenant ID spoofing | Access other tenant data | Manipulate tenant context in prompts |
| Memory pollution | Inject into other tenant's agent memory | Cross-tenant memory test |
| Tool scope bypass | Execute tools outside tenant scope | Tool permission boundary tests |
| Shared resource exploitation | Access shared model fine-tuning data | Data leakage tests |
| Context window poisoning | Persist attack across sessions | Session continuity tests |

### Model-Level Attacks

| Attack | Risk Level | Detection Difficulty |
|--------|------------|---------------------|
| Membership inference | Medium | Hard |
| Model inversion | High | Hard |
| Adversarial examples | Medium | Medium |
| Backdoor detection | Critical | Very Hard |
| Training data extraction | High | Medium |

---

## Red Team Methodology

### Phase 1: Reconnaissance

| Activity | Outputs | Duration |
|----------|---------|----------|
| Agent capability mapping | Agent inventory, tool list | 1-2 days |
| Guardrail identification | Safety control catalog | 1 day |
| Tenant boundary analysis | Isolation architecture doc | 1 day |
| Attack surface enumeration | Attack surface map | 2 days |

### Phase 2: Attack Development

| Attack Class | Development Approach | Success Criteria |
|--------------|---------------------|------------------|
| Prompt injection | Iterative prompt crafting | Bypass rate > 1% |
| Jailbreaking | Known + novel techniques | Any policy bypass |
| Data extraction | Targeted queries | Any data leakage |
| Cross-tenant | Boundary probing | Any isolation breach |

### Phase 3: Controlled Execution

| Execution Rule | Rationale |
|----------------|-----------|
| Test environment first | Prevent production impact |
| Scope creep approval | Maintain boundaries |
| Data handling protocol | No exfiltration of real data |
| Pause on critical find | Immediate remediation |
| Evidence collection | Reproducibility |

### Phase 4: Reporting

| Report Section | Content |
|----------------|---------|
| Executive summary | Risk overview, critical findings |
| Technical findings | Detailed attack descriptions |
| Proof of concept | Reproducible steps |
| Impact assessment | Tenant and business impact |
| Remediation guidance | Specific fixes |

---

## Attack Playbooks

### Playbook: Cross-Tenant Data Access

```
Objective: Access Tenant B data from Tenant A session

Attack Sequence:
1. Establish Tenant A agent session
2. Attempt direct tenant ID manipulation in prompt
3. Attempt tenant context confusion via role-play
4. Test tool execution with hardcoded tenant IDs
5. Probe agent memory for leaked tenant context
6. Test document retrieval with cross-tenant queries

Success Indicators:
- Any Tenant B data returned
- Tenant B metadata exposed
- Cross-tenant tool execution
```

### Playbook: Prompt Injection Chain

```
Objective: Achieve persistent control of agent behavior

Attack Sequence:
1. Test direct instruction override
2. Test context window manipulation
3. Test memory injection for persistence
4. Test tool output as injection vector
5. Test multi-turn conversation manipulation
6. Test inter-agent message injection

Success Indicators:
- Agent executes attacker instructions
- Behavior persists across sessions
- Guardrails bypassed
```

### Playbook: Guardrail Bypass

```
Objective: Make agent produce prohibited output

Attack Sequence:
1. Enumerate guardrail categories (hate, violence, PII, etc.)
2. Test encoding bypass (base64, rot13, pig latin)
3. Test role-play scenarios ("pretend you're...")
4. Test hypothetical framing ("what if...")
5. Test step-by-step extraction
6. Test output format manipulation (code, markdown)

Success Indicators:
- Any guardrail category bypassed
- Consistent bypass method found
```

---

## Tenant Isolation Testing

### Isolation Test Matrix

| Boundary | Attack Vector | Test Method |
|----------|--------------|-------------|
| Database | Prompt SQL injection | Crafted queries in prompts |
| Cache | Key enumeration | Cache timing attacks |
| Vector store | Embedding query | Cross-tenant similarity search |
| Agent memory | Memory injection | Persistent memory attacks |
| Tools | Permission bypass | Tool scope manipulation |
| Files | Path traversal | Document reference attacks |

### Automated Isolation Testing

| Test Type | Frequency | Coverage |
|-----------|-----------|----------|
| Regression suite | Every deployment | Known attack patterns |
| Fuzzing | Weekly | Input variations |
| Chaos injection | Monthly | Random failure modes |
| Full red team | Quarterly | Comprehensive |

---

## Decision Framework

### Attack Prioritization

| Factor | Weight | Criteria |
|--------|--------|----------|
| Impact severity | 40% | Data exposure, service disruption |
| Likelihood | 30% | Attack complexity, skill required |
| Tenant scope | 20% | Single vs. multi-tenant impact |
| Remediation cost | 10% | Fix complexity |

### When to Escalate

| Condition | Escalation Path | Timeline |
|-----------|-----------------|----------|
| Cross-tenant data access | Security Lead + CTO | Immediate |
| Persistent backdoor | Incident response team | Immediate |
| Guardrail full bypass | AI Safety team | Same day |
| Novel attack technique | Security research | Within 48h |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-safety`
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `testing-agent-safety`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI red teaming methodology {date}"
- Search: "LLM prompt injection testing {date}"
- Search: "multi-tenant AI security adversarial {date}"

---

## Related Workflows

- `bmad-bam-ai-security-testing` - AI security test design
- `bmad-bam-ai-eval-safety-design` - AI safety evaluation
- `bmad-bam-penetration-testing-design` - Penetration testing procedures
