#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const WORKFLOWS = [
  { name: 'bmad-bam-requirements', display: 'Requirements', desc: 'Ingest and analyze project requirements' },
  { name: 'bmad-bam-triage', display: 'Triage', desc: 'Triage module complexity and dependencies' },
  { name: 'bmad-bam-module-architecture', display: 'Module Architecture', desc: 'Design individual module architecture', gate: 'QG-M1' },
  { name: 'bmad-bam-tenant-isolation', display: 'Tenant Isolation', desc: 'Design tenant isolation implementation', gate: 'QG-M2' },
  { name: 'bmad-bam-agent-runtime', display: 'Agent Runtime', desc: 'Design AI agent runtime architecture', gate: 'QG-M3' },
  { name: 'bmad-bam-module-epics', display: 'Module Epics', desc: 'Create module epics and stories' },
  { name: 'bmad-bam-facade-contract', display: 'Facade Contract', desc: 'Define module facade contracts', gate: 'QG-I1' },
  { name: 'bmad-bam-convergence', display: 'Convergence', desc: 'Verify module convergence and integration', gate: 'QG-I2' },
  { name: 'bmad-bam-api-versioning', display: 'API Versioning', desc: 'Design API versioning strategy' },
  { name: 'bmad-bam-cross-module-story', display: 'Cross-Module Story', desc: 'Create cross-module user stories' },
  { name: 'bmad-bam-tenant-onboarding', display: 'Tenant Onboarding', desc: 'Design tenant onboarding workflow' },
  { name: 'bmad-bam-tenant-offboarding', display: 'Tenant Offboarding', desc: 'Design tenant offboarding workflow' },
  { name: 'bmad-bam-observability', display: 'Observability', desc: 'Design tenant-aware observability' },
  { name: 'bmad-bam-scaling', display: 'Scaling', desc: 'Design multi-tenant scaling patterns' },
  { name: 'bmad-bam-events', display: 'Events', desc: 'Design event-driven architecture' },
  { name: 'bmad-bam-production-readiness', display: 'Production Readiness', desc: 'Validate production readiness', gate: 'QG-P1' },
  { name: 'bmad-bam-agent-debug', display: 'Agent Debug', desc: 'Debug AI agent issues' },
  { name: 'bmad-bam-agent-tracing', display: 'Agent Tracing', desc: 'Implement agent execution tracing' },
  { name: 'bmad-bam-tool-contracts', display: 'Tool Contracts', desc: 'Define agent tool contracts' },
  { name: 'bmad-bam-memory-tiers', display: 'Memory Tiers', desc: 'Design agent memory tier system' },
  { name: 'bmad-bam-llm-versioning', display: 'LLM Versioning', desc: 'Design LLM versioning strategy' },
  { name: 'bmad-bam-caching', display: 'Caching', desc: 'Design multi-tenant caching strategy' },
  { name: 'bmad-bam-security', display: 'Security', desc: 'Design security architecture' },
  { name: 'bmad-bam-compliance', display: 'Compliance', desc: 'Map compliance requirements' },
  { name: 'bmad-bam-data-residency', display: 'Data Residency', desc: 'Design data residency patterns' },
  { name: 'bmad-bam-white-labeling', display: 'White Labeling', desc: 'Design white-label architecture' },
  { name: 'bmad-bam-billing', display: 'Billing', desc: 'Design billing and metering system' },
  { name: 'bmad-bam-testing', display: 'Testing', desc: 'Design testing strategy' },
  { name: 'bmad-bam-research', display: 'Research', desc: 'Research best practices and patterns' },
];

const SKILLS_DIR = path.join(__dirname, '..', 'src-v2', 'skills');

function generateManifest(wf) {
  return `type: workflow
name: ${wf.name}
displayName: ${wf.display}
description: '${wf.desc}'
module: bam
step_naming_convention: "step-NN-mode-description"
`;
}

function generateSkillMd(wf) {
  return `---
name: ${wf.name}
description: '${wf.desc}'
module: bam
tags: [${wf.gate ? 'quality-gate, ' : ''}workflow]
---

# ${wf.display}

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |
${wf.gate ? `\n## Quality Gate\n\n**Gate:** ${wf.gate}\n` : ''}`;
}

function generateWorkflowMd(wf) {
  return `# ${wf.display}

## Mode Selection

| Mode | Steps |
|------|-------|
| Create | step-01-c-* through step-05-c-* |
| Edit | step-10-e-* through step-11-e-* |
| Validate | step-20-v-* through step-22-v-* |

Default: Create mode unless artifact exists.
`;
}

function generateCustomizeToml(wf) {
  return `[workflow]
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

on_complete = """
${wf.display} workflow complete.
"""
`;
}

function generateStep(stepName, title, content) {
  return `# ${title}

## Purpose

${content.purpose}

## Prerequisites

${content.prereqs}

## Actions

${content.actions}

## Verification

${content.verification}

## Next Step

${content.next}
`;
}

