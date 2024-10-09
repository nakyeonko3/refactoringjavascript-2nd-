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

JapaneseWord.prototype = Object.create(Word.prototype);
JapaneseWord.prototype.constructor = JapaneseWord;
EnglishWord.prototype = Object.create(Word.prototype);
EnglishWord.prototype.constructor = EnglishWord;

Word.prototype.reportLanguage = function () {
  return `The language is: ${this.language}`;
};
const japaneseWord = new JapaneseWord("犬");
// console.log(japaneseWord.reportLanguage());

const englishWord = new EnglishWord("dog");

describe("인터페이스 테스트", () => {
  it("일본어 단어의 word 속성이 '犬'이어야 합니다", () => {
    expect(japaneseWord.word).toBe("犬");
  });

  it("일본어 단어의 lookUp 메서드가 'http://jisho.org/search/犬'을 반환해야 합니다", () => {
    expect(japaneseWord.lookUp()).toBe("http://jisho.org/search/犬");
  });

  it("일본어 단어의 count 메서드가 1을 반환해야 합니다", () => {
    expect(japaneseWord.count()).toBe(1);
  });

  it("영어 단어의 word 속성이 'dog'이어야 합니다", () => {
    expect(englishWord.word).toBe("dog");
  });

  it("영어 단어의 lookUp 메서드가 'https://en.wiktionary.org/wiki/dog'을 반환해야 합니다", () => {
    expect(englishWord.lookUp()).toBe("https://en.wiktionary.org/wiki/dog");
  });

  it("영어 단어의 count 메서드가 3을 반환해야 합니다", () => {
    expect(englishWord.count()).toBe(3);
  });
});

describe("내부 구조 테스트", () => {
  it("일본어 단어 객체의 typeof가 'object'이어야 합니다", () => {
    expect(typeof japaneseWord).toBe("object");
  });

  it("일본어 단어 생성자의 typeof가 'function'이어야 합니다", () => {
    expect(typeof JapaneseWord).toBe("function");
  });

  it("일본어 단어 객체가 Word의 인스턴스여야 합니다", () => {
    expect(japaneseWord instanceof Word).toBeTruthy();
  });

  it("일본어 단어 생성자가 JapaneseWord여야 합니다", () => {
    expect(japaneseWord.constructor).toBe(JapaneseWord);
  });

  it("일본어 단어 책체가 JapeneseWord의 인스턴스여야 합니다.", () => {
    expect(japaneseWord instanceof JapaneseWord).toBeTruthy();
    expect(Object.getPrototypeOf(japaneseWord)).toEqual(JapaneseWord.prototype);
  });
});

describe("Word 클래스", () => {
  it("count 메서드는 단어의 길이를 반환한다", () => {
    const word = new Word("test", "English", "https://en.wiktionary.org/wiki/");
    expect(word.count()).toBe(4);
  });

  it("lookUp 메서드는 lookUpUrl과 단어를 합쳐서 반환한다", () => {
    const word = new Word("test", "English", "https://en.wiktionary.org/wiki/");
    expect(word.lookUp()).toBe("https://en.wiktionary.org/wiki/test");
  });
});

describe("EnglishWord 클래스", () => {
  it('language 속성은 "English"이다', () => {
    const englishWord = new EnglishWord("dog");
    expect(englishWord.language).toBe("English");
  });
});

describe("JapaneseWord 클래스", () => {
  it('language 속성은 "Japanese"이다', () => {
    const japaneseWord = new JapaneseWord("犬");
    expect(japaneseWord.language).toBe("Japanese");
  });
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
