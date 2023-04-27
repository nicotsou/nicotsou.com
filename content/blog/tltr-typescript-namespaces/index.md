---
title: Master Namespaces In TypeScript
date: '2023-04-27T22:12:00.000Z'
description: Learn how to use namespaces and how they help on creating type definition files.
type: post
cover: './cover.jpg'
---

I have to admit something. I hate namespaces in TypeScript. I hate them so much that I wrote this article to explain why you shouldn’t use them.

Cookie? 🍪

## What’s a namespace? 🙋‍♀️

In TypeScript, a namespace is a way to organize your code and prevent naming collisions.

In the early versions of the TypeScript language, its developers had to find a way to modularize code. That’s why they introduced Modules. But those modules back then were completely different from the actual ES Modules we all love.

Yes, there was a naming collision in the name of the feature that promised to solve naming collisions.

So TypeScript developers had to re-brand the whole thing. That’s how namespaces were invented.

The concept is very similar to how modules work in TypeScript. However, it has some significant differences that make it difficult to use on a daily basis. Therefore, namespaces are only used to define types for existing JavaScript code.

> And that’s the deal with namespaces; they help you create type definitions.

So unless you’re authoring your own custom `.d.ts` type definition for a library that’s not written in TypeScript, or you’re one of the proud contributors of the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) packages, you should not use namespaces.

I repeat. You should _not_ use namespaces to structure your code.

