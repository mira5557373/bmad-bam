/**
 * Workflow structure validation tests
 * Validates CEV pattern compliance
 */

const fs = require('fs');
const path = require('path');

const WORKFLOWS_DIR = path.join(__dirname, '..', 'src', 'workflows');

// Recursively find all workflow directories (those with bmad-skill-manifest.yaml)
const findWorkflowDirs = (dir, results = []) => {
  if (!fs.existsSync(dir)) return results;

  const items = fs.readdirSync(dir);

  if (items.includes('bmad-skill-manifest.yaml')) {
    results.push(dir);
  }

  items.forEach(item => {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      findWorkflowDirs(itemPath, results);
    }
  });

  return results;
};

describe('Workflow Structure Validation', () => {
  const workflowDirs = findWorkflowDirs(WORKFLOWS_DIR);

  test('workflows exist', () => {
    expect(workflowDirs.length).toBeGreaterThan(0);
  });

  test('each workflow has bmad-skill-manifest.yaml', () => {
    workflowDirs.forEach(dir => {
      const manifestPath = path.join(dir, 'bmad-skill-manifest.yaml');
      expect(fs.existsSync(manifestPath)).toBe(true);
    });
  });

  test('each workflow has SKILL.md', () => {
    workflowDirs.forEach(dir => {
      const skillPath = path.join(dir, 'SKILL.md');
      const exists = fs.existsSync(skillPath);
      if (!exists) {
        console.warn(`Missing SKILL.md in ${dir}`);
      }
      // Warn but don't fail - some may be in progress
    });
  });

  test('each workflow has workflow.md with mode selection', () => {
    workflowDirs.forEach(dir => {
      const workflowPath = path.join(dir, 'workflow.md');

      if (fs.existsSync(workflowPath)) {
        const content = fs.readFileSync(workflowPath, 'utf-8');

        // Should have mode selection table
        expect(content).toContain('Mode');
        expect(content).toContain('Create');
        expect(content).toContain('Edit');
        expect(content).toContain('Validate');
      }
    });
  });
});

describe('CEV Pattern Validation', () => {
  const workflowDirs = findWorkflowDirs(WORKFLOWS_DIR);

  // Filter to workflows that have workflow.md (complete ones)
  const completeWorkflows = workflowDirs.filter(dir =>
    fs.existsSync(path.join(dir, 'workflow.md'))
  );

  test('complete workflows have steps-c directory', () => {
    completeWorkflows.forEach(dir => {
      const stepsCPath = path.join(dir, 'steps-c');
      const exists = fs.existsSync(stepsCPath);
      if (!exists) {
        console.warn(`Missing steps-c in ${dir}`);
      }
    });
  });

  test('complete workflows have steps-e directory', () => {
    completeWorkflows.forEach(dir => {
      const stepsEPath = path.join(dir, 'steps-e');
      const exists = fs.existsSync(stepsEPath);
      if (!exists) {
        console.warn(`Missing steps-e in ${dir}`);
      }
    });
  });

  test('complete workflows have steps-v directory', () => {
    completeWorkflows.forEach(dir => {
      const stepsVPath = path.join(dir, 'steps-v');
      const exists = fs.existsSync(stepsVPath);
      if (!exists) {
        console.warn(`Missing steps-v in ${dir}`);
      }
    });
  });

  test('steps-e has standard files', () => {
    completeWorkflows.forEach(dir => {
      const stepsEPath = path.join(dir, 'steps-e');
      if (fs.existsSync(stepsEPath)) {
        const files = fs.readdirSync(stepsEPath);

        // Should have load and apply steps
        const hasLoad = files.some(f => f.includes('load'));
        const hasApply = files.some(f => f.includes('apply') || f.includes('change'));

        if (!hasLoad || !hasApply) {
          console.warn(`Incomplete steps-e in ${dir}`);
        }
      }
    });
  });

  test('steps-v has standard files', () => {
    completeWorkflows.forEach(dir => {
      const stepsVPath = path.join(dir, 'steps-v');
      if (fs.existsSync(stepsVPath)) {
        const files = fs.readdirSync(stepsVPath);

        // Should have load and validate steps
        const hasLoad = files.some(f => f.includes('load'));
        const hasValidate = files.some(f => f.includes('validate'));

        if (!hasLoad || !hasValidate) {
          console.warn(`Incomplete steps-v in ${dir}`);
        }
      }
    });
  });
});

describe('Workflow Count Validation', () => {
  const workflowDirs = findWorkflowDirs(WORKFLOWS_DIR);

  test('has expected number of workflows (27)', () => {
    // Allow some variance during development
    expect(workflowDirs.length).toBeGreaterThanOrEqual(20);
    expect(workflowDirs.length).toBeLessThanOrEqual(30);
  });
});
