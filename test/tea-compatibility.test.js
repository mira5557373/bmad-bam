/**
 * TEA Compatibility Tests
 * Validates BAM's compatibility with TEA (Test Engineering Agent) patterns
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'extensions');
const DATA_DIR = path.join(SRC_DIR, 'data');
const CHECKLISTS_DIR = path.join(SRC_DIR, 'checklists');
const AGENT_GUIDES_DIR = path.join(DATA_DIR, 'agent-guides', 'bam');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');

describe('TEA Extension Tests', () => {
  const teaExtensionPath = path.join(EXTENSIONS_DIR, 'tea-bam.yaml');

  describe('tea-bam.yaml Existence and Structure', () => {
    test('tea-bam.yaml exists', () => {
      expect(fs.existsSync(teaExtensionPath)).toBe(true);
    });

    test('tea-bam.yaml has valid YAML structure', () => {
      const content = fs.readFileSync(teaExtensionPath, 'utf-8');
      expect(() => yaml.load(content)).not.toThrow();
    });

    test('tea-bam.yaml has required top-level keys', () => {
      const content = yaml.load(fs.readFileSync(teaExtensionPath, 'utf-8'));
      expect(content).toHaveProperty('agent');
      expect(content).toHaveProperty('menu');
      expect(content).toHaveProperty('prompts');
    });
  });

  describe('Extension Extends bmad-tea', () => {
    test('tea-bam.yaml extends bmad-tea', () => {
      const content = yaml.load(fs.readFileSync(teaExtensionPath, 'utf-8'));
      expect(content.agent.metadata.extends).toBe('bmad-tea');
    });

    test('tea-bam.yaml has module: bam', () => {
      const content = yaml.load(fs.readFileSync(teaExtensionPath, 'utf-8'));
      expect(content.agent.metadata.module).toBe('bam');
    });
  });

  describe('Tenant Testing Capabilities', () => {
    let teaContent;

    beforeAll(() => {
      teaContent = yaml.load(fs.readFileSync(teaExtensionPath, 'utf-8'));
    });

    test('has isolation testing capability', () => {
      const menu = teaContent.menu || [];
      const hasIsolationTesting = menu.some(item =>
        item.trigger && item.trigger.includes('isolation')
      );
      expect(hasIsolationTesting).toBe(true);
    });

    test('has tenant fixtures capability', () => {
      const menu = teaContent.menu || [];
      const hasFixtures = menu.some(item =>
        item.trigger && item.trigger.includes('fixture')
      );
      expect(hasFixtures).toBe(true);
    });

    test('has cross-tenant testing capability', () => {
      const menu = teaContent.menu || [];
      const hasCrossTenant = menu.some(item =>
        item.trigger && item.trigger.includes('cross-tenant')
      );
      expect(hasCrossTenant).toBe(true);
    });

    test('references tenant testing patterns in prompts', () => {
      const prompts = teaContent.prompts || [];
      const hasTestingPatterns = prompts.some(p =>
        p.content && (
          p.content.includes('testing-isolation') ||
          p.content.includes('tenant-isolation')
        )
      );
      expect(hasTestingPatterns).toBe(true);
    });
  });
});

describe('TEA Gate Integration Tests', () => {
  const qualityGatesPath = path.join(DATA_DIR, 'quality-gates.csv');

  describe('QG-I2 References tea-trace', () => {
    const qgI2ChecklistPath = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');

    test('qg-i2-tenant-safety.md exists', () => {
      expect(fs.existsSync(qgI2ChecklistPath)).toBe(true);
    });

    test('QG-I2 checklist references tea-trace for verification', () => {
      const content = fs.readFileSync(qgI2ChecklistPath, 'utf-8');
      expect(content.includes('tea-trace')).toBe(true);
    });

    test('QG-I2 checklist has TEA handoff documentation', () => {
      const content = fs.readFileSync(qgI2ChecklistPath, 'utf-8');
      const hasTeaHandoff =
        content.includes('TEA Handoff') ||
        content.includes('TEA `tea-trace`');
      expect(hasTeaHandoff).toBe(true);
    });

    test('QG-I2 checklist specifies TEA as owner', () => {
      const content = fs.readFileSync(qgI2ChecklistPath, 'utf-8');
      expect(content.includes('OWNER:** TEA') || content.includes('**OWNER:** TEA')).toBe(true);
    });
  });

  describe('QG-I3 References tea-trace', () => {
    const qgI3ChecklistPath = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');

    test('qg-i3-agent-safety.md exists', () => {
      expect(fs.existsSync(qgI3ChecklistPath)).toBe(true);
    });

    test('QG-I3 checklist references tea-trace for verification', () => {
      const content = fs.readFileSync(qgI3ChecklistPath, 'utf-8');
      expect(content.includes('tea-trace')).toBe(true);
    });

    test('QG-I3 checklist has TEA handoff documentation', () => {
      const content = fs.readFileSync(qgI3ChecklistPath, 'utf-8');
      const hasTeaHandoff =
        content.includes('TEA Handoff') ||
        content.includes('TEA `tea-trace`');
      expect(hasTeaHandoff).toBe(true);
    });

    test('QG-I3 checklist specifies TEA as owner', () => {
      const content = fs.readFileSync(qgI3ChecklistPath, 'utf-8');
      expect(content.includes('OWNER:** TEA') || content.includes('**OWNER:** TEA')).toBe(true);
    });
  });

  describe('Test Coverage Gates (QG-TC)', () => {
    test('quality-gates.csv exists', () => {
      expect(fs.existsSync(qualityGatesPath)).toBe(true);
    });

    test('quality gates include test coverage patterns', () => {
      const content = fs.readFileSync(qualityGatesPath, 'utf-8');
      // Check for testing-isolation and testing-agent-safety patterns which are TEA-related
      const hasTestingIsolation = content.includes('testing-isolation');
      const hasTestingAgentSafety = content.includes('testing-agent-safety');
      expect(hasTestingIsolation || hasTestingAgentSafety).toBe(true);
    });

    test('QG-M2 gate references testing-isolation pattern', () => {
      const content = fs.readFileSync(qualityGatesPath, 'utf-8');
      const qgM2Line = content.split('\n').find(line => line.startsWith('QG-M2'));
      expect(qgM2Line).toBeDefined();
      expect(qgM2Line.includes('testing-isolation')).toBe(true);
    });

    test('QG-I3 gate references testing-agent-safety pattern', () => {
      const content = fs.readFileSync(qualityGatesPath, 'utf-8');
      const qgI3Line = content.split('\n').find(line => line.startsWith('QG-I3'));
      expect(qgI3Line).toBeDefined();
      expect(qgI3Line.includes('testing-agent-safety')).toBe(true);
    });
  });
});

describe('TEA Pattern Registry Tests', () => {
  const patternsPath = path.join(DATA_DIR, 'bam-patterns.csv');

  beforeAll(() => {
    expect(fs.existsSync(patternsPath)).toBe(true);
  });

  describe('testing-isolation Pattern', () => {
    test('testing-isolation pattern exists in bam-patterns.csv', () => {
      const content = fs.readFileSync(patternsPath, 'utf-8');
      const hasTestingIsolation = content.split('\n').some(line =>
        line.startsWith('testing-isolation,')
      );
      expect(hasTestingIsolation).toBe(true);
    });

    test('testing-isolation pattern has valid verification_gate', () => {
      const content = fs.readFileSync(patternsPath, 'utf-8');
      const testingIsolationLine = content.split('\n').find(line =>
        line.startsWith('testing-isolation,')
      );
      expect(testingIsolationLine).toBeDefined();
      // Should reference QG-M2 as verification gate
      expect(testingIsolationLine.includes('QG-M2')).toBe(true);
    });

    test('testing-isolation pattern is in testing category', () => {
      const content = fs.readFileSync(patternsPath, 'utf-8');
      const testingIsolationLine = content.split('\n').find(line =>
        line.startsWith('testing-isolation,')
      );
      expect(testingIsolationLine).toBeDefined();
      // Second column should be 'testing'
      const columns = testingIsolationLine.split(',');
      expect(columns[1]).toBe('testing');
    });
  });

  describe('testing-agent-safety Pattern', () => {
    test('testing-agent-safety pattern exists in bam-patterns.csv', () => {
      const content = fs.readFileSync(patternsPath, 'utf-8');
      const hasTestingAgentSafety = content.split('\n').some(line =>
        line.startsWith('testing-agent-safety,')
      );
      expect(hasTestingAgentSafety).toBe(true);
    });

    test('testing-agent-safety pattern has valid verification_gate', () => {
      const content = fs.readFileSync(patternsPath, 'utf-8');
      const testingAgentSafetyLine = content.split('\n').find(line =>
        line.startsWith('testing-agent-safety,')
      );
      expect(testingAgentSafetyLine).toBeDefined();
      // Should reference QG-I3 as verification gate
      expect(testingAgentSafetyLine.includes('QG-I3')).toBe(true);
    });

    test('testing-agent-safety pattern is in testing category', () => {
      const content = fs.readFileSync(patternsPath, 'utf-8');
      const testingAgentSafetyLine = content.split('\n').find(line =>
        line.startsWith('testing-agent-safety,')
      );
      expect(testingAgentSafetyLine).toBeDefined();
      // Second column should be 'testing'
      const columns = testingAgentSafetyLine.split(',');
      expect(columns[1]).toBe('testing');
    });
  });

  describe('Pattern Web Queries', () => {
    test('testing patterns have web_queries column with {date} placeholder', () => {
      const content = fs.readFileSync(patternsPath, 'utf-8');
      const testingLines = content.split('\n').filter(line =>
        line.startsWith('testing-isolation,') || line.startsWith('testing-agent-safety,')
      );

      testingLines.forEach(line => {
        // web_queries column should contain {date} placeholder
        expect(line.includes('{date}')).toBe(true);
      });
    });
  });
});

describe('TEA Checklist Format Tests', () => {
  const getChecklistFiles = () => {
    return fs.readdirSync(CHECKLISTS_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => ({
        name: f,
        path: path.join(CHECKLISTS_DIR, f),
        content: fs.readFileSync(path.join(CHECKLISTS_DIR, f), 'utf-8')
      }));
  };

  describe('Tenant Safety Checklists Follow TEA Format', () => {
    test('tenant-related checklists exist', () => {
      const checklists = getChecklistFiles();
      const tenantChecklists = checklists.filter(c =>
        c.name.includes('tenant') || c.name.includes('isolation')
      );
      expect(tenantChecklists.length).toBeGreaterThan(0);
    });

    test('tenant checklists use checkbox format (- [ ])', () => {
      const checklists = getChecklistFiles();
      const tenantChecklists = checklists.filter(c =>
        c.name.includes('tenant') || c.name.includes('isolation')
      );

      tenantChecklists.forEach(checklist => {
        const hasCheckboxes = checklist.content.includes('- [ ]');
        expect(hasCheckboxes).toBe(true);
      });
    });

    test('tenant checklists have Gate Decision section', () => {
      const qgI2Path = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');
      const content = fs.readFileSync(qgI2Path, 'utf-8');
      expect(content.includes('## Gate Decision')).toBe(true);
    });

    test('tenant checklists have PASS/CONDITIONAL/FAIL criteria', () => {
      const qgI2Path = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');
      const content = fs.readFileSync(qgI2Path, 'utf-8');
      expect(content.includes('PASS')).toBe(true);
      expect(content.includes('CONDITIONAL')).toBe(true);
      expect(content.includes('FAIL')).toBe(true);
    });
  });

  describe('Agent Safety Checklists Follow TEA Format', () => {
    test('agent safety checklists exist', () => {
      const checklists = getChecklistFiles();
      const agentChecklists = checklists.filter(c =>
        c.name.includes('agent') || c.name.includes('i3')
      );
      expect(agentChecklists.length).toBeGreaterThan(0);
    });

    test('agent safety checklists use checkbox format (- [ ])', () => {
      const qgI3Path = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');
      const content = fs.readFileSync(qgI3Path, 'utf-8');
      expect(content.includes('- [ ]')).toBe(true);
    });

    test('agent safety checklists have Gate Decision section', () => {
      const qgI3Path = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');
      const content = fs.readFileSync(qgI3Path, 'utf-8');
      expect(content.includes('## Gate Decision') || content.includes('Gate Decision')).toBe(true);
    });

    test('agent safety checklists have Critical classification', () => {
      const qgI3Path = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');
      const content = fs.readFileSync(qgI3Path, 'utf-8');
      expect(content.includes('CRITICAL') || content.includes('Critical')).toBe(true);
    });
  });

  describe('Test Coverage Checklists Follow TEA Format', () => {
    test('checklists have Recovery Protocol section', () => {
      const qgI2Path = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');
      const qgI3Path = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');

      const qgI2Content = fs.readFileSync(qgI2Path, 'utf-8');
      const qgI3Content = fs.readFileSync(qgI3Path, 'utf-8');

      expect(qgI2Content.includes('## Recovery Protocol')).toBe(true);
      expect(qgI3Content.includes('## Recovery Protocol')).toBe(true);
    });

    test('checklists reference related workflows', () => {
      const qgI2Path = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');
      const qgI3Path = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');

      const qgI2Content = fs.readFileSync(qgI2Path, 'utf-8');
      const qgI3Content = fs.readFileSync(qgI3Path, 'utf-8');

      expect(qgI2Content.includes('Related Workflows') || qgI2Content.includes('bmad-bam-')).toBe(true);
      expect(qgI3Content.includes('Related Workflows') || qgI3Content.includes('bmad-bam-')).toBe(true);
    });

    test('checklists have Web Research Verification section', () => {
      const qgI2Path = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');
      const qgI3Path = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');

      const qgI2Content = fs.readFileSync(qgI2Path, 'utf-8');
      const qgI3Content = fs.readFileSync(qgI3Path, 'utf-8');

      expect(qgI2Content.includes('Web Research Verification')).toBe(true);
      expect(qgI3Content.includes('Web Research Verification')).toBe(true);
    });
  });
});

describe('TEA Handoff Documentation Tests', () => {
  describe('convergence-verification Workflow Mentions tea-trace Handoff', () => {
    const convergenceWorkflowDir = path.join(WORKFLOWS_DIR, 'convergence-verification');

    test('convergence-verification workflow directory exists', () => {
      expect(fs.existsSync(convergenceWorkflowDir)).toBe(true);
    });

    test('convergence-verification workflow.md mentions TEA or tea-trace', () => {
      const workflowPath = path.join(convergenceWorkflowDir, 'workflow.md');
      expect(fs.existsSync(workflowPath)).toBe(true);

      const content = fs.readFileSync(workflowPath, 'utf-8');
      const mentionsTea = content.includes('tea-trace') || content.includes('TEA');
      expect(mentionsTea).toBe(true);
    });

    test('convergence-verification SKILL.md references TEA patterns', () => {
      const skillPath = path.join(convergenceWorkflowDir, 'SKILL.md');
      expect(fs.existsSync(skillPath)).toBe(true);

      const content = fs.readFileSync(skillPath, 'utf-8');
      // Should reference testing patterns or agent safety testing
      const referencesTeaPatterns =
        content.includes('testing-isolation') ||
        content.includes('testing-agent-safety') ||
        content.includes('tenant safety') ||
        content.includes('agent safety');
      expect(referencesTeaPatterns).toBe(true);
    });
  });

  describe('QG-I2/I3 SKILL.md Files Reference TEA', () => {
    test('qg-i2-tenant-safety.md references tea-trace workflow', () => {
      const checklistPath = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');
      const content = fs.readFileSync(checklistPath, 'utf-8');

      // Should explicitly mention tea-trace as executing workflow
      expect(content.includes('tea-trace')).toBe(true);
    });

    test('qg-i3-agent-safety.md references tea-trace workflow', () => {
      const checklistPath = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');
      const content = fs.readFileSync(checklistPath, 'utf-8');

      // Should explicitly mention tea-trace as executing workflow
      expect(content.includes('tea-trace')).toBe(true);
    });

    test('checklist headers specify workflow integration', () => {
      const qgI2Path = path.join(CHECKLISTS_DIR, 'qg-i2-tenant-safety.md');
      const qgI3Path = path.join(CHECKLISTS_DIR, 'qg-i3-agent-safety.md');

      const qgI2Content = fs.readFileSync(qgI2Path, 'utf-8');
      const qgI3Content = fs.readFileSync(qgI3Path, 'utf-8');

      // Both should mention workflow integration in header
      expect(qgI2Content.includes('Workflow integration')).toBe(true);
      expect(qgI3Content.includes('Workflow integration')).toBe(true);
    });
  });
});

describe('TEA Knowledge Fragment Tests', () => {
  describe('tenant-testing.md Agent Guide', () => {
    const tenantTestingPath = path.join(AGENT_GUIDES_DIR, 'tenant-testing.md');

    test('tenant-testing.md exists', () => {
      expect(fs.existsSync(tenantTestingPath)).toBe(true);
    });

    test('tenant-testing.md has When to load section', () => {
      const content = fs.readFileSync(tenantTestingPath, 'utf-8');
      const hasWhenToLoad =
        content.includes('When to load') ||
        content.includes('when to load') ||
        content.includes('**When');
      expect(hasWhenToLoad).toBe(true);
    });

    test('tenant-testing.md references testing patterns', () => {
      const content = fs.readFileSync(tenantTestingPath, 'utf-8');
      const referencesPatterns =
        content.includes('tenant isolation') ||
        content.includes('testing-isolation') ||
        content.includes('RLS') ||
        content.includes('multi-tenant');
      expect(referencesPatterns).toBe(true);
    });
  });

  describe('testing-isolation.md Agent Guide', () => {
    const testingIsolationPath = path.join(AGENT_GUIDES_DIR, 'testing-isolation.md');

    test('testing-isolation.md exists', () => {
      expect(fs.existsSync(testingIsolationPath)).toBe(true);
    });

    test('testing-isolation.md has When to load section', () => {
      const content = fs.readFileSync(testingIsolationPath, 'utf-8');
      const hasWhenToLoad =
        content.includes('When to load') ||
        content.includes('when to load') ||
        content.includes('**When');
      expect(hasWhenToLoad).toBe(true);
    });

    test('testing-isolation.md covers isolation testing patterns', () => {
      const content = fs.readFileSync(testingIsolationPath, 'utf-8');
      const coversIsolationTesting =
        content.includes('isolation') ||
        content.includes('cross-tenant') ||
        content.includes('tenant boundary');
      expect(coversIsolationTesting).toBe(true);
    });
  });

  describe('testing-agent-safety.md Agent Guide', () => {
    const testingAgentSafetyPath = path.join(AGENT_GUIDES_DIR, 'testing-agent-safety.md');

    test('testing-agent-safety.md exists', () => {
      expect(fs.existsSync(testingAgentSafetyPath)).toBe(true);
    });

    test('testing-agent-safety.md has When to load section', () => {
      const content = fs.readFileSync(testingAgentSafetyPath, 'utf-8');
      const hasWhenToLoad =
        content.includes('When to load') ||
        content.includes('when to load') ||
        content.includes('**When');
      expect(hasWhenToLoad).toBe(true);
    });

    test('testing-agent-safety.md covers agent safety testing patterns', () => {
      const content = fs.readFileSync(testingAgentSafetyPath, 'utf-8');
      const coversAgentSafety =
        content.includes('agent safety') ||
        content.includes('guardrail') ||
        content.includes('kill switch') ||
        content.includes('adversarial');
      expect(coversAgentSafety).toBe(true);
    });
  });

  describe('Agent Guides Reference Pattern Registry', () => {
    test('testing guides reference bam-patterns.csv', () => {
      const guides = [
        path.join(AGENT_GUIDES_DIR, 'tenant-testing.md'),
        path.join(AGENT_GUIDES_DIR, 'testing-isolation.md'),
        path.join(AGENT_GUIDES_DIR, 'testing-agent-safety.md')
      ];

      guides.forEach(guidePath => {
        if (fs.existsSync(guidePath)) {
          const content = fs.readFileSync(guidePath, 'utf-8');
          // Should reference pattern registry or related patterns
          const referencesPatterns =
            content.includes('bam-patterns.csv') ||
            content.includes('pattern') ||
            content.includes('Related');
          expect(referencesPatterns).toBe(true);
        }
      });
    });

    test('testing guides have Web Research section', () => {
      const guides = [
        path.join(AGENT_GUIDES_DIR, 'tenant-testing.md'),
        path.join(AGENT_GUIDES_DIR, 'testing-isolation.md'),
        path.join(AGENT_GUIDES_DIR, 'testing-agent-safety.md')
      ];

      guides.forEach(guidePath => {
        if (fs.existsSync(guidePath)) {
          const content = fs.readFileSync(guidePath, 'utf-8');
          // Should have web research section or web search directives
          const hasWebResearch =
            content.includes('Web Research') ||
            content.includes('Search the web') ||
            content.includes('web_queries') ||
            content.includes('{date}');
          expect(hasWebResearch).toBe(true);
        }
      });
    });
  });
});

describe('TEA Integration Completeness', () => {
  describe('tea-bam.yaml Comprehensive Coverage', () => {
    let teaContent;

    beforeAll(() => {
      const teaExtensionPath = path.join(EXTENSIONS_DIR, 'tea-bam.yaml');
      teaContent = yaml.load(fs.readFileSync(teaExtensionPath, 'utf-8'));
    });

    test('tea-bam.yaml has context loader menu item', () => {
      const menu = teaContent.menu || [];
      const hasContextLoader = menu.some(item =>
        item.trigger && item.trigger.includes('context')
      );
      expect(hasContextLoader).toBe(true);
    });

    test('tea-bam.yaml has web research menu item', () => {
      const menu = teaContent.menu || [];
      const hasResearch = menu.some(item =>
        item.trigger && item.trigger.includes('research')
      );
      expect(hasResearch).toBe(true);
    });

    test('tea-bam.yaml prompts reference agent guides', () => {
      const prompts = teaContent.prompts || [];
      const referencesGuides = prompts.some(p =>
        p.content && p.content.includes('agent-guides')
      );
      expect(referencesGuides).toBe(true);
    });

    test('tea-bam.yaml does not use memories field', () => {
      expect(teaContent).not.toHaveProperty('memories');
      if (teaContent.agent) {
        expect(teaContent.agent).not.toHaveProperty('memories');
      }
    });
  });

  describe('Cross-References Are Valid', () => {
    test('tea-bam.yaml references existing agent guide files', () => {
      const teaExtensionPath = path.join(EXTENSIONS_DIR, 'tea-bam.yaml');
      const teaContent = yaml.load(fs.readFileSync(teaExtensionPath, 'utf-8'));
      const prompts = teaContent.prompts || [];

      // Extract referenced guide files from prompts
      prompts.forEach(p => {
        if (p.content) {
          const guideMatches = p.content.match(/agent-guides\/bam\/([\w-]+)\.md/g);
          if (guideMatches) {
            guideMatches.forEach(match => {
              const guideName = match.replace('agent-guides/bam/', '');
              const guidePath = path.join(AGENT_GUIDES_DIR, guideName);
              // Check if the referenced guide exists
              expect(fs.existsSync(guidePath)).toBe(true);
            });
          }
        }
      });
    });

    test('quality gates reference existing checklist files', () => {
      const qualityGatesPath = path.join(DATA_DIR, 'quality-gates.csv');
      const content = fs.readFileSync(qualityGatesPath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('gate_id'));

      lines.forEach(line => {
        const columns = line.split(',');
        // checklist_file column is typically column 6 (0-indexed)
        if (columns.length > 6) {
          const checklistFile = columns[6];
          if (checklistFile && checklistFile.endsWith('.md')) {
            const checklistPath = path.join(CHECKLISTS_DIR, checklistFile);
            expect(fs.existsSync(checklistPath)).toBe(true);
          }
        }
      });
    });
  });
});
