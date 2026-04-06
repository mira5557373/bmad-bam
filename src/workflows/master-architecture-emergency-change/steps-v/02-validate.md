# Step 2: Validate Emergency Change

## Validation Checklist

### Emergency Documentation
- [ ] Severity level assigned and justified
- [ ] Emergency type classified
- [ ] Problem statement clear and specific
- [ ] Root cause documented
- [ ] Urgency justification provided
- [ ] Evidence collected and attached

### Impact Assessment
- [ ] All affected architecture components listed
- [ ] Module impact matrix complete
- [ ] Dependency analysis performed
- [ ] Technical and business risks documented
- [ ] Risk mitigation strategies defined
- [ ] Minimal change scope identified

### Approval
- [ ] All required approvers identified
- [ ] Approval package complete
- [ ] Approval status documented
- [ ] Any conditions recorded
- [ ] Post-emergency review committed

### Implementation
- [ ] Pre-implementation checklist complete
- [ ] Architecture document updated with emergency notation
- [ ] Technical debt item created
- [ ] Validation steps completed
- [ ] Implementation log maintained

### Dependent Updates
- [ ] All dependent artifacts identified
- [ ] Dependent artifacts updated
- [ ] Teams notified
- [ ] Post-emergency review scheduled
- [ ] Lessons learned documented

### Process Compliance
- [ ] Emergency change ID assigned
- [ ] All phases documented
- [ ] Audit trail complete
- [ ] No approval bypass
- [ ] Rollback plan verified

## Gate Decision

- **PASS**: Full documentation, valid approval, complete implementation, dependents updated
- **CONDITIONAL**: Minor documentation gaps acceptable during active emergency
- **FAIL**: Missing approval, incomplete impact assessment, or no rollback plan

**CRITICAL FAILURE CONDITIONS:**
- Approval bypass - escalate immediately
- Undocumented architecture changes - halt and remediate
- No post-emergency review scheduled - require scheduling

Present validation results with specific findings for each phase.
