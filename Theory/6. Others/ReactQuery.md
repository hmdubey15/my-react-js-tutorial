<div style="font-size: 17px;background: black;padding: 2rem;">

**React Query, now officially called TanStack Query, is a powerful library developed by TanStack that simplifies data fetching and state management in React applications. It provides a straightforward way to manage remote data and keep it in sync with the UI. It offers a set of hooks and utilities that enable you to manage data from various sources, including REST APIs, GraphQL, or even local state, effortlessly.**

While most traditional state management libraries are great for working with client state, they are not so great at working with async or server state. This is because server state is totally different. For starters, server state:

- Is persisted remotely in a location you may not control or own
- Requires asynchronous APIs for fetching and updating
- Implies shared ownership and can be changed by other people without your knowledge
- Can potentially become "out of date" in your applications if you're not careful

Once you grasp the nature of server state in your application, even more challenges will arise as you go, for example:

- Caching... (possibly the hardest thing to do in programming)
- Deduping multiple requests for the same data into a single request
- Updating "out of date" data in the background
- Knowing when data is "out of date"
- Reflecting updates to data as quickly as possible
- Performance optimizations like pagination and lazy loading data
- Managing memory and garbage collection of server state
- Memoizing query results with structural sharing

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Key Features</h3>

- <b style="color: Orange;">Fetching</b>: React Query makes it easy to fetch data from APIs. It abstracts the complexities of data fetching, such as making HTTP requests and handling different states (loading, error, success).
- <b style="color: Orange;">Caching</b>: It caches fetched data automatically. This means subsequent requests for the same data are served from the cache, reducing unnecessary network requests and improving performance.
- <b style="color: Orange;">Background Updates</b>: It allows data to be kept fresh by automatically refetching data in the background at specified intervals or based on user-defined conditions. This eliminates the need for manual polling, simplifying development and enhancing user experience.
- <b style="color: Orange;">Synchronization</b>: Data can be synchronized across multiple components, ensuring that changes in one component are reflected in others. This is especially useful in large applications with shared state.
- <b style="color: Orange;">Pagination and Infinite Queries</b>: It provides built-in support for pagination and infinite scrolling, making it easy to implement these features without additional boilerplate.
- <b style="color: Orange;">Error Handling</b>: Comprehensive error handling is built-in, allowing developers to easily manage and display errors during data fetching.
- <b style="color: Orange;">Mutations</b>: React Query supports mutations (modifying data on the server). It handles optimistic updates, automatic retries, and invalidation of affected queries after a mutation.
- <b style="color: Orange;"><b style="color: Violet;">\*</b>Real-time Data:</b> React Query supports real-time data updates through WebSocket connections or other mechanisms. This is especially useful for building features like live notifications and chat applications.

# Working

## Installation

```
npm i @tanstack/react-query

# or

yarn add @tanstack/react-query
```

## QueryClient and QueryClientProvider

Use the <span style="color: Cyan;">QueryClientProvider</span> component to connect and provide a <span style="color: Yellow;">QueryClient</span> to your application:

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
}
```

A query is a declarative dependency on an asynchronous source of data that is tied to a **unique key**. A query can be used with any Promise based method (including GET and POST methods) to fetch data from a server. If your method modifies data on the server, we recommend using **<u style="color: HotPink;">Mutations</u>** instead.

To subscribe to a query in your components or custom hooks, call the <span style="color: Orange;">useQuery</span> hook with at least:

- A **unique key** for the query
- A function that returns a promise that:
  - Resolves the data, or
  - Throws an error

The **unique key** you provide is used internally for refetching, caching, and sharing your queries throughout your application.

The query result returned by `useQuery` contains all of the information about the query that you'll need for templating and any other usage of the data:

```js
import { useQuery } from '@tanstack/react-query';

