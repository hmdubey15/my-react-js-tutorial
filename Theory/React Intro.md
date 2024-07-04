<div style="font-size: 17px;background: black;padding: 2rem;">

# WHAT IS REACT?

<i>React is an open-source frontend JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable components.</i> <br>

It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.

<strong>NOTE</strong>: React is a library while Angular is framework. Detailed explanation of difference between them is present on this link - https://www.freecodecamp.org/news/the-difference-between-a-framework-and-a-library-bd133054023f/ 

<br>

# WHY REACT?

- <b>Component-Based Architecture:</b> React follows a component-based architecture, which encourages building UIs as a composition of reusable and self-contained components. This modularity makes code easier to maintain, understand, and reuse.

- <b>Virtual DOM and Efficient Updates:</b> If we make changes to the real DOM, like updating text or adding images, the browser will have to re-render the entire page which makes application slow & inefficient. When you create a UI using a framework like React, it builds a virtual representation of the actual DOM in memory. This virtual representation is a lightweight copy of the real DOM and is much faster to manipulate. It serves as an abstraction layer between developer's code and browser's rendering engine. Whenever there are changes in the UI (e.g., user interactions, data updates), instead of directly updating the actual DOM, React first compares the new virtual representation with the previous one to find the difference (<span style="color: Cyan;">diffing</span>). This process is called <b style="color: Chartreuse;">reconciliation</b>. After the differences are identified, React figures out the minimum number of changes needed to update the real DOM. It then applies only those specific changes to the actual DOM. React often batches multiple updates together to minimize DOM manipulations, which further improves performance.

- <b>Unidirectional Data Flow:</b> React follows a unidirectional data flow, where data flows in a single direction, from parent components to child components. This pattern makes it easier to understand how data changes and propagates through the application, simplifying debugging and state management.

- <b>JSX:</b> React uses JSX, a syntax extension that allows developers to write declarative UI code by combining JavaScript and HTML-like syntax. JSX makes code more readable, maintainable, and less error-prone.

- <b>Rich Ecosystem and Community:</b> React has a vast and active community of developers, which means a wealth of resources, libraries, and tools are available. This ecosystem provides solutions for various use cases, making development faster and more efficient.

- <b>Developer Tools:</b> React comes with powerful developer tools like React DevTools, which allow developers to inspect, debug, and profile React applications. These tools aid in identifying performance bottlenecks and optimizing the application.

- <b>Cross-Platform Development:</b> With React Native, developers can use their existing React skills to build mobile applications for both iOS and Android platforms. This code-sharing capability significantly reduces development time and effort.

- <b>SEO-Friendly:</b> React supports server-side rendering (SSR), which allows search engines to index the content effectively. This enhances SEO (Search Engine Optimization) and improves the discoverability of web applications.

- <b>Large Community and Continuous Improvement:</b> React is backed by Facebook and a large community of developers worldwide. Continuous improvements, updates, and bug fixes are released regularly, ensuring that the library remains up-to-date and well-maintained.

- <b>Testability:</b> React's component-based structure makes it easier to write unit tests for individual components. The React ecosystem provides testing tools like Jest and Enzyme, which facilitate comprehensive testing of React applications.

- <b>Open Source and Free:</b> React is an open-source library, which means it is free to use and available for anyone to contribute to and customize as needed.

<br>

## Reconciliation Algorithm

The reconciliation algorithm, often simply referred to as "reconciliation," is a core process in React responsible for updating the user interface to reflect changes in the application state. It's the mechanism by which React efficiently determines what changes need to be applied to the DOM in response to updates to the virtual DOM.

The purpose of the reconciliation algorithm is to optimize the rendering process by minimizing the number of DOM updates needed to reflect changes in the application state. Instead of re-rendering the entire DOM tree every time the state changes, React selectively updates only the parts of the DOM that have changed.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Working</h3>

1. <b style="color: Salmon;">Virtual DOM Representation:</b> React maintains a lightweight, in-memory representation of the DOM known as the virtual DOM. This virtual DOM is a JavaScript object tree that mirrors the structure of the real DOM.

2. <b style="color: Salmon;">Component Rendering:</b> When a component's state or props change, React re-renders the component and generates a new virtual DOM representation of the component tree.

3. <b style="color: Salmon;">Diffing Process:</b> React performs a process called "diffing" to compare the new virtual DOM with the previous virtual DOM. It recursively traverses the two virtual DOM trees and identifies the differences between them.

    <span style="color: SpringGreen;">Keyed Elements:</span> React uses keys, typically provided by developers, to identify elements in a list. By comparing keys, React can efficiently determine which elements have been added, removed, or moved within a list.<br>
    <span style="color: SpringGreen;">Component Identity:</span> React also considers the identity of components. If a component remains the same between renders, React can optimize by not recreating it in the virtual DOM.

4. <b style="color: Salmon;">Minimal Updates:</b> Based on the differences identified during the diffing process, React determines the minimal set of changes needed to update the real DOM to match the new virtual DOM. This includes adding, removing, or updating DOM nodes as necessary.

