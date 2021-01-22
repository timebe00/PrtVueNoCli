//  규칙 설정
module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2015,
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    extends: [
        'standard',
        'Plugin:vue/essentual'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        //  에러를 안 받겠다.
        //  1 : 에러를 받는다.
        //  2 : 경고창을 받는다.
        'no-new': 0
    }
}