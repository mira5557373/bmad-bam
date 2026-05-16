# P2.1 — BMAD Module Install Investigation

> **Pre-Concern-5 note (added 2026-05-13):** Path references in this document (`_bmad/bam-platform/`, `bam-platform-project-context.md`, `src-v6/.../skills/...`) reflect module state at the time of writing. Post-Concern-5 the module code is `bbp`, the sentinel lives at `{output_folder}/bbp/project-context.md`, and skills are organized by phase dir (`1-foundation/`, `2-modules/`, `9-infrastructure/`); see ADR 008.

> **Task 0 of `docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md`.**
> Question answered: how does `bmad install bmad-bam-platform` materialize the
> module into a target project, and does it trigger an npm lifecycle that BAM
> can hook for activation?
>
> **Adjudicates §7.6 of `docs/v6-final-architecture.md`** (the section that
> enumerates activation Paths A/B/C/D and, in the v0.5 patch, named Path A as
> the default). This investigation re-evaluates that default empirically.
>
> **Caveat — source-read only:** findings are derived from reading BMAD 6.6.0
> source under `external/bmad-method/`; no live `bmad install` run was
> performed. Re-test recommended if BMAD's installer changes.

## BMAD version under test
- **Version:** 6.6.0 (`external/bmad-method/package.json` line 4)
- Submodule path: `external/bmad-method/`

## Install path BAM actually takes

BAM v6 ships `.claude-plugin/marketplace.json` (Wave 0 confirmed; see
`{project-root}/.claude-plugin/marketplace.json`). The presence of this file routes BAM
through BMAD's **community-module + plugin-resolver** pipeline, NOT the
"copy whole module dir" legacy path. Concretely, in
`external/bmad-method/tools/installer/modules/official-modules.js`:

```js
// official-modules.js:272-285
const { CommunityModuleManager } = require('./community-manager');
const communityMgr = new CommunityModuleManager();
let communityResolved = communityMgr.getPluginResolution(moduleName);
if (!communityResolved) {
  communityResolved = await communityMgr.resolveFromCache(moduleName);
}
if (communityResolved) {
  return this.installFromResolution(communityResolved, bmadDir, fileTrackingCallback, options);
}
```

`installFromResolution` (official-modules.js:344-376) then copies **only the
declared `skillPaths` from marketplace.json**, flattened by leaf name, into
`_bmad/<module-code>/<skill>/`. It does not copy the repo root, and it does
not copy `node_modules`.

## How `bmad install bmad-bam-<module>` materializes a module
- **Mechanism:** `fs.copy` per skill directory (no archive, no symlink, no
  npm-install into the target project).
- **Evidence:**
  - `external/bmad-method/tools/installer/modules/official-modules.js:354-358`
    iterates `resolved.skillPaths` and calls `copyModuleWithFiltering` for each.
  - `copyModuleWithFiltering` (`official-modules.js:517-573`) walks the source
    file list via `getFileList` and copies file-by-file with `this.copyFile`.
  - `getFileList` (`official-modules.js:783-799`) is unrestricted — it does
    NOT prune `node_modules`. The skill-path copy is safe only because skill
    directories don't contain `node_modules`; the repo root would.

```js
// official-modules.js:344-358 (excerpt)
async installFromResolution(resolved, bmadDir, fileTrackingCallback = null, options = {}) {
    const targetPath = path.join(bmadDir, resolved.code);
    if (await fs.pathExists(targetPath)) { await fs.remove(targetPath); }
    await fs.ensureDir(targetPath);
    // Copy each skill directory, flattened by leaf name
    for (const skillPath of resolved.skillPaths) {
      const skillDirName = path.basename(skillPath);
      const skillTarget = path.join(targetPath, skillDirName);
      await this.copyModuleWithFiltering(skillPath, skillTarget, fileTrackingCallback, options.moduleConfig);
    }
```

