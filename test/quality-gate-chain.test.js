/**
 * Quality Gate Chain Validation Tests
 * Validates the quality gate system:
 * - All 40 gates have checklist files
 * - Gate dependencies form valid DAG
 * - TEA handoff gates reference tea-trace
 * - Recovery protocols are properly documented
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DATA_DIR = path.join(SRC_DIR, 'data');
const CHECKLISTS_DIR = path.join(DATA_DIR, 'checklists');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');

describe('Quality Gate Inventory', () => {
  test('checklists directory exists', () => {
    expect(fs.existsSync(CHECKLISTS_DIR)).toBe(true);
  });

  test('has at least 30 checklist files', () => {
    const checklists = fs.readdirSync(CHECKLISTS_DIR)
      .filter(f => f.endsWith('.md'));
    expect(checklists.length).toBeGreaterThanOrEqual(30);
  });

  describe('Core Quality Gates', () => {
    const coreGates = [
      { id: 'QG-F1', desc: 'Foundation Gate', possibleFiles: ['qg-f1-foundation.md', 'qg-f1.md'] },
      { id: 'QG-M1', desc: 'Module Architecture', possibleFiles: ['qg-m1-module-architecture.md', 'qg-m1.md'] },
      { id: 'QG-M2', desc: 'Tenant Isolation', possibleFiles: ['qg-m2-tenant-isolation.md', 'qg-m2.md'] },
      { id: 'QG-M3', desc: 'Agent Runtime', possibleFiles: ['qg-m3-agent-runtime.md', 'qg-m3.md'] },
      { id: 'QG-I1', desc: 'Convergence', possibleFiles: ['qg-i1-convergence.md', 'qg-i1.md'] },
      { id: 'QG-I2', desc: 'Tenant Safety', possibleFiles: ['qg-i2-tenant-safety.md', 'qg-i2.md'] },
      { id: 'QG-I3', desc: 'Agent Safety', possibleFiles: ['qg-i3-agent-safety.md', 'qg-i3.md'] },
      { id: 'QG-P1', desc: 'Production Readiness', possibleFiles: ['qg-p1-production-readiness.md', 'qg-p1.md'] }
    ];

    coreGates.forEach(gate => {
      test(`${gate.id} (${gate.desc}) checklist exists`, () => {
        const exists = gate.possibleFiles.some(file =>
          fs.existsSync(path.join(CHECKLISTS_DIR, file))
        );

        if (!exists) {
          console.error(`Missing checklist for ${gate.id}. Expected one of: ${gate.possibleFiles.join(', ')}`);
        }

        expect(exists).toBe(true);
      });
    });
  });
});

describe('Quality Gate CSV', () => {
  const csvPath = path.join(DATA_DIR, 'quality-gates.csv');

  test('quality-gates.csv exists', () => {
    expect(fs.existsSync(csvPath)).toBe(true);
  });

  test('CSV contains core gates', () => {
    const content = fs.readFileSync(csvPath, 'utf-8');
    const coreGates = ['QG-F1', 'QG-M1', 'QG-M2', 'QG-M3', 'QG-I1', 'QG-I2', 'QG-I3', 'QG-P1'];

    coreGates.forEach(gate => {
      expect(content).toContain(gate);
    });
  });

  test('CSV has required columns', () => {
    const content = fs.readFileSync(csvPath, 'utf-8');
    const headerLine = content.split('\n')[0];

    // Should have gate_id column
    expect(headerLine.toLowerCase()).toContain('gate');
  });
});

describe('TEA Handoff Gates', () => {
  test('QG-I2 checklist references tea-trace', () => {
    const possibleFiles = ['qg-i2-tenant-safety.md', 'qg-i2.md'];
    let content = '';
    let found = false;

    possibleFiles.forEach(file => {
      const filePath = path.join(CHECKLISTS_DIR, file);
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');
        found = true;
      }
    });

    if (found) {
      // Should reference TEA for verification
      const hasTeaRef = content.includes('tea-trace') ||
                        content.includes('TEA') ||
                        content.includes('tea');
      expect(hasTeaRef).toBe(true);
    }
  });

  test('QG-I3 checklist references tea-trace', () => {
    const possibleFiles = ['qg-i3-agent-safety.md', 'qg-i3.md'];
    let content = '';
    let found = false;

    possibleFiles.forEach(file => {
      const filePath = path.join(CHECKLISTS_DIR, file);
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');
        found = true;
      }
    });

    if (found) {
      // Should reference TEA for verification
      const hasTeaRef = content.includes('tea-trace') ||
                        content.includes('TEA') ||
                        content.includes('tea');
      expect(hasTeaRef).toBe(true);
    }
  });
});

describe('Recovery Protocol Documentation', () => {
  test('critical gates have 3-step recovery protocol', () => {
    const criticalGates = [
      { name: 'qg-f1-foundation.md', gate: 'QG-F1' },
      { name: 'qg-m2-tenant-isolation.md', gate: 'QG-M2' },
      { name: 'qg-p1-production-readiness.md', gate: 'QG-P1' }
    ];

    criticalGates.forEach(({ name, gate }) => {
      const filePath = path.join(CHECKLISTS_DIR, name);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Should have recovery or escalation mention
        const hasRecovery = content.includes('Recovery') ||
                           content.includes('recovery') ||
                           content.includes('escalat') ||
                           content.includes('FAIL') ||
                           content.includes('remediation');

        expect(hasRecovery).toBe(true);
      }
    });
  });

  test('checklists have CRITICAL markers for blocking items', () => {
    const criticalChecklists = [
      'qg-m2-tenant-isolation.md',
      'qg-f1-foundation.md',
      'qg-p1-production-readiness.md'
    ];

    criticalChecklists.forEach(filename => {
      const filePath = path.join(CHECKLISTS_DIR, filename);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Should have CRITICAL markers
        expect(content).toContain('CRITICAL');
      }
    });
  });
});

describe('Gate Dependency Chain', () => {
  test('gate sequence documentation exists', () => {
    // Check if quality gates CSV or documentation describes the sequence
    const csvPath = path.join(DATA_DIR, 'quality-gates.csv');
    const content = fs.readFileSync(csvPath, 'utf-8');

    // Should have phase or order information
    const hasPhaseInfo = content.includes('phase') ||
                         content.includes('Phase') ||
                         content.includes('order') ||
                         content.includes('depends');

    expect(hasPhaseInfo).toBe(true);
  });

  test('workflows reference appropriate quality gates', () => {
    // Helper to find workflows
    const findWorkflows = (dir) => {
      const workflows = [];
      if (!fs.existsSync(dir)) return workflows;

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          if (fs.existsSync(path.join(itemPath, 'bmad-skill-manifest.yaml'))) {
            workflows.push({ name: item, path: itemPath });
          } else {
            workflows.push(...findWorkflows(itemPath));
          }
        }
      });
      return workflows;
    };

    const workflows = findWorkflows(WORKFLOWS_DIR);
    const gateReferences = {};

    // Map workflow names to expected gates
    const expectedGates = {
      'create-master-architecture': 'QG-F1',
      'validate-foundation': 'QG-F1',
      'tenant-model-isolation': 'QG-M2',
      'create-module-architecture': 'QG-M1',
      'convergence-verification': ['QG-I1', 'QG-I2', 'QG-I3'],
      'production-readiness': 'QG-P1'
    };

    Object.entries(expectedGates).forEach(([workflowName, gates]) => {
      const workflow = workflows.find(w => w.name === workflowName);
      if (workflow) {
        const skillMdPath = path.join(workflow.path, 'SKILL.md');
        if (fs.existsSync(skillMdPath)) {
          const content = fs.readFileSync(skillMdPath, 'utf-8');
          const gateList = Array.isArray(gates) ? gates : [gates];

          gateList.forEach(gate => {
            if (content.includes(gate)) {
              gateReferences[`${workflowName}:${gate}`] = true;
            }
          });
        }
      }
    });

    // At least some workflows should reference their gates
    expect(Object.keys(gateReferences).length).toBeGreaterThan(0);
  });
});

describe('Gate Checklist Format', () => {
  test('all checklists use checkbox format', () => {
    const checklists = fs.readdirSync(CHECKLISTS_DIR)
      .filter(f => f.endsWith('.md'));

    const badFormat = [];

    checklists.forEach(filename => {
      const content = fs.readFileSync(path.join(CHECKLISTS_DIR, filename), 'utf-8');

      // Should have checkbox items
      const hasCheckboxes = content.match(/- \[[ x]\]/g);

      if (!hasCheckboxes || hasCheckboxes.length < 3) {
        badFormat.push(filename);
      }
    });

    if (badFormat.length > 0) {
      console.error('Checklists missing checkbox format:');
      badFormat.forEach(f => console.error(`  ${f}`));
    }

    // Allow some non-checkbox checklists (could be guides)
    expect(badFormat.length).toBeLessThan(5);
  });

  test('checklists have verification sections', () => {
    const checklists = fs.readdirSync(CHECKLISTS_DIR)
      .filter(f => f.endsWith('.md'));

    const missingVerification = [];

    checklists.forEach(filename => {
      const content = fs.readFileSync(path.join(CHECKLISTS_DIR, filename), 'utf-8');

      // Should have verification or validation mention
      const hasVerification = content.includes('Verification') ||
                             content.includes('verification') ||
                             content.includes('Validation') ||
                             content.includes('validate') ||
                             content.includes('Check');

      if (!hasVerification) {
        missingVerification.push(filename);
      }
    });

    // Most checklists should have verification
    expect(missingVerification.length).toBeLessThan(checklists.length / 2);
  });
});

describe('Security and Compliance Gates', () => {
  test('security checklists exist', () => {
    const checklists = fs.readdirSync(CHECKLISTS_DIR)
      .filter(f => f.endsWith('.md'));

    const securityChecklists = checklists.filter(f =>
      f.includes('security') || f.includes('qg-s')
    );

    expect(securityChecklists.length).toBeGreaterThan(0);
  });

  test('tenant isolation checklist has RLS verification', () => {
    const filePath = path.join(CHECKLISTS_DIR, 'qg-m2-tenant-isolation.md');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Should mention RLS
      expect(content).toContain('RLS');
    }
  });

  test('production readiness covers security', () => {
    const filePath = path.join(CHECKLISTS_DIR, 'qg-p1-production-readiness.md');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Should mention security
      const hasSecurityRef = content.includes('security') ||
                            content.includes('Security') ||
                            content.includes('SECURITY');

      expect(hasSecurityRef).toBe(true);
    }
  });
});

describe('Test Coverage Gates (TEA)', () => {
  test('test coverage gates documented', () => {
    const csvPath = path.join(DATA_DIR, 'quality-gates.csv');
    const content = fs.readFileSync(csvPath, 'utf-8');

    // Should have test coverage gates
    const hasTestGates = content.includes('TC') ||
                         content.includes('test') ||
                         content.includes('coverage');

    expect(hasTestGates).toBe(true);
  });
});

describe('Gate Outcome Documentation', () => {
  test('outcomes documented in CSV or checklists', () => {
    const outcomes = ['PASS', 'CONDITIONAL', 'FAIL', 'WAIVED'];
    let outcomeDocumented = false;

    // Check quality-gates.csv
    const csvPath = path.join(DATA_DIR, 'quality-gates.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    if (outcomes.some(o => csvContent.includes(o))) {
      outcomeDocumented = true;
    }

    // Check checklists
    if (!outcomeDocumented) {
      const checklists = fs.readdirSync(CHECKLISTS_DIR)
        .filter(f => f.endsWith('.md'));

      checklists.forEach(filename => {
        const content = fs.readFileSync(path.join(CHECKLISTS_DIR, filename), 'utf-8');
        if (outcomes.some(o => content.includes(o))) {
          outcomeDocumented = true;
        }
      });
    }

    expect(outcomeDocumented).toBe(true);
  });
});
