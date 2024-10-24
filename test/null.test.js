const { create, env } = require("sanctuary");
const S = create({ checkTypes: false, env: env });

class Person {
  constructor(name) {
    this.name = S.Just(name);
  }
}
class AnonymousPerson extends Person {
  constructor() {
    super();
    this.name = S.Nothing();
  }
}
const capitalize = (string) => string[0].toUpperCase() + string.substring(1);
const tigerify = (string) => `${string}, the tiger`;
const display = (string) => string.toString();

test("Displaying a person", () => {
  const personOne = new Person("tony");

  expect(personOne.name.map(capitalize).map(tigerify).map(display)).toBe(
    "Tony, the tiger"
  );
});
// test("Displaying an anonymous person", () => {
//   const personTwo = new AnonymousPerson("tony");
//   expect(S.fromMaybe("", personTwo.name.map(capitalize).map(tigerify))).toBe(
//     ""
//   );
// });
