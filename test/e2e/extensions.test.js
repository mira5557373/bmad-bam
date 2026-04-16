/**
 * E2E tests for Extension Capabilities
 * Validates all 31 extensions properly add capabilities to base agents
 *
 * Tests verify:
 * - Extension menu items are properly structured
 * - Context loaders reference existing agent guides
 * - All referenced resources (guides, templates, checklists) exist
 * - Extension targets are valid base agents
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', '..', 'src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'data', 'extensions');
const GUIDES_DIR = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
const TEMPLATES_DIR = path.join(SRC_DIR, 'data', 'templates');
const CHECKLISTS_DIR = path.join(SRC_DIR, 'data', 'checklists');

// Installed directory paths
const INSTALL_DIR = path.join(__dirname, '..', '..', '..', 'bmad-with-wds-bam');
const INSTALLED_EXTENSIONS_DIR = path.join(INSTALL_DIR, '_bmad', 'bam', 'data', 'extensions');
const INSTALLED_GUIDES_DIR = path.join(INSTALL_DIR, '_bmad', 'bam', 'data', 'agent-guides', 'bam');

// Helper to load all extensions
const getExtensions = (dir = EXTENSIONS_DIR) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.yaml'))
    .map(f => ({
      name: f,
      path: path.join(dir, f),
      content: yaml.load(fs.readFileSync(path.join(dir, f), 'utf-8'))
    }));
};

describe('E2E Extension Capabilities - BMM Extensions', () => {
  describe('E2E-EXT1: Architect Extension (architect-bam.yaml)', () => {
    const extPath = path.join(EXTENSIONS_DIR, 'architect-bam.yaml');

    test('extension exists', () => {
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('extends bmad-agent-architect', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe('bmad-agent-architect');
    });

    test('has context loader menu item', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const hasContextLoader = menu.some(m =>
        m.trigger && (m.trigger.includes('context') || m.trigger.includes('bam-'))
      );
      expect(hasContextLoader).toBe(true);
    });

    test('has Atlas persona capabilities (platform context)', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const prompts = ext.prompts || [];

      // Should have platform-related capabilities
      const hasPlatformCapability = menu.some(m =>
        m.trigger && m.trigger.includes('platform')
      ) || prompts.some(p =>
        p.content && p.content.includes('platform')
      );

      expect(hasPlatformCapability).toBe(true);
    });

    test('has Nova persona capabilities (runtime context)', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const prompts = ext.prompts || [];

      // Should have runtime-related capabilities
      const hasRuntimeCapability = menu.some(m =>
        m.trigger && m.trigger.includes('runtime')
      ) || prompts.some(p =>
        p.content && p.content.includes('runtime')
      );

      expect(hasRuntimeCapability).toBe(true);
    });

    test('has Kai persona capabilities (integration context)', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const prompts = ext.prompts || [];

      // Should have integration-related capabilities
      const hasIntegrationCapability = menu.some(m =>
        m.trigger && (m.trigger.includes('integration') || m.trigger.includes('facade') || m.trigger.includes('contract'))
      ) || prompts.some(p =>
        p.content && (p.content.includes('integration') || p.content.includes('facade'))
      );

      expect(hasIntegrationCapability).toBe(true);
    });

    test('all referenced agent guides exist', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const prompts = ext.prompts || [];
      const missingGuides = [];

      prompts.forEach(prompt => {
        if (prompt.content) {
          const guidePattern = /agent-guides\/bam\/([^`\s]+\.md)/g;
          let match;
          while ((match = guidePattern.exec(prompt.content)) !== null) {
            const guidePath = path.join(GUIDES_DIR, match[1]);
            if (!fs.existsSync(guidePath)) {
              missingGuides.push(match[1]);
            }
          }
        }
      });

      expect(missingGuides).toEqual([]);
    });
  });

  describe('E2E-EXT2: Analyst Extension (analyst-bam.yaml)', () => {
    const extPath = path.join(EXTENSIONS_DIR, 'analyst-bam.yaml');

    test('extension exists', () => {
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('extends bmad-agent-analyst', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe('bmad-agent-analyst');
    });

    test('has tenant requirements analysis capability', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const prompts = ext.prompts || [];

      const hasTenantCapability = menu.some(m =>
        m.trigger && (m.trigger.includes('tenant') || m.trigger.includes('multi-tenant'))
      ) || prompts.some(p =>
        p.content && p.content.includes('tenant')
      );

      expect(hasTenantCapability).toBe(true);
    });
  });

  describe('E2E-EXT3: Dev Extension (dev-bam.yaml)', () => {
    const extPath = path.join(EXTENSIONS_DIR, 'dev-bam.yaml');

    test('extension exists', () => {
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('extends bmad-agent-dev', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe('bmad-agent-dev');
    });

    test('has RLS implementation capability', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const prompts = ext.prompts || [];

      const hasRLSCapability = menu.some(m =>
        m.trigger && (m.trigger.includes('rls') || m.trigger.includes('isolation'))
      ) || prompts.some(p =>
        p.content && (p.content.includes('RLS') || p.content.includes('row-level'))
      );

      expect(hasRLSCapability).toBe(true);
    });

    test('includes QA capabilities (merged from QA agent)', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const prompts = ext.prompts || [];

      // Should have testing-related capabilities
      const hasQACapability = menu.some(m =>
        m.trigger && (m.trigger.includes('test') || m.trigger.includes('qa') || m.trigger.includes('quality'))
      ) || prompts.some(p =>
        p.content && (p.content.includes('test') || p.content.includes('quality'))
      );

      expect(hasQACapability).toBe(true);
    });
  });

  describe('E2E-EXT4: PM Extension (pm-bam.yaml)', () => {
    const extPath = path.join(EXTENSIONS_DIR, 'pm-bam.yaml');

    test('extension exists', () => {
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('extends bmad-agent-pm', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe('bmad-agent-pm');
    });

    test('has multi-tenant product management capability', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const prompts = ext.prompts || [];

      const hasPMCapability = prompts.some(p =>
        p.content && (p.content.includes('tenant') || p.content.includes('SaaS'))
      );

      expect(hasPMCapability).toBe(true);
    });
  });
});

describe('E2E Extension Capabilities - TEA Extension', () => {
  describe('E2E-TEA1: TEA Extension (tea-bam.yaml)', () => {
    const extPath = path.join(EXTENSIONS_DIR, 'tea-bam.yaml');

    test('extension exists', () => {
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('extends bmad-tea', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe('bmad-tea');
    });

    test('has tenant isolation testing capability', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const menu = ext.menu || [];
      const prompts = ext.prompts || [];

      const hasIsolationTestCapability = menu.some(m =>
        m.trigger && (m.trigger.includes('isolation') || m.trigger.includes('tenant'))
      ) || prompts.some(p =>
        p.content && (p.content.includes('isolation') || p.content.includes('cross-tenant'))
      );

      expect(hasIsolationTestCapability).toBe(true);
    });

    test('references TEA testing capabilities for QG-I2/I3', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const prompts = ext.prompts || [];

      // Should reference TEA testing guides or patterns
      const hasTeaTestingRef = prompts.some(p =>
        p.content && (
          p.content.includes('tea-') ||
          p.content.includes('TEA') ||
          p.content.includes('test') ||
          p.content.includes('isolation')
        )
      );

      // TEA extension should have testing-related capabilities
      expect(hasTeaTestingRef).toBe(true);
    });
  });
});

describe('E2E Extension Capabilities - WDS Extensions', () => {
  describe('E2E-EXT4: WDS Saga Extension (wds-saga-bam.yaml)', () => {
    const extPath = path.join(EXTENSIONS_DIR, 'wds-saga-bam.yaml');

    test('extension exists', () => {
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('extends wds-agent-saga-analyst', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe('wds-agent-saga-analyst');
    });

    test('has multi-tenant persona capability', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const prompts = ext.prompts || [];

      const hasPersonaCapability = prompts.some(p =>
        p.content && (p.content.includes('persona') || p.content.includes('tier'))
      );

      expect(hasPersonaCapability).toBe(true);
    });
  });

  describe('E2E-EXT5: WDS Freya Extension (wds-freya-bam.yaml)', () => {
    const extPath = path.join(EXTENSIONS_DIR, 'wds-freya-bam.yaml');

    test('extension exists', () => {
      expect(fs.existsSync(extPath)).toBe(true);
    });

    test('extends wds-agent-freya-ux', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe('wds-agent-freya-ux');
    });

    test('has tier-specific UX capability', () => {
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      const prompts = ext.prompts || [];

      const hasTierUXCapability = prompts.some(p =>
        p.content && (p.content.includes('tier') || p.content.includes('FREE') || p.content.includes('PRO'))
      );

      expect(hasTierUXCapability).toBe(true);
    });
  });
});

describe('E2E Extension Capabilities - CIS Extensions', () => {
  const cisExtensions = [
    { file: 'cis-brainstorming-bam.yaml', target: 'bmad-cis-agent-brainstorming-coach' },
    { file: 'cis-design-thinking-bam.yaml', target: 'bmad-cis-agent-design-thinking-coach' },
    { file: 'cis-disruption-bam.yaml', target: 'bmad-cis-agent-innovation-strategist' },
    { file: 'cis-futures-bam.yaml', target: 'bmad-cis-agent-innovation-strategist' },
    { file: 'cis-innovation-bam.yaml', target: 'bmad-cis-agent-innovation-strategist' },
    { file: 'cis-market-bam.yaml', target: 'bmad-cis-agent-innovation-strategist' },
    { file: 'cis-platform-bam.yaml', target: 'bmad-cis-agent-innovation-strategist' },
    { file: 'cis-presentation-bam.yaml', target: 'bmad-cis-agent-presentation-master' },
    { file: 'cis-problem-solver-bam.yaml', target: 'bmad-cis-agent-creative-problem-solver' },
    { file: 'cis-scale-bam.yaml', target: 'bmad-cis-agent-innovation-strategist' },
    { file: 'cis-storyteller-bam.yaml', target: 'bmad-cis-agent-storyteller' },
    { file: 'cis-value-bam.yaml', target: 'bmad-cis-agent-innovation-strategist' }
  ];

  test('all 12 CIS extensions exist', () => {
    cisExtensions.forEach(ext => {
      const extPath = path.join(EXTENSIONS_DIR, ext.file);
      expect(fs.existsSync(extPath)).toBe(true);
    });
  });

  cisExtensions.forEach(({ file, target }) => {
    test(`${file} extends ${target}`, () => {
      const extPath = path.join(EXTENSIONS_DIR, file);
      const ext = yaml.load(fs.readFileSync(extPath, 'utf-8'));
      expect(ext.agent.metadata.extends).toBe(target);
    });
  });

  test('CIS extensions add SaaS-specific capabilities', () => {
    const ext = yaml.load(fs.readFileSync(
      path.join(EXTENSIONS_DIR, 'cis-innovation-bam.yaml'),
      'utf-8'
    ));
    const prompts = ext.prompts || [];

    const hasSaaSCapability = prompts.some(p =>
      p.content && (p.content.includes('SaaS') || p.content.includes('multi-tenant'))
    );

    expect(hasSaaSCapability).toBe(true);
  });
});

describe('E2E Extension Capabilities - Complete Coverage', () => {
  test('exactly 31 extensions exist', () => {
    const extensions = getExtensions();
    expect(extensions.length).toBe(31);
  });

  test('all extensions have module: bam', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      expect(ext.content.agent.metadata.module).toBe('bam');
    });
  });

  test('all extensions follow WDS pattern (no memories field)', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      expect(ext.content).not.toHaveProperty('memories');
      if (ext.content.agent) {
        expect(ext.content.agent).not.toHaveProperty('memories');
      }
    });
  });

  test('all extensions have at least one prompt', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      const prompts = ext.content.prompts || [];
      expect(prompts.length).toBeGreaterThan(0);
    });
  });

  test('all menu actions reference existing prompts', () => {
    const extensions = getExtensions();
    const missingRefs = [];

    extensions.forEach(ext => {
      const prompts = ext.content.prompts || [];
      const promptIds = prompts.map(p => `#${p.id}`);
      const menu = ext.content.menu || [];

      menu.forEach(item => {
        if (item.action && item.action.startsWith('#')) {
          if (!promptIds.includes(item.action)) {
            missingRefs.push({
              extension: ext.name,
              action: item.action
            });
          }
        }
      });
    });

    if (missingRefs.length > 0) {
      console.error('Missing prompt references:');
      missingRefs.forEach(m => console.error(`  ${m.extension}: ${m.action}`));
    }

    expect(missingRefs).toEqual([]);
  });

  describe('Extension Resource References', () => {
    test('all agent guide references in extensions exist', () => {
      const extensions = getExtensions();
      const missingGuides = [];

      extensions.forEach(ext => {
        const prompts = ext.content.prompts || [];

        prompts.forEach(prompt => {
          if (prompt.content) {
            const guidePattern = /agent-guides\/bam\/([^`\s]+\.md)/g;
            let match;
            while ((match = guidePattern.exec(prompt.content)) !== null) {
              const guidePath = path.join(GUIDES_DIR, match[1]);
              if (!fs.existsSync(guidePath)) {
                missingGuides.push({
                  extension: ext.name,
                  guide: match[1]
                });
              }
            }
          }
        });
      });

      if (missingGuides.length > 0) {
        console.error('Missing agent guides:');
        missingGuides.forEach(m => console.error(`  ${m.extension} -> ${m.guide}`));
      }

      expect(missingGuides).toEqual([]);
    });

    test('all template references in extensions exist', () => {
      const extensions = getExtensions();
      const missingTemplates = [];

      extensions.forEach(ext => {
        const prompts = ext.content.prompts || [];

        prompts.forEach(prompt => {
          if (prompt.content) {
            const templatePattern = /templates\/([^`\s]+\.md)/g;
            let match;
            while ((match = templatePattern.exec(prompt.content)) !== null) {
              const templatePath = path.join(TEMPLATES_DIR, match[1]);
              if (!fs.existsSync(templatePath)) {
                missingTemplates.push({
                  extension: ext.name,
                  template: match[1]
                });
              }
            }
          }
        });
      });

      if (missingTemplates.length > 0) {
        console.error('Missing templates:');
        missingTemplates.forEach(m => console.error(`  ${m.extension} -> ${m.template}`));
      }

      expect(missingTemplates).toEqual([]);
    });

    test('all checklist references in extensions exist', () => {
      const extensions = getExtensions();
      const missingChecklists = [];

      extensions.forEach(ext => {
        const prompts = ext.content.prompts || [];

        prompts.forEach(prompt => {
          if (prompt.content) {
            const checklistPattern = /checklists\/([^`\s]+\.md)/g;
            let match;
            while ((match = checklistPattern.exec(prompt.content)) !== null) {
              const checklistPath = path.join(CHECKLISTS_DIR, match[1]);
              if (!fs.existsSync(checklistPath)) {
                missingChecklists.push({
                  extension: ext.name,
                  checklist: match[1]
                });
              }
            }
          }
        });
      });

      if (missingChecklists.length > 0) {
        console.error('Missing checklists:');
        missingChecklists.forEach(m => console.error(`  ${m.extension} -> ${m.checklist}`));
      }

      expect(missingChecklists).toEqual([]);
    });
  });
});

describe('E2E Extension Capabilities - Installed Verification', () => {
  const installExists = fs.existsSync(INSTALL_DIR);
  const extensionsExist = installExists && fs.existsSync(INSTALLED_EXTENSIONS_DIR);

  const describeFn = extensionsExist ? describe : describe.skip;

  describeFn('Installed Extensions Match Source', () => {
    test('all 31 extensions installed', () => {
      const installedExtensions = getExtensions(INSTALLED_EXTENSIONS_DIR);
      expect(installedExtensions.length).toBe(31);
    });

    test('extension content matches source', () => {
      const sourceExtensions = getExtensions(EXTENSIONS_DIR);
      const installedExtensions = getExtensions(INSTALLED_EXTENSIONS_DIR);

      sourceExtensions.forEach(srcExt => {
        const instExt = installedExtensions.find(e => e.name === srcExt.name);
        expect(instExt).toBeDefined();

        // Compare key fields
        expect(instExt.content.agent.metadata.extends)
          .toBe(srcExt.content.agent.metadata.extends);
      });
    });
  });

  describeFn('Installed Agent Guides Exist', () => {
    test('agent guides directory exists', () => {
      expect(fs.existsSync(INSTALLED_GUIDES_DIR)).toBe(true);
    });

    test('referenced guides exist in installed location', () => {
      const extensions = getExtensions(INSTALLED_EXTENSIONS_DIR);
      const missingGuides = [];

      extensions.forEach(ext => {
        const prompts = ext.content.prompts || [];

        prompts.forEach(prompt => {
          if (prompt.content) {
            const guidePattern = /agent-guides\/bam\/([^`\s]+\.md)/g;
            let match;
            while ((match = guidePattern.exec(prompt.content)) !== null) {
              const guidePath = path.join(INSTALLED_GUIDES_DIR, match[1]);
              if (!fs.existsSync(guidePath)) {
                missingGuides.push({
                  extension: ext.name,
                  guide: match[1]
                });
              }
            }
          }
        });
      });

      expect(missingGuides).toEqual([]);
    });
  });
});
