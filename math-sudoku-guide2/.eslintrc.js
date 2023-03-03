module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',    
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'no-tabs': 0,// 不允许混用tab和空格
        // 'indent': ["error", 4, {"SwitchCase": 1}],//缩写格式的一致性
        // 'default-case':"error",//switch语句中必须有default条件  
        // 'no-redeclare':"error",//不允许重复声明变量
        // 'no-unused-vars': 0,// 一行最后不允许有空格
        // 'eqeqeq': 0,// 注释风格要不要有空格
        // 'dot-notation':["error", { "allowKeywords": false }]//不允许关键字出现在变量中
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
