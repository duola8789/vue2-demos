module.exports = {
  "parser": "vue-eslint-parser",
  "env": {
    "browser": true,
    "amd": true,
    "jquery": true
  },
  parserOptions:{
    "ecmaVersion": 8,
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  "extends": [
    "plugin:vue/essential"
  ],
  "rules": {
    // 禁止出现alert, prompt 和 confirm, 可以在发布的时候进行检测
    "no-alert": 0,
    // 禁止出现console, 可以在发布的时候进行检测
    "no-console": 0,
    // 禁止出现debugger, 可以在发布的时候进行检测
    "no-debugger": 2,
    // 禁止不写分号
    "semi": [0, "always"],
    // 禁止出现tab之外的缩进
    "indent": [0, "tab"],
    // 允许定义前使用
    "no-use-before-define": 0,
    // 允许if (!!foo) 这种形式
    "no-extra-boolean-cast": 0,
    // 允许对函数声明进行覆盖赋值
    "no-func-assign": 0,
    // 允许使用caller或callee
    "no-caller": 0,
    // 允许函数在不同的情况下返回不同类型的值
    "consistent-return": 0,
    // 允许在switch的case中不加break
    "no-fallthrough": 0,
    // 允许使用__proto__
    "no-proto": 0,
    // 允许覆盖外部变量
    "no-shadow": 0,
    // 允许文件的最后一行不是空白行
    "eol-last": 0,
    // 允许使用下划线开头命名变量
    "no-underscore-dangle": 0,
    // 建议将操作符放到行尾, 而不是行首
    "operator-linebreak": [1, "after"],
    // 建议使用已定义的变量
    "no-undef": 1,
    // 建议return语句中不要包含赋值表达式
    "no-return-assign": 1,
    // 建议代码列数不能超过120行
    "max-len": [1, 120],
    // 建议启用严格模式
    "global-strict": 0,
    "strict": 1,
    // 建议使用单引号
    "quotes": [1, "single"],
    // 建议注释符要有空白隔开
    "spaced-comment": [1, "always"],
    // allow async-await
    'generator-star-spacing': 0,
  }
};
