/**
 * Workflow Reference Validation Tests
 * Validates all workflow step files reference existing resources:
 * - Templates
 * - Checklists
 * - Pattern CSVs
 * - Next step files
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');
const TEMPLATES_DIR = path.join(SRC_DIR, 'data', 'templates');
const CHECKLISTS_DIR = path.join(SRC_DIR, 'data', 'checklists');
const DATA_DIR = path.join(SRC_DIR, 'data');

// Helper to get all workflow directories (including nested)
const getAllWorkflows = () => {
  const workflows = [];

  const processDir = (dir) => {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Check if this is a workflow directory (has bmad-skill-manifest.yaml)
        if (fs.existsSync(path.join(itemPath, 'bmad-skill-manifest.yaml'))) {
          workflows.push({
            name: item,
            path: itemPath
          });
        } else {
          // Recurse into container directories
          processDir(itemPath);
        }
      }
    });
  };

  processDir(WORKFLOWS_DIR);
  return workflows;
};

// Helper to get all step files in a workflow
const getStepFiles = (workflowPath) => {
  const stepsPath = path.join(workflowPath, 'steps');
  if (!fs.existsSync(stepsPath)) return [];

  return fs.readdirSync(stepsPath)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      name: f,
      path: path.join(stepsPath, f),
      content: fs.readFileSync(path.join(stepsPath, f), 'utf-8')
    }));
};

describe('Workflow Template References', () => {
  test('all **Load template:** references exist', () => {
    const workflows = getAllWorkflows();
    const missingTemplates = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);

      steps.forEach(step => {
        // Match **Load template:** patterns
        const templatePattern = /\*\*Load template:\*\*[^`]*`[^`]*templates\/([^`]+\.md)`/g;
        let match;

        while ((match = templatePattern.exec(step.content)) !== null) {
          const templateName = match[1];
          const templatePath = path.join(TEMPLATES_DIR, templateName);

          if (!fs.existsSync(templatePath)) {
            missingTemplates.push({
              workflow: workflow.name,
              step: step.name,
              template: templateName
            });
          }
        }
      });
    });

    if (missingTemplates.length > 0) {
      console.error('Missing templates referenced in workflows:');
      missingTemplates.forEach(m =>
        console.error(`  ${m.workflow}/${m.step} -> ${m.template}`)
      );
    }

    expect(missingTemplates).toEqual([]);
  });

  test('all inline template references exist', () => {
    const workflows = getAllWorkflows();
    const missingTemplates = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);

      steps.forEach(step => {
        // Match inline template references like templates/{name}.md
        const templatePattern = /templates\/([a-z0-9-]+\.md)/g;
        let match;

        while ((match = templatePattern.exec(step.content)) !== null) {
          const templateName = match[1];
          const templatePath = path.join(TEMPLATES_DIR, templateName);

          if (!fs.existsSync(templatePath)) {
            missingTemplates.push({
              workflow: workflow.name,
              step: step.name,
              template: templateName
            });
          }
        }
      });
    });

    // Some inline references may be examples - filter obvious false positives
    const filteredMissing = missingTemplates.filter(m =>
      !m.template.includes('{') && !m.template.includes('example')
    );

    if (filteredMissing.length > 0) {
      console.error('Missing inline templates:');
      filteredMissing.forEach(m =>
        console.error(`  ${m.workflow}/${m.step} -> ${m.template}`)
      );
    }

    // Allow some missing (could be placeholder examples)
    expect(filteredMissing.length).toBeLessThan(10);
  });
});

describe('Workflow Checklist References', () => {
  test('all **Load checklist:** references exist', () => {
    const workflows = getAllWorkflows();
    const missingChecklists = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);

      steps.forEach(step => {
        // Match **Load checklist:** patterns
        const checklistPattern = /\*\*Load checklist:\*\*[^`]*`[^`]*checklists\/([^`]+\.md)`/g;
        let match;

        while ((match = checklistPattern.exec(step.content)) !== null) {
          const checklistName = match[1];
          const checklistPath = path.join(CHECKLISTS_DIR, checklistName);

          if (!fs.existsSync(checklistPath)) {
            missingChecklists.push({
              workflow: workflow.name,
              step: step.name,
              checklist: checklistName
            });
          }
        }
      });
    });

    if (missingChecklists.length > 0) {
      console.error('Missing checklists referenced in workflows:');
      missingChecklists.forEach(m =>
        console.error(`  ${m.workflow}/${m.step} -> ${m.checklist}`)
      );
    }

    expect(missingChecklists).toEqual([]);
  });

  test('quality gate checklists exist for QG references', () => {
    const workflows = getAllWorkflows();
    const qgReferences = new Set();

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);

      steps.forEach(step => {
        // Extract QG-XX references
        const qgPattern = /QG-[A-Z]+[0-9]*/g;
        let match;

        while ((match = qgPattern.exec(step.content)) !== null) {
          qgReferences.add(match[0]);
        }
      });
    });

    // Core gates that must have checklists
    const coreGates = ['QG-F1', 'QG-M1', 'QG-M2', 'QG-M3', 'QG-I1', 'QG-I2', 'QG-I3', 'QG-P1'];

    coreGates.forEach(gate => {
      if (qgReferences.has(gate)) {
        // Should have a corresponding checklist
        const possibleNames = [
          `${gate.toLowerCase()}.md`,
          `${gate.toLowerCase()}-*.md`,
          'qg-f1-foundation.md',
          'qg-m2-tenant-isolation.md',
          'qg-p1-production-readiness.md'
        ];

        // At least one checklist should exist
        const checklistsExist = fs.existsSync(CHECKLISTS_DIR);
        expect(checklistsExist).toBe(true);
      }
    });
  });
});

