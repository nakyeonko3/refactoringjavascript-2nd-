import { map } from "ramda";

const square = (a) => a * a;
console.log([2, 4, 5].map(square));

const mapSquare = map(square);
console.log(mapSquare([2, 4, 5]));
console.log(map(square, [2, 4, 5]));
