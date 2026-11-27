---
"@incentro-ic/config-typescript": patch
---

Support Typescript 6. The configs don't change, apart from `@tsconfig/strictest` 2.0.9, which has the same settings as before. The README now explains two Typescript 6 defaults to watch for: set `rootDir` when Typescript emits files, and list the `@types` packages you need in `types`, because they are no longer included automatically.
