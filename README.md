# React/TypeScript/Webpack/ESM

This project shows how to build with:

* Node.js 14 (with ESM)
* Webpack 5 (with hot reload)
* TypeScript 4
* React 17

in the mid of 2021.

## Summary

* **No Babel** in this project.
* **No Jest support** until [this issue](https://github.com/facebook/jest/issues/11453) been solved.
* May install beta/rc stage packages due to ESM is still new comparing to CommonJS.
* Node.js 14 will print warning for some experimental features. I left it untouched so you will know what should be noticed in the future.
* Use `ts-node` to run webpack configuration in TypeScript.
* Use `ts-loader` to compile `.tsx` and `.ts` files.

# Step by Step

## Create initial package.json

We use yarn here because npm sucks.

```
yarn init -y
```

`-y` will use default values for `package.json` fields, instead of asking
questions.

## Install Webpack

First we need a bundler, i.e. Webpack. Webpack can process your sources and
bundle them to HTML/JavaScript/CSS files.
Webpack itself is just a library, so we also need a CLI tool to run it.

```
yarn add -D webpack webpack-cli
```

You can invoke webpack CLI by yarn:

```
yarn webpack
```

## Write Webpack configuration in TypeScript

Webpack configuration can be written in TypeScript. Let's start it with a simple
file.

```typescript
import webpack from 'webpack';


export default function factory () {
  const config: webpack.Configuration = {
  };
  return config;
};
```

Webpack accepts a configuration object as the default export, but it also
accepts a factory function which returns a configuration object.
We export a function here because it is more flexable.

## Load Webpack configuration

Webpack will detect file extension of the configuration file. If Node.js cannot
interpret it, Webpack will try to find a plugin to load the file.
There are several packages can do this, `@babel/register` and `ts-node` probably
are the most well known.
Since we are not going to use Babel here, we will go with `ts-node`.

### Install ts-node and tsc

`ts-node` is simply a wrapper application which let Node.js work with
TypeScript, so we still need `tsc` for transpilation.
To do this we need to install `ts-node` and `typescript` first.

```
yarn add -D ts-node typescript @types/nodes@14
```

`@types/nodes@14` is a peer dependency of `ts-node`, which is not required.
I just add it here to prevent warnings.
Specifing `14` because I'm targeting on Node.js 14.

### Create tsconfig.json

We need to create a `tsconfig.json` for `tsc`.
`ts-node`, `tsc` and even your editor need this file to understand how to
process your typescripts.
Let's just create a template first.

```
yarn tsc --init
```
