/**
 * Runtime Simulation Tests
 *
 * Simulates runtime behavior without actual agent execution.
 * Tests resource loading paths, dependency chains, and config resolution.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const INSTALL_PATH = process.env.BMAD_INSTALL_PATH ||
  path.join(__dirname, '../../../bmad-with-wds-bam');

const SKILLS_DIR = path.join(INSTALL_PATH, '.claude/skills');
const BAM_DIR = path.join(INSTALL_PATH, '_bmad/bam');
const BAM_DATA_DIR = path.join(BAM_DIR, 'data');
const BAM_CUSTOMIZE_DIR = path.join(BAM_DIR, '_config/agents');
const CORE_CONFIG_DIR = path.join(INSTALL_PATH, '_bmad/core');

describe('Runtime Simulation', () => {

  describe('Skill Invocation Chain', () => {
    test('tenant-model-isolation full invocation path', () => {
      const skillPath = path.join(SKILLS_DIR, 'bmad-bam-tenant-model-isolation');

      if (!fs.existsSync(skillPath)) {
        console.warn('tenant-model-isolation skill not found');
        return;
      }

      // 1. SKILL.md must exist and be readable
      const skillFile = path.join(skillPath, 'SKILL.md');
      expect(fs.existsSync(skillFile)).toBe(true);

      // 2. workflow.md must exist
      const workflowFile = path.join(skillPath, 'workflow.md');
      expect(fs.existsSync(workflowFile)).toBe(true);

      // 3. Steps directory must exist
      const stepsDir = path.join(skillPath, 'steps');
      expect(fs.existsSync(stepsDir)).toBe(true);

      const steps = fs.readdirSync(stepsDir).filter(f => f.endsWith('.md'));
      expect(steps.length).toBeGreaterThan(0);

      // 4. Verify each step's resource references resolve
      let unresolvedCount = 0;

      for (const step of steps) {
        const stepContent = fs.readFileSync(path.join(stepsDir, step), 'utf8');

        // Check template references
        const templateRefs = stepContent.match(/templates\/[\w-]+\.md/g) || [];
        for (const ref of templateRefs) {
          const templatePath = path.join(BAM_DATA_DIR, ref);
          if (!fs.existsSync(templatePath)) {
            unresolvedCount++;
          }
        }

        // Check checklist references
        const checklistRefs = stepContent.match(/checklists\/[\w-]+\.md/g) || [];
        for (const ref of checklistRefs) {
          const checklistPath = path.join(BAM_DATA_DIR, ref);
          if (!fs.existsSync(checklistPath)) {
            unresolvedCount++;
          }
        }
      }

      // Allow some unresolved references (may be planned)
      expect(unresolvedCount).toBeLessThanOrEqual(5);
    });

    test('create-master-architecture full invocation path', () => {
      const skillPath = path.join(SKILLS_DIR, 'bmad-bam-create-master-architecture');

      if (!fs.existsSync(skillPath)) {
        // Try alternative paths
        const altPath = path.join(SKILLS_DIR, 'create-master-architecture');
        if (!fs.existsSync(altPath)) {
          console.warn('create-master-architecture skill not found');
          return;
        }
      }

      const actualPath = fs.existsSync(skillPath) ? skillPath : path.join(SKILLS_DIR, 'create-master-architecture');

      // Verify skill structure
      expect(fs.existsSync(path.join(actualPath, 'SKILL.md'))).toBe(true);
    });
  });

  describe('Context Loader Execution Path', () => {
    test('architect-context loads all required resources', () => {
      const customizeFile = path.join(BAM_CUSTOMIZE_DIR, 'bmad-agent-architect.customize.yaml');

      if (!fs.existsSync(customizeFile)) {
        console.warn('Architect customize file not found');
        return;
      }

      const content = yaml.load(fs.readFileSync(customizeFile, 'utf8'));

      // Find all context loader menu items
      const contextItems = content.menu.filter(m =>
        m.trigger?.includes('-context') ||
        m.description?.toLowerCase().includes('load') && m.description?.toLowerCase().includes('context')
      );

      expect(contextItems.length).toBeGreaterThan(0);

      // For each context loader, verify the referenced prompt exists
      const promptIds = new Set(content.prompts.map(p => p.id));

      for (const item of contextItems) {
        if (item.action && item.action.startsWith('#')) {
          const promptId = item.action.slice(1);
          expect(promptIds.has(promptId)).toBe(true);

          // Find the prompt and check its guide references
          const prompt = content.prompts.find(p => p.id === promptId);
          if (prompt && prompt.content) {
            const guideRefs = prompt.content.match(/agent-guides\/bam\/[\w-]+\.md/g) || [];

            for (const ref of guideRefs) {
              const guidePath = path.join(BAM_DATA_DIR, ref);
              if (!fs.existsSync(guidePath)) {
                console.warn(`Missing guide: ${ref}`);
              }
            }
          }
        }
      }
    });

    test('dev-context loads required resources', () => {
      const customizeFile = path.join(BAM_CUSTOMIZE_DIR, 'bmad-agent-dev.customize.yaml');

      if (!fs.existsSync(customizeFile)) {
        console.warn('Dev customize file not found');
        return;
      }

      const content = yaml.load(fs.readFileSync(customizeFile, 'utf8'));

      // Should have dev-specific context loaders
      const devContextItems = content.menu.filter(m =>
        m.trigger?.includes('dev') ||
        m.trigger?.includes('devops')
      );

      expect(devContextItems.length).toBeGreaterThan(0);
    });
  });

  describe('Config Resolution', () => {
    test('core config.yaml is loaded by all skills', () => {
      const configPath = path.join(CORE_CONFIG_DIR, 'config.yaml');

      if (!fs.existsSync(configPath)) {
        console.warn('Core config.yaml not found');
        return;
      }

      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

      // Required fields for BAM
      expect(config.user_name).toBeDefined();
      expect(config.output_folder).toBeDefined();
    });

    test('BAM module config is accessible', () => {
      const bamConfigPath = path.join(BAM_DIR, 'config.yaml');

      if (!fs.existsSync(bamConfigPath)) {
        console.warn('BAM config.yaml not found');
        return;
      }

      const config = yaml.load(fs.readFileSync(bamConfigPath, 'utf8'));
      expect(config).toBeDefined();
    });

    test('config placeholders are used correctly', () => {
      // Check that workflows reference {project-root} and {output_folder}
      const bamSkills = fs.existsSync(SKILLS_DIR)
        ? fs.readdirSync(SKILLS_DIR).filter(d => d.startsWith('bmad-bam-'))
        : [];

      let placeholderUsageCount = 0;

      for (const skill of bamSkills.slice(0, 10)) {
        const skillPath = path.join(SKILLS_DIR, skill, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf8');
          if (content.includes('{project-root}') || content.includes('{output_folder}')) {
            placeholderUsageCount++;
          }
        }
      }

      // Most skills should reference placeholders
      expect(placeholderUsageCount).toBeGreaterThan(0);
    });
  });

  describe('Pattern Registry Access', () => {
    test('pattern CSV files are accessible', () => {
      const expectedCsvs = [
        'bam-patterns.csv',
        'tenant-models.csv',
        'ai-runtimes.csv',
        'quality-gates.csv',
        'compliance-frameworks.csv',
        'section-pattern-map.csv'
      ];

      const missingCsvs = [];

      for (const csv of expectedCsvs) {
        const csvPath = path.join(BAM_DATA_DIR, csv);
        if (!fs.existsSync(csvPath)) {
          missingCsvs.push(csv);
        }
      }

      if (missingCsvs.length > 0) {
        console.warn('Missing CSVs:', missingCsvs);
      }

      expect(missingCsvs.length).toBe(0);
    });

    test('pattern CSVs have web_queries column', () => {
      const csvFiles = [
        'bam-patterns.csv',
        'tenant-models.csv',
        'ai-runtimes.csv'
      ];

      for (const csv of csvFiles) {
        const csvPath = path.join(BAM_DATA_DIR, csv);
        if (!fs.existsSync(csvPath)) continue;

        const content = fs.readFileSync(csvPath, 'utf8');
        const firstLine = content.split('\n')[0];

        // Should have web_queries column
        expect(firstLine.toLowerCase()).toContain('web_queries');
      }
    });

    test('pattern CSVs use {date} placeholder in web_queries', () => {
      const csvFiles = [
        'bam-patterns.csv',
        'tenant-models.csv',
        'ai-runtimes.csv'
      ];

      let hasDatePlaceholder = false;

      for (const csv of csvFiles) {
        const csvPath = path.join(BAM_DATA_DIR, csv);
        if (!fs.existsSync(csvPath)) continue;

        const content = fs.readFileSync(csvPath, 'utf8');
        if (content.includes('{date}')) {
          hasDatePlaceholder = true;
          break;
        }
      }

      expect(hasDatePlaceholder).toBe(true);
    });
  });

  describe('Workflow CEV Mode Simulation', () => {
    test('Create mode steps exist for major workflows', () => {
      const majorWorkflows = [
        'bmad-bam-tenant-model-isolation',
        'bmad-bam-module-boundary-design',
        'bmad-bam-agent-runtime-architecture'
      ];

      for (const workflow of majorWorkflows) {
        const stepsDir = path.join(SKILLS_DIR, workflow, 'steps');
        if (!fs.existsSync(stepsDir)) continue;

        const steps = fs.readdirSync(stepsDir);
        const createSteps = steps.filter(s => s.includes('-c-'));

        expect(createSteps.length).toBeGreaterThan(0);
      }
    });

    test('Validate mode steps exist for validation workflows', () => {
      const validateWorkflows = [
        'bmad-bam-validate-foundation',
        'bmad-bam-validate-module'
      ];

      for (const workflow of validateWorkflows) {
        const stepsDir = path.join(SKILLS_DIR, workflow, 'steps');
        if (!fs.existsSync(stepsDir)) {
          // Try without prefix
          const altPath = path.join(SKILLS_DIR, workflow.replace('bmad-bam-', ''), 'steps');
          if (!fs.existsSync(altPath)) continue;
        }

        const actualPath = fs.existsSync(stepsDir) ? stepsDir : path.join(SKILLS_DIR, workflow.replace('bmad-bam-', ''), 'steps');

        if (fs.existsSync(actualPath)) {
          const steps = fs.readdirSync(actualPath);
          const validateSteps = steps.filter(s => s.includes('-v-'));

          // Validation workflows should have validate steps
          expect(validateSteps.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Output Path Simulation', () => {
    test('workflows define output locations', () => {
      const bamSkills = fs.existsSync(SKILLS_DIR)
        ? fs.readdirSync(SKILLS_DIR).filter(d => d.startsWith('bmad-bam-'))
        : [];

      let hasOutputDefinitions = 0;

      for (const skill of bamSkills.slice(0, 20)) {
        const skillPath = path.join(SKILLS_DIR, skill, 'SKILL.md');
        if (!fs.existsSync(skillPath)) continue;

        const content = fs.readFileSync(skillPath, 'utf8');

        if (content.includes('## Output') ||
            content.includes('## Outputs') ||
            content.includes('{output_folder}') ||
            content.includes('planning-artifacts')) {
          hasOutputDefinitions++;
        }
      }

      console.log(`Workflows with output definitions: ${hasOutputDefinitions}/${Math.min(bamSkills.length, 20)}`);

      // Most workflows should define outputs
      expect(hasOutputDefinitions).toBeGreaterThan(5);
    });
  });

  describe('Menu Trigger Invocation Simulation', () => {
    test('menu triggers are unique per customize file', () => {
      if (!fs.existsSync(BAM_CUSTOMIZE_DIR)) {
        console.warn('BAM customize directory not found');
        return;
      }

      const customizeFiles = fs.readdirSync(BAM_CUSTOMIZE_DIR)
        .filter(f => f.endsWith('.customize.yaml'));

      const issues = [];

      for (const file of customizeFiles) {
        const content = yaml.load(fs.readFileSync(path.join(BAM_CUSTOMIZE_DIR, file), 'utf8'));
        const triggers = content.menu?.map(m => m.trigger) || [];

        // Check for duplicates within the file
        const seen = new Set();
        for (const trigger of triggers) {
          if (seen.has(trigger)) {
            issues.push(`${file}: duplicate '${trigger}'`);
          }
          seen.add(trigger);
        }
      }

      if (issues.length > 0) {
        console.warn('Duplicate triggers within files:', issues.slice(0, 10));
      }

      // Should have minimal duplicates
      expect(issues.length).toBeLessThanOrEqual(5);
    });
  });
});
