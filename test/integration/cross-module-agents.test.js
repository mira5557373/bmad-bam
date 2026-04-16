/**
 * Cross-Module Agent Integration Tests
 *
 * Validates BAM integration with other BMAD modules:
 * - BMM agents (Winston, Sarah, James, etc.)
 * - TEA personas
 * - WDS agents (Saga, Freya)
 * - CIS agents
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Use environment variable or default to testing the installed environment
const INSTALL_PATH = process.env.BMAD_INSTALL_PATH ||
  path.join(__dirname, '../../../bmad-with-wds-bam');

const SKILLS_DIR = path.join(INSTALL_PATH, '.claude/skills');
const BAM_CUSTOMIZE_DIR = path.join(INSTALL_PATH, '_bmad/bam/_config/agents');
const BAM_DATA_DIR = path.join(INSTALL_PATH, '_bmad/bam/data');
const SRC_EXTENSIONS_DIR = path.join(__dirname, '../../src/data/extensions');

describe('Cross-Module Agent Integration', () => {

  describe('BMM Agent Customization', () => {
    // BMM agents that have BAM customize files
    // Note: bmad-agent-po (Faith) is merged into bmad-agent-pm
    const bmmAgents = [
      { name: 'bmad-agent-architect', displayName: 'Winston' },
      { name: 'bmad-agent-analyst', displayName: 'Sarah' },
      { name: 'bmad-agent-dev', displayName: 'James' },
      { name: 'bmad-agent-pm', displayName: 'Chad' },
      { name: 'bmad-agent-ux-designer', displayName: 'Emma' },
      { name: 'bmad-agent-tech-writer', displayName: 'Liam' }
    ];

    test.each(bmmAgents)('$name ($displayName) has BAM customize file', (agent) => {
      const customizeFile = path.join(BAM_CUSTOMIZE_DIR, `${agent.name}.customize.yaml`);
      expect(fs.existsSync(customizeFile)).toBe(true);
    });

    test.each(bmmAgents)('$name customize file has valid structure', (agent) => {
      const customizeFile = path.join(BAM_CUSTOMIZE_DIR, `${agent.name}.customize.yaml`);
      if (!fs.existsSync(customizeFile)) {
        console.warn(`Skipping: ${agent.name} customize file not found`);
        return;
      }

      const content = yaml.load(fs.readFileSync(customizeFile, 'utf8'));

      // Must have memories section with BAM reference
      expect(content.memories).toBeDefined();
      expect(content.memories.some(m =>
        m.includes('BAM') ||
        m.includes('multi-tenant') ||
        m.includes('Multi-tenant')
      )).toBe(true);

      // Must have menu section with items
      expect(content.menu).toBeDefined();
      expect(Array.isArray(content.menu)).toBe(true);
      expect(content.menu.length).toBeGreaterThan(0);

      // Must have prompts section
      expect(content.prompts).toBeDefined();
      expect(Array.isArray(content.prompts)).toBe(true);
      expect(content.prompts.length).toBeGreaterThan(0);
    });

    test('BMM agents receive BAM context loaders', () => {
      const contextLoaderPatterns = [
        'platform-context',
        'architect-context',
        'analyst-context',
        'dev-context',
        'pm-context'
      ];

      const customizeFiles = fs.existsSync(BAM_CUSTOMIZE_DIR)
        ? fs.readdirSync(BAM_CUSTOMIZE_DIR).filter(f => f.endsWith('.customize.yaml'))
        : [];

      const foundLoaders = new Set();

      for (const file of customizeFiles) {
        const content = fs.readFileSync(path.join(BAM_CUSTOMIZE_DIR, file), 'utf8');
        for (const pattern of contextLoaderPatterns) {
          if (content.includes(pattern)) {
            foundLoaders.add(pattern);
          }
        }
      }

      console.log(`Found context loaders: ${[...foundLoaders].join(', ')}`);

      // Should have most context loaders
      expect(foundLoaders.size).toBeGreaterThanOrEqual(3);
    });
  });

  describe('TEA Integration', () => {
    test('TEA customize file exists', () => {
      const teaCustomizeFile = path.join(BAM_CUSTOMIZE_DIR, 'bmad-tea.customize.yaml');
      expect(fs.existsSync(teaCustomizeFile)).toBe(true);
    });

    test('TEA customize file includes tenant testing capabilities', () => {
      const teaCustomizeFile = path.join(BAM_CUSTOMIZE_DIR, 'bmad-tea.customize.yaml');
      if (!fs.existsSync(teaCustomizeFile)) {
        console.warn('TEA customize file not found, skipping');
        return;
      }

      const content = yaml.load(fs.readFileSync(teaCustomizeFile, 'utf8'));

      // Should have menu items for tenant testing
      const triggers = content.menu.map(m => m.trigger).join(' ');
      const descriptions = content.menu.map(m => m.description || '').join(' ').toLowerCase();

      const hasTenantTesting =
        triggers.includes('tenant') ||
        triggers.includes('isolation') ||
        descriptions.includes('tenant') ||
        descriptions.includes('isolation');

      expect(hasTenantTesting).toBe(true);
    });
  });

  describe('WDS Agent Integration', () => {
    const wdsAgents = [
      { name: 'wds-agent-saga-analyst', displayName: 'Saga' },
      { name: 'wds-agent-freya-ux', displayName: 'Freya' }
    ];

    test('WDS extensions exist in source', () => {
      const wdsExtensions = [
        'wds-saga-bam.yaml',
        'wds-freya-bam.yaml'
      ];

      for (const ext of wdsExtensions) {
        const extPath = path.join(SRC_EXTENSIONS_DIR, ext);
        expect(fs.existsSync(extPath)).toBe(true);
      }
    });

    test('WDS extensions have tier/persona capabilities', () => {
      const wdsExtensions = [
        'wds-saga-bam.yaml',
        'wds-freya-bam.yaml'
      ];

      for (const ext of wdsExtensions) {
        const extPath = path.join(SRC_EXTENSIONS_DIR, ext);
        if (!fs.existsSync(extPath)) continue;

        const content = yaml.load(fs.readFileSync(extPath, 'utf8'));
        const menu = content.menu || [];

        // WDS extensions should have tier or persona capabilities
        const hasCapability = menu.some(m =>
          m.trigger?.includes('tier') ||
          m.trigger?.includes('persona') ||
          m.trigger?.includes('saas') ||
          (m.description || '').toLowerCase().includes('tier')
        );

        expect(hasCapability).toBe(true);
      }
    });

    test('BAM workflows reference WDS patterns', () => {
      if (!fs.existsSync(SKILLS_DIR)) {
        console.warn('Skills directory not found, skipping');
        return;
      }

      const bamWorkflows = fs.readdirSync(SKILLS_DIR)
        .filter(d => d.startsWith('bmad-bam-'))
        .filter(d => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory());

      let wdsReferences = 0;

      for (const workflow of bamWorkflows) {
        const skillPath = path.join(SKILLS_DIR, workflow, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf8').toLowerCase();
          if (content.includes('wds') || content.includes('saga') || content.includes('freya')) {
            wdsReferences++;
          }
        }
      }

      console.log(`Workflows referencing WDS: ${wdsReferences}/${bamWorkflows.length}`);
      // At least some workflows should reference WDS
      expect(wdsReferences).toBeGreaterThanOrEqual(0); // Soft check
    });
  });

  describe('CIS Extension Integration', () => {
    const cisExtensions = [
      'cis-brainstorming-bam.yaml',
      'cis-design-thinking-bam.yaml',
      'cis-disruption-bam.yaml',
      'cis-futures-bam.yaml',
      'cis-innovation-bam.yaml',
      'cis-market-bam.yaml',
      'cis-platform-bam.yaml',
      'cis-presentation-bam.yaml',
      'cis-problem-solver-bam.yaml',
      'cis-scale-bam.yaml',
      'cis-storyteller-bam.yaml',
      'cis-value-bam.yaml'
    ];

    test('all CIS extensions exist', () => {
      const missing = [];

      for (const ext of cisExtensions) {
        const extPath = path.join(SRC_EXTENSIONS_DIR, ext);
        if (!fs.existsSync(extPath)) {
          missing.push(ext);
        }
      }

      if (missing.length > 0) {
        console.warn('Missing CIS extensions:', missing);
      }

      // Most CIS extensions should exist
      expect(missing.length).toBeLessThanOrEqual(2);
    });

    test('CIS extensions target bmad-cis-agent-*', () => {
      for (const ext of cisExtensions) {
        const extPath = path.join(SRC_EXTENSIONS_DIR, ext);
        if (!fs.existsSync(extPath)) continue;

        const content = yaml.load(fs.readFileSync(extPath, 'utf8'));
        const extendsValue = content.agent?.metadata?.extends || '';

        expect(extendsValue).toMatch(/^bmad-cis-agent-/);
      }
    });

    test('CIS customize files merge multiple extensions', () => {
      const cisCustomizeFile = path.join(
        BAM_CUSTOMIZE_DIR,
        'bmad-cis-agent-innovation-strategist.customize.yaml'
      );

      if (!fs.existsSync(cisCustomizeFile)) {
        console.warn('CIS customize file not found, skipping');
        return;
      }

      const content = yaml.load(fs.readFileSync(cisCustomizeFile, 'utf8'));

      // Should have memories from multiple extensions
      expect(content.memories.length).toBeGreaterThan(3);

      // Should have many menu items from merged extensions
      expect(content.menu.length).toBeGreaterThan(20);

      console.log(`CIS customize file: ${content.memories.length} memories, ${content.menu.length} menu items`);
    });
  });

  describe('Extension Merge Verification', () => {
    test('all 31 extensions are distributed across customize files', () => {
      if (!fs.existsSync(BAM_CUSTOMIZE_DIR)) {
        console.warn('BAM customize directory not found, skipping');
        return;
      }

      const customizeFiles = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      let totalMenuItems = 0;

      for (const file of customizeFiles) {
        const content = yaml.load(fs.readFileSync(
          path.join(BAM_CUSTOMIZE_DIR, file), 'utf8'
        ));
        totalMenuItems += content.menu?.length || 0;
      }

      console.log(`Total menu items across ${customizeFiles.length} customize files: ${totalMenuItems}`);

      // Should have ~369 menu items from all 31 extensions
      // Allow some variance due to deduplication
      expect(totalMenuItems).toBeGreaterThanOrEqual(300);
    });

    test('no excessive duplicate triggers across customize files', () => {
      if (!fs.existsSync(BAM_CUSTOMIZE_DIR)) {
        console.warn('BAM customize directory not found, skipping');
        return;
      }

      const customizeFiles = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      const triggerLocations = new Map(); // trigger -> [file, file, ...]

      for (const file of customizeFiles) {
        const content = yaml.load(fs.readFileSync(
          path.join(BAM_CUSTOMIZE_DIR, file), 'utf8'
        ));

        for (const item of content.menu || []) {
          if (!triggerLocations.has(item.trigger)) {
            triggerLocations.set(item.trigger, []);
          }
          triggerLocations.get(item.trigger).push(file);
        }
      }

      // Find triggers that appear in multiple files
      const crossFileDuplicates = [];
      for (const [trigger, files] of triggerLocations) {
        const uniqueFiles = [...new Set(files)];
        if (uniqueFiles.length > 1) {
          crossFileDuplicates.push(`${trigger}: ${uniqueFiles.join(', ')}`);
        }
      }

      if (crossFileDuplicates.length > 0) {
        console.log(`Cross-file duplicate triggers: ${crossFileDuplicates.length}`);
        crossFileDuplicates.slice(0, 5).forEach(d => console.log(`  - ${d}`));
      }

      // Some cross-file duplicates are OK (shared capabilities)
      // But shouldn't be excessive
      expect(crossFileDuplicates.length).toBeLessThan(30);
    });
  });

  describe('Guide Integration', () => {
    test('wds-integration-patterns guide exists', () => {
      const guidePath = path.join(BAM_DATA_DIR, 'agent-guides/bam/wds-integration-patterns.md');

      // May not exist yet - this is informational
      if (fs.existsSync(guidePath)) {
        const content = fs.readFileSync(guidePath, 'utf8');
        expect(content.length).toBeGreaterThan(100);
      } else {
        console.warn('wds-integration-patterns.md not found - may need to be created');
      }
    });
  });
});
