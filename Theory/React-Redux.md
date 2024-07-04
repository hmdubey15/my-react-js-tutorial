<div style="font-size: 17px;background: black;padding: 2rem;">

# React-Redux

Redux is a standalone JS library. As we've already seen, you can create and use a Redux store even if you don't have a user interface set up. This also means that you can use Redux with any UI framework (or even without any UI framework), and use it on both client and server. You can write Redux apps with React, Vue, Angular, Ember, jQuery, or vanilla JavaScript. That said, Redux was specifically designed to work well with React. React lets you describe your UI as a function of your state, and Redux contains state and updates it in response to actions.<br>

Using Redux with any UI layer requires a few consistent steps:
1. Create a Redux store
2. Subscribe to updates
3. Inside the subscription callback:
    - Get the current store state
    - Extract the data needed by this piece of UI
    - Update the UI with the data
4. If necessary, render the UI with initial state
5. Respond to UI inputs by dispatching Redux actions

<span style="color:salmon">The official React-Redux UI bindings library(`react-redux`) is a separate package from the Redux core. You'll need to install that in addition.</span>

## <u> Passing the Store with Provider </u>

Our components can now read state from the store, and dispatch actions to the store. However, we're still missing something. Where and how are the React-Redux hooks finding the right Redux store? A hook is a JS function, so it can't automatically import a store from store.js by itself.

Instead, <span style="color:SpringGreen"> we have to specifically tell React-Redux what store we want to use in our components. We do this by rendering a `<Provider>` component around our entire `<App>`, and passing the Redux store as a prop to `<Provider>`. After we do this once, every component in the application will be able to access the Redux store if it needs to.</span>


```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

## <u> Hooks </u>
You should be familiar with React hooks like useState, which can be called in React function components to give them access to React state values. React also lets us write custom hooks, which let us extract reusable hooks to add our own behavior on top of React's built-in hooks. Like many other libraries, React-Redux includes its own custom hooks, which you can use in your own components. The React-Redux hooks give your React component the ability to talk to the Redux store by reading state and dispatching actions.<br>
React Redux provides a pair of custom React hooks that allow your React components to interact with the Redux store. `useSelector` reads a value from the store state and subscribes to updates, while `useDispatch` returns the store's dispatch method to let you dispatch actions. We can import them like this: 
```js
import { useSelector, useDispatch } from 'react-redux'
```

### <span style="color:yellow">useSelector :-</span> 
This hook lets your React components read data from the Redux store. It accepts a single function, which we call a selector function. A selector is a function that takes the entire Redux store state as its argument(the one which we get via store.getState()), reads some value from the state, and returns that result.
```js
const todos = useSelector(state => state.todos)
```
Selectors can return values from the Redux store state, and also return derived values based on that state as well. useSelector automatically subscribes to the Redux store for us! That way, any time an action is dispatched, it will call its selector function again right away. If the value returned by the selector changes from the last time it ran, useSelector will force our component to re-render with the new data. All we have to do is call useSelector() once in our component, and it does the rest of the work for us.

> NOTE: useSelector compares its results using strict === reference comparisons, so the component will re-render any time the selector result is a new reference! This means that if you create a new reference in your selector and return it, your component could re-render every time an action has been dispatched, even if the data really isn't different. For example, passing below selector to useSelector will cause the component to always re-render, because array.map() always returns a new array reference:
```js
// Bad: always returning a new reference
const selectTodoDescriptions = state => {
  // This creates a new array reference!
  return state.todos.map(todo => todo.text)
}
```

### <span style="color:yellow">useDispatch :-</span> 

The React-Redux useDispatch hook gives us the store's dispatch method as its result (In fact, the implementation of the hook really is return store.dispatch). So, we can call `const dispatch = useDispatch()` in any component that needs to dispatch actions, and then call dispatch(someAction) as needed.

## <u> connect API </u>

React Redux provides a connect function for you to read values from the Redux store (and re-read the values when the store updates). The connect function takes two arguments, both optional:

### <span style="color:yellow">mapStateToProps :-</span>  
As the first argument passed in to connect, mapStateToProps is used for selecting the part of the data from the store that the connected component needs. It’s frequently referred to as just mapState for short.<br>

mapStateToProps should always be defined as function. It should take a first argument called state (the same value returned by a call to store.getState()), optionally a second argument called ownProps (This argument will contain all of the props given to the wrapper component that was generated by connect), and return a plain object containing the data that the connected component needs. This is called every time the store state changes. Note that this function will be called again if component receives new props.<br>

Your mapStateToProps function should return a plain object that contains the data the component needs:
- Each field in the object will become a prop for your actual component.
- The values in the fields will be used to determine if your component needs to re-render.<br>

You do not need to include values from ownProps in the object returned from mapStateToProps. connect will automatically merge those different prop sources into a final set of props. Syntax:-
```js
function mapStateToProps(state, ownProps?)
```
Example:- 
```js
function mapStateToProps(state) {
  return {
    a: 42,
    todos: state.todos,
    filter: state.visibilityFilter,
  }
}
```

>> REFER THIS LINK FOR MORE DETAILS ON mapStateToProps - https://react-redux.js.org/using-react-redux/connect-mapstate

### <span style="color:yellow">mapDispatchToProps :-</span>  

With React Redux, your components never access the store directly - connect does it for you. React Redux gives you two ways to let components dispatch actions:
- connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, and pass those functions as props to your component.
- By default, even if we don't specify or pass mapDispatchToProps as null, a connected component receives prop dispatch and can dispatch actions itself. Example, in all below cases, we receive dispatch prop: 
```js
connect()(MyComponent)
// which is equivalent with
connect(null, null)(MyComponent)
// or
connect(mapStateToProps /** no second argument */)(MyComponent)
```

<u>Providing A mapDispatchToProps Parameter:</u><br>
Providing a mapDispatchToProps allows you to specify which actions your component might need to dispatch. It lets you provide action dispatching functions as props. Therefore, instead of calling props.dispatch(() => increment()), you may call props.increment() directly.
```
// button needs to be aware of "dispatch"
<button onClick={() => dispatch({ type: "SOMETHING" })} />

