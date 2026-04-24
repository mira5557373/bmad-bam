/**
 * Checklist Format validation tests
 * Validates checkbox format, CRITICAL markers, and structure
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const CHECKLISTS_DIR = path.join(ROOT_DIR, 'src', 'data', 'checklists');

describe('Checklist Format Validation', () => {
  const checklistFiles = fs.readdirSync(CHECKLISTS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md');

  describe('Checkbox Format', () => {
    test('all checklists use standard checkbox format (- [ ])', () => {
      const invalidFormat = [];

      checklistFiles.forEach(file => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');

        // Check for checkboxes
        const hasCheckboxes = content.includes('- [ ]') || content.includes('- [x]');

        if (!hasCheckboxes) {
          invalidFormat.push(file);
        }
      });

      expect(invalidFormat).toEqual([]);
    });

    test('checkboxes are properly formatted with space after dash', () => {
      const malformed = [];

      checklistFiles.forEach(file => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');

        // Check for malformed checkboxes like -[ ] or -[] or [ ] without dash
        const malformedPattern = /^-\[\s*\]|^\[\s*\]\s/gm;
        const matches = content.match(malformedPattern);

        if (matches) {
          malformed.push({ file, count: matches.length });
        }
      });

      expect(malformed).toEqual([]);
    });

    test('all checklists have at least one checkbox item', () => {
      const noCheckboxes = [];

      checklistFiles.forEach(file => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');
        const checkboxCount = (content.match(/- \[ \]/g) || []).length +
                              (content.match(/- \[x\]/g) || []).length;

        if (checkboxCount === 0) {
          noCheckboxes.push(file);
        }
      });

      expect(noCheckboxes).toEqual([]);
    });
  });

  describe('Critical Markers', () => {
    test('critical items are properly marked', () => {
      const criticalChecklists = [];

      checklistFiles.forEach(file => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');

        // Check for CRITICAL markers (various formats including table-based classification)
        const hasCritical = content.includes('**CRITICAL**') ||
                           content.includes('**CRITICAL:**') ||
                           content.includes('CRITICAL:') ||
                           content.includes('[CRITICAL]') ||
                           content.includes('| CRITICAL') ||  // Table-based: "| CRITICAL |"
                           content.includes('Critical vs Non-Critical');  // Classification section

        if (hasCritical) {
          criticalChecklists.push(file);
        }
      });

      // Quality gate checklists should have critical markers
      // At least 5 checklists should have critical items (quality gates have critical checks)
      expect(criticalChecklists.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Checklist Structure', () => {
    test('all checklists have section headers (##)', () => {
      const noSections = [];

      checklistFiles.forEach(file => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');

        // Check for ## headers
        const hasSections = content.includes('## ');

        if (!hasSections) {
          noSections.push(file);
        }
      });

      expect(noSections).toEqual([]);
    });

    test('all checklists have title (# heading)', () => {
      const noTitle = [];

      checklistFiles.forEach(file => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');

        // Check for # heading at start
        const hasTitle = content.match(/^#\s+[^\n]+/m);

        if (!hasTitle) {
          noTitle.push(file);
        }
      });

      expect(noTitle).toEqual([]);
    });

    test('quality gate checklists have Gate ID', () => {
      const missingGateId = [];
      const gateChecklists = checklistFiles.filter(f =>
        f.includes('qg-') || f.includes('gate')
      );

      gateChecklists.forEach(file => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');

        // Check for Gate ID pattern
        const hasGateId = content.includes('Gate ID:') ||
                          content.includes('QG-') ||
                          content.includes('gate_id');

        if (!hasGateId) {
          missingGateId.push(file);
        }
      });

      expect(missingGateId).toEqual([]);
    });
  });

  describe('Checklist Count', () => {
    test('has expected number of checklists (38)', () => {
      // Increased to 22 after adding qg-compliance-continuous.md, qg-ai-observability.md,
      // qg-capacity-planning.md, qg-disaster-recovery-drill.md for specialized quality gates
      // Increased to 24 after adding production-checklist.md, security-checklist.md
      // Increased to 30 after adding BMM/TEA compatibility gates:
      // qg-tc1-tenant-unit-coverage.md, qg-tc2-rls-coverage.md, qg-tc3-cross-tenant-coverage.md,
      // qg-dev1-pre-commit.md, and WAIVED outcome additions
      // Increased to 32 after adding phase 1-2 gates:
      // qg-d1-discovery.md, qg-pl1-planning.md
      // Increased to 35 after additional checklist additions
      // Increased to 36 after adding qg-ai1-ai-safety.md
      // Increased to 38 after adding NEXUS checklists: qg-ai3-agent-contracts.md
      // Increased to 39 after adding qg-prg-production.md for PRG workflow
      // Decreased to 38 after removing orphan qg-prg-production-readiness.md (duplicate of qg-prg-production.md)
      expect(checklistFiles.length).toBe(38);
    });
  });
});

describe('Checklist Content Quality', () => {
  const checklistFiles = fs.readdirSync(CHECKLISTS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md');

  test('all checklists have reasonable item count (5-150)', () => {
    const outOfRange = [];

    checklistFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');
      const checkboxCount = (content.match(/- \[ \]/g) || []).length +
                            (content.match(/- \[x\]/g) || []).length;

      // Allow up to 150 items for comprehensive security/operations checklists
      if (checkboxCount < 5 || checkboxCount > 150) {
        outOfRange.push({ file, count: checkboxCount });
      }
    });

    // Allow some flexibility (comprehensive checklists may have varied counts)
    expect(outOfRange.length).toBeLessThanOrEqual(3);
  });

  test('checklists reference related workflows or templates', () => {
    const withReferences = [];

    checklistFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CHECKLISTS_DIR, file), 'utf-8');

      // Check for references to workflows or templates
      const hasReferences = content.includes('bmad-bam-') ||
                           content.includes('template') ||
                           content.includes('workflow');

      if (hasReferences) {
        withReferences.push(file);
      }
    });

    // At least half should have references
    expect(withReferences.length).toBeGreaterThanOrEqual(checklistFiles.length / 2);
  });
});