5. <b style="color: Salmon;">Reconciliation Process:</b> React reconciles the changes identified during the diffing process and applies them to the actual DOM. This may involve updating existing DOM nodes, creating new DOM nodes, or removing obsolete DOM nodes.

6. <b style="color: Salmon;">Batching Updates:</b> React batches multiple updates together and applies them in a single pass through the DOM. This helps to minimize browser reflows and improve performance.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Tips for Optimizing Reconciliation</h3>

1. <b style="color: Orange;">Use Keys Wisely: </b>Ensure that keys are unique within the same list and stable (they don't change between renders) for the best results. Using array indices as keys is a common mistake that can lead to inefficient updates, especially when elements are added or removed from the beginning or middle of a list. Instead, use stable, unique identifiers for keys.

2. <b style="color: Orange;">Memoization: </b>React provides the `React.memo` higher-order component and the `useMemo` hook to memoize components and values. Memoization can prevent unnecessary renders and reconciliation by ensuring that a component only updates when its dependencies change.

3. <b style="color: Orange;">Code Splitting: </b>In large applications, consider code splitting to load only the necessary components when they are needed. This reduces the initial load time and minimizes the work React needs to do during the reconciliation process.

4. <b style="color: Orange;">Use React DevTools: </b> React DevTools is a powerful browser extension that allows you to inspect and profile your React applications. It provides insights into component lifecycles, rendering times, and reconciliation updates, helping you identify performance bottlenecks.

<br>

## React Fiber

<b style="color: Cyan;">React Fiber</b> is a new reconciliation algorithm for React. It was introduced in React 16 and is designed to improve the performance of React applications, especially in areas such as animation and layout.

React Fiber works by breaking down the reconciliation process into smaller chunks, which it can then process asynchronously. This allows React to continue to respond to user input and other events while it is rendering the UI.

React Fiber also introduces a new concept called "lanes". Lanes are used to prioritize different types of work. For example, React might assign a higher priority to work that is related to user input, so that the UI remains responsive.

React Fiber has been shown to significantly improve the performance of React applications in a number of benchmarks. For example, a React application that uses React Fiber can render a list of 10,000 items in about 100 milliseconds, while the same application without React Fiber would take about 500 milliseconds.

React Fiber is a significant improvement over the previous reconciliation algorithm, and it is one of the key features that makes React such a powerful and performant UI library.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Purpose of React Fiber:</h3>

- <b style="color: LimeGreen;">Improved Rendering Performance:</b> Fiber is designed to enable more efficient rendering by breaking down the rendering process into smaller, incremental steps. This allows React to prioritize and schedule rendering updates more effectively, resulting in smoother user experiences, especially for complex and dynamic user interfaces.

- <b style="color: LimeGreen;">Better Support for Concurrent Mode:</b> Fiber lays the foundation for React's "Concurrent Mode," a feature that enables rendering updates to be prioritized and scheduled in a way that improves responsiveness and supports features like smooth animations, fast user interactions, and seamless transitions.

- <b style="color: LimeGreen;">Support for Advanced Features:</b> Fiber enables the implementation of advanced features such as error boundaries, suspense, and code splitting, which require fine-grained control over the rendering process and support for asynchronous rendering.

<br>

# SETTING UP A REACT ENVIRONMENT

1. <b>Node.js and npm:</b> React.js requires `Node.js` and `npm` (Node Package Manager) to be installed on your computer. `Node.js` allows developers to run JavaScript code outside of a web browser. It comes with a powerful package manager called `npm` (Node Package Manager), which provides access to a vast ecosystem of open-source libraries and modules. If you don't have them installed already, download and install the latest version of Node.js from the official website: https://nodejs.org/

2. <b>Create React App (Recommended)</b>: The `create-react-app` is an excellent tool for beginners, which allows you to create and run React project very quickly. It does not take any configuration manually. This tool is wrapping all of the required dependencies like Webpack, Babel for React project itself and then you need to focus on writing React code only. This tool sets up the development environment, provides an excellent developer experience, and optimizes the app for production. Run this command in terminal to install `create-react-app` globally: 
<span style="color: Chartreuse;">npm install -g create-react-app</span>
Once the React installation is successful, we can create a new React project using create-react-app command. Here, I choose "react-apps" name for my project.
<span style="color: Chartreuse;">create-react-app react-apps</span>. Above 2 steps can be combined to 1 by using `npx` (talked about it below). <span style="color: Chartreuse;">npx create-react-app reactproject</span>

3. <b>Navigate to project folder and start the development server: </b> To navigate to project folder, use `cd` command - <span style="color: Chartreuse;">cd react-apps</span> and to start the development server on localhost, use <span style="color: Chartreuse;">npm start</span> command.


<div style="font-size: 25px; text-decoration: underline; font-weight: bold">NPX:</div>

NPX stands for Node Package eXecute. It is simply an NPM package runner. It allows developers to execute any Javascript Package available on the NPM registry without even installing it. NPX is installed automatically with NPM version 5.2.0 and above.

<table style="width: 100%;"><tbody>
<tr>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><p style="text-align:center;"><span style="background-color:transparent;color:white;"><strong>NPM</strong></span></p></td>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><p style="text-align:center;"><span style="background-color:transparent;color:white;"><strong>NPX</strong></span></p></td>
</tr>
<tr>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><span style="background-color:transparent;color:white;">NPM is a package manager used to install, delete, and update Javascript packages on your machine.</span></td>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><span style="background-color:transparent;color:white;">NPX is a package executer, and it is used to execute javascript packages directly, without installing them.&nbsp;</span></td>
</tr>
<tr>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><span style="background-color:transparent;color:white;">NPM installs packages globally, which means that your machine may be polluted by packages that are not required anymore in the long run.&nbsp;</span></td>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><span style="background-color:transparent;color:white;">NPX does not install packages, so package pollution on the machine is not a concern.</span></td>
</tr>
<tr>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><span style="background-color:transparent;color:white;">To use create-react-app using NPM, we would first have to install it globally, and then run it, which makes using NPM in such cases redundant.</span></td>
<td style="border:1pt solid white;padding:5pt;vertical-align:top;"><span style="background-color:transparent;color:white;">The most common application of NPX is the create-react-app command. Since we only need to use it once, i.e., while initializing the project, we do not install it.&nbsp;</span></td>
</tr>
</tbody></table>

<b style="font-size: 22px;">Is NPX installed with npm?</b><br>
That depends on the version of the NPM. For NPM version 5.2.0, NPX will be installed automatically. For lower versions, you will need to install it separately. 

<br>

# FILES AND BASIC FOLDER STRUCTURE OF REACT PROJECTS

- <b>node_modules</b> folder -> This folder contains all the external dependencies that are installed via npm (Node Package Manager). These external packages are required for your application to function properly and include various libraries, tools, and utilities. 

- <b>public</b> folder -> This folder contains all the public assets and the HTML template file (index.html). The index.html file is the entry point of your application and where your React app is mounted.

- <b>src</b> folder -> This folder contains all the source code of your React application. It includes the main entry point file (index.js) and other components, pages, assets, utilities, services, etc.

- <b>index.html</b> -> It is the main HTML file of our app that includes your React code and provides a context for React to render to. It is the initial page that gets loaded in the user's web browser when they access the application. If you look at the html file you could see `<div id="root"></div>`. We call this a “root” DOM node because everything inside it will be managed by React DOM. That is the mounting point for react app.

- <b>index.js</b> -> This file is the main entry point of your React application. It typically imports the ReactDOM and the root component (App.js or another top-level component) and renders it into the DOM.

- <b>App.js</b> -> This is the main component of your application. It is usually the root component that contains the overall structure and layout of your app.

- <b>.gitignore</b> -> This file lists the files and directories that should be ignored by the version control system (e.g., Git) when committing changes.

- <b>package.json</b> -> This file contains the project's metadata, configuration, and a list of dependencies needed for the project to run. It is created automatically when you run `npm init` or `npx create-react-app`. Breaking down the key parts of this file: 
  1. <i>Project Metadata</i>: The package.json file includes metadata about the project, such as the project's name, version, description, author, license, and other relevant information.
  
  2. <i>Dependencies</i>: One of the most important sections of package.json is the dependencies field. It lists all the external libraries and packages that your React application depends on to function correctly. These dependencies are installed when you run npm install or yarn install to set up the project.

  3. <i>DevDependencies</i>: In addition to regular dependencies, the package.json file may contain a devDependencies field. This section lists dependencies that are only required during development and testing but are not needed for the application to run in a production environment. Common examples include testing libraries and build tools.

  4. <i>Scripts</i>: The scripts section in package.json allows you to define custom scripts that you can run using npm run <script-name> or yarn <script-name>. Common scripts include "start" for starting the development server, "build" for creating a production build, and "test" for running tests.

- <b>package-lock.json</b> -> This file is automatically generated by npm to lock the versions of dependencies that are installed in your project.

- <b>README.md</b> -> This file typically contains documentation about your project, including installation instructions and other important details.

<br>

# LET'S GET STARTED

As you can see in `index.html` file of this react application, there is just a `<div>` tag with its id as root. In `index.js` file, we render our main component `App.js` into the DOM.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- `createRoot` lets you create a root to display React components inside a browser DOM node.
- `<StrictMode>` lets you find common bugs in your components early during development.

<b><i>NOTE:</i></b> We will study about these functions in detail later.

<div style="background: orange; padding: 0.6rem; color: black;">
<b style="color: darkred;">DEPRECATION ALERT!! </b>

Earlier, "render" API of "ReactDOM" was being used to render piece of JSX (“React node”) into a browser DOM node. But in React version 18, this got phased out and "createRoot" (a ReactDOM client API) became its replacement. Using render in React 18 will warn that your app will behave as if it’s running React 17.
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