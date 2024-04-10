module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'next', 'next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['*.js'],
  rules: {
    camelcase: ['off'],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-console': ['error'],
    'no-prototype-builtins': ['off'],
    'react/prop-types': ['off'],
    'react/no-find-dom-node': ['warn'],
    'react/no-string-refs': ['warn'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/promise-function-async': ['off'],
    '@typescript-eslint/triple-slash-reference': ['off'],
    '@typescript-eslint/no-magic-numbers': ['off'],
    'no-useless-computed-key': ['off'],
    '@typescript-eslint/require-array-sort-compare': ['off'],
    '@next/next/no-html-link-for-pages': ['off'],
    '@typescript-eslint/no-explicit-any': 'off'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      plugins: ['import', 'react', '@typescript-eslint', 'jsx-a11y', 'simple-import-sort'],
      rules: {
        'react/function-component-definition': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-bind': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase']
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'typeLike',
            format: ['PascalCase']
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z0-9]',
              match: true
            }
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            custom: {
              regex: '^T[A-Z0-9]',
              match: true
            }
          },
          {
            selector: ['enum', 'enumMember'],
            format: ['PascalCase']
          },
          {
            selector: 'property',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'property',
            filter: ',^(__html|__v)$',
            format: null
          },
          {
            selector: ['function', 'import'],
            format: ['camelCase', 'PascalCase']
          }
        ],
        '@typescript-eslint/array-type': [
          'off',
          {
            default: 'array'
          }
        ],
        'max-lines-per-function': [
          'error',
          {
            max: 180
          }
        ],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/default-param-last': 1,
        '@typescript-eslint/no-useless-constructor': 1,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/no-unused-expressions': 2,
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_'
          }
        ],
        'import/no-default-export': 'off',
        'max-classes-per-file': 0,
        'jsx-a11y/anchor-is-valid': 'off',
        'init-declarations': 0,
        'no-extra-bind': 0,
        'no-implicit-globals': 1,
        'no-multi-str': 1,
        'no-new': 1,
        'no-restricted-globals': 1,
        'no-restricted-properties': 1,
        'no-template-curly-in-string': 1,
        'no-undefined': 0,
        'no-warning-comments': 0,
        'prefer-named-capture-group': 0,
        'prefer-promise-reject-errors': 1,
        'require-atomic-updates': 1,
        'require-await': 0,
        'id-match': [2, '^[a-zA-Z0-9$_]*$'],
        'accessor-pairs': 2,
        'array-callback-return': 2,
        camelcase: [
          2,
          {
            allow: ['^UNSAFE_'],
            properties: 'never'
          }
        ],
        complexity: [
          2,
          {
            max: 10
          }
        ],
        'consistent-return': 2,
        curly: 0,
        'default-case': 2,
        'dot-notation': 0,
        eqeqeq: 0,
        'func-style': [
          2,
          'declaration',
          {
            allowArrowFunctions: true
          }
        ],
        'guard-for-in': 2,
        'id-length': [
          2,
          {
            max: 56,
            min: 1
          }
        ],
        'jsx-a11y/label-has-for': [
          2,
          {
            allowChildren: false,
            components: ['Label'],
            required: {
              some: ['nesting', 'id']
            }
          }
        ],
        'line-comment-position': 2,
        'max-depth': 2,
        'max-lines': [
          2,
          {
            max: 500
          }
        ],
        'max-nested-callbacks': [2, 4],
        'max-params': [
          2,
          {
            max: 5
          }
        ],
        'new-cap': 0,
        'no-alert': 2,
        'no-async-promise-executor': 2,
        'no-await-in-loop': 2,
        'no-bitwise': 2,
        'no-caller': 2,
        'no-console': [
          2,
          {
            allow: ['error', 'warn', 'info']
          }
        ],
        'no-continue': 2,
        'no-div-regex': 0,
        'no-else-return': 0,
        'no-eq-null': 2,
        'no-eval': 2,
        'no-extend-native': 2,
        'no-extra-label': 0,
        'no-implicit-coercion': 0,
        'no-implied-eval': 2,
        'no-inline-comments': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': 2,
        'no-lone-blocks': 2,
        'no-loop-func': 2,
        'no-misleading-character-class': 2,
        'no-multi-assign': 2,
        'no-nested-ternary': 2,
        'no-new-func': 2,
        'no-new-object': 2,
        'no-new-wrappers': 2,
        'no-octal-escape': 2,
        'no-param-reassign': 2,
        'no-proto': 2,
        'no-prototype-builtins': 2,
        'no-return-assign': 2,
        'no-return-await': 2,
        'no-script-url': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-throw-literal': 2,
        'no-undef-init': 0,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': 0,
        'no-useless-call': 2,
        'no-useless-catch': 2,
        'no-useless-concat': 2,
        'no-useless-return': 0,
        'no-var': 0,
        'no-void': 2,
        'no-with': 2,
        'object-shorthand': 0,
        'one-var': [0, 'never'],
        'operator-assignment': 0,
        radix: 2,
        'react/jsx-filename-extension': [
          2,
          {
            extensions: ['.tsx']
          }
        ],
        'react/jsx-sort-props': 0,
        'react/no-unsafe': 2,
        'react/prop-types': 0,
        'react-hooks/exhaustive-deps': 2,
        'react-hooks/rules-of-hooks': 2,
        'require-unicode-regexp': 2,
        'spaced-comment': 2,
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto'
          }
        ]
      }
    }
  ]
};
