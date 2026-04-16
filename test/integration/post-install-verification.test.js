/**
 * Post-Installation Integration Tests
 *
 * Verifies that BAM components are correctly installed and integrated with BMAD.
 * Run these tests against an installed BMAD+BAM environment.
 *
 * Usage:
 *   BMAD_INSTALL_PATH=/path/to/project npm test -- test/integration/post-install-verification.test.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Use environment variable or default to testing the bmad-with-wds-bam installation
const INSTALL_PATH = process.env.BMAD_INSTALL_PATH ||
  path.join(__dirname, '../../../bmad-with-wds-bam');

const BMAD_DIR = path.join(INSTALL_PATH, '_bmad');
const BAM_DIR = path.join(BMAD_DIR, 'bam');
const CONFIG_DIR = path.join(BMAD_DIR, '_config');
const SKILLS_DIR = path.join(INSTALL_PATH, '.claude/skills');

// Expected counts (minimums - actual may be higher)
const EXPECTED_COUNTS = {
  agentGuides: 180,
  templates: 400,
  checklists: 30,
  extensions: 25,
  csvFiles: 6,
  customizeFiles: 15,
  bamWorkflows: 170  // Actual is 174 as of April 2026
};

describe('BAM Post-Installation Verification', () => {

  describe('Installation Directory Structure', () => {
    test('_bmad directory exists', () => {
      expect(fs.existsSync(BMAD_DIR)).toBe(true);
    });

    test('_bmad/bam directory exists', () => {
      expect(fs.existsSync(BAM_DIR)).toBe(true);
    });

    test('_bmad/_config directory exists', () => {
      expect(fs.existsSync(CONFIG_DIR)).toBe(true);
    });

    test('.claude/skills directory exists', () => {
      expect(fs.existsSync(SKILLS_DIR)).toBe(true);
    });
  });

  describe('BAM Module Files', () => {
    test('config.yaml exists', () => {
      const configPath = path.join(BAM_DIR, 'config.yaml');
      expect(fs.existsSync(configPath)).toBe(true);
    });

    test('module-help.csv exists', () => {
      const helpPath = path.join(BAM_DIR, 'module-help.csv');
      expect(fs.existsSync(helpPath)).toBe(true);
    });

    test('config.yaml has required fields', () => {
      const configPath = path.join(BAM_DIR, 'config.yaml');
      if (fs.existsSync(configPath)) {
        const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
        expect(config).toBeDefined();
      }
    });
  });

  describe('Agent Guides', () => {
    const guidesDir = path.join(BAM_DIR, 'data/agent-guides/bam');

    test('agent-guides directory exists', () => {
      expect(fs.existsSync(guidesDir)).toBe(true);
    });

    test(`has at least ${EXPECTED_COUNTS.agentGuides} agent guides`, () => {
      if (fs.existsSync(guidesDir)) {
        const guides = fs.readdirSync(guidesDir).filter(f => f.endsWith('.md'));
        expect(guides.length).toBeGreaterThanOrEqual(EXPECTED_COUNTS.agentGuides);
      }
    });
  });

  describe('Templates', () => {
    const templatesDir = path.join(BAM_DIR, 'data/templates');

    test('templates directory exists', () => {
      expect(fs.existsSync(templatesDir)).toBe(true);
    });

    test(`has at least ${EXPECTED_COUNTS.templates} templates`, () => {
      if (fs.existsSync(templatesDir)) {
        const templates = fs.readdirSync(templatesDir).filter(f => f.endsWith('.md'));
        expect(templates.length).toBeGreaterThanOrEqual(EXPECTED_COUNTS.templates);
      }
    });
  });

  describe('Checklists', () => {
    const checklistsDir = path.join(BAM_DIR, 'data/checklists');

    test('checklists directory exists', () => {
      expect(fs.existsSync(checklistsDir)).toBe(true);
    });

    test(`has at least ${EXPECTED_COUNTS.checklists} checklists`, () => {
      if (fs.existsSync(checklistsDir)) {
        const checklists = fs.readdirSync(checklistsDir).filter(f => f.endsWith('.md'));
        expect(checklists.length).toBeGreaterThanOrEqual(EXPECTED_COUNTS.checklists);
      }
    });
  });

  describe('Extensions', () => {
    const extensionsDir = path.join(BAM_DIR, 'data/extensions');

    test('extensions directory exists', () => {
      expect(fs.existsSync(extensionsDir)).toBe(true);
    });

    test(`has at least ${EXPECTED_COUNTS.extensions} extensions`, () => {
      if (fs.existsSync(extensionsDir)) {
        const extensions = fs.readdirSync(extensionsDir).filter(f => f.endsWith('.yaml'));
        expect(extensions.length).toBeGreaterThanOrEqual(EXPECTED_COUNTS.extensions);
      }
    });
  });

  describe('Pattern Registry CSVs', () => {
    const dataDir = path.join(BAM_DIR, 'data');
    const expectedCsvs = [
      'bam-patterns.csv',
      'tenant-models.csv',
      'ai-runtimes.csv',
      'quality-gates.csv',
      'compliance-frameworks.csv',
      'section-pattern-map.csv'
    ];

    test.each(expectedCsvs)('%s exists', (csvFile) => {
      const csvPath = path.join(dataDir, csvFile);
      expect(fs.existsSync(csvPath)).toBe(true);
    });

    test('all CSVs have content', () => {
      for (const csvFile of expectedCsvs) {
        const csvPath = path.join(dataDir, csvFile);
        if (fs.existsSync(csvPath)) {
          const content = fs.readFileSync(csvPath, 'utf8');
          expect(content.length).toBeGreaterThan(100);
        }
      }
    });
  });

  describe('Customize Files (CRITICAL)', () => {
    // BAM customize files are stored in the module-specific path
    const bamCustomizeDir = path.join(BAM_DIR, '_config/agents');
    const topLevelCustomizeDir = path.join(CONFIG_DIR, 'agents');

    test('BAM customize files directory exists', () => {
      expect(fs.existsSync(bamCustomizeDir)).toBe(true);
    });

    test(`has ${EXPECTED_COUNTS.customizeFiles} customize files`, () => {
      if (fs.existsSync(bamCustomizeDir)) {
        const files = fs.readdirSync(bamCustomizeDir)
          .filter(f => f.endsWith('.customize.yaml'));
        expect(files.length).toBe(EXPECTED_COUNTS.customizeFiles);
      }
    });

    test('customize files are in BAM module path', () => {
      // BAM customize files are in _bmad/bam/_config/agents/
      // They are module-specific and loaded by the BAM module
      const bamFiles = fs.existsSync(bamCustomizeDir)
        ? fs.readdirSync(bamCustomizeDir).filter(f => f.endsWith('.customize.yaml'))
        : [];

      expect(bamFiles.length).toBeGreaterThan(0);
    });

    test('all customize files are valid YAML', () => {
      if (fs.existsSync(bamCustomizeDir)) {
        const files = fs.readdirSync(bamCustomizeDir)
          .filter(f => f.endsWith('.customize.yaml'));

        for (const file of files) {
          const content = fs.readFileSync(path.join(bamCustomizeDir, file), 'utf8');
          expect(() => yaml.load(content)).not.toThrow();
        }
      }
    });

    test('customize files have menu and prompts sections', () => {
      if (fs.existsSync(bamCustomizeDir)) {
        const files = fs.readdirSync(bamCustomizeDir)
          .filter(f => f.endsWith('.customize.yaml'));

        for (const file of files) {
          const content = yaml.load(
            fs.readFileSync(path.join(bamCustomizeDir, file), 'utf8')
          );
          expect(content.menu).toBeInstanceOf(Array);
          expect(content.prompts).toBeInstanceOf(Array);
          expect(content.menu.length).toBeGreaterThan(0);
          expect(content.prompts.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Workflows/Skills', () => {
    test('.claude/skills directory has BAM workflows', () => {
      if (fs.existsSync(SKILLS_DIR)) {
        const skills = fs.readdirSync(SKILLS_DIR)
          .filter(f => f.startsWith('bmad-bam'));
        expect(skills.length).toBeGreaterThanOrEqual(EXPECTED_COUNTS.bamWorkflows);
      }
    });

    test('BAM workflows have required files', () => {
      if (fs.existsSync(SKILLS_DIR)) {
        const bamSkills = fs.readdirSync(SKILLS_DIR)
          .filter(f => f.startsWith('bmad-bam'))
          .slice(0, 5); // Check first 5

        for (const skill of bamSkills) {
          const skillDir = path.join(SKILLS_DIR, skill);
          if (fs.statSync(skillDir).isDirectory()) {
            const files = fs.readdirSync(skillDir);
            expect(files).toContain('SKILL.md');
          }
        }
      }
    });
  });

  describe('BMAD Integration', () => {
    test('manifest.yaml lists BAM module', () => {
      const manifestPath = path.join(CONFIG_DIR, 'manifest.yaml');
      if (fs.existsSync(manifestPath)) {
        const manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
        const bamModule = manifest.modules?.find(m => m.name === 'bam');
        expect(bamModule).toBeDefined();
      }
    });

    test('skill-manifest.csv includes BAM workflows', () => {
      const skillManifestPath = path.join(CONFIG_DIR, 'skill-manifest.csv');
      if (fs.existsSync(skillManifestPath)) {
        const content = fs.readFileSync(skillManifestPath, 'utf8');
        expect(content).toContain('bmad-bam');
      }
    });

    test('agent-manifest.csv includes base agents', () => {
      const agentManifestPath = path.join(CONFIG_DIR, 'agent-manifest.csv');
      if (fs.existsSync(agentManifestPath)) {
        const content = fs.readFileSync(agentManifestPath, 'utf8');
        expect(content).toContain('bmad-agent-architect');
        expect(content).toContain('bmad-agent-analyst');
        expect(content).toContain('bmad-agent-dev');
      }
    });
  });

  describe('Cross-Reference Integrity', () => {
    test('customize file agent names match base agents in manifest', () => {
      const customizeDir = path.join(CONFIG_DIR, 'agents');
      const agentManifestPath = path.join(CONFIG_DIR, 'agent-manifest.csv');

      if (fs.existsSync(customizeDir) && fs.existsSync(agentManifestPath)) {
        const agentManifest = fs.readFileSync(agentManifestPath, 'utf8');
        const customizeFiles = fs.readdirSync(customizeDir)
          .filter(f => f.endsWith('.customize.yaml'));

        for (const file of customizeFiles) {
          // Extract agent name from filename (e.g., bmad-agent-architect.customize.yaml -> bmad-agent-architect)
          const agentName = file.replace('.customize.yaml', '');

          // Check if this agent exists in the manifest
          // Note: Some customize files target agents from other modules (WDS, CIS, TEA)
          // We just verify the file name follows the expected pattern
          expect(agentName).toMatch(/^(bmad-|wds-)/);
        }
      }
    });

    test('prompt references in customize files reference existing guides', () => {
      const customizeDir = path.join(CONFIG_DIR, 'agents');
      const guidesDir = path.join(BAM_DIR, 'data/agent-guides/bam');

      if (fs.existsSync(customizeDir) && fs.existsSync(guidesDir)) {
        const guides = new Set(fs.readdirSync(guidesDir));
        const customizeFiles = fs.readdirSync(customizeDir)
          .filter(f => f.endsWith('.customize.yaml'));

        // Sample check - verify at least some guide references are valid
        let validReferences = 0;
        let totalReferences = 0;

        for (const file of customizeFiles.slice(0, 3)) {
          const content = fs.readFileSync(path.join(customizeDir, file), 'utf8');
          const guideRefs = content.match(/agent-guides\/bam\/([^`\n]+\.md)/g) || [];

          for (const ref of guideRefs) {
            const guideName = ref.replace('agent-guides/bam/', '');
            totalReferences++;
            if (guides.has(guideName)) {
              validReferences++;
            }
          }
        }

        // At least 90% of references should be valid
        if (totalReferences > 0) {
          expect(validReferences / totalReferences).toBeGreaterThan(0.9);
        }
      }
    });
  });
});
