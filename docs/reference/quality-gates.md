# Quality Gates Reference

BAM enforces 8 quality gates from foundation to production.

## Gate Sequence

```
START
  │
  ▼
QG-F1: Foundation Gate
  │
  ▼
QG-M1: Module Architecture
  │
  ▼
QG-M2: Tenant Isolation
  │
  ▼
QG-M3: Module Readiness
  │
  ▼
QG-I1: Facade Compatibility
  │
  ▼
QG-I2: Tenant Safety
  │
  ▼
QG-I3: Agent Safety
  │
  ▼
QG-P1: Production Readiness
  │
  ▼
DEPLOY
```

---

## QG-F1: Foundation Gate

**Purpose:** Validate master architecture is complete and frozen.

**Checklist:** `checklists/foundation-gate.md`

| Criterion | Validation |
|-----------|------------|
| Master architecture document exists | File present |
| Tenant model defined | Hierarchy documented |
| All modules identified | Module inventory complete |
| Shared kernel minimal | Only allowed items |
| Forbidden dependencies documented | Dependency matrix |
| AI runtime decisions made | Framework selected |

**Trigger:** `validate-foundation` workflow

**Pass Criteria:** All items checked

---

## QG-M1: Module Architecture

**Purpose:** Validate module bounded context is properly designed.

**Checklist:** `checklists/module-architecture.md`

| Criterion | Validation |
|-----------|------------|
| Bounded context defined | Domain boundaries clear |
| Aggregate roots identified | Entity ownership clear |
| Facade interface specified | Contract documented |
| Events defined | Integration events listed |
| Dependencies documented | Input/output modules |

**Trigger:** `validate-module` workflow (architecture phase)

---

## QG-M2: Tenant Isolation

**Purpose:** Validate tenant isolation is implemented correctly.

**Checklist:** `checklists/tenant-isolation.md`

| Criterion | Validation |
|-----------|------------|
| RLS policies created | All tenant tables |
| FORCE RLS enabled | No superuser bypass |
| Tenant context middleware | Request scoping |
| Cache isolation | Tenant-prefixed keys |
| Vector DB isolation | Namespace separation |
| Queue isolation | Tenant-scoped jobs |

**Trigger:** `validate-module` workflow (isolation phase)

---

## QG-M3: Module Readiness

**Purpose:** Validate module is ready for integration.

**Checklists:** 
- `checklists/qg-m3-agent-runtime.md`
- `checklists/qg-m3-tools.md`

| Criterion | Validation |
|-----------|------------|
| Facade implementation complete | All methods work |
| Unit tests pass | >80% coverage |
| Integration tests pass | Facade contract tests |
| Dependencies available | Other modules ready |
| Documentation complete | API docs present |

**Trigger:** `validate-module` workflow (readiness phase)

---

## QG-I1: Facade Compatibility

**Purpose:** Validate cross-module contracts are compatible.

**Checklist:** `checklists/qg-i1-convergence.md`

| Criterion | Validation |
|-----------|------------|
| No breaking changes | Semantic versioning |
| Contract tests pass | Consumer tests green |
| Event schemas compatible | No deserialization errors |
| Version negotiation works | Fallback handling |

**Trigger:** `convergence-verification` workflow

---

## QG-I2: Tenant Safety

**Purpose:** Validate no cross-tenant data leakage.

**Checklist:** `checklists/qg-i2-tenant-safety.md`

| Criterion | Validation |
|-----------|------------|
| Isolation tests pass | No cross-tenant access |
| Audit log verified | All access logged |
| Error messages safe | No tenant data in errors |
| Cache isolation verified | No key collisions |
| Background jobs isolated | Tenant context preserved |

**Trigger:** `convergence-verification` workflow

---

## QG-I3: Agent Safety

**Purpose:** Validate AI agents are safe for production.

**Checklist:** `checklists/qg-i3-agent-safety.md`

| Criterion | Validation |
|-----------|------------|
| Golden tasks pass | Baseline behavior stable |
| Prompt injection resisted | Adversarial tests pass |
| Tool permissions enforced | No unauthorized access |
| Rate limits work | Tier limits respected |
| Kill switches functional | All abort paths work |
| Tenant context respected | No cross-tenant actions |

**Trigger:** `ai-eval-safety-design` workflow

---

## QG-P1: Production Readiness

**Purpose:** Final validation before deployment.

**Checklist:** `checklists/production-readiness.md`

| Criterion | Validation |
|-----------|------------|
| All prior gates pass | QG-F1 through QG-I3 |
| Performance benchmarks met | Latency, throughput |
| Observability configured | Logs, metrics, traces |
| Runbooks documented | Operations guides |
| Rollback plan ready | Tested rollback path |
| Security review complete | No critical findings |
| Load testing passed | Expected scale handled |

**Trigger:** Manual or CI/CD pipeline

---

## Gate Enforcement

### In Development
```typescript
// Workflows check gate status
const canProceed = await checkGate('QG-F1');
if (!canProceed) {
  throw new GateNotPassedError('QG-F1');
}
```

### In CI/CD
```yaml
# .github/workflows/ci.yaml
jobs:
  validate:
    steps:
      - run: npm run validate:gates
```

### Gate Override
Emergency overrides require:
1. Documented justification
2. Admin approval
3. Time-limited exception
4. Follow-up remediation

```
/atlas
> MAEC  # Master Architecture Emergency Change
```
