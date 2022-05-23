---
title: Master Conditional Types in TypeScript
date: '2022-05-23T22:12:00.000Z'
description: It's time to learn how to write conditional types in TypeScript, once and forever.
cover: './cover.png'
---

Generics can help you create something that acts like “functions”, but with types. What if I told you that you can use a ternary operator in our type aliases, to write advanced conditional types?

Do I have your attention? Great! Here we go…

TypeScript supports **conditional types**, and this enables endless possibilities. In fact, this is a unique feature that no other programming language supports.

> **Conditional types** allow you to add logic to your types. As a result, you can reuse existing types, by reducing the boilerplate of having multiple types for every use case.
> 

You can add conditionals to your types to create powerful utility types, similar to the ones I presented in a previous article. 

In the following sections we will review the `extends` keyword. It’s useful to understand how it works, since it plays a big role in conditional types. We will then write our first conditional type, and I will explain how it works. At the end of the article, we will review a more comprehensive example, to understand how we can use conditional types in our projects.

To fully understand the following paragraphs, I strongly recommend reading my previous article on the structural type system of TypeScript.

Cupcake? 🧁

## The extends keyword

If you deal with generic types in your code, you may come across the `extends` keyword. This is basically similar to the `implements` keyword we were using to implement interfaces, but instead of setting a contract, that you have to implement within your class, `extends` keyword is basically a **type constrain**. It specifically instructs TypeScript to *only* allow a limited set of types.

Here’s a simplified example that illustrates how we use it:

```tsx
interface WithId {
  id: string;
}

class Playlist<T extends WithId> {
  items: T[] = [];

  removeFromPlaylist(idToRemove: string) {
    this.items = this.items.filter((item) => {
      item.id !== idToRemove;  // Here we use the id
    });
  }
}
```

