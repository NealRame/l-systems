import {
    defineConfig,
} from "eslint/config"

import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import tseslint from "typescript-eslint"

export default defineConfig([
    {
        files: ["src/**/*.{js,mjs,cjs,ts}"],
        plugins: { js },
        extends: ["js/recommended"],
        rules: {
            "comma-dangle": ["error", "only-multiline"],
            "quotes": ["error", "double"],
            "semi": ["error", "never"],
            "no-console": ["error", { allow: ["error", "warn"] }],
            "no-debugger": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        files: ["src/**/*.{js,mjs,cjs,ts}"],
        plugins: { stylistic },
        rules: {
            "no-multiple-empty-lines": ["error", {
                max: 1,
            }],
        },
    },
    tseslint.configs.recommended,
])
