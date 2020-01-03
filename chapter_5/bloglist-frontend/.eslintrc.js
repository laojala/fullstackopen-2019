module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": [ 
    "eslint:recommended" 
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "settings": {
    "react": {
        "pragma": "React",
        "version": "16.9"
    }
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
      "eqeqeq": "warn",
      "no-trailing-spaces": "warn",
      "object-curly-spacing": [
          "warn", "always"
      ],
      "arrow-spacing": [
          "warn", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0,
      "no-unused-vars": ["off", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
      "react/jsx-uses-vars": 0,
      "react/react-in-jsx-scope": 0,
      "react/no-unescaped-entities": 0,
      "react/display-name": 0
  }
  
}