// src/tree.ts

import fs from 'fs';
import path from 'path';
import kleur from 'kleur';

export interface TreeOptions {
    ignore?: string[];
}

function loadIgnoreList(): string[] {
    return [
        // Node.js & general
        'node_modules', '.git', 'dist', 'build', 'out', 'coverage', '.cache', '.parcel-cache',
        'npm-debug.log', 'yarn-error.log', 'pnpm-debug.log',
        '.DS_Store', 'Thumbs.db',
        // Python
        '__pycache__', '*.py[cod]', '*.egg-info', '.pytest_cache', '.mypy_cache',
        // Ruby/Rails
        'log', 'tmp', 'vendor/bundle', '.byebug_history',
        // Laravel / PHP
        'vendor', '.env', '.env.*', 'storage',
        // Django
        'db.sqlite3', 'media',
        // Java
        'target', '*.class', '*.jar', '*.war', '*.ear',
        // VSCode and IDEs
        '.vscode', '.idea', '*.iml',
        // Misc
        '*.log',
    ];
}

function buildTreeString(
    dirPath: string,
    prefix = '',
    options: TreeOptions = {}
): string {
    // Use passed ignore list or default hardcoded list
    const ignoreList = options.ignore || loadIgnoreList();

    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(item => !ignoreList.includes(item.name));

    const dirs = entries.filter(e => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
    const files = entries.filter(e => !e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
    const items = [...dirs, ...files];

    let treeString = '';

    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        const name = item.isDirectory()
            ? kleur.cyan(item.name + '/').toString()
            : kleur.white(item.name).toString();

        treeString += prefix + connector + name + '\n';

        if (item.isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            treeString += buildTreeString(path.join(dirPath, item.name), newPrefix, options);
        }
    });

    return treeString;
}

export function writeTreeToFile(
    dirPath: string,
    options: TreeOptions = {}
): string {
    const treeString = buildTreeString(dirPath, '', options);
    const filePath = path.join(dirPath, 'structure.txt');
    fs.writeFileSync(filePath, treeString);
    return filePath;
}