The class Playlist`<T extends WithId>` is a [generic class](https://nicotsou.com/tltr-typescript-generics/) with a **generic constraint** on the interface `WithId`. Not all types are acceptable here. It accepts a type `T` that *extends* the `WithId<T>` interface. Practically, this means that type `T` must contain all the members of the `WithId` interface.

Why do we need that? Because within our `removeFromPlaylist()` method we are consuming the `id` property of an `item`. If we don’t put this constraint `T extends WithId`, TypeScript will complain because otherwise `T` can be *any* object structure. It may or may not contain an `id` property. Of course we can use a [type guard](https://nicotsou.com/tltr-typescript-narrowing/) to check if the id exists in our object by limiting the accepted types using the `extends` keyword, we make the whole implementation cleaner and less sensitive to errors.

## Conditional types

Here’s how to write a conditional type:

```tsx
SomeType extends OtherType ? TrueType : FalseType
```

The syntax is simple, but it may become difficult once you start adding more rules to it. It works like a ternary operator:

```tsx
someCondition ? 'truthy' : 'falsy'
```

To understand how a conditional type works, consider the following type:

```tsx
type FileTypes = 'mp3' | 'mp4' | 'pdf' | 'zip' | 'png' | 'gif';
```

We can use a conditional type to extract a list of playable formats, which in our case are `mp3` and `mp4` files:

```tsx
type FilterMediaFileTypes<T> = T extends 'mp3' | 'mp4' ? T : never;
```

Now we can use this filter utility type with `FileTypes`:

```tsx
type MediaFileTypes = FilterMediaFileTypes<FileTypes>; 
const mediaFile: MediaFileTypes = 'zip';  // Error: Type "zip" is not assignable to type "mp3" | "mp4".
```

If you hover over the `MediaFileTypes` type, you will see that the available types we can assign to it are `mp3` and `mp4`. That’s why TypeScript will throw an error if we try to assign `zip` in the `mediaFile` variable. 

Interesting, right? But how? 😳

![ball](images/ball.png)

## How do conditional types work?

The `FilterMediaFileTypes<T>` type returns a conditional type. It receives a type `T`, and it checks whether it extends the union `'mp3' | 'mp4'`. In case this is true, it returns the type `T`. Otherwise it returns `never`. Since it is a generic type, it will work with any kind of type, not just `FileTypes`.

The magic happens when we actually use this filter, to produce the `MediaFileTypes` type. Let me break down what *exactly* is happening:

As a first step, TypeScript will recursively apply the filter to all the members of FileTypes:

```tsx
type MediaFileTypes =
  | FilterMediaFileTypes<'mp3'>
  | FilterMediaFileTypes<'mp4'>
  | FilterMediaFileTypes<'pdf'>
  | FilterMediaFileTypes<'zip'>
  | FilterMediaFileTypes<'png'>
  | FilterMediaFileTypes<'gif'>;
```

Right after that, it will evaluate these conditional types:

```tsx
type MediaFileTypes = 'mp3' | 'mp4' | never | never | never | never;
```

As we’ve seen, the `never` type is not meant to be assigned anywhere. That’s why TypeScript will remove it completely:

```tsx
type MediaFileTypes = 'mp3' | 'mp4';
```

And that’s how TypeScript evaluated our condition. The last step is to use this type in our `mediaFile`:

```tsx
const mediaFile: 'mp3' | 'mp4' = 'zip';
```

Magic! 🪄

![Spotify](images/spotify.png)
_By the way, if you are looking for music to fill the void while programming, you can [check my playlists](https://nicotsou.com/music-for-creative-minds/)._

## Using conditional types with object structures

In a real music player app, we have to deal with various file types. We want to deal with playable media files, for example a `play()` function. There are also places when we only want to deal with cover art files, like the part which displays the currently playing track at the bottom of the screen, or the thumbnails within the browser screen. We also want to deal with downloadable files, for example a receipt or a zip file with all user data (GDPR).

We keep the list with all the file extensions:

```tsx
type FileTypes = 'mp3' | 'mp4' | 'pdf' | 'zip' | 'png' | 'gif';
```

We can introduce multiple types to support all the kinds of object structures we have to deal with:

```tsx
type Song = {
  filename: string;
  type: 'mp3';
  play: () => void;
};
type VideoClip = {
  filename: string;
  type: 'mp4';
  play: () => void;
};
type CoverArt = {
  filename: string;
  type: 'png';
  move: () => void;
};
type Receipt = {
  filename: string;
  type: 'pdf';
  download: () => void;
};
```

Now my goal is to implement that `play()` function. Not all of these object structure types are compatible. Only the ones that contain the `play()` method can actually be playable. We have built this logic using inheritance in the past. Now, I want to show you a more dynamic way. We will use conditional types, to automate this process and reduce the boilerplate of inheritance.

First, we need to combine all these file types into one type:

```tsx
type PlayerFile = Song | VideoClip | CoverArt | Receipt;
```

Awesome! Now let’s write our conditional:

```tsx
type Playable<T> = T extends { play: () => void } ? T : never;
```

This generic type `Playable<T>` accepts *any* kind of type `T` and checks if the `play()` method is included. If yes, it returns the type `T`. Otherwise it returns `never`. This is the exact same conditional as we had before.

We are now ready to write our `play()` function:

```tsx
function play(file: Playable<PlayerFile>) {
  file.play();
}
```

This function *only* accepts playable types. If you hover over the `file` parameter, you will get `Song | VideoClip`.

Now, let’s declare a `song` and a `receipt`:

```tsx
const song: Song = {
  filename: 'dabadoo',
  type: 'mp3',
  play() {
    console.log('playing...');
  },
};
const receipt: Receipt = {
  filename: 'dabadoo',
  type: 'pdf',
  download() {
    console.log('printing...');
  },
};
```

We can test if our logic works:

```tsx
play(song);  // works fine!
play(receipt);  // Error: Argument of type 'Receipt' is not assignable to parameter of type 'Song | VideoClip'.
```

If we try to call the `play()` function with a `song`, it will work without issues. If we try to call it with a `receipt` instead, we will get back an error.

What a nice feeling of having a programming language working for you? In the end, that’s why we invented them, right?

We didn’t have to specify any logic to connect these types. We don’t even need to declare these types at all. With **type inference**, TypeScript can automatically make connections and ensure that the `play()` method exists.

Pure magic 🪄

## Conclusion

To sum up, conditional types allow you to write if-else statements for your types. This not only reduces the boilerplate of having to declare dependencies across your types and how they are interconnected.

Understanding conditional types is the missing piece of the puzzle to understanding TypeScript. Now you can basically read almost every TypeScript code. It’s not a feature you will use daily in your code, for sure. But there will be cases when you will find it extremely useful.

It also unlocks a large set of language features which would have taken a lot of customizations to be built. TypeScript development team was able to satisfy a lot of feature requests, by writing reusable generic types that leverage conditional types.

Stay tuned for more. 😉

Acknowledgements: I have to give credit to [David Sheldrick](https://github.com/ds300) and his awesome [article](https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/) about Conditional types. It really helped me put together this article.

The [official documentation](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) has also nice examples to learn from.

Cover photo credit: [Li Zhang](https://unsplash.com/photos/xRRQlR8Qu-Y)