function Word(word, language, lookUpUrl) {
  this.word = word;
  this.language = language;
  this.lookUpUrl = lookUpUrl;
  this.count = function () {
    return this.word.length;
  };
  this.lookUp = function () {
    return this.lookUpUrl + this.word;
  };
}

function EnglishWord(word) {
  Word.call(this, word, "English", "https://en.wiktionary.org/wiki/");
}

function JapaneseWord(word) {
  Word.call(this, word, "Japanese", "http://jisho.org/search/");
}

JapaneseWord.prototype = Object.create(Word.prototype, {
  constructor: { value: JapaneseWord },
});
EnglishWord.prototype = Object.create(Word.prototype, {
  constructor: { value: EnglishWord },
});

Word.prototype.reportLanguage = function () {
  return `The language is: ${this.language}`;
};
const japaneseWord = new JapaneseWord("犬");
// console.log(japaneseWord.reportLanguage());

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
  expect(Object.getPrototypeOf(JapaneseWord.prototype)).toBe(Word.prototype); // JapaneseWord.prototype.__proto__ === Word.prototype
  expect(JapaneseWord.prototype.__proto__).toBe(Word.prototype);

  expect(Object.getPrototypeOf(japaneseWord)).toEqual(JapaneseWord.prototype);
  expect(Object.getPrototypeOf(japaneseWord)).toEqual({});
  expect(JapaneseWord.prototype).not.toBe(Word.prototype);

  // expect(Object.getPrototypeOf(JapaneseWord)).toBe(Word);
  // 프로토타입 체인을 따라가면 Word.prototype이 나온다.
  // 프로토타입 체인은 연결되었지만, JapaneseWord 자체는 Word를 상속받지 않았다.
});

// sketchy bits
test("JapaneseWord prototype", () => {
  expect(Object.getPrototypeOf(japaneseWord)).toEqual(JapaneseWord.prototype); // japanWord.prototype === JapaneseWord.prototype
  console.log(Object.getPrototypeOf(japaneseWord)); // Word {},  Word {} 는 Word.prototype을 가리킨다.
  // reports JapaneseWord {}
});

/* Variant
function Word(word, language, lookUpUrl){
  this.word = word;
  this.language = language;
  this.lookUpUrl = lookUpUrl;
  this.count = function(){
    return this.word.length;
  };
  this.lookUp = function(){
    return this.lookUpUrl + this.word;
  };
};

function EnglishWord(word){
  Word.call(this, word, "English", 'https://en.wiktionary.org/wiki/');
};

function JapaneseWord(word){
  Word.call(this, word, "Japanese", 'http://jisho.org/search/');
};
*/
