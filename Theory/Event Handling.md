<div style="font-size: 17px;background: black;padding: 2rem;">

<b><i>React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on.</i></b>

Handling events with react have some syntactic differences from handling events on DOM. These are:

1. React events are named as camelCase instead of lowercase.
2. With JSX, a function is passed as the event handler instead of a string.

```js
export default function Button() {
  const handleClick = () => {
    alert("You clicked me!");
  };

  // Event declaration in plain HTML :- <button onclick="handleClick()">Click Me!</button>

  // Event declaration in React
  return <button onClick={handleClick}>Click Me!</button>;
}
```

You defined the handleClick function and then passed it as a prop to `<button>`. handleClick is an event handler. Event handler functions:

- Are usually defined inside your components.
- Have names that start with handle, followed by the name of the event.

By convention, it is common to name event handlers as `handle` followed by the event name. You’ll often see `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`, and so on.

Alternatively, you can define an event handler inline in the JSX:

```
<button onClick={() => { alert('You clicked me!'); }}>
```

<div style="background: DarkRed;  padding: 0.3rem 0.8rem;">
Functions passed to event handlers must be passed, not called. For example:

- passing a function (correct ✅) :

```
<button onClick={handleClick}>
```

- calling a function (incorrect ❌):

```
<button onClick={handleClick()}>
```

The difference is subtle. In the first example, the handleClick function is passed as an onClick event handler. This tells React to remember it and only call your function when the user clicks the button.

In the second example, the () at the end of handleClick() fires the function immediately during rendering, without any clicks. This is because JavaScript inside the JSX { and } executes right away.

</div>

<br>

# Event object

Event handlers receive an event object as their only argument. By convention, it’s usually called `e`, which stands for “event”. You can use this object to read information about the event like event object received in event handler attached to `onChange` for input field `<input />` will tell us the entered text. Best way is to console the event object and see how can we get the data required.

These events are called <b style="color:red;">Synthetic Events</b>. These events are custom event objects created by React that wrap around the native browser events. These synthetic events standardize the behavior of events across different browsers and provide a unified API for event handling in React applications. Synthetic events expose the same interface as native browser events, so developers can use familiar properties and methods (e.g., `stopPropagation()`, `preventDefault()`, `target`, `currentTarget`, etc.). For performance reasons, React implements event pooling. This means that the synthetic event objects are reused across different events. After the event callback has been invoked, all properties of the synthetic event are nullified. This helps in reducing memory overhead.

```js
const InputFieldTest = () => {
  const handleTextEntered = (e) => {
    console.log(e.target.value);
  };
  return <input onChange={handleTextEntered} />;
};
```

<h3 style="text-decoration: underline;">e.stopPropagation()</h3>

`stopPropagation` is a method that can be used to prevent the event from propagating further up the DOM tree. When an event is triggered on a particular element, it can also trigger the same event on its parent elements in the DOM hierarchy. This process is known as event propagation or event bubbling. All events propagate in React except `onScroll`, which only works on the JSX tag you attach it to. By calling `stopPropagation` on the event object inside an event handler, you can stop the event from propagating to its parent elements. This means that the event will only be handled by the element where it was originally triggered, and it won't trigger any further event handlers on its parent elements.

```js
import React from "react";

const MyComponent = () => {
  const handleButtonClick = (event) => {
    // Prevent the event from propagating to parent elements
    event.stopPropagation();

    // Your custom logic here
    console.log("Button clicked, event propagation stopped.");
  };

  return (
    <div onClick={() => console.log("Div clicked")}>
      <button onClick={handleButtonClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
```

In the example above, we have a button inside a `<div>` element. Both the button and the div have their own onClick event handlers. When the button is clicked, the event handler `handleButtonClick` is called. Inside the event handler, we call `event.stopPropagation()` to prevent the click event from propagating to the parent. `<div>`.

As a result, when you click the button, the event handler `handleButtonClick` is executed, and the message "Button clicked, event propagation stopped." will be logged to the console. However, the click event will not propagate to the `<div>` element, and the message "Div clicked" will not be logged to the console.

Using `stopPropagation` is helpful when you want to isolate the event handling to a specific element and prevent it from affecting its parent elements. It can be useful in situations where you have nested elements with event handlers, and you want to control which element's event handler should be executed without triggering the handlers on parent elements.

<h3 style="text-decoration: underline;">e.preventDefault()</h3>

In React event handling, `preventDefault` is a method that can be used to prevent the default behavior of an event. When an event occurs, such as clicking on a link or submitting a form, it may trigger some default actions that are built into the browser. For example, clicking on a link will navigate to the URL specified in the `href` attribute, and submitting a form will cause the form to be submitted, triggering a page refresh or a server request.

By calling `preventDefault` on the event object, you can stop these default actions from happening, allowing you to control the behavior of the event programmatically. It is commonly used in event handlers like `onClick` and `onSubmit` to intercept the default action and perform custom logic instead.

Here's an example of using `preventDefault` in React:

```js
import React from "react";

const MyComponent = () => {
  const handleLinkClick = (event) => {
    // Prevent the default behavior of the link click
    event.preventDefault();

    // Your custom logic here
    console.log("Link clicked, but the page did not navigate.");
  };

  return (
    <div>
      <a href="https://www.example.com" onClick={handleLinkClick}>
        Click Me
      </a>
    </div>
  );
};

export default MyComponent;
```

In the example above, we have a link `<a>` element with an `onClick` event handler `handleLinkClick`. When the link is clicked, the event handler is called. Inside the event handler, we call `event.preventDefault()` to prevent the browser from navigating to the URL specified in the `href` attribute. Instead, we perform our custom logic (in this case, logging a message to the console).

Similarly, you can use `preventDefault` in other event handlers like onSubmit for forms or other events where you want to stop the default behavior and handle the event in your own way.

Keep in mind that not all events have a default action, so using `preventDefault` is only necessary when you want to override the default behavior of specific events.

<br>

# Passing event handlers as props

Often you’ll want the parent component to specify a child’s event handler. Consider buttons: depending on where you’re using a Button component, you might want to execute a different function—perhaps one plays a movie and another uploads an image.

```js
// Button.js
export default function Button({ onClick }) {
  return <button onClick={onClick}>Click Me!</button>;
}
```

```js
// UploadImage.js
export default function UploadImage() {
  const handleUploadImage = () => {
    alert("Image Upload Process Initiated");
    // Image Upload Logic
  };
  return <Button onClick={handleUploadImage} />;
}
```

```js
// PlayMusic.js
export default function PlayMusic() {
  const handlePlayMusic = () => {
    alert("Music Start Process Initiated");
    // Play Music Upload Logic
  };
  return <Button onClick={handlePlayMusic} />;
}
```

<b style="color:red;">NOTE</b>: Built-in components like `<button>` and `<div>` only support browser event names like `onClick`. However, when you’re building your own components, you can name their event handler props any way that you like. Like in above example, instead of passing the prop named `onClick` in `Button` component, we could have passed `onSmash` prop. By convention, event handler props should start with `on`, followed by a capital letter.

<div style="background: DarkRed;  padding: 0.3rem 0.8rem;">
<b style="color:Yellow;">Can event handlers have side effects?</b>

<br>
<b style="color:Lime;">Absolutely! Event handlers are the best place for side effects.</b>

<br>
Unlike rendering functions, event handlers don’t need to be pure, so it’s a great place to change something—for example, change an input’s value in response to typing, or change a list in response to a button press. However, in order to change some information, you first need some way to store it. In React, this is done by using state, a component’s memory. You will learn all about it on the next page.
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