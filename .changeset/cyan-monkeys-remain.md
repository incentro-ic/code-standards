---
"@incentro-ic/config-eslint": major
---

Move to ESLint 10 and Typescript 6.

This version needs Node.js 22.18 or later (previously 20), ESLint 10.4 or later and Typescript 6.0.

What to do when you upgrade:

- Rename `import/` to `import-x/` in `eslint-disable` comments and in your own config overrides. For example, `import/no-default-export` becomes `import-x/no-default-export`. The import rules now come from `eslint-plugin-import-x`, because `eslint-plugin-import` doesn't support ESLint 10.
- If you configure the import resolver yourself, use the `import-x/resolver-next` setting instead of `import/resolver`.
- Rename `unicorn/prevent-abbreviations` to `unicorn/name-replacements` in your overrides. The options stay the same.
- Run `eslint --fix` before fixing the remaining errors by hand. `eslint-plugin-unicorn` 80 adds many rules to its recommended set, and the fix also rewrites documentation comments to the new form, without a `*` at the start of each line.
- If you set `settings.react.version` to `"detect"`, set your React version explicitly instead. `eslint-plugin-react` doesn't support ESLint 10 yet and crashes while detecting the version.

Package managers will warn that `eslint-plugin-react` and `eslint-plugin-jsx-a11y` expect ESLint 9. The rules this config enables from those plugins work on ESLint 10.

Other changes:

- ESLint 10 adds `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error` to its recommended rules, and `typescript-eslint` adds three rules to its strict set.
- The Next.js config accepts dynamic route folders such as `[productId]` in `src/app`. File names inside those folders are still checked.