function TestComp() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList });
}
```

The `info` object contains a few very important states you'll need to be aware of to be productive:

- <span style="color: GreenYellow;">isPending</span> or <span style="color: GreenYellow;">status</span> === `'pending'` - The query has no data yet
- <span style="color: GreenYellow;">isError</span> or <span style="color: GreenYellow;">status</span> === `'error'` - The query encountered an error
- <span style="color: GreenYellow;">isSuccess</span> or <span style="color: GreenYellow;">status</span> === `'success'` - The query was successful and data is available
- <span style="color: GreenYellow;">error</span> - If the query is in an `isError` state, the error description is available via this property.
- <span style="color: GreenYellow;">data</span> - If the query is in an `isSuccess` state, the data is available via this property.
- <span style="color: GreenYellow;">isFetching</span> - In any state, if the query is fetching at any time (including background refetching) `isFetching` will be `true`.
- <span style="color: GreenYellow;">fetchStatus</span> === `'fetching'` - The query is currently fetching.
- <span style="color: GreenYellow;">fetchStatus</span> === `'paused'` - The query wanted to fetch, but it is paused. Read more about this in the Network Mode guide.
- <span style="color: GreenYellow;">fetchStatus</span> === `'idle'` - The query is not doing anything at the moment.

**<u>Why two different states?</u>**

Background refetches and stale-while-revalidate logic make all combinations for status and fetchStatus possible. For example:

- a query in `success` status will usually be in `idle` fetchStatus, but it could also be in `fetching` if a background refetch is happening.
- a query that mounts and has no data will usually be in `pending` status and `fetching` fetchStatus, but it could also be paused if there is no network connection.

So keep in mind that a query can be in pending state without actually fetching data. As a rule of thumb:

- The `status` gives information about the `data`: Do we have any or not?
- The `fetchStatus` gives information about the `queryFn`: Is it running or not?

## Query Keys

At its core, TanStack Query manages query caching for you based on query keys. They are used to uniquely idenitify queries. They help in managing cached data, refetching, and invalidation. Also they are used for dependent queries to ensure they execute in the correct order.

Query keys have to be an Array at the top level, and can be as simple as an Array with a single string, or as complex as an array of many strings and nested objects. As long as the query key is serializable, and unique to the query's data, you can use it!

```js
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

Typically an array: `['key', variable]`. If your query function depends on a variable, include it in your query key. Since query keys uniquely describe the data they are fetching, they should include any variables you use in your query function that change.

The keys are not stored by reference but by their content. React Query uses deep equality checks (e.g., `JSON.stringify`) to determine if keys are the same. For example:

```js
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  });
}
```

<b style="color: Red;">Note:</b> Query keys act as dependencies for your query functions. Adding dependent variables to your query key will ensure that queries are cached independently, and that any time a variable changes, queries will be refetched automatically (depending on your `staleTime` settings).

## Query Functions

**A query function can be literally any function that <span style="color: Gold;">returns a promise</span>. The promise that is returned should either <u>resolve the data</u> or <u>throw an error</u>.**

All of the following are valid query function configurations:

```js
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos });
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) });
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId);
    return data;
  },
});
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
});
```

<b style="color: LightSeaGreen;">Query keys are not just for uniquely identifying the data you are fetching, but are also conveniently passed into your query function as part of the <u>`QueryFunctionContext`</u>.</b> While not always necessary, this makes it possible to extract your query functions if needed:

```js
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  });
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey;
  return new Promise();
}
```

The `QueryFunctionContext` is the object passed to each query function. It consists of:

- `queryKey`: QueryKey: Query Keys
- `signal`: <u>AbortSignal</u>
  - `AbortSignal` instance provided by TanStack Query
  - Can be used for Query Cancellation
- `meta`: `Record<string, unknown>` | `undefined`
  - an optional field you can fill with additional information about your query

## Parallel Queries

When the number of parallel queries does not change, there is no extra effort to use parallel queries. Just use any number of TanStack Query's `useQuery` and `useInfiniteQuery` hooks side-by-side! But what if number of queries keep changing? Using `useQuery` in loop will violate rules of hooks. In that case, we can use <span style="color: OrangeRed;">useQueries</span> hook. It accepts an options object with a `queries` key whose value is an array of query objects. It returns an array of query results:

```js
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      };
    }),
  });
}
```

## Dependent Queries

Dependent (or serial) queries depend on previous ones to finish before they can execute. To achieve this, it's as easy as using the `enabled` option to tell a query when it is ready to run:

```js
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
});

const userId = user?.id;

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
});
```

Dynamic parallel query - `useQueries` can depend on a previous query also, here's how to achieve this:

```js
// Get the users ids
const { data: userIds } = useQuery({
  queryKey: ['users'],
  queryFn: getUsersData,
  select: (users) => users.map((user) => user.id),
});

// Then get the users messages
const usersMessages = useQueries({
  queries: userIds
    ? userIds.map((id) => {
        return {
          queryKey: ['messages', id],
          queryFn: () => getMessagesByUsers(id),
        };
      })
    : [], // if users is undefined, an empty array will be returned
});
```