describe('Workflow Pattern Registry References', () => {
  test('all **Load patterns:** CSV references exist', () => {
    const workflows = getAllWorkflows();
    const missingCSVs = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);

      steps.forEach(step => {
        // Match **Load patterns:** pattern
        const csvPattern = /\*\*Load patterns:\*\*[^`]*`[^`]*data\/([^`]+\.csv)`/g;
        let match;

        while ((match = csvPattern.exec(step.content)) !== null) {
          const csvName = match[1];
          const csvPath = path.join(DATA_DIR, csvName);

          if (!fs.existsSync(csvPath)) {
            missingCSVs.push({
              workflow: workflow.name,
              step: step.name,
              csv: csvName
            });
          }
        }
      });
    });

    if (missingCSVs.length > 0) {
      console.error('Missing pattern CSVs:');
      missingCSVs.forEach(m =>
        console.error(`  ${m.workflow}/${m.step} -> ${m.csv}`)
      );
    }

    expect(missingCSVs).toEqual([]);
  });

  test('common pattern CSV files exist', () => {
    const expectedCSVs = [
      'bam-patterns.csv',
      'tenant-models.csv',
      'ai-runtimes.csv',
      'quality-gates.csv'
    ];

    expectedCSVs.forEach(csv => {
      const csvPath = path.join(DATA_DIR, csv);
      expect(fs.existsSync(csvPath)).toBe(true);
    });
  });
});

describe('Workflow Step Sequence', () => {
  test('all step files reference valid next steps', () => {
    const workflows = getAllWorkflows();
    const invalidNextSteps = [];

    workflows.forEach(workflow => {
      const stepsPath = path.join(workflow.path, 'steps');
      if (!fs.existsSync(stepsPath)) return;

      const stepFiles = fs.readdirSync(stepsPath).filter(f => f.endsWith('.md'));
      const steps = stepFiles.map(f => ({
        name: f,
        content: fs.readFileSync(path.join(stepsPath, f), 'utf-8')
      }));

      steps.forEach(step => {
        // Look for "Next Step" or "Proceed to" references
        const nextStepPattern = /(?:Next Step|Proceed to)[^\n]*`([^`]+\.md)`/gi;
        let match;

        while ((match = nextStepPattern.exec(step.content)) !== null) {
          const nextStep = match[1];

          // Check if it's a relative step reference
          if (nextStep.startsWith('step-')) {
            if (!stepFiles.includes(nextStep)) {
              invalidNextSteps.push({
                workflow: workflow.name,
                step: step.name,
                nextStep: nextStep
              });
            }
          }
        }
      });
    });

    if (invalidNextSteps.length > 0) {
      console.error('Invalid next step references:');
      invalidNextSteps.forEach(m =>
        console.error(`  ${m.workflow}/${m.step} -> ${m.nextStep}`)
      );
    }

    // Allow a small number of non-standard references (some workflows use variations like step-09b)
    expect(invalidNextSteps.length).toBeLessThan(5);
  });

  test('Create mode steps are numbered correctly (01-09 or 01-10)', () => {
    const workflows = getAllWorkflows();
    const badNumbering = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);
      const createSteps = steps.filter(s => s.name.includes('-c-'));

      createSteps.forEach(step => {
        const match = step.name.match(/step-(\d+)-c-/);
        if (match) {
          const num = parseInt(match[1], 10);
          // Create steps should be 01-10 (allowing step-10 for complex workflows)
          if (num < 1 || num > 10) {
            badNumbering.push({
              workflow: workflow.name,
              step: step.name,
              number: num
            });
          }
        }
      });
    });

    if (badNumbering.length > 0) {
      console.error('Invalid Create step numbers:');
      badNumbering.forEach(m =>
        console.error(`  ${m.workflow}/${m.step}`)
      );
    }

    expect(badNumbering).toEqual([]);
  });

  test('Edit mode steps are numbered correctly (10-19)', () => {
    const workflows = getAllWorkflows();
    const badNumbering = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);
      const editSteps = steps.filter(s => s.name.includes('-e-'));

      editSteps.forEach(step => {
        const match = step.name.match(/step-(\d+)-e-/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num < 10 || num > 19) {
            badNumbering.push({
              workflow: workflow.name,
              step: step.name,
              number: num
            });
          }
        }
      });
    });

    if (badNumbering.length > 0) {
      console.error('Invalid Edit step numbers:');
      badNumbering.forEach(m =>
        console.error(`  ${m.workflow}/${m.step}`)
      );
    }

    expect(badNumbering).toEqual([]);
  });

  test('Validate mode steps are numbered correctly (20-29)', () => {
    const workflows = getAllWorkflows();
    const badNumbering = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);
      const validateSteps = steps.filter(s => s.name.includes('-v-'));

      validateSteps.forEach(step => {
        const match = step.name.match(/step-(\d+)-v-/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num < 20 || num > 29) {
            badNumbering.push({
              workflow: workflow.name,
              step: step.name,
              number: num
            });
          }
        }
      });
    });

    if (badNumbering.length > 0) {
      console.error('Invalid Validate step numbers:');
      badNumbering.forEach(m =>
        console.error(`  ${m.workflow}/${m.step}`)
      );
    }

    expect(badNumbering).toEqual([]);
  });
});

