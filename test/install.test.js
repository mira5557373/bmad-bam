/**
 * Installation validation tests (Tier 1)
 * Validates module can be installed by BMB
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');

describe('Tier 1: Installation Validation', () => {
  describe('Package Configuration', () => {
    test('package.json exists', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      expect(fs.existsSync(pkgPath)).toBe(true);
    });

    test('package.json is valid JSON', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      const content = fs.readFileSync(pkgPath, 'utf-8');
      expect(() => JSON.parse(content)).not.toThrow();
    });

    test('package.json does NOT have private: true', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      expect(pkg.private).not.toBe(true);
    });

    test('package.json has required fields', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

      expect(pkg).toHaveProperty('name', 'bmad-bam');
      expect(pkg).toHaveProperty('version');
      expect(pkg).toHaveProperty('description');
      expect(pkg).toHaveProperty('license');
    });
  });

  describe('Module Definition', () => {
    test('module.yaml exists', () => {
      const modulePath = path.join(SRC_DIR, 'module.yaml');
      expect(fs.existsSync(modulePath)).toBe(true);
    });

    test('module.yaml has required fields', () => {
      const modulePath = path.join(SRC_DIR, 'module.yaml');
      const content = fs.readFileSync(modulePath, 'utf-8');
      const module = yaml.load(content);

      expect(module).toHaveProperty('code', 'bam');
      expect(module).toHaveProperty('name');
      expect(module).toHaveProperty('description');
    });

    test('module.yaml has configuration variables', () => {
      const modulePath = path.join(SRC_DIR, 'module.yaml');
      const content = fs.readFileSync(modulePath, 'utf-8');
      const module = yaml.load(content);

      // Should have tenant_model and ai_runtime configs
      expect(module).toHaveProperty('tenant_model');
      expect(module).toHaveProperty('ai_runtime');
    });
  });

  describe('Directory Structure', () => {
    // BMB-compatible structure: all resources under src/data/
    const requiredDirs = [
      'src/workflows',
      'src/data',
      'src/data/extensions',
      'src/data/checklists',
      'src/data/templates',
      'src/data/agent-guides/bam',
      'src/agents',  // Empty, for BMB compatibility
      'src/skills',  // Empty, for BMB compatibility
    ];

    requiredDirs.forEach(dir => {
      test(`${dir} exists`, () => {
        const dirPath = path.join(ROOT_DIR, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
      });
    });
  });

  describe('Help System', () => {
    test('module-help.csv exists', () => {
      const helpPath = path.join(SRC_DIR, 'module-help.csv');
      expect(fs.existsSync(helpPath)).toBe(true);
    });

    test('module-help.csv has correct column count', () => {
      const helpPath = path.join(SRC_DIR, 'module-help.csv');
      const content = fs.readFileSync(helpPath, 'utf-8');
      const lines = content.trim().split('\n');
      const header = lines[0].split(',');

      // Should have 14 columns per BMB schema (including keywords column for semantic search)
      expect(header.length).toBe(14);
    });

    test('all module-help entries have module=bam', () => {
      const helpPath = path.join(SRC_DIR, 'module-help.csv');
      const content = fs.readFileSync(helpPath, 'utf-8');
      const lines = content.trim().split('\n').slice(1); // Skip header

      lines.forEach(line => {
        const fields = line.split(',');
        expect(fields[0]).toBe('bam');
      });
    });
  });
});

describe('File Counts', () => {
  test('has 0 agents (pure extension module)', () => {
    const agentsDir = path.join(SRC_DIR, 'agents');
    if (!fs.existsSync(agentsDir)) {
      expect(true).toBe(true); // No agents directory is valid for pure extension module
      return;
    }
    const agents = fs.readdirSync(agentsDir)
      .filter(f => fs.statSync(path.join(agentsDir, f)).isDirectory());
    expect(agents.length).toBe(0);
  });

  test('has 31 extensions', () => {
    const extensionsDir = path.join(SRC_DIR, 'data', 'extensions');
    const extensions = fs.readdirSync(extensionsDir)
      .filter(f => f.endsWith('.yaml'));
    // Increased from 28 to 31 after adding billing-bam, analytics-bam, reseller-bam
    expect(extensions.length).toBe(31);
  });

  test('has 6 pattern registry CSVs', () => {
    const dataDir = path.join(SRC_DIR, 'data');
    const csvFiles = fs.readdirSync(dataDir)
      .filter(f => f.endsWith('.csv'));
    expect(csvFiles.length).toBe(6);
  });

  test('has 38 checklists', () => {
    const checklistsDir = path.join(SRC_DIR, 'data', 'checklists');
    const checklists = fs.readdirSync(checklistsDir)
      .filter(f => f.endsWith('.md') && f !== 'README.md');
    // Increased to 22 after adding qg-compliance-continuous.md, qg-ai-observability.md,
    // qg-capacity-planning.md, qg-disaster-recovery-drill.md for specialized quality gates
    // Increased to 24 after adding production-checklist.md, security-checklist.md
    // Increased to 30 after adding BMM/TEA compatibility gates:
    // qg-tc1-tenant-unit-coverage.md, qg-tc2-rls-coverage.md, qg-tc3-cross-tenant-coverage.md,
    // qg-dev1-pre-commit.md
    // Increased to 32 after adding phase 1-2 gates:
    // qg-d1-discovery.md, qg-pl1-planning.md
    // Increased to 35 after adding additional checklists
    // Increased to 36 after adding qg-ai1-ai-safety.md
    // Increased to 38 after adding NEXUS checklists: qg-ai3-agent-contracts.md
    // Increased to 39 after adding qg-prg-production.md for PRG workflow
    // Decreased to 38 after removing orphan qg-prg-production-readiness.md (duplicate of qg-prg-production.md)
    expect(checklists.length).toBe(38);
  });

  test('has 223 agent guides', () => {
    const guidesDir = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
    const guides = fs.readdirSync(guidesDir)
      .filter(f => f.endsWith('.md'));
    // Reduced from 185 to 176 after removing 9 duplicate agent guides:
    // scale-patterns, event-driven, local-dev, audit-trail-patterns, caching-strategy,
    // memory-tier-patterns, run-contract-patterns, white-labeling-patterns, agent-runtime
    // Then increased to 182 after adding 6 new workflow-specific guides:
    // data-protection.md, production-readiness.md, runbook-guide.md,
    // security-operations.md, tenant-safety.md, ai-security.md
    // Then increased to 188 after adding 6 observability guides:
    // rag-observability.md, tool-execution-observability.md, agent-tracing.md,
    // vector-store-observability.md, embedding-observability.md, context-window-observability.md
    // Increased to 189 after adding tenant-data-anonymization.md
    // Increased to 223 after adding 34 domain-specific pattern guides
    // Increased to 231 after adding 8 NEXUS guides: 8-field-action-contract, prg-gate-implementation,
    // request-loop-patterns, control-loop-patterns, learning-loop-patterns, economic-loop-patterns,
    // recovery-loop-patterns, tier-h-federation-patterns
    // Increased to 233 after adding facade-contract-patterns.md, production-deployment.md
    // Increased to 238 after adding consolidated domain guides: tenant-patterns-guide, ai-runtime-patterns-guide,
    // security-patterns-guide, observability-patterns-guide, reliability-patterns-guide
    expect(guides.length).toBe(238);
  });
});
