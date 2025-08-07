# create-jireh
ለ Next.js፣ React፣ Vue፣ SvelteKit እና Vanilla JS/TS ብጁ ቴምፕሌቶችን በመጠቀም የ frontend ፕሮጀክቶችን ለመፍጠር የሚያገለግል የ CLI መሳሪያ። | A CLI tool to scaffold frontend projects with custom templates for Next.js, React, Vue, SvelteKit, and Vanilla JS/TS.


## File Structure

```plaintext
create-jireh/
│
├── src/
│   ├── fetchTemplate.ts    # Git/zip download helpers
│   ├── index.ts            # CLI entry (bin)
│   ├── postInstall.ts      # npm/yarn/pnpm + git init
│   ├── prompts.ts          # Inquirer prompts
│   └── registry.ts         # Map choices -> template URLs
│
├── package.json            # bin, deps, version
├── tsconfig.json
├── README.md
└── LICENSE
```