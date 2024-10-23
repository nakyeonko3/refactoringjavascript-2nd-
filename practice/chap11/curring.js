import { curry } from "ramda";

function add(numberOne, numberTwo) {
  return numberOne + numberTwo;
}

const curried = curry(add);
console.log(curried(1)(2));
console.log(curried(1, 2));
