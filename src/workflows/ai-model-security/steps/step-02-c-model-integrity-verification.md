# Step 2: Model Integrity Verification

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

Design model integrity verification controls to detect tampering and ensure model authenticity.

## Prerequisites

- Model provenance tracking designed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety, model-versioning
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: encryption-key-management

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design model integrity verification controls:

## Cryptographic Hash Verification

**Model Weight Hashing:**
- SHA-256/SHA-3 hash generation for model files
- Incremental hashing for large models
- Hash manifest for multi-file models
- Hash comparison on model load

**Signed Artifacts:**
- Model signing with PKI infrastructure
- Signature verification workflow
- Certificate management (rotation, revocation)
- Multi-signature requirements for production models

## Tampering Detection

**Static Analysis:**
- Model structure validation
- Layer count and architecture verification
- Parameter count anomaly detection
- Unexpected embedded code detection

**Runtime Monitoring:**
- Output drift detection vs baseline
- Inference pattern anomaly detection
- Performance degradation alerts
- Unexpected capability changes

## Model Extraction Prevention

**Detection Mechanisms:**
- Rate limiting on API probes
- Query pattern analysis
- Embedding extraction monitoring
- Logprob access restrictions

**Response Controls:**
- Confidence score masking options
- Response watermarking
- Membership inference attack mitigation
- Model fingerprinting detection

Output: Integrity verification controls with detection and response procedures.

**Verify current best practices with web search:**
Search the web: "AI model integrity verification techniques {date}"
Search the web: "model tampering detection ML security {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the integrity verification design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into integrity verification mechanisms and thresholds
- **P (Party Mode)**: Bring Security Researcher, ML Engineer, and Incident Responder perspectives
- **C (Continue)**: Accept integrity verification and proceed to Step 3: Access Control Design
- **Refine controls**: Describe specific integrity concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: hash verification, tampering detection, extraction prevention
- Process enhanced insights
- Ask user: "Accept these refined integrity controls? (y/n)"
- If yes, integrate into integrity document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review model integrity verification design for tampering detection"
- Process Security Researcher, ML Engineer, Incident Responder perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save integrity verification to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-access-control-design.md`

---

## Verification

- [ ] Cryptographic hash verification defined
- [ ] Model signing workflow specified
- [ ] Tampering detection mechanisms documented
- [ ] Model extraction prevention controls established
- [ ] Runtime monitoring planned
- [ ] Patterns align with pattern registry

## Outputs

- Integrity verification controls document
- Detection and response procedures
- **Load template:** `{project-root}/_bmad/bam/templates/integrity-verification-template.md`

## Next Step

Proceed to `step-03-c-access-control-design.md` to design model access controls.
