---
"@incentro-ic/config-eslint": major
---

Upgrade to ESLint 10 and Typescript 6, and replace `eslint-plugin-import` with `eslint-plugin-import-x`.

ESLint 9 and `eslint-plugin-import` (which doesn't support ESLint 10) are no longer supported, and the minimum Node.js version goes from 20 to 22.18. To migrate:

- Use Node.js 22.18 or later, and install ESLint 10.4 or later and Typescript 6.0 in your project.
- Rename the `import/` prefix to `import-x/` in `eslint-disable` comments and config overrides, for example `import/no-default-export` becomes `import-x/no-default-export`.
- If you override the import resolver, use the `import-x/resolver-next` setting instead of `import/resolver`.
- `eslint-plugin-unicorn` 80 enables more rules in its recommended config and renames `unicorn/prevent-abbreviations` to `unicorn/name-replacements`. Rename the rule in your overrides and run `eslint --fix`, which also rewrites documentation comments to the new form without `*` prefixes.
- ESLint 10 adds `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error` to its recommended rules.

The Next.js config no longer reports dynamic route segment folders such as `[productId]` in `src/app`, which `unicorn/filename-case` checks since version 80. File names inside those folders are still checked.

`eslint-plugin-react` and `eslint-plugin-jsx-a11y` don't list ESLint 10 in their peer dependencies yet, so package managers warn about an unmet `eslint` peer. Both plugins work on ESLint 10.
