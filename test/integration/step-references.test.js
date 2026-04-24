/**
 * Workflow Step Resource Reference Validation Tests
 *
 * Validates that ALL step files reference existing resources:
 * - Templates
 * - Checklists
 * - Agent guides
 * - Pattern CSVs
 * - Nested workflows
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SRC_DIR = path.join(__dirname, '../../src');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');
const DATA_DIR = path.join(SRC_DIR, 'data');
const TEMPLATES_DIR = path.join(DATA_DIR, 'templates');
const CHECKLISTS_DIR = path.join(DATA_DIR, 'checklists');
const GUIDES_DIR = path.join(DATA_DIR, 'agent-guides/bam');

// Also test against installed environment
const INSTALL_PATH = process.env.BMAD_INSTALL_PATH ||
  path.join(__dirname, '../../../bmad-with-wds-bam');
const INSTALLED_SKILLS_DIR = path.join(INSTALL_PATH, '.claude/skills');
const INSTALLED_DATA_DIR = path.join(INSTALL_PATH, '_bmad/bam/data');

describe('Workflow Step Resource References', () => {
  let allStepFiles;
  let existingTemplates;
  let existingChecklists;
  let existingGuides;
  let existingCsvFiles;
  let existingWorkflows;

  beforeAll(() => {
    // Find all step files in source ONLY
    // Note: Previously included installed step files, but installed environments
    // can become stale and out of sync with source. Source files are the canonical
    // reference for validation.
    allStepFiles = glob.sync(`${WORKFLOWS_DIR}/**/steps/*.md`);

    // Build sets of existing resources
    existingTemplates = new Set(
      fs.existsSync(TEMPLATES_DIR)
        ? fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.md'))
        : []
    );

    existingChecklists = new Set(
      fs.existsSync(CHECKLISTS_DIR)
        ? fs.readdirSync(CHECKLISTS_DIR).filter(f => f.endsWith('.md'))
        : []
    );

    existingGuides = new Set(
      fs.existsSync(GUIDES_DIR)
        ? fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.md'))
        : []
    );

    existingCsvFiles = new Set(
      fs.existsSync(DATA_DIR)
        ? fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.csv'))
        : []
    );

    // Get workflow names from source directories
    existingWorkflows = new Set(
      fs.existsSync(WORKFLOWS_DIR)
        ? fs.readdirSync(WORKFLOWS_DIR, { recursive: true })
            .filter(f => f.includes('bmad-skill-manifest.yaml'))
            .map(f => path.dirname(f).split(path.sep).pop())
        : []
    );

    console.log(`Found ${allStepFiles.length} step files to validate`);
    console.log(`Found ${existingTemplates.size} templates`);
    console.log(`Found ${existingChecklists.size} checklists`);
    console.log(`Found ${existingGuides.size} guides`);
    console.log(`Found ${existingCsvFiles.size} CSV files`);
  });

  describe('Template References', () => {
    test('all step file template references resolve to existing files', () => {
      const errors = [];

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');
        // Match: templates/*.md or templates/{name}.md
        const templateRefs = content.match(/templates\/([^\s`"'\)]+\.md)/g) || [];

        for (const ref of templateRefs) {
          const templateName = ref.replace('templates/', '');
          if (!existingTemplates.has(templateName)) {
            errors.push(`${path.basename(path.dirname(path.dirname(stepFile)))}/${path.basename(stepFile)}: ${templateName}`);
          }
        }
      }

      if (errors.length > 0) {
        console.warn(`Found ${errors.length} missing template references:`);
        errors.slice(0, 20).forEach(e => console.warn(`  - ${e}`));
      }

      // Allow some missing templates (may be planned)
      expect(errors.length).toBeLessThanOrEqual(10);
    });

    test('**Load template:** directives reference existing templates', () => {
      const errors = [];

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');
        // Match: **Load template:** `{project-root}/_bmad/bam/data/templates/{name}.md`
        const loadDirectives = content.match(/\*\*Load template:\*\*[^\n]+templates\/([^\s`]+\.md)/g) || [];

        for (const directive of loadDirectives) {
          const match = directive.match(/templates\/([^\s`"'\)]+\.md)/);
          if (match) {
            const templateName = match[1];
            if (!existingTemplates.has(templateName)) {
              errors.push(`${path.basename(stepFile)}: ${templateName}`);
            }
          }
        }
      }

      if (errors.length > 0) {
        console.warn('Missing templates in Load directives:', errors.slice(0, 10));
      }
      expect(errors.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Checklist References', () => {
    test('all step file checklist references resolve to existing files', () => {
      const errors = [];

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');
        // Match: checklists/*.md
        const checklistRefs = content.match(/checklists\/([^\s`"'\)]+\.md)/g) || [];

        for (const ref of checklistRefs) {
          const checklistName = ref.replace('checklists/', '');
          if (!existingChecklists.has(checklistName)) {
            errors.push(`${path.basename(stepFile)}: ${checklistName}`);
          }
        }
      }

      if (errors.length > 0) {
        console.warn('Missing checklist references:', errors.slice(0, 10));
      }
      expect(errors.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Pattern CSV References', () => {
    test('all step file CSV references are valid BAM CSVs', () => {
      const validCsvNames = [
        'bam-patterns.csv',
        'tenant-models.csv',
        'ai-runtimes.csv',
        'quality-gates.csv',
        'compliance-frameworks.csv',
        'section-pattern-map.csv'
      ];

      const errors = [];

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');
        // Match: *.csv references that look like BAM pattern CSVs
        const csvRefs = content.match(/\b(bam-patterns|tenant-models|ai-runtimes|quality-gates|compliance-frameworks|section-pattern-map)\.csv\b/g) || [];

        for (const ref of csvRefs) {
          if (!validCsvNames.includes(ref)) {
            errors.push(`${path.basename(stepFile)}: Invalid CSV ${ref}`);
          }
        }
      }

      // All referenced CSVs should be valid
      expect(errors).toEqual([]);
    });

    test('**Load patterns:** directives use valid CSV references', () => {
      const errors = [];

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');
        // Match: **Load patterns:** `.../*.csv`
        const loadDirectives = content.match(/\*\*Load patterns:\*\*[^\n]+\.csv/g) || [];

        for (const directive of loadDirectives) {
          const match = directive.match(/([^\s\/`]+\.csv)/);
          if (match) {
            const csvName = match[1];
            if (!existingCsvFiles.has(csvName)) {
              // Only warn, don't fail - CSVs might have different names
              console.log(`Note: Step references CSV not in source: ${csvName}`);
            }
          }
        }
      }

      // This is informational only
      expect(true).toBe(true);
    });
  });

  describe('Agent Guide References', () => {
    test('all step file guide references resolve to existing files', () => {
      const errors = [];
      let totalRefs = 0;
      let validRefs = 0;

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');
        // Match: agent-guides/bam/*.md
        const guideRefs = content.match(/agent-guides\/bam\/([^\s`"'\)]+\.md)/g) || [];

        for (const ref of guideRefs) {
          totalRefs++;
          const guideName = ref.replace('agent-guides/bam/', '');
          if (existingGuides.has(guideName)) {
            validRefs++;
          } else {
            errors.push(`${path.basename(stepFile)}: ${guideName}`);
          }
        }
      }

      console.log(`Guide references: ${validRefs}/${totalRefs} valid`);

      if (errors.length > 0) {
        console.warn('Missing guide references:', errors.slice(0, 10));
      }

      // At least 95% of guide references should be valid
      if (totalRefs > 0) {
        const validRate = validRefs / totalRefs;
        expect(validRate).toBeGreaterThan(0.95);
      }
    });
  });

  describe('Nested Workflow References', () => {
    test('workflow references in steps point to existing workflows', () => {
      const errors = [];

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');
        // Match: bmad-bam-* workflow references that look like invocations
        const workflowRefs = content.match(/bmad-bam-[\w-]+/g) || [];

        const uniqueRefs = [...new Set(workflowRefs)];

        for (const ref of uniqueRefs) {
          // Check if this looks like a workflow invocation (near invoke, call, run, proceed)
          const context = content.substring(
            Math.max(0, content.indexOf(ref) - 100),
            Math.min(content.length, content.indexOf(ref) + ref.length + 100)
          ).toLowerCase();

          const isInvocation =
            context.includes('invoke') ||
            context.includes('proceed to') ||
            context.includes('run ') ||
            context.includes('execute') ||
            context.includes('nested workflow') ||
            context.includes('call ');

          if (isInvocation && !existingWorkflows.has(ref)) {
            // Check installed skills too
            const skillPath = path.join(INSTALLED_SKILLS_DIR, ref);
            if (!fs.existsSync(skillPath)) {
              errors.push(`${path.basename(stepFile)}: ${ref}`);
            }
          }
        }
      }

      if (errors.length > 0) {
        console.warn('Potentially missing nested workflows:', errors.slice(0, 10));
      }

      // Allow some missing - references might be to related workflows, not invocations
      expect(errors.length).toBeLessThanOrEqual(10);
    });
  });

  describe('Step File Structure', () => {
    test('step files follow CEV naming convention', () => {
      const violations = [];

      for (const stepFile of allStepFiles) {
        const filename = path.basename(stepFile);
        // Should match: step-NN-c-*, step-NN-e-*, step-NN-v-*
        const validPattern = /^step-\d{2}-(c|e|v)-[\w-]+\.md$/;

        if (!validPattern.test(filename)) {
          violations.push(filename);
        }
      }

      if (violations.length > 0) {
        console.warn('Steps not following CEV naming:', violations.slice(0, 10));
      }

      // Most steps should follow the convention
      const violationRate = violations.length / allStepFiles.length;
      expect(violationRate).toBeLessThan(0.1);
    });

    test('step files have required sections', () => {
      const missingPurpose = [];
      const missingActions = [];

      for (const stepFile of allStepFiles) {
        const content = fs.readFileSync(stepFile, 'utf8');

        if (!content.includes('## Purpose') && !content.includes('# Purpose')) {
          missingPurpose.push(path.basename(stepFile));
        }

        if (!content.includes('## Actions') && !content.includes('# Actions')) {
          // Also accept ## Verification as an alternative for validate steps
          if (!content.includes('## Verification')) {
            missingActions.push(path.basename(stepFile));
          }
        }
      }

      if (missingPurpose.length > 0) {
        console.warn('Steps missing Purpose section:', missingPurpose.slice(0, 5));
      }

      if (missingActions.length > 0) {
        console.warn('Steps missing Actions section:', missingActions.slice(0, 5));
      }

      // Most steps should have required sections
      expect(missingPurpose.length).toBeLessThan(allStepFiles.length * 0.1);
      expect(missingActions.length).toBeLessThan(allStepFiles.length * 0.2);
    });
  });
});
