// CR-009: conteúdo pendente bloqueia a publicação. Use ALLOW_PENDING=1 só em revisão local.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT_DIRS = ['src/content', 'public'];
const IMAGE_DIR = 'src/assets/images';
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.json', '.txt', '.webmanifest', '.svg', '.xml']);
const PENDING_MARKER = 'PENDENTE:';
const PENDING_FILE_PREFIX = 'pendente-';

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(path.join(ROOT, dir), { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.relative(ROOT, path.join(entry.parentPath, entry.name)));
}

async function findPendingMarkers(): Promise<string[]> {
  const findings: string[] = [];
  for (const dir of CONTENT_DIRS) {
    for (const file of await listFiles(dir)) {
      if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
      const lines = (await readFile(path.join(ROOT, file), 'utf8')).split('\n');
      lines.forEach((line, index) => {
        if (line.includes(PENDING_MARKER))
          findings.push(`${file}:${String(index + 1)}  ${line.trim()}`);
      });
    }
  }
  return findings;
}

async function findPendingFiles(): Promise<string[]> {
  const dirs = [IMAGE_DIR, 'public'];
  const files = (await Promise.all(dirs.map(listFiles))).flat();
  return files.filter((file) => path.basename(file).startsWith(PENDING_FILE_PREFIX));
}

const findings = [...(await findPendingMarkers()), ...(await findPendingFiles())];

if (findings.length === 0) {
  console.log('✓ Nenhum conteúdo pendente.');
} else if (process.env.ALLOW_PENDING === '1') {
  console.warn(
    `⚠ ${String(findings.length)} pendência(s) de conteúdo — permitido apenas para revisão local (ALLOW_PENDING=1).`,
  );
} else {
  console.error(
    `✗ ${String(findings.length)} pendência(s) de conteúdo bloqueiam a publicação (CR-009):\n`,
  );
  console.error(findings.map((finding) => `  ${finding}`).join('\n'));
  process.exit(1);
}
