<div style="font-size: 17px;background: black;padding: 2rem;">

# Refs

<b><i>When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a `ref`. `Refs` also provide a way to access and interact with DOM elements or React components directly from within your code. They allow you to reference a particular element or component and perform actions such as reading its properties, calling its methods, or setting focus on

The <b style="color: Cyan;">useRef</b> hook is a built-in hook that helps us creating `refs`</i></b>

Reference:

```js
useRef(initialValue);
```

<h3 style="text-decoration: underline;">Parameters:</h3>

`initialValue`: The value you want the ref object’s current property to be initially. It can be a value of any type. This argument is ignored after the initial render.

<h3 style="text-decoration: underline;">Returns:</h3>

`useRef` returns an object with a single property - <b style="color: Limegreen;">current</b>. Initially, value of this property is set to the `initialValue` you have passed. You can later set it to something else. If you pass the `ref` object to React as a `ref` attribute to a JSX node, React will set its `current` property as that DOM element. On the next renders, `useRef` will return the same object.

Example 1:

```js
import React, { useRef } from 'react';
const TestComponent = () => {
  const demoRef1 = useRef(0);
  const demoRef2 = useRef(null);
  console.log('demoRef1 = ', demoRef1); // demoRef1 =  {current: 0}
  return <div ref={demoRef2}></div>; // [demoRef2 can be used to access this div DOM node using buttonRef.current]
};
export default TestComponent;
```

<h3 style="text-decoration: underline;">Bullet Points:</h3>

- You can mutate the `ref.current` property. Unlike state, it is mutable. However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn’t mutate that object.
- When you change the `ref.current` property, React does not re-render your component. React is not aware of when you change it because a ref is a plain JavaScript object.
- Do not write or read `ref.current` during rendering, except for initialization. This makes your component’s behavior unpredictable.
- When you change current property of ref, it will not change after re-renders.

<br>

<div style="border: 1px solid yellow; padding: 10px;">
In class components, you can create refs using <b style="color: Chartreuse;">React.createRef()</b>. This method does not take any argument and returns a ref object. Although is meant to use in class components, but it can be used in functional components as well.
</div>

<br>

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Usage</h3>

<h4 style="text-decoration: underline;">1. Referencing a value with a ref</h4>

`useRef` returns a ref object with a single current property initially set to the initial value you provided.

On the next renders, useRef will return the same object. You can change its current property to store information and read it later. This might remind you of state, but there is an important difference.

Changing a ref does not trigger a re-render. This means refs are perfect for storing information that doesn’t affect the visual output of your component. For example, if you need to store an interval ID and retrieve it later, you can put it in a ref. To update the value inside the ref, you need to manually change its current property:

```js
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
}
```

Later, you can read that interval ID from the ref so that you can call clear that interval:

```js
function handleStopClick() {
  const intervalId = intervalRef.current;
  clearInterval(intervalId);
}
```

By using a ref, you ensure that:

- You can store information between re-renders (unlike regular variables, which reset on every render).
- Changing it does not trigger a re-render (unlike state variables, which trigger a re-render).
- The information is local to each copy of your component (unlike the variables outside, which are shared).

Changing a ref does not trigger a re-render, so refs are not appropriate for storing information you want to display on the screen. Use state for that instead.

<div style="background: DarkRed;  padding: 0.3rem 0.8rem;">

<b>Do not write or read ref.current during rendering.</b>

React expects that the body of your component behaves like a pure function:

If the inputs (props, state, and context) are the same, it should return exactly the same JSX.
Calling it in a different order or with different arguments should not affect the results of other calls.

Reading or writing a ref during rendering breaks these expectations.

```js
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}
```

<b style="color:yellow;">You can read or write refs from event handlers or effects instead.</b>

</div>

<br>

<h4 style="text-decoration: underline;">2. Manipulating the DOM with a ref</h4>

It’s particularly common to use a ref to manipulate the DOM. React has built-in support for this.

First, declare a ref object with an initial value of null and then pass your ref object as the ref attribute to the JSX of the DOM node you want to manipulate:

```js
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  return <input ref={inputRef} />;
}

export default MyComponent;
```

After React creates the DOM node and puts it on the screen, React will set the current property of your ref object to that DOM node. Now you can access the `<input>`’s DOM node and call methods like `focus()`:

```js
function handleClick() {
  inputRef.current.focus();
}
```

React will set the current property back to null when the node is removed from the screen.

<br>

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">ref callback function</h3>

Instead of a ref object (like the one returned by `useRef`), you may pass a function to the ref attribute. A ref callback function offers more flexibility, particularly when you need dynamic control over the ref or cleanup logic.

