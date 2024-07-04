<div style="font-size: 17px;background: black;padding: 2rem;">

# State: A Component's Memory

<b><i>Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” should put a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called state.</b></i>

Syntax:
```js
const [data, setData] = useState(inititalState);
```

<h3 style="text-decoration: underline;">PARAMETERS</h3>

`initalState` is the value you want the state to be initially. It can be a value of any type, but there is a special behavior for functions. If you pass a function as initialState, it will be treated as an initializer function and will be called only once at initial render and will be ignored after that. It should be pure, should take no arguments, and should return a value of any type. React will call your initializer function when initializing the component, and store its return value as the initial state.

<h3 style="text-decoration: underline;">RETURNS</h3>

Every time your component renders, `useState` gives you an array containing two values:
1. The `state variable` with the value you stored.
2. The `state setter function` which can update the state variable and trigger React to render the component again.

When you call `useState`, you are telling React that you want this component to remember something. The convention is to name this pair like `const [something, setSomething]`. You could name it anything you like, but conventions make things easier to understand across projects.

Consider the given below code:
```js
import React, { useState } from "react";
const TestComponent = () => {
  const [index, setIndex] = useState(0);
  const buttonClicked = () => { setIndex(index + 1); };
  return <button onClick={buttonClicked}>Increase index: {index}</button>;
};
export default TestComponent;
```

1. <b>Your component renders the first time</b>. Because you passed `0` to `useState` as the initial value for `index`, it will return `[0, setIndex]`. React remembers `0` is the latest state value.
2.  <b>You update the state.</b> When a user clicks the button, it calls `setIndex(index + 1)`. `index` is `0`, so it’s `setIndex(1)`. This tells React to remember index is `1` now and triggers another render.
3. <b>Your component’s second render.</b> React still sees `useState(0)`, but because React remembers that you set `index` to `1`, it returns `[1, setIndex]` instead.
4. And so on!

<h3 style="text-decoration: underline;">Updating Objects in State</h3>

<b><i>State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.</b></i>

So far you’ve been working with numbers, strings, and booleans. These kinds of JavaScript values are “immutable”, meaning unchangeable or “read-only”. You can trigger a re-render to replace a value:
```js
...
const [x, setX] = useState(0);
...
...
setX(5);
```
The x state changed from 0 to 5, but the number 0 itself did not change. It’s not possible to make any changes to the built-in primitive values like numbers, strings, and booleans in JavaScript.

Now consider an object in state. Technically, it is possible to change the contents of the object itself. This is called a mutation:
```js
...
const [position, setPosition] = useState({ x: 0, y: 0 });
...
...
position.x = 5;
```

However, although objects in React state are technically mutable, you should treat them as if they were immutable—like numbers, booleans, and strings. Instead of mutating them, you should always replace them because mutating them won't trigger re-render as via this way, React won't have any idea that object has changed. <b style="color: Chartreuse;">One should treat any JavaScript object that he puts into state as read-only. To actually trigger a re-render in this case, create a new object and pass it to the state setting function:</b>

```js
 setPosition({ x: 5, y: 5 });
```
In the previous example, the position object is always created fresh from the current cursor position. But often, you will want to include existing data as a part of the new object you’re creating. For example, you may want to update only one co-ordinate(say x) and keep rest co-ordinates as it is.

We can use the `... object spread` syntax so that you don’t need to copy every property separately.
```js
 setPosition({ ...position, x: 10 });
```

<h3 style="text-decoration: underline;">Updating Arrays in State</h3>

<b><i>Arrays are mutable in JavaScript, but you should treat them as immutable when you store them in state. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.</b></i>

In JavaScript, arrays are just another kind of object. Like with objects, you should treat arrays in React state as read-only. This means that you shouldn’t reassign items inside an array like arr[0] = 'bird', and you also shouldn’t use methods that mutate the array, such as push() and pop().