## Does BMAD honor npm postinstall hooks?
- **Verdict: PARTIAL — yes in the cache directory, but isolated from the target project.**
- BMAD **does** run `npm install` on the cloned community-module repo, which
  will fire any `postinstall` script defined in the cache copy's
  `package.json`. But it runs with `cwd: moduleCacheDir` — typically
  `~/.bmad/cache/community-modules/bmad-bam/` — NOT the host project directory.
  At that point the target `_bmad/` directory may not yet exist and BAM has
  no way to discover the host project's root.
- **Evidence:**
  - `external/bmad-method/tools/installer/modules/community-manager.js:396-412`:
    ```js
    // Install dependencies if needed
    const packageJsonPath = path.join(moduleCacheDir, 'package.json');
    if ((needsDependencyInstall || wasNewClone) && (await fs.pathExists(packageJsonPath))) {
      const installSpinner = await createSpinner();
      installSpinner.start(`Installing dependencies for ${moduleInfo.displayName}...`);
      try {
        execSync('npm install --omit=dev --no-audit --no-fund --no-progress --legacy-peer-deps', {
          cwd: moduleCacheDir,
          stdio: ['ignore', 'pipe', 'pipe'],
          timeout: 120_000,
        });
    ```
  - Same pattern for external modules at `external-manager.js:421-471` and
    custom modules at `custom-module-manager.js:482-498`.
  - **Note on `--omit=dev`:** this flag prunes `devDependencies` but does NOT
    suppress lifecycle scripts. `postinstall` still runs. It is, however,
    gated on `(needsDependencyInstall || wasNewClone)` — meaning it only
    fires on a fresh clone or version-bump, not on every `bmad install`.
  - **Critically:** `postinstall` runs *before* `_tryResolveMarketplacePlugin`
    selects skills and *before* `installFromResolution` copies anything to the
    target. The target `bmadDir` is not even passed to the npm invocation.
  - The npm exec happens in the cache. After install, only `skillPaths` get
    copied into the target; the repo root (including anything postinstall
    wrote into the repo root) is NOT copied unless the skill paths include
    those files.

## Does BMAD have a native module-install hook mechanism?
- **Verdict: NO (for code execution). YES (for displaying static notes).**
- The only "hook" mechanism is `post-install-notes` in `module.yaml`, which
  **only displays text to the user** — it does not execute code, scripts, or
  anything writable.
