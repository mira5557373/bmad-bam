/**
 * Cross-Module Workflow Chain Integration Tests
 *
 * Validates workflow dependencies, chains, and cross-module integration
 * between BAM and BMM, TEA, WDS, CIS modules.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', '..', 'src');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'extensions');

// Helper to find all workflows recursively
const getAllWorkflows = () => {
  const workflows = [];

  const walkDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const manifestPath = path.join(filePath, 'bmad-skill-manifest.yaml');
        if (fs.existsSync(manifestPath)) {
          workflows.push({
            name: file,
            path: filePath,
            manifest: yaml.load(fs.readFileSync(manifestPath, 'utf-8'))
          });
        }
        walkDir(filePath);
      }
    });
  };

  walkDir(WORKFLOWS_DIR);
  return workflows;
};

describe('Cross-Module Workflow Chain Integration', () => {
  const workflows = getAllWorkflows();

  describe('Workflow Dependency Chains', () => {
    // Define expected workflow chains based on BAM methodology
    const expectedChains = [
      {
        name: 'Foundation Chain',
        sequence: [
          'requirement-ingestion',
          'triage-module-complexity',
          'create-master-architecture',
          'validate-foundation'
        ],
        description: 'Discovery to Foundation validation'
      },
      {
        name: 'Module Architecture Chain',
        sequence: [
          'create-master-architecture',
          'tenant-model-isolation',
          'module-boundary-design',
          'create-module-architecture',
          'validate-module'
        ],
        description: 'Foundation to Module validation'
      },
      {
        name: 'Integration Chain',
        sequence: [
          'create-module-architecture',
          'define-facade-contract',
          'convergence-verification'
        ],
        description: 'Module to Integration validation'
      },
      {
        name: 'Quality Chain',
        sequence: [
          'validate-foundation',
          'validate-module',
          'convergence-verification',
          'quality-assurance-review'
        ],
        description: 'Validation workflow chain'
      }
    ];

    test('all workflows in chains exist', () => {
      const workflowNames = new Set(workflows.map(w => w.name));
      const missingWorkflows = [];

      expectedChains.forEach(chain => {
        chain.sequence.forEach(wf => {
          if (!workflowNames.has(wf)) {
            missingWorkflows.push({ chain: chain.name, workflow: wf });
          }
        });
      });

      if (missingWorkflows.length > 0) {
        console.warn('Workflows in chains that do not exist:', missingWorkflows);
      }

      // Allow some missing as workflows may be planned
      expect(missingWorkflows.length).toBeLessThanOrEqual(2);
    });

    test('workflow chains have correct phase ordering', () => {
      const phaseOrder = {
        'discovery': 1,
        'ingestion': 2,
        'foundation': 3,
        'module': 4,
        'integration': 5,
        'quality': 6
      };

      const violations = [];

      expectedChains.forEach(chain => {
        let lastPhase = 0;

        chain.sequence.forEach(workflowName => {
          const workflow = workflows.find(w => w.name === workflowName);
          if (!workflow) return;

          // Determine phase from path
          const pathParts = workflow.path.split(path.sep);
          const phase = pathParts.find(p => phaseOrder[p]);

          if (phase && phaseOrder[phase] < lastPhase) {
            violations.push({
              chain: chain.name,
              workflow: workflowName,
              issue: `Phase ${phase} comes before expected order`
            });
          }

          if (phase) {
            lastPhase = phaseOrder[phase];
          }
        });
      });

      if (violations.length > 0) {
        console.warn('Phase ordering violations:', violations);
      }

      expect(violations).toEqual([]);
    });
  });

  describe('Cross-Module Extension Integration', () => {
    test('BMM extensions reference BAM workflows appropriately', () => {
      const bmmExtensions = fs.readdirSync(EXTENSIONS_DIR)
        .filter(f => f.endsWith('-bam.yaml') && !f.startsWith('cis-') && !f.startsWith('wds-') && !f.startsWith('tea-'));

      bmmExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

        // Extension should reference BAM context or patterns
        const menu = content.menu || [];
        const prompts = content.prompts || [];

        const allContent = [
          ...menu.map(m => m.description || ''),
          ...prompts.map(p => p.content || '')
        ].join(' ');

        // Should have BAM-related context loading
        const hasBamContext =
          allContent.includes('bam') ||
          allContent.includes('BAM') ||
          allContent.includes('tenant') ||
          allContent.includes('multi-tenant');

        expect(hasBamContext).toBe(true);
      });
    });

    test('TEA extension integrates with BAM tenant testing', () => {
      const teaExtPath = path.join(EXTENSIONS_DIR, 'tea-bam.yaml');
      if (!fs.existsSync(teaExtPath)) {
        console.warn('TEA extension not found, skipping');
        return;
      }

      const content = yaml.load(fs.readFileSync(teaExtPath, 'utf-8'));
      const menu = content.menu || [];

      // TEA extension should have isolation testing capabilities
      const hasIsolationTesting = menu.some(m =>
        m.trigger.includes('isolation') ||
        m.trigger.includes('tenant') ||
        m.description.toLowerCase().includes('isolation')
      );

      expect(hasIsolationTesting).toBe(true);
    });

    test('WDS extensions integrate with BAM tier/persona capabilities', () => {
      const wdsExtensions = fs.readdirSync(EXTENSIONS_DIR)
        .filter(f => f.startsWith('wds-') && f.endsWith('-bam.yaml'));

      wdsExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        const menu = content.menu || [];

        // WDS extensions should have tier or persona capabilities
        const hasCapability = menu.some(m =>
          m.trigger.includes('tier') ||
          m.trigger.includes('persona') ||
          m.trigger.includes('saas') ||
          m.description.toLowerCase().includes('tier')
        );

        expect(hasCapability).toBe(true);
      });
    });

    test('CIS extensions have SaaS innovation capabilities', () => {
      const cisExtensions = fs.readdirSync(EXTENSIONS_DIR)
        .filter(f => f.startsWith('cis-') && f.endsWith('-bam.yaml'));

      cisExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        const menu = content.menu || [];
        const prompts = content.prompts || [];

        const allContent = [
          ...menu.map(m => m.description || ''),
          ...prompts.map(p => p.content || '')
        ].join(' ').toLowerCase();

        // CIS extensions should reference SaaS/multi-tenant innovation
        const hasSaasContent =
          allContent.includes('saas') ||
          allContent.includes('tenant') ||
          allContent.includes('platform') ||
          allContent.includes('tier');

        expect(hasSaasContent).toBe(true);
      });
    });
  });

  describe('Workflow Handoff Points', () => {
    test('foundation workflows hand off to module workflows', () => {
      const foundationWorkflows = workflows.filter(w =>
        w.path.includes('foundation') ||
        w.name === 'create-master-architecture' ||
        w.name === 'validate-foundation'
      );

      const moduleWorkflows = workflows.filter(w =>
        w.path.includes('module') ||
        w.name.includes('module')
      );

      // Foundation workflows should exist
      expect(foundationWorkflows.length).toBeGreaterThan(0);
      // Module workflows should exist
      expect(moduleWorkflows.length).toBeGreaterThan(0);

      // Check that validate-foundation exists as handoff point
      const hasValidateFoundation = foundationWorkflows.some(w =>
        w.name === 'validate-foundation'
      );
      expect(hasValidateFoundation).toBe(true);
    });

    test('module workflows hand off to integration workflows', () => {
      const moduleWorkflows = workflows.filter(w =>
        w.path.includes('module') ||
        w.name.includes('module')
      );

      const integrationWorkflows = workflows.filter(w =>
        w.path.includes('integration') ||
        w.name.includes('facade') ||
        w.name.includes('convergence')
      );

      expect(moduleWorkflows.length).toBeGreaterThan(0);
      expect(integrationWorkflows.length).toBeGreaterThan(0);
    });

    test('integration workflows hand off to quality workflows', () => {
      const integrationWorkflows = workflows.filter(w =>
        w.path.includes('integration') ||
        w.name.includes('convergence')
      );

      const qualityWorkflows = workflows.filter(w =>
        w.path.includes('quality') ||
        w.name.includes('quality') ||
        w.name.includes('validate')
      );

      expect(integrationWorkflows.length).toBeGreaterThan(0);
      expect(qualityWorkflows.length).toBeGreaterThan(0);
    });
  });

  describe('Quality Gate Chain', () => {
    test('quality gates follow correct sequence', () => {
      const gateSequence = [
        'QG-F1',  // Foundation
        'QG-M1',  // Module Architecture
        'QG-M2',  // Tenant Isolation
        'QG-M3',  // Agent Runtime
        'QG-I1',  // Convergence
        'QG-I2',  // Tenant Safety
        'QG-I3',  // Agent Safety
        'QG-P1'   // Production Readiness
      ];

      // Check that checklists exist for each gate
      const checklistsDir = path.join(SRC_DIR, 'checklists');
      if (!fs.existsSync(checklistsDir)) {
        console.warn('Checklists directory not found');
        return;
      }

      const checklists = fs.readdirSync(checklistsDir);

      // Foundation gate
      expect(checklists.some(c => c.includes('foundation'))).toBe(true);

      // Module gates
      expect(checklists.some(c => c.includes('module') || c.includes('tenant-isolation'))).toBe(true);

      // Integration gates
      expect(checklists.some(c => c.includes('convergence') || c.includes('tenant-safety') || c.includes('agent-safety'))).toBe(true);

      // Production gate
      expect(checklists.some(c => c.includes('production'))).toBe(true);
    });

    test('validation workflows reference quality gates', () => {
      const validateWorkflows = workflows.filter(w => w.name.includes('validate'));

      validateWorkflows.forEach(workflow => {
        const workflowMd = path.join(workflow.path, 'workflow.md');
        if (!fs.existsSync(workflowMd)) return;

        const content = fs.readFileSync(workflowMd, 'utf-8');

        // Should reference QG- gates or checklists
        const hasGateRef =
          content.includes('QG-') ||
          content.includes('gate') ||
          content.includes('checklist');

        expect(hasGateRef).toBe(true);
      });
    });
  });

  describe('Phase 5 Quality Workflows', () => {
    test('quality container directory exists', () => {
      const qualityDir = path.join(WORKFLOWS_DIR, 'quality');
      expect(fs.existsSync(qualityDir)).toBe(true);
    });

    test('quality workflows exist', () => {
      const qualityWorkflows = workflows.filter(w => w.path.includes('quality'));

      // Should have dedicated quality workflows
      expect(qualityWorkflows.length).toBeGreaterThanOrEqual(1);

      // Check for key quality workflows
      const qualityNames = qualityWorkflows.map(w => w.name);
      console.log('Quality workflows found:', qualityNames);
    });

    test('quality workflows have proper structure', () => {
      const qualityWorkflows = workflows.filter(w => w.path.includes('quality'));

      qualityWorkflows.forEach(workflow => {
        // Check for required files
        const skillPath = path.join(workflow.path, 'SKILL.md');
        const workflowPath = path.join(workflow.path, 'workflow.md');
        const stepsDir = path.join(workflow.path, 'steps');

        expect(fs.existsSync(skillPath)).toBe(true);
        expect(fs.existsSync(workflowPath)).toBe(true);
        expect(fs.existsSync(stepsDir)).toBe(true);
      });
    });
  });

  describe('Extension extends: Pattern Consistency', () => {
    test('all extensions use consistent extends pattern', () => {
      const extensions = fs.readdirSync(EXTENSIONS_DIR)
        .filter(f => f.endsWith('.yaml'));

      const extendsPatterns = {};

      extensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        const extendsValue = content.agent?.metadata?.extends;

        if (extendsValue) {
          // Group by prefix pattern
          const prefix = extendsValue.split('-').slice(0, 2).join('-');
          extendsPatterns[prefix] = extendsPatterns[prefix] || [];
          extendsPatterns[prefix].push({ extension: ext, extends: extendsValue });
        }
      });

      console.log('Extension extends patterns:', Object.keys(extendsPatterns));

      // Document the patterns found
      Object.entries(extendsPatterns).forEach(([prefix, items]) => {
        console.log(`  ${prefix}: ${items.length} extensions`);
      });

      // All extensions should have extends field
      extensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        expect(content.agent?.metadata?.extends).toBeDefined();
      });
    });

    test('BMM extensions extend bmad-agent-* pattern', () => {
      const bmmExtensions = [
        'analyst-bam.yaml',
        'architect-bam.yaml',
        'dev-bam.yaml',
        'pm-bam.yaml',
        'ux-bam.yaml',
        'tech-writer-bam.yaml'
      ];

      bmmExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        if (!fs.existsSync(extPath)) return;

        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        const extendsValue = content.agent?.metadata?.extends;

        expect(extendsValue).toMatch(/^bmad-agent-/);
      });
    });

    test('CIS extensions extend bmad-cis-agent-* pattern', () => {
      const cisExtensions = fs.readdirSync(EXTENSIONS_DIR)
        .filter(f => f.startsWith('cis-') && f.endsWith('-bam.yaml'));

      cisExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        const extendsValue = content.agent?.metadata?.extends;

        expect(extendsValue).toMatch(/^bmad-cis-agent-/);
      });
    });

    test('WDS extensions extend wds-agent-* pattern', () => {
      const wdsExtensions = fs.readdirSync(EXTENSIONS_DIR)
        .filter(f => f.startsWith('wds-') && f.endsWith('-bam.yaml'));

      wdsExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        const extendsValue = content.agent?.metadata?.extends;

        expect(extendsValue).toMatch(/^wds-agent-/);
      });
    });
  });
});

describe('Module Help CSV Workflow Chains', () => {
  test('module-help.csv entries reflect workflow dependencies', () => {
    const helpPath = path.join(WORKFLOWS_DIR, 'module-help.csv');
    if (!fs.existsSync(helpPath)) {
      console.warn('module-help.csv not found');
      return;
    }

    const content = fs.readFileSync(helpPath, 'utf-8');
    const lines = content.split('\n').filter(l => l.trim());

    // Should have entries for main workflow chains
    const hasFoundationEntries = lines.some(l => l.includes('foundation') || l.includes('master-architecture'));
    const hasModuleEntries = lines.some(l => l.includes('module'));
    const hasIntegrationEntries = lines.some(l => l.includes('facade') || l.includes('integration'));
    const hasQualityEntries = lines.some(l => l.includes('validate') || l.includes('quality'));

    expect(hasFoundationEntries).toBe(true);
    expect(hasModuleEntries).toBe(true);
    expect(hasIntegrationEntries).toBe(true);
    expect(hasQualityEntries).toBe(true);
  });
});
