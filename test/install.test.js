/**
 * Installation validation tests (Tier 1)
 * Validates module can be installed by BMB
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

describe('Tier 1: Installation Validation', () => {
  describe('Package Configuration', () => {
    test('package.json exists', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      expect(fs.existsSync(pkgPath)).toBe(true);
    });

    test('package.json is valid JSON', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      const content = fs.readFileSync(pkgPath, 'utf-8');
      expect(() => JSON.parse(content)).not.toThrow();
    });

    test('package.json does NOT have private: true', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      expect(pkg.private).not.toBe(true);
    });

    test('package.json has required fields', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

      expect(pkg).toHaveProperty('name', 'bmad-bam');
      expect(pkg).toHaveProperty('version');
      expect(pkg).toHaveProperty('description');
      expect(pkg).toHaveProperty('license');
    });
  });

  describe('Module Definition', () => {
    test('module.yaml exists', () => {
      const modulePath = path.join(SRC_DIR, 'module.yaml');
      expect(fs.existsSync(modulePath)).toBe(true);
    });

    test('module.yaml has required fields', () => {
      const modulePath = path.join(SRC_DIR, 'module.yaml');
      const content = fs.readFileSync(modulePath, 'utf-8');
      const module = yaml.load(content);

      expect(module).toHaveProperty('code', 'bam');
      expect(module).toHaveProperty('name');
      expect(module).toHaveProperty('description');
    });

    test('module.yaml has configuration variables', () => {
      const modulePath = path.join(SRC_DIR, 'module.yaml');
      const content = fs.readFileSync(modulePath, 'utf-8');
      const module = yaml.load(content);

      // Should have tenant_model and ai_runtime configs
      expect(module).toHaveProperty('tenant_model');
      expect(module).toHaveProperty('ai_runtime');
    });
  });

  describe('Directory Structure', () => {
    const requiredDirs = [
      'src/agents',
      'src/workflows',
      'src/extensions',
      'src/knowledge',
      'src/checklists',
      'src/templates',
      'src/data/agent-guides/bam',
    ];

    requiredDirs.forEach(dir => {
      test(`${dir} exists`, () => {
        const dirPath = path.join(ROOT_DIR, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
      });
    });
  });

  describe('Help System', () => {
    test('module-help.csv exists', () => {
      const helpPath = path.join(SRC_DIR, 'module-help.csv');
      expect(fs.existsSync(helpPath)).toBe(true);
    });

    test('module-help.csv has correct column count', () => {
      const helpPath = path.join(SRC_DIR, 'module-help.csv');
      const content = fs.readFileSync(helpPath, 'utf-8');
      const lines = content.trim().split('\n');
      const header = lines[0].split(',');

      // Should have 13 columns per BMB schema
      expect(header.length).toBe(13);
    });

    test('all module-help entries have module=bam', () => {
      const helpPath = path.join(SRC_DIR, 'module-help.csv');
      const content = fs.readFileSync(helpPath, 'utf-8');
      const lines = content.trim().split('\n').slice(1); // Skip header

      lines.forEach(line => {
        const fields = line.split(',');
        expect(fields[0]).toBe('bam');
      });
    });
  });
});

describe('File Counts', () => {
  test('has 3 agents', () => {
    const agentsDir = path.join(SRC_DIR, 'agents');
    const agents = fs.readdirSync(agentsDir)
      .filter(f => fs.statSync(path.join(agentsDir, f)).isDirectory());
    expect(agents.length).toBe(3);
  });

  test('has 18 extensions', () => {
    const extensionsDir = path.join(SRC_DIR, 'extensions');
    const extensions = fs.readdirSync(extensionsDir)
      .filter(f => f.endsWith('.yaml'));
    expect(extensions.length).toBe(18);
  });

  test('has 30 knowledge fragments', () => {
    const knowledgeDir = path.join(SRC_DIR, 'knowledge');
    const fragments = fs.readdirSync(knowledgeDir)
      .filter(f => f.endsWith('.md'));
    expect(fragments.length).toBe(30);
  });

  test('has 10 checklists', () => {
    const checklistsDir = path.join(SRC_DIR, 'checklists');
    const checklists = fs.readdirSync(checklistsDir)
      .filter(f => f.endsWith('.md'));
    expect(checklists.length).toBe(10);
  });

  test('has 15 agent guides', () => {
    const guidesDir = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
    const guides = fs.readdirSync(guidesDir)
      .filter(f => f.endsWith('.md'));
    expect(guides.length).toBe(15);
  });
});
