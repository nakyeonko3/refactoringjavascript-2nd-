import { assert, expect } from "chai";
import { describe, it } from "mocha";

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
const paperBag = [
  "bm7",
  "e",
  "c",
  "g",
  "b7",
  "f",
  "em",
  "a",
  "cmaj7",
  "em7",
  "a7",
  "f7",
  "b",
];
const toxic = [
  "cm",
  "eb",
  "g",
  "cdim",
  "eb7",
  "d7",
  "db7",
  "ab",
  "gmaj7",
  "g7",
];

const bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];

const songsManager = {
  songs: [],
  labelCounts: {},
  labelProbabilities: {},
  chordCountsInLabels: {},
  probabilityOfChordsInLabels: {},
};

function train(chords, label) {
  songsManager.songs.push({ label, chords });
  if (Object.keys(songsManager.labelCounts).includes(label)) {
    songsManager.labelCounts[label] = songsManager.labelCounts[label] + 1;
  } else {
    songsManager.labelCounts[label] = 1;
  }
}

function setLabelProbabilities() {
  Object.keys(songsManager.labelCounts).forEach((label) => {
    songsManager.labelProbabilities[label] =
      songsManager.labelCounts[label] / songsManager.songs.length;
  });

  return songsManager.labelProbabilities;
}

function setChordCountsInLabels() {
  songsManager.songs.forEach((song) => {
    const { label, chords } = song;
    if (!songsManager.chordCountsInLabels[label]) {
      songsManager.chordCountsInLabels[label] = {};
    }
    chords.forEach((chord) => {
      if (!songsManager.chordCountsInLabels[label][chord]) {
        songsManager.chordCountsInLabels[label][chord] = 0;
      }
      songsManager.chordCountsInLabels[label][chord]++;
    });
  });
}

const setTrain = () => {
  train(imagine, Difficulty.Easy);
  train(somewhereOverTheRainbow, Difficulty.Easy);
  train(tooManyCooks, Difficulty.Easy);
  train(iWillFollowYouIntoTheDark, Difficulty.Medium);
  train(babyOneMoreTime, Difficulty.Medium);
  train(creep, Difficulty.Medium);
  train(paperBag, Difficulty.Hard);
  train(toxic, Difficulty.Hard);
  train(bulletproof, Difficulty.Hard);
};

const init = () => {
  setTrain();
  setLabelProbabilities();
  setChordCountsInLabels();
  setProbabilityOfChordsInLabels();
};

function classify(chords) {
  const smoothing = 1.01;
  const classified = {};
  Object.keys(songsManager.labelProbabilities).forEach((difficulty) => {
    let first = songsManager.labelProbabilities[difficulty] + smoothing;
    chords.forEach((chord) => {
      const probabilityOfChordInLabel =
        songsManager.probabilityOfChordsInLabels[difficulty][chord];
      if (probabilityOfChordInLabel) {
        first = first * (probabilityOfChordInLabel + smoothing);
      }
    });
    classified[difficulty] = first;
  });
  return classified;
}

function setProbabilityOfChordsInLabels() {
  songsManager.probabilityOfChordsInLabels = songsManager.chordCountsInLabels;
  Object.keys(songsManager.probabilityOfChordsInLabels).forEach(
    (difficulty) => {
      Object.keys(songsManager.probabilityOfChordsInLabels[difficulty]).forEach(
        (chord) => {
          songsManager.probabilityOfChordsInLabels[difficulty][chord] /=
            songsManager.songs.length;
        }
      );
    }
  );
}

init();
classify(["d", "g", "e", "dm"]);
classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);

///////////////////////////////////////////////////////////////////////////////////////

describe("classify", () => {
  it("classified를 리턴해야 합니다.", () => {
    const result = classify(["d", "g", "e", "dm"]);

    expect(result.easy).equal(2.023094827160494);
    expect(result.medium).equal(1.855758613168724);
    expect(result.hard).equal(1.855758613168724);
  });
});

describe("setLabelProbabilities", () => {
  it("값 검증", () => {
    const result = setLabelProbabilities();

    expect(result.easy).equal(0.3333333333333333);
    expect(result.medium).equal(0.3333333333333333);
    expect(result.hard).equal(0.3333333333333333);
  });
});
