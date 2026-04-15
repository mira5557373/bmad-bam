/**
 * Integration validation tests (Tier 4)
 * Validates BAM integrates with BMM, TEA, WDS, CIS
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'data', 'extensions');

describe('Tier 4: Ecosystem Integration', () => {
  describe('BMM Integration', () => {
    const bmmExtensions = [
      'analyst-bam.yaml',
      'architect-bam.yaml',
      'dev-bam.yaml',
      'pm-bam.yaml',
      'ux-bam.yaml',
      'tech-writer-bam.yaml',
    ];

    test('all BMM agent extensions exist', () => {
      bmmExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        expect(fs.existsSync(extPath)).toBe(true);
      });
    });

    test('BMM extensions extend correct base agents', () => {
      const mapping = {
        'analyst-bam.yaml': 'bmad-agent-analyst',
        'architect-bam.yaml': 'bmad-agent-architect',
        'dev-bam.yaml': 'bmad-agent-dev',
        'pm-bam.yaml': 'bmad-agent-pm',
        'ux-bam.yaml': 'bmad-agent-ux-designer',
        'tech-writer-bam.yaml': 'bmad-agent-tech-writer',
      };

      Object.entries(mapping).forEach(([ext, base]) => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
        expect(content.agent.metadata.extends).toBe(base);
      });
    });
  });

  describe('TEA Integration', () => {
    test('TEA extension exists', () => {
      const extPath = path.join(EXTENSIONS_DIR, 'tea-bam.yaml');
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('TEA extension has tenant testing capabilities', () => {
      const extPath = path.join(EXTENSIONS_DIR, 'tea-bam.yaml');
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      const menu = content.menu || [];
      const triggers = menu.map(m => m.trigger);

      // Should have tenant testing related triggers
      const hasTenantTesting = triggers.some(t =>
        t.includes('tenant') || t.includes('isolation') || t.includes('fixture')
      );

      expect(hasTenantTesting).toBe(true);
    });

    test('tenant testing agent guide exists', () => {
      const guidesDir = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
      const files = fs.readdirSync(guidesDir);

      const hasTenantTesting = files.some(f =>
        f.includes('tenant') && f.includes('test')
      );

      expect(hasTenantTesting).toBe(true);
    });
  });

  describe('WDS Integration', () => {
    const wdsExtensions = [
      'wds-saga-bam.yaml',
      'wds-freya-bam.yaml',
    ];

    test('all WDS extensions exist', () => {
      wdsExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        expect(fs.existsSync(extPath)).toBe(true);
      });
    });

    test('Saga extension has tenant persona capabilities', () => {
      const extPath = path.join(EXTENSIONS_DIR, 'wds-saga-bam.yaml');
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      const menu = content.menu || [];
      const triggers = menu.map(m => m.trigger);

      // Should have persona/trigger mapping related
      const hasPersonaCapability = triggers.some(t =>
        t.includes('persona') || t.includes('trigger') || t.includes('saas')
      );

      expect(hasPersonaCapability).toBe(true);
    });

    test('Freya extension has tier UX capabilities', () => {
      const extPath = path.join(EXTENSIONS_DIR, 'wds-freya-bam.yaml');
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      const menu = content.menu || [];
      const triggers = menu.map(m => m.trigger);

      // Should have tier/journey related
      const hasTierCapability = triggers.some(t =>
        t.includes('tier') || t.includes('journey') || t.includes('ux')
      );

      expect(hasTierCapability).toBe(true);
    });
  });

  describe('CIS Integration', () => {
    const cisExtensions = [
      'cis-innovation-bam.yaml',
      'cis-storyteller-bam.yaml',
      'cis-design-thinking-bam.yaml',
      'cis-problem-solver-bam.yaml',
      'cis-brainstorming-bam.yaml',
      'cis-presentation-bam.yaml',
    ];

    test('all CIS extensions exist', () => {
      cisExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        expect(fs.existsSync(extPath)).toBe(true);
      });
    });

    test('CIS extensions have SaaS-focused capabilities', () => {
      cisExtensions.forEach(ext => {
        const extPath = path.join(EXTENSIONS_DIR, ext);
        const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

        const menu = content.menu || [];
        const prompts = content.prompts || [];

        // Should have SaaS/tenant related content
        const allContent = [
          ...menu.map(m => m.trigger || ''),
          ...menu.map(m => m.description || ''),
          ...prompts.map(p => p.content || ''),
        ].join(' ').toLowerCase();

        const hasSaasContent =
          allContent.includes('saas') ||
          allContent.includes('tenant') ||
          allContent.includes('tier') ||
          allContent.includes('multi-tenant');

        expect(hasSaasContent).toBe(true);
      });
    });
  });

  describe('Master Architect Integration', () => {
    test('master-architect-bam.yaml exists', () => {
      const extPath = path.join(EXTENSIONS_DIR, 'master-architect-bam.yaml');
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('has foundation review capability', () => {
      const extPath = path.join(EXTENSIONS_DIR, 'master-architect-bam.yaml');
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      const menu = content.menu || [];
      const triggers = menu.map(m => m.trigger);

      const hasReviewCapability = triggers.some(t =>
        t.includes('review') || t.includes('foundation') || t.includes('compliance')
      );

      expect(hasReviewCapability).toBe(true);
    });
  });
});

describe('Cross-Module Consistency', () => {
  test('all extensions use consistent module identifier', () => {
    const extensions = fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'));

    extensions.forEach(ext => {
      const extPath = path.join(EXTENSIONS_DIR, ext);
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      expect(content.agent.metadata.module).toBe('bam');
    });
  });

  test('agent guides referenced in extensions exist', () => {
    const guidesDir = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
    const existingGuides = fs.readdirSync(guidesDir);
    const missingGuides = [];

    const extensions = fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'));

    extensions.forEach(ext => {
      const extPath = path.join(EXTENSIONS_DIR, ext);
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      const prompts = content.prompts || [];
      prompts.forEach(prompt => {
        // Extract guide references from content
        const matches = (prompt.content || '').match(/agent-guides\/bam\/([^`\s]+\.md)/g);
        if (matches) {
          matches.forEach(match => {
            const guideName = match.replace('agent-guides/bam/', '');
            // Fail if guide doesn't exist
            if (!existingGuides.includes(guideName)) {
              missingGuides.push({ extension: ext, guide: guideName });
            }
          });
        }
      });
    });

    if (missingGuides.length > 0) {
      console.error('Extensions reference missing guides:', missingGuides);
    }
    expect(missingGuides).toEqual([]);
  });
});

describe('Extension Menu Item Validation', () => {
  test('extension menu items reference valid workflows or prompts', () => {
    const extensions = fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'));

    // Find all workflow directories (to validate workflow references)
    const workflowsDir = path.join(SRC_DIR, 'workflows');
    const findWorkflows = (dir, results = []) => {
      if (!fs.existsSync(dir)) return results;
      const items = fs.readdirSync(dir);
      if (items.includes('bmad-skill-manifest.yaml')) {
        results.push(path.basename(dir));
      }
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          findWorkflows(itemPath, results);
        }
      });
      return results;
    };
    const workflowNames = new Set(findWorkflows(workflowsDir));

    const invalidRefs = [];

    extensions.forEach(ext => {
      const extPath = path.join(EXTENSIONS_DIR, ext);
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      const menu = content.menu || [];
      const prompts = content.prompts || [];
      const promptIds = new Set(prompts.map(p => p.id));

      menu.forEach(item => {
        const action = item.action || '';

        // Check if action references a prompt (starts with #)
        if (action.startsWith('#')) {
          const promptId = action.slice(1); // Remove the leading #
          if (!promptIds.has(promptId)) {
            invalidRefs.push({
              extension: ext,
              menuItem: item.trigger,
              action,
              issue: `References prompt '${promptId}' which does not exist in this extension`
            });
          }
        }
        // Check if action references a workflow (starts with workflow: or contains workflow name)
        else if (action.startsWith('workflow:')) {
          const workflowName = action.replace('workflow:', '').trim();
          if (!workflowNames.has(workflowName)) {
            invalidRefs.push({
              extension: ext,
              menuItem: item.trigger,
              action,
              issue: `References workflow '${workflowName}' which does not exist`
            });
          }
        }
        // Check if action is 'run' with workflow reference in description or trigger
        else if (action === 'run' || action === '') {
          // For 'run' actions, the trigger often contains the workflow identifier
          // This is acceptable as long as the pattern is consistent
        }
      });
    });

    if (invalidRefs.length > 0) {
      console.error('Invalid menu item references:', JSON.stringify(invalidRefs, null, 2));
    }

    // No invalid references should exist
    expect(invalidRefs).toEqual([]);
  });

  test('each extension menu item has valid structure', () => {
    const extensions = fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'));

    const structureErrors = [];

    extensions.forEach(ext => {
      const extPath = path.join(EXTENSIONS_DIR, ext);
      const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));

      const menu = content.menu || [];

      menu.forEach((item, index) => {
        // Each menu item should have trigger, action, and description
        if (!item.trigger) {
          structureErrors.push({
            extension: ext,
            menuIndex: index,
            issue: 'Missing trigger'
          });
        }
        if (!item.action) {
          structureErrors.push({
            extension: ext,
            menuIndex: index,
            trigger: item.trigger,
            issue: 'Missing action'
          });
        }
        if (!item.description) {
          structureErrors.push({
            extension: ext,
            menuIndex: index,
            trigger: item.trigger,
            issue: 'Missing description'
          });
        }
      });
    });

    if (structureErrors.length > 0) {
      console.error('Menu item structure errors:', JSON.stringify(structureErrors, null, 2));
    }

    expect(structureErrors).toEqual([]);
  });
});
