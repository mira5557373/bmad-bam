/**
 * TSA Sync Map validation tests for BAM module
 * Validates tsa-sync-map.yaml structure and references
 *
 * Note: TSA has been retired in favor of pattern registry + web research
 * This file now validates the migration map format
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

describe('TSA Sync Map Validation', () => {
  let syncMap;
  const syncMapPath = path.join(ROOT_DIR, 'tsa-sync-map.yaml');

  beforeAll(() => {
    const content = fs.readFileSync(syncMapPath, 'utf-8');
    syncMap = yaml.load(content);
  });

  test('tsa-sync-map.yaml exists', () => {
    expect(fs.existsSync(syncMapPath)).toBe(true);
  });

  test('has required top-level fields', () => {
    expect(syncMap).toHaveProperty('version');
    expect(syncMap).toHaveProperty('last_sync');
    expect(syncMap).toHaveProperty('module', 'bam');
    expect(syncMap).toHaveProperty('mappings');
    expect(syncMap).toHaveProperty('status', 'migrated');
  });

  test('mappings reference pattern registry (data/) not deprecated knowledge/', () => {
    const mappings = syncMap.mappings || [];

    mappings.forEach(mapping => {
      const bamFiles = mapping.bam || [];
      bamFiles.forEach(bamFile => {
        // Should NOT reference deprecated knowledge/ directory
        expect(bamFile).not.toMatch(/^knowledge\//);
        // Should reference data/, checklists/, or templates/
        expect(bamFile).toMatch(/^(data\/|checklists\/|templates\/)/);
      });
    });
  });

  test('no stale gaps (gap files that now exist)', () => {
    const gaps = syncMap.gaps || [];
    // After migration, gaps array should be empty
    expect(gaps.length).toBe(0);
  });

  test('mappings have valid status', () => {
    const validStatuses = ['active', 'missing', 'deprecated', 'divergent', 'migrated'];
    const mappings = syncMap.mappings || [];

    mappings.forEach(mapping => {
      expect(validStatuses).toContain(mapping.status);
    });
  });

  test('has validation rules defined', () => {
    expect(syncMap).toHaveProperty('validation_rules');
    expect(Array.isArray(syncMap.validation_rules)).toBe(true);
    expect(syncMap.validation_rules.length).toBeGreaterThan(0);
  });
});
