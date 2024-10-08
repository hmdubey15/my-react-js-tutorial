<div style="font-size: 17px;background: black;padding: 2rem;">

# Props

<b><i>React components use props(stand for properties) to communicate with each other. Every parent component can pass some information to its child components by giving them props.</b></i> Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

Props are the information that we pass to a JSX tag. For example, className, src, alt, width, and height are some of the props we can pass to an `<img>`. The props we can pass to an `<img>` tag are predefined (ReactDOM conforms to the HTML standard). But <span style="color: CornflowerBlue;">we can pass any props to our own components</span> to customize them.

<h3 style="text-decoration: underline;">Steps to use props:</h3>

(1) Pass data like attributes from parent component to child component.

```js
// ParentComponent.js
export default function ParentComponent() {
  return <ChildComponent name="HD" birthDay="3_Oct" />;
}
```

(2) Child component will receive the argument as an object (conventionally named `props`). This object will have its keys as 'attributes' and values as 'values' of passed down props.

```js
// ChildComponent.js
export default function ChildComponent(props) {
  console.log(props); // OUTPUT = { name="HD", birthDay="3_Oct" }
  return null;
}
```

<i>Generally we destructure the props object to access the individual prop values.</i>

```js
const { name, birthDay } = props;
```

<h3 style="text-decoration: underline;">Forwarding props with the JSX spread syntax</h3>

Sometimes, passing props gets very repetitive. Suppose a situation occurs where a component A has to forward all its received props to its child component B and it is not using any of it. We can use `JSX Spread Syntax` to forward them directly like this insted of destructuring them and sending them one by one.

```js
export default function A(props) {
  return <B {...props} />;
}
```

<i>We can pass normal objects also like this instead of received props.</i>

<h3 style="text-decoration: underline;">Passing JSX as children</h3>

It is common to nest built-in browser tags: `<div><img /></div>` but sometimes we'll want to nest our own components the same way:

```js
<Card>
  <Avatar />
</Card>
```

<span style="color: Chartreuse;">When you nest content inside a JSX tag, the parent component will receive that content in a prop called children.</span>

<b style="color:red;">NOTE</b> : Props are immutable - a term from computer science meaning “unchangeable”. When a component needs to change its props (for example, in response to a user interaction or new data), it will have to “ask” its parent component to pass it different props—a new object! Its old props will then be cast aside, and eventually the JavaScript engine will reclaim the memory taken by them.

<h3 style="text-decoration: underline;">Setting Default Props</h3>

If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting = and the default value right after the parameter:

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

The other way to define default props is by using the `defaultProps` property.

```js
function Avatar({ person, size }) {
  // ...
}

Avtar.defaultProps = {
  person: {},
  size: 100,
};
```

<br>

# Props Validation

Props validation helps ensure that the correct data types and required props are passed to your components, improving code reliability and making it easier to debug issues related to incorrect prop usage. We use package `prop-types` to define the prop types and validate them. We need to install it: `npm install prop-types`.

We import `PropTypes` from the prop-types library. Then, we define the data types of props and their validation rules using the `propTypes` property of the functional component. Before the release of React 15.5.0 version `PropTypes` was available in the react package only.

```js
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = (props) => {
  return <div>{props.message}</div>;
};

MyComponent.propTypes = {
  message: PropTypes.string.isRequired, // A required string prop
  count: PropTypes.number, //  An optional number prop
  isAwesome: PropTypes.bool.isRequired, // A required boolean prop.
  onClick: PropTypes.func, // An optional function prop.
};

export default MyComponent;

```

<h3 style="text-decoration: underline;">Here's a brief explanation of some common PropTypes: </h3>

- <b>PropTypes.string</b>: Validates that the prop is a string.
- <b>PropTypes.number</b>: Validates that the prop is a number.
- <b>PropTypes.bool</b>: Validates that the prop is a boolean.
- <b>PropTypes.func</b>: Validates that the prop is a function.
- <b>PropTypes.array</b>: Validates that the prop is an array.
- <b>PropTypes.object</b>: Validates that the prop is an object.
- <b>PropTypes.element</b>: Validates that the prop is a React element.
- <b>PropTypes.oneOf</b>: Allows you to define a list of allowed values that a prop can take. It validates that the prop value matches one of the specified values in the array. `PropTypes.oneOf(['active', 'inactive', 'pending'])`
- <b>PropTypes.oneOfType</b>: Allows you to specify an array of different prop types that the prop can accept. It validates that the prop value matches at least one of the specified prop types. Example - `PropTypes.oneOfType([PropTypes.string, PropTypes.number])`
- <b>PropTypes.arrayOf</b>: An array of a certain type of elements
- <b>PropTypes.objectOf</b>: An object with property values of a certain type
- <b>PropTypes.shape</b>: An object taking on a particular shape . Example - `PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  })`
- <b>PropTypes.exact</b>: Works same as shape one but with warnings on extra properties

Refer this link for more details - https://legacy.reactjs.org/docs/typechecking-with-proptypes.html 

For the `isRequired` modifier, it indicates that the prop is mandatory and should be provided when using the component.

If the prop does not match the specified type or is missing when it is required, React will log a warning in the console. This can help catch potential issues during development and maintain better code quality.

It is important to note that prop validation is only checked in development mode. In production mode, React will skip the validation to improve performance. Therefore, it is recommended to thoroughly test your components during development to ensure the correct usage of props.


</div>

<!-- <h3 style="text-decoration: underline;"> => SUBHEADING -->
<!-- <span style="color: Chartreuse;"> => IMPORTANT-1 -->
<!-- <i> => IMPORTANT-2 -->
<!-- <mark style="padding: 0.3rem 0.8rem;"> => IMPORTANT-3 -->
<!-- <b> => IMPORTANT-5 -->
<!-- <b style="color:red;"> => NOTE -->
