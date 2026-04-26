const fs = require('fs');
const path = require('path');

describe('Workflow CEV Modes', () => {
  const skillsDir = path.join(__dirname, '../../src-v2/skills');

  test('30 workflows exist', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );
    expect(workflows.length).toBe(30);
  });

  test('each workflow has required files', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );

    for (const wf of workflows) {
      const wfDir = path.join(skillsDir, wf);
      expect(fs.existsSync(path.join(wfDir, 'bmad-skill-manifest.yaml'))).toBe(true);
      expect(fs.existsSync(path.join(wfDir, 'SKILL.md'))).toBe(true);
      expect(fs.existsSync(path.join(wfDir, 'workflow.md'))).toBe(true);
      expect(fs.existsSync(path.join(wfDir, 'customize.toml'))).toBe(true);
    }
  });

  test('each workflow has CEV mode steps', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );

    for (const wf of workflows) {
      const stepsDir = path.join(skillsDir, wf, 'steps');
      const steps = fs.readdirSync(stepsDir);

      const hasCreate = steps.some(s => s.includes('-c-'));
      const hasEdit = steps.some(s => s.includes('-e-'));
      const hasValidate = steps.some(s => s.includes('-v-'));

      expect(hasCreate).toBe(true);
      expect(hasEdit).toBe(true);
      expect(hasValidate).toBe(true);
    }
  });

  test('each workflow manifest has valid name field', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );

    for (const wf of workflows) {
      const manifestPath = path.join(skillsDir, wf, 'bmad-skill-manifest.yaml');
      const content = fs.readFileSync(manifestPath, 'utf8');
      // Name field should match directory name
      expect(content).toContain(`name: ${wf}`);
    }
  });

  test('step files follow naming convention', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );

    for (const wf of workflows) {
      const stepsDir = path.join(skillsDir, wf, 'steps');
      const steps = fs.readdirSync(stepsDir);

      for (const step of steps) {
        // Must match pattern: step-NN-{c|e|v}-description.md
        expect(step).toMatch(/^step-\d{2}-[cev]-[\w-]+\.md$/);
      }
    }
  });

  test('create mode steps start at 01', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );

    for (const wf of workflows) {
      const stepsDir = path.join(skillsDir, wf, 'steps');
      const steps = fs.readdirSync(stepsDir);
      const createSteps = steps.filter(s => s.includes('-c-'));

      // Should have step-01-c-* as first create step
      expect(createSteps.some(s => s.startsWith('step-01-c-'))).toBe(true);
    }
  });

  test('edit mode steps start at 10', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );

    for (const wf of workflows) {
      const stepsDir = path.join(skillsDir, wf, 'steps');
      const steps = fs.readdirSync(stepsDir);
      const editSteps = steps.filter(s => s.includes('-e-'));

      // Edit steps should be in 10-19 range
      for (const step of editSteps) {
        const num = parseInt(step.match(/step-(\d{2})/)[1]);
        expect(num).toBeGreaterThanOrEqual(10);
        expect(num).toBeLessThan(20);
      }
    }
  });

  test('validate mode steps start at 20', () => {
    const workflows = fs.readdirSync(skillsDir).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(skillsDir, d)).isDirectory()
    );

    for (const wf of workflows) {
      const stepsDir = path.join(skillsDir, wf, 'steps');
      const steps = fs.readdirSync(stepsDir);
      const validateSteps = steps.filter(s => s.includes('-v-'));

      // Validate steps should be in 20-29 range
      for (const step of validateSteps) {
        const num = parseInt(step.match(/step-(\d{2})/)[1]);
        expect(num).toBeGreaterThanOrEqual(20);
        expect(num).toBeLessThan(30);
      }
    }
  });
});
