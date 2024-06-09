---
title: Master Modules In TypeScript
date: '2023-03-23T22:12:00.000Z'
description: Destructuring is one of these _aha_ moments you have as a software engineer.
type: post
cover: './cover.png'
---

Every application, even the tiniest one, will eventually need to break code apart into multiple files. I mean, who likes to read thousands of lines of code in a single file right?

Other languages use the term packages or assemblies. JavaScript uses _modules_.

The truth is, it took us many years to reach that point. JavaScript was developed back in the 90’s to give interactivity to plain websites. In the past days closures and self-calling functions have been used to introduce the idea of modularity. Then we had some abstractions such as RequireJS, AMD, and CommonJS, which was the default way Node.js was using for modular code. Since EcmaScript 2015 (ES6), we finally have the notion of a module.

TypeScript takes modules to the next level. Not only it supports the basic functionality that ES6 prescribes, but it allows you to write modular types as well.

> Modules is all about structuring your application in multiple files.

In this article, we will not only learn how modules work, but I will provide some really useful features and patterns to structure your code. And we will practice what we’ve learned, so make sure you’ve turned off your notifications for a while, to better focus on studying modules. At the end of the article, we will also compare ES Modules to CommonJs, which is still a popular way to structure code in Node.js applications.

Gelato? 🍨

## Named exports

You can export modules from any TypeScript/JavaScript file. Here are a couple of examples:

```tsx
// exports.ts
export function add() {};
export const API_KEY = 'ABC';
export class Person {
  string name;
}
```

This kind of export is called _named_, because you give it a name. So, your `export.ts` file exports a function `add()`, the constant `API_KEY`, and the `Person` class.

TypeScript also allows you to export types, such as type aliases, interfaces, enums, etc.:

```tsx
// exports.ts
export function add() {};
export const API_KEY = 'ABC';
export class Person {
  string name;
}
// highlight-start
export type Target: string;
// highlight-end
```

Here we are exporting the type alias `Target`, again as a named export.

