// import { describe, it } from "mocha";

const assert = require("assert");
const deepEqual = require("deep-equal");
const { describe } = require("mocha");

const valueFromNumber = (hand) => {
  return hand.map((item) => item.split("-")[0]);
};

const valueFromShape = (hand) => {
  return hand.map((item) => item.split("-")[1]);
};

const numberCountFromCards = (hand) => {
  return valueFromNumber(hand).reduce((pre, curr) => {
    if (pre[curr]) {
      pre[curr] = pre[curr] + 1;
    } else {
      pre[curr] = 1;
    }
    return pre;
  }, {});
};

// "2-H", "3-C", "4-D", "5-E", "2-C"
// 위의 값을 입력받고, 위의 값 중에 '앞에 있는 숫자'만 뽑아서 같은 숫자가 몇개 있는지 반환
const multiplesIn = (hand) => {
  const numberCountObj = valueFromNumber(hand).reduce((pre, curr) => {
    if (pre[curr]) {
      pre[curr] = pre[curr] + 1;
    } else {
      pre[curr] = 1;
    }
    return pre;
  }, {});
  let max = -1;
  for (const [key, value] of Object.entries(numberCountObj)) {
    max = Math.max(value, max);
  }
  return max;
};

const isPair = (hand) => {
  const result = multiplesIn(hand);
  return result === 2;
};

const isTriple = (hand) => {
  const result = multiplesIn(hand);
  return result === 3;
};

const isFlush = (hand) => {
  return multiplesIn(valueFromShape(hand)) === 5;
};

const isStraight = (hand) => {
  const numberCountObj = numberCountFromCards(hand);
  const keyArray = Object.keys(numberCountObj);
  const valueArray = Object.values(numberCountObj);
  const sortedKeys = keyArray.sort((a, b) => a - b);

  let pre = parseInt(sortedKeys[0]);
  for (let i = 1; i < sortedKeys.length; i++) {
    if (pre + 1 !== parseInt(keyArray[i])) {
      return false;
    }
    pre = parseInt(keyArray[i]);
  }

  const 일아니라면 = valueArray.some((item) => {
    if (item !== 1) return true;
  });
  if (일아니라면) {
    return false;
  }
  return true;
};

const valueFromHand = (hand) => {
  if (isPair(hand)) {
    return "pair";
  }
  if (isTriple(hand)) {
    return "three of a kind";
  }
  if (isFlush(hand)) {
    return "flush";
  }
  if (isStraight(hand)) {
    return "straight";
  }
};

describe("valueFromHand", () => {
  it("같은 숫자가 두개가 있으면 pair가 나와야 한다", () => {
    const card = ["2-H", "3-C", "4-D", "5-E", "2-C"];

    const result = valueFromHand(card);

    assert(result === "pair");
  });
  it("같은 숫자가 3개가 있으면 three of a kind가 나와야 한다", () => {
    const card = ["3-H", "3-C", "3-D", "5-E", "2-C"];

    const result = valueFromHand(card);

    assert(result === "three of a kind");
  });

  it("모두 같은 모양이 flush가 나와야 한다.", () => {
    const card = ["2-H", "3-H", "4-H", "5-H", "7-H"];

    const result = valueFromHand(card);

    assert(result === "flush");
  });

  it("모든 숫자가 순차적일 때 straight가 나와야 한다.", () => {
    const card = ["2-H", "3-A", "4-K", "5-H", "6-J"];
    const result = valueFromHand(card);
    assert(result === "straight");
  });

  it("isPair", () => {
    const hand = ["2-H", "3-C", "4-D", "5-E", "2-C"];

    const result = isPair(hand);

    assert(result === true);
  });
  it("valueFromNumber", () => {
    const hand = ["2-H", "3-C", "4-D", "5-E", "2-C"];
    const result = valueFromNumber(hand);
    assert(deepEqual(result, [2, 3, 4, 5, 2]));
  });

  it("multiplesIn", () => {
    const hand = ["2-H", "3-C", "4-D", "5-E", "2-C"];
    const result = multiplesIn(hand);
    assert(result === 2);
  });
  it("multiplesIn", () => {
    const hand = ["2-H", "3-C", "4-D", "5-E", "2-C"];
    const result = multiplesIn(hand);
    assert(result === 2);
  });
});

describe("numberCountFromCards", () => {
  it("각 숫자의  중복 횟수를 담은 객체를 리턴한다.", () => {
    const hand = ["2-H", "3-C", "4-D", "5-E", "6-C"];
    const result = numberCountFromCards(hand);
    // console.log(result);
    assert(
      deepEqual(result, {
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
      })
    );
  });
});

describe("isTriple", () => {
  it("같은 숫자가 숫자가 3개 있으면 true가 나와야한다.", () => {
    const hand = ["3-H", "3-C", "3-D", "5-E", "2-C"];
    const result = isTriple(hand);
    assert(result === true);
  });
});
describe("isStraight", () => {
  it("모든 숫자가 순차적으로 나오면 true가 나와야한다.", () => {
    const card = ["2-H", "3-A", "4-K", "5-H", "6-J"];
    const result = isStraight(card);
    assert(result === true);
  });
});

describe("flush", () => {
  it("모두 같은 모양이 true가 나와야 한다.", () => {
    const hand = ["2-H", "3-H", "4-H", "5-H", "7-H"];
    const result = isFlush(hand);
    assert(result === true);
  });
});
describe("valueFromShape", () => {
  it("카드 배열에서 모양 배열이 나와야한다.", () => {
    const card = ["2-H", "3-H", "4-H", "5-H", "7-H"];

    const result = valueFromShape(card);

    assert(deepEqual(result, ["H", "H", "H", "H", "H"]));
  });
});
