/**
 * Extension integration validation tests (Tier 2)
 * Validates extensions properly integrate with base agents
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'data', 'extensions');
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

      const missingWhenToLoad = [];
      guides.forEach(guide => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, guide), 'utf-8');

        // Should have loading instructions
        const hasWhenToLoad =
          content.includes('When to load') ||
          content.includes('when to load') ||
          content.includes('**When');

        if (!hasWhenToLoad) {
          missingWhenToLoad.push(guide);
        }
      });

      if (missingWhenToLoad.length > 0) {
        console.error('Agent guides missing "When to load" section:', missingWhenToLoad);
      }
      expect(missingWhenToLoad).toEqual([]);
    });
  });

  describe('Base Agent Compatibility', () => {
    const baseAgentMapping = {
      'analyst-bam.yaml': 'bmad-agent-analyst',
      'architect-bam.yaml': 'bmad-agent-architect',
      'dev-bam.yaml': 'bmad-agent-dev',
      'pm-bam.yaml': 'bmad-agent-pm',
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

      // Find duplicates
      const duplicates = triggers.filter((t, i) => triggers.indexOf(t) !== i);

      // Filter out documented exceptions (bam-context variants that are intentionally shared)
      const allowedDuplicates = ['bam-context', 'load-bam-context'];
      const unexpectedDuplicates = duplicates.filter(d => !allowedDuplicates.includes(d));

      // Fail if there are unexpected duplicates
      expect(unexpectedDuplicates).toEqual([]);
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

describe('Reference Validation', () => {
  const getExtensions = () => {
    return fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'))
      .map(f => ({
        name: f,
        content: yaml.load(fs.readFileSync(path.join(EXTENSIONS_DIR, f), 'utf-8'))
      }));
  };

  test('all agent guide references in prompts exist', () => {
    const extensions = getExtensions();
    const missingGuides = [];

    extensions.forEach(ext => {
      const prompts = ext.content.prompts || [];

      prompts.forEach(prompt => {
        if (prompt.content) {
          // Extract all agent-guides/bam/*.md references
          const guidePattern = /agent-guides\/bam\/([^`\s]+\.md)/g;
          let match;

          while ((match = guidePattern.exec(prompt.content)) !== null) {
            const guideName = match[1];
            const guidePath = path.join(GUIDES_DIR, guideName);

            if (!fs.existsSync(guidePath)) {
              missingGuides.push({
                extension: ext.name,
                guide: guideName
              });
            }
          }
        }
      });
    });

    if (missingGuides.length > 0) {
      console.error('Missing agent guides referenced in extensions:');
      missingGuides.forEach(m => console.error(`  ${m.extension} -> ${m.guide}`));
    }

    expect(missingGuides).toEqual([]);
  });

  test('all template references in prompts exist', () => {
    const extensions = getExtensions();
    const TEMPLATES_DIR = path.join(SRC_DIR, 'data', 'templates');
    const missingTemplates = [];

    extensions.forEach(ext => {
      const prompts = ext.content.prompts || [];

      prompts.forEach(prompt => {
        if (prompt.content) {
          // Extract all templates/*.md references
          const templatePattern = /templates\/([^`\s]+\.md)/g;
          let match;

          while ((match = templatePattern.exec(prompt.content)) !== null) {
            const templateName = match[1];
            const templatePath = path.join(TEMPLATES_DIR, templateName);

            if (!fs.existsSync(templatePath)) {
              missingTemplates.push({
                extension: ext.name,
                template: templateName
              });
            }
          }
        }
      });
    });

    if (missingTemplates.length > 0) {
      console.error('Missing templates referenced in extensions:');
      missingTemplates.forEach(m => console.error(`  ${m.extension} -> ${m.template}`));
    }

    expect(missingTemplates).toEqual([]);
  });

  test('all checklist references in prompts exist', () => {
    const extensions = getExtensions();
    const CHECKLISTS_DIR = path.join(SRC_DIR, 'data', 'checklists');
    const missingChecklists = [];

    extensions.forEach(ext => {
      const prompts = ext.content.prompts || [];

      prompts.forEach(prompt => {
        if (prompt.content) {
          // Extract all checklists/*.md references
          const checklistPattern = /checklists\/([^`\s]+\.md)/g;
          let match;

          while ((match = checklistPattern.exec(prompt.content)) !== null) {
            const checklistName = match[1];
            const checklistPath = path.join(CHECKLISTS_DIR, checklistName);

            if (!fs.existsSync(checklistPath)) {
              missingChecklists.push({
                extension: ext.name,
                checklist: checklistName
              });
            }
          }
        }
      });
    });

    if (missingChecklists.length > 0) {
      console.error('Missing checklists referenced in extensions:');
      missingChecklists.forEach(m => console.error(`  ${m.extension} -> ${m.checklist}`));
    }

    expect(missingChecklists).toEqual([]);
  });
});

describe('Extension Target Validation', () => {
  const getExtensions = () => {
    return fs.readdirSync(EXTENSIONS_DIR)
      .filter(f => f.endsWith('.yaml'))
      .map(f => ({
        name: f,
        content: yaml.load(fs.readFileSync(path.join(EXTENSIONS_DIR, f), 'utf-8'))
      }));
  };

  // Valid base agents that BAM extensions can target
  const VALID_BASE_AGENTS = [
    // BMM agents
    'bmad-agent-analyst',
    'bmad-agent-architect',
    'bmad-agent-dev',
    'bmad-agent-pm',
    'bmad-agent-ux-designer',
    'bmad-agent-tech-writer',
    // TEA agent
    'bmad-tea',
    // WDS agents
    'wds-agent-saga-analyst',
    'wds-agent-freya-ux',
    // CIS agents
    'bmad-cis-agent-brainstorming-coach',
    'bmad-cis-agent-design-thinking-coach',
    'bmad-cis-agent-innovation-strategist',
    'bmad-cis-agent-presentation-master',
    'bmad-cis-agent-creative-problem-solver',
    'bmad-cis-agent-storyteller',
  ];

  test('all extensions target valid base agents', () => {
    const extensions = getExtensions();
    const invalidTargets = [];

    extensions.forEach(ext => {
      if (ext.content.agent && ext.content.agent.metadata) {
        const target = ext.content.agent.metadata.extends;

        if (target && !VALID_BASE_AGENTS.includes(target)) {
          invalidTargets.push({
            extension: ext.name,
            target: target
          });
        }
      }
    });

    if (invalidTargets.length > 0) {
      console.error('Extensions with invalid base agent targets:');
      invalidTargets.forEach(i => console.error(`  ${i.extension} -> ${i.target}`));
    }

    expect(invalidTargets).toEqual([]);
  });

  test('all extensions have extends field in metadata', () => {
    const extensions = getExtensions();
    const missingExtends = [];

    extensions.forEach(ext => {
      if (!ext.content.agent ||
          !ext.content.agent.metadata ||
          !ext.content.agent.metadata.extends) {
        missingExtends.push(ext.name);
      }
    });

    if (missingExtends.length > 0) {
      console.error('Extensions missing extends field:', missingExtends);
    }

    expect(missingExtends).toEqual([]);
  });

  test('extension count matches expected (31 extensions)', () => {
    const extensions = getExtensions();
    expect(extensions.length).toBe(31);
  });
});
