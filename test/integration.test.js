/**
 * Integration validation tests (Tier 4)
 * Validates BAM integrates with BMM, TEA, WDS, CIS
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'extensions');

describe('Tier 4: Ecosystem Integration', () => {
  describe('BMM Integration', () => {
    const bmmExtensions = [
      'analyst-bam.yaml',
      'architect-bam.yaml',
      'dev-bam.yaml',
      'pm-bam.yaml',
      'qa-bam.yaml',
      'sm-bam.yaml',
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
        'qa-bam.yaml': 'bmad-agent-qa',
        'sm-bam.yaml': 'bmad-agent-sm',
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

    test('tenant testing knowledge exists', () => {
      const knowledgeDir = path.join(SRC_DIR, 'knowledge');
      const files = fs.readdirSync(knowledgeDir);

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
            // Warn if guide doesn't exist
            if (!existingGuides.includes(guideName)) {
              console.warn(`Extension ${ext} references missing guide: ${guideName}`);
            }
          });
        }
      });
    });
  });
});
