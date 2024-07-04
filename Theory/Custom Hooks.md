<div style="font-size: 17px;background: black;padding: 2rem;">

<b><i>React comes with several built-in Hooks like useState, useContext, useEffect, etc. Sometimes, you’ll wish that there was a Hook for some more specific purpose: for example, to fetch data, to keep track of whether the user is online, or to connect to a chat room. You might not find these Hooks in React, but you can create your own Hooks for your application’s needs.</b></i>

Custom Hooks let you share stateful logic but not state itself. Each call to a Hook is completely independent from every other call to the same Hook.

Consider below code:

```js
// useCounter.js => CUSTOM HOOK
import { useState } from "react";
const useCounter = (initialValue) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return { count, increment, decrement };
};
export default useCounter;
```

```js
// TestComponent.js
import useCounter from "./useCounter";
const TestComponent = () => {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
};
export default TestComponent;
```

<span style="color:red;">Hook names must start with use followed by a capital letter, like useState (built-in).</span> This convention guarantees that you can always look at a component and know where its state, Effects, and other React features might “hide”.

In this example, the `useCounter` custom hook encapsulates the state management logic for counting, and the `CounterComponent` uses this hook to manage and display the count state.

Custom hooks empower you to create reusable pieces of logic that can significantly enhance the maintainability and scalability of your React applications.

</div>

<!-- <div style="background: DarkRed;  padding: 0.3rem 0.8rem;"> => HIGHLIGHT -->
<!-- <h3 style="text-decoration: underline;"> => SUBHEADING -->
<!-- <b style="color: Chartreuse;"> => IMPORTANT-1 -->
<!-- <i> => IMPORTANT-2 -->
<!-- <mark style="padding: 0.3rem 0.8rem;"> => IMPORTANT-3 -->
<!-- <b> => IMPORTANT-5 -->
<!-- <b style="color:red;"> => NOTE -->
<!-- <br><span style="color: Cyan;">-></span> -->
