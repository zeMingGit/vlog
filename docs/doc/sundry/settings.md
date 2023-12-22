# 项目基础配置

## 概要
`提示：换台电脑之后环境都没了，找之前的又很麻烦，所以在这块记录下`

## 技术细节
#### 1. vs code中settings.json配置
`提示：下载相应的插件`
```javascript
{
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    "editor.tabSize": 2,
    // #每次保存的时候自动格式化
    // "editor.formatOnSave": true,
    // 配置 eslint 检查的文件类型
    // "eslint.autoFixOnSave": true,
    "eslint.validate": [
        // "javascript", {
        //     "language": "vue",
        //     "autoFix": true
        // },
        // "javascriptreact",
        "javascript",
        "html",
        "vue"
    ],
    // 关闭编辑器内置样式检查（避免与stylelint冲突）
    // "css.validate": false,
    // "less.validate": false,
    // "scss.validate": false,
    // 配置stylelint检查的文件类型范围
    "stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"],
    // 配置 stylelint 自动修复 ,VScode需要安装stylelint-plus插件，否则不能实现自动修复
    "stylelint.autoFixOnSave": true,
    "editor.fontSize": 14,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "workbench.colorTheme": "Default Dark+",
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.fixAll.stylelint": "explicit"
    },
    "tabnine.experimentalAutoImports": true,
    "settingsSync.ignoredExtensions": [],
    "diffEditor.ignoreTrimWhitespace": false,
    "consoleLog.Font Size": "14",
    "settingsSync.ignoredSettings": [],
    "liveServer.settings.AdvanceCustomBrowserCmdLine": "",
    "editor.fontLigatures": false,
    "github.copilot.enable": {
        "*": true,
        "plaintext": false,
        "markdown": false,
        "scminput": false
    },
    "editor.inlayHints.enabled": "offUnlessPressed",
    "files.autoSave": "afterDelay",
    "security.workspace.trust.untrustedFiles": "open",
}
```