Dependent queries by definition constitutes a form of request waterfall, which hurts performance. If we pretend both queries take the same amount of time, doing them serially instead of in parallel always takes twice as much time, which is especially hurtful when it happens on a client that has high latency. If you can, it's always better to restructure the backend APIs so that both queries can be fetched in parallel, though that might not always be practically feasible.

## Window Focus Refetching

If a user leaves your application and returns and the query data is stale, TanStack Query automatically requests fresh data for you in the background. You can disable this globally or per-query using the <span style="color: Gold;">refetchOnWindowFocus</span> option:

**<u>Disabling Globally</u>**

```js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
}
```

**<u>Disabling Per-Query</u>**

```js
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchOnWindowFocus: false,
});
```

## Disabling/Pausing Queries

If you ever want to disable a query from automatically running, you can use the <span style="color: Lime;">enabled = false</span> option. The `enabled` option also accepts a callback that returns a `boolean`.

When `enabled` is `false`:

- If the query has cached data, then the query will be initialized in the `status === 'success'` or `isSuccess` state.
- If the query does not have cached data, then the query will start in the `status === 'pending'` and `fetchStatus === 'idle'` state.
- The query will not automatically fetch on mount.
- The query will not automatically refetch in the background.
- The query will ignore query client `invalidateQueries` and `refetchQueries` calls that would normally result in the query refetching.
- <span style="color: Cyan;">**<u>refetch</u>** returned from **<u>useQuery</u>** can be used to manually trigger the query to fetch. This way is used when we have to trigger network call on some event, say mouse click. However, it will not work with **<u>skipToken</u>**.</span>

<b style="color: Red;">NOTE:</b> The enabled option can not only be used to permanently disable a query, but also to enable / disable it at a later time (as explained in <u>Dependent Query</u> example).

## Query Retries

When a `useQuery` query fails (the query function throws an error), TanStack Query will automatically retry the query if that query's request has not reached the max number of consecutive retries (defaults to <u>`3`</u>) or a function is provided to determine if a retry is allowed.

You can configure retries both on a global level and an individual query level with <b style="color: Khaki;">retry</b> option:

- Setting `retry = false` will disable retries.
- Setting `retry = 6` will retry failing requests 6 times before showing the final error thrown by the function.
- Setting `retry = true` will infinitely retry failing requests.
- Setting `retry = (failureCount, error) => ...` allows for custom logic based on why the request failed.

<u><b>Info: Contents of the error property will be part of `failureReason` response property of `useQuery` (`isError` will be `false`) until the last retry attempt. So in above example any error contents will be part of `failureReason` property for first 9 retry attempts (Overall 10 attempts) and finally they will be part of `error` after last attempt if error persists after all retry attempts.</b></u>

By default, retries in TanStack Query do not happen immediately after a request fails. As is standard, a back-off delay is gradually applied to each retry attempt. The default retryDelay is set to double (starting at 1000ms) with each attempt, but not exceed 30 seconds:

Though it is not recommended, you can obviously override the retryDelay function/integer in both the Provider and individual query options. If set to an integer, the delay will always be the same amount of time and if it is a function, that function will receive attempt index that should return the delay time using that!

```js
const result = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
  retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
});
```

## <a href="https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries">Paginated / Lagged Queries</a>

Rendering paginated data is a very common UI pattern and in TanStack Query, it "just works" by including the page information in the query key:

```js
const result = useQuery({
  queryKey: ['projects', page],
  queryFn: fetchProjects,
});
```

However, if you run this simple example, you might notice something strange. **The UI jumps in and out of the success and pending states because each new page is treated like a brand new query.** This experience is not optimal and unfortunately is how many tools today insist on working. But not TanStack Query! TanStack Query comes with an awesome feature called <span style="color: Coral;">placeholderData</span> that allows us to get around this. By setting `placeholderData` to `(previousData) => previousData` or <span style="color: Crimson;">keepPreviousData</span> function exported from TanStack Query, we get a few new things:

- The data from the last successful fetch is available while new data is being requested, even though the query key has changed.
- When the new data arrives, the previous data is seamlessly swapped to show the new data.
- <span style="color: DarkKhaki;">isPlaceholderData</span> is made available to know what data the query is currently providing. If it is `true`, data present is previous one.

