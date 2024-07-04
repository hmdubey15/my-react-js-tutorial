<div style="font-size: 17px;background: black;padding: 2rem;">

Consider the following code:

```js
const message = 'Hello World!';
message();
```

This code fails with exception: `TypeError: message is not a function`

It’d be great if we could avoid mistakes like this.

When we run our code, the way that our JavaScript runtime chooses what to do is by figuring out the type of the value - what sorts of behaviors and capabilities it has. That’s part of what that `TypeError` is alluding to - it’s saying that the string `"Hello World!"` cannot be called as a function.

For some values, such as the primitives `string` and `number`, we can identify their type at runtime using the `typeof` operator. But for other things like functions, there’s no corresponding runtime mechanism to identify their types. For example, consider this function:

```js
function fn(x) {
  return x.flip();
}
```

We can observe by reading the code that this function will only work if given an object with a callable `flip` property, but JavaScript doesn’t surface this information in a way that we can check while the code is running. The only way in pure JavaScript to tell what `fn` does with a particular value is to call it and see what happens. This kind of behavior makes it hard to predict what the code will do before it runs, which means it’s harder to know what your code is going to do while you’re writing it.

JavaScript is a loosely typed language. It can be difficult to understand what types of data are being passed around in JavaScript. In JavaScript, function parameters and variables don't have any information! So developers need to look at documentation, or guess based on the implementation. Here comes the <b style="color: Orange;">TypeScript</b>!

TypeScript is an open-source programming language developed and maintained by Microsoft. It is a superset of JavaScript, which means it builds upon JavaScript by adding new features and capabilities while keeping all the existing functionality intact. The most significant addition TypeScript brings to JavaScript is <b style="color: PaleGreen;">static typing</b>, allowing developers to specify types for variables, function parameters, and object properties. It helps catch errors during the development process rather than at runtime and improves the maintainability and scalability of JavaScript codebases, particularly for large projects.

To run TypeScript, you need to compile it to JavaScript. This is because browsers and most JavaScript environments only understand JavaScript, not TypeScript. Steps to run TypeScript:

1. TypeScript has an official compiler called <span style="color: Chartreuse;">tsc</span> which can be installed through `npm`. Install it using below command:

   ```bash
   npm install -g typescript
   ```

2. Create a TypeScript file with <span style="color: CyDarkKhakian;">.ts</span> file extension (e.g. `App.ts`) and write code in it.

3. Compile TypeScript to JavaScript using `tsc` command. This will create a corresponding JavaScript file (e.g. `app.js`).

   ```bash
   tsc app.ts
   ```

4. Run the generated JavaScript file.

<br>

# Type Annotations

Type annotations in TypeScript are a way to explicitly declare the types of variables, function parameters, function return values, and other expressions in your code. They help TypeScript understand what kind of values you're working with, enabling the compiler to catch errors during development before they reach runtime. By specifying the expected type, you can ensure that your code behaves as intended and avoid common bugs related to type mismatches.

<b><u>BASIC SYNTAX:</u></b>

The syntax for type annotations is simple. You add a `colon (:)` followed by the type after the variable name, function parameter, or return value.

```ts
let variableName: type = value;
```

There are 3 primitive types in both JS and TS - <span style="color: Violet;">boolean</span>, <span style="color: Violet;">number</span> and <span style="color: Violet;">string</span>. TypeScript also has a special type, <span style="color: Violet;">any</span>, that you can use whenever you don’t want a particular value to cause typechecking errors. When a value is of type `any`, you can access any properties of it (which will in turn be of type any), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:

```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;
```

<b style="color:HotPink;">Implicit Type Assignment</b>: It refers to the automatic determination of a variable's type by the TypeScript compiler without the need for an explicit type annotation. This process is known as <span style="color: Gold;"><u>type inference</u></span>. TypeScript can infer the type of a variable, function, or expression based on the assigned value or the context in which it is used. Example:

```ts
let message = 'Hello, TypeScript!'; // TypeScript infers the type as string
let count = 42; // TypeScript infers the type as number
let isCompleted = true; // TypeScript infers the type as boolean
```

<br>

## Arrays

TypeScript has a specific syntax for typing arrays.

```ts
const names: string[] = [];
names.push('Dylan'); // no error
names.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

TypeScript can infer the type of an array if it has values.

```ts
const numbers = [1, 2, 3]; // inferred to type number[]
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Tuple Types</h3>

Tuple Types are a specialized form of arrays where the length and types of the elements are known and fixed. Unlike regular arrays, where each element is of the same type, tuples allow you to define an array with a specific number of elements, each of a different type if needed. TypeScript enforces the order and type of the elements, ensuring that you can only assign values that match the declared types.

<b>DECLARING TUPLE:</b>

A tuple is declared by specifying the types of its elements in a fixed order within square brackets `[]`.

```ts
let tupleVar: [string, number];
```

`tupleVar` is a variable that can hold a `tuple` where the first element is a `string` and the second element is a `number`.

<b>EXAMPLE:</b>

```ts
let person: [string, number] = ['Alice', 30];

console.log(person[0]); // Output: "Alice"
console.log(person[1]); // Output: 30
```

<b>OPTIONAL ELEMENT:</b>

You can define a tuple with an optional element using the `?` symbol.

```ts
let tupleVar: [string, number?];

tupleVar = ['Hello']; // Valid
tupleVar = ['Hello', 42]; // Valid
```

<b>REST ELEMENTS:</b>

Rest elements allow you to define a tuple that can have a variable number of elements of a specific type.

