const fs = require('fs');
const path = require('path');

describe('V2 File Counts', () => {
  const v2Dir = path.join(__dirname, '../../src-v2');

  test('14 TOML customize files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'customize')).filter(f => f.endsWith('.toml'));
    // 12 original + 1 MCP TOML + 1 RAG TOML (NEXUS Phase 4)
    expect(files.length).toBe(14);
  });

  test('38 workflow skills', () => {
    const dirs = fs.readdirSync(path.join(v2Dir, 'skills')).filter(d =>
      d.startsWith('bmad-bam-') && fs.statSync(path.join(v2Dir, 'skills', d)).isDirectory()
    );
    // 36 original + 1 governance skill + 1 platform skill
    expect(dirs.length).toBe(38);
  });

  test('1 core context file', () => {
    expect(fs.existsSync(path.join(v2Dir, 'data/context/bam-core.md'))).toBe(true);
  });

  test('3 persona files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/personas')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('domain files (12+)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/domains')).filter(f => f.endsWith('.md'));
    // V2 has expanded domain coverage
    expect(files.length).toBeGreaterThanOrEqual(12);
  });

  test('112 pattern files (after NEXUS Phase 4 + fixes)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
    // V2 consolidated: 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 = 45
    // Phase 4 Task 2: 10 MCP patterns = 55
    // Phase 4 Task 3: 11 RAG patterns = 66
    // Phase 4 Task 4: 4 Agent Communication patterns = 70
    // Phase 4 Task 5: 6 Advanced AI patterns = 76
    // Phase 4 Task 6: 18 Enterprise Compliance patterns = 94
    // Phase 4 Task 7: 12 Scale/Platform patterns = 106
    // Phase 4 Completion: 3 missing spec patterns = 109
    // Bug fixes: 3 gap patterns (performance-isolation, testing-isolation, tool-execution) = 112
    expect(files.length).toBe(112);
  });

  test('checklist files (QG-* format)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/checklists')).filter(f => f.endsWith('.md'));
    // V2 has comprehensive checklists generated from quality-gates.csv
    expect(files.length).toBeGreaterThanOrEqual(8);
  });

  test('0 template files (all templates moved to skill directories)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/templates')).filter(f => f.endsWith('.md'));
    // All 48 templates have been moved:
    // - 3 moved to data/standards/ (FORMAT_STANDARD templates)
    // - 4 moved to new skills (mcp, rag, governance, platform)
    // - 7 moved to producer skills (master-architecture, tenant-isolation, agent-runtime,
    //   billing-design, testing-strategy, module-architecture, facade-contract)
    // - 12 moved to SKILL_OWNED batch 1 (agent-debug, agent-tracing, api-versioning,
    //   auth-integration, caching, compliance, cross-module-story, data-residency,
    //   resilience, events, llm-versioning, memory-tiers)
    // - 12 moved to SKILL_OWNED batch 2 (module-epic, observability-design, runbook,
    //   production-readiness, requirements-analysis, research-findings, scaling-design,
    //   security-architecture, tenant-offboarding, tenant-onboarding, tool-contract, white-label-config)
    // - 10 moved to assigned ORPHAN skills (capacity-plan->scaling, cost-model->billing,
    //   gdpr/hipaa->privacy-compliance, incident-response->security-operations,
    //   integration-test-plan->testing, migration/rollback->resilience,
    //   sla-definition->production-readiness, soc2-audit-report->compliance)
    expect(files.length).toBe(0);
  });

  test('3 standard files (FORMAT_STANDARD templates moved from templates/)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/standards')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('3 sidecar files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/sidecar')).filter(f => f.endsWith('.md'));
    expect(files.length).toBe(3);
  });

  test('6 CSV registry files', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data')).filter(f => f.endsWith('.csv'));
    // V2 has: ai-runtimes, bam-patterns, compliance-frameworks, quality-gates, section-pattern-map, tenant-models
    expect(files.length).toBe(6);
  });

  test('module.yaml exists', () => {
    expect(fs.existsSync(path.join(v2Dir, 'module.yaml'))).toBe(true);
  });

  test('all expected directories exist', () => {
    const expectedDirs = [
      'customize',
      'skills',
      'data',
      'data/context',
      'data/personas',
      'data/domains',
      'data/patterns',
      'data/checklists',
      'data/templates',
      'data/standards',
      'data/sidecar'
    ];

    for (const dir of expectedDirs) {
      expect(fs.existsSync(path.join(v2Dir, dir))).toBe(true);
    }
  });
});
