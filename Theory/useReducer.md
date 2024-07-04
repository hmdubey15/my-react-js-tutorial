<div style="font-size: 17px;background: black;padding: 2rem;">

 <b><i>This hook is a built-in React hook used for managing more complex state logic in React functional components. It is an alternative to the more commonly used `useState` hook when you have state logic that involves multiple sub-values or when the next state depends on the previous one. `useReducer` is inspired by Redux, a popular state management library for React.</b></i>

 Format:
 ```js
 const [state, dispatch] = useReducer(reducer, initialArg, init?);
 ```

<u><b style="color: Salmon;">reducer</b>:</u> The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types. By convention, it is common to write it as a switch statement. For each case in the switch, calculate and return some next state.

```js
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```
<b style="color:red;">NOTE</b>:</u> state is read-only. Do not modify any objects or arrays in state. Instead, always return new objects from your reducer just like redux.

<u><b style="color: Salmon;">initialArg</b>:</u> The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next init argument.

<u><b style="color: Salmon;">init </b><b>(optional)</b>:</u> The initializer function that should return the initial state. If it’s not specified, the initial state is set to initialArg. Otherwise, the initial state is set to the result of calling init(initialArg).

<u><b style="color: Salmon;">dispatch</b>:</u> Instead of directly updating the state like with `useState`, `useReducer` lets you update the state to a different value and trigger a re-render by using `dispatch` function returned by `useReducer` hook. You need to pass the `action` as the only argument to the dispatch function.

```js
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
}
```
An `action` is a plain JavaScript object that describes what should change in the state. The dispatch function passes the `action` to the reducer, which then updates the state accordingly. Each `action` describes a single interaction, even if that leads to multiple changes in data.  Format - `dispatch(action)`. <span style="color: Cyan;"> Actions can have any shape. By convention, it’s common to pass objects with a `type` property identifying the `action`. It should include the minimal necessary information that the reducer needs to compute the next state.</span>

- The dispatch function <b>only updates the state variable for the next render</b>. If you read the state variable after calling the `dispatch` function, <b>you will still get the old value</b> that was on the screen before your call.
- If the new value you provide is identical to the current `state`, as determined by an `Object.is` comparison, React will <b style="color: Chartreuse;">skip re-rendering the component and its children</b>. This is an optimization. React may still need to call your component before ignoring the result, but it shouldn’t affect your code.
- React <b>batches state updates</b>. It updates the screen <b style="color: Chartreuse;">after all the event handlers have run</b> and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use `flushSync`.


<u><b style="color: Salmon;">state</b>:</u> The current state. During the first render, it’s set to `init(initialArg)` or `initialArg` (if there’s no `init`).


<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Avoiding recreating the initial state</h3> 

React saves the initial state once and ignores it on the next renders.

```js
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, createInitialState(username));
  // ...
```

Although the result of `createInitialState(username)` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating large arrays or performing expensive calculations.

To solve this, you may <b><i>pass it as an initializer function</b></i> to `useReducer` as the third argument instead:

```js
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  // ...
```

Notice that you’re passing `createInitialState`, which is the function itself, and not `createInitialState()`, which is the result of calling it. This way, the initial state does not get re-created after initialization.

In the above example, `createInitialState` takes a `username` argument. If your initializer doesn’t need any information to compute the initial state, you may pass `null` as the second argument to `useReducer`.

</div>

<!-- <div style="background: DarkRed;padding: 0.3rem 0.8rem;"> [HIGHLIGHT] -->
<!-- <h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;"> [SUBHEADING] -->
<!-- <b style="color: Chartreuse;"> [NOTE] -->
<!-- <b style="color:red;"> [NOTE-2] -->
<!-- <span style="color: Cyan;"> [IMP] -></span> -->
<!-- <b style="color: Salmon;"> [POINT] -->