# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Security

- Patched 21 Dependabot advisories in dev dependencies via `npm audit fix`,
  including the high-severity browserslist issue (CVE-2026-73088 /
  GHSA-73wf-gq98-2v4g — uncaught crash / prototype write via untrusted
  `browserslist-stats.json` custom stats). browserslist 4.25.1 -> 4.28.9.
  Also patched brace-expansion, minimatch, js-yaml, lodash, flatted, nanoid,
  postcss, postcss-selector-parser, picomatch, ajv, yaml and @humanfs/node.
  No major version bumps and no change to `package.json`; `npm audit` now
  reports 0 vulnerabilities.
- Stopped publishing `node_modules` to the web host. The directory — 10,688
  files, 26MB of dev-only tooling — was committed to the repo and rsynced
  into the web root, so it was publicly readable
  (`/node_modules/browserslist/package.json` returned HTTP 200). It is now
  gitignored, removed from the index, and cleared from the server by the
  deploy workflow. Those paths now return 404.

### Changed

- `.gitignore` excludes `node_modules/`.
- The deploy workflow's ssh step removes any stale `node_modules` from the
  host before the rsync, which runs without `--delete` and would otherwise
  leave removed files in place.
