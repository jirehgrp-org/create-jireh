// src/fetchTemplate.ts

import degit from "degit";
import path from "node:path";
import fs from "node:fs";

export async function copyTemplate(
  repoRef: string,
  subdir: string | undefined,
  dest: string
) {
  const tmp = path.join(dest, ".jireh-tmp");
  await degit(repoRef, { cache: false, force: true }).clone(tmp);

  const from = subdir ? path.join(tmp, subdir) : tmp;

  // Ensure source exists
  if (!fs.existsSync(from)) {
    throw new Error(`Subdir not found in template: ${from}`);
  }

  // Copy *contents* of `from` into `dest`
  const entries = fs.readdirSync(from);
  for (const name of entries) {
    fs.cpSync(path.join(from, name), path.join(dest, name), {
      recursive: true,
      force: true,
      // dereference: true, // uncomment if you need to resolve symlinks
    });
  }

  // cleanup
  fs.rmSync(tmp, { recursive: true, force: true });
}
