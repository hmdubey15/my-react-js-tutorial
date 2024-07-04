<div style="font-size: 17px;background: black;padding: 2rem;">

Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

## Parameter Type Annotations

When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

```ts
// Parameter type annotation
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}
```

When a parameter has a type annotation, arguments to that function will be checked:

```ts
// Would be a runtime error if executed!
greet(42);
// ❌ Argument of type 'number' is not assignable to parameter of type 'string'.
```

<b style="color:red;">NOTE:</b> Even if you don’t have type annotations on your parameters, TypeScript will still check that you passed the right number of arguments.

You can use parameter destructuring to conveniently unpack objects provided as an argument into one or more local variables in the function body.

```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

Of course Type Aliases and Interfaces can be used!

<br>

## Return Type Annotations

You can also add return type annotations. Return type annotations appear after the parameter list:

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

<span style="color: Coral;">Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements.</span> The type annotation in the above example doesn’t change anything. Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.

If you want to annotate the return type of a function which returns a promise, you should use the Promise type:

```ts
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

If you want to annotate the return type of a function which returns a promise, you should use the `Promise` type:

```ts
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

<br>

## Anonymous Functions

Anonymous functions are a little bit different from function declarations. <span style="color: Cyan;">When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.</span>

```ts
const names = ['Alice', 'Bob', 'Eve'];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

Even though the parameter `s` didn’t have a type annotation, TypeScript used the types of the `forEach` function, along with the inferred type of the array, to determine the type `s` will have. This process is called <u>**contextual typing**</u> because the context that the function occurred within informs what type it should have.

<br>

## Function Type Expressions

The simplest way to describe a function is with a <span style="color: Orange;">function type expression</span>. These types are syntactically similar to arrow functions:

```ts
function greeter(fn: (a: string) => void) {
  fn('Hello, World');
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

The syntax `(a: string) => void` means “a function with one parameter, named `a`, of type `string`, that doesn’t have a return value”. Just like with function declarations, if a parameter type isn’t specified, it’s implicitly `any`. Note that the parameter name is **required**.

Of course, <span style="color: Violet;">we can use a type alias to name a function type:</span>

```ts
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

<br>

## Optional Parameters

We can also set optional arguments and default arguments like below code. Although the parameter is specified as type `number`, the x parameter will actually have the type `number | undefined` because unspecified parameters in JavaScript get the value undefined.

```ts
function f(x?: number = 5) {
  // ...
}
f(); // OK
f(10); // OK
```

<span style="color: HotPink;">You can also provide a parameter default:</span>

```ts
function f(x = 10) {
  // ...
}
```

<br>

## Rest parameter and arguments

<b style="color:Salmon;">Rest Parameters:</b> In addition to using optional parameters or overloads to make functions that can accept a variety of fixed argument counts, we can also define functions that take an unbounded number of arguments using rest parameters.

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

<b style="color:Cyan;">Rest Arguments:</b> Conversely, we can provide a variable number of arguments from an iterable object (for example, an array) using the spread syntax. For example, the push method of arrays takes any number of arguments:

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

<span style="color: Yellow;">Note that in general, TypeScript does not assume that arrays are immutable.</span> This can lead to some surprising behavior (because `Math.atan2` expects only 2 arguments):

```ts
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
// ❌ A spread argument must either have a tuple type or be passed to a rest parameter.
```

The best fix for this situation depends a bit on your code, but in general a `const` context is the most straightforward solution:

```ts
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

<br>

## Other Types to Know About

There are some additional types you’ll want to recognize that appear often when working with function types. Like all types, you can use them everywhere, but these are especially relevant in the context of functions.

<b style="color:magenta;">1. void</b>: `void` represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any return statements, or doesn’t return any explicit value from those return statements:

```ts
// The inferred return type is void
function noop() {
  return;
}
```

<b style="color:red;">NOTE:</b> In JavaScript, a function that doesn’t return any value will implicitly return the value `undefined`. However, `void` and `undefined` are not the same thing in TypeScript.

Contextual typing with a return type of `void` does not force functions to not return something. Another way to say this is <span style="color: Coral;">a contextual function type with a `void` return type (`type voidFunc = () => void`), when implemented, can return any other value, but it will be ignored.</span>

Thus, the following implementations of the type `() => void` are valid:

```ts
type voidFunc = () => void;

const f1: voidFunc = () => true;

const f2: voidFunc = () => true;
```

And when the return value of one of these functions is assigned to another variable, it will retain the type of `void`:

```ts
const v1 = f1();

const v2 = f2();
```

This behavior exists so that the following code is valid even though `Array.prototype.push` returns a number and the `Array.prototype.forEach` method expects a function with a return type of `void`.

```ts
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
```

<span style="color: Yellow;">When a literal function definition has a `void` return type, that function must not return anything.</span>

```ts
function f2(): void {
  // @ts-expect-error
  return true;
}
```

<b style="color:magenta;">2. unknown</b>: The `unknown` type represents `any` value. This is similar to the `any` type, but is safer because it’s not legal to do anything with an `unknown` value:

```ts
function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  a.b();
  // ❌ 'a' is of type 'unknown'.
}
```

You can describe a function that returns a value of `unknown` type:

```ts
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

<b style="color:magenta;">3. never</b>: Some functions never return a value. The `never` type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

`never` also appears when TypeScript determines there’s nothing left in a union.

```ts
function fn(x: string | number) {
  if (typeof x === 'string') {
    // do something
  } else if (typeof x === 'number') {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

<b style="color:magenta;">4. object</b>: The special type `object` refers to any value that isn’t a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, or `undefined`). This is different from the empty object type `{ }`, and also different from the global type `Object`. It’s very likely you will never use `Object`. Note that in JavaScript, function values are objects: They have properties, have `Object.prototype` in their prototype chain, are `instanceof Object`, you can call `Object.keys` on them, and so on. For this reason, function types are considered to be `object`s in TypeScript.

<b style="color:magenta;">5. Function</b>: The global type `Function` describes properties like `bind`, `call`, `apply`, and others present on all function values in JavaScript. It also has the special property that values of type `Function` can always be called; these calls return `any`:

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

This is an untyped function call and is generally best avoided because of the unsafe any return type. If you need to accept an arbitrary function but don’t intend to call it, the type `() => void` is generally safer.

<br>

## Declaring `this` in a Function

TypeScript will infer what the `this` should be in a function via code flow analysis, for example in the following:

```ts
const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```

TypeScript understands that the function `user.becomeAdmin` has a corresponding `this` which is the outer object `user`. This can be enough for a lot of cases, but there are a lot of cases where you need more control over what object this represents. <span style="color: SpringGreen;">The JavaScript specification states that you cannot have a parameter called `this`, and so TypeScript uses that syntax space to let you declare the type for this in the function body.</span>

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

This pattern is common with callback-style APIs, where another object typically controls when your function is called.

</div>
