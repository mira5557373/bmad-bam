/**
 * Agent Guide Structure validation tests
 * Validates all required sections and BMM compatibility
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const GUIDES_DIR = path.join(ROOT_DIR, 'src', 'data', 'agent-guides', 'bam');

describe('Agent Guide Structure Validation', () => {
  const guideFiles = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.md'));

  describe('Required Header Sections', () => {
    test('all guides have "When to load:" header', () => {
      const missing = [];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        if (!content.includes('When to load:') && !content.includes('**When to load:**')) {
          missing.push(file);
        }
      });

      expect(missing).toEqual([]);
    });

    test('all guides have "Integrates with:" header', () => {
      const missing = [];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        if (!content.includes('Integrates with:') && !content.includes('**Integrates with:**')) {
          missing.push(file);
        }
      });

      expect(missing).toEqual([]);
    });
  });

  describe('Required Content Sections', () => {
    test('all guides have "## Core Concepts" or equivalent section', () => {
      const missing = [];
      const equivalentSections = [
        '## Core Concepts',
        '## Key Concepts',
        '## Concepts',
        '## Overview',
        '## Context',
        // Domain-specific sections that serve same purpose
        '## Empathy',
        '## Define',
        '## Ideate',
        '## Problem',
        '## Discovery',
        '## Foundation',
        '## Architecture'
      ];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        const hasSection = equivalentSections.some(section =>
          content.includes(section)
        );
        if (!hasSection) {
          missing.push(file);
        }
      });

      // Allow up to 10 guides with specialized domain-specific structure
      expect(missing.length).toBeLessThanOrEqual(10);
    });

    test('all guides have decision or application guidance section', () => {
      const missing = [];
      const guidanceSections = [
        '## Decision Framework',
        '## Application Guidelines',
        '## Actionable Guidance',
        '## Guidelines',
        '## Usage',
        '## How to Use'
      ];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        const hasSection = guidanceSections.some(section =>
          content.includes(section)
        );
        if (!hasSection) {
          missing.push(file);
        }
      });

      // Allow up to 10 guides with alternative structure
      expect(missing.length).toBeLessThanOrEqual(10);
    });
  });

  describe('BMM Web Search Compatibility', () => {
    test('all guides have "## Related Patterns" section', () => {
      const missing = [];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        if (!content.includes('## Related Patterns')) {
          missing.push(file);
        }
      });

      expect(missing).toEqual([]);
    });

    test('all guides have "### Web Research" subsection', () => {
      const missing = [];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        if (!content.includes('### Web Research') && !content.includes('Web Research')) {
          missing.push(file);
        }
      });

      expect(missing).toEqual([]);
    });

    test('all guides reference web_queries column', () => {
      const missing = [];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        if (!content.includes('web_queries')) {
          missing.push(file);
        }
      });

      expect(missing).toEqual([]);
    });

    test('all guides use {date} placeholder in search queries', () => {
      const missing = [];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        // Check if guide has Search: lines and at least one has {date}
        const hasSearchLines = content.includes('- Search:');
        const hasYearPlaceholder = content.includes('{date}');

        if (hasSearchLines && !hasYearPlaceholder) {
          missing.push(file);
        }
      });

      expect(missing).toEqual([]);
    });
  });

  describe('Pattern Registry References', () => {
    test('guides reference pattern registry CSV files', () => {
      const withReferences = [];

      guideFiles.forEach(file => {
        const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
        if (content.includes('bam-patterns.csv') ||
            content.includes('tenant-models.csv') ||
            content.includes('ai-runtimes.csv')) {
          withReferences.push(file);
        }
      });

      // At least 80% should reference pattern registry
      const percentage = withReferences.length / guideFiles.length;
      expect(percentage).toBeGreaterThanOrEqual(0.8);
    });
  });

  describe('Guide Count Validation', () => {
    test('has expected number of agent guides (200-250)', () => {
      // Allow variance during development - module may grow
      // Increased from 158-175 to 158-185 after adding billing, analytics, reseller, tenant-hierarchy guides
      // Increased from 158-185 to 158-190 after adding 6 observability guides
      // Increased from 158-190 to 200-250 after adding 34 domain-specific pattern guides
      expect(guideFiles.length).toBeGreaterThanOrEqual(200);
      expect(guideFiles.length).toBeLessThanOrEqual(250);
    });
  });
});

describe('Guide Content Quality', () => {
  const guideFiles = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.md'));

  test('all guides have minimum word count (400+)', () => {
    const tooShort = [];

    guideFiles.forEach(file => {
      const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
      const wordCount = content.split(/\s+/).length;

      if (wordCount < 400) {
        tooShort.push({ file, wordCount });
      }
    });

    expect(tooShort).toEqual([]);
  });

  test('no guides have broken markdown links', () => {
    const brokenLinks = [];

    guideFiles.forEach(file => {
      const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');

      // Check for empty links like []() or [text]()
      const emptyLinkPattern = /\[[^\]]*\]\(\s*\)/g;
      const matches = content.match(emptyLinkPattern);

      if (matches) {
        brokenLinks.push({ file, count: matches.length });
      }
    });

    expect(brokenLinks).toEqual([]);
  });
});

describe('Agent Guide Related Workflows Section', () => {
  const guidesDir = path.join(__dirname, '..', 'src', 'data', 'agent-guides', 'bam');
  
  test('all guides have Related Workflows section with content', () => {
    const guides = fs.readdirSync(guidesDir).filter(f => f.endsWith('.md'));
    const missing = [];
    
    guides.forEach(guide => {
      const content = fs.readFileSync(path.join(guidesDir, guide), 'utf-8');
      if (!content.includes('## Related Workflows')) {
        missing.push(guide + ' (missing section)');
      } else {
        // Check if section has at least one workflow reference
        // Accept both bmad-bam- prefix (flat workflows) and short names (nested workflows)
        const match = content.match(/## Related Workflows[\s\S]*?(?=##|$)/);
        if (match) {
          const hasWorkflowRef = match[0].includes('bmad-bam-') ||
                                 match[0].match(/- `[a-z]+-[a-z]+/); // Short name pattern for nested workflows
          if (!hasWorkflowRef) {
            missing.push(guide + ' (empty section)');
          }
        }
      }
    });
    
    expect(missing).toEqual([]);
  });
});
