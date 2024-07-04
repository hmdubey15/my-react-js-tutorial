<div style="font-size: 17px;background: black;padding: 2rem;">

## Bundling

Most React apps will have their files “bundled” using tools like `Webpack`, `Rollup` or `Browserify`. Bundling is the process of following imported files and merging them into a single file: a “bundle”. This bundle can then be included on a webpage to load an entire app at once. For example:

<h4>App</h4>

```js
// app.js
import { add } from './math.js';
console.log(add(16, 26)); // 42
```

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

<h4>Bundle</h4>

```js
function add(a, b) {
  return a + b;
}
console.log(add(16, 26)); // 42
```

<div style="background: Azure; color: black; padding: 0.3rem 0.8rem;">
<b>Note:</b> <p>Your bundles will end up looking a lot different than this.</p>
</div>

<br>

<h3>There are several advantages to bundling in React:</h3>

- <b style="color: Salmon;">Improved performance:</b> Bundling can improve the performance of a React application by reducing the number of HTTP requests that need to be made. This is because the browser can download the entire bundle in a single request, rather than having to make multiple requests for each individual file.

- <b style="color: Salmon;">Reduced file size:</b> Bundling can also reduce the overall file size of a React application. This is because the bundler can remove unnecessary whitespace and comments from the code, and it can also minify the code to make it smaller.

- <b style="color: Salmon;">Simplified development:</b> Bundling can simplify the development process by making it easier to manage the dependencies of a React application. The bundler can automatically resolve all of the dependencies and include them in the bundle, which can save developers a lot of time and effort.

- <b style="color: Salmon;">Improved caching:</b> Bundling can improve the caching of a React application. This is because the browser can cache the entire bundle, rather than having to cache each individual file.

- <b style="color: Salmon;">Better security:</b> Bundling can improve the security of a React application by making it more difficult for attackers to inject malicious code into the application. This is because the bundler can minify and obfuscate the code, which can make it more difficult for attackers to understand and exploit.

- <b style="color: Salmon;">Easier deployment:</b> Bundling can make it easier to deploy a React application. This is because the entire application can be deployed in a single file, rather than having to deploy multiple files.
<br>

If you’re using `Create React App`, `Next.js`, `Gatsby`, or a similar tool, you will have a `Webpack` setup out of the box to bundle your app. If you aren’t, you’ll need to set up bundling yourself. For example, see the Installation and Getting Started guides on the `Webpack` docs.

<br>

# Code Splitting

Bundling is great, but as your app grows, your bundle will grow too. Especially if you are including large third-party libraries. You need to keep an eye on the code you are including in your bundle so that you don’t accidentally make it so large that your app takes a long time to load.

To avoid winding up with a large bundle, it’s good to get ahead of the problem and start “splitting” your bundle. <b style="color: Chartreuse;">Code-Splitting</b> is a feature supported by bundlers like `Webpack`, `Rollup` and `Browserify (via factor-bundle)` which can create multiple bundles that can be dynamically loaded at runtime.

Code-splitting your app can help you <b style="color: CadetBlue;">“lazy-load”</b> just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

Suppose your component consists of `h1`, `div` & `MyComponent` and `MyComponent` is very heavy. What we can do is apply `lazy loading` on it and let reast of the things load.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">import()</h3>

The best way to introduce code-splitting into your app is through the dynamic <b style="color:red;">import()</b> syntax.

<h4>Before:</h4>

```js
import { add } from './math';
console.log(add(16, 26));
```

<h4>After:</h4>

