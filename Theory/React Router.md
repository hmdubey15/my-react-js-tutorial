<div style="font-size: 17px;background: black;padding: 2rem;">

In traditional websites, the browser requests a document from a web server, downloads and evaluates CSS and JavaScript assets, and renders the HTML sent from the server. When the user clicks a link, it starts the process all over again for a new page.

Client side routing allows your app to update the URL from a link click without making another request for another document from the server. Instead, your app can immediately render some new UI and make data requests to update the page with new information. This enables faster user experiences because the browser doesn't need to request an entirely new document or re-evaluate CSS and JavaScript assets for the next page.

React Router enables "client side routing".

## Definitions

- <b style="color:SpringGreen;">URL</b>: The URL in the address bar. A lot of people use the term "URL" and "route" interchangeably, but this is not a route in React Router, it's just a URL.
- <b style="color:SpringGreen;">Location</b>: This is a React Router specific object that is based on the built-in browser's `window.location` object. It represents "where the user is at". It's mostly an object representation of the URL but has a bit more to it than that.
- <b style="color:SpringGreen;">Location State</b>: A value that persists with a location that isn't encoded in the URL. Much like hash or search params (data encoded in the URL), but stored invisibly in the browser's memory.
- <b style="color:SpringGreen;">History Stack</b>: As the user navigates, the browser keeps track of each location in a stack. If you click and hold the back button in a browser you can see the browser's history stack right there.
- <b style="color:SpringGreen;">Client Side Routing (CSR)</b>: A plain HTML document can link to other documents and the browser handles the history stack itself. Client Side Routing enables developers to manipulate the browser history stack without making a document request to the server.
- <b style="color:SpringGreen;">History</b>: An object that allows React Router to subscribe to changes in the URL as well as providing APIs to manipulate the browser history stack programmatically.
- <b style="color:SpringGreen;">History Action</b>: One of `POP`, `PUSH`, or `REPLACE`. Users can arrive at a URL for one of these three reasons. A push when a new entry is added to the history stack (typically a link click or the programmer forced a navigation). A replace is similar except it replaces the current entry on the stack instead of pushing a new one. Finally, a pop happens when the user clicks the back or forward buttons in the browser chrome.
- <b style="color:SpringGreen;">Segment</b>: The parts of a URL or path pattern between the `/` characters. For example, "/users/123" has two segments.
- <b style="color:SpringGreen;">Path Pattern</b>: These look like URLs but can have special characters for matching URLs to routes, like dynamic segments ("/users/:userId") or star segments ("/docs/\*"). They aren't URLs, they're patterns that React Router will match.
- <b style="color:SpringGreen;">Dynamic Segment</b>: A segment of a path pattern that is dynamic, meaning it can match any values in the segment. For example the pattern `/users/:userId` will match URLs like `/users/123`
- <b style="color:SpringGreen;">URL Params</b>: The parsed values from the URL that matched a dynamic segment. There are 2 types of URL params - <span style="color: Cyan;">Query Params</span> [Format: `?key=value`] and <span style="color: Cyan;">Path Params</span> [Format: `/path/:parameter`]

## Router

The router is the main component that wraps your entire application. React Router DOM provides several types of routers:

- <b style="color:Khaki;">BrowserRouter</b>: The `<BrowserRouter>` is commonly used as it leverages the **<u>HTML5 History API</u>** to synchronize your UI with the URL, offering a cleaner URL structure without hash fragments. It also uses **<u>ReactContext</u>** to make history available wherever React Router needs it. It could take a prop called <span style="color: Cyan;">baseName</span> which will configure the application to run underneath a specific basename in the URL/
- <b style="color:Khaki;">Hash Router</b>: A `<HashRouter>` stores the current location in the **<u>hash portion of the URL</u>**, so the URL looks something like `http://example.com/#/your/page`. Since the hash is never sent to the server, this means that no special server configuration is needed.

To use a router, just make sure it is rendered at the root of your element hierarchy. Typically you’ll wrap your top-level `<App>` element in a router.

