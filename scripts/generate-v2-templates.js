#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const TEMPLATES = [
  { name: 'master-architecture', title: 'Master Architecture', desc: 'Foundation architecture document with tenant model and module boundaries' },
  { name: 'module-architecture', title: 'Module Architecture', desc: 'Individual module design document' },
  { name: 'tenant-isolation', title: 'Tenant Isolation', desc: 'Tenant isolation implementation design' },
  { name: 'agent-runtime', title: 'Agent Runtime', desc: 'AI agent runtime architecture design' },
  { name: 'facade-contract', title: 'Facade Contract', desc: 'Module facade interface contract' },
  { name: 'convergence-report', title: 'Convergence Report', desc: 'Module integration convergence report' },
  { name: 'production-readiness', title: 'Production Readiness', desc: 'Production readiness assessment' },
  { name: 'requirements-analysis', title: 'Requirements Analysis', desc: 'Project requirements analysis document' },
  { name: 'module-epic', title: 'Module Epic', desc: 'Module-level epic definition' },
  { name: 'cross-module-story', title: 'Cross-Module Story', desc: 'Cross-module user story template' },
  { name: 'tenant-onboarding', title: 'Tenant Onboarding', desc: 'Tenant onboarding workflow design' },
  { name: 'tenant-offboarding', title: 'Tenant Offboarding', desc: 'Tenant offboarding workflow design' },
  { name: 'observability-design', title: 'Observability Design', desc: 'Tenant-aware observability architecture' },
  { name: 'scaling-design', title: 'Scaling Design', desc: 'Multi-tenant scaling patterns design' },
  { name: 'event-architecture', title: 'Event Architecture', desc: 'Event-driven architecture design' },
  { name: 'api-version', title: 'API Version', desc: 'API versioning strategy document' },
  { name: 'agent-debug-report', title: 'Agent Debug Report', desc: 'AI agent debugging report' },
  { name: 'agent-trace', title: 'Agent Trace', desc: 'Agent execution trace document' },
  { name: 'tool-contract', title: 'Tool Contract', desc: 'Agent tool interface contract' },
  { name: 'memory-tier', title: 'Memory Tier', desc: 'Agent memory tier design' },
  { name: 'llm-version', title: 'LLM Version', desc: 'LLM versioning strategy document' },
  { name: 'caching-strategy', title: 'Caching Strategy', desc: 'Multi-tenant caching strategy design' },
  { name: 'security-architecture', title: 'Security Architecture', desc: 'Security architecture document' },
  { name: 'compliance-mapping', title: 'Compliance Mapping', desc: 'Compliance requirements mapping' },
  { name: 'data-residency', title: 'Data Residency', desc: 'Data residency requirements document' },
  { name: 'white-label-config', title: 'White Label Config', desc: 'White-label configuration document' },
  { name: 'billing-design', title: 'Billing Design', desc: 'Billing and metering system design' },
  { name: 'testing-strategy', title: 'Testing Strategy', desc: 'Testing strategy document' },
  { name: 'research-findings', title: 'Research Findings', desc: 'Research findings document' },
  { name: 'validation-report', title: 'Validation Report', desc: 'Quality gate validation report' },
  { name: 'gate-checklist', title: 'Gate Checklist', desc: 'Quality gate checklist template' },
  { name: 'decision-log', title: 'Decision Log', desc: 'Architecture decision log' },
  { name: 'migration-plan', title: 'Migration Plan', desc: 'Data migration plan' },
  { name: 'rollback-plan', title: 'Rollback Plan', desc: 'Deployment rollback plan' },
  { name: 'runbook', title: 'Runbook', desc: 'Operations runbook template' },
  { name: 'incident-response', title: 'Incident Response', desc: 'Incident response playbook' },
  { name: 'capacity-plan', title: 'Capacity Plan', desc: 'Capacity planning document' },
  { name: 'cost-model', title: 'Cost Model', desc: 'Multi-tenant cost model' },
  { name: 'sla-definition', title: 'SLA Definition', desc: 'Service level agreement definition' },
  { name: 'integration-test-plan', title: 'Integration Test Plan', desc: 'Integration testing plan' }
];

const DIR = path.join(__dirname, '..', 'src-v2', 'data', 'templates');
fs.mkdirSync(DIR, { recursive: true });

function generateTemplate(t) {
  return `# ${t.title}

**Project:** {{project_name}}
**Date:** {{date}}
**Version:** 1.0.0
**Author:** {{author}}

---

## Overview

${t.desc}

---

## Summary

[High-level summary of this document]

---

## Details

### Section 1

[Content]

### Section 2

[Content]

### Section 3

[Content]

---

## Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| | | |

---

## References

- [Related documents]

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial version |
`;
}

for (const t of TEMPLATES) {
  fs.writeFileSync(path.join(DIR, t.name + '.md'), generateTemplate(t));
}

console.log('Generated ' + TEMPLATES.length + ' templates in ' + DIR);
