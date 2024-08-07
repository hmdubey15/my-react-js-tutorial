<div style="font-size: 17px;background: black;padding: 2rem;">

In the section on Higher Order Components, we saw that being able to reuse component logic can be very convenient if multiple components need access to the same data, or contain the same logic.

Another way of making components very reusable, is by using the `render prop` pattern.

<b><i>The Render Props is a technique in ReactJS for sharing code between React components using a prop whose value is a function. Child component takes render props as a function and calls it instead of implementing its own render logic. In brief, we pass a function from the parent component to the child component as a render props, and the child component calls that function instead of implementing its own logic.</i></b>

Consider the problem situation of HOC doc!! (All files in same folder)

```js
// RenderPropsTestComponent.js
import React from "react";
import HoverCounter from "./HoverCounter";
import ClickCounter from "./ClickCounter";
import Counter from "./Counter";
const RenderPropsTestComponent = () => {
  return (
    <>
      <h1>Render Props Testing</h1>
      <Counter render={(count, incrementCount) => <ClickCounter count={count} incrementCount={incrementCount} />} />
      <Counter render={(count, incrementCount) => <HoverCounter count={count} incrementCount={incrementCount} />} />
    </>
  );
};
export default RenderPropsTestComponent;
```

```js
// Counter.js
import { useState } from "react";
const Counter = ({ render }) => {
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount((count) => count + 1);
  };
  return render(count, incrementCount);
};
export default Counter;
```

```js
// ClickCounter.js
import React from "react";
const ClickCounter = (props) => {
  const { count, incrementCount } = props;
  return <button onClick={incrementCount}>Clicked {count} times on me!</button>;
};
export default ClickCounter;
```

```js
// HoverCounter.js
import React from "react";
const HoverCounter = (props) => {
  const { count, incrementCount } = props;
  return <h2 onMouseOver={incrementCount}>Hovered {count} times on me!</h2>;
};
export default HoverCounter;
```

Although they're called `render props`, a `render` prop doesn't have to be called `render`. Any prop that renders JSX is considered a render prop!

Remember that while render props can be powerful, overusing them might lead to more complex and nested components. As an alternative, you can also consider using React's context or custom hooks, depending on your use case.

</div>

<!-- <div style="background: DarkRed;  padding: 0.3rem 0.8rem;"> => HIGHLIGHT -->
<!-- <h3 style="text-decoration: underline;"> => SUBHEADING -->
<!-- <b style="color: Chartreuse;"> => IMPORTANT-1 -->
<!-- <i> => IMPORTANT-2 -->
<!-- <mark style="padding: 0.3rem 0.8rem;"> => IMPORTANT-3 -->
<!-- <b> => IMPORTANT-5 -->
<!-- <b style="color:red;"> => NOTE -->
<!-- <br><span style="color: Cyan;">-></span> -->
