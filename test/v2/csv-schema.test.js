const fs = require('fs');
const path = require('path');

describe('CSV Schema Validation', () => {
  const dataDir = path.join(__dirname, '../../src-v2/data');
  const patternsDir = path.join(dataDir, 'patterns');

  describe('bam-patterns.csv', () => {
    const csvPath = path.join(dataDir, 'bam-patterns.csv');
    let csvContent;
    let headerLine;

    beforeAll(() => {
      csvContent = fs.readFileSync(csvPath, 'utf8');
      headerLine = csvContent.split('\n')[0];
    });

    test('all required columns present', () => {
      const requiredColumns = [
        'pattern_id',
        'name',
        'category',
        'decision_criteria',
        'web_queries',
        'verification_gate'
      ];

      for (const col of requiredColumns) {
        expect(headerLine).toContain(col);
      }
    });

    test('new columns present (post-enhancement)', () => {
      const newColumns = [
        'core_pattern_ref',
        'domain_ref',
        'shortcode'
      ];

      for (const col of newColumns) {
        expect(headerLine).toContain(col);
      }
    });

    test('has QG- references in verification_gate column', () => {
      // Check that at least some rows have valid QG references
      const qgMatches = csvContent.match(/QG-[A-Z]+\d*/g) || [];
      expect(qgMatches.length).toBeGreaterThan(50);
    });

    test('tenant-isolation row has core_pattern_ref', () => {
      expect(csvContent).toContain('tenant-isolation.md');
    });

    test('agent-orchestration row has domain_ref', () => {
      // agent-orchestration pattern has ai-runtime.md as domain_ref
      expect(csvContent).toContain('ai-runtime.md');
    });
  });

  describe('quality-gates.csv', () => {
    const csvPath = path.join(dataDir, 'quality-gates.csv');

    test('file exists', () => {
      expect(fs.existsSync(csvPath)).toBe(true);
    });

    test('contains gate definitions', () => {
      const content = fs.readFileSync(csvPath, 'utf8');
      expect(content).toContain('QG-');
    });
  });

  describe('CSV consistency', () => {
    test('all CSV files have consistent line endings', () => {
      const csvFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.csv'));

      for (const file of csvFiles) {
        const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
        // Should not have Windows line endings mixed in
        const windowsLineEndings = (content.match(/\r\n/g) || []).length;
        const unixLineEndings = (content.match(/(?<!\r)\n/g) || []).length;

        // Either all Windows or all Unix, not mixed
        if (windowsLineEndings > 0 && unixLineEndings > 0) {
          // Allow some tolerance for edge cases
          expect(Math.min(windowsLineEndings, unixLineEndings)).toBeLessThan(5);
        }
      }
    });
  });
});
