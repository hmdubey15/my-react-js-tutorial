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
let person: [string, number] = ["Alice", 30];

console.log(person[0]);  // Output: "Alice"
console.log(person[1]);  // Output: 30
```

<b>OPTIONAL ELEMENT:</b>

You can define a tuple with an optional element using the `?` symbol.

```ts
let tupleVar: [string, number?];

tupleVar = ["Hello"];    // Valid
tupleVar = ["Hello", 42];  // Valid
```

<b>REST ELEMENTS:</b>

Rest elements allow you to define a tuple that can have a variable number of elements of a specific type.

```ts
let tuple: [string, ...number[]];

tuple = ["Alice"];         // Valid
tuple = ["Bob", 1, 2, 3];  // Valid
```

Here, the first element of the tuple is a string, and the remaining elements are numbers, which can be of any length.

<br>

## Functions

Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

<b>Parameter Type Annotations:</b> When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

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
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

Even if you don’t have type annotations on your parameters, TypeScript will still check that you passed the right number of arguments.

<b>Return Type Annotations:</b>

You can also add return type annotations. Return type annotations appear after the parameter list:

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements. The type annotation in the above example doesn’t change anything. Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.

<b style="color:crimson;">void</b> can be used to indicate that function ain't returning anything.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Function Expressions</h3>

```ts
const add = function (x: number, y: number): number {
  return x + y;
};

console.log(add(2, 3));  // Output: 5
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Arrow Functions</h3>

```ts
const multiply = (x: number, y: number): number => {
  return x * y;
};

console.log(multiply(2, 3));  // Output: 6
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Optional parameters</h3>

We can also set optional arguments and default arguments like below code. Although the parameter is specified as type `number`, the x parameter will actually have the type `number | undefined` because unspecified parameters in JavaScript get the value undefined.

```ts
function f(x?: number = 5) {
  // ...
}
f(); // OK
f(10); // OK
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Rest parameters</h3>

We can also define functions that take an unbounded number of arguments using rest parameters. A rest parameter appears after all other parameters, and uses the `...` syntax:

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

<br>

## Objects

Apart from primitives, the most common sort of type you’ll encounter is an <i>object type</i>. This refers to any JavaScript value with properties, which is almost all of them! To define an object type, we simply list its properties and their types.

For example, here’s a function that takes a point-like object:

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

Here, we annotated the parameter with a type with two properties - `x` and `y` - which are both of type `number`. You can use `,` or `;` to separate the properties, and the last separator is optional either way. The `type` part of each property is also optional. If you don’t specify a type, it will be assumed to be `any`.

Object types can also specify that some or all of their properties are optional. To do this, add a `?` after the property name:

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
```

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

The solution is to <i><u><b>narrow</b></u></i> the union with code, the same as you would in JavaScript without type annotations. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code. For example, TypeScript knows that only a `string` value will have a `typeof` value `"string"`:

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

We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name. A `type alias` is exactly that - a `name` for any `type`. You define a type alias using the type keyword followed by the alias name and the type it represents. The syntax for a type alias is:

```ts
type Point = { x: number; y: number; };

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
type Animal = { name: string; }
type Bear = Animal & { honey: boolean; }
```

<br>

# Interfaces

An <span style="color: Cyan;">interface</span> is a way to define the structure of an object. It describes the shape of an object by specifying the types of properties and methods it must have. Interfaces are particularly useful for ensuring that different parts of your codebase conform to a specific contract or shape, promoting consistency and type safety.

```ts
interface User { name: string; age: number; email: string;}
let user: User = { name: 'Alice', age: 30, email: 'alice@example.com' };
```

New fields can always be added in existing interface after defining it:

```ts
interface User { name: string; age: number; email: string; }
interface User { phoneNum: number; }
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Optional Properties</h3>

Interfaces can include optional properties using the `?` symbol.

```ts
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Read-Only Properties</h3>

Properties can be marked as `readonly`, meaning they can only be assigned a value during initialization and cannot be changed afterward.

```ts
interface User {
  readonly id: number; // Error occurs if you try to change the id
  name: string;
}
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Method Signatures</h3>

