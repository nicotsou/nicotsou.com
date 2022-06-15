---
title: 4 Advanced TypeScript Features to Create Types Dynamically
date: '2022-06-22T22:12:00.000Z'
description: Let me show you 4 advanced TypeScript features that will help you create types automatically, so that you don't have to manually do that.
cover: './cover.png'
---

In this article, I’m going to list some advanced tooling TypeScript provides to customize our type annotations. It was a great surprise for me when I discovered these features. It changed my mind about TypeScript itself. On a positive way, of course.

For those who find these concepts difficult, you can check out my previous posts. I have a series of articles about TypeScript. I write about my experience learning the language and I’m trying to explain my mental model using practical examples. If you are a visual person like me, you can also check out my 📺[YouTube series about TypeScript](https://youtube.com/playlist?list=PL73mkIDIrfyPKjkJ1V151lcgGEDHs3tgG).

## The secret power of the typeof keyword

You already know the `typeof` keyword. It’s a way to check the types of your JavaScript values or variables:

```tsx
typeof 'Hello' // returns 'string'
typeof 123 // returns 'number'
```

But did you know that you can use it to dynamically generate types from inferred ones?

TypeScript has enhanced the `typeof` keyword with more features. It’s like `typeof` on steroids. It doesn’t only understand JavaScript-related types, but it has full support for TypeScript types, as well. Of course, these features will _only_ work at compile-time and not at runtime.

Let’s say that we have the following `artist` object:

```tsx
const artist = {
	id: 'someAlphanumericStringYouDontEvenCareAbout',
	name: 'Queen';
	followed: true
	plays: 111,
	type: 'band'
}
```

Fun fact; I just realized that it took me 11 articles to come up with another example. So far, I've been using the type `Track` in my previous articles, but we’ve never been involved with an `artist` object structure. You are now probably thinking about creating a new type definition for artists. What if I told you that TypeScript can do that for you?

In the following example we are using **type inference** to automatically create a type `Artist`, from the `artist` object:

```tsx
type Artist = typeof artist
```

Yes, this implies that we have an artist type alias in place, without having to define it manually.

Of course, like any other type alias, we can use it to annotate other objects:

```tsx
const getMeThoseArtists = (): Array<Artist> => {}
```

Pretty cool, right? It’s ideal, when you have to deal with objects that change over time, and yet you _still_ want to protect them with types.

![donuts.png](images/donuts.png)

## They keyof keyword

TypeScript provides another similar keyword called `keyof`. You can use it with any type to get its properties. It returns a union with literal values.

Here are some examples:

```tsx
type ArtistKey = keyof Artist // "type" | "id" | "name" | "followed" | "plays"
type StringKey = keyof string // all members of the string object like: "toString" | "charAt" | "charCodeAt" | etc...
type UndefinedKey = keyof undefined // never
```

You can use the `keyof` keyword in multiple places, and especially within generic types to fine-tune your types and reduce the clutter.

## Lookup types

It’s nice to retrieve the full property list of an object using the `keyof` keyword, but sometimes you want to get the type of a specific property in that list. That’s what lookup types are all about.

For example, what is the type of the `id` property of an `Artist`? Is it a `string`? Is it a `number`? Of course we can open the related interface and check it by ourselves, and then hardcode its type in our code. But what if that property changes? Remember, we don’t have an interface for the `Artist` object. We inferred the whole thing.

Well, you know where this is going:

```tsx
type ArtistId = Artist['id'] // string
```

Yup! It’s a `string`. At least in this iteration.

## The infer keyword

[Conditional types](https://nicotsou.com/tltr-typescript-conditional-types/) can help you can be used together with generics to elevate your types and create utility types that you can reuse in multiple places. This reduces boilerplate and enables a lot of functionality. In case you are wondering what a conditional type is, I have dedicated [another article](https://nicotsou.com/tltr-typescript-conditional-types/) on this topic.

As a refresher, here’s an example of a conditional type:

```tsx
type NonNullable<T> = T extends null | undefined ? never : T
```

The type `NonNullable<T>` accepts a type `T` and it checks if it extends `null` or `undefined`. Then, if this is true, it excludes those types by returning `never`. Otherwise, it returns the same type `T`.

Now, we can use this type to ensure we won’t have any surprises:

```tsx
type NullableString = string | null
type SafeString = NonNullable<NullableString>
```

In the example above, the `NullableString` can get `string` or `null`. Our `SafeString` can only accept `string`. This is actually a built-in utility type.

---

Now, here’s an example of how you can use the `infer` keyword to infer from types we compare against the true branch:

```tsx
type Flatten<T> = T extends Array<infer R> ? R : T
```

Here, we use `infer` to create a reference to the type of the array, and we name that reference `R`. This acts as a variable, similar to how we use `T`. If our type is an `Array` of `R`, we return that `R`. Otherwise we return the original type `T`.

Practically, this is a utility type that flattens array types, and here’s how we can use it:

```tsx
type ArrayType = Flatten<Receipt[]> // Returns the type Receipt
```

In case I don’t pass any array, it returns the same type:

```tsx
type ArrayType = Flatten<Receipt> // Returns the type Receipt
```

Of course, we can pass a list of types in a union:

```tsx
type ArrayType = Flatten<Receipt[] | Movie[]> // Receipt | Movie
```

By using the `infer` keyword, you are creating a new generic type `R`, which then can be returned as a type value. So basically, you are catching the type of the generic `Array<T>`. This can become really useful, when you are developing your APIs.

A cool example is the following utility type `PromiseReturnType<T>`:

```tsx
type PromiseReturnType<T> = T extends Promise<infer R> ? R : T
```

You can use it to unpack the type of your promise.

## Conclusion

As you can see, the world of TypeScript hides a lot of gems. It takes quite a lot of time and effort to understand all these things and integrate them into your daily developments.

But don’t be scared!

These are rarely used features. It’s nice to have an understanding, because it helps you understand from what the language is made of. And frankly, there are endless type definitions out there that leverage those features.

If you are developing a shared library, and you want to provide a robust api, then you should spend more time playing with these features. If you are an application developer, who consumes already defined type definitions, then it’s not really a must to memorize all these keywords. Keep them as a reference for later, though. You never know when you’re gonna be needing them.

Photo Credit: [Ayush Bharshankar](https://unsplash.com/photos/S2XSvVyUxpo)