Instead, every time you want to update an array, you’ll want to pass a new array to your state setting function. To do that, you can create a new array from the original array in your state by calling its non-mutating methods like `filter()` and `map()`. 

Similarly to case of objects, we can also use `... object spread` operator here also.
```js
...
const [arr, setArr] = useState([1,2,3]);
...
...
setArr([...arr, 4]);
```

<br>

# State as a Snapshot

<b><i>State variables might look like regular JavaScript variables that you can read and write to. However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.</b></i>

You might think of your user interface as changing directly in response to the user event like a click. In React, it works a little differently from this mental model. As told earlier,  setting state requests a re-render from React. This means that for an interface to react to the event, you need to update the state.

Here’s what happens when you click the button in simple index updater code:
1. The `onClick` event handler executes.
2. `setIndex(index + 1)` sets index to 1 and queues a new render.
3. React re-renders the component according to the new `index` value.

## Rendering takes a snapshot in time 

“Rendering” means that React is calling your component, which is a function. The JSX you return from that function is like a snapshot of the UI in time. Its props, event handlers, and local variables were all calculated using its state at the time of the render.

Unlike a photograph or a movie frame, the UI “snapshot” you return is interactive. It includes logic like event handlers that specify what happens in response to inputs. React updates the screen to match this snapshot and connects the event handlers. As a result, pressing a button will trigger the click handler from your JSX.

When React re-renders a component:

1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen to match the snapshot you’ve returned.

As a component’s memory, state is not like a regular variable that disappears after your function returns. State actually “lives” in React itself—as if on a shelf!—outside of your function. When React calls your component, it gives you a snapshot of the state for that particular render. Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, <b>all calculated using the state values from that render!</b>

Here’s a little experiment to show you how this works. In this example, you might expect that clicking the “+3” button would increment the counter three times because it calls setNumber(number + 1) three times.

See what happens when you click the “+3” button:

