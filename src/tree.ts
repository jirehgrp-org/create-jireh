// src/tree.ts

import fs from 'fs';
import path from 'path';
import kleur from 'kleur';

export interface TreeOptions {
  ignoreFileName?: string;
  ignore?: string[];
}

function loadIgnoreList(dirPath: string, ignoreFileName?: string): string[] {
  if (!ignoreFileName) return ['node_modules', '.git'];

  try {
    const ignorePath = path.join(dirPath, ignoreFileName);
    if (fs.existsSync(ignorePath)) {
      const content = fs.readFileSync(ignorePath, 'utf8');
      return content
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));
    }
  } catch {
    // ignore errors reading ignore file
  }

  return ['node_modules', '.git'];
}

export function printTree(dirPath: string, prefix = '', options: TreeOptions = {}) {
  const ignoreList = options.ignore || loadIgnoreList(dirPath, options.ignoreFileName);

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(item => !ignoreList.includes(item.name));

  const dirs = entries.filter(e => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
  const files = entries.filter(e => !e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
  const items = [...dirs, ...files];

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const name = item.isDirectory()
      ? kleur.cyan(item.name + '/')
      : kleur.white(item.name);

    console.log(prefix + connector + name);

    if (item.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(path.join(dirPath, item.name), newPrefix, options);
    }
  });
}
