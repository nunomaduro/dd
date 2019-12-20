module.exports = {
  plugins: ["functional", "sonarjs", "simple-import-sort", "promise"],
  extends: [
    "algolia/jest",
    "algolia/typescript",
    "plugin:functional/recommended",
    "plugin:sonarjs/recommended",
    "plugin:promise/recommended"
  ],
  rules: {
    "simple-import-sort/sort": "error",
    "max-len": [1, 120, 2, { ignoreComments: true }],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 100
      }
    ],
    "object-shorthand": [
      "error",
      "always",
      { avoidExplicitReturnArrows: true }
    ],
    "lines-between-class-members": ["error", "always"],
    "newline-before-return": ["error"],
    "import/no-extraneous-dependencies": [
      "error",
      { packageDir: "./", devDependencies: true }
    ],
    "import/extensions": ["off"],
    "valid-jsdoc": ["off"],
    "functional/no-expression-statement": ["off"],
    "functional/no-conditional-statement": ["off"],
    "functional/no-throw-statement": ["off"],
    "functional/no-mixed-type": ["off"],
    "promise/always-return": ["off"],
    "functional/functional-parameters": ["off"],
    "functional/no-return-void": ["off"],
    "@typescript-eslint/no-triple-slash-reference": ["off"]
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@nunomaduro/dd", "./src"]
        ],
        extensions: [".ts"]
      },
      node: {
        extensions: [".ts"]
      }
    }
  },
  overrides: [
    {
      files: ["./tests/**", "./scripts/**"],
      rules: {
        "functional/immutable-data": 0,
        "import/no-extraneous-dependencies": 0,
        "functional/no-let": 0,
        "functional/no-this-expression": 0,
        "functional/no-loop-statement": 0,
        "functional/no-try-statement": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "functional/prefer-readonly-type": 0,
        "sonarjs/no-duplicate-string": 0,
        "jest/expect-expect": 0
      }
    }
  ]
};
