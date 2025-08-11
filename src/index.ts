#!/usr/bin/env node
// src/index.ts

import path from "node:path";
import fs from "node:fs";
import minimist from "minimist";
import ora from "ora";
import { ask } from "./prompts.js";
import { registry } from "./registry.js";
import { copyTemplate } from "./fetchTemplate.js";
import { finalizeProject } from "./postInstall.js";
import { printTree } from "./tree.js";
import kleur from "kleur";

const argv = minimist(process.argv.slice(2), {
  string: ["template", "name", "tag", "dir", "pm"],
  boolean: ["install", "git", "yes", "tree"],
  default: { install: undefined, git: undefined, tree: false },
});

(async () => {
  // If tree flag is present, just print tree and exit
  if (argv.tree) {
    const dirToPrint = path.resolve(process.cwd(), argv.dir || ".");
    console.log(kleur.bold(`\nProject structure for: ${dirToPrint}\n`));
    printTree(dirToPrint, "", { ignore: ["node_modules", ".git"] });
    console.log("");
    process.exit(0);
  }

  // Normal scaffolding flow below

  const answers = await ask({
    name: argv.name,
    templateKey: argv.template as any,
    install: argv.install,
    git: argv.git,
  });

  const dest = path.resolve(process.cwd(), argv.dir ?? answers.name);

  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
    if (!argv.yes) {
      console.error(kleur.red(`\nError: Target directory '${dest}' is not empty.`));
      console.log(
        kleur.yellow(
          `\nTip: Re-run with ${kleur.bold("--yes")} to overwrite, or choose an empty folder.\n`
        )
      );
      process.exit(1);
    }
  }
  fs.mkdirSync(dest, { recursive: true });

  const entry = registry[answers.templateKey];
  const repoRef = argv.tag ? `${entry.repo.split("#")[0]}#${argv.tag}` : entry.repo;

  const spin = ora(`Fetching ${entry.label} ...`).start();
  try {
    await copyTemplate(repoRef, entry.subdir, dest);
    spin.succeed("Template copied");
  } catch (e) {
    spin.fail("Failed to fetch template");
    console.error(e);
    process.exit(1);
  }

  const hasPackageJson = fs.existsSync(path.join(dest, "package.json"));

  await finalizeProject(dest, answers.name, {
    install: hasPackageJson ? !!answers.install : false,
    git: !!answers.git,
    pm: (argv.pm as "npm" | "yarn" | "pnpm" | "bun" | undefined),
  });

  console.log(`\n${kleur.bold("Done!")} Created ${kleur.cyan(answers.name)} at ${kleur.gray(dest)}\n`);
  console.log(kleur.bold("Next steps:"));
  console.log(`  cd ${answers.name}`);

  if (hasPackageJson) {
    const pm = (argv.pm || "npm") as "npm" | "yarn" | "pnpm" | "bun";
    const commands: Record<typeof pm, [string, string]> = {
      npm: ["npm install", "npm run dev"],
      yarn: ["yarn install", "yarn dev"],
      pnpm: ["pnpm install", "pnpm dev"],
      bun: ["bun install", "bun dev"],
    };

    const [installCmd, devCmd] = commands[pm] || commands.npm;

    if (!answers.install) console.log(`  ${installCmd}`);
    console.log(`  ${devCmd}\n`);
  } else {
    console.log(`  Open ${kleur.cyan("index.html")} in your browser.`);
    console.log(`  Or serve locally:\n    - live-server\n    - python3 -m http.server\n`);
  }

  process.exit(0);
})();
