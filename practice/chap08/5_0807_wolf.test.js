function coinToss() {
  return Math.random() > 0.5;
}

class User {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    return `my name is ${this.name}`;
  }
}

class Project {
  constructor(name) {
    this.name = name;
  }
  sayTheName() {
    return `the project name is ${this.name}`;
  }
}

// Jest tests
describe("Agent", () => {
  test("should assign type correctly based on random value", () => {
    let agent;
    if (coinToss()) {
      agent = new User("name");
    } else {
      agent = new Project("name");
    }

    if (agent instanceof User) {
      expect(agent).toBeInstanceOf(User);
      expect(agent.sayName()).toBe("my name is name");
    } else {
      expect(agent).toBeInstanceOf(Project);
      expect(agent.sayTheName()).toBe("the project name is name");
    }
  });
});

// describe("User", () => {
//   test("should return correct name", () => {
//     const user = new User("name", "user");
//     expect(user.sayName()).toBe("my name is name");
//   });
// });

// describe("Project", () => {
//   test("should return correct name", () => {
//     const project = new Project("name", "project");
//     expect(project.sayTheName()).toBe("the project name is name");
//   });
// });