```js
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

Notice that number only increments once per click!

<b style="color: Chartreuse;">Setting state only changes it for the next render.</b> During the first render, number was 0. This is why, in that render’s onClick handler, the value of number is still 0 even after setNumber(number + 1) was called.

Even though you called setNumber(number + 1) three times, in this render’s event handler number is always 0, so you set the state to 1 three times. This is why, after your event handler finishes, React re-renders the component with number equal to 1 rather than 3.

<br>

## Queueing a Series of State Updates 

<b><i>Setting a state variable will queue another render. But sometimes you might want to perform multiple operations on the value before queueing the next render. To do this, it helps to understand how React batches state updates.</i></b>

As you see in the previous code, each render’s state values are fixed, so the value of number inside the first render’s event handler is always 0, no matter how many times you call setNumber(1). But there is one other factor at play here. <b style="color: Chartreuse;">React waits until all code in the event handlers has run before processing your state updates.</b> This is why the re-render only happens after all these setNumber() calls.

This lets you update <u>**multiple state variables, even from multiple components**</u> without triggering too many re-renders. But this also means that the UI won’t be updated until after your event handler, and any code in it, completes. This behavior, also known as <b style="color:yellow;">batching</b>, makes your React app run much faster. It also avoids dealing with confusing “half-finished” renders where only some of the variables have been updated.

<div style="background: Blue;  padding: 0.3rem 0.8rem;">React does not batch across multiple intentional events like clicks—each click is handled separately. Rest assured that React only does batching when it’s generally safe to do. This ensures that, for example, if the first button click disables a form, the second click would not submit it again.</div>

<h3 style="text-decoration: underline;">Updating the same state multiple times before the next render</h3> 

It is an uncommon use case, but if you would like to update the same state variable multiple times before the next render, instead of passing the next state value like setNumber(number + 1), you can pass a function that calculates the next state based on the previous one in the queue, like `setNumber(n => n + 1)`. It is a way to tell React to “do something with the state value” instead of just replacing it.

<span style="color: Crimson;">DUE TO THIS REASON ONLY, REMEMBER - DON'T STORE CALLBACK FUNCTIONS IN STATES DIRECTLY. THE RETURNED VALUE FROM THOSE FUNCTIONS WILL GET STORED INSTEAD OF ACTUAL CALLBACK! IF YOU WANT TO STORE A CALLBACK FUNCTION, PASS A FUNCTION WHICH RETURNS THAT CALLBACK FUNCTION.</span> 

```js
export default function Counter() {
  const [number, setNumber] = useState(0);
  // Here value is incremented by 3 on button click
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

Here, `n => n + 1` is called an `updater function`. When you pass it to a state setter:
1. React queues this function to be processed after all the other code in the event handler has run.
2. During the next render, React goes through the queue and gives you the final updated state.

When you call `useState` during the next render, React goes through the queue. The previous number state was 0, so that’s what React passes to the first updater function as the n argument. Then React takes the return value of your previous updater function and passes it to the next updater as n, and so on:
<table style="border: 0.1rem solid white"><thead><tr><th>queued update</th><th><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">n</code></th><th>returns</th></tr></thead><tbody><tr><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">n =&gt; n + 1</code></td><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">0</code></td><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">0 + 1 = 1</code></td></tr><tr><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">n =&gt; n + 1</code></td><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">1</code></td><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">1 + 1 = 2</code></td></tr><tr><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">n =&gt; n + 1</code></td><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">2</code></td><td><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">2 + 1 = 3</code></td></tr></tbody></table>

React stores 3 as the final result and returns it from useState.

This is why clicking “+3” in the above example correctly increments the value by 3.

<b><i>What about this event handler? What do you think number will be in the next render?</i></b>

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```
Here’s what this event handler tells React to do:
1. setNumber(number + 5): number is 0, so setNumber(0 + 5). React adds “replace with 5” to its queue.
2. setNumber(n => n + 1): n => n + 1 is an updater function. React adds that function to its queue.

React stores 6 as the final result and returns it from useState.

It’s common to name the updater function argument by the first letters of the corresponding state variable:
`setLastName(ln => ln.reverse());`


<div style="border: 1px solid yellow; padding: 15px;">

# useState hook key points(advanced)

<b style="color: Cyan;">1.</b> If the new value you provide is identical to the current state, as determined by an `Object.is` comparison, React will skip re-rendering the component and its children. This is an optimization. Although in some cases React may still need to call your component before skipping the children, it shouldn’t affect your code.

<b style="color: Cyan;">2.</b> React batches state updates. It updates the screen after all the event handlers have run and have called their set functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use `flushSync`.

<b style="color: Cyan;">3.</b> If you call a set function while rendering, it must be inside a condition. Otherwise, your component would re-render in a loop until it crashes. Also, you can only update the state of the currently rendering component like this. Calling the set function of another component during rendering is an error.

<b style="color: Cyan;">4.</b> You’ll often encounter the `key` attribute when rendering lists. However, it also serves another purpose. You can reset a component’s state by passing a different key to a component.

<b style="color: Cyan;">5.</b> In this way of creating state - `const [todos, setTodos] = useState(createInitialTodos());`, although the result of createInitialTodos() is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating large arrays or performing expensive calculations. To solve this, you may pass it as an initializer function to useState instead: `useState(createInitialTodos)`

</div>

</div>

<!-- <div style="font-size: 17px;background: black;padding: 2rem;"> -->
<!-- <div style="background: DarkRed;padding: 0.3rem 0.8rem;"> [HIGHLIGHT] -->
<!-- <h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;"> [SUBHEADING] -->
<!-- <b style="color: Chartreuse;"> [NOTE] -->
<!-- <b style="color:red;"> [NOTE-2] -->
<!-- <span style="color: Cyan;"> [IMP] -></span> -->
<!-- <b style="color: Salmon;"> [POINT] -->
<!-- <div style="border: 1px solid yellow; padding: 10px;"> [BORDER] -->
