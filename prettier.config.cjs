// prettier.config.js
/**
 * Prettier 설정 파일(JS 포맷)
 * - 주석 지원, 동적 확장 가능
 * - 팀 컨벤션 및 프로젝트 구조를 반영한 import 순서
 */

module.exports = {
  // 들여쓰기 너비 (2칸)
  tabWidth: 2,
  // 들여쓰기 시 탭 문자 사용 (true: 탭, false: 스페이스)
  useTabs: false,
  // 줄 끝에 세미콜론 사용
  semi: true,
  // 자바스크립트(타입스크립트)에서 싱글 쿼트(') 사용
  singleQuote: true,
  // JSX/HTML 속성에서는 더블 쿼트(") 사용
  jsxSingleQuote: false,
  // 마지막 요소 뒤에 항상 쉼표(trailing comma) 추가
  trailingComma: 'all',
  // 한 줄 최대 길이(가독성을 위한 줄바꿈 기준)
  printWidth: 100,
  // 객체 리터럴에서 중괄호 사이에 띄어쓰기 허용 여부
  bracketSpacing: true,
  // 화살표 함수의 매개변수 괄호 사용 방식 ("always": 항상 괄호 사용)
  arrowParens: 'always',
  // 줄 끝 형태 (운영체제 따라 자동: 'auto', 강제 LF: 'lf')
  endOfLine: 'auto',

  // import 정렬 규칙(순서 지정)
  // (팀 컨벤션과 프로젝트 구조를 최대한 상세하게 반영)
  importOrder: [

    // 외부 라이브러리
    '<THIRD_PARTY_MODULES>',

    // 기타 src 하위 경로
    '^@/(.*)$',

    // 마지막에 상대 경로
    '^[./]',
  ],

  // import 그룹 구분(빈 줄 추가)
  importOrderSeparation: true,
  // import 객체/함수 등 specifier 알파벳 순 정렬
  importOrderSortSpecifiers: true,

  // 플러그인 등록(Tailwind 정렬, import 정렬)
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
