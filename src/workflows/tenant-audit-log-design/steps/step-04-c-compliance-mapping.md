# Step 4: Compliance Mapping

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

Map the audit log design to specific compliance framework requirements, ensuring complete coverage and identifying any gaps requiring remediation.

---

## Prerequisites

- Step 3 completed: Query patterns with access controls
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-i2-tenant-safety.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Compliance frameworks: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. SOC 2 Control Mapping

Map audit design to SOC 2 Trust Services Criteria:

| Control ID | Control Description | Audit Coverage | Evidence Source |
|------------|---------------------|----------------|-----------------|
| CC6.1 | Logical access controls | Authentication events | `event_type = 'authentication'` |
| CC6.2 | User registration/authorization | Authorization events | `event_type = 'authorization'` |
| CC6.3 | Access removal | Deprovisioning events | `event_action = 'user_deactivated'` |
| CC7.1 | Configuration management | Administrative events | `event_type = 'administrative'` |
| CC7.2 | Change detection | Data modification events | `event_type = 'data_modification'` |
| CC7.3 | Security incident handling | Security events | `event_type = 'security'` |
| CC8.1 | Change management | System changes | `resource_type = 'system_config'` |

### 2. GDPR Article Mapping

Map audit design to GDPR requirements:

| Article | Requirement | Audit Support | Implementation |
|---------|-------------|---------------|----------------|
| Art. 5(2) | Accountability | Complete audit trail | All events logged |
| Art. 17 | Right to erasure | Erasure audit | `event_action = 'data_deleted'` |
| Art. 20 | Data portability | Export audit | `event_action = 'data_exported'` |
| Art. 30 | Records of processing | Processing activity log | Data access events |
| Art. 32 | Security of processing | Security controls audit | All security events |
| Art. 33 | Breach notification | Breach detection | Security event alerts |
| Art. 35 | DPIA | Impact assessment trail | Administrative events |

### 3. HIPAA Safeguard Mapping

Map audit design to HIPAA requirements:

| Safeguard | Requirement | Audit Coverage | Implementation |
|-----------|-------------|----------------|----------------|
| 164.312(b) | Audit controls | PHI access logging | `resource_type = 'phi'` events |
| 164.312(c) | Integrity controls | Modification tracking | `old_value`, `new_value` capture |
| 164.312(d) | Authentication | Identity verification | Authentication events |
| 164.308(a)(1) | Risk analysis | Security event analysis | Risk level tracking |
| 164.308(a)(5) | Security awareness | Training audit | Administrative events |
| 164.308(a)(6) | Incident procedures | Incident response | Security event workflow |

### 4. PCI DSS Requirement Mapping

Map audit design to PCI DSS requirements:

| Requirement | Description | Audit Coverage | Evidence |
|-------------|-------------|----------------|----------|
| 10.1 | Audit trail linking | Request correlation | `request_id` tracking |
| 10.2.1 | User access to CHD | Cardholder data access | `resource_type = 'payment'` |
| 10.2.2 | Root/admin actions | Privileged access | `actor_type = 'admin'` |
| 10.2.3 | Access to audit trails | Audit access logging | Meta-audit logging |
| 10.2.4 | Invalid access attempts | Failed access | `outcome = 'failure'` |
| 10.2.5 | Identification changes | Identity changes | Authorization events |
| 10.2.6 | Audit log operations | Log management | Administrative events |
| 10.3 | Required fields | Complete event record | Schema compliance |
| 10.5 | Secure audit trails | Immutability | Hash chain, WORM |
| 10.7 | Retention policy | 1 year minimum | Retention automation |

### 5. Gap Analysis

Identify and document compliance gaps:

| Framework | Requirement | Current Status | Gap | Remediation |
|-----------|-------------|----------------|-----|-------------|
| SOC 2 | CC6.1 | Covered | None | - |
| SOC 2 | CC7.3 | Partial | Alert integration | Implement SIEM alerts |
| GDPR | Art. 17 | Covered | None | - |
| HIPAA | 164.312(b) | Covered | None | - |
| PCI DSS | 10.5 | Partial | WORM storage | Implement WORM tier |

### 6. Evidence Collection Automation

Design automated evidence collection:

| Evidence Type | Source | Collection Frequency | Format |
|---------------|--------|---------------------|--------|
| Access control reports | Authentication logs | Daily | PDF |
| Change management | Administrative logs | Weekly | CSV |
| Security incident log | Security events | Real-time | SIEM |
| Data access report | Data events | Monthly | PDF |
| User activity summary | All events | On-demand | JSON |
| Compliance dashboard | Aggregated metrics | Real-time | Dashboard |

**Report Generation Schedule:**

| Report | Frequency | Recipients | Retention |
|--------|-----------|------------|-----------|
| Daily security summary | Daily | Security team | 90 days |
| Weekly access review | Weekly | Tenant admins | 1 year |
| Monthly compliance report | Monthly | Compliance officer | 7 years |
| Quarterly audit package | Quarterly | External auditors | 7 years |
| Annual SOC 2 evidence | Annually | Auditors | 7 years |

**Verify current best practices with web search:**
Search the web: "SOC 2 audit log requirements {date}"
Search the web: "GDPR audit trail compliance {date}"
Search the web: "compliance evidence automation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the compliance mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific compliance requirements
- **P (Party Mode)**: Bring compliance auditor and legal perspectives
- **C (Continue)**: Finalize audit log design and generate artifacts
- **[Specific refinements]**: Describe compliance concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: compliance mappings, gap analysis, evidence automation
- Process enhanced insights on compliance completeness
- Ask user: "Accept these refined compliance mappings? (y/n)"
- If yes, integrate into compliance design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit log compliance mapping for multi-tenant AI platform"
- Process compliance auditor and legal counsel perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate final audit log design documents
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Save all outputs to `{output_folder}/planning-artifacts/compliance/`
- Present completion summary

---

## Final Gate Checkpoint

**Steps 1-4 complete the tenant audit log design.**

Present final summary of:
- Audit schema with tenant isolation strategy
- Retention policies meeting all regulatory requirements
- Query patterns with access controls
- Compliance framework mappings with gap remediation

Confirm QG-I2 checklist items for audit isolation are satisfied.

---

## Verification

- [ ] SOC 2 controls mapped
- [ ] GDPR articles mapped
- [ ] HIPAA safeguards mapped
- [ ] PCI DSS requirements mapped
- [ ] Gap analysis completed
- [ ] Evidence automation designed
- [ ] QG-I2 audit items verified
- [ ] Patterns align with pattern registry

---

## Outputs

- SOC 2 control mapping
- GDPR article mapping
- HIPAA safeguard mapping
- PCI DSS requirement mapping
- Gap analysis with remediation plan
- Evidence collection automation design
- **Output to:** `{output_folder}/planning-artifacts/compliance/audit-log-design.md`
- **Output to:** `{output_folder}/planning-artifacts/compliance/audit-schema.md`
- **Output to:** `{output_folder}/planning-artifacts/compliance/retention-policy.md`

---

## Next Step

Create workflow complete. Tenant audit log design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

The tenant audit log design workflow is complete. The following artifacts have been generated:
- `audit-log-design.md` - Complete audit architecture
- `audit-schema.md` - Schema definitions with tenant isolation
- `retention-policy.md` - Retention policies and lifecycle

**Related Next Steps:**
- Run `bmad-bam-soc2-evidence-collection` to automate evidence gathering
- Run `bmad-bam-security-review` to validate audit security
