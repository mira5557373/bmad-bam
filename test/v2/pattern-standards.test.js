const fs = require('fs');
const path = require('path');

describe('Pattern Standards', () => {
  const patternsDir = path.join(__dirname, '../../src-v2/data/patterns');

  test('66 pattern files exist (after NEXUS Phase 4 Task 3)', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f =>
      f.endsWith('.md') && !f.startsWith('.')
    );
    // 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 = 45
    // + 10 MCP patterns + 11 RAG patterns = 66
    expect(patterns.length).toBe(66);
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