This file has access to these instances, as long as you follow the basic [scope](https://www.w3schools.com/js/js_scope.asp) principles.

To import these elements into another file, here’s what you could do:

```tsx
// index.ts
import { API_KEY, Target } from './exports'
```

Here `index.ts` imports only the `API_KEY` and `Target` from `exports.ts`.

Useful notes:

1. We use [destructuring](/destructuring) to pick only the named exports that we want to use.
2. We specify the relative path of the file that we want to import.
3. For `ts` and `js` files no extension is required. Although, it will technically work, it’s common not to use it. For other types of files (such ass `css`, `svg`, `json`, etc.) the extension is mandatory. That’s the common behavior when you use a module bundler like [webpack](https://webpack.js.org) for example.

Practically, we can have as many `Target` types as we want in our project. As long as we are exporting them, they’re not going to cause any conflicts. Since we choose the file we want to import from, we are always sure that we’re not going to import something irrelevant.

By selectively importing _only_ the items we’re going to consume, we actively improve the performance of the application. Modern bundlers like [webpack](https://webpack.js.org/guides/tree-shaking/) will only include these parts of the code, and not the entire module file. This reduces the file size of the application bundle. And you know, the smaller the files you have to download, the faster the application will load.

## Default export

Every file has a _default_ export slot:

```tsx
export default function playlist() {}
```

Note, that we used the keyword `default`, to indicate that this is a _default_ export.

We use the same keyword for import:

```tsx
export default function myUtil() {}
```

That’s basically a reserved spot, which simplifies our export/import statements.

> Default exports works similar to the return keyword in a function.

If within a file you don’t want to export more than one elements, you can use the `default` keyword for simplicity.

Another use case is when you want to separate your primary logic from the helper functions:

```tsx
export interface MyComponentProps {
  name: string
}

function MyComponent({ name }: MyComponentProps): JSX.Element {
  return <div>{name}</div>
}

export default MyComponent
```

For example, when we’re implementing a React component similar to the one above, it’s common to use the default export for the component itself, having in mind that there’s going to be a single component per file. We normally export other elements (such as helper functions, types etc.) with named exports.

![A retro car](images/retro-car.jpg)
_The concept of modules is similar to how cars apart from multiple smaller components. Credit: [Daniel Salgado](https://unsplash.com/@danielsalgado)_

## Import statements for Pros

You can rename an import:

```tsx
// index.ts
import { API_KEY as apiKey } from './exports.ts'
```

The `API_KEY` variable becomes `apiKey` in this file. This may help you to avoid conflicts, when multiple modules are exporting something with the same name.

---

You can also use the `*` wildcard to import everything:

```tsx
// index.ts
import { * as exports } from './exports.ts'

const key = exports.API_KEY
```

Here we are importing everything that `exports.ts` has to offer and we give them the alias `exports`. This technique can be helpful when building index files. We will review the index files at the end of this article.

---

We can also import the complete files:

```tsx
// inside init.ts
console.log('initializing...')

// inside index.ts
import './init'
```

This will execute everything that’s inside the `init.ts` file, without importing any of its exports.

It may be useful when you want to import global styles, or to initialize something at the root of your application.

## Something to avoid

It’s common with ES Modules to destructure import statements by selecting what we want to import. As we’ve seen this not only improves readability, but it helps reduce the size of the application bundles, by improving the overall load times.

I’ve seen a lot of developers fall into the trap of exporting a single object at the end of the file, by destructuring them to a single object:

```tsx
function add() {};
const API_KEY = 'ABC';
class Person {
  string name;
}

// highlight-start
export {
	add,
	API_KEY,
	Person
}
// highlight-end
```

This will work similar to what we had before. It’s technically possible to import a specific element from that file:

```tsx
// index.ts
import { API_KEY } from './exports'
```

However, most bundlers may treat this as a single object, and this will result in importing the complete file rather than importing specific parts. It’s also against ECMAScript standards.

Two reasons to convince your team that such export statements should be avoided.

## Installing and using Packages

The fun with TypeScript begins when you’re starting to explore third-party packages. There is literally everything out there.

> “**Any application that can be written in JavaScript, will eventually be written in JavaScript”
> — Jeff Atwood’s Law**

You can install libraries by running the following command:

```bash
npm install react
```

This will add a new dependency in your `package.json` file:

```json
{
	...
  "dependencies": {
    "react": "^18.2.0"
  }
}
```

It will also create a `node_modules` folder inside the application folder with the contents of the package. Sometimes you will find the actual source code of the package. Other times you will find the package transpilled. That depends on how the developer decided to distribute it.

To use a library, simply import from your `node_modules` dependencies:

```tsx
import React from 'react'
```

No prefix is required, the name of the package is usually the one in your `package.json`.

You can mix and match named and default exports:

```tsx
import React, { Component } from 'react'
```

Creating packages is not the scope of this article. Ping me if you want me to write an article about them. ☺️

## Dynamic imports

As your app grows, more and more modules will be introduced. There’s a big drawback here. The more modules we use, the bigger the application bundle becomes, the more time the users have to wait for the app to load.

To speed-up loading times, it’s a common pattern to optimize an application based on routes. For example, if the user is viewing the settings screen, there’s no reason to load the dashboard screen, which may import tons of third-party libraries for displaying charts.

To do that we can utilize dynamic imports. The idea is simple. Somewhere in your app there is a logic, and when it evaluates to true, the import will happen:

```tsx
async function asyncImport() {
  const myModule = await import('./math')
  // additional code goes here
}
```

Now, our users will not have to download that `math.ts` module. Calling this function will trigger its download. The `import()` function returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

This is another interesting feature that I’m willing to discuss in another article. Until then you can check [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import).

## Modules and immutability

Somebody may think that if we import a variable from another file, it automatically makes it immutable, since this is a new file. I’m afraid that’s not the case in JavaScript.

> Module imports in JavaScript are _not_ immutable.

They can be reassigned to new values if desired. However, it is recommended to keep imports as **constant** variables in order to avoid accidental reassignments and ensure predictable behavior in the code.

Consider the following example:

```tsx
// module.ts
export let name = 'Nicos'

// index.ts
import { name } from './module'
// @ts-ignore
name = 'Oops'
console.log(name) // "Oops"
```

The example above demonstrates that it is technically possible to import a variable and alter it on the fly. Thankfully, TypeScript will not tolerate such bad practice. That’s why I used the `@ts-ignore` flag to disable type checks on this line.

Never, ever export anything else than a `const`. And never, ever try to alter the contents of a module. Well, unless you’re writing a unit test, and you’re planning to restore them.

## Path resolution & index files

So far, we are _not_ using the `.ts` extension to refer to our files. That’s because our compiler will automatically resolve `js` or `ts` files with the given name. If it happens to have both the files, TypeScript files will have a priority. Make sure you’re always checking the compiler configuration because sometimes you may not get the results you’re expecting.

A similar naming convention is the one used with the index files. It’s like a special name a file could have.

Consider the following folder structure:

```
.
├── utils
├───── index.ts
├── index.ts
```

The code in the outer `index.ts` file will be the following:

```tsx
import utils from './utils'
```

We basically _omit_ the index file when importing them. Instead, we just use their parent folder.

This becomes extremely useful when we want to convert a single module to multiple modules. We just convert the file to a folder and we introduce an `index.ts` into it.

A common pattern when we want to structure our code is to use index files to accumulate the different parts we want to export.

For example, let’s say that we have multiple utils:

```
.
├── utils
├───── deepMerge.ts
├───── index.ts
├───── map.ts
├── index.ts
```

To import them we will have to specify their full path, assuming they are using default exports:

```tsx
import deepMerge from './utils/deepMerge'
import map from './utils/map'
```

I assume you have seen the following pattern instead:

```tsx
import { deepMerge, map } from './utils'
```

That becomes possible, if we introduce an index file that exports the utils. Inside `utils/index.ts` we could have the following:

```tsx
export { default as deepMerge } from 'deepMerge'
export { default as map } from 'map'
```

The whole process became much easier. We only have to remember to update the index file every time we add/remove a module.

Just make sure you’re exporting your utils as defaults:

```tsx
// map.ts
export default function map() {}
```

This pattern is used a lot in TypeScript applications.

## Appendix: CommonJS

Before Modules became a standard in JavaScript, there where a lot of different patterns for implementing modules. The most popular one was the one that Node.js was based on. It’s called CommonJS, and it’s still widely used.

In this section, we will try to learn the basics of CommonJS. Besides the syntax, there are fundamental differences on how the two approaches resolve the modules. CommonJS imports are dynamically resolved at runtime, whereas in ES Modules imports are static.

### Export

CommonJS:

```tsx
function myUtil() {...}

module.exports = myUtil
```

ES6:

```tsx
export default function myUtil() {...}
```

### Importing

The legacy CommonJS way:

```tsx
const package = require('myUtil')
```

Compared to ES6:

```tsx
import package from 'myUtil'
```

You will notice that TypeScript by default outputs your modules using CommonJS:

```tsx
{
  "compilerOptions": {
		...
    "module": "commonjs",
  }
}
```

Which may give you an idea on how popular they are in the Node.js ecosystem. That’s only to maximize compatibility, though. No developers are using CommonJS these days to write code. ES Modules will slowly become the one and only standard for JavaScript applications.

## Let's practice what we've learned! 🧑🏿‍💻👩‍💻

I have prepared for you a small lab in which you will create a small TypeScript project from scratch and you will experiment with modules in TypeScript. It doesn't require you to know any framework, since we're not really going to implement something complex. However, you will have a solid understanding on how modules work after going through it.

To access the lab, [enroll to my TLTR; TypeScript course for free](https://tltr-typescript.com).

That's all forlks! I'll be happy to hear your feedback about the article, as well as the course itself.

Many thanks to [Shubham Dhage](https://unsplash.com/photos/mjl0yIdSi18) for his amazing cover art.
