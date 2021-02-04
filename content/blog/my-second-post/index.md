---
title: Declarative programming
date: '2015-05-06T23:46:37.121Z'
---

> **Declarative programming** makes your code more concise, easier to read and reason about and reduces side effects.

JavaScript has function scope, this means that any variable you declare inside a function is not accessible outside this function:

Procedural and object-oriented are forms of **imperative programming**, which implements algorithms in explicit steps. React embraces functional programming which is a form of declarative programming.

You describe _what_ the program must accomplish for solving a problem, rather than describing _how_ to accomplish.

Practical tips for writing declarative code:

- Avoid loops, use [array methods](https://javascript.info/array-methods) instead
- Avoid variables, try to compose functions instead
- Avoid mutating state, create new instances instead
- Avoid side effects, ensure your functions are pure
- Work with the state, don't manipulate DOM directly

Programming declarative UI is difficult. It requires to abstract DOM updates, because touching the DOM is a side-effect.

React is a declarative way of writing UIs. It gives you all the tools to write your markup in plain JavaScript functions. You care only about the application state and how this changes when certain events occur. Then it updates the DOM for you in an easy and predictable way.

---

## Introduction

When you start your programming studies the first thing they teach you is variables, logical expressions and loops. Then you begin with procedural and then object-oriented programming. In other words you learn how to imperatively write code.

This is not necessarily a bad thing. You must get familiar with how computers understand our world. In fact declarative approaches have some sort of imperative abstraction layer underneath.

Once you start building commercial application though the things get more complex. Simplicity is the king. It is essential for every developer in a team to follow the code and to reason about. Our goal is to leave these machine instructions behind as much as we can and focus on writing code more perceivable by humans.

In this article I will explain what is declarative programming and how it applies in web applications. We will see some real-life examples to help you recognize the difference with imperative.

Learning how to write declarative code completely changed my mind about programming. I hope the techniques in this article will help you as much as they helped me.

Excited? So grab a cup of ☕ coffee and come back. I will be waiting.

## Humans think declaratively

In the beginning of this chapter I gave you the following instruction:

```
> Grab a cup of coffee and come back
```

This is a declarative approach.

The imperative approach would be something like this:

```
> Go to the kitchen
> Turn on the coffee machine
> Create an instance of a cup
> Put the cup under the coffee machine
> Press the Espresso button
> Wait for the process to finish
> Turn off the machine
> Take the cup of coffee
> Come back to this screen
```

We can put this algorithm to a `makeCoffee()` function or create a fancy `Coffee.makeCoffee()` method, but the result will be the same. My life would be much easier if I just tell you _what_ to do instead of instructing you the steps above.

Now let's have a look on how this translates to coding.

## A declarative code example

We have the following array of months:

```javascript
const months = ['January', 'February', 'March', ...]
```

Let's imagine that we have to create a calendar similar to the one we find in iOS:

/iOS Calendar.jpeg

Our first step is to modify our array to have only the first three letters of the month name.

Here's the comparison between the two approaches:

```javascript
// Imperative code
function getMonths(months) {
  let shortMonths = []

  for (const i = 0; i < months.length; i++) {
    shortMonths.push(months[i].slice(0, 2))
  }

  return shortMonths
}

// Declarative code
function getMonths(months) {
  return months.map((month) => month.slice(0, 2))
}
```

In the second approach we leverage the [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) array method and thus we avoid looping over the array items.

We avoid the unnecessary variable declaration, which means less code to work and this makes the overall approach easier to read.

We avoid touching the DOM, which means our function has no [side-effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>). It is also [pure](https://en.wikipedia.org/wiki/Pure_function), with the same input it will always return the same output.

Finally, we avoid using the [`array.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method which mutates our array.

So many wins in such a simple task right? Imagine how easier our programs would be once we start applying these simple practices as much as we can.

Now let's see how this affects the UI.

## Declarative UIs

HTML is [declarative](https://www.youtube.com/watch?v=4A2mWqLUpzw) by design. Consider the following markup:

```html
<ul class="months">
  <li><button>01</button></li>
  <li><button>02</button></li>
  <li><button>03</button></li>
  ...
</ul>
```

You don't need to explicitly describe step by step how the browser will be render this list on the screen.

CSS works similarly, the style of the class `.months` will be applied automatically to all the matching DOM elements which have this class.

The problem starts when you add interactivity.

![Airbnb calendar](./airbnb-calendar.gif)
_Fig. 2: The minimum dominating set of a graph_

Consider this Airbnb calendar. Two things happen when you click on a day. At first we indicate the selected days with a black circle. Also the check in/out field gets updated with the new date range.

Below is an example of this in modern JavaScript. For the sake of simplicity we use the class `.selected` to indicate one selected day at a time.

```javascript
class Calendar {
  constructor(domId) {
    // highlight-start
    this.renderCalendar(domId)
    this.addEventListeners(domId)
    // highlight-end
  }

  handleCalendarClick(selectedDay) {
    event.preventDefault()
    this.updateView(selectedDay)
    this.updateInput(selectedDay)
  }

  addEventListeners(domId) {
    document
      .getElementById(domId)
      .querySelectorAll('li button')
      .forEach((button) => {
        const selectedDay = button.dataset.day
        button.addEventListener('click', () => {
          this.handleCalendarClick(selectedDay)
        })
      })
  }

  updateView(selectedDay) {
    const selector = `button[data-day="${selectedDay}"]`
    document.querySelector().classList.toggle('selected')
  }

  updateInput(selectedDay) {
    document.getElementById('selectedDate').value = selectedDay
  }

  renderCalendar(domId) {
    document.getElementById(domId).innerHTML = `
			<input id="selectedDate" />
				<ul>
					<li>
						<button data-day="01">01</button>
					</li>
					<li>
						<button data-day="02">02</button>
					</li>
					...
				</ul>
			`
  }
}
```

_Try this example by yourself in [JSFiddle](https://jsfiddle.net/vd6gqhco/90/)._

As you can see this approach is imperative:

- A big part of the `Calendar` class explicitly modifies DOM elements.
- We depend on the `data-day` attribute in order to get the selected button
- We no longer give the browser _what_ to render, we instructively tell the browser _how_ to modify the DOM.

What if we could write our application like this:

```jsx
<SearchFilters>
  <DateRangeInput value={dateRange} />
  <Calendar value={dateRange} onChange={setDateRange} />
</SearchFields>
```

Here's how it works:

- `<Calendar>` displays a calendar and uses `dateRange` to mark the selected days. It also allows the user to modify their selection. This happens by calling the `onChange()` function with the updated `dateRange` value.
- `<DateRangeInput>` is a special kind of input that displays the selected date range. Similar to the calendar component it can also modify the selection as the user types.
- `<SearchFilters>` is the container div which applies the layout.

Modern UI libraries let you do exactly

## React

React went popular because it lets you work with the state of your UI and it abstracts all DOM updates in a fast and predictable way. In fact the development experience is so good that people like to write CSS in JS as well.

Think of it as a simple function:

```jsx
render(state)
```

You are responsible to describe how your UI is being rendered to the DOM by a given `state` input. This object contains properties or methods that let your UI function inform you about certain events, for example a mouse click.

For every event that occurs we update the state and this forces the application to render again:

```javascript
event => state update => render
```

This unidirectional data flow help you build incredibly simple applications that are easy to test and maintain.

## Conclusion

Your aim as a React developer is to write declarative code as much as you can. It’s like learning how to drive a supercar.

But how you can declaratively change the DOM on every single event and maintain good performance? What did you say? What is the DOM? Ok this will take another coffee.

_In the next post we will continue our journey, by learning what is DOM and how it's being managed by React._

_This article is part of the series "TLTR; React". I try to explain the core functionality of the React ecosystem in an easy-to-follow way._

_Feel free to provide feedback in the comments below. See you in the next post._
