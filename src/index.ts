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
import kleur from "kleur";

const argv = minimist(process.argv.slice(2), {
    string: ["template", "name", "tag", "dir", "pm"],
    boolean: ["install", "git", "yes"],
    default: { install: undefined, git: undefined }
});


(async () => {
    const answers = await ask({
        name: argv.name,
        templateKey: argv.template as any,
        install: argv.install,
        git: argv.git
    });

    const dest = path.resolve(process.cwd(), argv.dir ?? answers.name);
    if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
        if (!argv.yes) {
            console.error(kleur.red(`\nTarget directory not empty: ${dest}\nUse --yes to continue.\n`));
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

    await finalizeProject(dest, answers.name, {
        install: !!answers.install,
        git: !!answers.git,
        pm: (argv.pm as "npm" | "yarn" | "pnpm" | "bun" | undefined)
    });

    console.log(
        `\n${kleur.bold("Done!")} Created ${kleur.cyan(answers.name)} at ${kleur.gray(dest)}`
    );
    console.log(`\nNext steps:`);
    console.log(`  cd ${answers.name}`);
    if (!answers.install) console.log(`  npm install`);
    console.log(`  npm run dev\n`);
})();
