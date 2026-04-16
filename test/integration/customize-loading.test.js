/**
 * Customize File Loading Verification Tests
 *
 * Validates that BAM customize files are correctly installed and structured
 * for BMAD agent integration.
 *
 * CRITICAL: Customize files are installed to _bmad/bam/_config/agents/
 * (module-specific path), NOT _bmad/_config/agents/ (top-level).
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Use environment variable or default to testing the bmad-with-wds-bam installation
const INSTALL_PATH = process.env.BMAD_INSTALL_PATH ||
  path.join(__dirname, '../../../bmad-with-wds-bam');

// BAM customize files are in the BAM module directory
const BAM_CUSTOMIZE_DIR = path.join(INSTALL_PATH, '_bmad/bam/_config/agents');
const TOP_LEVEL_CONFIG_DIR = path.join(INSTALL_PATH, '_bmad/_config/agents');
const SKILLS_DIR = path.join(INSTALL_PATH, '.claude/skills');
const BAM_DATA_DIR = path.join(INSTALL_PATH, '_bmad/bam/data');

// Expected counts
const EXPECTED_CUSTOMIZE_FILES = 15;
const EXPECTED_TOTAL_MENU_ITEMS = 350; // Minimum (actual ~369)

describe('Customize File Loading Verification', () => {

  describe('Installation Location', () => {
    test('BAM customize directory exists', () => {
      expect(fs.existsSync(BAM_CUSTOMIZE_DIR)).toBe(true);
    });

    test(`has exactly ${EXPECTED_CUSTOMIZE_FILES} customize files`, () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));
      expect(files.length).toBe(EXPECTED_CUSTOMIZE_FILES);
    });

    test('top-level _config/agents has no BAM customize files (avoid duplication)', () => {
      if (fs.existsSync(TOP_LEVEL_CONFIG_DIR)) {
        const files = fs.readdirSync(TOP_LEVEL_CONFIG_DIR)
          .filter(f => f.endsWith('.customize.yaml'))
          .filter(f => f.includes('bmad-agent-') || f.includes('bmad-cis-') || f.includes('bmad-tea'));
        // Should be 0 - BAM customize files should only be in bam/_config/agents/
        expect(files.length).toBe(0);
      }
    });
  });

  describe('Customize File Content Structure', () => {
    // Actual customize files based on 31 extensions merging into 15 files
    const expectedCustomizeFiles = [
      'bmad-agent-architect.customize.yaml',
      'bmad-agent-analyst.customize.yaml',
      'bmad-agent-dev.customize.yaml',
      'bmad-agent-pm.customize.yaml',
      'bmad-agent-ux-designer.customize.yaml',
      'bmad-agent-tech-writer.customize.yaml',
      'bmad-tea.customize.yaml'
      // Note: bmad-agent-po is merged into bmad-agent-pm
    ];

    test.each(expectedCustomizeFiles)('%s exists', (filename) => {
      const filepath = path.join(BAM_CUSTOMIZE_DIR, filename);
      expect(fs.existsSync(filepath)).toBe(true);
    });

    test('all customize files are valid YAML', () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      for (const file of files) {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, file);
        const content = fs.readFileSync(filepath, 'utf8');
        expect(() => yaml.load(content)).not.toThrow();
      }
    });

    test('all customize files have required sections', () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      for (const file of files) {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, file);
        const content = yaml.load(fs.readFileSync(filepath, 'utf8'));

        // Must have memories section
        expect(content.memories).toBeDefined();
        expect(Array.isArray(content.memories)).toBe(true);

        // Must have menu section
        expect(content.menu).toBeDefined();
        expect(Array.isArray(content.menu)).toBe(true);
        expect(content.menu.length).toBeGreaterThan(0);

        // Must have prompts section
        expect(content.prompts).toBeDefined();
        expect(Array.isArray(content.prompts)).toBe(true);
        expect(content.prompts.length).toBeGreaterThan(0);
      }
    });

    test('customize files reference BAM in memories', () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      for (const file of files) {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, file);
        const content = yaml.load(fs.readFileSync(filepath, 'utf8'));

        const hasBAMReference = content.memories.some(m =>
          m.includes('BAM') || m.includes('multi-tenant') || m.includes('Multi-tenant')
        );
        expect(hasBAMReference).toBe(true);
      }
    });
  });

  describe('Agent-Extension Mapping', () => {
    // These customize files should have multiple extensions merged
    const expectedMappings = {
      'bmad-agent-architect.customize.yaml': {
        minMenuItems: 40,
        expectedMemories: ['BAM'],
        expectedTriggers: ['bam-platform-context', 'bam-ai-runtime-context']
      },
      'bmad-agent-analyst.customize.yaml': {
        minMenuItems: 10,
        expectedMemories: ['BAM'],
        expectedTriggers: ['bam-analyst-context']
      },
      'bmad-agent-dev.customize.yaml': {
        minMenuItems: 20,
        expectedMemories: ['BAM'],
        expectedTriggers: ['bam-dev-context']
      },
      'bmad-agent-pm.customize.yaml': {
        minMenuItems: 10,
        expectedMemories: ['BAM'],
        expectedTriggers: ['bam-pm-context']
      }
    };

    test.each(Object.entries(expectedMappings))(
      '%s has expected structure',
      (filename, expected) => {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, filename);
        if (!fs.existsSync(filepath)) {
          console.warn(`File not found: ${filename}`);
          return;
        }

        const content = yaml.load(fs.readFileSync(filepath, 'utf8'));

        // Check menu item count
        expect(content.menu.length).toBeGreaterThanOrEqual(expected.minMenuItems);

        // Check expected triggers exist
        const triggers = content.menu.map(m => m.trigger);
        for (const expectedTrigger of expected.expectedTriggers) {
          const hasTrigger = triggers.some(t => t.includes(expectedTrigger.split('-').slice(1).join('-')));
          expect(hasTrigger).toBe(true);
        }
      }
    );
  });

  describe('Menu-to-Prompt Mapping', () => {
    test('all menu actions reference existing prompts', () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      const errors = [];

      for (const file of files) {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, file);
        const content = yaml.load(fs.readFileSync(filepath, 'utf8'));

        const promptIds = new Set(content.prompts.map(p => p.id));

        for (const menuItem of content.menu) {
          if (menuItem.action && menuItem.action.startsWith('#')) {
            const promptId = menuItem.action.slice(1);
            if (!promptIds.has(promptId)) {
              errors.push(`${file}: Menu '${menuItem.trigger}' references missing prompt '${promptId}'`);
            }
          }
        }
      }

      if (errors.length > 0) {
        console.error('Broken menu-to-prompt references:', errors.slice(0, 10));
      }
      expect(errors).toEqual([]);
    });
  });

  describe('Prompt Guide References', () => {
    test('prompts reference existing agent guides', () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      const guidesDir = path.join(BAM_DATA_DIR, 'agent-guides/bam');
      const existingGuides = fs.existsSync(guidesDir)
        ? new Set(fs.readdirSync(guidesDir))
        : new Set();

      const errors = [];
      let totalRefs = 0;
      let validRefs = 0;

      for (const file of files) {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, file);
        const content = yaml.load(fs.readFileSync(filepath, 'utf8'));

        for (const prompt of content.prompts) {
          if (!prompt.content) continue;

          // Extract guide references from prompt content
          const guideRefs = prompt.content.match(/agent-guides\/bam\/([^\s`"']+\.md)/g) || [];

          for (const ref of guideRefs) {
            totalRefs++;
            const guideName = ref.replace('agent-guides/bam/', '');
            if (existingGuides.has(guideName)) {
              validRefs++;
            } else {
              errors.push(`${file} → ${prompt.id}: Missing guide '${guideName}'`);
            }
          }
        }
      }

      // At least 90% of guide references should resolve
      if (totalRefs > 0) {
        const validRate = validRefs / totalRefs;
        console.log(`Guide reference validity: ${(validRate * 100).toFixed(1)}% (${validRefs}/${totalRefs})`);
        expect(validRate).toBeGreaterThan(0.9);
      }

      if (errors.length > 0 && errors.length <= 10) {
        console.warn('Missing guide references:', errors);
      }
    });
  });

  describe('Total Coverage', () => {
    test('all customize files together provide comprehensive menu items', () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      let totalMenuItems = 0;
      const allTriggers = new Set();

      for (const file of files) {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, file);
        const content = yaml.load(fs.readFileSync(filepath, 'utf8'));

        totalMenuItems += content.menu.length;
        content.menu.forEach(m => allTriggers.add(m.trigger));
      }

      console.log(`Total menu items: ${totalMenuItems}`);
      console.log(`Unique triggers: ${allTriggers.size}`);

      // Should have at least 350 menu items across all customize files
      expect(totalMenuItems).toBeGreaterThanOrEqual(EXPECTED_TOTAL_MENU_ITEMS);
    });

    test('context loaders exist for major domains', () => {
      const files = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      const allTriggers = [];
      for (const file of files) {
        const filepath = path.join(BAM_CUSTOMIZE_DIR, file);
        const content = yaml.load(fs.readFileSync(filepath, 'utf8'));
        allTriggers.push(...content.menu.map(m => m.trigger));
      }

      // Major domain context loaders should exist (using actual BAM naming)
      const expectedContextLoaders = [
        'bam-platform-context',    // Platform architecture
        'bam-analyst-context',     // Analyst domain
        'bam-ai-runtime-context',  // AI runtime
        'bam-compliance-context'   // Compliance
      ];

      let foundCount = 0;
      for (const loader of expectedContextLoaders) {
        const hasLoader = allTriggers.some(t => t === loader);
        if (hasLoader) foundCount++;
      }

      console.log(`Found ${foundCount}/${expectedContextLoaders.length} major context loaders`);

      // Should have at least 3 of the major context loaders
      expect(foundCount).toBeGreaterThanOrEqual(3);
    });
  });
});
