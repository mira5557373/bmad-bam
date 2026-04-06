#!/usr/bin/env node

/**
 * TSA Sync Validation Tool
 * Validates BAM knowledge fragments are synchronized with TSA documentation
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { load } from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const SRC_DIR = join(ROOT_DIR, 'src');

function loadSyncMap() {
  const mapPath = join(ROOT_DIR, 'tsa-sync-map.yaml');
  if (!existsSync(mapPath)) {
    console.error('ERROR: tsa-sync-map.yaml not found');
    process.exit(1);
  }
  return load(readFileSync(mapPath, 'utf-8'));
}

function validateMappings(syncMap) {
  const errors = [];
  const warnings = [];

  // Check all BAM files exist
  syncMap.mappings.forEach(mapping => {
    if (!mapping.bam || mapping.bam.length === 0) {
      warnings.push(`TSA "${mapping.tsa}" has no BAM mappings`);
      return;
    }

    mapping.bam.forEach(bamFile => {
      const bamPath = join(SRC_DIR, bamFile);
      if (!existsSync(bamPath)) {
        errors.push(`BAM file missing: ${bamFile} (mapped from TSA ${mapping.tsa})`);
      }
    });
  });

  return { errors, warnings };
}

function checkGaps(syncMap) {
  const gaps = syncMap.gaps || [];
  const p1Gaps = gaps.filter(g => g.priority === 'P1');
  const p2Gaps = gaps.filter(g => g.priority === 'P2');

  return {
    p1Count: p1Gaps.length,
    p2Count: p2Gaps.length,
    gaps: gaps.map(g => ({
      tsa: g.tsa,
      status: g.status,
      priority: g.priority,
      notes: g.notes
    }))
  };
}

function validateVersion(syncMap) {
  const lastSync = new Date(syncMap.last_sync);
  const now = new Date();
  const daysSinceSync = Math.floor((now - lastSync) / (1000 * 60 * 60 * 24));

  if (daysSinceSync > 30) {
    return {
      warning: `TSA sync map is ${daysSinceSync} days old - consider updating`
    };
  }

  return { ok: true };
}

function main() {
  console.log('TSA ↔ BAM Sync Validation');
  console.log('='.repeat(50));

  const syncMap = loadSyncMap();
  console.log(`\nSync Map Version: ${syncMap.version}`);
  console.log(`Last Sync: ${syncMap.last_sync}`);

  // Validate version freshness
  const versionResult = validateVersion(syncMap);
  if (versionResult.warning) {
    console.log(`\n⚠️  ${versionResult.warning}`);
  }

  // Validate mappings
  console.log('\n--- Mapping Validation ---');
  const { errors, warnings } = validateMappings(syncMap);

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    warnings.forEach(w => console.log(`  ⚠️  ${w}`));
  }

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(`  ❌ ${e}`));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All mappings valid');
  }

  // Check gaps
  console.log('\n--- Gap Analysis ---');
  const gapResult = checkGaps(syncMap);

  if (gapResult.p1Count > 0) {
    console.log(`\n❌ P1 Gaps (blocking): ${gapResult.p1Count}`);
  }
  if (gapResult.p2Count > 0) {
    console.log(`⚠️  P2 Gaps (non-blocking): ${gapResult.p2Count}`);
  }

  if (gapResult.gaps.length > 0) {
    console.log('\nGap Details:');
    gapResult.gaps.forEach(g => {
      console.log(`  [${g.priority}] ${g.tsa} - ${g.status}`);
      if (g.notes) console.log(`       ${g.notes}`);
    });
  } else {
    console.log('✅ No gaps identified');
  }

  // Summary
  console.log('\n--- Summary ---');
  console.log(`Mappings: ${syncMap.mappings.length}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Gaps: ${gapResult.gaps.length}`);

  // Exit with error if blocking issues
  if (errors.length > 0 || gapResult.p1Count > 0) {
    console.log('\n❌ Validation FAILED');
    process.exit(1);
  }

  console.log('\n✅ Validation PASSED');
}

main();