## <a href="https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries">Infinite Queries</a>

Rendering lists that can additively "load more" data onto an existing set of data or "infinite scroll" is also a very common UI pattern. TanStack Query supports a useful version of `useQuery` called <span style="color: DarkSalmon;">useInfiniteQuery</span> for querying these types of lists. When using useInfiniteQuery, you'll notice a few things are different:

- `data` is now an object containing infinite query data:
  - `data.pages` array containing the fetched pages.
  - `data.pageParams` array containing the page params used to fetch the pages.
- The `fetchNextPage` and `fetchPreviousPage` functions are now available (`fetchNextPage` is required).
- The `initialPageParam` option is now available (and required) to specify the initial page param.
- The `getNextPageParam` and `getPreviousPageParam` options are available for both determining if there is more data to load and the information to fetch it. This information is supplied as an additional parameter in the query function.
- A `hasNextPage` boolean is now available and is `true` if `getNextPageParam` returns a value other than `null` or `undefined`.
- A `hasPreviousPage` boolean is now available and is `true` if `getPreviousPageParam` returns a value other than `null` or `undefined`.
- The `isFetchingNextPage` and `isFetchingPreviousPage` booleans are now available to distinguish between a background refresh state and a loading more state.

Let's assume we have an API that returns pages of `projects` 3 at a time based on a `cursor` index along with a cursor that can be used to fetch the next group of projects:

```tsx
fetch('/api/projects?cursor=0');
// { data: [...], nextCursor: 3}
fetch('/api/projects?cursor=3');
// { data: [...], nextCursor: 6}
```

With this information, we can create a "Load More" UI by:

- Waiting for `useInfiniteQuery` to request the first group of data by default
- Returning the information for the next query in `getNextPageParam`
- Calling `fetchNextPage` function

```js
import { useInfiniteQuery } from '@tanstack/react-query';

function Projects() {
  const fetchProjects = async ({ pageParam }) => (await fetch('/api/projects?cursor=' + pageParam)).json();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return status === 'pending' ? (<p>Loading...</p>) : status === 'error' ? (<p>Error: {error.message}</p>) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={project.id}>
          {group.data.map((project) => <p key={project.id}>{project.name}</p>)}
        </React.Fragment>
      ))}
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}
```


## <a href="https://tanstack.com/query/latest/docs/framework/react/guides/mutations">Mutations</a>

Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a <span style="color: Magenta;">useMutation</span> hook.

```js
function App() {
  const { isPending, isSuccess, isError, mutate } = useMutation({ 
    mutationFn: (newTodo) => axios.post('/todos', newTodo)
  });
  return (
    <div>
      {isPending ? ('Adding todo...') : (
        <>
          {isError ? (<div>An error occurred: {error.message}</div>) : null}
          {isSuccess ? <div>Todo added!</div> : null}
          <button onClick={() => { mutate({ id: new Date(), title: 'Do Laundry' })}}>Create Todo</button>
        </>
      )}
    </div>
  )
}
```

<u>**Properties of response object:**</u>

- `isIdle` or `status === 'idle'` - The mutation is currently idle or in a fresh/reset state
- `isPending` or `status === 'pending'` - The mutation is currently running
- `isError` or `status === 'error'` - The mutation encountered an error
- `isSuccess` or `status === 'success'` - The mutation was successful and mutation data is available
- `mutate` - It is an asynchronous function used to mutate data on the server. Argument passed in it is recieved in `mutationFn` function.
- `reset` - Used to clear the error or data of a mutation request.
- `error` - If the mutation is in an error state, the error is available via the error property.
- `data` - If the mutation is in a success state, the data is available via the data property.

This hook comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle. These come in handy for both invalidating and refetching queries after mutations and even optimistic updates: 

```js
useMutation({
  mutationFn: addTodo,
  onMutate: (variables) => {
    // A mutation is about to happen!

    // Optionally return a context containing data to use when for example rolling back
    return { id: 1 }
  },
  onError: (error, variables, context) => {
    // An error happened!
    console.log(`rolling back optimistic update with id ${context.id}`)
  },
  onSuccess: (data, variables, context) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, context) => {
    // Error or success... doesn't matter!
  },
})
```



</div>
