const fs = require('fs');
const path = require('path');

describe('V2 File Counts', () => {
  const v2Dir = path.join(__dirname, '../../src-v2');

  test('12 TOML customize files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'customize')).filter(f => f.endsWith('.toml'));
    expect(files.length).toBe(12);
  });

  test('34 workflow skills', () => {
    const dirs = fs.readdirSync(path.join(v2Dir, 'skills')).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(v2Dir, 'skills', d)).isDirectory()
    );
    expect(dirs.length).toBe(34);
  });

  test('1 core context file', () => {
    expect(fs.existsSync(path.join(v2Dir, 'data/context/bam-core.md'))).toBe(true);
  });

  test('3 persona files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/personas')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('domain files (12+)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/domains')).filter(f => f.endsWith('.md'));
    // V2 has expanded domain coverage
    expect(files.length).toBeGreaterThanOrEqual(12);
  });

  test('36 pattern files (after NEXUS Phase 2)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
    // V2 consolidated: 21 base + 6 NEXUS Phase 1 + 9 NEXUS Phase 2 = 36
    // Phase 2: semantic-firewall, output-sanitization, rbac-per-tool,
    //          reasoning-trace-collector, cost-attribution-engine,
    //          tenant-chaos-injector, incident-correlation-engine,
    //          tool-schema-versioning, agent-handoff-protocol
    expect(files.length).toBe(36);
  });

  test('checklist files (QG-* format)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/checklists')).filter(f => f.endsWith('.md'));
    // V2 has comprehensive checklists generated from quality-gates.csv
    expect(files.length).toBeGreaterThanOrEqual(8);
  });

  test('41 template files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/templates')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(41);
  });

  test('3 sidecar files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/sidecar')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('6 CSV registry files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data')).filter(f => f.endsWith('.csv'));
    // V2 has: ai-runtimes, bam-patterns, compliance-frameworks, quality-gates, section-pattern-map, tenant-models
    expect(files.length).toBe(6);
  });

  test('module.yaml exists', () => {
    expect(fs.existsSync(path.join(v2Dir, 'module.yaml'))).toBe(true);
  });

  test('all expected directories exist', () => {
    const expectedDirs = [
      'customize',
      'skills',
      'data',
      'data/context',
      'data/personas',
      'data/domains',
      'data/patterns',
      'data/checklists',
      'data/templates',
      'data/sidecar'
    ];

    for (const dir of expectedDirs) {
      expect(fs.existsSync(path.join(v2Dir, dir))).toBe(true);
    }
  });
});
