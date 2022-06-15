---
title: Mapped Types of TypeScript
date: '2022-07-06T22:12:00.000Z'
description: Mapped types make possible to loop over your types, just like how you use foreach in normal JavaScript code.
cover: './cover.png'
---

In my previous articles I have presented a set of advanced TypeScript features that help you build logic for your types. I wrote about equivalent features that let you use functions, if statements, and arrays for your types. What else remains? Well, loops of course! And now you will be wondering, is there something equivalent in TypeScript to loop over types? 

Spoiler alert; Yes, there is!

## Writing our first mapped type

Check out the following example:

```tsx
type User = { [Key in 'username' | 'email']: string };
```

The previous code will produce the following type:

```tsx
type User = {
	username: string;
	email: string;
}
```

The `in` operator is used to loop through the list of types a union contains. In the example above we use a temporary `Key` type to loop over the union `'username' | 'email'`. On the left side of the expression is what we target. On the right side is the output. Since we used a `string`, all our types will be set to be `string`.

Yes, I know what you’re thinking. We just used a loop to create a type alias. Just because we can. One-liners ftw, right? Well, not exactly. This example may not look impressive or useful to you. It was meant to show you the syntax of a **mapped type**. Yes, that’s how we call those things.

## A more comprehensive example

Now, let me try one more time. Maybe this will impress you:

```tsx
type ReadonlyUser = { readonly [Key in keyof User]: User[Key] };
```

Let’s break down what is happening in this line of code:

- We have the `User` type from before, and what we want is to make all its properties *readonly*. We named our new type `ReadonlyUser`.
- Before we start implementing our mapped type, we use the `readonly` keyword. This will immediately set everything that follows to *readonly*.
- Then, we are looping through all the available properties of the type `User`. Remember, with the `keyof` keyword we get back a union with all the members of the given type. In our case, this will evaluate to `'username' | 'email'`.
- Our last step is to set the output value. We name our temporary type as `Key`. We will use a **lookup type** to get the corresponding `User` property.

Now let’s try to battle test our newly created type:

```tsx
const user: ReadonlyUser = {
  username: 'anonymous',
  email: 'myemailaddressis@private.hoho',
};
user.email = '';  // Cannot assign to 'email' because it is a read-only property
```

It seems that is working. We cannot re-assign the `email` property. All the members of the `user` object are now readonly. Our job here is done.

Now, let’s think about how we could generalize this functionality. A more practical solution would be to create a generic `Readonly<T>` type, which would work with *any* kind of object structure:

```tsx
type Readonly2<T> = { readonly [Key in keyof T]: T[Key] };
```

Here, we basically replace `User` with `<T>` and TypeScript will do its magic. Now we can refactor our `user` declaration:

```tsx
const user: Readonly2<User> = {
  username: 'anonymous',
  email: 'myemailaddressis@private.hoho',
};
```

You may be wondering if this number `2` at the end of the `Readonly2<T>` is a typo. Well, my friends... If you follow this blog, you should already know that `Readonly<T>` is a built-in utility type of TypeScript. That’s why we don’t even need to implement it. But now you know how to write it by yourself.

---

For those who find these concepts difficult, you can check out my previous posts. I have a series of articles about TypeScript. I write about my experience learning the language and I’m trying to explain my mental model using practical examples. If you are a visual person like me, you can also check out my 📺[YouTube series about TypeScript](https://youtube.com/playlist?list=PL73mkIDIrfyPKjkJ1V151lcgGEDHs3tgG).

Cover photo credit: [Pawel Czerwinski](https://unsplash.com/photos/hw6Dh3R7yxA)