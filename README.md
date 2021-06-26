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
