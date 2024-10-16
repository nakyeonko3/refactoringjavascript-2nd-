class Person {
  constructor(name) {
    this.name = new NameString(name);
  }
}

class AnonymousPerson extends Person {
  constructor() {
    super();
    this.name = new NullString();
  }
}

class NullString {
  capitalize() {
    return this; // same as new NullString in this case
  }
  tigerify() {
    return this; // same as new NullString in this case
  }
  display() {
    return "";
  }
}

class NameString extends String {
  capitalize() {
    return new NameString(this[0].toUpperCase() + this.substring(1));
  }
  tigerify() {
    return new NameString(`${this}, the tiger`);
  }
  display() {
    return this.toString();
  }
}

personOne = new Person("tony");
personTwo = new AnonymousPerson("tony");
console.log(personOne.name.capitalize().tigerify().display());
console.log(personTwo.name.capitalize().tigerify().display());

test("Displaying a person", () => {
  const personOne = new Person("tony");
  expect(personOne.name.capitalize().tigerify().display()).toBe(
    "Tony, the tiger"
  );
});

test("Displaying an anonymous person", () => {
  const personTwo = new AnonymousPerson("tony");
  expect(personTwo.name.capitalize().tigerify().display()).toBe("");
});
