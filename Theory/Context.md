<div style="font-size: 17px;background: black;padding: 2rem;">

<b><i>Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.</i></b>

<h3 style="text-decoration: underline;">The problem with passing props</h3>

Passing props is a great way to explicitly pipe data through your UI tree to the components that use it.

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and lifting state up that high can lead to a situation called “prop drilling”.

<img src="../public/images/Context_1.png" height="300rem" width="700rem" style="margin-left: 18%; border: 0.15rem solid red"/><br>

Wouldn’t it be great if there were a way to “teleport” data to the components in the tree that need it without passing props? With React’s context feature, there is!

`Context` lets a parent component provide data to the entire tree below it. This is particularly useful when you have data that many components in different parts of your application need access to, such as user authentication, theme preferences, or language settings.

<h3 style="text-decoration: underline;">STEPS FOR USING CONTEXT</h3>

<h4>1. Create the context: </h4>

First, you need to create a context using the <b style="color: Chartreuse;">createContext</b> API of React. It returns a context object that consists of a `Provider` component and a `Consumer` component (though the Consumer is often used with class components and in some specific cases). The only argument it takes is the default value - the value that you want the context to have when there is no matching context provider in the tree above the component that reads context.

```js
// userContext.js
import React from 'react';
const defaultValue = 'Default Context Value'
export const UserContext = React.createContext(defaultValue);
```

<h4>2. Provide the context</h4>

Wrap the part of your component tree that needs access to the context data with the Provider component. This is usually done at the highest level where the context data is available.
<br>

```js
// ParentComponent.js
import React from "react";
import ChildComponent from "./ChildComponent";
import { UserContext } from "./userContext";
const ParentComponent = () => {
  return (
    <UserContext.Provider value="Congrats! You Have Succesfully Provided Context Value!" >
      <ChildComponent />
    </UserContext.Provider>
  );
};
export default ParentComponent;
```

<h4>3. Consuming Context Data</h4>

To access the context data within your functional components, use the <b style="color: Chartreuse;">useContext</b> hook. It only takes `SomeContext`(the context that you’ve previously created with `createContext`) as argument and returns the context value for the calling component. It is determined as the `value` passed to the closest `SomeContext.Provider` above the calling component in the tree. If there is no such provider, then the returned value will be the `defaultValue` you have passed to `createContext` for that context. The returned value is always up-to-date. <b style="color:red;">React automatically re-renders components that read some context if it changes.</b>

```js
// ChildComponent.js
import React from "react";
import GrandChildComponent from "./GrandChildComponent";
const ChildComponent = () => {
  return <GrandChildComponent />;
};
export default ChildComponent;
```

```js
// GrandChildComponent.js
import React, { useContext } from "react";
import { UserContext } from "./userContext";
const GrandChildComponent = () => {
  const value = useContext(UserContext);
  return <div>Context Usability via useContext method Status : {value}</div>; //We get value passed from ParentComponent
};
export default GrandChildComponent;
```

<h3 style="text-decoration: underline;">Updating data passed via context</h3> 

Often, you’ll want the context to change over time. To update context, combine it with state. Declare a state variable in the parent component, and pass the current state down as the context value to the provider.

```js
function MyPage() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
        Switch to light theme
      </Button>
    </ThemeContext.Provider>
  );
}
```

</div>

<!-- <div style="background: DarkRed;  padding: 0.3rem 0.8rem;"> => HIGHLIGHT -->
<!-- <h3 style="text-decoration: underline;"> => SUBHEADING -->
<!-- <b style="color: Chartreuse;"> => IMPORTANT-1 -->
<!-- <i> => IMPORTANT-2 -->
<!-- <mark style="padding: 0.3rem 0.8rem;"> => IMPORTANT-3 -->
<!-- <b> => IMPORTANT-5 -->
<!-- <b style="color:red;"> => NOTE -->
<!-- <br><span style="color: Cyan;">-></span> -->