```js
// App.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return <h1>Hello React Router</h1>;
}

ReactDOM.render(
  {/* If we pass baseName as '/app', localhost:3000 contents will be rendered only in localhost:3000/app */}
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

## Route

<b style="color:Orange;">Route</b> component allows us to map our app's location to different React components. For example, say we wanted to render a `Dashboard` component whenever a user navigated to the `/dashboard` path. To do so, we'd render a Route that looked like this:

```html
<Route path="/dashboard" element="{<Dashboard" />} />
```

It always has to render something – either its element prop if the path matches the app's current location or null, if it doesn't.

As many routes as required can be rendered:

```html
<>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/settings" element={<Settings />} />
</>
```

With our Route elements in this configuration, it's possible for multiple routes to match on a single URL. You might want to do that sometimes, but most often you want React Router to only render the route that matches best. Fortunately, we can easily do that with <b style="color:Orange;">Routes</b>.

## Routes

Whenever there are one or more `Route`s, we'll most likely want to wrap them in a <b style="color:Orange;">Routes</b>. The reason for this is because it's `Routes` job is to understand all of its children `Route` elements, and intelligently choose which ones are the best to render.

```html
<Routes>
  <Route path="/" element="{<Home" />} /> <Route path="/about" element="{<About" />} /> <Route path="/settings" element="{<Settings" />} />
  <Route path="*" element="{<NotFound" />} />
</Routes>
```

<div style="border: 1px solid yellow; padding: 10px;">

Suppose there are 2 conflicting routes: `/teams/new` and `/teams/:teamId`. Only one of them can have their component rendered. Which one?

Many routers, both client side and server side, will simply process the patterns in the order in which they were defined. First to match wins. Definitely not what we wanted. These kinds of routers require us to order our routes perfectly to get the expected result. This is how React Router has worked up until v6, but now it's much smarter.

Looking at those patterns, you intuitively know that we want `/teams/new` to match the URL `/teams/new`. It's a perfect match! React Router also knows that. When matching, it will rank your routes according the number of segments, static segments, dynamic segments, star patterns, etc. and pick the most specific match. You'll never have to think about ordering your routes.

</div>

## Link

The <b style="color:Orange;">Link</b> component is used to create navigational links in your application. It works like an HTML `anchor` tag but without causing the page to reload. The props it takes:

- <span style="color: Magenta;">to</span>: The target URL or path to navigate to. `<Link to="/about">About</Link>
`
- <span style="color: Magenta;">replace</span>: Boolean flag to replace the current entry in the history stack instead of adding a new one. `<Link to="/about" replace>About</Link>`
- <span style="color: Magenta;">state</span>: An object to pass state to the target route. `<Link to="/about" state={{ from: 'home' }}>About</Link>`

We can style the active link using the <b style="color:Orange;">NavLink</b> component, which is a special type of Link that can apply styles to the link when it matches the current URL.

```html
<NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)} exact>
```

```html
<NavLink to="/" style={({ isActive }) => (isActive ? someStyleObj : undefined)} exact>
```


<br>

# Nested Routing

Nested routing is a powerful feature in React Router DOM that allows you to create hierarchical URL structures and corresponding component hierarchies. This is especially useful for creating complex layouts where different sections of the application need their own set of routes.

```html
<Route path="/categories"> <Route path="desktops" element="{<Desktops" />} /> <Route path="laptops" element="{<Laptops" />} /> </Route>
```

- `categories/desktops` - `Desktops` component is rendered.
- `categories/laptops` - `Laptops` component is rendered.

In above code, if put `element` directly in parent route, always that component will be rendered. So how to get around this situation?

When we have multiple routes nested within a parent route, we might want to specify a default component to render when the URL matches the parent route without any additional path segments. This is where the <span style="color: Cyan;">index</span> prop comes into play. It defines the default component to render when the URL matches the parent route without additional path segments. Only one index route can be defined within a parent route.

```html
<Route path="/categories">
  <Route index element="{<Categories" />} > <Route path="desktops" element="{<Desktops" />} /> <Route path="laptops" element="{<Laptops" />} />
</Route>
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Outlet</h3>

<b style="color:Orange;">Outlet</b> component serves as a placeholder for rendering nested routes. It allows us to create complex navigation structures within your application.

Here's how it works:

