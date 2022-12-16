---
title: Master Spread Operator With TypeScript
date: '2022-12-16T22:12:00.000Z'
description: Nullish Coalescing allows you to “fall back” to a default value when dealing with the nullable values.
type: post
cover: './cover.jpg'
---

You probably know the spread operator. It’s those `...` that you see when you open most of the JavaScript files? Yes, those ones.

> The spread operator **—**spoiler alert**—** can spread the contents of an array or an object. It’s basically the opposite of destructuring.

In this article we will review how it works and I will give you some tips on where you can use it.

Butterkuchen? 🥮

## The syntax

Let’s have a quick look at how it works.

Consider the following arrays:

```tsx
const commercialGenres = ['Rock', 'Pop', 'RnB']
const classicalGenres = ['Carol', 'Opera']
```

Typically, if you were about to concatenate them, you would use something like this:

```tsx
const genres = commercialGenres.concat(classicalGenres)
console.log(genres) // ['Rock', 'Pop', 'RnB', 'Carol', 'Opera']
```

You know where this is going…

![What if I told you there's a better way - Image](images/what-if-i-told-you-there-is-a-better-way.png)

With the spread operator we could have the same result:

```tsx
const genres = [...commercialGenres, ...classicalGenres]
genres // ['Rock', 'Pop', 'RnB', 'Carol', 'Opera']
```

In the example above, we concatenate the two arrays `commercialGenres` and `classicalGenres`, by creating a new array `genres`. We use the spread operator two times to spread out the values of the two arrays.

The sequence plays a big role here:

```tsx
const genres = [...classicalGenres, ...commercialGenres]
console.log(genres) // ['Carol', 'Opera', 'Rock', 'Pop', 'RnB']
```

Note, that the values of `classicalGenres` are now first in this example.

---

We can use the spread operator to remove duplicate values from an array:

```tsx
const soundsEffects = ['boom', 'tek', 'tek', 'boom', 'tek']
const uniqueSoundsEffects = [...new Set(soundEffects)]
console.log(uniqueSoundsEffects) // ['boom', 'tek']
```

![Credit: [Claudio Schwarz](https://unsplash.com/photos/Fe4v2DKOKM8)](images/claudio-schwarz-Fe4v2DKOKM8-unsplash.jpg)
_Photo Credit: [Claudio Schwarz](https://unsplash.com/photos/Fe4v2DKOKM8)_

### Using with objects

The spread operator can also be used with JavaScript objects.

Redux has popularized the idea of storing the complete application state into a single JavaScript object. The spread operator shines when it comes to merging current and new states.

Consider the following example:

```tsx
function updateSettings(
  currentSettings: Settings,
  newSettings: Partial<Settings>
) {
  return {
    // Add all the properties of the current state of settings
    ...currentSettings,
    // Override them with the ones that have changed
    ...newSettings,
  }
}
```

This function will basically merge the two objects, similar to how the method `Array.prototype.concat()` works for arrays.

We can now use the `updateSettings()` function by passing the current state of our settings object, followed by another object with the values we want to override:

```tsx
const current = {
  updates: 0,
  system: {
    volume: 0.5,
    brightness: 0.7,
    darkMode: false,
  },
}
updateSettings(current, { updates: 3, system: { volume: 0.2 } })
```

The result will be the following:

```tsx
const current = {
  updates: 3,
  system: {
    volume: 0.2,
  },
}
```

Note that the values for `updates` and `volume` have been modified, but the other values have remained the same.

It’s important to mention here that this performs a shallow merge. That’s why the `system` object has only the volume and all the other properties have been removed. If you want to deeply merge the two objects, you have to repeat the process one more time.

```tsx
function updateSettings(
  currentSettings: Settings,
  newSettings: Partial<Settings>
) {
  return {
    ...currentSettings,
    // 👇 we are adding a property for settings
    settings: {
      // First, we spread out the current settings
      ...currentSettings.settings,
      // And then we override the ones that have changed
      ...newSettings.settings,
    },
  }
}
```

By invoking our function with the same object as before, we will get back the full object for `settings`, with the update value for the `volume`:

```tsx
const current = {
  updates: 3,
  system: {
    volume: 0.2,
    brightness: 0.7,
    darkMode: false,
  },
}
```

Also worth noting that when we have a property with an object as a value, the spread operator copies its values. So, changes in the original object will not impact the newly created one.

![Credit: [Karolína Maršálková](https://unsplash.com/photos/S2INnBMz2Oc)](images/karolina-marsalkova-S2INnBMz2Oc-unsplash.jpg)
_Photo Credit: [Karolína Maršálková](https://unsplash.com/photos/S2INnBMz2Oc)_

## The rest operator

The spread operator has a very friendly sibling; the **rest operator**. Both of them share the three `...` dots.

Here’s how we can use it:

```tsx
const genres = ['Rock', 'Pop', 'RnB']
const [first, second, ...rest] = genres
console.log(rest) // ['RnB']
```

This will basically store all the _remaining_ items in a variable that we named `rest`.

You can freely choose the name that you like. Many developers prefer to use `rest` as a naming convention. According to Clean Code, it's a good practice to name what this array is about, for example `restDays`, or `restProps`.

---

Where the rest operator shines is with function arguments:

```tsx
function renderPopularGenres(
  first: string,
  second: string,
  // Every other argument
  ...otherArgs: string[]
) {
  return `${first}, ${second}, ${otherArgs.length} and more...`
}
genres('Rock', 'Pop', 'RnB', 'HipHop', 'Metal') // Rock, Pop, and 3 more...
```

The function receives an infinite number of strings. It returns the first two values, and displays the count of the remaining ones. Here we use the rest operator to store the remaining arguments in the `otherArgs` variable.

Cover photo credit: [Alper Güzeler](https://unsplash.com/photos/5JE9AQqWo_Q)
