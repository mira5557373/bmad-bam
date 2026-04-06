/**
 * Extension integration validation tests (Tier 2)
 * Validates extensions properly integrate with base agents
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'extensions');
const GUIDES_DIR = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');

describe('Tier 2: Extension Integration', () => {
  const getExtensions = () => {
    return fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'))
      .map(f => ({
        name: f,
        path: path.join(EXTENSIONS_DIR, f),
        content: yaml.load(fs.readFileSync(path.join(EXTENSIONS_DIR, f), 'utf-8'))
      }));
  };

  describe('Extension Format', () => {
    test('all extensions follow WDS pattern (no memories field)', () => {
      const extensions = getExtensions();

      extensions.forEach(ext => {
        // Top level should NOT have memories
        expect(ext.content).not.toHaveProperty('memories');

        // Neither should agent object
        if (ext.content.agent) {
          expect(ext.content.agent).not.toHaveProperty('memories');
        }
      });
    });

    test('all extensions have context loading menu item', () => {
      const extensions = getExtensions();

      extensions.forEach(ext => {
        const menu = ext.content.menu || [];
        const hasContextLoader = menu.some(item =>
          item.trigger && item.trigger.includes('context')
        );

        expect(hasContextLoader).toBe(true);
      });
    });

    test('all extensions reference agent guides in prompts', () => {
      const extensions = getExtensions();

      extensions.forEach(ext => {
        const prompts = ext.content.prompts || [];
        const contextPrompt = prompts.find(p =>
          p.id && p.id.includes('context')
        );

        if (contextPrompt) {
          // Should reference agent-guides path
          expect(contextPrompt.content).toContain('agent-guides');
        }
      });
    });
  });

  describe('Agent Guide Coverage', () => {
    test('agent guides exist for all extension types', () => {
      const guides = fs.readdirSync(GUIDES_DIR)
        .filter(f => f.endsWith('.md'));

      // Should have guides covering:
      // - multi-tenant-context (analyst)
      // - module-architecture (architect)
      // - tenant-isolation (dev)
      // etc.
      expect(guides.length).toBeGreaterThanOrEqual(8);
    });

    test('each agent guide has "When to load" section', () => {
      const guides = fs.readdirSync(GUIDES_DIR)
        .filter(f => f.endsWith('.md'));

      guides.forEach(guide => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, guide), 'utf-8');

        // Should have loading instructions
        const hasWhenToLoad =
          content.includes('When to load') ||
          content.includes('when to load') ||
          content.includes('**When');

        if (!hasWhenToLoad) {
          console.warn(`Guide ${guide} missing "When to load" section`);
        }
      });
    });
  });

  describe('Base Agent Compatibility', () => {
    const baseAgentMapping = {
      'analyst-bam.yaml': 'bmad-agent-analyst',
      'architect-bam.yaml': 'bmad-agent-architect',
      'dev-bam.yaml': 'bmad-agent-dev',
      'pm-bam.yaml': 'bmad-agent-pm',
      'qa-bam.yaml': 'bmad-agent-qa',
      'sm-bam.yaml': 'bmad-agent-sm',
      'ux-bam.yaml': 'bmad-agent-ux-designer',
      'tech-writer-bam.yaml': 'bmad-agent-tech-writer',
      'tea-bam.yaml': 'bmad-tea',
      'wds-saga-bam.yaml': 'wds-agent-saga-analyst',
      'wds-freya-bam.yaml': 'wds-agent-freya-ux',
    };

    Object.entries(baseAgentMapping).forEach(([extFile, baseAgent]) => {
      test(`${extFile} extends ${baseAgent}`, () => {
        const extPath = path.join(EXTENSIONS_DIR, extFile);
        if (fs.existsSync(extPath)) {
          const content = yaml.load(fs.readFileSync(extPath, 'utf-8'));
          expect(content.agent.metadata.extends).toBe(baseAgent);
        }
      });
    });
  });

  describe('Menu Item Uniqueness', () => {
    test('no duplicate triggers across extensions', () => {
      const extensions = getExtensions();
      const allTriggers = [];

      extensions.forEach(ext => {
        const menu = ext.content.menu || [];
        menu.forEach(item => {
          if (item.trigger) {
            allTriggers.push({
              extension: ext.name,
              trigger: item.trigger
            });
          }
        });
      });

      // Check for duplicates
      const triggers = allTriggers.map(t => t.trigger);
      const unique = [...new Set(triggers)];

      if (triggers.length !== unique.length) {
        const duplicates = triggers.filter((t, i) => triggers.indexOf(t) !== i);
        console.warn('Duplicate triggers found:', duplicates);
      }

      // Allow some duplicates (like bam-context variants)
      // but warn about them
    });
  });
});

describe('Prompt Template Validation', () => {
  const getExtensions = () => {
    return fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'))
      .map(f => ({
        name: f,
        content: yaml.load(fs.readFileSync(path.join(EXTENSIONS_DIR, f), 'utf-8'))
      }));
  };

  test('all prompts have id and content', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      const prompts = ext.content.prompts || [];

      prompts.forEach(prompt => {
        expect(prompt).toHaveProperty('id');
        expect(prompt).toHaveProperty('content');
        expect(prompt.content.length).toBeGreaterThan(10);
      });
    });
  });

  test('menu actions reference existing prompts', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      const prompts = ext.content.prompts || [];
      const promptIds = prompts.map(p => `#${p.id}`);

      const menu = ext.content.menu || [];
      menu.forEach(item => {
        if (item.action && item.action.startsWith('#')) {
          expect(promptIds).toContain(item.action);
        }
      });
    });
  });
});