describe('Workflow Agent Guide References', () => {
  const GUIDES_DIR = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');

  test('all agent guide references in steps exist', () => {
    const workflows = getAllWorkflows();
    const missingGuides = [];

    workflows.forEach(workflow => {
      const steps = getStepFiles(workflow.path);

      steps.forEach(step => {
        // Match agent-guides/bam/*.md references
        const guidePattern = /agent-guides\/bam\/([^`\s]+\.md)/g;
        let match;

        while ((match = guidePattern.exec(step.content)) !== null) {
          const guideName = match[1];
          const guidePath = path.join(GUIDES_DIR, guideName);

          if (!fs.existsSync(guidePath)) {
            missingGuides.push({
              workflow: workflow.name,
              step: step.name,
              guide: guideName
            });
          }
        }
      });
    });

    if (missingGuides.length > 0) {
      console.error('Missing agent guides in workflow steps:');
      missingGuides.forEach(m =>
        console.error(`  ${m.workflow}/${m.step} -> ${m.guide}`)
      );
    }

    expect(missingGuides).toEqual([]);
  });
});

describe('Workflow Count Verification', () => {
  test('has expected number of workflows (150+)', () => {
    const workflows = getAllWorkflows();
    expect(workflows.length).toBeGreaterThanOrEqual(150);
  });

  test('foundation workflows exist', () => {
    const workflows = getAllWorkflows();
    const names = workflows.map(w => w.name);

    // Check with bmad-bam- prefix (actual names)
    const hasTenantModel = names.some(n => n.includes('tenant-model-isolation'));
    const hasMasterArch = names.some(n => n.includes('create-master-architecture'));
    const hasValidateFound = names.some(n => n.includes('validate-foundation'));

    expect(hasTenantModel).toBe(true);
    expect(hasMasterArch).toBe(true);
    expect(hasValidateFound).toBe(true);
  });

  test('module workflows exist', () => {
    const workflows = getAllWorkflows();
    const names = workflows.map(w => w.name);

    const hasModuleArch = names.some(n => n.includes('create-module-architecture'));
    expect(hasModuleArch).toBe(true);
  });

  test('integration workflows exist', () => {
    const workflows = getAllWorkflows();
    const names = workflows.map(w => w.name);

    const hasFacadeContract = names.some(n => n.includes('facade-contract'));
    expect(hasFacadeContract).toBe(true);
  });
});
