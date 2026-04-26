const fs = require('fs');
const path = require('path');

describe('TOML Customization Files', () => {
  const tomlDir = path.join(__dirname, '../../src-v2/customize');

  test('8 TOML files exist', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    expect(files.length).toBe(8);
  });

  test('all TOML files have [agent] section', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(tomlDir, file), 'utf8');
      expect(content).toContain('[agent]');
    }
  });

  test('all menu codes use Z or Y prefix', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(tomlDir, file), 'utf8');
      const codes = content.match(/code = "([^"]+)"/g) || [];
      for (const match of codes) {
        const code = match.match(/code = "([^"]+)"/)[1];
        expect(code).toMatch(/^[ZY]/);
      }
    }
  });

  test('all TOML files have [[agent.menu]] items', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(tomlDir, file), 'utf8');
      expect(content).toContain('[[agent.menu]]');
    }
  });

  test('all TOML files have persistent_facts', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(tomlDir, file), 'utf8');
      expect(content).toContain('persistent_facts');
    }
  });

  test('all TOML files have principles', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(tomlDir, file), 'utf8');
      expect(content).toContain('principles');
    }
  });

  test('no TOML file contains memories field', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(tomlDir, file), 'utf8');
      expect(content).not.toMatch(/^memories\s*=/m);
    }
  });

  test('all TOML files reference bam-core.md context', () => {
    const files = fs.readdirSync(tomlDir).filter(f => f.endsWith('.toml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(tomlDir, file), 'utf8');
      expect(content).toContain('bam-core.md');
    }
  });
});