```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

When `Webpack` comes across this syntax, it automatically starts code-splitting your app. If you’re using `Create React App`, this is already configured for you and you can start using it immediately. It’s also supported out of the box in `Next.js`.

If you’re setting up `Webpack` yourself, you’ll probably want to read <a href="https://webpack.js.org/guides/code-splitting/">Webpack’s guide on code splitting</a>. Your Webpack config should look vaguely like <a href="https://legacy.reactjs.org/docs/code-splitting.html#:~:text=should%20look%20vaguely-,like%20this,-.">this</a>.

When using `Babel`, you’ll need to make sure that `Babel` can parse the dynamic import syntax but is not transforming it. For that you will need `@babel/plugin-syntax-dynamic-import`.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">React.lazy</h3>

The <b style="color:Orange;">React.lazy</b> function lets you render a dynamic import as a regular component.

<b>Before:</b> `import OtherComponent from './OtherComponent';`

<b>After:</b> `const OtherComponent = React.lazy(() => import('./OtherComponent'));`

This will automatically load the bundle containing the `OtherComponent` when this component is first rendered.

`React.lazy` takes a function that must call a dynamic `import()`. This must return a `Promise` which resolves to a module with a `default` export containing a React component.

The lazy component should then be rendered inside a <b style="color: Orchid;">Suspense</b> component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

The `fallback` prop accepts any React elements that you want to render while waiting for the component to load. You can place the `Suspense` component anywhere above the lazy component. <span style="color: Cyan;">You can even wrap multiple lazy components with a single 'Suspense' component</span>.


<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Avoiding fallbacks</h3>

Any component may suspend as a result of rendering, even components that were already shown to the user. In order for screen content to always be consistent, if an already shown component suspends, React has to hide its tree up to the closest `<Suspense>` boundary. However, from the user’s perspective, this can be disorienting.

Consider this tab switcher:

```js
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');
  
  function handleTabSelect(tab) {
    setTab(tab);
  };

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}
```

In this example, if tab gets changed from `'photos'` to `'comments'`, but `Comments` suspends, the user will see a glimmer. This makes sense because the user no longer wants to see `Photos`, the `Comments` component is not ready to render anything, and React needs to keep the user experience consistent, so it has no choice but to show the `Glimmer` above.

However, sometimes this user experience is not desirable. In particular, it is sometimes better to show the “old” UI while the new UI is being prepared. You can use the new <b style="color: Salmon;">startTransition</b> API to make React do this:

```js
function handleTabSelect(tab) {
  startTransition(() => {
    setTab(tab);
  });
}
```

Here, you tell React that setting tab to `'comments'` is not an urgent update, but is a `transition` that may take some time. React will then keep the old UI in place and interactive, and will switch to showing `<Comments />` when it is ready. 

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Error Boundaries</h3>

If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with Error Boundaries. Once you’ve created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there’s a network error.

```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Route-based code splitting</h3>

Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won’t disrupt the user experience.

A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

Here’s an example of how to setup route-based code splitting into your app using libraries like `React Router` with `React.lazy`.

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

<h4>Working mechanism for this</h4>

- When a user navigates to a specific route in your application (e.g.,` /about`), React Router matches the URL against the defined routes in your application to determine which component should be rendered. 
- When the route matches a component that has been lazily loaded using `React.lazy`, React triggers the dynamic import statement associated with that component. This initiates the process of asynchronously loading the code bundle for that component from the server. 
- While the code bundle for the lazy-loaded component is being loaded, React displays a fallback UI specified by the `Suspense` component. 
- Once the code bundle for the lazy-loaded component is loaded and evaluated, React renders the component as usual, replacing the fallback UI with the actual component content.

</div>

<!-- <div style="font-size: 17px;background: black;padding: 2rem;"> -->
<!-- <div style="background: DarkRed;padding: 0.3rem 0.8rem;"> [HIGHLIGHT] -->
<!-- <h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;"> [SUBHEADING] -->
<!-- <b style="color: Chartreuse;"> [NOTE] -->
<!-- <b style="color:red;"> [NOTE-2] -->
<!-- <span style="color: Cyan;"> [IMP] -></span> -->
<!-- <b style="color: Salmon;"> [POINT] -->
<!-- <div style="border: 1px solid yellow; padding: 10px;"> [BORDER] -->
