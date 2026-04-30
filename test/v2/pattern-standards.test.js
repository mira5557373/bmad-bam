const fs = require('fs');
const path = require('path');

describe('Pattern Standards', () => {
  const patternsDir = path.join(__dirname, '../../src-v2/data/patterns');

  test('76 pattern files exist (after NEXUS Phase 4 Task 5)', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f =>
      f.endsWith('.md') && !f.startsWith('.')
    );
    // 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 = 45
    // + 10 MCP patterns + 11 RAG patterns + 4 Agent Communication = 70
    // + 6 Advanced AI patterns = 76
    // Advanced AI: prompt-chaining, chain-of-thought, self-correction, multi-modal-rag, knowledge-refresh, fine-tuning-pipeline
    expect(patterns.length).toBe(76);
  });

  test('no implementation code in patterns', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f => f.endsWith('.md'));
    const implCodePatterns = ['```python', '```typescript', '```javascript'];

    for (const pattern of patterns) {
      const content = fs.readFileSync(path.join(patternsDir, pattern), 'utf8');
      for (const codePattern of implCodePatterns) {
        expect(content).not.toContain(codePattern);
      }
    }
  });

  test('all patterns have Web Research section', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f => f.endsWith('.md'));

    for (const pattern of patterns) {
      const content = fs.readFileSync(path.join(patternsDir, pattern), 'utf8');
      const hasWebResearch = content.includes('## Web Research') ||
                             content.includes('## Web Research Queries') ||
                             content.includes('## Additional Web Research');
      expect(hasWebResearch).toBe(true);
    }
  });

  test('consolidated patterns exist', () => {
    expect(fs.existsSync(path.join(patternsDir, 'tenant-isolation.md'))).toBe(true);
    expect(fs.existsSync(path.join(patternsDir, 'agent-orchestration.md'))).toBe(true);
  });

  test('thin patterns do not exist', () => {
    const thinPatterns = [
      'rls.md', 'schema-per-tenant.md', 'database-per-tenant.md',
      'autogen.md', 'crewai.md', 'saga.md', 'cqrs.md', 'facade.md'
    ];

    for (const thin of thinPatterns) {
      expect(fs.existsSync(path.join(patternsDir, thin))).toBe(false);
    }
  });
});
