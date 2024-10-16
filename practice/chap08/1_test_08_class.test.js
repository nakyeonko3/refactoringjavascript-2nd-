class Word {
  constructor(word, language, lookUpUrl) {
    this.word = word;
    this.language = language;
    this.lookUpUrl = lookUpUrl;
  }
  count() {
    return this.word.length;
  }
  lookUp() {
    return this.lookUpUrl + this.word;
  }
}
class EnglishWord extends Word {
  constructor(word) {
    super(word, "English", "https://en.wiktionary.org/wiki/");
  }
}
class JapaneseWord extends Word {
  constructor(word) {
    super(word, "Japanese", "http://jisho.org/search/");
  }
}

const japaneseWord = new JapaneseWord("犬");
const englishWord = new EnglishWord("dog");

// interfaces tests
test("JapaneseWord properties and methods", () => {
  expect(japaneseWord.word).toBe("犬");
  expect(japaneseWord.lookUp()).toBe("http://jisho.org/search/犬");
  expect(japaneseWord.count()).toBe(1);
});

test("EnglishWord properties and methods", () => {
  expect(englishWord.word).toBe("dog");
  expect(englishWord.lookUp()).toBe("https://en.wiktionary.org/wiki/dog");
  expect(englishWord.count()).toBe(3);
});

// internals tests
test("JapaneseWord internals", () => {
  expect(typeof japaneseWord).toBe("object");
  expect(typeof JapaneseWord).toBe("function");
  expect(japaneseWord).toBeInstanceOf(JapaneseWord);
  expect(japaneseWord).toBeInstanceOf(Word);
  expect(JapaneseWord).not.toBeInstanceOf(Word);
  expect(japaneseWord.constructor).toBe(JapaneseWord);
  expect(Object.getPrototypeOf(JapaneseWord)).toBe(Word);
});

// sketchy bits
test("JapaneseWord prototype", () => {
  expect(Object.getPrototypeOf(japaneseWord)).toEqual({});
  console.log(Object.getPrototypeOf(japaneseWord));
  // reports JapaneseWord {}
});
