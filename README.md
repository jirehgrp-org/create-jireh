# create-jireh

A fast, interactive **CLI tool** for scaffolding frontend projects from the [Jireh Group Templates](https://github.com/jirehgrp-org/jirehgrp-templates) repository.

Supports **Next.js**, **React + Vite**, **Vue 3 + Vite**, **SvelteKit + Vite**, **Vanilla JS/TS**, and **Vanilla + Vite (JS/TS)** — all preconfigured with multilingual (🇪🇹 / 🇺🇸) and theme toggle support.

---

## Features

* **Interactive CLI** — Choose project name, framework, language variant, install dependencies, and initialize Git.
* **Multiple Frameworks** — Next.js, React (Vite), Vue 3 (Vite), SvelteKit (Vite), Vanilla JS/TS (+ Vite).
* **Multilingual Ready** — Amharic 🇪🇹 + English 🇺🇸 toggle included in most templates.
* **Theme Toggle** — Dark/Light mode out of the box.
* **Multiple Package Managers** — Works with **npm**, **yarn**, **pnpm**, and **bun**.
* **Git Integration** — Optional `git init` with first commit.
* **Direct Template Fetching** — Downloads templates straight from our GitHub repo via [degit](https://github.com/Rich-Harris/degit).

---

## Folder Structure

```plaintext
create-jireh/
├── src/
│   ├── fetchTemplate.ts    # Template fetching logic
│   ├── index.ts            # CLI entry point
│   ├── postInstall.ts      # Package manager install + git init
│   ├── prompts.ts          # CLI questions
│   └── registry.ts         # Maps CLI choices to template paths
├── package.json            # Bin config, dependencies, version
├── tsconfig.json
├── README.md
└── LICENSE
```

---

## Getting Started

```bash
# Using npx
npx create-jireh

# Or install globally
npm install -g create-jireh
create-jireh
```

Follow the prompts:

1. **Project Name** — Added to `package.json`.
2. **Template** — Pick a framework + JS/TS.
3. **Install Dependencies?** — Select your package manager.
4. **Initialize Git?** — Optional first commit.

---

## Template Source

All templates are stored in:

**[jirehgrp-templates](https://github.com/jirehgrp-org/jirehgrp-templates)**

Each CLI option maps to a subfolder inside `templates/` (see [`registry.ts`](src/registry.ts)).

---

## Package Manager Support

* npm
* yarn
* pnpm
* bun

The CLI detects or allows you to choose, then runs the correct install command.

---

## Credits

Built with:

* [degit](https://github.com/Rich-Harris/degit) – Template fetching
* [ora](https://github.com/sindresorhus/ora) – CLI spinners
* [kleur](https://github.com/lukeed/kleur) – Terminal colors
* [prompts](https://github.com/terkelg/prompts) – Interactive CLI

Licensed under MIT © 2025 [JirehGroup](https://jirehgrp.com)

---

**Made with ❤️ by the [JirehGroup](https://jirehgrp.com) Team**
