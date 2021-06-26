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

### Extend from ts-node preset

`ts-node` already provides some predefined options, we can simply extends from
it.

```json
{
  "extends": "ts-node/node14/tsconfig.json",
  "compilerOptions": {
  }
}
```

### Support Node.js modules

By default TypeScript use it's own module resolution system, we need to change
it to support Node.js.

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

### Add DOM library support

TypeScript also provides DOM library type information, it would be helpful to
turn it on.

```json
{
  "compilerOptions": {
    "lib": ["dom"]
  }
}
```

### Enable ESM

To Enable ESM, these are essential.

#### Declare this package is in ESM mode

Add a field in `package.json` to declare this is an ESM package.

```json
{
  "type": "module"
}
```

#### Configure TypeScript to use ESM

TypeScript needs to know it should resolve/generate code in ESM instead of
CommonJS. So we need to change some fields in `tsconfig.json`.

```json
{
  "compilerOptions": {
    "target": "ESNEXT",
    "module": "ESNext"
  }
}
```

### Add build command

Now we are ready to load the webpack configuration with this command.

```
NODE_OPTIONS='--loader=ts-node/esm' yarn webpack --node-env=production
```

`--node-env=production` is an option for Webpack itself, which will set
`NODE_ENV` to `production` (which is used in many libraries), and set `mode` to
`production` (which will used by any webpack plugins).

`NODE_OPTIONS='--loader=ts-node/esm'` is a temporary solution for `ts-node` to
setup some experimental features for Node.js. We probably won't need this in the
future, but for now it is required.
This option will also cause Node.js prints some warnings, all about experimental
features are turned on. In the future we probably won't see those again.

It would be handy to have a simpler shortcut to run the above command, so add a
build script to `package.json` like this.

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--loader=ts-node/esm' webpack --node-env=production"
  }
}
```

Note that we **DO NOT** need to call `yarn` in the script. `yarn` will find the
internal executable by itself.

## Install React and ReactDOM

We need `react` for virtual DOM, and `react-dom` for browser environment.

```
yarn add react react-dom
```

Note we actually need these packages in runtime, so they are `dependencies`
instead of `devDependencies`.

It is also a great idea to have type informations.

```
yarn add -D @types/react @types/react-dom
```

## Make TypeScript recognize JSX syntax

`tsc` also supports JSX syntax, we just need to enable it in `tsconfig.json`.

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

## Start from an example code

Now we are ready to compile TypeScript code. We will deal with HTML/CSS later
soon.

`src/index.tsx`
```tsx
import React from 'react';
import ReactDOM from 'react-dom';


function Application () {
  return <h1>Hello, world!</h1>;
}


ReactDOM.render(<Application />, document.querySelector('.body'));
```

This is really simple, we defined a component `Application`, and render to an
element which has class `body`.
Note that it is not recommended to render a component as a immediate child to
`document.body`.

## Add ts-loader to Webpack for source code

Now we need to add `ts-loader` to let Webpack to understand how to transpile
TypeScript to JavaScript.

Do not confuse this with `ts-node`.
`ts-node` is used to allow Webpack read **configuration files**
(i.e. `webpack.config.*`) which written in TypeScript.
Where `ts-loader` is used to allow Webpack to process **source files** which
written in TypeScript.

So the pipeline is more or less like this.

1. `node` uses `ts-node` loader to gain TypeScript compatibility.
2. `node` executes `webpack-cli` which uses `webpack` API.
3. `webpack` reads `webpack.config.ts` (thanks to `ts-node`).
4. `webpack` uses `ts-loader` to process `*.ts` to `*.js`.

### Install ts-loader

```
yarn add -D ts-loader
```
