<div style="font-size: 17px;background: black;padding: 2rem;">

# Side Effects

Side effects in React functional components refer to any actions or behaviors that are not directly related to rendering the user interface but can still affect the component or the application as a whole. These side effects can include things like data fetching, DOM manipulation, subscriptions, and interactions with external APIs or services. Basically when we talk about side effects in the context of React, we are referring to anything that is outside the scope of React. So calling any native Web APIs will be considered as a side effect as it’s not within the React universe. What do I mean by outside of the React scope? It means not part of the React framework, for example, the localStorage in your browser.

In React, functional components are primarily responsible for rendering the user interface based on the provided props and state. However, applications often need to perform additional tasks beyond rendering, such as fetching data from a server or updating the browser's document title. These tasks are considered side effects.

Here are some common examples of side effects in React functional components:

- Data Fetching: Fetching data from an API or server and updating the component's state based on the retrieved data.
- DOM Manipulation: Modifying the DOM directly, such as adding or removing elements, changing styles, or focusing on an input field.
- Event Listeners: Adding event listeners to respond to user interactions, like clicks, keyboard input, or mouse movements.
- Subscriptions: Setting up subscriptions to external data sources or services, such as real-time updates through web sockets.
- Timers and Intervals: Scheduling tasks to run after a certain amount of time or at regular intervals.
- Updating Document Title: Dynamically updating the browser's document title based on the component's state or props.

<br>

# useEffect hook

<b><i>The `useEffect` hook is a fundamental tool for managing side effects in functional components. Side effects are actions that occur outside the normal flow of the component, such as fetching data, updating the DOM, or interacting with external APIs. The `useEffect` hook helps you control when these side effects happen during the component's lifecycle.</b></i>

Syntax:
```js
useEffect(function setup(){...}, [dependency1, dependecy2, ....]);
```

- <b>setup function</b>: The function with your Effect’s logic. Your setup function may also optionally return a <b style="color:orange;">cleanup function</b>. When your component is added to the DOM, React will run your setup function. After every successive re-render with <b style="color:red;">changed dependencies</b>, React will first run the cleanup function (if you provided it) with the <b style="color:Violet;">old values</b>, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function again. That's why if you want to run cleanup function only on unmounting of component, dependency array should be empty.

- <b>dependencies</b>: The list of all reactive values referenced inside of the setup code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. React will compare each dependency with its previous value using the `Object.is` comparison. If you omit this argument, your Effect will re-run after every re-render of the component.

<i style="color: Chartreuse;">If your Effect truly doesn’t use any reactive values, it will only run after the initial render. While if you pass no dependency array at all, your Effect runs after every single render (and re-render) of your component. </i>

```js
import React, { useEffect, useState } from "react";

const TestComponent = () => {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("clean-up-function");
    };
  }, [number]);

  return (
    <>
      <h1>Number - {number}</h1>
      <button onClick={() => setNumber(number + 1)}>Increase</button>
    </>
  );
};

export default TestComponent;

// Initial Output -> useEffect
// After Button Click -> clean-up-function useEffect
// After unmount -> clean-up-function
```

# Usage of useEffect: 

<h3 style="text-decoration: underline;">1. Connecting to an external system</h3>

Some components need to stay connected to the network, some browser API, or a third-party library, while they are displayed on the page. These systems aren’t controlled by React, so they are called external.

To connect your component to some external system, call useEffect at the top level of your component:

```js
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
  	const connection = createConnection(serverUrl, roomId);
    connection.connect();
  	return () => {
      connection.disconnect();
  	};
  }, [serverUrl, roomId]);
  // ...
}
```

<div style="background: DarkRed;  padding: 0.3rem 0.8rem;">
An Effect lets you keep your component synchronized with some external system (like a chat service). Here, external system means any piece of code that’s not controlled by React, such as:

- A timer managed with setInterval() and clearInterval().
- An event subscription using window.addEventListener() and window.removeEventListener().
- A third-party animation library with an API like animation.start() and animation.reset().

If you’re not connecting to any external system, you probably don’t need an Effect.
</div>

<h3 style="text-decoration: underline;">2. Fetching data with Effects</h3>

You can use an Effect to fetch data for your component. If you want to fetch data from an Effect manually, your code might look like this:

```js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [person]);

  // ...
}
```

Note the ignore variable which is initialized to false, and is set to true during cleanup. This ensures your code doesn’t suffer from “race conditions”: network responses may arrive in a different order than you sent them. In React, a race condition can occur when multiple asynchronous operations, like data fetching or state updates, are initiated concurrently or in rapid succession within a component that uses the `useEffect` hook. These operations might complete in an unpredictable order, leading to unexpected or undesired behavior in your application. Refer this link - https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect 

Note that in above code, we'll still have a race-condition in the sense that multiple requests will be in-flight, but only the results from the last one will be used.

Writing data fetching directly in Effects gets repetitive and makes it difficult to add optimizations like caching and server rendering later. It’s easier to use a custom Hook—either your own or maintained by the community.

<div style="border: 2px solid green; padding: 10px;">
<b style="color:Orange;">Will useEffect run if ref.current is added in dependency array and its value changes? </b>

<br>

<b><i>Let's recall the purpose of a dependency array: It's there so React can do something when there are changes in the values provided each time the component renders. And that's the answer right there! React can't know that the value changed if a change doesn't trigger a render!

So the answer is NO!</i></b>

<b style="color: Chartreuse;">Hence, refs should never be put in dependency array!</b>

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
