module.exports = {
    presets: [
        '@vue/app',
        "@babel/preset-env",
        "@babel/preset-flow"
    ],
    "plugins": [
        //支持类成员属性
        "@babel/plugin-proposal-class-properties",
        ["component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }]
    ],
    //统一依赖库的模板化输出方式(es6与commonJs)
    sourceType:'unambiguous'
}
  