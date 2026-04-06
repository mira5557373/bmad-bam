# How to Integrate BAM with WDS

WDS (Why-Driven Specification) provides UX and requirements patterns. BAM extends WDS with tenant-aware design capabilities.

## Prerequisites

- Both BAM and WDS installed
- Tenant model defined

## Load BAM UX Context

### With Saga (Analyst)

```
/saga
> bam-saga-context
```

This loads multi-tenant discovery patterns.

### With Freya (UX Designer)

```
/freya
> bam-freya-context
```

This loads tier-aware UX patterns.

## Tenant Persona Mapping

### Generate Personas

```
/saga
> saas-trigger-map
```

Maps personas to tenant tiers:

```markdown
## Tenant Personas

### Free Tier Persona: "Startup Steve"
- Budget conscious
- Needs quick wins
- Tolerates limitations
- Upgrade trigger: Hitting rate limits

### Pro Tier Persona: "Growth Grace"
- Values productivity
- Expects reliability
- Wants integrations
- Upgrade trigger: Team collaboration needs

### Enterprise Persona: "Corporate Carl"
- Compliance required
- Custom needs
- Dedicated support
- Upgrade trigger: Security audit
```

## Tier-Specific UX Design

### Design Tier Journeys

```
/freya
> tier-journey-design
```

Creates differentiated experiences:

```markdown
## Free Tier Journey

### Onboarding
1. Quick signup (email only)
2. Template selection
3. First value in 5 minutes

### Limitations
- Show usage meter
- Soft upgrade prompts
- Feature gates (not hard blocks)

### Upgrade Path
- "Unlock X" buttons
- Comparison modal
- Trial offer
```

```markdown
## Enterprise Tier Journey

### Onboarding
1. Dedicated setup call
2. SSO configuration
3. Custom domain setup

### Premium Features
- Admin dashboard
- Audit logs
- Custom branding

### Support Path
- Dedicated CSM
- Priority queue
- SLA dashboard
```

## Upgrade Flow Design

```
/freya
> upgrade-flow-design
```

Designs conversion-optimized flows:

```markdown
## Upgrade Prompt Triggers

| Trigger | Context | CTA |
|---------|---------|-----|
| Rate limit | API error | "Upgrade for unlimited" |
| Seat limit | Invite blocked | "Add more seats" |
| Feature gate | Click blocked | "Unlock with Pro" |
| Trial ending | Dashboard banner | "Keep your work" |
```

## Integration Patterns

### Tenant Context in UX

```typescript
// Component with tier awareness
const FeatureButton = ({ feature, onClick }) => {
  const { tier, canAccess } = useTenantContext();
  
  if (!canAccess(feature)) {
    return (
      <UpgradePrompt 
        feature={feature}
        currentTier={tier}
      />
    );
  }
  
  return <Button onClick={onClick}>Use {feature}</Button>;
};
```

### Tier-Based Routing

```typescript
// Route guard with tier check
const TierGate = ({ required, children }) => {
  const { tier } = useTenantContext();
  
  if (tierLevel(tier) < tierLevel(required)) {
    return <Navigate to="/upgrade" state={{ required }} />;
  }
  
  return children;
};
```

## Quality Gates

WDS + BAM integration validates:
- **Persona completeness**: All tiers have personas
- **Journey mapping**: Each tier has defined journey
- **Upgrade UX**: Conversion paths designed
- **Accessibility**: Tier limits don't harm UX
