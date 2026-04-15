# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Load the Tenant Network Isolation Design artifact for validation.

---

## Prerequisites

- Network isolation design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: security`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/planning-artifacts/infrastructure/tenant-network-isolation-design.md`
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Expected Artifact Structure

The tenant-network-isolation-design.md should contain:
- VPC Architecture with tier-specific configurations
- Security Group Design with layer-based rules
- VPC Peering with Transit Gateway configuration
- Traffic Isolation with NACLs and flow logs

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure
- **P (Party Mode)**: Bring security perspectives for initial review
- **C (Continue)**: Proceed to detailed validation checks
```

#### If 'C' (Continue):
- Confirm document loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format

---

## Outputs

- Validation context prepared
- Document structure parsed

---

## Next Step

Proceed to Step 21: Validate to perform detailed quality criteria checks.