```ts
let tuple: [string, ...number[]];

tuple = ['Alice']; // Valid
tuple = ['Bob', 1, 2, 3]; // Valid
```

Here, the first element of the tuple is a string, and the remaining elements are numbers, which can be of any length.

<br>

# Union Types

Union types in TypeScript allow a variable to hold more than one type, providing flexibility while maintaining type safety. With union types, you can specify that a variable or a function parameter can accept values of multiple types.

<b><u>SYNTAX:</u></b>

A union type is written using the pipe (`|`) symbol between the types.

```ts
let value: string | number; // Here, `value` can either be string or number
```

TypeScript will only allow an operation if it is valid for every member of the union. For example, if you have the union `string | number`, you can’t use methods that are only available on `string`:

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase()); // ERROR ❌: Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.
}
```

The solution is to <u><b>narrow</b></u> the union with code, the same as you would in JavaScript without type annotations. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code. For example, TypeScript knows that only a `string` value will have a `typeof` value `"string"`:

```ts
function printId(id: number | string) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase()); // In this branch, id is of type 'string'
  } else {
    console.log(id); // Here, id is of type 'number'
  }
}
```

Another example: Use a function like `Array.isArray`:

```ts
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    console.log('Hello, ' + x.join(' and ')); // Here: 'x' is 'string[]'
  } else {
    console.log('Welcome lone traveler ' + x); // Here: 'x' is 'string'
  }
  // Notice that in the else branch, we don’t need to do anything special - if x wasn’t a string[], then it must have been a string.
}
```

Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a `slice` method. If every member in a union has a property in common, you can use that property without narrowing:

```ts
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

<br>

# Type Aliases

We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name. A `type alias` is exactly that - a `name` for any `type`. You define a type alias using the <b style="color:SpringGreen;">type</b> keyword followed by the alias name and the type it represents. The syntax for a type alias is:

```ts
type Point = { x: number; y: number };

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

You can actually use a type alias to give a name to any type at all, not just an object type. For example, a type alias can name a union type:

```ts
type ID = number | string;
```

Extending a type via intersections:

```ts
type Animal = { name: string };
type Bear = Animal & { honey: boolean };
```

Note that aliases are <u>**only**</u> aliases - you cannot use type aliases to create different/distinct “versions” of the same type. When you use the alias, it’s exactly as if you had written the aliased type. In other words, this code might look illegal, but is OK according to TypeScript because both types are aliases for the same type:

```ts
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// Create a sanitized input
let userInput = sanitizeInput(getInput());
 
// Can still be re-assigned with a string though
userInput = "new input";
```

<br>

# Type Assertions

Sometimes you will have information about the type of a value that TypeScript can’t know about. For example, if you’re using `document.getElementById`, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.

In this situation, you can use a type assertion to specify a more specific type:

```ts
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
```

<b style="color:red;">NOTE:</b> Type assertions don’t perform any runtime checks—they are purely for the type checker. If you assert a type incorrectly, it can lead to runtime errors.

You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:

```tsx
const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas');
```

TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:

```ts
const x = 'hello' as number; // ❌ Error!!
```

<br>

# Literal Types

Literal Types are a way to define types that are restricted to a specific set of values. These values can be strings, numbers, booleans, or even complex combinations. Literal types are often used to create more precise types by narrowing the allowed values for a variable.

By themselves, literal types aren’t very valuable:

```ts
let x: 'hello';
// OK
x = 'hello';
// ...
x = 'howdy'; // ❌ Error!!
```

It’s not much use to have a variable that can only have one value!

But by combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values:

```ts
function printText(s: string, alignment: 'left' | 'right' | 'center') {
  // ...
}
printText('Hello, world', 'left');
printText("G'day, mate", 'top'); // ❌ Error!! Argument of type '"top"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

Numeric literal types work the same way:

```ts
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

Of course, you can combine these with non-literal types:

```ts
interface Options {
  width: number;
}
function configure(x: Options | 'auto') {
  // ...
}
configure({ width: 100 });
configure('auto');
configure('automatic'); // ❌ Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

<br>

# null and undefined

JavaScript has two primitive values used to signal absent or uninitialized value: `null` and `undefined`.

- `undefined`: In JavaScript and TypeScript, `undefined` is a value automatically assigned to variables that have been declared but not yet assigned a value.

  ```ts
  let x: number;
  console.log(x); // Output: undefined
  ```

- `null`: It is a value that explicitly represents the intentional absence of any object value.

  ```ts
  let z: null = null; // Valid
  ```

In TypeScript, both `null` and `undefined` are types that can be used directly in type annotations. By default, TypeScript allows `null` and `undefined` to be assigned to any type, but this behavior can be changed.

When <span style="color: Crimson;">strictNullChecks</span> is enabled (which is recommended), null and undefined are not considered valid values for any type unless explicitly stated. This makes your code safer by preventing unintended null or undefined errors.

```ts
let num: number = 5;
num = null; // Error: Type 'null' is not assignable to type 'number'.
```

In strict mode, if you want to allow `null` or `undefined` as a value, you must explicitly include them in the type:

```ts
let maybeNumber: number | null | undefined;
maybeNumber = 10; // Valid
maybeNumber = null; // Valid
maybeNumber = undefined; // Valid
```

<br>

# Modules

Types and interfaces can be exported and imported using the same syntax as JavaScript values:

```ts
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };

export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}

// @filename: app.ts
import { Cat, Dog } from './animal.js';
type Animals = Cat | Dog;
```

</div>
