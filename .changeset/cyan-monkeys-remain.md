---
"@incentro-ic/config-eslint": major
---

Move to ESLint 10 and Typescript 6.

This version needs Node.js 22.18 or later (previously 20), ESLint 10.4 or later and Typescript 6.0.

What to do when you upgrade:

- Rename `import/` to `import-x/` in `eslint-disable` comments and in your own config overrides. For example, `import/no-default-export` becomes `import-x/no-default-export`. The import rules now come from `eslint-plugin-import-x`, because `eslint-plugin-import` doesn't support ESLint 10.
- If you configure the import resolver yourself, convert it to `import-x/resolver-next`. That setting takes resolver objects instead of a map of names and options, and it replaces the old setting: an `import-x/resolver` map has no effect next to it. Install `eslint-import-resolver-typescript` and `eslint-plugin-import-x` in your project to import them.

  ```js
  // Before
  settings: {
    "import/resolver": {
      typescript: { project: "./tsconfig.app.json" },
      node: true,
    },
  },

  // After
  import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
  import { createNodeResolver } from "eslint-plugin-import-x";

  settings: {
    "import-x/resolver-next": [
      createTypeScriptImportResolver({ project: "./tsconfig.app.json" }),
      createNodeResolver(),
    ],
  },
  ```

- Rename `unicorn/prevent-abbreviations` to `unicorn/name-replacements` in your overrides. The options stay the same.
- Rename folders that aren't in kebab case, such as `src/components/UserCard/`. `unicorn/filename-case` now checks folder names as well as file names, and `eslint --fix` can't rename them. To check file names only, set `"unicorn/filename-case": ["error", { case: "kebabCase", checkDirectories: false }]`.
- Run `eslint --fix` before fixing the remaining errors by hand. `eslint-plugin-unicorn` 80 adds many rules to its recommended set, and the fix also rewrites documentation comments to the new form, without a `*` at the start of each line.
- If you set `settings.react.version` to `"detect"`, set your React version explicitly instead. `eslint-plugin-react` doesn't support ESLint 10 yet and crashes while detecting the version.

`eslint-plugin-react` and `eslint-plugin-jsx-a11y` don't support ESLint 10 in their peer dependencies yet, which affects installation:

- pnpm installs and warns about the unmet peer. The config works.
- pnpm with `strictPeerDependencies` stops the install. Allow ESLint 10 for both plugins under `peerDependencyRules.allowedVersions` (`eslint-plugin-react>eslint` and `eslint-plugin-jsx-a11y>eslint`).
- npm installs with an `ERESOLVE overriding peer dependency` warning, but puts a second copy of ESLint 9 inside this package, and ESLint then fails to load the config. Add `"overrides": { "eslint-plugin-react": { "eslint": "$eslint" }, "eslint-plugin-jsx-a11y": { "eslint": "$eslint" } }` to your `package.json`, or install with `--legacy-peer-deps`.

Other changes:

- ESLint 10 adds `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error` to its recommended rules, and `typescript-eslint` adds three rules to its strict set.
- The Next.js config accepts dynamic route folders such as `[productId]` in `src/app`. File names inside those folders are still checked.
