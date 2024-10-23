import { compose, map } from "ramda";

const square = (a) => a * a;
const fourthPower = map(compose(square, square));
console.log(fourthPower([3, 4, 5]));
