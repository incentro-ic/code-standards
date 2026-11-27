import type { Linter } from "eslint";
import { globalIgnores } from "eslint/config";
import baseConfigs from "./base.js";
import { REACT_ABBREVIATION_REPLACEMENTS } from "./partials/react.js";

export const REACT_ROUTER_ABBREVIATION_REPLACEMENTS = {
  // Allow the use of "params" in React Router codebases, as it's common in
  // route files, and required by loaders.
  params: false,
};

// Matches a route folder in `src/routes` whose name uses React Router's file
// route syntax: `.` separators, `$` parameters, `(…)` optional segments,
// `[…]` escapes, or a leading or trailing `_`.
const PATH_ENDING_IN_ROUTE_FOLDER =
  /(?:^|\/)src\/routes\/(?:[^/]*[$.()[\]][^/]*|_[^/]*|[^/]*_)$/u;

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
      // conventions instead of kebab case. Marking them as directory roots
      // skips their names, while file names and folders below them are still
      // checked.
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
