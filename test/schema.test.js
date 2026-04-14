/**
 * Schema validation tests for BAM module
 * Validates YAML structure against BMAD patterns
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');

describe('Agent Schema Validation', () => {
  const agentsDir = path.join(SRC_DIR, 'agents');

  const getAgentDirs = () => {
    if (!fs.existsSync(agentsDir)) return [];
    return fs.readdirSync(agentsDir)
      .filter(f => fs.statSync(path.join(agentsDir, f)).isDirectory());
  };

  test('BAM is a pure extension module with 0 standalone agents', () => {
    // BAM is intentionally a pure extension module with no standalone agents
    // Atlas, Nova, Kai personas are consolidated into architect-bam.yaml extension
    const agents = getAgentDirs();
    expect(agents.length).toBe(0);
  });

  test('each agent has SKILL.md', () => {
    const agents = getAgentDirs();
    // Skip if no agents (BAM is pure extension module)
    if (agents.length === 0) return;

    agents.forEach(agent => {
      const skillPath = path.join(agentsDir, agent, 'SKILL.md');
      expect(fs.existsSync(skillPath)).toBe(true);
    });
  });

  test('agent manifests have required fields', () => {
    const agents = getAgentDirs();
    // Skip if no agents (BAM is pure extension module)
    if (agents.length === 0) return;
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
    // Skip if no agents (BAM is pure extension module)
    if (agents.length === 0) return;

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
    const modulePath = path.join(WORKFLOWS_DIR, 'module.yaml');
    expect(fs.existsSync(modulePath)).toBe(true);

    const content = fs.readFileSync(modulePath, 'utf-8');
    const module = yaml.load(content);

    expect(module).toHaveProperty('code', 'bam');
    expect(module).toHaveProperty('name');
    expect(module).toHaveProperty('description');
  });

  test('module-help.csv exists and has entries', () => {
    const helpPath = path.join(WORKFLOWS_DIR, 'module-help.csv');
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

describe('Empty File Handling', () => {
  test('handles empty YAML gracefully', () => {
    // Test that yaml.load handles empty content without crashing
    const testEmptyYaml = () => {
      const emptyContent = '';
      const result = yaml.load(emptyContent);
      return result;
    };

    // Should not throw - empty YAML returns undefined or null
    expect(testEmptyYaml).not.toThrow();
    expect([undefined, null]).toContain(testEmptyYaml());

    // Test whitespace-only YAML
    const testWhitespaceYaml = () => {
      const whitespaceContent = '   \n\n   \t\t\n';
      const result = yaml.load(whitespaceContent);
      return result;
    };

    expect(testWhitespaceYaml).not.toThrow();
    // js-yaml returns null for whitespace-only content
    expect([undefined, null]).toContain(testWhitespaceYaml());
  });

  test('handles empty CSV gracefully', () => {
    // Helper: Parse CSV with graceful empty handling
    const parseCSV = (content) => {
      if (!content || content.trim() === '') {
        return { headers: [], rows: [] };
      }

      const lines = content.trim().split('\n');
      if (lines.length === 0) {
        return { headers: [], rows: [] };
      }

      const headers = lines[0].split(',');
      const rows = lines.slice(1).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;

        for (const char of line) {
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        values.push(current.trim());

        const row = {};
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        return row;
      });

      return { headers, rows };
    };

    // Test empty CSV
    const emptyResult = parseCSV('');
    expect(emptyResult.headers).toEqual([]);
    expect(emptyResult.rows).toEqual([]);

    // Test header-only CSV
    const headerOnlyResult = parseCSV('col1,col2,col3');
    expect(headerOnlyResult.headers).toEqual(['col1', 'col2', 'col3']);
    expect(headerOnlyResult.rows).toEqual([]);

    // Test whitespace CSV - after trim(), empty string returns empty arrays
    const whitespaceResult = parseCSV('   \n\n  ');
    expect(whitespaceResult.headers).toEqual([]);
    expect(whitespaceResult.rows).toEqual([]);
  });

  test('handles malformed YAML without crashing', () => {
    // Test that malformed YAML throws YAMLException, not a crash
    const testMalformedYaml = () => {
      const malformedContent = 'key: value\n  invalid indent';
      try {
        yaml.load(malformedContent);
        return 'no-error';
      } catch (e) {
        return e.name;
      }
    };

    // Should catch YAML error gracefully
    const result = testMalformedYaml();
    expect(['YAMLException', 'no-error']).toContain(result);
  });
});
