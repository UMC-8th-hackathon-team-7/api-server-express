export default [
  {
    // 적용할 파일 패턴 지정 (js, mjs, cjs, jsx, ts, tsx 파일들)
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],

    // JavaScript 언어 옵션 설정
    languageOptions: {
      ecmaVersion: 2023, // ES2023 문법 사용
      sourceType: 'module', // ES 모듈 시스템 사용
    },

    // 사용할 ESLint 플러그인
    plugins: ['node', 'security'],

    // 확장할 ESLint 설정
    extends: [
      'eslint:recommended', // ESLint 기본 규칙
      'plugin:node/recommended', // Node.js 관련 규칙
      'plugin:security/recommended', // 보안 관련 규칙
    ],

    // 상세 규칙 설정
    rules: {
      'no-console': 'warn', // console 사용 시 경고
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수 에러 (_로 시작하는 변수 제외)
      'no-process-exit': 'error', // process.exit() 사용 금지
      'node/no-deprecated-api': 'error', // deprecated된 Node.js API 사용 금지
      'node/exports-style': ['error', 'module.exports'], // 모듈 내보내기 스타일 강제
      'node/file-extension-in-import': ['error', 'always'], // import 시 파일 확장자 필수
      'node/prefer-global/buffer': ['error', 'always'], // 전역 Buffer 사용 권장
      'node/prefer-global/console': ['error', 'always'], // 전역 console 사용 권장
      'node/prefer-global/process': ['error', 'always'], // 전역 process 사용 권장
      'node/no-unsupported-features/es-syntax': 'off', // ES 신규 문법 제한 해제
      'security/detect-object-injection': 'warn', // 객체 주입 취약점 감지 시 경고
      'security/detect-possible-timing-attacks': 'error', // 타이밍 공격 가능성 감지 시 에러
    },

    // 환경 설정
    env: {
      node: true, // Node.js 전역 변수 활성화
      es6: true, // ES6+ 전역 변수 활성화
    }
  }
];