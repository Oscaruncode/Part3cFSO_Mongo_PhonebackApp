module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "eqeqeq": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "linebreak-style": 0, //
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-trailing-spaces": "error",
    "no-console": 0
  }
}