- **Evidence:**
  - `external/bmad-method/tools/installer/README.md:9-12`:
    > Modules can display setup guidance to users after configuration is
    > collected during `npx bmad-method install`. Notes are defined in the
    > module's own `module.yaml` — no changes to the installer are needed.
  - Implementation: `official-modules.js:2103-2143` (`displayModulePostConfigNotes`)
    — it reads `moduleConfig['post-install-notes']` and pipes lines through
    `prompts.log.message`. No `exec`, no `spawn`, no script invocation.
  - Invocation sites: `official-modules.js:1366`, `:1733` — both just call
    the display function.
  - Searches for `executeScript`, `runScript`, `runHook` in
    `external/bmad-method/tools/installer/` returned **zero matches**.
  - BAM's existing `module.yaml` already declares `x-bam-post-install:
    scripts/post-install.sh` (src-v6/bmad-bam-platform/module.yaml:46), but
    that's a BAM-private convention — BMAD's installer ignores `x-` keys.

## Activation path selected for P2.1
- **Path: B (manual finalize workflow)** — with optional Path A best-effort
  helper as a future enhancement.
- **Rationale:**
  - Path A (npm `postinstall` in `package.json`) is **not viable as a
    target-project activation mechanism**: the script runs in the cache dir
    (`~/.bmad/cache/community-modules/bmad-bam/`), has no knowledge of the
    host project root, and any files it writes either stay in the cache or
    must live inside a `skillPaths`-declared directory to survive the copy.
    It also only fires on fresh clone / version change — not on every
    `bmad install`, which is the exact opposite of the always-fresh
    activation we need.
  - Path D (BMAD-native hook) **does not exist**. The only native mechanism
    is text display via `post-install-notes`.
  - Path B remains: ship a `bmad-bam-finalize` skill (or workflow) that the
    user runs once after `bmad install bmad-bam-<module>`, and surface that
    requirement via the supported `post-install-notes` channel so it appears
    in the BMAD installer's own UI.

## Implications for P2.1 plan

**Task 1 changes** (formerly "Add npm postinstall"):
- Replace the package.json + postinstall design with a `bmad-bam-finalize`
  skill that:
  1. Discovers `{project-root}` from CWD (skills run with the host project
     as cwd at LLM activation time).
  2. Materializes the universal-glob activation files into
     `{project-root}/_bmad/bam-activation/platform/` and writes `_bmad/bam/family.json`
     as the Wave-0 contract dictates.
  3. Idempotent: re-running must be safe.
- Add a `post-install-notes` block to each BAM module's `module.yaml` that
  tells the user: "Run `bmad run bmad-bam-finalize` to activate this
  module." This is the BMAD-supported way to surface the finalize step.

**Tasks 2-28 unchanged in scope.** The activation contract (universal-glob
in `persistent_facts`) is unaffected — Plan A from Wave 0 still applies; we
just need a user-driven finalize trigger rather than an automatic one.

**Stretch (optional, not in MVP):** ship a `scripts/postinstall.js` in BAM's
repo root (so it runs in the cache dir on community-manager clones). It can
do harmless prep work like sanity-checking the marketplace.json or printing a
banner — but it CANNOT and MUST NOT assume access to the host project. The
activation itself must always be Path B.

## Surprising / worth flagging
1. **The `npm install` is gated on `needsDependencyInstall || wasNewClone`**.
   Re-running `bmad install` on an already-current BAM cache will SKIP the
   npm step entirely (`community-manager.js:398`). Even if postinstall
   *could* see the project, it would be unreliable as a per-install trigger.
2. **`getFileList` does not prune `node_modules`.** For BAM today this is a
   non-issue (we install via marketplace skill paths, never the repo root),
   but a future BAM contributor who adds a top-level `module.yaml` and bypasses
   marketplace.json could accidentally cause a full `node_modules` tree to
   land in `_bmad/bbp/`. Flag for the contributor docs.
3. **`x-bam-post-install` in our own module.yaml is dead** (BMAD ignores
   `x-*` keys). Task 1 should remove or relocate it to avoid implying a
   nonexistent mechanism.
4. **`module.yaml` `directories:` key works as advertised** (declarative
   directory creation, no code execution) — `installer.js` calls
   `createModuleDirectories` (`official-modules.js:587-`) which reads
   `module.yaml` and `fs.ensureDir`s each entry. This is useful for Task 1
   to pre-create `_bmad/bam-activation/platform/` and `_bmad/bam/` so the user-run
   finalize skill has somewhere to write.

## Spec impact

This finding contradicts `docs/v6-final-architecture.md` §7.6 as patched in
v0.5:

- **v0.5 patch (c)** ratified **Path A (npm `postinstall`)** as the default
  activation mechanism for v6.0.
- **This investigation invalidates that empirically:** Path A runs in the
  BMAD cache directory with no access to the host project root, only fires
  on fresh-clone / version-bump, and any files it writes outside the
  declared `skillPaths` are discarded by the installer copy step. It cannot
  serve as the v6.0 default.
- **Actual default for v6.0 is Path B** (manual finalize workflow surfaced
  via `post-install-notes`), per the "Activation path selected for P2.1"
  section above.
- **Recommendation for the user:** spec §7.6 needs a v0.6 patch (or an
  inline annotation) to record Path B as the default activation mechanism
  and demote Path A to "non-viable for target-project activation; usable
  only for harmless prep in the cache dir." **This is a finding only — the
  spec is not modified here.** The user is in control of `docs/v6-final-architecture.md`.
