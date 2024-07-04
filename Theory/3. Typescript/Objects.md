<div style="font-size: 17px;background: black;padding: 2rem;">

Apart from primitives, the most common sort of type you’ll encounter is an object type. This refers to any JavaScript value with properties, which is almost all of them! To define an object type, we simply list its properties and their types.

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

<br>

# Interface

An `interface` is a way to define the structure of an object. It describes the shape of an object by specifying the types of properties and methods it must have. Interfaces are particularly useful for ensuring that different parts of your codebase conform to a specific contract or shape, promoting consistency and type safety.

```ts
interface User {
  name: string;
  age: number;
  email: string;
}
let user: User = { name: 'Alice', age: 30, email: 'alice@example.com' };
```

New fields can always be added in existing interface after defining it:

```ts
interface User {
  name: string;
  age: number;
  email: string;
}
interface User {
  phoneNum: number;
}
```

<span style="color: OrangeRed;">We cannot set default values directly on interface properties, as interfaces only define the structure or shape of an object and do not contain implementation details.</span>

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Extending Interfaces</h3>

Interfaces can extend other interfaces, allowing you to build on existing interfaces and create more complex structures.

```ts
interface Person {
  name: string;
  age: number;
}
interface Employee extends Person {
  employeeId: number;
  position: string;
}
```

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Interfaces vs Type Aliases</h3>

- Interfaces are used to define the shape of an object or a class while type aliases are used to create a new name for any type (e.g., primitive, object, union, or intersection types).
- Interfaces with the same name are automatically merged if properties are compatible else if the properties are not compatible (i.e., they have the same property name but different types), TypeScript will raise an error. On the other hand type aliases with the same name will always result in a compilation error.
- Interfaces are slightly better for performance when used in object-oriented programming because they are optimized for representing object shapes while type aliases are more suitable for complex type operations (e.g., unions, intersections), which may not be directly supported by interfaces.

<h3 style="border-bottom: 2px solid white; padding-bottom: 2px; display: inline-block;">Intersection Types</h3>

Interfaces allowed us to build up new types from other types by extending them. TypeScript provides another construct called <span style="color: Gold;">intersection types</span> that is mainly used to combine existing object types. An intersection type is defined using the <b style="color:Coral;">&</b> operator.

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
```

Here, we’ve intersected `Colorful` and `Circle` to produce a new type that has all the members of `Colorful` and `Circle`.

<div style="border: 1px solid yellow; padding: 10px; background: rgba(103, 114, 230, 0.2);">

The principal difference between extending interfaces and using intersection types is how name conflicts are handled, and that difference is typically one of the main reasons why you’d pick one over the other.
<br>


If interfaces are defined with the same name, TypeScript will attempt to merge them if the properties are compatible. If the properties are not compatible (i.e., they have the same property name but different types), TypeScript will raise an error.
<br>

In the case of intersection types, properties with different types will be merged automatically. When the type is used later, TypeScript will expect the property to satisfy both types simultaneously, which may produce unexpected results.
</div>

<br>

# Optional Properties

Object types can also specify that some or all of their properties are optional. To do this, add a `?` after the property name:

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
```

In JavaScript, if you access a property that doesn’t exist, you’ll get the value `undefined` rather than a runtime error. Because of this, when you read from an optional property, you’ll have to check for `undefined` before using it.

```ts
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  // 'obj.last' is possibly 'undefined'.

  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

<b style="color:Orange;">Default Values</b> are a great way of dealing with optional properties.

```ts
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  // ...
}
```

<br>

# Readonly Properties

Properties can also be marked as `readonly` for TypeScript. While it won’t change any behavior at runtime, a property marked as `readonly` can’t be written to during type-checking.

```ts
interface SomeType {
  readonly prop: string;
}
```

<br>

# Index Signatures

Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values. In those cases you can use an index signature to describe the types of possible values, for example:

```ts
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = { 0: 'Hi', 1: 'How', 2: 'Are', 3: 'You' };
```

<span style="color: HotPink;">Note that in above code, `myArray` is not an array just because keys are numbers. It is an object only. </span>

<b style="color:red;">NOTE:</b> Only some types are allowed for index signature properties: `string`, `number`, `symbol`, template string patterns, and union types consisting only of these.

</div>
