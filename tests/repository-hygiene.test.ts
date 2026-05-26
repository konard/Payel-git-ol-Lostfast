import { readdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const ignoredDirectories = new Set([
  '.git',
  '.lostfast',
  'coverage',
  'dist',
  'node_modules',
  'playwright-report',
  'test-results',
]);
const dotnetExtensions = new Set(['.cs', '.csproj', '.fs', '.fsproj', '.props', '.sln', '.targets', '.vb', '.vbproj']);

function toRepoPath(path: string): string {
  return relative(repoRoot, path).split(sep).join('/');
}

function collectDotnetArtifacts(directory: string, artifacts: string[] = []): string[] {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
      continue;
    }

    const absolutePath = join(directory, entry.name);
    const repoPath = toRepoPath(absolutePath);

    if (entry.isDirectory()) {
      if (entry.name.toLowerCase().includes('dotnet')) {
        artifacts.push(`${repoPath}/`);
      }

      collectDotnetArtifacts(absolutePath, artifacts);
      continue;
    }

    if (dotnetExtensions.has(extname(entry.name).toLowerCase())) {
      artifacts.push(repoPath);
    }
  }

  return artifacts.sort();
}

describe('repository hygiene', () => {
  it('does not include legacy C# or .NET project artifacts', () => {
    expect(collectDotnetArtifacts(repoRoot)).toEqual([]);
  });
});
