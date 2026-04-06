# Step 2: Validate Tool Contract Validation

## Validation Checklist

### Tool Definition Loaded
- [ ] Tool definition was successfully located
- [ ] All required fields present in definition
- [ ] Tool category correctly identified
- [ ] Module owner identified

### Schema Validation
- [ ] JSON Schema validation was performed
- [ ] Input parameter schema validated
- [ ] Output schema validated
- [ ] Description quality assessed
- [ ] Idempotency correctly declared

### Permission Validation
- [ ] Required permissions declared
- [ ] Permission levels appropriate for operations
- [ ] Approval requirements checked
- [ ] Role mapping verified
- [ ] Sandbox configuration reviewed

### Tenant Context Validation
- [ ] Tenant context requirement verified
- [ ] Tenant isolation checked
- [ ] RLS integration confirmed
- [ ] Tenant-scoped logging verified
- [ ] Resource quotas respected

### Contract Tests
- [ ] Schema compliance tests executed
- [ ] Permission tests executed
- [ ] Tenant isolation tests executed
- [ ] Integration tests executed
- [ ] Test results documented

### Report Quality
- [ ] All validation areas have results
- [ ] Failures have specific details
- [ ] Recommendations are actionable
- [ ] Overall status reflects test results

### Cross-Cutting
- [ ] Validation is current (tool definition not changed since)
- [ ] All critical issues have recommendations
- [ ] No security gaps in permission model
- [ ] Tenant isolation is comprehensive

## Gate Decision

- **PASS**: All validation areas covered, no critical failures, recommendations documented
- **CONDITIONAL**: Minor gaps in validation coverage - note gaps
- **FAIL**: Critical validation areas missing, security issues unaddressed, or tenant isolation failures - return to Create mode

Present validation results with specific findings for each category.
