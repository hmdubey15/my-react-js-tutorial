<div style="font-size: 17px;background: black;padding: 2rem;">

In React, the <b style="color: Orange;">createPortal</b> function is a way to render components outside of their normal parent hierarchy in the DOM tree. This is particularly useful when you want to render a component at a different location in the DOM hierarchy than its parent, without breaking the encapsulation and structure of your components.

`createPortal(children, domNode, key?)`

Example: 
```js
import { createPortal } from 'react-dom';

// ...

<div>
  <p>This child is placed in the parent div.</p>
  {createPortal(
    <p>This child is placed in the document body.</p>,
    document.body
  )}
</div>
```

<b style="color:lightgreen;">A portal only changes the physical placement of the DOM node. In every other way, the JSX you render into a portal acts as a child node of the React component that renders it.</b> For example, the child can access the context provided by the parent tree, and events bubble up from children to parents according to the React tree.

<b><i>Parameters: </b></i>
- `children`: Anything that can be rendered with React, such as a piece of JSX (e.g. `<div />` or `<SomeComponent />`), a Fragment (<>...</>), a string or a number, or an array of these.

- `domNode`: Some DOM node, such as those returned by `document.getElementById()`. The node must already exist. Passing a different DOM node during an update will cause the portal content to be recreated.

- `optional key`: A unique string or number to be used as the portal’s key.

<b><i>Returns: </b></i><br>
`createPortal` returns a React node that can be included into JSX or returned from a React component. If React encounters it in the render output, it will place the provided children inside the provided domNode.

The primary use case for `createPortal` is for rendering components like modals, tooltips, popovers, and any other UI elements that need to be positioned outside the regular flow of your component hierarchy.

</div>

<!-- <div style="font-size: 17px;background: black;padding: 2rem;"> -->
<!-- <div style="background: DarkRed;padding: 0.3rem 0.8rem;"> [HIGHLIGHT] -->
<!-- <h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;"> [SUBHEADING] -->
<!-- <b style="color: Chartreuse;"> [NOTE] -->
<!-- <b style="color:red;"> [NOTE-2] -->
<!-- <span style="color: Cyan;"> [IMP] -></span> -->
<!-- <b style="color: Salmon;"> [POINT] -->
<!-- <div style="border: 1px solid yellow; padding: 10px;"> [BORDER] -->
