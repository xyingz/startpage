module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:jest/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue']
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  plugins: ['vue', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx']
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  rules: {
    // 关于 eslint 更多规则可以查阅 https://eslint.org/docs/rules
    // airbnb 风格指南：https://github.com/airbnb/javascript
    // airbnb 中文指南：https://github.com/lin-123/javascript

    // 配置 console 与 debugger
    'no-console':
      process.env.NODE_ENV === 'production'
        ? ['error', { allow: ['info', 'warn', 'error'] }]
        : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 解决 prettier 行尾报错
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    'no-undef': 'off',

    // 关于 vue 更多规则可以查阅 https://eslint.vuejs.org/rules
    'vue/max-attributes-per-line': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-multiple-template-root': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    // 解决 vuex 给 state 赋值报错
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state']
      }
    ]
  }
};
