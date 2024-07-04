<div style="font-size: 17px;background: black;padding: 2rem;">

<b><i>React applications are built from isolated pieces of UI called components. A React component is a JavaScript function that you can sprinkle with markup(similar to HTML). Components can be as small as a button, or as large as an entire page.</b></i>

On the Web, HTML lets us create rich structured documents with its built-in set of tags like `<h1>` and `<li>`. React lets us combine our markup, CSS, and JavaScript into custom “components”, reusable UI elements for your app. Defining a component:

```js
export default function Welcome() {
  return <div>Welcome to the world of React!</div>;
}
```

<h3 style="text-decoration: underline;">And here’s how to build a component:</h3>

1. <b>Export the component</b>: The export default prefix is a standard JavaScript syntax (not specific to React). It lets you mark the main function in a file so that you can later import it from other files. (More on importing in Importing and Exporting Components!)

2. <b>Define the function</b>: With `function Welcome() { }` you define a JavaScript function with the name `Welcome`. <span style="color: Chartreuse;">Remember that name of components must start with a capital letter or they won’t work!</span> This is because what browser sees is that when tag starts with small letter, React knows we are referring to HTML tag while when it starts with capital letter, React knows that we want to use our component called Welcome.

3. <b>Add markup</b>: The component returns a `div` tag. This tag is written like HTML, but it is actually JavaScript under the hood! This syntax is called `JSX`, and it lets you embed markup inside JavaScript. <span style="color: Chartreuse;">If your markup isn’t all on the same line as the return keyword, you must wrap it in a pair of parentheses otherwise any code on the lines after return will be ignored!</span>

<h3 style="text-decoration: underline;">Nesting and organizing components</h3>

Components are regular JavaScript functions, so you can keep multiple components in the same file. This is convenient when components are relatively small or tightly related to each other. If this file gets crowded, you can always move Profile to a separate file.

```js
export default function Gallery() {
  // ...
}
// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

Because the Profile components are rendered inside Gallery—even several times!—we can say that Gallery is a parent component, rendering each Profile as a “child”. This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like.

<b style="color: Orange;"><i>NOTE:</i></b> Components can render other components, but you must never nest their definitions. This makes code very slow and causes bugs. Instead, define every component at the top level like above, not like this:

```js
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

<i>When a child component needs some data from a parent, pass it by props instead of nesting definitions.</i>

<br>

# JSX (JavaScript XML)

<b><i>JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.</b></i> Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.

Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information. The best way to understand this is to convert some HTML markup to JSX markup.

<h3 style="text-decoration: underline;">Rules of JSX</h3>

1. <b>Return a single root element</b>: To return multiple elements from a component, wrap them with a single parent tag. For example, you can use a `<div>`. If you don’t want to add an extra `<div>` to your markup, you can write <> and </> instead. This empty tag is called a `Fragment`. Fragments let you group things without leaving any trace in the browser HTML tree. (Will read it in detail later). <span style="color: Chartreuse;">JSX tags need to be wrapped because JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.</span>

2. <b>Close all the tags</b>: JSX requires tags to be explicitly closed: self-closing tags like `<img>` must become `<img />`.

3. <b>camelCase all most of the thing</b>: JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names. For example, their names can’t contain dashes or be reserved words like class. This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of `stroke-width` you use `strokeWidth`. Since `class` is a reserved word, in React you write `className` instead

<h3 style="text-decoration: underline;">JavaScript in JSX with Curly Braces</h3>

JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place. Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to open a window to JavaScript.

When you want to pass a string attribute to JSX, you put it in single or double quotes. But what if you want to dynamically specify the src or alt text? You could <span style="color: Chartreuse;">use a value from JavaScript by replacing " and " with { and }</span>

```js
export default function Avatar() {
  const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
  const description = "Gregorio Y. Zara";
  return <img className="avatar" src={avatar} alt={description} />;
}
```

JSX is a special way of writing JavaScript. That means it’s possible to use JavaScript inside it—with curly braces { }. The example below first declares a name for the scientist, name, then embeds it with curly braces inside the `<h1>`:

```js
export default function TodoList() {
  const name = "Gregorio Y. Zara";
  return <h1>{name}'s To Do List</h1>;
}
```

<h3 style="text-decoration: underline;">Where to use curly braces?</h3>

You can only use curly braces in two ways inside JSX:

1. <b>As text directly inside a JSX tag:</b> `<h1>`{name}'s To Do List`</h1>` works, but <{tag}>Gregorio Y. Zara's To Do List</{tag}> will not.

