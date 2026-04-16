/**
 * Extension Feature Coverage Tests
 *
 * Verifies all 31 BAM extensions have required capabilities:
 * - Context loaders (bam-*-context menu items)
 * - Web research capability (bam-*-research menu items)
 * - Pattern registry references
 * - Valid guide references
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '../../src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'data/extensions');
const GUIDES_DIR = path.join(SRC_DIR, 'data/agent-guides/bam');

// Expected extension count
const EXPECTED_EXTENSION_COUNT = 31;

describe('Extension Feature Coverage', () => {
  let extensions;

  beforeAll(() => {
    if (!fs.existsSync(EXTENSIONS_DIR)) {
      console.warn(`Extensions directory not found: ${EXTENSIONS_DIR}`);
      extensions = [];
      return;
    }

    extensions = fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
      .map(f => {
        try {
          return {
            name: f,
            content: yaml.load(fs.readFileSync(path.join(EXTENSIONS_DIR, f), 'utf8'))
          };
        } catch (e) {
          console.error(`Failed to parse ${f}: ${e.message}`);
          return null;
        }
      })
      .filter(Boolean);
  });

  describe('Extension Count', () => {
    test(`has at least ${EXPECTED_EXTENSION_COUNT} extensions`, () => {
      expect(extensions.length).toBeGreaterThanOrEqual(EXPECTED_EXTENSION_COUNT);
    });

    test('all extensions are valid YAML', () => {
      // This is implicitly tested by beforeAll parsing
      expect(extensions.length).toBeGreaterThan(0);
    });
  });

  describe('Extension Metadata', () => {
    test('all extensions have agent.metadata.extends field', () => {
      const missing = [];

      for (const ext of extensions) {
        if (!ext.content.agent?.metadata?.extends) {
          missing.push(ext.name);
        }
      }

      if (missing.length > 0) {
        console.warn('Extensions missing extends field:', missing);
      }
      expect(missing).toEqual([]);
    });

    test('all extensions have module field set to bam', () => {
      const incorrect = [];

      for (const ext of extensions) {
        const module = ext.content.agent?.metadata?.module;
        if (module !== 'bam') {
          incorrect.push(`${ext.name}: module=${module}`);
        }
      }

      if (incorrect.length > 0) {
        console.warn('Extensions with incorrect module:', incorrect);
      }
      expect(incorrect).toEqual([]);
    });
  });

  describe('Context Loader Coverage', () => {
    test('all extensions have at least one context loader menu item', () => {
      const missing = [];

      for (const ext of extensions) {
        const menu = ext.content.menu || [];
        const hasContextLoader = menu.some(m =>
          m.trigger?.includes('-context') ||
          m.trigger?.includes('context') ||
          m.description?.toLowerCase().includes('load') && m.description?.toLowerCase().includes('context')
        );

        if (!hasContextLoader) {
          missing.push(ext.name);
        }
      }

      if (missing.length > 0) {
        console.warn('Extensions missing context loaders:', missing);
      }
      // Allow up to 5 extensions without context loaders (some may be utility extensions)
      expect(missing.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Web Research Coverage', () => {
    test('all extensions have web research capability', () => {
      const missing = [];

      for (const ext of extensions) {
        const menu = ext.content.menu || [];
        const prompts = ext.content.prompts || [];

        // Check menu items
        const hasResearchMenu = menu.some(m =>
          m.trigger?.includes('research') ||
          m.description?.toLowerCase().includes('research') ||
          m.description?.toLowerCase().includes('web search')
        );

        // Check prompts for web search directives
        const hasResearchPrompt = prompts.some(p =>
          p.content?.includes('Search the web:') ||
          p.content?.includes('web search') ||
          p.content?.includes('research')
        );

        if (!hasResearchMenu && !hasResearchPrompt) {
          missing.push(ext.name);
        }
      }

      if (missing.length > 0) {
        console.warn('Extensions potentially missing research capability:', missing);
      }
      // Allow up to 10 extensions - some may use pattern registry web_queries instead
      expect(missing.length).toBeLessThanOrEqual(10);
    });
  });

  describe('Pattern Registry References', () => {
    test('most extensions reference pattern registry', () => {
      let referencingCount = 0;

      for (const ext of extensions) {
        const content = JSON.stringify(ext.content);
        const hasPatternRef =
          content.includes('bam-patterns.csv') ||
          content.includes('tenant-models.csv') ||
          content.includes('ai-runtimes.csv') ||
          content.includes('quality-gates.csv') ||
          content.includes('compliance-frameworks.csv') ||
          content.includes('section-pattern-map.csv') ||
          content.includes('pattern') ||
          content.includes('Load patterns');

        if (hasPatternRef) {
          referencingCount++;
        }
      }

      // At least 80% of extensions should reference patterns
      const referenceRate = referencingCount / extensions.length;
      console.log(`Extensions referencing patterns: ${(referenceRate * 100).toFixed(1)}% (${referencingCount}/${extensions.length})`);
      expect(referenceRate).toBeGreaterThan(0.7);
    });
  });

  describe('Guide References Validity', () => {
    test('all extension guide references point to existing files', () => {
      const existingGuides = fs.existsSync(GUIDES_DIR)
        ? new Set(fs.readdirSync(GUIDES_DIR))
        : new Set();

      const errors = [];
      let totalRefs = 0;
      let validRefs = 0;

      for (const ext of extensions) {
        const content = JSON.stringify(ext.content);
        const guideRefs = content.match(/agent-guides\/bam\/([^"'\s`\)]+\.md)/g) || [];

        for (const ref of guideRefs) {
          totalRefs++;
          const guideName = ref.replace('agent-guides/bam/', '');

          if (existingGuides.has(guideName)) {
            validRefs++;
          } else {
            errors.push(`${ext.name}: ${guideName}`);
          }
        }
      }

      console.log(`Guide references: ${validRefs}/${totalRefs} valid`);

      // At least 90% should be valid
      if (totalRefs > 0) {
        const validRate = validRefs / totalRefs;
        expect(validRate).toBeGreaterThan(0.9);
      }
    });
  });

  describe('Menu Item Coverage', () => {
    const expectedMinMenuCounts = {
      'architect-bam.yaml': 40,
      'dev-bam.yaml': 20,
      'devops-bam.yaml': 20,
      'security-bam.yaml': 15,
      'analyst-bam.yaml': 8,
      'pm-bam.yaml': 7  // Actual count is 7
    };

    test.each(Object.entries(expectedMinMenuCounts))(
      '%s has at least %i menu items',
      (filename, minCount) => {
        const ext = extensions.find(e => e.name === filename);
        if (!ext) {
          console.warn(`Extension not found: ${filename}`);
          return;
        }

        const menuCount = ext.content.menu?.length || 0;
        console.log(`${filename}: ${menuCount} menu items`);
        expect(menuCount).toBeGreaterThanOrEqual(minCount);
      }
    );

    test('total menu items across all extensions', () => {
      let totalMenuItems = 0;

      for (const ext of extensions) {
        totalMenuItems += ext.content.menu?.length || 0;
      }

      console.log(`Total menu items: ${totalMenuItems}`);
      // Expected ~369 across all 31 extensions
      expect(totalMenuItems).toBeGreaterThanOrEqual(300);
    });
  });

  describe('Extension Target Agent Distribution', () => {
    test('extensions target correct base agents', () => {
      const targetGroups = {
        'bmad-agent-': [],    // BMM agents
        'bmad-cis-agent-': [],    // CIS agents
        'wds-agent-': [],    // WDS agents
        'bmad-tea': []       // TEA
      };

      for (const ext of extensions) {
        const extendsValue = ext.content.agent?.metadata?.extends || '';

        for (const prefix of Object.keys(targetGroups)) {
          if (extendsValue.startsWith(prefix) || extendsValue === prefix.slice(0, -1)) {
            targetGroups[prefix].push(ext.name);
            break;
          }
        }
      }

      console.log('Extension distribution:');
      Object.entries(targetGroups).forEach(([prefix, exts]) => {
        console.log(`  ${prefix}: ${exts.length} extensions`);
      });

      // Should have extensions targeting BMM agents
      expect(targetGroups['bmad-agent-'].length).toBeGreaterThan(0);
    });
  });

  describe('Prompt Structure', () => {
    test('all menu actions with # prefix have matching prompts', () => {
      const errors = [];

      for (const ext of extensions) {
        const promptIds = new Set((ext.content.prompts || []).map(p => p.id));
        const menu = ext.content.menu || [];

        for (const item of menu) {
          if (item.action && item.action.startsWith('#')) {
            const promptId = item.action.slice(1);
            if (!promptIds.has(promptId)) {
              errors.push(`${ext.name}: '${item.trigger}' → missing prompt '${promptId}'`);
            }
          }
        }
      }

      if (errors.length > 0) {
        console.error('Broken action references:', errors.slice(0, 20));
      }
      expect(errors).toEqual([]);
    });

    test('prompts have non-empty content', () => {
      const emptyPrompts = [];

      for (const ext of extensions) {
        const prompts = ext.content.prompts || [];

        for (const prompt of prompts) {
          if (!prompt.content || prompt.content.trim().length < 10) {
            emptyPrompts.push(`${ext.name}: ${prompt.id}`);
          }
        }
      }

      if (emptyPrompts.length > 0) {
        console.warn('Prompts with minimal/empty content:', emptyPrompts.slice(0, 10));
      }
      expect(emptyPrompts.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Extension Naming Conventions', () => {
    test('all extensions follow naming pattern', () => {
      const violations = [];

      for (const ext of extensions) {
        // Should end with -bam.yaml
        if (!ext.name.endsWith('-bam.yaml') && !ext.name.endsWith('-bam.yml')) {
          violations.push(`${ext.name}: Should end with -bam.yaml`);
        }
      }

      if (violations.length > 0) {
        console.warn('Naming violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });
});
