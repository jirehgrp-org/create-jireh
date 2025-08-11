// @/src/tree.ts

import fs from 'fs';
import path from 'path';
import kleur from 'kleur';

export interface TreeOptions {
  ignore?: string[];
}

export function printTree(dirPath: string, prefix = '', options: TreeOptions = {}) {
  const ignoreList = options.ignore || ['node_modules', '.git'];

  const items = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(item => !ignoreList.includes(item.name))
    .sort((a, b) => a.name.localeCompare(b.name));

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
