import pkg from "lodash";
const { map } = pkg;
const square = (a) => a * a;
console.log(map([3, 4, 5], square));

const mapSquare = (data) => map(data, square);
console.log(mapSquare([3, 4, 5]));
