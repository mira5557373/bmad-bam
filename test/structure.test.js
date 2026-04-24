/**
 * Structure validation tests
 * Validates documentation, workflows, and SKILL.md file structure
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const HOW_TO_DIR = path.join(DOCS_DIR, 'how-to');
const WORKFLOWS_DIR = path.join(ROOT_DIR, 'src', 'workflows');

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

describe('How-to Guide Validation', () => {
  describe('File Existence', () => {
    test('docs/how-to directory exists', () => {
      expect(fs.existsSync(HOW_TO_DIR)).toBe(true);
    });

    test('has expected number of how-to guides (26)', () => {
      const howToFiles = fs.readdirSync(HOW_TO_DIR).filter(f => f.endsWith('.md'));
      expect(howToFiles.length).toBe(26);
    });

    test('all how-to files are markdown files', () => {
      const files = fs.readdirSync(HOW_TO_DIR);
      const nonMdFiles = files.filter(f => !f.endsWith('.md'));
      expect(nonMdFiles).toEqual([]);
    });
  });

  describe('Required Sections', () => {
    const howToFiles = fs.readdirSync(HOW_TO_DIR).filter(f => f.endsWith('.md'));

    test('all how-to guides have Prerequisites or Why/Overview section', () => {
      const missingPrerequisites = [];

      howToFiles.forEach(file => {
        const content = fs.readFileSync(path.join(HOW_TO_DIR, file), 'utf-8');
        // Prerequisites can be explicit or implied through Why/Overview sections
        const hasPrerequisites =
          content.includes('## Prerequisites') ||
          content.includes('## Prerequisite') ||
          content.includes('### Prerequisites') ||
          content.includes('## Why') ||
          content.includes('## Overview') ||
          content.includes('## When to Use') ||
          content.includes('## Context');

        if (!hasPrerequisites) {
          missingPrerequisites.push(file);
        }
      });

      if (missingPrerequisites.length > 0) {
        console.error('How-to guides missing Prerequisites/Why/Overview section:', missingPrerequisites);
      }
      expect(missingPrerequisites).toEqual([]);
    });

    test('all how-to guides have Steps or Implementation section', () => {
      const missingSteps = [];

      howToFiles.forEach(file => {
        const content = fs.readFileSync(path.join(HOW_TO_DIR, file), 'utf-8');
        // Steps can be explicit (## Steps) or in Implementation/Integration sections
        // Also accepts domain-specific sections that serve as procedural guides
        const hasSteps =
          content.includes('## Steps') ||
          content.includes('### Step') ||
          content.includes('### 1.') ||
          content.includes('## Step 1') ||
          content.includes('## Implementation') ||
          content.includes('## Integration') ||
          content.includes('## Procedure') ||
          content.includes('## Process') ||
          content.includes('## Recovery') ||
          content.includes('## Load ') ||  // Loading instructions (e.g., ## Load BAM Context)
          content.includes('## Running') ||
          content.includes('## Configure') ||
          content.includes('## Tenant');   // Domain-specific procedural sections

        if (!hasSteps) {
          missingSteps.push(file);
        }
      });

      if (missingSteps.length > 0) {
        console.error('How-to guides missing Steps/Implementation section:', missingSteps);
      }
      expect(missingSteps).toEqual([]);
    });

    test('all how-to guides have Examples or Related section', () => {
      const missingExamples = [];

      howToFiles.forEach(file => {
        const content = fs.readFileSync(path.join(HOW_TO_DIR, file), 'utf-8');
        const hasExamples =
          content.includes('## Example') ||
          content.includes('### Example') ||
          content.includes('```') ||  // Code blocks serve as examples
          content.includes('## Related');

        if (!hasExamples) {
          missingExamples.push(file);
        }
      });

      if (missingExamples.length > 0) {
        console.error('How-to guides missing Examples/Related section:', missingExamples);
      }
      expect(missingExamples).toEqual([]);
    });
  });
});

describe('Nested Workflow Structure', () => {
  const nestedContainers = [
    'foundation',
    'module',
    'integration',
    'ingestion',
    'discovery',
    'utility'
  ];

  describe('Container Directories', () => {
    nestedContainers.forEach(container => {
      test(`nested workflow container "${container}" exists`, () => {
        const containerPath = path.join(WORKFLOWS_DIR, container);
        expect(fs.existsSync(containerPath)).toBe(true);
        expect(fs.statSync(containerPath).isDirectory()).toBe(true);
      });
    });
  });

  describe('Nested Workflow Contents', () => {
    const expectedNestedWorkflows = {
      'foundation': ['create-master-architecture', 'scaffold-foundation', 'validate-foundation'],
      'module': ['create-module-architecture', 'create-module-epics', 'validate-module'],
      'integration': ['define-facade-contract', 'evolve-facade-contract', 'facade-mismatch-recovery', 'validate-tool-contract'],
      'ingestion': ['requirement-ingestion', 'triage-module-complexity'],
      'discovery': ['tenant-requirements-analysis'],
      'utility': ['list-tools']
    };

    Object.entries(expectedNestedWorkflows).forEach(([container, workflows]) => {
      describe(`${container}/ container`, () => {
        workflows.forEach(workflow => {
          test(`has ${workflow}/ workflow directory`, () => {
            const workflowPath = path.join(WORKFLOWS_DIR, container, workflow);
            expect(fs.existsSync(workflowPath)).toBe(true);
          });

          test(`${workflow}/ has SKILL.md`, () => {
            const skillPath = path.join(WORKFLOWS_DIR, container, workflow, 'SKILL.md');
            expect(fs.existsSync(skillPath)).toBe(true);
          });
        });
      });
    });
  });

  describe('Step File Naming Convention', () => {
    const workflowDirs = findWorkflowDirs(WORKFLOWS_DIR);
    const workflowsWithSteps = workflowDirs.filter(dir =>
      fs.existsSync(path.join(dir, 'steps'))
    );

    test('step files follow step-NN-mode-description.md pattern', () => {
      const invalidFiles = [];
      const validPattern = /^step-\d{2}-[cev]-[\w-]+\.md$/;

      workflowsWithSteps.forEach(dir => {
        const stepsPath = path.join(dir, 'steps');
        const files = fs.readdirSync(stepsPath).filter(f => f.endsWith('.md'));

        files.forEach(file => {
          if (!validPattern.test(file)) {
            invalidFiles.push({
              workflow: path.basename(dir),
              file
            });
          }
        });
      });

      if (invalidFiles.length > 0) {
        console.error('Step files not following naming convention:', JSON.stringify(invalidFiles, null, 2));
      }
      expect(invalidFiles).toEqual([]);
    });
  });
});

describe('SKILL.md Validation', () => {
  const workflowDirs = findWorkflowDirs(WORKFLOWS_DIR);

  describe('File Presence', () => {
    test('has expected number of workflows (145-195 range)', () => {
      // Allow variance as workflows are added during development
      // Increased from 145-170 to 145-180 after adding 8 phase coverage workflows
      // Increased to 145-190 after adding quality/safety workflows
      // Increased to 145-195 to accommodate additional workflows
      // Increased to 145-200 after adding NEXUS workflows: action-contract-design, prg-gate-setup
      expect(workflowDirs.length).toBeGreaterThanOrEqual(145);
      expect(workflowDirs.length).toBeLessThanOrEqual(200);
    });

    test('all workflows have SKILL.md', () => {
      const missingSkillMd = [];

      workflowDirs.forEach(dir => {
        const skillPath = path.join(dir, 'SKILL.md');
        if (!fs.existsSync(skillPath)) {
          missingSkillMd.push(path.basename(dir));
        }
      });

      if (missingSkillMd.length > 0) {
        console.error('Workflows missing SKILL.md:', missingSkillMd);
      }
      expect(missingSkillMd).toEqual([]);
    });
  });

  describe('Required Fields', () => {
    test('all SKILL.md files have name field in frontmatter', () => {
      const missingName = [];

      workflowDirs.forEach(dir => {
        const skillPath = path.join(dir, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf-8');
          // Check for YAML frontmatter with name field
          const hasFrontmatter = content.startsWith('---');
          const hasNameField = content.match(/^---[\s\S]*?name:\s*[\w-]+[\s\S]*?---/m);

          if (!hasFrontmatter || !hasNameField) {
            missingName.push(path.basename(dir));
          }
        }
      });

      if (missingName.length > 0) {
        console.error('SKILL.md files missing name field:', missingName);
      }
      expect(missingName).toEqual([]);
    });

    test('all SKILL.md files have description field', () => {
      const missingDescription = [];

      workflowDirs.forEach(dir => {
        const skillPath = path.join(dir, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf-8');
          const hasDescription = content.match(/^---[\s\S]*?description:\s*.+[\s\S]*?---/m);

          if (!hasDescription) {
            missingDescription.push(path.basename(dir));
          }
        }
      });

      if (missingDescription.length > 0) {
        console.error('SKILL.md files missing description field:', missingDescription);
      }
      expect(missingDescription).toEqual([]);
    });

    test('all SKILL.md files reference steps or workflow or validation', () => {
      const missingStepsReference = [];

      workflowDirs.forEach(dir => {
        const skillPath = path.join(dir, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf-8');
          // Should have step references, workflow section, modes table, or validation content
          const hasStepsReference =
            content.includes('step-') ||
            content.includes('Step ') ||
            content.includes('### Step') ||
            content.includes('## Workflow') ||
            content.includes('| Mode |') ||
            content.includes('## Modes') ||
            content.includes('## Mode') ||
            content.includes('## Validation') ||
            content.includes('## Gate') ||
            content.includes('## Checklist') ||
            content.includes('## Output');

          if (!hasStepsReference) {
            missingStepsReference.push(path.basename(dir));
          }
        }
      });

      if (missingStepsReference.length > 0) {
        console.error('SKILL.md files missing steps/workflow/validation reference:', missingStepsReference);
      }
      expect(missingStepsReference).toEqual([]);
    });
  });
});

describe('Documentation Files', () => {
  describe('docs/ Directory Structure', () => {
    test('docs/ directory exists', () => {
      expect(fs.existsSync(DOCS_DIR)).toBe(true);
    });

    test('docs/index.md exists', () => {
      expect(fs.existsSync(path.join(DOCS_DIR, 'index.md'))).toBe(true);
    });

    test('docs/how-to/ directory exists', () => {
      expect(fs.existsSync(path.join(DOCS_DIR, 'how-to'))).toBe(true);
    });

    test('docs/explanation/ directory exists', () => {
      expect(fs.existsSync(path.join(DOCS_DIR, 'explanation'))).toBe(true);
    });

    test('docs/reference/ directory exists', () => {
      expect(fs.existsSync(path.join(DOCS_DIR, 'reference'))).toBe(true);
    });

    test('docs/tutorials/ directory exists', () => {
      expect(fs.existsSync(path.join(DOCS_DIR, 'tutorials'))).toBe(true);
    });
  });

  describe('Required Documentation Files', () => {
    const requiredDocs = [
      { path: 'tutorials/getting-started.md', description: 'Getting Started tutorial' },
      { path: 'reference/workflows.md', description: 'Workflows reference' },
      { path: 'reference/quality-gates.md', description: 'Quality gates reference' },
      { path: 'explanation/tenant-isolation-strategies.md', description: 'Tenant isolation explanation' },
      { path: 'explanation/ai-agent-architecture.md', description: 'AI agent architecture explanation' }
    ];

    requiredDocs.forEach(({ path: docPath, description }) => {
      test(`${description} exists (${docPath})`, () => {
        const fullPath = path.join(DOCS_DIR, docPath);
        expect(fs.existsSync(fullPath)).toBe(true);
      });
    });
  });

  describe('Documentation Content Quality', () => {
    test('docs/index.md has navigation links', () => {
      const indexPath = path.join(DOCS_DIR, 'index.md');
      const content = fs.readFileSync(indexPath, 'utf-8');

      // Should have links to major sections
      expect(content).toContain('how-to');
      expect(content).toContain('explanation');
    });

    test('tutorials/getting-started.md has step-by-step instructions', () => {
      const gettingStartedPath = path.join(DOCS_DIR, 'tutorials', 'getting-started.md');
      const content = fs.readFileSync(gettingStartedPath, 'utf-8');

      // Should have numbered steps or sections
      const hasSteps = content.includes('## ') || content.includes('### ');
      expect(hasSteps).toBe(true);
    });
  });
});
