<div style="font-size: 17px;background: black;padding: 2rem;">

<b><i>`useCallback` is a built-in hook provided by React that will return a memoized version of the callback function that only changes if one of the dependencies has changed.</b></i>

Syntax of `useCallback` hook:

<span style="color: Chartreuse;">const memoizedCallback = useCallback(callbackFunction, dependencies);</span>

- `callbackFunction`: The function you want to memoize.
- `dependencies`: An array of values that the memoized function depends on. If any of these values change, the memoized function will be recreated; otherwise, the cached version will be returned.

Usage of this hook:

<h3 style="text-decoration: underline;">1. Skipping re-rendering of components </h3>

In React, when you pass a callback function to a child component as a prop, that callback function is recreated every time the parent component re-renders. This can be inefficient, especially if the child component relies on reference equality to determine whether the prop has changed. The `useCallback` hook solves this problem by allowing you to wrap a function in a memoized version, so that the function is only recreated when its dependencies change.

<b style="color:red;">React will compare each dependency with its previous value using the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is">Object.is</a> comparison algorithm.</b>

Consider the given below code of Parent & Child components:

```js
// TestComponent.js (Parent Component)
import React, { useState } from "react";
import TestComponentChild from "./TestComponentChild";

const TestComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameEnter = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameEnter = (e) => {
    setLastName(e.target.value);
  };

  const getFirstName = () => firstName; // const getFirstName = useCallback(() => firstName, [firstName]);

  return (
    <>
      <input onChange={handleFirstNameEnter} value={firstName} />
      <input onChange={handleLastNameEnter} value={lastName} />
      <TestComponentChild getFirstName={getFirstName} />
    </>
  );
};

export default TestComponent;
```

```js
// TestComponentChild.js (Child Component)
import React from "react";

const TestComponentChild = ({ getFirstName }) => {
  console.log("TestComponentChild");
  return <span>{getFirstName()}</span>;
};

export default React.memo(TestComponentChild);
```

In parent component we are maintaining two states - one for first name and other for last name. And in child component we are passing a callback function prop which returns the first name. Now when first name state changes, child component is expected to re-render as it is receiving a callback function in prop which returns first name and it has to update its UI accordingly. But what we notice is that even when last name state is changed, child component still re-renders which is not required. This is happening because `getFirstName` function is recreated whenever parent component renders which changes its reference ultimately resulting in change of prop being passed to child component.

Now if we wrap `getFirstName` function with `useCallback` hook and add `firstName` in its dependency array, this function will be recreated only when `firstName` changes. That means on every re-render of parent component due to change of last name state, function will not be recreated thus preventing the unnecessary re-render of child component.

<b style="color:red;">NOTE</b>: When dependencies change, it is mandary to recreate the callback function in order to re-render the child component because it is rendering its UI based on the result of that function. So if we won't let it re-render, its UI will be based on previous value returned by the callback function.

<h3 style="text-decoration: underline;">2. Preventing an Effect from firing too often  </h3>

Imagine a scenario in which we are calling a function `fun` inside useEffect hook. We will have to add that function in dependency array of useEffect hook. Now if we don't wrap `fun` with `useCallback` hook, on every render of the component, useEffect will get fired unnecessarily because reference of `fun` will keep changing on every render.

```js
const TestComponent = () => {
const fun = () => {}; // const fun = useCallback(() => {}, []);
useEffect(() => { fun(); }, [fun]);
return null;
}
export default TestComponent;
```

<b style="color:red;">NOTE</b>: This is not just for useEffect hook. If any other hook is also using any callback function defined in same component, it should be wrapped with `useCallback` for same reason. Checkout below example:

```js
const fun = () => {}; // const fun = useCallback(() => {}, []); 
const fun2 = useCallback(() => {fun();}, [fun]);
```
Here, we have to wrap `fun` also with useCallback otherwise on re-render, it will be recreated thus changing its reference which will ultimately recreate `fun2` and wrapping it with `useCallback` will become useless.

<h3 style="text-decoration: underline;">3. Optimizing a custom Hook</h3>
If you’re writing a custom Hook, it’s recommended to wrap any functions that it returns into useCallback:

```js
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```
This ensures that the consumers of your Hook can optimize their own code when needed.

</div>

<!-- <div style="background: DarkRed;  padding: 0.3rem 0.8rem;"> => HIGHLIGHT -->
<!-- <h3 style="text-decoration: underline;"> => SUBHEADING -->
<!-- <span style="color: Chartreuse;"> => IMPORTANT-1 -->
<!-- <i> => IMPORTANT-2 -->
<!-- <mark style="padding: 0.3rem 0.8rem;"> => IMPORTANT-3 -->
<!-- <b> => IMPORTANT-5 -->
<!-- <b style="color:red;"> => NOTE -->
<!-- <br><span style="color: Cyan;">-></span> -->
