<div style="font-size: 17px;background: black;padding: 2rem;">

<b><i>The useMemo hook is a built-in hook provided by React that is used to memoize (cache) the result of a computation. When we use `useMemo`, React will only recompute the memoized value when the dependencies you specify have changed. If the dependencies have not changed, React will return the cached value</b></i>

Here's the basic syntax of the useMemo hook:

```js
const memoizedValue = useMemo(callbackFunction, [dependency1, dependency2, ...]);
```

- `computeValue`: A function that calculates the value you want to memoize.
- `dependency1, dependency2, ...`: An array of values that the memoized value depends on. If any of these values change, the memoized value will be recomputed; otherwise, the cached version will be returned.

<b style="color:red;">NOTE</b>: Remember that value which gets stored in `memoizedValue` will be returned value of `callbackFunction`, not the function itself. This is the basic difference between `useCallback` & `useMemo` hook.

Usage of this hook:

<h3 style="text-decoration: underline;">1. Skipping expensive recalculations</h3>

To cache a calculation between re-renders, wrap it in a useMemo call at the top level of your component:

```js
import { useMemo } from "react";

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

You need to pass two things to useMemo:

1. A calculation function that takes no arguments, like () =>, and returns what you wanted to calculate.
2. A list of dependencies including every value within your component that’s used inside your calculation.

On the initial render, the value you’ll get from useMemo will be the result of calling your calculation.

On every subsequent render, React will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is">Object.is</a>), useMemo will return the value you already calculated before. Otherwise, React will re-run your calculation and return the new value.

In other words, useMemo caches a calculation result between re-renders until its dependencies change.

<h3 style="text-decoration: underline;">2. Skipping re-rendering of components</h3>

In some cases, useMemo can also help you optimize performance of re-rendering child components. Consider below code:

```js
// Parent component
export default function TodoList({ todos, tab, theme }) {
  // Every time the theme changes, this will be a different array...
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      {/* ... so List's props will never be the same, and it will re-render every time */}
      <List items={visibleTodos} />
    </div>
  );
}
```

```js
// Child component
import { memo } from "react";

const List = memo(function List({ items }) {
  // ...
});
```

You’d notice that toggling the theme prop freezes the app for a moment, but if you remove `<List />` from your JSX, it feels fast. This tells you that it’s worth trying to optimize the List component.

By default, when a component re-renders, React re-renders all of its children recursively. This is why, when TodoList re-renders with a different theme, the List component also re-renders. This is fine for components that don’t require much calculation to re-render. But if you’ve verified that a re-render is slow, you can tell List to skip re-rendering when its props are the same as on last render by wrapping it in memo.

With this change, List will skip re-rendering if all of its props are the same as on the last render. This is where caching the calculation becomes important! Imagine that you calculated visibleTodos without useMemo.

In the above example, the filterTodos function always creates a different array, similar to how the {} object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that List props will never be the same, and your memo optimization won’t work. This is where useMemo comes in handy.

By wrapping the visibleTodos calculation in useMemo, you ensure that it has the same value between the re-renders (until dependencies change). You don’t have to wrap a calculation in useMemo unless you do it for some specific reason. In this example, the reason is that you pass it to a component wrapped in memo, and this lets it skip re-rendering.

<div style="background: DarkRed;  padding: 0.3rem 0.8rem;">Remember that only if those callback functions return objects(which includes functions as well in JS), then only their reference will change on render of component. Other data types like Number, Boolean, etc won't change on render of component which means it will be useless to memoize them just for the purpose of skipping re-render of child component.</div>

<h3 style="text-decoration: underline;">3. Memoizing a dependency of another Hook</h3>

Consider the below code:
```js
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: "whole-word", text };
  // const searchOptions = useMemo(() => ({ matchMode: 'whole-word', text }), [text]);

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩 Caution: Dependency on an object created in the component body
  // ...
}
```

Depending on an object like this defeats the point of memoization. When a component re-renders, all of the code directly inside the component body runs again. The lines of code creating the searchOptions object will also run on every re-render. Since searchOptions is a dependency of your useMemo call, and it’s different every time, React knows the dependencies are different, and recalculate searchItems every time.

To fix this, you could memoize the searchOptions object itself before passing it as a dependency. [REMEMBER THE 2nd POINT'S HIGHLIGHTED TEXT HERE AS WELL].

</div>

<!-- <div style="background: DarkRed;  padding: 0.3rem 0.8rem;"> => HIGHLIGHT -->
<!-- <h3 style="text-decoration: underline;"> => SUBHEADING -->
<!-- <span style="color: Chartreuse;"> => IMPORTANT-1 -->
<!-- <i> => IMPORTANT-2 -->
<!-- <mark style="padding: 0.3rem 0.8rem;"> => IMPORTANT-3 -->
<!-- <b> => IMPORTANT-5 -->
<!-- <b style="color:red;"> => NOTE -->
<!-- <br><span style="color: Cyan;">-></span> -->
