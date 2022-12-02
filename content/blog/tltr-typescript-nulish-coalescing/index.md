---
title: A Guide To Understand The Nullish Coalescing (??) Operator
date: '2022-12-02T22:12:00.000Z'
description: Nullish Coalescing allows you to “fall back” to a default value when dealing with the nullable values.
type: post
cover: './cover.jpg'
---

**Nullish Coalescing** is another JavaScript feature that TypeScript made popular. It’s the famous `??` operator.

> It allows you to set a fallback value if a value is nullable.

The nullable values are `null` and `undefined`.

Here’s how it works:

```tsx
testValue ?? fallbackValue
```

If the `testValue` is `null` or `undefined`, this expression will result in the `fallbackValue`. In every other case, the `testValue` value will be returned.

But wait a minute. 🧐

Since I remember myself, I have been using the logical `OR` operator `||` to implement the same thing.

Here are some examples:

```tsx
track || {}
volume || 0.25
comment || 'No comment.'
```

I have seen this pattern in many JavaScript applications. And the result is the same, right? In JavaScript, the logical `OR` operator returns the first value if the first condition is truthy or the second value if not.

> Why do we need to learn yet another operator?

Well, my friends… There are some caveats when you’re using the logical `||` operator to check for truthy values.

Let’s run an experiment.

![Photo Credit: [Marcel Kovačič](https://unsplash.com/@marcel_kovacic)](images/marcel-kovacic-rF70cHYTlK0-unsplash.jpg)
_Photo Credit: [Marcel Kovačič](https://unsplash.com/@marcel_kovacic)_

## Try this at home

It's worth trying different values in the terminal to see how these lines of code will respond when the first part of the logical operator is one of the following: `null`, `undefined`, `NaN`, `0`, `“”`, and `{}`.

Consider the following:

```tsx
null || {}
undefined || {}
NaN || {}
{ foo: 'bar' } || {}
0 || {}
"" || {}
{} || {}
```

For every one of the lines above, take a moment and write down what values you’re expecting to have as a result.

Now repeat the same twice, by replacing the second part of the logical operator with a `number` and with a `string`.

In the following section I’m analyzing the results.

## Running the experiment

Let’s start with the first one:

```tsx
null || {}  // {}
undefined || {}  // {}
NaN || {}  // {}
{ foo: 'bar' } || {}  // { foo: 'bar' }
0 || {} // {}
"" || {}  // {}
{} || {}  // {} we can't tell but it's probably the first one 🙂
```

Regardless of the value, the result is always the same. But why are we getting an object everywhere?

There’s a unique behavior in JavaScript. The values `0`, `“”`, and `NaN` are considered _falsy_, and therefore the result will be the second part of our comparison.

It passes my unit tests. Do you also have the same values?

Now, let’s try with a `number` value:

```tsx
null || 0.25  // 0.25
undefined || 0.25  // 0.25
NaN || 0.25  // 0.25
0 || 0.25  // 0.25
"" || 0.25  // 0.25
{} || 0.25  // {}
```

Again, the same behavior. If we pass `0` we still get `0.25`. But `0` is not a nullable value. It’s a valid number! This could cause a lot of trouble for our fellow developers.

Consider the following example:

```tsx
function getVolume(settings) {
  return settings.volume || 0.25
}

getVolume(0) // 0.25
```

If the user had muted the sound, we would still have been playing at 25% of the maximum volume.

Bad UI. 🙈

OK, now I’m curious how the third one will behave:

```tsx
null || "No comment."
undefined || "No comment."
NaN || "No comment."
0 || "No comment."
"" || "No comment."
{} || {}
```

No comment indeed. 🤔

Again, if there was an empty string as a comment, the message “No comment.” would have been displayed.

## The solution

To deal with this weirdness once and for all, we could have to add some extra logic to our functions:

```tsx
function getVolume({ volume }) {
  return volume !== null && volume !== undefined ? volume : 0.25
}

getVolume(0) // 0
```

We finally get the value we were expecting.

The **Nullish Coalescing** operator performs that exact check, but the syntax is much simpler:

```tsx
volume ?? 0.25
```

It basically says; if you get a valid value, just use it instead of falling back to the falsy one. And it protects us from many issues.

---

I hope this article helped you understand how to use the Nullish Coalescing operator, and what problems it solves.

Ah, and one more thing.

It’s worth noting that you _can’t_ chain it with the logical operators:

```tsx
;(volume || 0.25) ?? 0.25 // Returns a SyntaxError
```

Unless you explicitly indicate precedence:

```tsx
;(volume || 0.25) ?? 0.25
```

---

The cover artwork is designed by [Allison Saeng](https://unsplash.com/photos/C6PD0STeEKM).
