import { assert, expect } from "chai";
import { describe, it } from "mocha";

class SongsManager {
  constructor() {
    this.songs = []
    this.labelCounts = {}
    this.labelProbabilities = {}
    this.chordCountsInLabels = {}
    this.setTrain()
    this.setLabelProbabilities();
    this.setChordCountsInLabels();
    this.setProbabilityOfChordsInLabels();
  }

  classify(chords) {
    const smoothing = 1.01;
    const classified = {};
    Object.keys(this.labelProbabilities).forEach((difficulty) => {
      let first = this.labelProbabilities[difficulty] + smoothing;
      chords.forEach((chord) => {
        const probabilityOfChordInLabel = this.chordCountsInLabels[difficulty][chord];
        if (probabilityOfChordInLabel) {
          first = first * (probabilityOfChordInLabel + smoothing);
        }
      });
      classified[difficulty] = first;
    });
    return classified;
  }


  setTrain = () => {
    const Difficulty = {
      Easy: "easy",
      Medium: "medium",
      Hard: "hard",
    };
    
    const imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];
    const somewhereOverTheRainbow = ["c", "em", "f", "g", "am"];
    const tooManyCooks = ["c", "g", "f"];
    const iWillFollowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];
    const babyOneMoreTime = ["cm", "g", "bb", "eb", "fm", "ab"];
    const creep = ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"];
    const paperBag = ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"];
    const toxic = ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"];
    const bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];


    this.train(imagine, Difficulty.Easy);
    this.train(somewhereOverTheRainbow, Difficulty.Easy);
    this.train(tooManyCooks, Difficulty.Easy);
    this.train(iWillFollowYouIntoTheDark, Difficulty.Medium);
    this.train(babyOneMoreTime, Difficulty.Medium);
    this.train(creep, Difficulty.Medium);
    this.train(paperBag, Difficulty.Hard);
    this.train(toxic, Difficulty.Hard);
    this.train(bulletproof, Difficulty.Hard)
  };

  train(chords, label) {
    this.songs.push({ label, chords });
    if (Object.keys(this.labelCounts).includes(label)) {
      this.labelCounts[label] = this.labelCounts[label] + 1;
    } else {
      this.labelCounts[label] = 1;
    }
  }

  setLabelProbabilities() {
    Object.keys(this.labelCounts).forEach((label) => {
      this.labelProbabilities[label] = this.labelCounts[label] / this.songs.length;
    });
  
    return this.labelProbabilities;
  }

  setChordCountsInLabels() {
    this.songs.forEach((song) => {
      const { label, chords } = song;
      if (!this.chordCountsInLabels[label]) {
        this.chordCountsInLabels[label] = {};
      }
      chords.forEach((chord) => {
        if (!this.chordCountsInLabels[label][chord]) {
          this.chordCountsInLabels[label][chord] = 0;
        }
        this.chordCountsInLabels[label][chord]++;
      });
    });
  }
  
  setProbabilityOfChordsInLabels() {
    Object.keys(this.chordCountsInLabels).forEach((difficulty) => {
      Object.keys(this.chordCountsInLabels[difficulty]).forEach((chord) => {
        this.chordCountsInLabels[difficulty][chord] /= this.songs.length;
      });
    });
  }
}

// init();
// classify(["d", "g", "e", "dm"]);
// classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);

///////////////////////////////////////////////////////////////////////////////////////


describe("classify", () => {
  it("classified를 리턴해야 합니다.", () => {
    const songsManager = new SongsManager()
    const result = songsManager.classify(["d", "g", "e", "dm"]);

    expect(result.easy).equal(2.023094827160494);
    expect(result.medium).equal(1.855758613168724);
    expect(result.hard).equal(1.855758613168724);
  });
});

describe("setLabelProbabilities", () => {
  it("값 검증", () => {
    const songsManager = new SongsManager()
    const result = songsManager.setLabelProbabilities();

    expect(result.easy).equal(0.3333333333333333);
    expect(result.medium).equal(0.3333333333333333);
    expect(result.hard).equal(0.3333333333333333);
  });
});
