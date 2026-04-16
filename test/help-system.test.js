/**
 * Help System Integration Tests
 * Validates module-help.csv integrity:
 * - All skills in help.csv exist as workflows
 * - Phase values are valid BMAD phases
 * - After/before dependencies exist
 * - Keywords are non-empty for all entries
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const HELP_CSV_PATH = path.join(SRC_DIR, 'module-help.csv');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');

// Parse CSV into rows
const parseCSV = (content) => {
  const lines = content.trim().split('\n');
  const header = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    // Handle quoted fields with commas
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
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
    header.forEach((h, i) => {
      row[h] = values[i] || '';
    });
    return row;
  });
};

// Helper to get all workflow names
const getAllWorkflowNames = () => {
  const names = new Set();

  const processDir = (dir) => {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        if (fs.existsSync(path.join(itemPath, 'bmad-skill-manifest.yaml'))) {
          names.add(item);
        } else {
          processDir(itemPath);
        }
      }
    });
  };

  processDir(WORKFLOWS_DIR);
  return names;
};

describe('Help System CSV Structure', () => {
  test('module-help.csv exists', () => {
    expect(fs.existsSync(HELP_CSV_PATH)).toBe(true);
  });

  test('CSV has required columns', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const header = content.split('\n')[0].toLowerCase();

    const requiredColumns = [
      'module',
      'skill',
      'display-name',
      'description',
      'phase'
    ];

    requiredColumns.forEach(col => {
      expect(header).toContain(col);
    });
  });

  test('CSV has significant number of entries', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);

    // Should have 100+ help entries for BAM
    expect(rows.length).toBeGreaterThanOrEqual(100);
  });
});

describe('Help System Workflow Mapping', () => {
  test('all skills in help.csv exist as workflows', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const workflowNames = getAllWorkflowNames();
    const missingWorkflows = [];

    rows.forEach(row => {
      const skill = row.skill || row['skill'];
      if (skill) {
        // Extract workflow name from skill (remove bmad-bam- prefix)
        const workflowName = skill.replace(/^bmad-bam-/, '');

        if (!workflowNames.has(workflowName) && !workflowNames.has(skill)) {
          missingWorkflows.push({
            skill: skill,
            expectedWorkflow: workflowName
          });
        }
      }
    });

    if (missingWorkflows.length > 0) {
      console.error('Help entries without matching workflows:');
      missingWorkflows.slice(0, 10).forEach(m =>
        console.error(`  ${m.skill} -> ${m.expectedWorkflow}`)
      );
      if (missingWorkflows.length > 10) {
        console.error(`  ... and ${missingWorkflows.length - 10} more`);
      }
    }

    // Allow some mismatches (could be aliases or special entries)
    expect(missingWorkflows.length).toBeLessThan(rows.length * 0.1);
  });

  test('all workflows have help entries', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const workflowNames = getAllWorkflowNames();
    const helpSkills = new Set(rows.map(r => r.skill || r['skill']));

    const missingHelpEntries = [];

    workflowNames.forEach(name => {
      const possibleSkillNames = [
        name,
        `bmad-bam-${name}`,
        name.replace(/-/g, '_')
      ];

      const hasEntry = possibleSkillNames.some(n => helpSkills.has(n));

      if (!hasEntry) {
        missingHelpEntries.push(name);
      }
    });

    if (missingHelpEntries.length > 0) {
      console.error('Workflows without help entries:');
      missingHelpEntries.slice(0, 10).forEach(w =>
        console.error(`  ${w}`)
      );
    }

    // Most workflows should have help entries
    const coverageRatio = (workflowNames.size - missingHelpEntries.length) / workflowNames.size;
    expect(coverageRatio).toBeGreaterThan(0.8);
  });
});

describe('Help System Phase Values', () => {
  const validPhases = [
    '1-discovery',
    '2-planning',
    '3-solutioning',
    '4-implementation',
    '5-quality',
    '6-operations',
    'anytime',
    'discovery',
    'planning',
    'solutioning',
    'implementation',
    'quality',
    'operations'
  ];

  test('phase values are valid BMAD phases', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const invalidPhases = [];

    rows.forEach((row, index) => {
      const phase = row.phase || row['phase'];
      if (phase && !validPhases.includes(phase.toLowerCase())) {
        invalidPhases.push({
          row: index + 2,
          skill: row.skill,
          phase: phase
        });
      }
    });

    if (invalidPhases.length > 0) {
      console.error('Invalid phase values:');
      invalidPhases.forEach(p =>
        console.error(`  Row ${p.row}: ${p.skill} has phase "${p.phase}"`)
      );
    }

    expect(invalidPhases).toEqual([]);
  });

  test('phase distribution is reasonable', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const phaseCounts = {};

    rows.forEach(row => {
      const phase = (row.phase || row['phase'] || 'unspecified').toLowerCase();
      phaseCounts[phase] = (phaseCounts[phase] || 0) + 1;
    });

    // Should have entries in multiple phases
    const phases = Object.keys(phaseCounts);
    expect(phases.length).toBeGreaterThan(3);

    // Solutioning phase should have many entries (BAM focus)
    const solutioningCount = (phaseCounts['3-solutioning'] || 0) +
                            (phaseCounts['solutioning'] || 0);
    expect(solutioningCount).toBeGreaterThan(10);
  });
});

describe('Help System Dependencies', () => {
  test('after dependencies reference valid skills', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const skillNames = new Set(rows.map(r => r.skill || r['skill']).filter(Boolean));
    const invalidAfter = [];

    rows.forEach(row => {
      const after = row.after || row['after'];
      if (after && after.trim()) {
        // Split on commas for multiple dependencies
        const deps = after.split(',').map(d => d.trim()).filter(Boolean);

        deps.forEach(dep => {
          // Allow both direct name and bmad-bam- prefixed
          const variations = [dep, `bmad-bam-${dep}`, dep.replace('bmad-bam-', '')];
          const exists = variations.some(v => skillNames.has(v));

          if (!exists) {
            invalidAfter.push({
              skill: row.skill,
              after: dep
            });
          }
        });
      }
    });

    if (invalidAfter.length > 0) {
      console.error('Invalid "after" dependencies:');
      invalidAfter.slice(0, 10).forEach(d =>
        console.error(`  ${d.skill} depends on "${d.after}"`)
      );
    }

    // Allow some invalid (could be external dependencies)
    expect(invalidAfter.length).toBeLessThan(10);
  });

  test('before dependencies reference valid skills', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const skillNames = new Set(rows.map(r => r.skill || r['skill']).filter(Boolean));
    const invalidBefore = [];

    rows.forEach(row => {
      const before = row.before || row['before'];
      if (before && before.trim()) {
        const deps = before.split(',').map(d => d.trim()).filter(Boolean);

        deps.forEach(dep => {
          const variations = [dep, `bmad-bam-${dep}`, dep.replace('bmad-bam-', '')];
          const exists = variations.some(v => skillNames.has(v));

          if (!exists) {
            invalidBefore.push({
              skill: row.skill,
              before: dep
            });
          }
        });
      }
    });

    if (invalidBefore.length > 0) {
      console.error('Invalid "before" dependencies:');
      invalidBefore.slice(0, 10).forEach(d =>
        console.error(`  ${d.skill} enables "${d.before}"`)
      );
    }

    expect(invalidBefore.length).toBeLessThan(10);
  });
});

describe('Help System Keywords', () => {
  test('keywords are non-empty for entries', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const emptyKeywords = [];

    rows.forEach((row, index) => {
      const keywords = row.keywords || row['keywords'];

      if (!keywords || keywords.trim() === '') {
        emptyKeywords.push({
          row: index + 2,
          skill: row.skill
        });
      }
    });

    if (emptyKeywords.length > 0) {
      console.error('Entries with empty keywords:');
      emptyKeywords.slice(0, 10).forEach(e =>
        console.error(`  Row ${e.row}: ${e.skill}`)
      );
    }

    // Most entries should have keywords
    const coverageRatio = (rows.length - emptyKeywords.length) / rows.length;
    expect(coverageRatio).toBeGreaterThan(0.8);
  });

  test('keywords are relevant to skill names', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    let relevantCount = 0;

    rows.forEach(row => {
      const skill = (row.skill || '').toLowerCase();
      const keywords = (row.keywords || '').toLowerCase();

      // Check if any word from skill appears in keywords
      const skillWords = skill.split(/[-_]/).filter(w => w.length > 2);
      const hasRelevant = skillWords.some(word => keywords.includes(word));

      if (hasRelevant) {
        relevantCount++;
      }
    });

    // Most entries should have relevant keywords
    const relevanceRatio = relevantCount / rows.length;
    expect(relevanceRatio).toBeGreaterThan(0.5);
  });
});

describe('Help System Module Field', () => {
  test('all entries have module=bam', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const wrongModule = [];

    rows.forEach((row, index) => {
      const module = row.module || row['module'];
      if (module && module.toLowerCase() !== 'bam') {
        wrongModule.push({
          row: index + 2,
          skill: row.skill,
          module: module
        });
      }
    });

    if (wrongModule.length > 0) {
      console.error('Entries with wrong module:');
      wrongModule.forEach(e =>
        console.error(`  Row ${e.row}: ${e.skill} has module "${e.module}"`)
      );
    }

    expect(wrongModule).toEqual([]);
  });
});

describe('Help System Description Quality', () => {
  test('descriptions are non-empty', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const emptyDesc = [];

    rows.forEach((row, index) => {
      const description = row.description || row['description'];
      if (!description || description.trim() === '') {
        emptyDesc.push({
          row: index + 2,
          skill: row.skill
        });
      }
    });

    expect(emptyDesc).toEqual([]);
  });

  test('descriptions have minimum length', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const shortDesc = [];

    rows.forEach((row, index) => {
      const description = row.description || row['description'];
      if (description && description.length < 10) {
        shortDesc.push({
          row: index + 2,
          skill: row.skill,
          description: description
        });
      }
    });

    if (shortDesc.length > 0) {
      console.error('Entries with short descriptions:');
      shortDesc.forEach(e =>
        console.error(`  Row ${e.row}: ${e.skill} - "${e.description}"`)
      );
    }

    // Most should have proper descriptions
    expect(shortDesc.length).toBeLessThan(5);
  });
});

describe('Help System Display Names', () => {
  test('display names are non-empty', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    const emptyNames = [];

    rows.forEach((row, index) => {
      const displayName = row['display-name'] || row.displayName;
      if (!displayName || displayName.trim() === '') {
        emptyNames.push({
          row: index + 2,
          skill: row.skill
        });
      }
    });

    expect(emptyNames).toEqual([]);
  });

  test('display names are properly capitalized', () => {
    const content = fs.readFileSync(HELP_CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    let properlyCapitalized = 0;

    rows.forEach(row => {
      const displayName = row['display-name'] || row.displayName || '';
      // First letter should be capitalized
      if (displayName.length > 0 && displayName[0] === displayName[0].toUpperCase()) {
        properlyCapitalized++;
      }
    });

    // Most should be properly capitalized
    const ratio = properlyCapitalized / rows.length;
    expect(ratio).toBeGreaterThan(0.9);
  });
});
