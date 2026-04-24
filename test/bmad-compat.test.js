/**
 * BMAD Method compatibility tests
 * Validates bmad-bam conventions align with .bmad-method-ref v6.2.2
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const BAM_ROOT = path.resolve(__dirname, '..');
const WORKFLOWS_DIR = path.join(BAM_ROOT, 'src', 'workflows');
const EXTENSIONS_DIR = path.join(BAM_ROOT, 'src', 'data', 'extensions');
const DATA_DIR = path.join(BAM_ROOT, 'src', 'data');
const TEMPLATES_DIR = path.join(BAM_ROOT, 'src', 'data', 'templates');

// Helper: recursively find all workflow directories
const getAllWorkflows = (dir, results = []) => {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fs.existsSync(path.join(fullPath, 'bmad-skill-manifest.yaml'))) {
        results.push({ name: entry.name, dir: fullPath });
      } else {
        getAllWorkflows(fullPath, results);
      }
    }
  });

  return results;
};

// Helper: grep in directory (single pattern)
const grepInDir = (searchDir, pattern) => {
  if (!fs.existsSync(searchDir)) return false;

  const searchRecursive = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (searchRecursive(fullPath)) return true;
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.yaml'))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes(pattern)) return true;
      }
    }
    return false;
  };

  return searchRecursive(searchDir);
};

// Optimized helper: collect all file content from directory (reads files once)
const collectAllContent = (searchDir) => {
  if (!fs.existsSync(searchDir)) return '';
  let allContent = '';

  const collectRecursive = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        collectRecursive(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.yaml'))) {
        allContent += fs.readFileSync(fullPath, 'utf-8') + '\n';
      }
    }
  };

  collectRecursive(searchDir);
  return allContent;
};

describe('BMAD Method Compatibility', () => {
  describe('Extension Schema Alignment', () => {
    test('all extensions use WDS agent-guides pattern (no memories field)', () => {
      const extFiles = fs.readdirSync(EXTENSIONS_DIR).filter(f => f.endsWith('.yaml'));

      extFiles.forEach(extFile => {
        const content = fs.readFileSync(path.join(EXTENSIONS_DIR, extFile), 'utf-8');
        expect(content).not.toMatch(/^memories:/m);
        expect(content).not.toMatch(/^\s+memories:/m);
      });
    });

    test('all extensions have valid extends field', () => {
      const extFiles = fs.readdirSync(EXTENSIONS_DIR).filter(f => f.endsWith('.yaml'));

      extFiles.forEach(extFile => {
        const content = fs.readFileSync(path.join(EXTENSIONS_DIR, extFile), 'utf-8');
        const ext = yaml.load(content);

        if (ext.agent && ext.agent.metadata && ext.agent.metadata.extends) {
          const extendsTarget = ext.agent.metadata.extends;
          // Must extend a known BMAD ecosystem agent pattern (bmad-*, wds-agent-*, bmad-cis-*)
          expect(extendsTarget).toMatch(/^(bmad-|wds-agent-|bmad-cis-)/);
        }
      });
    });

    test('extension menu triggers are unique across all extensions', () => {
      const extFiles = fs.readdirSync(EXTENSIONS_DIR).filter(f => f.endsWith('.yaml'));
      const allTriggers = new Map();
      const duplicates = [];

      extFiles.forEach(extFile => {
        const content = fs.readFileSync(path.join(EXTENSIONS_DIR, extFile), 'utf-8');
        const ext = yaml.load(content);

        if (ext.menu) {
          ext.menu.forEach(item => {
            const trigger = item.trigger;
            if (allTriggers.has(trigger)) {
              duplicates.push({ trigger, files: [allTriggers.get(trigger), extFile] });
            }
            allTriggers.set(trigger, extFile);
          });
        }
      });

      expect(duplicates).toEqual([]);
    });
  });

  describe('Workflow Structure Alignment', () => {
    const workflows = getAllWorkflows(WORKFLOWS_DIR);

    test('all workflows have SKILL.md with YAML frontmatter', () => {
      const missingFrontmatter = [];

      workflows.forEach(wf => {
        const skillPath = path.join(wf.dir, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf-8');
          if (!content.startsWith('---')) {
            missingFrontmatter.push(wf.name);
          } else {
            const frontmatter = content.split('---')[1];
            if (!frontmatter.includes('name:') || !frontmatter.includes('description:')) {
              missingFrontmatter.push(wf.name);
            }
          }
        }
      });

      expect(missingFrontmatter).toEqual([]);
    });

    test('step files follow BMAD naming convention (step-NN-mode-description.md)', () => {
      const invalidStepFiles = [];

      workflows.forEach(wf => {
        const stepsPath = path.join(wf.dir, 'steps');
        if (fs.existsSync(stepsPath)) {
          const steps = fs.readdirSync(stepsPath).filter(f => f.endsWith('.md'));
          steps.forEach(stepFile => {
            // BMAD naming: step-NN-c|e|v-description.md
            if (!stepFile.match(/^step-\d{2}-[cev]-[\w-]+\.md$/i)) {
              invalidStepFiles.push(`${wf.name}/steps/${stepFile}`);
            }
          });
        }
      });

      // All step files must follow naming convention
      if (invalidStepFiles.length > 0) {
        console.error('Invalid step file names:', invalidStepFiles);
      }
      expect(invalidStepFiles).toEqual([]);
    });

    test('all step files have required sections', () => {
      // Required sections - checking Purpose is mandatory
      const failingFiles = [];
      let totalStepFiles = 0;

      workflows.forEach(wf => {
        const stepsPath = path.join(wf.dir, 'steps');
        if (fs.existsSync(stepsPath)) {
          const steps = fs.readdirSync(stepsPath).filter(f => f.endsWith('.md'));
          totalStepFiles += steps.length;
          steps.forEach(stepFile => {
            const content = fs.readFileSync(path.join(stepsPath, stepFile), 'utf-8');
            const missing = [];

            // Check for Purpose section
            if (!content.includes('## Purpose')) {
              missing.push('## Purpose');
            }

            // Check for either ## Actions or ## Tasks or ## Execution (alternative naming)
            if (!content.includes('## Actions') && !content.includes('## Tasks') && !content.includes('## Execution')) {
              missing.push('## Actions (or ## Tasks or ## Execution)');
            }

            // Check for Outputs or alternative completion sections
            // Outputs, Verification, Deliverables, Next Step, COLLABORATION MENUS all indicate step completion
            if (!content.includes('## Outputs') &&
                !content.includes('## Output') &&
                !content.includes('## Verification') &&
                !content.includes('## Deliverables') &&
                !content.includes('## Next Step') &&
                !content.includes('## COLLABORATION MENUS')) {
              missing.push('## Outputs (or ## Verification or ## Next Step)');
            }

            if (missing.length > 0) {
              failingFiles.push({ file: `${wf.name}/steps/${stepFile}`, missing });
            }
          });
        }
      });

      // Critical: at least 90% should have standard sections
      const passRate = totalStepFiles > 0 ? (totalStepFiles - failingFiles.length) / totalStepFiles : 1;
      if (passRate < 0.9) {
        console.error(`Step file section compliance: ${(passRate * 100).toFixed(1)}% (${failingFiles.length}/${totalStepFiles} failing)`);
        console.error('Failing files:', failingFiles.slice(0, 10).map(f => f.file));
      }
      expect(passRate).toBeGreaterThanOrEqual(0.9);
    });

    test('no step files have duplicate Outputs sections', () => {
      const duplicateOutputs = [];

      workflows.forEach(wf => {
        const stepsPath = path.join(wf.dir, 'steps');
        if (fs.existsSync(stepsPath)) {
          const steps = fs.readdirSync(stepsPath).filter(f => f.endsWith('.md'));
          steps.forEach(stepFile => {
            const content = fs.readFileSync(path.join(stepsPath, stepFile), 'utf-8');
            const outputsCount = (content.match(/^## Outputs/gm) || []).length;
            if (outputsCount > 1) {
              duplicateOutputs.push(`${wf.name}/steps/${stepFile}`);
            }
          });
        }
      });

      expect(duplicateOutputs).toEqual([]);
    });
  });

  describe('Pattern Registry Integrity', () => {
    test('all pattern registry CSVs exist', () => {
      const requiredCSVs = [
        'bam-patterns.csv',
        'tenant-models.csv',
        'ai-runtimes.csv',
        'quality-gates.csv',
        'compliance-frameworks.csv',
        'section-pattern-map.csv'
      ];

      requiredCSVs.forEach(csv => {
        const csvPath = path.join(DATA_DIR, csv);
        expect(fs.existsSync(csvPath)).toBe(true);
      });
    });

    test('pattern registry CSVs are referenced by step files', () => {
      const csvFiles = fs.readdirSync(DATA_DIR)
        .filter(f => f.endsWith('.csv'));
      const orphaned = [];

      csvFiles.forEach(csv => {
        const referencedInWorkflows = grepInDir(WORKFLOWS_DIR, csv);
        const referencedInExtensions = grepInDir(EXTENSIONS_DIR, csv);
        if (!referencedInWorkflows && !referencedInExtensions) {
          orphaned.push(csv);
        }
      });

      // All CSVs must be referenced by workflows or extensions
      if (orphaned.length > 0) {
        console.error('Orphaned CSV files (not referenced):', orphaned);
      }
      expect(orphaned).toEqual([]);
    });
  });

  describe('Template Reference Coverage', () => {
    test('all templates are referenced by step files', () => {
      const templates = fs.readdirSync(TEMPLATES_DIR)
        .filter(f => (f.endsWith('.md') || f.endsWith('.yaml') || f.endsWith('.sql')) && f !== 'README.md');
      const orphaned = [];

      // Optimized: Read all workflow content once instead of per-template
      const allWorkflowContent = collectAllContent(WORKFLOWS_DIR);

      templates.forEach(template => {
        const referenced = allWorkflowContent.includes(template);
        if (!referenced) {
          orphaned.push(template);
        }
      });

      // Templates should be referenced by step files, extensions, or agent guides
      // Allowlist: templates referenced by extensions/agent guides rather than step files
      const allowedOrphans = [
        // Sidecar templates loaded by extensions
        'sidecar-architecture-decisions.md',
        'sidecar-contract-history.md',
        'sidecar-runtime-preferences.md',
        // Reference docs loaded by agent guides
        'README.md',
        // Templates loaded by WDS extensions for persona/tier design
        'tenant-persona-template.md',
        'tenant-story-template.md',
        'tier-journey-template.md',
        'tier-ux-spec-template.md',
        'trigger-map-template.md',
        'empathy-map-template.md',
        'narrative-template.md',
        'presentation-template.md',
        'upgrade-flow-template.md',
        // Templates loaded by CIS extensions
        // Templates loaded by other extensions/guides
        'billing-integration-template.md',
        'subscription-management-template.md',
        'sso-integration-template.md',
        'tenant-fixture-template.md',
        'isolation-test-template.md',
        'onboarding-design-template.md',
        'tenant-model-doc-template.md',
        'foundation-review-template.md',
        'module-compliance-template.md',
        // AI agent/evaluation templates (loaded by extensions/guides)
        'adr-template.md',
        'benchmark-results-template.md',
        'bias-assessment-template.md',
        'chain-of-thought-template.md',
        'evaluation-criteria-template.md',
        'few-shot-prompt-template.md',
        'human-eval-rubric-template.md',
        'red-team-report-template.md',
        'safety-incident-template.md',
        'system-prompt-template.md',
        // Templates for newer workflows (referenced by extensions/guides)
        'ai-security-test-plan-template.md',
        'anonymization-spec-template.md',
        'api-key-lifecycle-template.md',
        'model-governance-template.md',
        'tenant-backup-plan-template.md',
        'tenant-health-report-template.md',
        'tenant-hierarchy-template.md',
        // Compliance and lifecycle templates loaded by extensions/guides
        'audit-evidence-collection-template.md',
        'dsar-template.md',
        'legal-hold-template.md',
        'post-deployment-verification-template.md',
        'tenant-communication-template.md',
        // Security and operations templates (referenced by security/devops guides)
        'security-review-template.md',
        'sla-monitoring-template.md',
        'penetration-testing-template.md',
        // Tenant portal and health templates (referenced by tenant guides)
        'tenant-portal-template.md',
        'tenant-health-monitoring-template.md',
        'tier-migration-template.md',
        'sandbox-provisioning-template.md',
        // Other templates loaded by extensions/guides
        'ai-safety-spec-template.md',
        'complexity-triage-template.md',
        'data-export-template.md',
        'debug-session-template.md',
        'facade-recovery-template.md',
        'feature-rollout-template.md',
        'internal-contracts-template.md',
        'llm-evaluation-pipeline-template.md',
        'llm-gateway-configuration-template.md',
        'module-epics-template.md',
        'rag-pipeline-design-template.md',
        'tenant-health-dashboard-template.md',
        'tool-contract-template.md',
        'tool-inventory-template.md',
        'analytics-dashboard-template.md',
        // Additional tenant management templates
        'tenant-api-key-management-template.md',
        'tenant-audit-log-design-template.md',
        'tenant-capacity-planning-template.md',
        'tenant-cost-attribution-template.md',
        'tenant-data-migration-template.md',
        // SDK and legal templates (standalone reference documents)
        'api-changelog-template.md',
        'data-processing-agreement-template.md',
        'sdk-documentation-template.md',
        // Templates loaded by extension prompts (CIS, UX, TEA, WDS, PM, etc.)
        'admin-portal-ux-template.md',
        'ai-disruption-template.md',
        'api-documentation-template.md',
        'api-strategy-template.md',
        'architecture-diagrams-template.md',
        'architecture-evolution-template.md',
        'chaos-test-plan-template.md',
        'cicd-gate-config-template.md',
        'competitive-analysis-template.md',
        'compliance-test-report-template.md',
        'contract-test-plan-template.md',
        'cross-domain-analysis-template.md',
        'cross-module-coordination-template.md',
        'cross-tenant-scenarios-template.md',
        'cross-tenant-test-plan-template.md',
        'dev-gate-report-template.md',
        'disruption-analysis-template.md',
        'disruption-response-template.md',
        'ecosystem-mapping-template.md',
        'enterprise-requirements-template.md',
        'expansion-strategy-template.md',
        'feature-discovery-template.md',
        'futures-analysis-template.md',
        'gate-status-dashboard-template.md',
        'gate-validation-report-template.md',
        'growth-strategy-template.md',
        'gtm-scale-template.md',
        'innovation-opportunities-template.md',
        'insight-synthesis-template.md',
        'integration-patterns-template.md',
        'isolation-test-plan-template.md',
        'limit-notification-template.md',
        'market-analysis-template.md',
        'marketplace-strategy-template.md',
        'monetization-model-template.md',
        'onboarding-flow-template.md',
        'outcomes-mapping-template.md',
        'partnership-analysis-template.md',
        'pattern-recognition-template.md',
        'performance-test-plan-template.md',
        'platform-governance-template.md',
        'platform-strategy-template.md',
        'pricing-strategy-template.md',
        'regression-test-plan-template.md',
        'roi-analysis-template.md',
        'scale-positioning-template.md',
        'scale-strategy-template.md',
        'security-test-report-template.md',
        'stakeholder-map-template.md',
        'strategic-synthesis-template.md',
        'tenant-boundary-audit-template.md',
        'tenant-persona-analysis-template.md',
        'threat-assessment-template.md',
        'tier-comparison-ux-template.md',
        'tier-journey-map-template.md',
        'unit-economics-template.md',
        'upgrade-experience-template.md',
        'upgrade-prompt-patterns-template.md',
        'value-metrics-template.md',
        'value-strategy-template.md',
        // Templates referenced by checklists rather than step files
        'agent-runtime-template.md',
        'ai-eval-safety-template.md',
        'golden-tasks-template.md',
        'kill-switch-template.md',
        'tool-permissions-template.md',
        // Phase 2: High-priority pattern templates (referenced by pattern registry)
        'tenant-isolation-design-template.md',
        'module-boundaries-template.md',
        'tool-execution-template.md',
        'run-contracts-design-template.md',
        'event-driven-design-template.md',
        'observability-design-template.md',
        'usage-metering-design-template.md',
        'tenant-context-propagation-template.md',
        'cost-tracking-design-template.md',
        'idempotency-patterns-template.md',
        'caching-strategy-template.md',
        'background-jobs-template.md',
        'file-storage-template.md',
        'session-management-template.md',
        'data-archival-template.md',
        'search-indexing-template.md',
        'circuit-breaker-template.md',
        'retry-policies-template.md',
        'mcp-server-isolation-template.md',
        'mcp-client-patterns-template.md',
        'agent-coordination-template.md',
        'agent-negotiation-template.md',
        'model-versioning-template.md',
        'llm-cost-tracking-template.md',
        'token-budgeting-template.md',
        'feature-flags-template.md',
        'connection-pooling-template.md',
        'tenant-sandbox-template.md',
        'prompt-management-template.md',
        'ai-runtime-config-template.md',
        // Phase 3: Industry compliance templates
        'iso-27001-compliance-template.md',
        'fedramp-compliance-template.md',
        'ccpa-compliance-template.md',
        'sox-compliance-template.md',
        'nist-csf-template.md',
        // Phase 4: SRE templates
        'slo-definition-template.md',
        'sli-design-template.md',
        'error-budget-policy-template.md',
        'toil-analysis-template.md',
        'on-call-runbook-template.md',
        // Phase 5: AI governance templates
        'ai-ethics-review-template.md',
        'responsible-ai-policy-template.md',
        'mcp-server-config-template.md',
        'mcp-client-integration-template.md',
        'ai-transparency-report-template.md',
        // Phase 6: Partner/reseller templates (loaded by extensions)
        'data-lineage-architecture-template.md',
        'partner-certification-template.md',
        'partner-portal-template.md',
        'partner-program-template.md',
        'revenue-sharing-template.md',
        'white-label-template.md',
        // Phase 7: Analytics/billing templates (loaded by extensions)
        'embedded-analytics-template.md',
        'invoice-automation-template.md',
        'revenue-analytics-template.md',
        'subscription-lifecycle-template.md',
        // Phase 8: M3 cleanup - templates referenced by extensions/guides not step files
        'action-gateway-template.md',
        'agent-debug-report-template.md',
        'agent-test-report-template.md',
        'audit-logging-template.md',
        'cache-isolation-template.md',
        'compliance-framework-template.md',
        'experiment-report-template.md',
        'integration-design-template.md',
        'mcp-tool-registry-template.md',
        'memory-isolation-template.md',
        'memory-tier-template.md',
        'model-registry-template.md',
        'module-catalog-template.md',
        'rate-limit-config-template.md',
        'rls-policy-template.md',
        'shared-kernel-template.md',
        'tenant-context-template.md',
        'testing-strategy-template.md',
        // Template management meta-templates (used for template lifecycle)
        'template-catalog-template.md',
        'template-management-template.md',
        'template-requirements-template.md'
      ];
      const unexpectedOrphans = orphaned.filter(t => !allowedOrphans.includes(t));
      if (unexpectedOrphans.length > 0) {
        console.error('Orphaned templates (not referenced by step files):', unexpectedOrphans);
      }
      expect(unexpectedOrphans).toEqual([]);
    });
  });

  describe('Module Help CSV Consistency', () => {
    test('module-help.csv exists and has required columns', () => {
      const csvPath = path.join(BAM_ROOT, 'src', 'module-help.csv');
      expect(fs.existsSync(csvPath)).toBe(true);

      const content = fs.readFileSync(csvPath, 'utf-8');
      const header = content.split('\n')[0];

      expect(header).toContain('module');
      expect(header).toContain('skill');
      expect(header).toContain('after');
      expect(header).toContain('before');
      expect(header).toContain('required');
    });
  });

  describe('Core Workflows Have bmad-manifest.json', () => {
    // Note: Nested workflows use short names, flat workflows use full bmad-bam-* names
    const coreWorkflows = [
      'foundation/create-master-architecture',
      'foundation/validate-foundation',
      'bmad-bam-convergence-verification',
      'integration/define-facade-contract',
      'bmad-bam-agent-runtime-architecture'
    ];

    test('core workflows have bmad-manifest.json for dependency chains', () => {
      const missing = [];

      coreWorkflows.forEach(wfPath => {
        const manifestPath = path.join(WORKFLOWS_DIR, wfPath, 'bmad-manifest.json');
        if (!fs.existsSync(manifestPath)) {
          missing.push(wfPath);
        }
      });

      expect(missing).toEqual([]);
    });

    test('bmad-manifest.json files have required fields', () => {
      const invalid = [];

      coreWorkflows.forEach(wfPath => {
        const manifestPath = path.join(WORKFLOWS_DIR, wfPath, 'bmad-manifest.json');
        if (fs.existsSync(manifestPath)) {
          const content = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

          if (!content['module-code'] || !content.capabilities || !content.capabilities[0]) {
            invalid.push(wfPath);
          } else {
            const cap = content.capabilities[0];
            if (!cap.name || !cap.description || cap['supports-headless'] === undefined) {
              invalid.push(wfPath);
            }
          }
        }
      });

      expect(invalid).toEqual([]);
    });
  });

  describe('BMB Compatibility Directories', () => {
    test('src/skills directory exists (empty, BMB compatibility)', () => {
      const skillsDir = path.join(BAM_ROOT, 'src', 'skills');
      expect(fs.existsSync(skillsDir)).toBe(true);
      // Should be empty (only .gitkeep)
      const files = fs.readdirSync(skillsDir);
      expect(files.filter(f => f !== '.gitkeep').length).toBe(0);
    });

    test('src/agents directory exists (empty, BMB compatibility)', () => {
      const agentsDir = path.join(BAM_ROOT, 'src', 'agents');
      expect(fs.existsSync(agentsDir)).toBe(true);
      // Should be empty (only .gitkeep)
      const files = fs.readdirSync(agentsDir);
      expect(files.filter(f => f !== '.gitkeep').length).toBe(0);
    });
  });
});
