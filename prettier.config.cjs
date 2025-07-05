// prettier.config.js
module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',

  // Express(Node.js) 프로젝트용 import 정렬 규칙
  importOrder: [
    // 외부 라이브러리
    '<THIRD_PARTY_MODULES>',
    // 상대 경로
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
