import type { Linter } from "eslint";
import { globalIgnores } from "eslint/config";
import baseConfigs from "./base.js";
import { REACT_ABBREVIATION_REPLACEMENTS } from "./partials/react.js";

export const REACT_ROUTER_ABBREVIATION_REPLACEMENTS = {
  // Allow the use of "params" in React Router codebases, as it's common in
  // route files, and required by loaders.
  params: false,
};

// Pieces of a route folder name in React Router's file route syntax, such as
// `($lang).users.$userId` or `concerts_.mine`. Every `.`-separated segment is
// kebab case (optionally with a leading or trailing `_`), a `$parameter`, an
// `(optional)` segment or contains a `[escaped]` part.
const KEBAB_CASE_WORD = "[a-z0-9]+";
const KEBAB_CASE_NAME = `${KEBAB_CASE_WORD}(?:-${KEBAB_CASE_WORD})*`;
const ESCAPED_PART = String.raw`\[[^\]/]+\]`;
const PARAMETER = String.raw`\$[a-zA-Z0-9]*`;
const STATIC_SEGMENT = `_?(?:${KEBAB_CASE_WORD}|${ESCAPED_PART})(?:-(?:${KEBAB_CASE_WORD}|${ESCAPED_PART}))*_?`;
const OPTIONAL_SEGMENT = String.raw`\((?:${STATIC_SEGMENT}|${PARAMETER})\)`;
const ROUTE_SEGMENT = `(?:${STATIC_SEGMENT}|${PARAMETER}|${OPTIONAL_SEGMENT})`;

// Matches a folder directly in `src/routes` whose name uses the route syntax
// above. Plain kebab case names don't need the exception, so they don't match.
const PATH_ENDING_IN_ROUTE_FOLDER = new RegExp(
  String.raw`(?:^|/)src/routes/(?!${KEBAB_CASE_NAME}$)${ROUTE_SEGMENT}(?:\.${ROUTE_SEGMENT})*$`,
  "u",
);

const config: Linter.Config[] = [
  ...baseConfigs,

  {
    name: "incentro-ic/react-router",
    files: [
      "react-router.config.ts",
      "src/routes/**/*.{ts,tsx}",
      "src/{root,routes,entry.client,entry.server}.{ts,tsx}",
    ],
    rules: {
      // React Router requires default exports for a number of files.
      "import-x/no-default-export": "off",

      "unicorn/name-replacements": [
        "error",
        {
          replacements: {
            ...REACT_ABBREVIATION_REPLACEMENTS,
            ...REACT_ROUTER_ABBREVIATION_REPLACEMENTS,
          },
        },
      ],

      // Throwing Response and Redirect objects in loaders and actions is a
      // common pattern in React Router.
      "@typescript-eslint/only-throw-error": "off",
    },
  },

  {
    name: "incentro-ic/react-router/route-folders",
    files: ["src/routes/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Route folders such as `users.$userId` follow React Router's naming
      // conventions instead of kebab case. As directory roots, they and the
      // folders above them are skipped. File names and folders below them are
      // still checked.
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          directoryRoots: [PATH_ENDING_IN_ROUTE_FOLDER],
        },
      ],
    },
  },

  globalIgnores(
    ["dist/**", "*.*", ".react-router/**"],
    "incentro-ic/react-router/ignore-directories",
  ),
];

export default config;
