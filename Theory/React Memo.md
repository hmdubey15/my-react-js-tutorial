<div style="font-size: 17px;background: black;padding: 2rem;">

<b><i>`memo` is a higher-order component (HOC) provided by React that can be used to optimize functional components by preventing unnecessary re-renders. It's similar in concept to `PureComponent` for class components. When you wrap a component with `memo`, it will only re-render if its props have changed.</b></i>

When you wrap a component with `memo`, it checks the previous props and the new props. If the props are shallowly equal (using the === comparison), React will skip re-rendering that component and reuse the previously rendered result.

Syntax:
```js
const MemoizedComponent = React.memo(SomeComponent, arePropsEqual?);
```

- <b>`Component`:</b> The component that you want to memoize. The memo does not modify this component, but returns a new, memoized component instead which behaves the same as the component provided to it except that React will not always re-render it when its parent is being re-rendered unless its props have changed. Any valid React component, including functions and forwardRef components, is accepted.

- <b>optional `arePropsEqual`:</b> A function that accepts two arguments: the component’s previous props, and its new props. It should return true if the old and new props are equal: that is, if the component will render the same output and behave in the same way with the new props as with the old. Otherwise it should return false. Usually, you will not specify this function. By default, React will compare each prop with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is">Object.is</a>.

In the below example, `Greeting` component will re-render only if `name` prop changes on re-render of its parent component. If we remove, `React.memo`, it will re-render every time its parent component re-renders even if received props do not change.

```js
const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default React.memo(Greeting);
```

<div style="background: DarkRed;  padding: 0.3rem 0.8rem;">A React component should always have pure rendering logic. This means that it must return the same output if its props, state, and context haven’t changed. By using memo, you are telling React that your component complies with this requirement, so React doesn’t need to re-render as long as its props haven’t changed. Even with memo, your component will re-render if its own state changes or if a context that it’s using changes. Memoization only has to do with props that are passed to the component from its parent.
</div>

<br>

<b style="color:red;">IMPORTANT:</b> You should only rely on memo as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add memo to improve performance.



</div>

<!-- <div style="background: DarkRed;  padding: 0.3rem 0.8rem;"> => HIGHLIGHT -->
<!-- <h3 style="text-decoration: underline;"> => SUBHEADING -->
<!-- <span style="color: Chartreuse;"> => IMPORTANT-1 -->
<!-- <i> => IMPORTANT-2 -->
<!-- <mark style="padding: 0.3rem 0.8rem;"> => IMPORTANT-3 -->
<!-- <b> => IMPORTANT-5 -->
<!-- <b style="color:red;"> => NOTE -->
<!-- <br><span style="color: Cyan;">-></span> -->
