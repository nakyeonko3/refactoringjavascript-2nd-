class Dog {
  constructor() {
    this.cost = 50;
  }
  displayPrice() {
    return `The dog costs $${this.cost}.`;
  }
}

function Cute(dog) {
  const cuteDog = Object.create(dog);
  cuteDog.cost = dog.cost + 20;
  return cuteDog;
}

function Trained(dog) {
  const trainedDog = Object.create(dog);
  trainedDog.cost = dog.cost + 60;
  return trainedDog;
}

test("trained dog price", () => {
  expect(Trained(new Dog()).displayPrice()).toBe("The dog costs $110.");
});

test("cute dog price", () => {
  expect(Cute(new Dog()).displayPrice()).toBe("The dog costs $70.");
});

test("base dog price", () => {
  expect(new Dog().displayPrice()).toBe("The dog costs $50.");
});
