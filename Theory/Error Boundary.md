<div style="font-size: 17px;background: black;padding: 2rem;">

A JavaScript error in a part of the UI shouldn’t break the whole app. To solve this problem for React users, React 16 introduced a new concept of an “error boundary”.
<br><br>
<b><i>Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.</i></b>

<div style="border: 1px solid yellow; padding: 10px;">
<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Error boundaries do not catch errors for:</h3>

- Event handlers [`try...catch` could be used for that]
- Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
- Server side rendering
- Errors thrown in the error boundary itself (rather than its children)
</div>

<br>

A `class component` becomes an `error boundary` if it defines either (or both) of the lifecycle methods <b style="color: Chartreuse;">static getDerivedStateFromError()</b> or <b style="color: Yellow;">componentDidCatch()</b>. Use `static getDerivedStateFromError()` to render a fallback UI after an error has been thrown. Use `componentDidCatch()` to log error information.

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

Then you can use it as a regular component:

```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Error boundaries work like a JavaScript `catch {}` block, but for components. <span style="color: Cyan;">Only class components can be error boundaries</span>. In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.

Note that <span style="color: Magenta;">error boundaries only catch errors in the components below them in the tree</span>. An error boundary can’t catch an error within itself. If an error boundary fails trying to render the error message, the error will propagate to the closest error boundary above it. This, too, is similar to how the `catch {}` block works in JavaScript.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Where to Place Error Boundaries</h3>

The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like how server-side frameworks often handle crashes. You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.

<div style="background: DarkRed;padding: 0.3rem 0.8rem; font-weight: bold;"> INSTEAD OF CREATING OWN ERROR BOUNDARY, WE CAN USE THIS LIBRARY : <a href="https://www.npmjs.com/package/react-error-boundary">react-error-boundary</a></div>

</div>

<!-- <div style="font-size: 17px;background: black;padding: 2rem;"> -->
<!-- <div style="background: DarkRed;padding: 0.3rem 0.8rem;"> [HIGHLIGHT] -->
<!-- <h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;"> [SUBHEADING] -->
<!-- <b style="color: Chartreuse;"> [NOTE] -->
<!-- <b style="color:red;"> [NOTE-2] -->
<!-- <span style="color: Cyan;"> [IMP] -></span> -->
<!-- <b style="color: Salmon;"> [POINT] -->
<!-- <div style="border: 1px solid yellow; padding: 10px;"> [BORDER] -->
