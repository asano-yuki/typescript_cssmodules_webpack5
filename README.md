# 目的
SCSS + CSSModulesの開発環境をWebpack5で構築。また、TypeScriptでCSSModulesの型を定義する。
# ポイント
## webpack.config.js
`modules: true`でCSSModulesを有効化。<br/>
`importLoaders`の値は`css-loader`の後に読み込ませるloaderに応じて変更する。<br/>
- 0 => no loaders (default)
- 1 => postcss-loader
- 2 => postcss-loader, sass-loader
```
{
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 2
  }
}
```
## style.d.ts
Webpackによるビルドエラーを解消するためにCSSModulesの型を宣言する
```
interface IClassNames {
  [className: string]: string
}

declare module '*.css' {
  const classNames: IClassNames
  export = classNames
}

declare module '*.scss' {
  const classNames: IClassNames
  export = classNames
}
```