#### 2. vue3 Eslint配置
```javascript
module.exports = {
	'root': true,
	'env': {
		'browser': true,
		'commonjs': true,
		'es6': true
	},
	'extends': [
		'plugin:vue/base'
	],
	'parserOptions': {
		'ecmaVersion': 2017,
		'sourceType': 'module'
	},
	'plugins': [
		'vue'
	],
	'rules': {
		// 花括号中间间距一个空格
		'vue/mustache-interpolation-spacing': ['error', 'always'],
		// 不允许多个空格
		'vue/no-multi-spaces': ['error', {
			'ignoreProperties': false
		}],
		// 属性顺序
		'vue/attributes-order': ['error', {
			'order': [
				'DEFINITION',
				'LIST_RENDERING',
				'CONDITIONALS',
				'RENDER_MODIFIERS',
				'GLOBAL',
				'UNIQUE',
				'TWO_WAY_BINDING',
				'OTHER_DIRECTIVES',
				'OTHER_ATTR',
				'EVENTS',
				'CONTENT'
			],
			'alphabetical': false
		}],
		// 标签属性-连接
		'vue/attribute-hyphenation': ['error', 'never'],
		'vue/html-closing-bracket-spacing': ['error', {
			'startTag': 'never',
			'endTag': 'never',
			'selfClosingTag': 'always'
		}],
		'vue/html-indent': ['error', 2, {
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': []
		}],
		'vue/html-quotes': ['error', 'double', { 'avoidEscape': true }],
		'vue/html-self-closing': ['error', {
			'html': {
				'void': 'never',
				'normal': 'always',
				'component': 'always'
			},
			'svg': 'always',
			'math': 'always'
		}],
		// 在computed properties中禁用异步actions
		'vue/no-async-in-computed-properties': 'error',
		// 不允许重复的keys
		'vue/no-dupe-keys': 'error',
		// 不允许重复的attributes
		'vue/no-duplicate-attributes': 'warn',
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		// 在 <template> 标签下不允许解析错误
		'vue/no-parsing-error': ['error', {
			'x-invalid-end-tag': false,
		}],
		// 不允许覆盖保留关键字
		'vue/no-reserved-keys': 'error',
		// 强制data必须是一个带返回值的函数
		// 'vue/no-shared-component-data': 'error',
		// 不允许在computed properties中出现副作用。
		'vue/no-side-effects-in-computed-properties': 'error',
		// <template>不允许key属性
		'vue/no-template-key': 'warn',
		// 在 <textarea> 中不允许mustaches
		'vue/no-textarea-mustache': 'error',
		// 不允许在v-for或者范围内的属性出现未使用的变量定义
		'vue/no-unused-vars': 'warn',
		// <component>标签需要v-bind:is属性
		'vue/require-component-is': 'error',
		// render 函数必须有一个返回值
		'vue/require-render-return': 'error',
		// 保证 v-bind:key 和 v-for 指令成对出现
		'vue/require-v-for-key': 'error',
		// 检查默认的prop值是否有效
		'vue/require-valid-default-prop': 'error',
		// 保证computed属性中有return语句
		'vue/return-in-computed-property': 'error',
		// 强制校验 template 根节点
		'vue/valid-template-root': 'error',
		// 强制校验 v-bind 指令
		'vue/valid-v-bind': 'error',
		// 强制校验 v-cloak 指令
		'vue/valid-v-cloak': 'error',
		// 强制校验 v-else-if 指令
		'vue/valid-v-else-if': 'error',
		// 强制校验 v-else 指令
		'vue/valid-v-else': 'error',
		// 强制校验 v-for 指令
		'vue/valid-v-for': 'error',
		// 强制校验 v-html 指令
		'vue/valid-v-html': 'error',
		// 强制校验 v-if 指令
		'vue/valid-v-if': 'error',
		// 强制校验 v-model 指令
		'vue/valid-v-model': 'error',
		// 强制校验 v-on 指令
		'vue/valid-v-on': 'error',
		// 强制校验 v-once 指令
		'vue/valid-v-once': 'error',
		// 强制校验 v-pre 指令
		'vue/valid-v-pre': 'error',
		// 强制校验 v-show 指令
		'vue/valid-v-show': 'error',
		// 强制校验 v-text 指令
		'vue/valid-v-text': 'error',
		'vue/comment-directive': 0,
		// 空行最多不能超过2行
		'no-multiple-empty-lines': [1, {
			'max': 1
		}],
		'object-curly-spacing': ['error', 'always'],
		'no-cond-assign': 'error', // 禁止条件表达式中出现赋值操作符
		'no-constant-condition': 'error', // 禁止在条件中使用常量表达式
		'no-multi-spaces': 'error',
		'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数
		'no-duplicate-case': 'error', // 禁止出现重复的 case 标签
		'no-empty': 'error', // 禁止出现空语句块
		'no-irregular-whitespace': 'error', // 禁止不规则的空白
		'array-bracket-spacing': ['error', 'never'], // 禁止或强制在括号内使用空格
		'no-alert': 'error', 　　　　　　　　　　　　　　　　　 // 禁止alert,conirm等
		'no-debugger': 'error', 　　　　　　　　　　　　　　　 // 禁止debugger
		'semi': ['error', 'never'], // 禁止分号
		'no-unreachable': 'error', 　　　　　　　　　　　　　　// 当有不能执行到的代码时
		'eol-last': 'error', 　　　　　　　　　　　　　　　　　　// 文件末尾强制换行
		'no-new': 'error',　　　　　　　　　　　　　　　　　　　 // 禁止在使用new构造一个实例后不赋值
		'quotes': ['error', 'single'], 　　　　　　　　　　 // 引号类型 `` "" ''
		'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used' }], 　　// 不能有声明后未被使用的变量
		'no-trailing-spaces': 'error', 　　　　　　　　　　　　// 一行结束后面不要有空格
		'space-before-function-paren': ['error', 'never'], // 函数定义时括号前面要不要有空格
		'generator-star-spacing': 'error', 　　　　　　　　　　// allow async-await
		'space-before-function-paren': ['error', 'never'], // 禁止函数名前有空格，如function Test (aaa,bbb)
		'space-in-parens': ['error', 'never'], 　　　　　　　　// 禁止圆括号有空格，如Test( 2, 3 )
		'space-infix-ops': 'error', 　　　　　　　　　　　　　　// 在操作符旁边必须有空格， 如 a + b而不是a+b
		'space-before-blocks': ['error', 'always'], 　　　　　// 语句块之前必须有空格 如 ) {}
		'spaced-comment': ['error', 'always'], 　　　　　　　　// 注释前必须有空格
		'arrow-body-style': ['error', 'always'], 　　　　　　// 要求箭头函数必须有大括号 如 a => {}
		'arrow-spacing': ['error', { 'before': true, 'after': true }], // 定义箭头函数的箭头前后都必须有空格
		'no-const-assign': 'error', // 禁止修改const变量
		'template-curly-spacing': ['error', 'never'], 　　// 禁止末班字符串中的{}中的变量出现空格，如以下错误`${ a }`
		'no-multi-spaces': 'error', 　　　　　　　　　　　　// 禁止多个空格，只有一个空格的地方必须只有一个
		'no-whitespace-before-property': 'error', 　　　　// 禁止属性前有空格，如obj. a
		'keyword-spacing': ['error', { 'before': true, 'after': true }]　　 // 关键字前后必须有空格 如 } else {
	}
}

```

