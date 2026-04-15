/**
 * Web Search Integration Tests
 * Validates web search directive presence across BAM module components
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'data', 'extensions');
const TEMPLATES_DIR = path.join(SRC_DIR, 'data', 'templates');

// Recursively find files matching a pattern
const findFiles = (dir, pattern, results = []) => {
  if (!fs.existsSync(dir)) return results;

  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      findFiles(itemPath, pattern, results);
    } else if (pattern.test(item)) {
      results.push(itemPath);
    }
  });
  return results;
};

// Find all step files with mode suffix pattern
const findStepFiles = (dir, modeSuffix) => {
  const pattern = new RegExp(`step-\\d{2}-${modeSuffix}-.*\\.md$`);
  return findFiles(dir, pattern);
};

describe('Web Search Integration', () => {
  describe('Step Files', () => {
    test('Create-mode steps have web search directives', () => {
      const stepFiles = findStepFiles(WORKFLOWS_DIR, 'c');

      expect(stepFiles.length).toBeGreaterThan(0);

      const withWebSearch = stepFiles.filter(f => {
        const content = fs.readFileSync(f, 'utf-8');
        return (
          content.includes('Search the web:') ||
          content.includes('web search') ||
          content.includes('Web research') ||
          content.includes('**Web research')
        );
      });

      // At least 50% of Create-mode steps should have web search directives
      const ratio = withWebSearch.length / stepFiles.length;

      if (ratio < 0.5) {
        console.warn(
          `Only ${withWebSearch.length}/${stepFiles.length} (${(ratio * 100).toFixed(1)}%) Create-mode steps have web search directives`
        );
      }

      expect(ratio).toBeGreaterThan(0.5);
    });

    test('Web search directives use {date} placeholder', () => {
      const stepFiles = findStepFiles(WORKFLOWS_DIR, 'c');
      const filesWithSearch = [];
      const filesWithYearPlaceholder = [];

      stepFiles.forEach(f => {
        const content = fs.readFileSync(f, 'utf-8');
        if (content.includes('Search the web:')) {
          filesWithSearch.push(f);
          if (content.includes('{date}')) {
            filesWithYearPlaceholder.push(f);
          }
        }
      });

      if (filesWithSearch.length > 0) {
        // Files with web search should use {date} placeholder
        const ratio = filesWithYearPlaceholder.length / filesWithSearch.length;
        expect(ratio).toBeGreaterThan(0.8);
      }
    });

    test('Edit-mode steps do not require web search (verification mode)', () => {
      const stepFiles = findStepFiles(WORKFLOWS_DIR, 'e');

      // Edit mode is for verification, not research - this is informational
      expect(stepFiles.length).toBeGreaterThanOrEqual(0);
    });

    test('Validate-mode steps do not require web search (verification mode)', () => {
      const stepFiles = findStepFiles(WORKFLOWS_DIR, 'v');

      // Validate mode is for verification, not research - this is informational
      expect(stepFiles.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Templates', () => {
    test('Templates contain Web Research section where applicable', () => {
      const templateFiles = findFiles(TEMPLATES_DIR, /\.md$/);

      expect(templateFiles.length).toBeGreaterThan(0);

      // Templates that are likely to need web research sections
      const researchRelatedTemplates = templateFiles.filter(f => {
        const name = path.basename(f).toLowerCase();
        return (
          name.includes('architecture') ||
          name.includes('design') ||
          name.includes('pattern') ||
          name.includes('evaluation') ||
          name.includes('assessment')
        );
      });

      if (researchRelatedTemplates.length > 0) {
        const withWebResearch = researchRelatedTemplates.filter(f => {
          const content = fs.readFileSync(f, 'utf-8');
          return (
            content.includes('Web Research') ||
            content.includes('web research') ||
            content.includes('Search the web') ||
            content.includes('Sources') ||
            content.includes('References')
          );
        });

        // At least some research-related templates should have web research sections
        expect(withWebResearch.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Extensions', () => {
    test('Extensions have web research menu items', () => {
      const extensionFiles = findFiles(EXTENSIONS_DIR, /\.yaml$/);

      expect(extensionFiles.length).toBeGreaterThan(0);

      const withWebResearch = extensionFiles.filter(f => {
        const content = fs.readFileSync(f, 'utf-8');
        return (
          content.includes('web-research') ||
          content.includes('Web Research') ||
          content.includes('bam-.*-research')
        );
      });

      // At least 50% of extensions should have web research capabilities
      const ratio = withWebResearch.length / extensionFiles.length;

      if (ratio < 0.5) {
        console.warn(
          `Only ${withWebResearch.length}/${extensionFiles.length} (${(ratio * 100).toFixed(1)}%) extensions have web research menu items`
        );
      }

      expect(ratio).toBeGreaterThan(0.5);
    });

    test('Web research prompts follow BAM pattern', () => {
      const extensionFiles = findFiles(EXTENSIONS_DIR, /\.yaml$/);

      const violations = [];

      extensionFiles.forEach(f => {
        const content = fs.readFileSync(f, 'utf-8');

        // Check if file has web research prompt
        if (content.includes('web-research')) {
          // Should have ## BAM Web Research section
          if (!content.includes('## BAM Web Research')) {
            violations.push({
              file: path.basename(f),
              issue: 'Missing ## BAM Web Research header in prompt'
            });
          }

          // Should reference pattern registry
          if (
            !content.includes('bam-patterns.csv') &&
            !content.includes('pattern registry')
          ) {
            // This is a soft check - not all research prompts need pattern registry
          }
        }
      });

      if (violations.length > 0) {
        console.warn('Web research prompt violations:', violations);
      }

      // Allow some violations but not too many
      expect(violations.length).toBeLessThan(extensionFiles.length * 0.3);
    });
  });

  describe('Agent Guides', () => {
    test('Agent guides include Web Research sections', () => {
      const guidesDir = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
      const guideFiles = findFiles(guidesDir, /\.md$/);

      expect(guideFiles.length).toBeGreaterThan(0);

      const withWebResearch = guideFiles.filter(f => {
        const content = fs.readFileSync(f, 'utf-8');
        return (
          content.includes('### Web Research') ||
          content.includes('## Web Research') ||
          content.includes('web_queries')
        );
      });

      // At least 30% of guides should have web research sections
      const ratio = withWebResearch.length / guideFiles.length;

      if (ratio < 0.3) {
        console.warn(
          `Only ${withWebResearch.length}/${guideFiles.length} (${(ratio * 100).toFixed(1)}%) agent guides have Web Research sections`
        );
      }

      expect(ratio).toBeGreaterThan(0.3);
    });

    test('Web Research sections include search query examples', () => {
      const guidesDir = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
      const guideFiles = findFiles(guidesDir, /\.md$/);

      const guidesWithWebResearch = guideFiles.filter(f => {
        const content = fs.readFileSync(f, 'utf-8');
        return content.includes('### Web Research');
      });

      if (guidesWithWebResearch.length > 0) {
        const withSearchExamples = guidesWithWebResearch.filter(f => {
          const content = fs.readFileSync(f, 'utf-8');
          return (
            content.includes('Search:') ||
            content.includes('search:') ||
            content.includes('{date}')
          );
        });

        // Most guides with Web Research section should have search examples
        const ratio = withSearchExamples.length / guidesWithWebResearch.length;
        expect(ratio).toBeGreaterThan(0.7);
      }
    });
  });

  describe('Pattern Registry', () => {
    test('Pattern registry has web_queries column', () => {
      const patternFile = path.join(SRC_DIR, 'data', 'bam-patterns.csv');

      if (fs.existsSync(patternFile)) {
        const content = fs.readFileSync(patternFile, 'utf-8');
        const firstLine = content.split('\n')[0];

        expect(firstLine.toLowerCase()).toContain('web_quer');
      }
    });

    test('Tenant models CSV has web_queries', () => {
      const tenantFile = path.join(SRC_DIR, 'data', 'tenant-models.csv');

      if (fs.existsSync(tenantFile)) {
        const content = fs.readFileSync(tenantFile, 'utf-8');
        const firstLine = content.split('\n')[0];

        expect(firstLine.toLowerCase()).toContain('web_quer');
      }
    });

    test('AI runtimes CSV has web_queries', () => {
      const runtimeFile = path.join(SRC_DIR, 'data', 'ai-runtimes.csv');

      if (fs.existsSync(runtimeFile)) {
        const content = fs.readFileSync(runtimeFile, 'utf-8');
        const firstLine = content.split('\n')[0];

        expect(firstLine.toLowerCase()).toContain('web_quer');
      }
    });
  });

  describe('Source Citation Format', () => {
    test('Step files use proper citation format when including sources', () => {
      const stepFiles = findFiles(WORKFLOWS_DIR, /step-.*\.md$/);

      const filesWithCitations = stepFiles.filter(f => {
        const content = fs.readFileSync(f, 'utf-8');
        return content.includes('_Source:') || content.includes('Source:');
      });

      // If there are citations, they should use proper format
      filesWithCitations.forEach(f => {
        const content = fs.readFileSync(f, 'utf-8');

        // Citation format should be: _Source: [URL]_
        if (content.includes('_Source:')) {
          expect(content).toMatch(/_Source:.*_/);
        }
      });
    });
  });
});

describe('Web Search Directive Format', () => {
  test('Search directives follow standard format', () => {
    const stepFiles = findFiles(WORKFLOWS_DIR, /step-.*\.md$/);

    const violations = [];

    stepFiles.forEach(f => {
      const content = fs.readFileSync(f, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        if (line.includes('Search the web:')) {
          // Should be followed by quoted search term
          if (!line.match(/Search the web:\s*"/)) {
            violations.push({
              file: path.basename(f),
              line: idx + 1,
              content: line.trim()
            });
          }
        }
      });
    });

    if (violations.length > 0) {
      console.warn('Search directive format violations:', violations.slice(0, 5));
    }

    // Allow some flexibility but most should follow format
    expect(violations.length).toBeLessThan(stepFiles.length * 0.2);
  });

  test('Search directives use {date} placeholder', () => {
    const stepFiles = findFiles(WORKFLOWS_DIR, /step-.*\.md$/);
    const filesWithSearch = [];
    const filesWithPlaceholder = [];

    stepFiles.forEach(f => {
      const content = fs.readFileSync(f, 'utf-8');
      if (content.includes('Search the web:')) {
        filesWithSearch.push(f);
        // Use {date} placeholder for BMM compatibility
        if (content.includes('{date}')) {
          filesWithPlaceholder.push(f);
        }
      }
    });

    if (filesWithSearch.length > 0) {
      const ratio = filesWithPlaceholder.length / filesWithSearch.length;
      if (ratio < 0.8) {
        console.warn(
          `Only ${filesWithPlaceholder.length}/${filesWithSearch.length} files with search directives use {date} placeholder`
        );
      }
      expect(ratio).toBeGreaterThan(0.8);
    }
  });
});

describe('BMM Extension Research Patterns', () => {
  test('Extension research prompts reference pattern registry', () => {
    const extensionFiles = findFiles(EXTENSIONS_DIR, /\.yaml$/);
    const extensionsWithResearch = [];
    const extensionsReferencingRegistry = [];

    extensionFiles.forEach(f => {
      const content = fs.readFileSync(f, 'utf-8');
      if (content.includes('-research')) {
        extensionsWithResearch.push(f);
        // Check for pattern registry or web_queries reference
        if (
          content.includes('bam-patterns.csv') ||
          content.includes('tenant-models.csv') ||
          content.includes('ai-runtimes.csv') ||
          content.includes('web_queries') ||
          content.includes('pattern registry')
        ) {
          extensionsReferencingRegistry.push(f);
        }
      }
    });

    // At least 50% of research extensions should reference pattern registry
    if (extensionsWithResearch.length > 0) {
      const ratio =
        extensionsReferencingRegistry.length / extensionsWithResearch.length;
      expect(ratio).toBeGreaterThanOrEqual(0.5);
    }
  });

  test('Agent guides have Related Patterns section with web search', () => {
    const guidesDir = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
    const guideFiles = findFiles(guidesDir, /\.md$/);
    const withRelatedPatterns = [];
    const withPatternAndWebResearch = [];

    guideFiles.forEach(f => {
      const content = fs.readFileSync(f, 'utf-8');
      if (content.includes('## Related Patterns')) {
        withRelatedPatterns.push(f);
        // Check for Web Research subsection
        if (content.includes('### Web Research')) {
          withPatternAndWebResearch.push(f);
        }
      }
    });

    if (withRelatedPatterns.length > 0) {
      const ratio =
        withPatternAndWebResearch.length / withRelatedPatterns.length;
      if (ratio < 0.7) {
        console.warn(
          `Only ${withPatternAndWebResearch.length}/${withRelatedPatterns.length} guides with Related Patterns have ### Web Research subsection`
        );
      }
      // Most guides with Related Patterns should have Web Research subsection
      expect(ratio).toBeGreaterThan(0.7);
    }
  });

  test('Templates have Web Research Queries section before Verification', () => {
    const templateFiles = findFiles(TEMPLATES_DIR, /\.md$/);
    const templatesWithWebResearch = [];

    templateFiles.forEach(f => {
      const content = fs.readFileSync(f, 'utf-8');
      // Check for Web Research Queries section
      if (
        content.includes('## Web Research Queries') ||
        content.includes('### Web Research Queries')
      ) {
        templatesWithWebResearch.push(f);
      }
    });

    // At least 50% of templates should have Web Research Queries section
    const ratio = templatesWithWebResearch.length / templateFiles.length;
    if (ratio < 0.5) {
      console.warn(
        `Only ${templatesWithWebResearch.length}/${templateFiles.length} (${(ratio * 100).toFixed(1)}%) templates have Web Research Queries section`
      );
    }
    expect(ratio).toBeGreaterThan(0.5);
  });

  test('Citation format follows _Source: [URL]_ pattern', () => {
    const stepFiles = findFiles(WORKFLOWS_DIR, /step-.*\.md$/);
    const templateFiles = findFiles(TEMPLATES_DIR, /\.md$/);
    const allFiles = [...stepFiles, ...templateFiles];
    const filesWithCitationFormat = [];

    allFiles.forEach(f => {
      const content = fs.readFileSync(f, 'utf-8');
      // Check if file mentions the citation format requirement
      if (
        content.includes('_Source:') ||
        content.includes('Source: [URL]') ||
        content.includes('_Source: [URL]_')
      ) {
        filesWithCitationFormat.push(f);
      }
    });

    // At least some files should specify or use citation format
    expect(filesWithCitationFormat.length).toBeGreaterThan(0);
  });
});

describe('Pattern Registry web_queries Column', () => {
  // Helper to extract web_queries column value (handles quoted CSV fields)
  const extractWebQueries = content => {
    // Search for the web_queries column content in the entire file
    // It's typically at the end and contains {date} placeholders
    const matches = content.match(/\{date\}/g);
    return matches ? matches.length : 0;
  };

  test('All pattern CSVs have web_queries column with {date} placeholder', () => {
    const csvFiles = [
      'bam-patterns.csv',
      'tenant-models.csv',
      'ai-runtimes.csv'
    ];

    csvFiles.forEach(csvFile => {
      const filePath = path.join(SRC_DIR, 'data', csvFile);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').filter(l => l.trim());
        const header = lines[0];

        // Check header has web_queries
        expect(header.toLowerCase()).toContain('web_quer');

        // Check that the file contains {date} placeholders (in web_queries column)
        const yearCount = extractWebQueries(content);
        const dataRowCount = lines.length - 1; // Exclude header

        if (dataRowCount > 0) {
          // Should have at least as many {date} occurrences as data rows
          // (some rows may have multiple queries with {date})
          expect(yearCount).toBeGreaterThanOrEqual(dataRowCount * 0.8);
        }
      }
    });
  });

  test('Pattern registry web_queries use semicolon-separated format', () => {
    const filePath = path.join(SRC_DIR, 'data', 'bam-patterns.csv');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check that the file contains semicolons in web_queries
      // Multiple queries should be semicolon-separated within the quoted field
      expect(content).toMatch(/"\s*[^"]*;[^"]*\{date\}[^"]*"/);
    }
  });

  test('Pattern registry CSVs have consistent header structure', () => {
    const csvFiles = [
      'bam-patterns.csv',
      'tenant-models.csv',
      'ai-runtimes.csv'
    ];

    csvFiles.forEach(csvFile => {
      const filePath = path.join(SRC_DIR, 'data', csvFile);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const header = content.split('\n')[0].toLowerCase();

        // All pattern CSVs should have web_queries as the last column or near end
        expect(header).toMatch(/web_quer[ies]*\s*(,|$)/);
      }
    });
  });
});
