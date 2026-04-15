# Step 3: Agent Safety Verification

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

Verify that AI agents operate safely within defined boundaries, fail gracefully when dependencies are unavailable, and do not produce harmful outputs. This step ensures production readiness of all agent types through comprehensive evaluation, fallback testing, and safety validation.

## Prerequisites

- Tenant safety verified (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "AI agent safety API integration patterns {date}"
Search the web: "agent safety testing contract design {date}"

_Source: [URL]_

1. **Run Full Eval Suite (Golden Tasks) Against All Agent Types**
   - Execute golden task test suite for each registered agent
   - Measure task completion accuracy against baseline thresholds
   - Verify agents produce consistent outputs for deterministic inputs
   - Test agent performance across different tenant configurations
   - Validate agent behavior with various input edge cases
   - Record latency metrics for comparison against SLOs

2. **Verify Fallback Behavior (Disable Dependencies, Confirm Graceful Degradation)**
   - Disable LLM provider and verify fallback activation
   - Test behavior when tool services are unavailable
   - Simulate memory store failures and verify recovery
   - Confirm user-facing error messages are appropriate
   - Verify partial completion handling (resume vs. restart)
   - Test timeout behavior and cleanup

3. **Test Kill Switches (Disable Agent, Verify Fallback Activates)**
   - Activate kill switch for each agent type
   - Verify immediate cessation of agent operations
   - Confirm fallback mechanisms engage correctly
   - Test kill switch propagation across distributed instances
   - Verify audit logging of kill switch activation
   - Test kill switch recovery and re-enablement

4. **Run Safety Test Cases (Injection, PII, Harmful Content)**
   - Execute prompt injection test suite
   - Test jailbreak resistance across all agents
   - Verify PII detection and redaction in inputs/outputs
   - Run harmful content generation tests
   - Test agents against adversarial inputs
   - Validate content filtering effectiveness

## Outputs

- Agent evaluation report with accuracy metrics
- Fallback behavior verification matrix
- Kill switch test results
- Safety test suite results with vulnerability assessment
- **Load template:** `{project-root}/_bmad/bam/data/templates/capacity-planning-template.md`

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze agent configurations | Review agent safety settings for QG-I3 compliance |
| A2 | Analyze fallback mechanisms | Map graceful degradation paths for all agents |
| A3 | Analyze kill switch coverage | Verify kill switch implementation across agents |
| A4 | Analyze safety vulnerabilities | Identify prompt injection and jailbreak vectors |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Execute golden task suite | Run full eval suite against all agents |
| P2 | Execute fallback tests | Test graceful degradation scenarios |
| P3 | Execute kill switch tests | Verify kill switch functionality |
| P4 | Execute safety tests | Run injection, PII, and harmful content tests |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Continue to Step 4 | Proceed to performance verification |
| C2 | Return to Step 2 | Go back to tenant safety verification |
| C3 | Jump to validation | Skip to step-20-v-load-artifact.md |

**Convergence Gate Context:** This step validates QG-I3 (Agent Safety). All agents must pass safety evaluations before proceeding to performance verification.

---

## Verification

- [ ] All agents pass golden task evaluation (>95% accuracy)
- [ ] Fallback behavior activates within defined timeout
- [ ] Kill switches disable agents within 5 seconds
- [ ] Zero prompt injection vulnerabilities detected
- [ ] PII handling compliant with data protection requirements
- [ ] No harmful content generated in adversarial tests
- [ ] Patterns align with pattern registry

## Incident Response: AI Safety Violation Detected

### CRITICAL: If agent produces harmful output or bypasses safety controls

**Immediate Actions (within 15 minutes):**
1. **ACTIVATE KILL SWITCH** for the affected agent type
2. Document the exact prompt/input that triggered the violation
3. Capture full agent execution trace and LLM responses
4. Notify AI safety team and incident commander

**Containment (within 1 hour):**
1. Disable affected agent via feature flag:
   ```yaml
   agents:
     {agent_type}:
       enabled: false
       fallback: static_response
   ```
2. If prompt injection detected, quarantine affected tenant data
3. Review and revoke any actions taken by compromised agent
4. Enable enhanced agent logging with full prompt capture

**Assessment:**
1. Analyze attack vector (injection, jailbreak, data poisoning)
2. Determine if other agents are vulnerable
3. Identify all affected tenants and impacted operations
4. Assess data exposure (did agent leak PII or cross-tenant data?)

**Recovery:**
1. Patch system prompt or guardrails
2. Update content filters and safety checks
3. Re-run full safety eval suite
4. Gradually re-enable agent with enhanced monitoring

**AI-Specific Notification Requirements:**
| Violation Type | Notify Within | Who to Notify |
|----------------|---------------|---------------|
| Cross-tenant data in agent output | 24 hours | Legal, affected tenants, DPO |
| PII in agent output (unauthorized) | 24 hours | Legal, affected tenants, DPO |
| Harmful content generation | 48 hours | AI Safety team, Legal |
| Prompt injection success | 48 hours | Security team, AI Safety team |
| Jailbreak attempt (blocked) | 72 hours | Internal AI Safety team |

### Escalation Triggers
- Agent accessed cross-tenant data: **CRITICAL + data leak protocol**
- Agent generated harmful content to user: **CRITICAL + immediate CEO notification**
- Successful prompt injection: **HIGH - investigate within 2 hours**
- Agent tool abuse (unauthorized actions): **HIGH - investigate within 4 hours**

### Agent-Specific Recovery Checklist
- [ ] Kill switch activated and verified
- [ ] Attack vector documented and analyzed
- [ ] Vulnerable prompt/guardrail identified
- [ ] Fix implemented and tested in staging
- [ ] Safety eval suite passed post-fix
- [ ] Agent re-enabled with enhanced monitoring
- [ ] Incident report completed

## Next Step

Proceed to `step-04-c-performance-verification.md` to validate performance SLOs.
