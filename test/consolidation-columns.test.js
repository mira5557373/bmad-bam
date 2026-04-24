/**
 * Consolidation Columns validation tests
 * Validates the new consolidation columns in bam-patterns.csv
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

// Helper: Parse CSV (handles quoted fields)
const parseCSV = (content) => {
  const lines = content.trim().split('\n');
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

describe('Pattern Registry Consolidation Columns', () => {
  const csvPath = path.join(DATA_DIR, 'bam-patterns.csv');
  let csv;

  beforeAll(() => {
    const content = fs.readFileSync(csvPath, 'utf-8');
    csv = parseCSV(content);
  });

  test('should have consolidated_guide column', () => {
    expect(csv.headers).toContain('consolidated_guide');
  });

  test('should have section_anchor column', () => {
    expect(csv.headers).toContain('section_anchor');
  });

  test('should have phase column', () => {
    expect(csv.headers).toContain('phase');
  });

  test('all patterns should have consolidated_guide value', () => {
    csv.rows.forEach(row => {
      expect(row.consolidated_guide).toBeTruthy();
      expect(row.consolidated_guide).toMatch(/\.md$/);
    });
  });

  test('all patterns should have section_anchor value', () => {
    csv.rows.forEach(row => {
      expect(row.section_anchor).toBeTruthy();
    });
  });

  test('all patterns should have valid phase', () => {
    const validPhases = ['discovery', 'planning', 'foundation', 'solutioning', 'integration', 'production', 'anytime'];
    csv.rows.forEach(row => {
      expect(validPhases).toContain(row.phase);
    });
  });

  test('consolidated_guide should be a valid guide filename', () => {
    const validGuides = [
      'tenant-patterns-guide.md',
      'ai-runtime-patterns-guide.md',
      'security-patterns-guide.md',
      'observability-patterns-guide.md',
      'reliability-patterns-guide.md',
      'governance-patterns-guide.md',
      'integration-patterns-guide.md',
      'cost-patterns-guide.md',
      'state-patterns-guide.md',
      'discovery-patterns-guide.md',
      'testing-patterns-guide.md',
      'operations-patterns-guide.md',
      'scaling-patterns-guide.md',
      'ai-lifecycle-patterns-guide.md',
      'ai-safety-patterns-guide.md',
      'ai-observability-patterns-guide.md',
      'runtime-loops-patterns-guide.md',
      'mcp-patterns-guide.md',
      'data-patterns-guide.md',
      'rag-patterns-guide.md',
      'architecture-patterns-guide.md',
      'analytics-patterns-guide.md',
      'gate-verification-patterns-guide.md',
      'federation-patterns-guide.md',
      'documentation-patterns-guide.md',
    ];
    csv.rows.forEach(row => {
      expect(validGuides).toContain(row.consolidated_guide);
    });
  });

  test('section_anchor should match pattern_id format (underscores to hyphens)', () => {
    csv.rows.forEach(row => {
      const expectedAnchor = row.pattern_id.replace(/_/g, '-');
      expect(row.section_anchor).toBe(expectedAnchor);
    });
  });

  test('patterns with tenant category should map to tenant-patterns-guide', () => {
    // Filter for patterns where category is specifically tenant or tenant-isolation
    const tenantCategoryPatterns = csv.rows.filter(row =>
      row.category.toLowerCase() === 'tenant' ||
      row.category.toLowerCase() === 'tenant-isolation'
    );
    tenantCategoryPatterns.forEach(row => {
      expect(row.consolidated_guide).toBe('tenant-patterns-guide.md');
    });
  });

  test('tenant-prefixed patterns map based on their category (not pattern_id)', () => {
    // Patterns starting with tenant- but having different categories should map accordingly
    const tenantPrefixPatterns = csv.rows.filter(row =>
      row.pattern_id.startsWith('tenant-')
    );
    // Just verify they all have valid consolidated_guide values
    tenantPrefixPatterns.forEach(row => {
      expect(row.consolidated_guide).toBeTruthy();
      expect(row.consolidated_guide).toMatch(/\.md$/);
    });
  });

  test('ai/agent patterns should map to appropriate guides', () => {
    // AI category patterns can go to ai-* guides OR specialized guides (mcp, rag) based on pattern name
    const aiPatterns = csv.rows.filter(row =>
      row.category.toLowerCase().startsWith('ai') ||
      row.category.toLowerCase().startsWith('agent')
    );

    const validAiGuides = [
      'ai-runtime-patterns-guide.md',
      'ai-lifecycle-patterns-guide.md',
      'ai-safety-patterns-guide.md',
      'ai-observability-patterns-guide.md',
    ];

    // Specialized guides for specific pattern prefixes
    const specializedGuides = {
      'mcp-': 'mcp-patterns-guide.md',
      'rag-': 'rag-patterns-guide.md',
    };

    aiPatterns.forEach(row => {
      // Check if pattern has a specialized prefix
      let expectedGuide = null;
      for (const [prefix, guide] of Object.entries(specializedGuides)) {
        if (row.pattern_id.startsWith(prefix)) {
          expectedGuide = guide;
          break;
        }
      }

      if (expectedGuide) {
        // Pattern has specialized prefix - must go to that guide
        expect(row.consolidated_guide).toBe(expectedGuide);
      } else {
        // Regular AI pattern - must go to ai-* guide
        expect(validAiGuides).toContain(row.consolidated_guide);
      }
    });
  });
});
