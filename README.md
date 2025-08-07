# create-jireh

*A CLI tool to scaffold frontend projects with custom templates for Next.js, React, Vue, SvelteKit, and Vanilla JS/TS.*

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [File Structure](#file-structure)
* [Quick Start](#quick-start)
* [Template Source](#template-source)
* [Package Manager Support](#package-manager-support)
* [Credits & License](#credits--license)

---

## Overview

`create-jireh` is the official scaffolding tool for [jirehgrp-templates](https://github.com/jirehgrp-org/jirehgrp-templates).
It enables developers to quickly set up projects using production-ready boilerplates with multilingual (🇪🇹 Amharic / 🇺🇸 English) and theme toggle support built-in.

---

## Features

* **Interactive CLI** – Choose project name, framework, language variant, install deps, and init Git.
* **Multiple Frameworks** – Supports Next.js, React (Vite), Vue 3 (Vite), SvelteKit (Vite), and Vanilla JS/TS (+ Vite).
* **Multilingual Ready** – Amharic + English toggle included in most templates.
* **Theme Toggle** – Built-in dark/light mode switch.
* **Multiple Package Managers** – Works with **npm**, **yarn**, **pnpm**, and **bun**.
* **Git Integration** – Optionally initializes a Git repo with a first commit.
* **Direct Template Fetch** – Pulls from `jirehgrp-templates` GitHub repo with [degit](https://github.com/Rich-Harris/degit).

---

## File Structure

```plaintext
create-jireh/
│
├── src/
│   ├── fetchTemplate.ts    # Git/zip download helpers
│   ├── index.ts            # CLI entry (bin)
│   ├── postInstall.ts      # npm/yarn/pnpm/bun install + git init
│   ├── prompts.ts          # CLI prompts (prompts library)
│   └── registry.ts         # Map template keys -> GitHub subdir paths
│
├── package.json            # CLI bin config, deps, version
├── tsconfig.json
├── README.md
└── LICENSE
```

---

## Quick Start

```bash
# Using npx
npx create-jireh

# Using npm global install
npm install -g create-jireh
create-jireh
```

Follow the prompts:

1. **Enter Project Name** – This will also be written into `package.json`.
2. **Select Template** – Framework + JS/TS variant.
3. **Install Dependencies?** – Choose to auto-install with your package manager.
4. **Initialize Git?** – Optional Git repo setup.

---

## Template Source

All templates are fetched directly from:

**[jirehgrp-templates GitHub Repository](https://github.com/jirehgrp-org/jirehgrp-templates)**

Each CLI template entry maps to a specific folder inside `templates/` in that repo (see [`registry.ts`](src/registry.ts)).

---

## Package Manager Support

`create-jireh` automatically detects or lets you specify:

* **npm**
* **yarn**
* **pnpm**
* **bun**

It uses the correct install command for your choice.

---

## Credits & License

Inspired by and built with:

* [degit](https://github.com/Rich-Harris/degit) – Template fetching
* [ora](https://github.com/sindresorhus/ora) – CLI spinners
* [kleur](https://github.com/lukeed/kleur) – Terminal colors
* [prompts](https://github.com/terkelg/prompts) – Interactive CLI

Licensed under MIT © 2025 [JirehGroup](https://jirehgrp.com)

---

**Made with ❤️ by the JirehGroup Team**