Interfaces can define methods, specifying the parameters and return type. This allows for consistency in how methods are used across different implementations.

```ts
interface User {
  name: string;
  greet(id: string): string; // greet -> function and return type -> string
}
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Extending Interfaces</h3>

Interfaces can extend other interfaces, allowing you to build on existing interfaces and create more complex structures.

```ts
interface Person { name: string; age: number; }
interface Employee extends Person { employeeId: number; position: string;}
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Interfaces vs Type Aliases</h3>

- Interfaces with the same name merge their declarations, which can lead to unexpected behavior. Type aliases don't merge.
- Interfaces are commonly used for defining object shapes, especially in object-oriented scenarios. Type aliases are useful for defining complex types, function signatures, and union types.

<br>

# Intersection Types

Intersection Types are a way to combine multiple types into a single type. An intersection type represents a type that satisfies all of the constituent types, meaning it includes all the properties and methods of those types. This can be useful when you want to create a type that merges characteristics from several existing types.

<b><u>SYNTAX</u></b>

The syntax for intersection types uses the <b style="color:orange;">&</b> operator:

```ts
type CombinedType = Type1 & Type2;
```

<b><u>EXAMPLE:</u></b>

```ts
interface Person { name: string; age: number; }
interface Employee { employeeId: number; position: string; }
type EmployeePerson = Person & Employee;
const employee: EmployeePerson = { name: "Alice", age: 30, employeeId: 12345, position: "Software Developer" };
console.log(employee);
```

We just looked at two ways to combine types which are similar, but are actually subtly different. With interfaces, we could use an `extends` clause to extend from other types, and we were able to do something similar with intersections and name the result with a type alias. The principal difference between the two is how conflicts are handled, and that difference is typically one of the main reasons why you’d pick one over the other between an interface and a type alias of an intersection type. If interfaces are defined with the same name, TypeScript will attempt to merge them if the properties are compatible. If the properties are not compatible (i.e., they have the same property name but different types), TypeScript will raise an error. In the case of intersection types, properties with different types will be merged automatically. When the type is used later, TypeScript will expect the property to satisfy both types simultaneously, which may produce unexpected results.

For example, the following code will throw an error because the properties are incompatible:

```ts
interface Person { name: string; }
interface Person { name: number; }
```

In contrast, the following code will compile, but it results in a `never` type:

```ts
interface Person1 { name: string; }
interface Person2 { name: number; }
type Staff = Person1 & Person2 
declare const staffer: Staff;
staffer.name;
```

In this case, `Staff` would require the name property to be both a string and a number, which results in property being of type `never`.

<br>

# Type Assertions

Type assertions in TypeScript allow you to override the type checker by specifying a more specific or more general type than TypeScript might infer. They are used when you, as the developer, know more about the type of a value than TypeScript does.

For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.

In this situation, you can use a type assertion to specify a more specific type:

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

<b style="color:red;">NOTE:</b> Type assertions don’t perform any runtime checks—they are purely for the type checker. If you assert a type incorrectly, it can lead to runtime errors.

You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:

