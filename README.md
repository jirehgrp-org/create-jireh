# create-jireh

A fast, interactive **CLI tool** for scaffolding frontend projects from the [Jireh Group Templates](https://github.com/jirehgrp-org/jirehgrp-templates) repository.

Supports **Next.js**, **React + Vite**, **Vue 3 + Vite**, **SvelteKit + Vite**, **Vanilla JS/TS**, and **Vanilla + Vite (JS/TS)** — all preconfigured with multilingual (🇪🇹 / 🇺🇸) and theme toggle support.

---

## Features

- **Interactive CLI** — Choose project name, framework, language variant, install dependencies, and initialize Git.
- **Multiple Frameworks** — Next.js, React (Vite), Vue 3 (Vite), SvelteKit (Vite), Vanilla JS/TS (+ Vite).
- **Multilingual Ready** — Amharic 🇪🇹 + English 🇺🇸 toggle included in most templates.
- **Theme Toggle** — Dark/Light mode out of the box.
- **Multiple Package Managers** — Works with **npm**, **yarn**, **pnpm**, and **bun**.
- **Git Integration** — Optional `git init` with first commit.
- **Direct Template Fetching** — Downloads templates straight from our GitHub repo via [degit](https://github.com/Rich-Harris/degit).

---

## Getting Started

Pick your favorite package manager:

```bash
# npm
npx create-jireh@latest

# yarn (classic)
yarn create jireh

# pnpm
pnpm dlx create-jireh

# bun
bunx create-jireh
```

Follow the prompts:

1. **Project Name** — Added to `package.json` (when present).
2. **Template** — Pick a framework + JS/TS.
3. **Install Dependencies?** — Automatically runs with your package manager.
4. **Initialize Git?** — Optional first commit.

> For **static templates** (Vanilla JS/TS without Vite), the CLI will skip install and show how to open/run the project (e.g., open `index.html` or use `live-server` / `python3 -m http.server`).

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

## Template Source

All templates are stored in:

**[jirehgrp-templates](https://github.com/jirehgrp-org/jirehgrp-templates)**

Each CLI option maps to a subfolder inside `templates/` (see [`registry.ts`](src/registry.ts)).

---

## Package Manager Support

The CLI detects or allows you to choose a package manager and prints the **correct next steps**:

* **npm** → `npm install` → `npm run dev`
* **yarn** → `yarn install` → `yarn dev`
* **pnpm** → `pnpm install` → `pnpm dev`
* **bun** → `bun install` → `bun dev`

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