2. <b>As attributes immediately following the `=` sign</b>: src={avatar} will read the avatar variable, but src="{avatar}" will pass the string "{avatar}".

<h3 style="text-decoration: underline;">Adding CSS in JSX</h3>

Generally two ways are used for adding CSS in React:

<b>(1) INLINE STYLING</b>

When we need an inline style, we pass an object to the `style` attribute like this:

```js
export default function Welcome() {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "pink",
      }}
    >
      There's no such thing as bad ideas. It's just poorly executed and awesome
      ones.
    </div>
  );
}
```

<b>NOTE: </b>As shown above, <i>Inline style properties are written in camelCase.</i>

<b>(2) CSS STYLESHEET</b>

You can write your CSS styling in a separate file, just save the file with the .css file extension, and import it in your application like the below code:

```js
import React from "react";
import "./Component.css";

const Component = () => {
  return <div className="component-container">Content goes here</div>;
};

export default Component;
```

```css
/* Component.css */
.component-container {
  padding: 20px;
  background-color: #f0f0f0;
}
```

<b style="color: Red;">NOTE:</b> We can use the `id` attribute for adding CSS styles to elements in React, just like we would in regular HTML. However, it is generally not recommended to use it, especially when we have multiple instances of the same component on the page because IDs are unique in the HTML document and if we reuse the same component multiple times on the page, applying styles via IDs could lead to global styles and cause conflicts. Instead of using IDs, it is a common best practice in React to use class names for styling elements. This approach promotes better encapsulation, reusability, and maintainability of components.

<br>

# Conditional Rendering

Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `?` `:` operators. Example code:

```js
export default function CompilerMsg() {
  const hasErrorOccured = true;
  if (hasErrorOccured) return <div>An Error Has Occured!</div>;
  return <div>Program Compiled Succesfully!</div>;
}
```

<i>In some situations, you won’t want to render anything at all. In that case, you can return `null`. </i>

<h3 style="text-decoration: underline;">Conditional (Ternary) Operator </h3>

We can use this conditional rendering inside JSX as well. This can prevent code duplication.

```js
export default function PetName() {
  const isDog = true;
  <div>
    <h1>Pet Name:</h1>
    {isDog ? <div>Animal is Dog</div> : <div>Animal is not Dog</div>}
  </div>;
}
```

<h3 style="text-decoration: underline;">Conditionally assigning JSX to a variable</h3>

We can store JSX in any variable for using it repeatedly. Like this:

```js
const headingComp = (
  <div>
    <h1>This is Heading</h1>
    <h2>This is subheading</h2>
  </div>
);
```

<h3 style="text-decoration: underline;">Logical AND operator (&&)</h3>

Inside React components, it often comes up when you want to render some JSX when the condition is true, or render nothing otherwise. With &&, you could conditionally render the component only if required condition is fulfilled - `{cond && <A />}`.

<i><b>NOTE:</b></i> Don’t put numbers on the left side of &&. Make the left side always a boolean.

# Rendering Lists

You will often want to display multiple similar components from a collection of data. In React, when you have an array of JSX elements, it effectively becomes a list of JSX items due to the way React processes and renders them. You can use the JavaScript array methods like `map()`, `filter()`, etc. to manipulate an array of data. Example -

```js
export default function TestComponent() {
  const dataArr = [1, 2, 3, 4];
  const numbersList = dataArr.map((data) => <div>{data}</div>);
  return <div>{numbersList}</div>;
}
```

<b style="color: Orange;">NOTE:</b> Above code will result in a warning in console - <span style="color: rgb(166, 66, 58);">Warning: Each child in a list should have a unique “key” prop.</span> You need to give each array item a `key` — a string or a number that uniquely identifies it among other items in that array. JSX elements directly inside a `map()` call always need keys! Modify above code like this:

```js 
...
const numbersList = dataArr.map((data) => <div key={data}>{data}</div>);
...
```

Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.

Also remember that every time a component's key changes, React will create a new component instance rather than updating the current one, so for performance's sake using Math.random() will be sub-optimal to say the least. Index from `map()` can be used as key if we are sure that we won't re-order/delete the elements.

<div style="border: 1px solid yellow; padding: 10px;">

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block; color: Red;">Avoid using index argument of map as key!!!</h3>

Let's say the parent component gets an array of 10 items and renders 10 components based on the array. Suppose the 5th item is then removed from the array. On the next render the parent will receive an array of 9 items and so React will render 9 components. This will show up as the 10th component getting removed, instead of the 5th, because React has no way of differentiating between the items based on index. Therefore always use a unique identifier as a key for components that are rendered from an array of items.

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
