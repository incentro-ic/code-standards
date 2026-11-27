import nextPlugin from "@next/eslint-plugin-next";
import type { Linter } from "eslint";
import { globalIgnores } from "eslint/config";
import baseConfigs from "./base.js";
import { REACT_ABBREVIATION_REPLACEMENTS } from "./partials/react.js";

export const NEXT_ABBREVIATION_REPLACEMENTS = {
  // Allow the use of "params" in Next.js codebases, as it's common in route
  // segment files, and required by exports like "generateStaticParams".
  params: false,
};

const config: Linter.Config[] = [
  ...baseConfigs,

  nextPlugin.configs["core-web-vitals"],

  {
    name: "incentro-ic/next",
    files: ["src/app/**/{layout,page}.{ts,tsx}"],
    rules: {
      // Next.js requires default exports for page files.
      "import-x/no-default-export": "off",

      "unicorn/name-replacements": [
        "error",
        {
          replacements: {
            ...REACT_ABBREVIATION_REPLACEMENTS,
            ...NEXT_ABBREVIATION_REPLACEMENTS,
          },
        },
      ],
    },
  },

  {
    name: "incentro-ic/next/dynamic-segments",
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      // Dynamic route segments like `[slug]` or `[[...mdxPath]]` are named
      // after the route parameter they expose in `params`, so they follow the
      // variable naming convention instead of kebab case.
      "unicorn/filename-case": [
        "error",
        { case: "kebabCase", ignore: [/^\[{1,2}(?:\.{3})?[^\]]+\]{1,2}$/u] },
      ],
    },
  },

  globalIgnores(
    ["dist/**", "*.*", ".next/**"],
    "incentro-ic/next/ignore-directories",
  ),
];

export default config;
