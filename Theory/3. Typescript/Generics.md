<div style="font-size: 17px;background: black;padding: 2rem;">

Generics provide a way to define functions, classes, or interfaces that can operate on different types without sacrificing the advantages of TypeScript's strong typing system. They enable you to define a component (like a function or class) where the type is not specified until the component is used. This is particularly useful for creating flexible, reusable code.

Generics are placeholders for types that you can specify later. They allow you to define functions, classes, interfaces, and types that can work with different types while maintaining type safety.

## Generic Functions

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>('Hello'); // T is string
let output2 = identity<number>(42); // T is number
```

- `identity<string>("Hello")`: Here, `T` is replaced with string, so the function takes a string and returns a string.
- `identity<number>(42)`: Here, T is replaced with number, so the function takes a number and returns a number.

You can define functions that accept multiple generic type parameters.

```ts
function combine<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Usage
const pair = combine<number, string>(1, 'hello'); // [1, "hello"]
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Constraints</h3>

Generic constraints allow you to restrict the types that can be passed to a generic. This is done using the <b style="color:HotPink;">extends</b> keyword. This ensures type safety while still maintaining flexibility.

**SYNTAX:**

```ts
function functionName<T extends ConstraintType>(arg: T): ReturnType {
  // Function implementation
}
```

Here, `T` is the generic type parameter, and `ConstraintType` is the type that `T` must extend or satisfy.

<u>Example 1: Basic Constraint</u>

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("Hello"); // ✅ Works (string has length)
getLength([1, 2, 3]); // ✅ Works (array has length)
getLength({ length: 5 }); // ✅ Works (object with length)

getLength(123); // ❌ Error: number doesn't have a 'length' property
```

Explanation:

- `T extends { length: number }` means `T` must have a `length` property of type `number`.
- It restricts `T` to types like strings, arrays, or objects with length.

<u>Example 2: Constraints with interfaces</u>

```ts
interface HasId {
  id: number;
}

function printId<T extends HasId>(item: T): void {
  console.log(item.id);
}

printId({ id: 1, name: "Alice" }); // Output: 1
printId({ name: "Bob" }); // Error: Property 'id' is missing
```

Here, `T` must be an object that includes an `id` property of type `number`.

<u>Example 3: Constraints with unions</u>

```ts
function printId<T extends string | number>(id: T): void {
  console.log(`ID: ${id}`);
}

printId(101);      // ✅ Works
printId("ABC123"); // ✅ Works
printId(true);     // ❌ Error: 'boolean' is not assignable to 'string | number'
```

<br>

## Generic Interfaces

You can define interfaces that use generics to create reusable type definitions.

```ts
interface Pair<T, U> {
  first: T;
  second: U;
}

const pair: Pair<number, string> = { first: 42, second: 'Hello' };
```

`T` and `U` are placeholders for the types of `first` and `second`.

<br>

## The `Array` Type

Generic object types are often some sort of container type that work independently of the type of elements they contain. It’s ideal for data structures to work this way so that they’re re-usable across different data types.

It turns out we’ve been working with a type just like that throughout this handbook: the `Array` type. Whenever we write out types like `number[]` or `string[]`, that’s really just a shorthand for `Array<number>` and `Array<string>`.

```ts
function doSomething(value: Array<string>) {
  // ...
}
 
let myArray: string[] = ["hello", "world"];
 
// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

<br>

## Generic Classes

Generic classes allow you to define a class that works with multiple types.

```ts
class Box<T> {
  private contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  getContents(): T {
    return this.contents;
  }
}

// Usage
const stringBox = new Box<string>('Hello');
console.log(stringBox.getContents()); // "Hello"

const numberBox = new Box<number>(123);
console.log(numberBox.getContents()); // 123
```

<br>

## Generic Types

You can create reusable type aliases using generics.

```ts
type Response<T> = {
  data: T;
  error: string | null;
};

const userResponse: Response<{ id: number; name: string }> = {
  data: { id: 1, name: 'Alice' },
  error: null,
};
```

<br>

## Default Type Parameters

You can provide default values for generic types, making them optional.

```ts
function identity<T = string>(arg: T): T {
  return arg;
}

// Usage
const result = identity(); // T defaults to string
```

</div>
