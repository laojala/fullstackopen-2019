module.exports = {
  "env": {
      "es6": true,
      "node": true,
      "jest": true 
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "rules": {
      "indent": [
          "warn",
          2
      ],
      "linebreak-style": [
          "warn",
          "unix"
      ],
      "quotes": [
          "warn",
          "single"
      ],
      "semi": [
          "warn",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": 
        ["warn", {"skipBlankLines": true}],
      "object-curly-spacing": [
          "warn", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0, 
      "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  }
};