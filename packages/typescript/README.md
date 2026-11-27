# Incentro IC - Code Standards - Typescript

## 💫 Introduction

This package provides a set of shared [Typescript](https://www.typescriptlang.org/) configuration files that can be used across different projects.

- [🏠 Base](#-base) - `@incentro-ic/config-typescript/base`
- [🦁 App - NestJS](#-app---nestjs) - `@incentro-ic/config-typescript/app-nest`
- [🔼 App - Next.js](#-app---nextjs) - `@incentro-ic/config-typescript/app-next`
- [🔴 App - React Router](#-app---react-router) - `@incentro-ic/config-typescript/app-react-router`
- [📦 Package](#-package) - `@incentro-ic/config-typescript/package`
- [🌎 Package - Browser](#-package---browser) - `@incentro-ic/config-typescript/package-browser/`
- [🟩 Package - Node](#-package---node) - `@incentro-ic/config-typescript/package-node/`
- [⚛️ Package - React](#%EF%B8%8F-package---react) - `@incentro-ic/config-typescript/package-react`

## 💾 Installation

To install the package, use the following command:

```bash
pnpm add -D typescript @incentro-ic/config-typescript
```

## 🪛 Usage

After installing the package you can use the provided configuration as a basis by using [the `extends` keyword](https://www.typescriptlang.org/tsconfig#extends) in your `tsconfig.json`.

Here's an example:

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript"
}
```

> [!NOTE]
>
> The configuration files do not include any [`includes`](https://www.typescriptlang.org/tsconfig#include), [`files`](https://www.typescriptlang.org/tsconfig#files), [`exclude`](https://www.typescriptlang.org/tsconfig#exclude), [`compilerOptions.rootDir`](https://www.typescriptlang.org/tsconfig#rootDir) or [`compilerOptions.outDir`](https://www.typescriptlang.org/tsconfig#outDir) options. You will need to add these options according to your project's requirements. Since Typescript 6, `rootDir` defaults to the directory containing the `tsconfig.json`, so set it (for example to `src`) when Typescript emits files.
>
> Since Typescript 6, [`compilerOptions.types`](https://www.typescriptlang.org/tsconfig#types) defaults to an empty list, so `@types/*` packages are no longer included automatically. The NestJS, React Router and Node package configs set it for you. For the other configs, add the types you need, for example `"types": ["node"]`.

## ⚙️ Configs

### 🏠 Base

This is the base Typescript configuration that is applicable to all projects. The settings in this configuration are primarily related to the strictness of Typescript and should rarely be overridden as they do not affect the output or the compilation target.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript"
}
```

### 🦁 App - NestJS

This is the Typescript configuration for all NestJS projects. It extends [the base configuration](#-base) and adds settings that are related to working with NestJS projects, like accepting unused class properties which is a common pattern in NestJS projects.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript/app-nest"
}
```

### 🔼 App - Next.js

This is the Typescript configuration for all Next.js projects. It extends [the base configuration](#-base) and adds settings that are related to working with React and Next.js' Typescript plugin and type helpers.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript/app-next"
}
```

### 🔴 App - React Router

This is the Typescript configuration for all React Router projects. It extends [the base configuration](#-base) and adds settings that are related to working with React and React Router projects.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript/app-react-router"
}
```

### 📦 Package

This is the base Typescript configuration for all projects that are meant to be published as a package and do not specifically target the browser or a Node.js environment. It extends [the base configuration](#-base) and adds settings that are related to the output of the Typescript compiler.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript/package"
}
```

### 🌎 Package - Browser

This is the Typescript configuration for all projects that are meant to be published as package targeting browser environments. It extends [the package configuration](#-package) and adds settings that are specific to browser environments, like enabling types for methods only available in DOM environments. It targets the latest versions of most major browsers.

> [!IMPORTANT]
>
> This config [disables file emission by the Typescript compiler](https://www.typescriptlang.org/tsconfig/#noEmit) as it is expected that you'll be using a bundler to transform the source files for use in browser environments.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript/package-browser"
}
```

### 🟩 Package - Node

This is the Typescript configuration for all projects that are meant to be published as Node.js packages. It extends [the package configuration](#-package) and adds settings that are related to Node.js, specifically the LTS version.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript/package-node"
}
```

### ⚛️ Package - React

This is the Typescript configuration for all projects that are meant to be published as React packages. It extends [the browser package configuration](#-package---browser) and adds settings that are related to interpreting JSX.

> [!IMPORTANT]
>
> This config [disables file emission by the Typescript compiler](https://www.typescriptlang.org/tsconfig/#noEmit) as it is expected that you'll be using a bundler to transform the source files for use in browser environments.

#### 🪛 Usage

```json filename="tsconfig.json"
{
  "extends": "@incentro-ic/config-typescript/package-react"
}
```