#### 3. vue3 styleLint配置
```javascript
module.exports = {
	"extends": ["stylelint-config-standard", "stylelint-config-standard-wxss", "stylelint-config-recommended-wxss"],
	"plugins": ["stylelint-scss", "stylelint-order"],
	"rules": {
		// 指定声明块内属性的字母顺序
		'order/properties-order': [
			'position',
			'top',
			'right',
			'bottom',
			'left',
			'z-index',
			'display',
			'float',
			'width',
			'height',
			'max-width',
			'max-height',
			'min-width',
			'min-height',
			'padding',
			'padding-top',
			'padding-right',
			'padding-bottom',
			'padding-left',
			'margin',
			'margin-top',
			'margin-right',
			'margin-bottom',
			'margin-left',
			'margin-collapse',
			'margin-top-collapse',
			'margin-right-collapse',
			'margin-bottom-collapse',
			'margin-left-collapse',
			'overflow',
			'overflow-x',
			'overflow-y',
			'clip',
			'clear',
			'font',
			'font-family',
			'font-size',
			'font-smoothing',
			'osx-font-smoothing',
			'font-style',
			'font-weight',
			'hyphens',
			'src',
			'line-height',
			'letter-spacing',
			'word-spacing',
			'color',
			'text-align',
			'text-decoration',
			'text-indent',
			'text-overflow',
			'text-rendering',
			'text-size-adjust',
			'text-shadow',
			'text-transform',
			'word-break',
			'word-wrap',
			'white-space',
			'vertical-align',
			'list-style',
			'list-style-type',
			'list-style-position',
			'list-style-image',
			'pointer-events',
			'cursor',
			'background',
			'background-attachment',
			'background-color',
			'background-image',
			'background-position',
			'background-repeat',
			'background-size',
			'border',
			'border-collapse',
			'border-top',
			'border-right',
			'border-bottom',
			'border-left',
			'border-color',
			'border-image',
			'border-top-color',
			'border-right-color',
			'border-bottom-color',
			'border-left-color',
			'border-spacing',
			'border-style',
			'border-top-style',
			'border-right-style',
			'border-bottom-style',
			'border-left-style',
			'border-width',
			'border-top-width',
			'border-right-width',
			'border-bottom-width',
			'border-left-width',
			'border-radius',
			'border-top-right-radius',
			'border-bottom-right-radius',
			'border-bottom-left-radius',
			'border-top-left-radius',
			'border-radius-topright',
			'border-radius-bottomright',
			'border-radius-bottomleft',
			'border-radius-topleft',
			'content',
			'quotes',
			'outline',
			'outline-offset',
			'opacity',
			'filter',
			'visibility',
			'size',
			'zoom',
			'transform',
			'box-align',
			'box-flex',
			'box-orient',
			'box-pack',
			'box-shadow',
			'box-sizing',
			'table-layout',
			'animation',
			'animation-delay',
			'animation-duration',
			'animation-iteration-count',
			'animation-name',
			'animation-play-state',
			'animation-timing-function',
			'animation-fill-mode',
			'transition',
			'transition-delay',
			'transition-duration',
			'transition-property',
			'transition-timing-function',
			'background-clip',
			'backface-visibility',
			'resize',
			'appearance',
			'user-select',
			'interpolation-mode',
			'direction',
			'marks',
			'page',
			'set-link-source',
			'unicode-bidi',
			'speak',
		],
		"selector-pseudo-class-no-unknown": [true,
			{
        "ignorePseudoClasses": ["deep"]
      }
		],
		// 颜色值要小写 
		'color-hex-case': 'lower', 'number-leading-zero': 'always',
	}
}
```

