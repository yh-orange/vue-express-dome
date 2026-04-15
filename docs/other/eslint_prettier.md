# 核心原则

ESLint 负责代码质量检查（潜在错误、不规范编码习惯），Prettier 负责代码格式统一（缩进、引号、分号等）。核心在于让二者各司其职：

- 通过 `eslint-config-prettier` 关闭 ESLint 中与 Prettier 冲突的格式规则

- 通过 `eslint-plugin-prettier` 将 Prettier 作为 ESLint 规则运行，格式问题在 ESLint 检查中暴露

## 低版本配置方案（ESLint 8.x + 传统 .eslintrc.js 格式）

:::warning
适用场景：ESLint 8.x 及以下版本，使用传统的 .eslintrc.js / .eslintrc.json 配置文件
:::

### 安装依赖

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

**各依赖作用：**

- `eslint`：代码质量检查工具

- `prettier`：代码格式化工具

- `eslint-config-prettier`：关闭 ESLint 中与 Prettier 冲突的规则

- `eslint-plugin-prettier`：将 Prettier 作为 ESLint 规则运行

### ESLint 配置文件（`.eslintrc.js`）

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended", // ESLint 推荐规则
    "plugin:prettier/recommended", // 启用 Prettier 并自动修复（必须放在最后）
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // 自定义规则示例
    "no-console": "warn",
    "prettier/prettier": "error", // 让 Prettier 格式问题以 ESLint 错误显示
  },
};
```

**关键点**：`'plugin:prettier/recommended'` 必须放在 `extends` 数组的最后，确保它能覆盖前面可能存在的冲突规则。[3](https://blog.csdn.net/IterLoom/article/details/154874150)[34](https://juejin.cn/post/7532992678108790794)

### Prettier 配置文件（`.prettierrc`）
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "endOfLine": "lf"
}
```

### VS Code 自动修复配置（`.vscode/settings.json`）
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true    // 旧版 VSCode 使用布尔值
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"]
}
```

:::warning
**VSCode 版本差异提示**：旧版 VSCode 中 `source.fixAll` 的值为布尔类型（true/false）；新版已改为字符串类型（ `explicit` / `always` / `never` ）。
:::


### `package.json` 脚本
```json
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
    "lint:fix": "eslint src/**/*.{js,jsx,ts,tsx} --fix",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,json,css,md}"
  }
}
```

### Git Hooks 自动提交前格式化（可选）
```bash
npm install --save-dev husky lint-staged
npx husky init
```

```json
// package.json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "**/*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

```bash
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged
```

## 高版本配置方案（ESLint 9.x + Flat Config 格式）

:::warning
适用场景：ESLint 9.0 及以上版本，使用全新的 Flat Config 配置文件（`eslint.config.js` 或 `eslint.config.mjs`）
:::

### 安装依赖

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier @eslint/js 
```
如果需要适配ts, react,还要增加配置
```bash

npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier @eslint/js eslint-plugin-react globals eslint-plugin-react-hooks eslint-plugin-jsx-a11y @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### ESLint Flat Config（`eslint.config.mjs`）
```js
import eslintConfigPrettier from '@vue/eslint-config-prettier';  // 或直接使用 eslint-config-prettier
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import js from '@eslint/js';

export default [
  js.configs.recommended,           // ESLint 推荐规则
  eslintConfigPrettier,             // 关闭与 Prettier 冲突的 ESLint 规则
  eslintPluginPrettier,             // 将 Prettier 作为 ESLint 规则运行
  {
    rules: {
      // 自定义 Prettier 规则（覆盖默认设置）
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,        // 使用单引号
          semi: false,              // 不使用分号
          printWidth: 100,          // 每行最大宽度
          trailingComma: 'none',    // 不添加尾随逗号
          endOfLine: 'auto',        // 自动处理换行符
        },
      ],
      'no-console': 'warn',
      // 其他自定义规则...
    },
  },
];
```
```js
// eslint.config.js - 最终版（适配 ESLint 9.15.0）
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

// 生产/开发环境判断
const isProduction = process.env.NODE_ENV === 'production';

export default [

	// JSX 文件专属规则
	{
		files: ['src/**/*.{tsx,ts}'],
		rules: {
			'react/jsx-sort-props': 'off',
			'react/jsx-no-undef': 'warn',
		},
	},

	// 继承 React 官方推荐规则（ESLint 9.x 扁平格式）
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],

	// React Hooks 官方规则
	{
		plugins: { 'react-hooks': pluginReactHooks },
		rules: pluginReactHooks.configs.recommended.rules,
	},

	// JSX 可访问性官方规则
	{
		plugins: { 'jsx-a11y': pluginJsxA11y },
		rules: pluginJsxA11y.configs.recommended.rules,
	},
	// 基础配置（所有文件）
	{
		files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
		ignores: ['node_modules/', 'dist/'],

		// 语言环境配置（ESLint 9.x 标准写法）
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tsParser,
			// 全局变量（替代旧版 env + globals）
			globals: {
				...globals.browser,
				...globals.node,
				// uni-app/小程序全局变量
				uni: 'readonly',
				wx: 'readonly',
				getCurrentPages: 'readonly',
				getApp: 'readonly',
				App: 'readonly',
				Page: 'readonly',
				Component: 'readonly',
				Behavior: 'readonly',
				plus: 'readonly',
				weex: 'readonly',
				__uniConfig: 'readonly',
			},
		},

		// 插件配置
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
			'jsx-a11y': pluginJsxA11y,
			'@typescript-eslint': tsPlugin,
			prettier,
		},

		// React 插件设置
		settings: {
			react: {
				version: 'detect',
			},
		},

		// 核心规则（移除所有不兼容配置）
		rules: {
			...eslintConfigPrettier.rules, // 关闭 ESLint 中与 Prettier 冲突的规则（如 max-len）
			'prettier/prettier': 'error', // 将 Prettier 问题作为 ESLint 错误报告
			// --------------------------
      // React 核心规则
      // --------------------------
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/prefer-stateless-function': 'off',
      'react/jsx-pascal-case': 'off',
      'react/no-unused-prop-types': 'warn',
      'react/no-unused-state': 'warn',
      'react/no-danger': 'off',
      'react/jsx-no-target-blank': 'off',

      // --------------------------
      // React Hooks 规则
      // --------------------------
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // --------------------------
      // JSX 可访问性规则
      // --------------------------
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // --------------------------
      // 关闭 React 格式化规则
      // --------------------------
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',
      'react/jsx-closing-bracket-location': 'off',
      'react/jsx-max-props-per-line': 'off',
      'react/jsx-first-prop-new-line': 'off',
      'react/jsx-tag-spacing': 'off',
      'react/jsx-wrap-multilines': 'off',

      // --------------------------
      // JS 核心规则
      // --------------------------
      'no-console': isProduction ? 'warn' : 'off',
      'no-debugger': isProduction ? 'warn' : 'off',
      'no-undef': 'warn',
      'no-empty': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // --------------------------
      // 关闭所有格式化规则（交给 Prettier）
      // --------------------------
      'semi': 'off',
      'quotes': 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'space-before-function-paren': 'off',
      'keyword-spacing': 'off',
      'space-infix-ops': 'off',
      'eol-last': 'off',
      'indent': 'off',
      'no-mixed-spaces-and-tabs': 'off',
    }
	},
];
```

**Flat Config 关键说明：**

* Flat Config 使用数组导出配置，替代传统的 `.eslintrc.js` 对象格式

* `eslintConfigPrettier` 用于禁用所有与 Prettier 冲突的 ESLint 规则

* 可以通过 `prettier/prettier` 规则的第二个参数直接自定义 Prettier 格式化选项

### Prettier 配置文件（`.prettierrc`）
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "endOfLine": "auto"
}
```
```json
{
	"printWidth": 120,
	"tabWidth": 2,
	"useTabs": true,
	"semi": true,
	"singleQuote": true,
	"quoteProps": "as-needed",
	"jsxSingleQuote": false,
	"trailingComma": "es5",
	"bracketSpacing": true,
	"jsxBracketSameLine": false,
	"arrowParens": "always",
	"rangeStart": 0,
	"rangeEnd": null,
	"requirePragma": false,
	"insertPragma": false,
	"proseWrap": "preserve",
	"htmlWhitespaceSensitivity": "ignore",
	"vueIndentScriptAndStyle": false,
	"endOfLine": "auto",
	"overrides": [
		{
			"files": "*.scss",
			"options": {
				"parser": "scss"
			}
		},
		{
			"files": "*.css",
			"options": {
				"parser": "css"
			}
		}
	]
}
```

### VS Code 自动修复配置（`.vscode/settings.json`）
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"   // 新版 VSCode 使用字符串类型
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "typescript", "vue"],
  "eslint.enable": true,
  "prettier.enable": true
}
```
:::warning
**新版 VSCode 变化**：`source.fixAll.eslint` 的值已由布尔值变为字符串， `explicit` 表示需要明确执行修复操作， `always` 表示无条件执行， `never` 表示禁用。[详情点击](https://blog.csdn.net/qq_58870434/article/details/147094448)
:::

###  分离式工作流配置（推荐方案）
:::warning
若不想使用 `eslint-plugin-prettier`（可能影响性能），可以采用分离式工作流，让两个工具完全独立运行
:::

```bash
# 只安装基础工具和冲突解决插件
npm install --save-dev eslint prettier eslint-config-prettier
```

```js
// .eslintrc.js（或 eslint.config.js）
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',  // 必须放在最后，仅关闭冲突规则，不启用 prettier 插件
  ],
  // 其他配置...
};
```

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```
[这样配置后，保存时 Prettier 先执行格式化，ESLint 紧接着执行修复，各司其职互不干扰。](https://www.cnblogs.com/jinzhepro/p/19312110#commentform)

