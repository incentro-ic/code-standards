---
"@incentro-ic/config-typescript": patch
---

Support Typescript 6. The configs don't change, apart from `@tsconfig/strictest` 2.0.9, which has the same settings as before. The README now explains three Typescript 6 defaults to watch for: set `rootDir` when Typescript emits files; list the `@types` packages you need in `types`, because they are no longer included automatically; and side-effect imports such as `import "./globals.css"` need a type declaration, because `noUncheckedSideEffectImports` is now on. Next.js 16.4 and later declare CSS imports for you; otherwise add `declare module "*.css";` to a declaration file.