#### 4. vue2 Eslint配置
```javascript
module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "plugin:vue/base"
    ],
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // 花括号中间间距一个空格
        'vue/mustache-interpolation-spacing': ["error", "always"],
        // 不允许多个空格
        'vue/no-multi-spaces': ['error', {
            "ignoreProperties": false
        }],
        // 属性顺序
        'vue/attributes-order': ['error', {
            'order': [
                "DEFINITION",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "GLOBAL",
                "UNIQUE",
                "TWO_WAY_BINDING",
                "OTHER_DIRECTIVES",
                "OTHER_ATTR",
                "EVENTS",
                "CONTENT"
            ],
            'alphabetical': false
        }],
        // 标签属性-连接
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/html-closing-bracket-spacing': ['error', {
            'startTag': 'never',
            'endTag': 'never',
            'selfClosingTag': 'always'
        }],
        'vue/html-indent': ['error', 2, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        'vue/html-quotes': ["error", "double", { "avoidEscape": true }],
        'vue/html-self-closing': ['error', {
            "html": {
                "void": "never",
                "normal": "always",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        // 在computed properties中禁用异步actions
        'vue/no-async-in-computed-properties': 'error',
        // 不允许重复的keys
        'vue/no-dupe-keys': 'error',
        // 不允许重复的attributes
        'vue/no-duplicate-attributes': 'warn',
				'comma-spacing': ['error', { "before": false, "after": true }],
        // 在 <template> 标签下不允许解析错误
        'vue/no-parsing-error': ['error',{
            'x-invalid-end-tag': false,
        }],
        // 不允许覆盖保留关键字
        'vue/no-reserved-keys': 'error',
        // 强制data必须是一个带返回值的函数
        // 'vue/no-shared-component-data': 'error',
        // 不允许在computed properties中出现副作用。
        'vue/no-side-effects-in-computed-properties': 'error',
        // <template>不允许key属性
        'vue/no-template-key': 'warn',
        // 在 <textarea> 中不允许mustaches
        'vue/no-textarea-mustache': 'error',
        // 不允许在v-for或者范围内的属性出现未使用的变量定义
        'vue/no-unused-vars': 'warn',
        // <component>标签需要v-bind:is属性
        'vue/require-component-is': 'error',
        // render 函数必须有一个返回值
        'vue/require-render-return': 'error',
        // 保证 v-bind:key 和 v-for 指令成对出现
        'vue/require-v-for-key': 'error',
        // 检查默认的prop值是否有效
        'vue/require-valid-default-prop': 'error',
        // 保证computed属性中有return语句 
        'vue/return-in-computed-property': 'error',
        // 强制校验 template 根节点
        'vue/valid-template-root': 'error',
        // 强制校验 v-bind 指令
        'vue/valid-v-bind': 'error',
        // 强制校验 v-cloak 指令
        'vue/valid-v-cloak': 'error',
        // 强制校验 v-else-if 指令
        'vue/valid-v-else-if': 'error',
        // 强制校验 v-else 指令 
        'vue/valid-v-else': 'error',
        // 强制校验 v-for 指令
        'vue/valid-v-for': 'error',
        // 强制校验 v-html 指令
        'vue/valid-v-html': 'error',
        // 强制校验 v-if 指令
        'vue/valid-v-if': 'error',
        // 强制校验 v-model 指令
        'vue/valid-v-model': 'error',
        // 强制校验 v-on 指令
        'vue/valid-v-on': 'error',
        // 强制校验 v-once 指令
        'vue/valid-v-once': 'error',
        // 强制校验 v-pre 指令
        'vue/valid-v-pre': 'error',
        // 强制校验 v-show 指令
        'vue/valid-v-show': 'error',
        // 强制校验 v-text 指令
        'vue/valid-v-text': 'error',
        'vue/comment-directive': 0,
        // 空行最多不能超过2行
        "no-multiple-empty-lines": [1, {
            "max": 1
        }],
        'object-curly-spacing': ["error", "always"],
        "no-cond-assign": "error", // 禁止条件表达式中出现赋值操作符
        "no-constant-condition": "error", // 禁止在条件中使用常量表达式
        "no-multi-spaces": "error",
        "no-dupe-args": "error", // 禁止 function 定义中出现重名参数
        "no-duplicate-case": "error", // 禁止出现重复的 case 标签
        "no-empty": "error", // 禁止出现空语句块
        "no-irregular-whitespace": "error", // 禁止不规则的空白
        "array-bracket-spacing": ["error", "never"], // 禁止或强制在括号内使用空格
        "no-alert": "error", 　　　　　　　　　　　　　　　　　 // 禁止alert,conirm等
        "no-debugger": "error", 　　　　　　　　　　　　　　　 // 禁止debugger
        "semi": ["error", "never"],　　　　　　　　　　　　   // 禁止分号
        "no-unreachable": "error", 　　　　　　　　　　　　　　// 当有不能执行到的代码时
        "eol-last": "error", 　　　　　　　　　　　　　　　　　　// 文件末尾强制换行
        "no-new": "error",　　　　　　　　　　　　　　　　　　　 // 禁止在使用new构造一个实例后不赋值
        "quotes": ["error", "single"], 　　　　　　　　　　 // 引号类型 `` "" ''
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used" }], 　　// 不能有声明后未被使用的变量
        "no-trailing-spaces": "error", 　　　　　　　　　　　　// 一行结束后面不要有空格
        "space-before-function-paren": ["error", "never"], // 函数定义时括号前面要不要有空格
        'generator-star-spacing': "error", 　　　　　　　　　　// allow async-await
        "space-before-function-paren": ["error", "never"],  // 禁止函数名前有空格，如function Test (aaa,bbb)
        "space-in-parens": ["error", "never"], 　　　　　　　　// 禁止圆括号有空格，如Test( 2, 3 )
        "space-infix-ops": "error", 　　　　　　　　　　　　　　// 在操作符旁边必须有空格， 如 a + b而不是a+b
        "space-before-blocks": ["error", "always"], 　　　　　// 语句块之前必须有空格 如 ) {}
        "spaced-comment":["error", "always"], 　　　　　　　　// 注释前必须有空格
        "arrow-body-style": ["error", "always"], 　　　　　　// 要求箭头函数必须有大括号 如 a => {}
        "arrow-spacing": ["error", { "before": true, "after": true }], // 定义箭头函数的箭头前后都必须有空格
        "no-const-assign": "error",  　　　　　　　　　　　　  // 禁止修改const变量
        "template-curly-spacing": ["error", "never"], 　　// 禁止末班字符串中的{}中的变量出现空格，如以下错误`${ a }`
        "no-multi-spaces": "error", 　　　　　　　　　　　　// 禁止多个空格，只有一个空格的地方必须只有一个
        "no-whitespace-before-property": "error", 　　　　// 禁止属性前有空格，如obj. a
        "keyword-spacing":["error",{"before": true, "after": true}]　　 // 关键字前后必须有空格 如 } else {
    }
}
```

#### 5. .gitignore配置
```javascript
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
*.local

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```