- Parent Route: Defines a section of your application's UI with a specific path.
- Child Routes: Routes that are nested within a parent route, representing sub-sections of the UI.
- Outlet Placement: The `<Outlet />` component is placed within the parent route's component to specify where the child route's content should be rendered.

```html
<Routes>
 <Route path="/home" element={<HomeLayout />}>
  <Route index element={<Home />} />
  <Route path="books" element={<Books />} />
  <Route path="about" element={<About />} />
 </Route>
</Routes>
```

```js
// HomeLayout.js

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <NavLink to="/home">Home</NavLink>
      <br />
      <NavLink to="/home/books">Books</NavLink>
      <br />
      <NavLink to="/home/about">About</NavLink>
      <Outlet />
    </>
  );
};

export default HomeLayout;
```

<br>

# Hooks

React Router DOM provides several hooks to interact with the routing system and manage navigation within your application. Here are some of the most commonly used ones:

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">useNavigate</h3>

This hook allows us to programmatically navigate between routes, which is useful for tasks like redirecting users after a form submission, navigation based on certain conditions, and more.

How it Works

1. **Import:** Import the useNavigate hook from react-router-dom.
2. **Call the hook:** Call useNavigate() within your component to get a navigation function.
3. **Use the navigation function:** Call the returned function with the desired path to navigate to.

```js
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about'); // Navigates to the '/about' route
  };

  return <button onClick={handleClick}>Go to About</button>;
}
```

The `navigate` function can be called in two ways:

1. **Passing a Path**

   ```js
   navigate('/about'); // Navigates to the '/about' route
   navigate('/products/123'); // Navigates to a dynamic route
   ```

2. **Passing a Delta**

   ```js
   navigate(-1); // Navigates back one step in the history
   navigate(2); // Navigates forward two steps in the history
   ```

We can also pass an optional options object as the second argument to control navigation behavior. Available options include:

- <span style="color: HotPink;">replace</span>: If `true`, replaces the current history entry instead of creating a new one.
- <span style="color: HotPink;">state</span>: Additional data to pass to the new location.

```js
navigate('/about', { replace: true, state: { userId: 123 } });
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">useParams</h3>

This hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the `<Route path>`. Child routes inherit all params from their parent routes.

```js
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  let { userId } = useParams(); // Get the userId param from the URL.
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">useSearchParams</h3>

This hook provides a convenient way to manage query parameters in a URL. It allows you to read and modify the query string without manually parsing the URL. It returns an array with two elements:
- **searchParams**: A `URLSearchParams` object representing the current query parameters. 
- **setSearchParams**: A function to update the query parameters. It takes an object of key-value pairs to update the query parameters. You can also pass a function that receives the current search parameters and returns a new `URLSearchParams` object. This function works like `navigate`, but only for the search portion of the URL. Also note that the second arg to `setSearchParams` is the same type as the second arg to `navigate`.

```js
import { useSearchParams } from 'react-router-dom';

function MyComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page'); // Accessing query parameters

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage }); // Updating query parameters
  };

  return (
    <div>
      {/* ... */}
    </div>
  );
}
```
The `searchParams` object provides methods to access query parameters:

- **get(name)**: Returns the value of the specified parameter.
- **getAll(name)**: Returns an array of all values for the specified parameter.
- **has(name)**: Checks if a parameter exists.
- **keys()**: Returns an iterator over the parameter names.
- **values()**: Returns an iterator over the parameter values.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">useLocation</h3>

This hook returns an object representing the current URL. It contains information about the pathname, search parameters, hash, and state of the URL.

```js
function MyComponent() {
  const location = useLocation();
  // Access location properties
}
```

This location object has the following properties:
- <span style="color: Gold;">pathname</span>: The path portion of the URL (e.g., `/products`, `/about`).
- <span style="color: Gold;">search</span>: The query string part of the URL (e.g., `?page=2&sort=price`).
- <span style="color: Gold;">hash</span>: The hash part of the URL (e.g., `#top`).
- <span style="color: Gold;">state</span>: The state value of the location created by `<Link state>` or `navigate`.
- <span style="color: Gold;">key</span>: The unique key of this location.

</div>
