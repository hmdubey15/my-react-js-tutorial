let person: [name: string, age: number] = ["Alice", 30];

function printPersonInfo(person: [name: string, age: number]) {
  console.log(`Name: ${person[0]}, Age: ${person[1]}`);
}

printPersonInfo(person);  // Output: "Name: Alice, Age: 30"
