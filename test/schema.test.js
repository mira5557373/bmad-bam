/**
 * Schema validation tests for BAM module
 * Validates YAML structure against BMAD patterns
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');

describe('Agent Schema Validation', () => {
  const agentsDir = path.join(SRC_DIR, 'agents');

  const getAgentDirs = () => {
    if (!fs.existsSync(agentsDir)) return [];
    return fs.readdirSync(agentsDir)
      .filter(f => fs.statSync(path.join(agentsDir, f)).isDirectory());
  };

  test('each agent has bmad-skill-manifest.yaml', () => {
    const agents = getAgentDirs();
    expect(agents.length).toBeGreaterThan(0);

    agents.forEach(agent => {
      const manifestPath = path.join(agentsDir, agent, 'bmad-skill-manifest.yaml');
      expect(fs.existsSync(manifestPath)).toBe(true);
    });
  });

  test('each agent has SKILL.md', () => {
    const agents = getAgentDirs();

    agents.forEach(agent => {
      const skillPath = path.join(agentsDir, agent, 'SKILL.md');
      expect(fs.existsSync(skillPath)).toBe(true);
    });
  });

  test('agent manifests have required fields', () => {
    const agents = getAgentDirs();
    const requiredFields = ['type', 'name', 'capabilities', 'module'];

    agents.forEach(agent => {
      const manifestPath = path.join(agentsDir, agent, 'bmad-skill-manifest.yaml');
      const content = fs.readFileSync(manifestPath, 'utf-8');
      const manifest = yaml.load(content);

      requiredFields.forEach(field => {
        expect(manifest).toHaveProperty(field);
      });

      expect(manifest.type).toBe('agent');
      expect(manifest.module).toBe('bam');
    });
  });

  test('agent capabilities are comma-separated strings, not arrays', () => {
    const agents = getAgentDirs();

    agents.forEach(agent => {
      const manifestPath = path.join(agentsDir, agent, 'bmad-skill-manifest.yaml');
      const content = fs.readFileSync(manifestPath, 'utf-8');
      const manifest = yaml.load(content);

      expect(typeof manifest.capabilities).toBe('string');
      expect(Array.isArray(manifest.capabilities)).toBe(false);
    });
  });
});

describe('Extension Schema Validation', () => {
  const extensionsDir = path.join(SRC_DIR, 'extensions');

  const getExtensions = () => {
    if (!fs.existsSync(extensionsDir)) return [];
    return fs.readdirSync(extensionsDir)
      .filter(f => f.endsWith('.yaml'));
  };

  test('extensions exist', () => {
    const extensions = getExtensions();
    expect(extensions.length).toBeGreaterThan(0);
  });

  test('extensions do NOT have memories field', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      const extPath = path.join(extensionsDir, ext);
      const content = fs.readFileSync(extPath, 'utf-8');
      const extension = yaml.load(content);

      // Critical: memories field is NOT allowed
      expect(extension).not.toHaveProperty('memories');

      // If agent.memories exists, that's also wrong
      if (extension.agent) {
        expect(extension.agent).not.toHaveProperty('memories');
      }
    });
  });

  test('extensions have required metadata', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      const extPath = path.join(extensionsDir, ext);
      const content = fs.readFileSync(extPath, 'utf-8');
      const extension = yaml.load(content);

      expect(extension).toHaveProperty('agent');
      expect(extension.agent).toHaveProperty('metadata');
      expect(extension.agent.metadata).toHaveProperty('extends');
      expect(extension.agent.metadata).toHaveProperty('module');
      expect(extension.agent.metadata.module).toBe('bam');
    });
  });

  test('extensions have menu items', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      const extPath = path.join(extensionsDir, ext);
      const content = fs.readFileSync(extPath, 'utf-8');
      const extension = yaml.load(content);

      expect(extension).toHaveProperty('menu');
      expect(Array.isArray(extension.menu)).toBe(true);
      expect(extension.menu.length).toBeGreaterThan(0);
    });
  });

  test('extensions have prompts section', () => {
    const extensions = getExtensions();

    extensions.forEach(ext => {
      const extPath = path.join(extensionsDir, ext);
      const content = fs.readFileSync(extPath, 'utf-8');
      const extension = yaml.load(content);

      expect(extension).toHaveProperty('prompts');
      expect(Array.isArray(extension.prompts)).toBe(true);
    });
  });
});

describe('Module Configuration Validation', () => {
  test('module.yaml exists and is valid', () => {
    const modulePath = path.join(SRC_DIR, 'module.yaml');
    expect(fs.existsSync(modulePath)).toBe(true);

    const content = fs.readFileSync(modulePath, 'utf-8');
    const module = yaml.load(content);

    expect(module).toHaveProperty('code', 'bam');
    expect(module).toHaveProperty('name');
    expect(module).toHaveProperty('description');
  });

  test('module-help.csv exists and has entries', () => {
    const helpPath = path.join(SRC_DIR, 'module-help.csv');
    expect(fs.existsSync(helpPath)).toBe(true);

    const content = fs.readFileSync(helpPath, 'utf-8');
    const lines = content.trim().split('\n');

    // Header + at least one entry
    expect(lines.length).toBeGreaterThan(1);

    // Check header has required columns
    const header = lines[0];
    expect(header).toContain('module');
    expect(header).toContain('skill');
    expect(header).toContain('display-name');
  });
});