```tsx
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:

```ts
const x = "hello" as number; // ❌ Error!!
```

<br>

# Literal Types

Literal Types are a way to define types that are restricted to a specific set of values. These values can be strings, numbers, booleans, or even complex combinations. Literal types are often used to create more precise types by narrowing the allowed values for a variable.

By themselves, literal types aren’t very valuable:

```ts
let x: "hello";
// OK
x = "hello";
// ...
x = "howdy"; // ❌ Error!!
```

It’s not much use to have a variable that can only have one value!

But by combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values:

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "top"); // ❌ Error!! Argument of type '"top"' is not assignable to parameter of type '"left" | "right" | "center"'.
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
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic"); // ❌ Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

<br>

# null and undefined

JavaScript has two primitive values used to signal absent or uninitialized value: `null` and `undefined`.

- `undefined`: In JavaScript and TypeScript, `undefined` is a value automatically assigned to variables that have been declared but not yet assigned a value. 

  ```ts
  let x: number;
  console.log(x);  // Output: undefined
  ``` 
- `null`: It is a value that explicitly represents the intentional absence of any object value.

  ```ts
  let z: null = null;  // Valid
  ```

In TypeScript, both `null` and `undefined` are types that can be used directly in type annotations. By default, TypeScript allows `null` and `undefined` to be assigned to any type, but this behavior can be changed.

When <span style="color: Crimson;">strictNullChecks</span> is enabled (which is recommended), null and undefined are not considered valid values for any type unless explicitly stated. This makes your code safer by preventing unintended null or undefined errors.

```ts
let num: number = 5;
num = null;  // Error: Type 'null' is not assignable to type 'number'.
```

In strict mode, if you want to allow `null` or `undefined` as a value, you must explicitly include them in the type:

```ts
let maybeNumber: number | null | undefined;
maybeNumber = 10;  // Valid
maybeNumber = null;  // Valid
maybeNumber = undefined;  // Valid
```

<br>

# Generics

Generics provide a way to define functions, classes, or interfaces that can operate on different types without sacrificing the advantages of TypeScript's strong typing system. They enable you to define a component (like a function or class) where the type is not specified until the component is used. This is particularly useful for creating flexible, reusable code.

## Generic Function

```ts
function identity<T>(arg: T): T { return arg; }

let output1 = identity<string>("Hello");  // T is string
let output2 = identity<number>(42);       // T is number
```

- `identity<string>("Hello")`: Here, `T` is replaced with string, so the function takes a string and returns a string.
- `identity<number>(42)`: Here, T is replaced with number, so the function takes a number and returns a number.

Sometimes, you may want to restrict the types that can be used with a generic. This is done using constraints.

```ts
interface Lengthwise { length: number; }

function logLength<T extends Lengthwise>(arg: T): T { console.log(arg.length); return arg; }

logLength("Hello");  // Output: 5
logLength([1, 2, 3]);  // Output: 3
logLength(10);  // Error: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'
```

- Constraint: `T extends Lengthwis`e` ensures that `T` must have a `length` property, so the function can safely access `length` on `arg`.
- Usage: The function works with any type that has a `length` property (e.g., strings, arrays), but not with types that don't (e.g., numbers).

## Generic Interface

You can also create generic interfaces to describe the shape of objects that can work with different types.

```ts
interface Box<T> { contents: T; }

let stringBox: Box<string> = { contents: "Hello" };
let numberBox: Box<number> = { contents: 100 };
```

- `Box<T>`: This generic interface has a single property `contents` of type `T`.
- `stringBox` is a Box that holds a string, while `numberBox` holds a `number`.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">The Array type</h3>

Generic object types are often some sort of container type that work independently of the type of elements they contain. It’s ideal for data structures to work this way so that they’re re-usable across different data types. It turns out we’ve been working with a type just like that throughout this handbook: the <b style="color:OrangeRed;">Array</b> type. Whenever we write out types like `number[]` or `string[]`, that’s really just a shorthand for `Array<number>` and `Array<string>`. 

The <b style="color:OrangeRed;">ReadonlyArray</b> is a special type that describes arrays that shouldn’t be changed. When we see a function that returns `ReadonlyArray`, it tells us we’re not meant to change the contents at all, and when we see a function that consumes `ReadonlyArray`, it tells us that we can pass any array into that function without worrying that it will change its contents.

Much like the `Box` type above, `Array` itself is a generic type. Modern JavaScript also provides other data structures which are generic, like <b style="color:OrangeRed;">Map< K, V ></b>, <b style="color:OrangeRed;">Set< T ></b>, and <b style="color:OrangeRed;">Promise< T ></b>. All this really means is that because of how Map, Set, and Promise behave, they can work with any sets of types.

<br>

# Modules

Types can be exported and imported using the same syntax as JavaScript values:

```ts
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
 
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}
 
// @filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;
```

</div>
