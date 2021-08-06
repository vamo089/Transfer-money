module.exports = {
  env: {
    browser: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:jsx-a11y/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['react', 'simple-import-sort', 'jsx-a11y'],
  rules: {
    curly: 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-console': 'error',
    'max-len': ['error', { code: 120 }],
    'max-lines': ['error', 500],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'comma-dangle': ['error', 'never'],
    'react/destructuring-assignment': 'off',
    'object-curly-newline': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    '@typescript-eslint/camelcase': 'off',
    camelcase: ['error', { ignoreDestructuring: true }],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/no-unescaped-entities': 'off',
    'implicit-arrow-linebreak': 'off',
    'react-hooks/exhaustive-deps': 'off',
  }
};
