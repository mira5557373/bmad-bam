const fs = require('fs');
const path = require('path');

describe('V2 File Counts', () => {
  const v2Dir = path.join(__dirname, '../../src-v2');

  test('8 TOML customize files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'customize')).filter(f => f.endsWith('.toml'));
    expect(files.length).toBe(8);
  });

  test('30 workflow skills', () => {
    const dirs = fs.readdirSync(path.join(v2Dir, 'skills')).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(v2Dir, 'skills', d)).isDirectory()
    );
    expect(dirs.length).toBe(30);
  });

  test('1 core context file', () => {
    expect(fs.existsSync(path.join(v2Dir, 'data/context/bam-core.md'))).toBe(true);
  });

  test('3 persona files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/personas')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('12 domain files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/domains')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(12);
  });

  test('10 pattern files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(10);
  });

  test('8 checklist files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/checklists')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(8);
  });

  test('40 template files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/templates')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(40);
  });

  test('3 sidecar files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/sidecar')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('3 CSV files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data')).filter(f => f.endsWith('.csv'));
    expect(files.length).toBe(3);
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