Assuming that you’re working on a modern TypeScript project, and you’re using ES Modules for structuring your code, that already solves your problems in a [declarative](https://www.notion.so/Don-t-Use-Namespaces-in-Typescript-c463fe77705b4fcda71a83cbd0b40600) way. A namespace on the other hand is imperative and much more difficult to deal with.

But I know why you’re still reading this article. You want to know everything about namespaces. Let me present to you how namespaces work and why they _may_ be useful.

![](images/watercolor-1.jpg)

## How to use a namespace? 🧑🏿‍💻

Consider the following types:

```tsx
enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
}

class Error {
  message?: string
  stack?: string
}

interface User {
  name: string
}
```

They may be used in your application to describe status codes, errors, and users accordingly.

The code above will declare these types into the Global Scope, which means that the types will be accessible from any other TypeScript file in your project, without having to import them.

Normally, we have the tendency to export those types:

```tsx
export interface User {
  name: string
}
```

And then import them into other files:

```tsx
import { User } from './types'
```

Namespaces wrap everything inside an object.

The idea is simple. You just use the keyword `namespace`:

```tsx
namespace MyApp {
  export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
  }

  export class Error {
    message?: string
    stack?: string
  }

  export interface User {
    name: string
  }
}
```

Now, everything lives under the `MyApp` namespace. All the types are now invisible from the outer scope.

Mind the `export` keyword. Only what’s exported is accessible to the outer worlds.

To access those files, we can simply use their namespace:

```tsx
MyApp.Error
```

In the same file, I can use the same namespace `MyApp` to include additional types. But not only types, I can put any valid JavaScript code as well:

```tsx
namespace MyApp {
  export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
  }

  export class Error {
    message?: string;
    stack?: string;
  }

  export interface User {
    name: string;
  }
}

**namespace MyApp {
  export const API_KEY = 'youwillneverknow';
}**
```

TypeScript will _merge_ these two blocks of code into a single one, resulting in a namespace that includes the 3 types we declared above, plus the `API_KEY` variable.

That basically allows you to use the `namespace` keyword in _any_ file to include additional items to an existing namespace. Pretty cool right?

Right? 😛

Mind the `export` here too. Again, if you want to expose something you’ll need to export it.

Similar to how we access types, to access our variable, we’ll have to use its namespace as a prefix:

```tsx
console.log(API_KEY) // ❌ Cannot find name 'API_KEY'
console.log(MyApp.API_KEY) // ✅ 'youwillneverknow'
```

Here’s another example on how we use the `User` type:

```tsx
const user: MyApp.User = {
  name: 'Nicos',
}
```

Yes. That’s how your favorite library’s type definitions are being built. They use namespaces.

## Compiler magic 🔮

Try this at home: Compile the previous code to JavaScript. You will realize something really interesting. Namespaces are available at runtime.

Wait, that requires a fancy quote.

> Namespaces are simply named JavaScript objects in the global namespace.

Let me try to decode that for you. Here’s the result after compiling our namespace:

```jsx
'use strict'

// Declaring a global variable for our namespace
// -- Oh boy, that looks so 90's!
var MyApp

  // This pattern is called Immediately Invoked Function Expressions
  // -- Again, so 90's!
;(function (MyApp) {
  // declaring our enum HttpStatusCode
  let HttpStatusCode
  ;(function (HttpStatusCode) {
    HttpStatusCode[(HttpStatusCode['OK'] = 200)] = 'OK'
    HttpStatusCode[(HttpStatusCode['BAD_REQUEST'] = 400)] = 'BAD_REQUEST'
  })((HttpStatusCode = MyApp.HttpStatusCode || (MyApp.HttpStatusCode = {})))

  // Declaring our Error class
  class Error {}
  MyApp.Error = Error

  // The pattern continues:
  //   If MyApp is declared, use it
  //   else, instantiate it as an object
})(MyApp || (MyApp = {}))

// Again, the same pattern adds our API_KEY
;(function (MyApp) {
  MyApp.API_KEY = 'youwillneverknow'
})(MyApp || (MyApp = {}))

// Types have been removed.
// They are not valid JavaScript.
const user = {
  name: 'Nicos',
}

// Our namespace is actually... an object!
console.log(MyApp.API_KEY)
```

This proves that a namespace is not an abstract TypeScript-only type, but an actual object that lives at runtime.

## Working with multi-file namespaces 🗂️

So far we’ve been working on a single file. What if I wanted to access my namespaces across multiple files? This will uncover the bad parts of namespaces.

Don’t say I didn’t warn you.

Consider the following code:

```tsx
namespace MyService {
  export const API_KEY = 'youwillneverknow'

  export enum HttpStatusCodes {
    OK = 200,
    BAD_REQUEST = 400,
  }

  export type ErrorResponse =
    | string
    | {
        message?: string
        errorCode?: string
      }

  export interface User {
    name: string
    email: string
  }

  export const fetchUser = async () => {
    return await fetch('users/me')
  }
}

const user: MyService.User = {
  name: 'Nicos',
}

console.log(MyService.API_KEY)
```

Let’s break our app into the following files:

```tsx
.
├── MyService
├───── ErrorResponse.ts
├───── HttpStatusCodes.ts
├───── index.ts
├───── User.ts
├── main.ts
```

The intention is that each file will extend our namespace with some extra logic. This will hypothetically help us long term as we keep adding more code.

The folder `MyService` will group all the contents of the namespace together.

Inside `MyService/ErrorResponses.ts`:

```tsx
namespace MyService {
  export type ErrorResponse =
    | string
    | {
        message?: string
        errorCode?: string
      }
}
```

Inside `MyService/HttpStatusCodes.ts`:

```tsx
namespace MyService {
  export enum HttpStatusCodes {
    OK = 200,
    BAD_REQUEST = 400,
  }
}
```

Inside `MyService/index.ts`:

```tsx
namespace MyService {
  export const API_KEY = 'youwillneverknow'
}
```

Inside `MyService/User.ts`:

```tsx
namespace MyService {
  export interface User {
    name: string
  }

  export const fetchUser = async () => {
    return await fetch('users/me')
  }
}
```

Inside `main.ts`:

```tsx
const user: MyService.User = {
  name: 'Nicos',
}

console.log(MyService.API_KEY)
```

Inside `Error.ts`:

```tsx
namespace MyService {
  export class Error {
    message?: string
    stack?: string
  }
}
```

Inside `user.ts`:

```tsx
namespace MyService {
	export interface User {
    name: string;
  }

	export async fetchUser() {
		const response = await fetch('users/me');
		return response;
  }
}
```

And finally, our `main.ts` file:

```tsx
const user: User.User = {
  name: 'Nicos',
}

console.log(MyService.API_KEY)
```

The code above will declare a `MyService` namespace globally and each file will modify it by adding additional items. The result will be that our `index.ts` file will have access to our namespace `MyService`, without importing it in any way.

Now, you may think that’s much easier compared to manually exporting and importing items. And maybe it is if you have a single namespace as in our example above. However, the situation becomes unmanageable as we add more logic to our codebase.

Normally codebases for libraries have relatively small codebases. Applications on the other hand have a lot of different views and objects that would be extremely impractical to keep them on the global scope.

![](images/watercolor-2.jpg)

To simulate how a real application works, let’s do some compiler adjustments.

We want to have a single `index.ts` file as a starting point. We also want to configure an output folder. Let’s modify our `tsconfig.json` file to configure our compiler accordingly:

```tsx
{
	**"include": ["./index.ts"],** 	/* We will use this file as a root */
	"compilerOptions": {
		...
		**"outDir": "./dist"** /* The compiler will output the files here */
	}
}
```

Since TypeScript doesn’t compile all the files in your project anymore, it has no clue where to find the `MyApp` namespace. Therefore, our code will not compile anymore.

And the million-dollar question is how to tell TypeScript where to find that bloody `MyService` namespace?

Sure, we could eventually export it and import it, but this will not work. So what do we do? How do we connect those namespaces? Well, there is a way. Not the one you would expect to use on a modern project, but it does the job.

In `main.ts` we’ll have to add the following comment:

```tsx
/// <reference path="MyService/index.ts" />

const user: MyService.User = {
  name: 'Nicos',
}

console.log(MyService.API_KEY)
```

This is not just a comment for TypeScript, since it starts with a triple slash. It’s called **[triple-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html)**.

And yes, it’s XML syntax.

This basically tells TypeScript which namespace we want to _extend_. Kinda like an `import` statement.

The code above will import the MyService index file. But we haven’t done yet. We need to edit that file to help TypeScript connect the dots and include all the other files:

```tsx
/// <reference path="User.ts" />
/// <reference path="HttpStatusCodes.ts" />
/// <reference path="ErrorResponse.ts" />

namespace MyService {
  export const API_KEY = 'youwillneverknow'
}
```

Here, we had to reference all the other namespace files.

I know what you’re thinking. This doesn’t look like JavaScript. It kinda reminds C#. Not a coincidence if you consider that the creator of TypeScript was Anders Hejlsberg, the creator of C#.

And that’s one of the reasons TypeScript developers are trying to move away from namespaces and use modules instead.

They’re just ugly.

## Nested namespaces 🪆

Now that you realized that you spend some minutes of your life reading an article that it’s useless to you, I have one more last thing to share about namespaces.

They can be nested. Hooray! 🥳

Well, to be fair. It’s just plain JavaScript objects at the end. You can build them the way you want.

Here’s a demo of a nested namespace:

```tsx
namespace MyApp {
  export namespace MyService {
    export const API_KEY = 'youwillneverknow'
  }
}
```

Mind the `export` keyword before the `MyService` namespace. Remember what we said before? Only what’s exported is visible to the outer worlds.

And here’s how we can access that `API_KEY` variable:

```tsx
MyApp.MyService.API_KEY
```

## Ambient Namespaces 👻

Sometimes you want to refer to a specific variable that exists in the outer scope of your application. Something you can’t control from within your codebase.

Many old-school JavaScript developers understand what I’m talking about. For the others, consider the example of the `window` object. It’s not in our app, it’s in the browser itself. But how can I tell TypeScript to understand its API? How can I add type definitions for something outside of my application?

Yes, I shouldn’t have spoiled this.

> An ambient namespace is like an abstract class. It defines what’s inside, minus the implementation.

To create an ambient namespace, you have to rename your file from `.ts` to `.d.ts`. D here stands for type _declaration_.

From there, you can use the `declare` keyword:

```tsx
declare namespace window {
  interface Console {
    log(...data: any[]): void
  }
}
```

This enables developers to write their own type definition files, which can be extremely useful for codebases that aren’t written in TypeScript, such as older JavaScript libraries like [jQuery](https://github.com/jquery/jquery) and [moment.js](https://github.com/moment/moment).

That’s exactly how the popular repo [**DefinitelyTyped**](https://github.com/DefinitelyTyped/DefinitelyTyped) is written. For those who aren’t familiar, this is a repository for high-quality TypeScript type definitions.

You may have used one of these definitions already in your project if you have installed an npm package that has the prefix `@types/`:

```tsx
npm install --save-dev @types/jquery
```

## Namespaces vs modules 🤺

It’s useful to compare namespaces to modules, to understand where they differ and where they’re alike.

They both:

- Help you to organize your code into separate files.
- Avoid conflicts in the global scope, since they both execute in their local scope.

Modules are:

- Declarative and easy to reason about.
- More suitable for modern applications.
- ECMAScript standard, which means it’s actually a JavaScript feature.
- More flexible to build a reusable api.

Namespaces are:

- Hard to work with and reason about.
- Suitable for creating type definitions.
- Typing existing JavaScript applications that aren’t migrated to TypeScript.
- Unlike modules, they can span multiple files and can be concatenated using `[outFile](https://www.typescriptlang.org/tsconfig#outFile)`.
- Namespaces support ambient declarations, that can help you define types outside the scope of your application.

## TypeScript 5.0 is moving away from namespaces 🗞️

TypeScript 5.0 has undergone a major infrastructure change where the entire codebase has been restructured to use ECMAScript modules, instead of namespaces, which had limitations and made it difficult for other tools to support TypeScript

As a result, TypeScript 5.0 will run faster and take up less space, with build times being cut down by 10-25%. This change is mainly aimed at contributors of TypeScript, but general users and API consumers may also benefit from the reduced package size and faster build times.

If you want to learn more about this migration, [this blog post](https://devblogs.microsoft.com/typescript/typescripts-migration-to-modules/) describes the runtime performance impact of namespaces and how bundlers emulate scopes. It explains how the use of namespaces can create unnecessary boilerplate code and indirection, leading to a decrease in performance due to the runtime cost of invoking methods off of an object.

## Summary

Namespaces are used _only_ for creating type definitions for existing JavaScript applications, that can’t be refactored to TypeScript. They help you control the pollution of the global scope, and to reduce naming collisions. They also embrace reusability.

Namespaces could help you structure your code in a Web Application, with all dependencies included as `<script>` tags in your HTML page.

Modules are a much more modern approach for apps written in TypeScript. They solve all the problems mentioned in the previous paragraph but in a declarative way.

Many thanks to [Niklas Liniger](https://unsplash.com/photos/eyGyeByOjig) for the amazing cover art.