const STEP_TEMPLATES = {
  'step-01-c-start': {
    purpose: 'Initialize workflow and gather requirements.',
    prereqs: '- Required context loaded',
    actions: '### 1. Load Context\n\nRead relevant domain and pattern files.\n\n### 2. Gather Requirements\n\nCollect input from user.',
    verification: '- [ ] Context loaded\n- [ ] Requirements gathered',
    next: 'Proceed to `step-02-c-analyze.md`'
  },
  'step-02-c-analyze': {
    purpose: 'Analyze requirements and identify patterns.',
    prereqs: '- Step 01 complete',
    actions: '### 1. Analyze Input\n\nReview gathered requirements.\n\n### 2. Identify Patterns\n\nMatch to known patterns.',
    verification: '- [ ] Analysis complete\n- [ ] Patterns identified',
    next: 'Proceed to `step-03-c-design.md`'
  },
  'step-03-c-design': {
    purpose: 'Design the solution based on analysis.',
    prereqs: '- Step 02 complete',
    actions: '### 1. Apply Patterns\n\nApply identified patterns.\n\n### 2. Design Solution\n\nCreate design decisions.',
    verification: '- [ ] Design complete\n- [ ] Decisions documented',
    next: 'Proceed to `step-04-c-document.md`'
  },
  'step-04-c-document': {
    purpose: 'Document the design decisions.',
    prereqs: '- Step 03 complete',
    actions: '### 1. Load Template\n\nUse appropriate template.\n\n### 2. Fill Sections\n\nComplete all sections.',
    verification: '- [ ] Template filled\n- [ ] All sections complete',
    next: 'Proceed to `step-05-c-complete.md`'
  },
  'step-05-c-complete': {
    purpose: 'Complete workflow and generate artifact.',
    prereqs: '- Step 04 complete',
    actions: '### 1. Generate Artifact\n\nOutput to planning-artifacts.\n\n### 2. Verify Output\n\nCheck artifact completeness.',
    verification: '- [ ] Artifact generated\n- [ ] Output verified',
    next: 'Workflow complete. Run validation if quality gate required.'
  },
  'step-10-e-load': {
    purpose: 'Load existing artifact for editing.',
    prereqs: '- Existing artifact exists',
    actions: '### 1. Load Document\n\nRead existing artifact.\n\n### 2. Parse Content\n\nUnderstand current state.',
    verification: '- [ ] Document loaded\n- [ ] Content parsed',
    next: 'Proceed to `step-11-e-apply.md`'
  },
  'step-11-e-apply': {
    purpose: 'Apply requested changes.',
    prereqs: '- Step 10 complete',
    actions: '### 1. Apply Changes\n\nModify as requested.\n\n### 2. Verify Consistency\n\nEnsure changes are valid.',
    verification: '- [ ] Changes applied\n- [ ] Consistency verified',
    next: 'Edit complete. Run validation to verify changes.'
  },
  'step-20-v-load': {
    purpose: 'Load artifact and checklist for validation.',
    prereqs: '- Artifact exists',
    actions: '### 1. Load Artifact\n\nRead artifact to validate.\n\n### 2. Load Checklist\n\nRead validation criteria.',
    verification: '- [ ] Artifact loaded\n- [ ] Checklist loaded',
    next: 'Proceed to `step-21-v-validate.md`'
  },
  'step-21-v-validate': {
    purpose: 'Validate artifact against criteria.',
    prereqs: '- Step 20 complete',
    actions: '### 1. Check Requirements\n\nVerify all requirements met.\n\n### 2. Check Completeness\n\nEnsure no gaps.',
    verification: '- [ ] All checks performed\n- [ ] Results documented',
    next: 'Proceed to `step-22-v-report.md`'
  },
  'step-22-v-report': {
    purpose: 'Generate validation report.',
    prereqs: '- Step 21 complete',
    actions: '### 1. Compile Results\n\nSummarize validation results.\n\n### 2. Determine Outcome\n\nPASS, CONDITIONAL, or FAIL.',
    verification: '- [ ] Results compiled\n- [ ] Outcome determined',
    next: 'Validation complete. See report for next steps.'
  }
};

for (const wf of WORKFLOWS) {
  const dir = path.join(SKILLS_DIR, wf.name);
  const stepsDir = path.join(dir, 'steps');

  fs.mkdirSync(stepsDir, { recursive: true });

  // manifest
  fs.writeFileSync(path.join(dir, 'bmad-skill-manifest.yaml'), generateManifest(wf));

  // SKILL.md
  fs.writeFileSync(path.join(dir, 'SKILL.md'), generateSkillMd(wf));

  // workflow.md
  fs.writeFileSync(path.join(dir, 'workflow.md'), generateWorkflowMd(wf));

  // customize.toml
  fs.writeFileSync(path.join(dir, 'customize.toml'), generateCustomizeToml(wf));

  // steps
  for (const [stepFile, content] of Object.entries(STEP_TEMPLATES)) {
    const title = stepFile.replace('step-', 'Step ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    fs.writeFileSync(
      path.join(stepsDir, stepFile + '.md'),
      generateStep(stepFile, title, content)
    );
  }
}

console.log('Generated ' + WORKFLOWS.length + ' workflows in ' + SKILLS_DIR);