```jsx
<div ref={(node) => console.log(node)} />
```

When the `<div>` DOM node is added to the screen, React will call your `ref` callback with the DOM node as the argument. When that `<div>` DOM node is removed, React will call your `ref` callback with `null`.

React will also call your `ref` callback whenever you pass a different `ref` callback. In the above example, `(node) => { ... }` is a different function on every render. When your component re-renders, the previous function will be called with `null` as the argument, and the next function will be called with the DOM node.

<u>**SINGLE PARAMETER RECEIVED:**</u>

<b style="color:orange;">node</b>: A DOM node or `null`. React will pass you the DOM node when the `ref` gets attached, and `null` when the `ref` gets detached. Unless you pass the same function reference for the `ref` callback on every render, the callback will get temporarily detached and re-attached during every re-render of the component.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Attach refs to list</h3>

```js
const refsArr = useRef([]);
...
...
dataArr.map((data, index) => <div ref={refsArr.current[index] ?? (refsArr.current[index] = React.createRef())}>{data}</div>);
```

**OTHER METHOD**

```jsx
const refsMap = useRef(new Map());
...
...
<ul>
  {dataList.map((data) => (
    <li
      ref={(node) => {
        if (node) refsMap.set(data, node);
        else refsMap.delete(data);
      }}
    >
      {data}
    </li>
  ))}
</ul>;
...
```

<br>

# forwardRef

In React, the `forwardRef` is a `higher-order component` that allows you to pass a `ref` from a parent component to a child component that may be a functional component. It's particularly useful when you want to maintain direct access to a DOM element or a React component instance created by a child component, even when that child component is a functional component or a component created using the React.memo optimization.

The primary use case for `forwardRef` is to enable parent components to access and manipulate child components in cases where the child component is implemented using functional components.

```js
// Parent Component

import React, { useRef } from 'react';
import TestComponentChild from './TestComponentChild';

const TestComponent = () => {
  const childRef = useRef(null);
  const addFocusOnInput = () => {
    childRef.current.focus();
  };
  return (
    <>
      <TestComponentChild ref={childRef} />
      <button onClick={addFocusOnInput}>Add Focus</button>
    </>
  );
};

export default TestComponent;
```

```js
// Child Component

import React, { forwardRef } from 'react';

const TestComponentChild = (props, ref) => {
  return <input ref={ref} />;
};

export default forwardRef(TestComponentChild);
```

<br>

<h3 style="text-decoration: underline;">Why not use refs directly as props</h3>

<b>1-></b> If we assign to `ref` prop an actual ref, React will throw a warning `Warning: Function components cannot be given refs`. This won't work at all because you'll see that no prop called `ref` will be received in Child component.

```js
// Parent Component

import React, { useRef } from 'react';
import TestComponentChild from './TestComponentChild';

const TestComponent = () => {
  const childRef = useRef(null);
  return <TestComponentChild ref={childRef} />;
};

export default TestComponent;
```

```js
// Child Component

import React from 'react';

const TestComponentChild = ({ ref }) => {
  // ref is undefined here
  return <input ref={ref} />;
};

export default TestComponentChild;
```

<div style="background: DarkRed;  padding: 0.3rem 0.8rem;">But if we don't pass `ref` prop to child component and instead of that we pass some custom prop (say childRef), this will work perfectly without any warnings. However, we shouldn't do that too because of next points.
</div>
<br>

<b>2-></b>Props are immutable in React. Passing the ref using a prop violates the props immutability because the ref eventually is assigned (aka mutated) with the DOM element.
<br>

<b>3-></b>Using ref attribute (instead of a custom prop like childRef) is better because it keeps the ref API consistent between class-based, function-based, and HTML tags.
<br>

<b>4-></b>When passing a `ref` as a prop directly, if the parent component re-renders for any reason, the functional child component might also re-render. This can lead to unnecessary re-renders of the child component

</div>

<!-- <div style="font-size: 17px;background: black;padding: 2rem;"> -->
<!-- <div style="background: DarkRed;padding: 0.3rem 0.8rem;"> [HIGHLIGHT] -->
<!-- <h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;"> [SUBHEADING] -->
<!-- <b style="color: Chartreuse;"> [NOTE] -->
<!-- <b style="color:red;"> [NOTE-2] -->
<!-- <span style="color: Cyan;"> [IMP] -></span> -->
<!-- <b style="color: Salmon;"> [POINT] -->
<!-- <div style="border: 1px solid yellow; padding: 10px;"> [BORDER] -->
