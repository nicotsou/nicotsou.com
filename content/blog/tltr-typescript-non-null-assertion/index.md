---
title: Dealing With Non-Null Assertions in TypeScript
date: '2022-11-19T22:12:00.000Z'
description: Let's master of the most controversial features Of TypeScript.
type: post
cover: './cover.jpg'
---

One of the most controversial features of TypeScript is definitely the Non-Null Assertion operator. It allows you to easily check for nullable values, without writing a lot of logic. In this article, we will learn how it works, where to use it, and how it compares to the Optional Chaining operator.

It’s much easier to use it than to pronounce it, I promise! Probably explaining it will require more time than actually learning it.

But let me give it a try.

Cake? 🎂

## How does it work?

In the following `Track` object, the `isFavorite` flag is _optional_:

```tsx
type Track = {
  title: string
  isFavorite?: boolean
}
```

Practically, this means that we can define a `track` object, without the `isFavorite` flag:

```tsx
const track: Track = {
  title: 'Bohemian Rhapsody',
}
```

To stress it a bit, let’s try to access these properties and assign them to separate variables:

```tsx
const title: string = track.title // works fine
const isFavorite: boolean = track.isFavorite // throws an error, isFavorite can be undefined
```

Oops, I can’t get the property `isFavorite` because it was never declared. And therefore, we can’t assign it to a `boolean` variable.

There are multiple ways to fix that, by adding some additional logic.

One way is to add a [type guard](https://nicotsou.com/tltr-typescript-narrowing/) which with a rollback to `false`, in case the value is `null`:

```tsx
const isFavorite: boolean = track.isFavorite || false
```

Another way is to _cast_ the value to a `boolean`:

```tsx
const isFavorite: boolean = Boolean(track.isFavorite)
```

But these are all old fashioned approaches. 😎

An even better way is to use the `Non-Null Assertion Operator`:

```tsx
const isFavorite: boolean = track.isFavorite!
```

Mind the `!` at the end of this expression.

If you are something like me, you pretty much want to understand what is actually happening in the background. Here, we are basically instructing TypeScript to fallback to the type that our property `isFavorite` originally had, in case its value will be `undefined`.

The choice for which approach is better, doesn’t need enough mental processing power.

In the last example, I didn’t have to specify any value or to add additional logic. It’s more compact compared to the other solutions above.

![Robot in the sand](images/robot.jpg)
_Photo Credit: [Daniel K Cheung](https://unsplash.com/photos/cPF2nlWcMY4)_

## Where should we use it?

Great power comes with great responsibility. The Non-Null Assertion operator - seriously, who named that feature like this - can cause you a lot of trouble if you don’t use it carefully. It may result in runtime errors. These kinds of errors are sneaky. They’re invisible while compiling the application.

Therefore, I strongly recommend you use it with caution. So, don’t start adding exclamation marks at the end of every command.

When you see this operator in your code reviews, always think if by using it we will have unnecessary errors. Sometimes we developers are kinda lazy and we want to get rid of errors, because we don’t really want to deal with them. That’s not cool though for others on your team. You should have no tolerance when it comes to code quality.

I don’t want to discourage you from using it though. There are some places it can be very useful, without taking any risks.

One great example is to use it in React components:

```tsx
const Favorite = ({ track }) => <div>{track.isFavorite!}</div>
```

Due to the fact that JSX will _always_ ignore null-ish values by design, it’s safe to produce a nullable value, without worrying that something wrong will happen at runtime. And it reads much better!

## How does it compare to Optional Chaining?

Now, someone who is a regular visitor to this blog, will start connecting the dots. How does this feature differ from [Optional Chaining](https://nicotsou.com/tltr-typescript-optional-chaining/)?

Well, first of this is a TypeScript-only feature. It’s logic is strictly limited in compilation time, in which TypeScript is comparing the compatibility of two types. You’re basically signing the terms and conditions, and TypeScript depends on your gut feeling.

Optional chaining, on the other side, is a JavaScript feature. And it’s much more of a safer approach.

Consider the same example:

```jsx
type Track = {
  length: string,
  number: number,
}

const albumTracks: Map<string, Track> = new Map([
  ['Bohemian Rhapsody', { number: 11, length: '2:33' }],
  ['Love Of My Life', { number: 9, length: '3:33' }],
])
```

If we use the Non-null assertion operator, TypeScript will not complain.

```tsx
const trackLength: string = albumTracks.get('Love Of My Life').length!
```

However, as I tried to explain above, the execution of the code will not stop, resulting in a runtime error when we’re running the application.

Bad robot! 🤖

Instead, we could use optional chaining to check for the existence of the length property:

```tsx
const trackLength: string = albumTracks.get('Love Of My Life')?.length
```

In this case, the execution of the code will stop right before we read the `length` property, resulting in an `undefined` value. The `trackLength` will get an undefined value, but it will not result in a `runtime` error.

Good robot! 🤖

The cover artwork of this post was created by [Lea L](https://unsplash.com/photos/oAJnyZkNEs8).