// button unaware of "dispatch",
<button onClick={doSomething} />
```
> Once you've wrapped all our action creators with functions that dispatch the actions, the component is free of the need of dispatch. Therefore, <span style="color:cyan">if you define your own mapDispatchToProps, the connected component will no longer receive dispatch.</span><br>

Two Forms of mapDispatchToProps: The mapDispatchToProps parameter can be of two forms :
- <span style="color: gold">Function form</span>: Defining mapDispatchToProps as a function gives you the most flexibility in customizing the functions your component receives, and how they dispatch actions. You gain access to dispatch and ownProps. You may use this chance to write customized functions to be called by your connected components. Your mapDispatchToProps function should return a plain object:
  - Each field in the object will become a separate prop for your own component, and the value should normally be a function that dispatches an action when called.
  - If you use action creators ( as oppose to plain object actions ) inside dispatch, it is a convention to simply name the field key the same name as the action creator.
```js
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

const mapDispatchToProps = (dispatch, ownProps /* (optional argument) */) => {
  return {
    // dispatching actions returned by action creators
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
  }
}
```
The return of the mapDispatchToProps function will be merged to your connected component as props. You may call them directly to dispatch its action.
```js
function Counter({ count, increment, decrement, reset }) {
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}
```
Wrapping these functions by hand is tedious, so Redux provides a function to simplify that. `bindActionCreators` turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly. bindActionCreators accepts two parameters:
1. A function (an action creator) or an object (each field an action creator)
2. dispatch

```js
import { bindActionCreators } from 'redux'

const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment, decrement, reset }, dispatch);
  // returns
  // {
  //   increment: (...args) => dispatch(increment(...args)),
  //   decrement: (...args) => dispatch(decrement(...args)),
  //   reset: (...args) => dispatch(reset(...args)),
  // }
}

// component receives props.increment, props.decrement, props.reset
connect(null, mapDispatchToProps)(Counter)
```

- <span style="color: gold">Object shorthand form</span>: More declarative and easier to use. connect supports an “object shorthand” form for the mapDispatchToProps argument: if you pass an object full of action creators instead of a function, connect will automatically call bindActionCreators for you internally.
Note that:
 - Each field of the mapDispatchToProps object is assumed to be an action creator
 - Your component will no longer receive dispatch as a prop

 ```js
 const mapDispatchToProps = {
  increment,
  decrement,
  reset,
}
// above keys are action creators defined in above code block
 ```

<span style="color: Magenta">Obviously these action creators can also return functions instead of objects if thunk middleware is used. You'll find same thing in TEKION.</span>

⭐ Note: We recommend using the object form of mapDispatchToProps unless you specifically need to customize dispatching behavior in some way.

> Refer this article for more details on mapDispatchToProps - https://react-redux.js.org/using-react-redux/connect-mapdispatch

</div>