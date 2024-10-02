// function welcomeMessage() {
//   return `Welcome to ${fileName()}!`;
// }

const classifier = {
  songs: [],
  allChords: new Set(),
  labelCounts: new Map(),
  labelProbabilities: new Map(),
  chordCountsInLabels: new Map(),
  smoothing: 1.01,
  setLabelProbabilities() {
    this.labelCounts.forEach((_count, label) => {
      this.labelProbabilities.set(label, this.labelCounts.get(label) / this.songs.length);
    });
  },
  setChordCountsInLabels() {
    this.songs.forEach((song) => {
      if (this.chordCountsInLabels.get(song.label) === undefined) {
        this.chordCountsInLabels.set(song.label, {});
      }
      song.chords.forEach((chord) => {
        if (this.chordCountsInLabels.get(song.label)[chord] > 0) {
          this.chordCountsInLabels.get(song.label)[chord] += 1;
        } else {
          this.chordCountsInLabels.get(song.label)[chord] = 1;
        }
      });
    });
  },
  likelihoodFromChord(difficulty, chord) {
    return this.chordCountsInLabels.get(difficulty)[chord] / this.songs.length;
  },
  valueForChordDifficulty(difficulty, chord) {
    const value = this.likelihoodFromChord(difficulty, chord);
    return value ? value + this.smoothing : 1;
  },
  classify: function (chords) {
    return new Map(
      Array.from(this.labelProbabilities.entries()).map((labelWithProbability) => {
        const difficulty = labelWithProbability[0];
        return [
          difficulty,
          chords.reduce((total, chord) => {
            return total * this.valueForChordDifficulty(difficulty, chord);
          }, this.labelProbabilities.get(difficulty) + this.smoothing),
        ];
      })
    );
  },
};

const songList = {
  difficulty: ["easy", "medium", "hard"],
  songs: [],
  addSong(name, chords, difficulty) {
    this.songs.push({ name, chords, difficulty: this.difficulty[difficulty] });
  },
};

function setSongs() {
  songList.addSong("imagine", ["c", "cmaj7", "f", "am", "dm", "g", "e7"], 0);
  songList.addSong("somewhereOverTheRainbow", ["c", "em", "f", "g", "am"], 0);
  songList.addSong("tooManyCooks", ["c", "g", "f"], 0);
  songList.addSong("iWillFollowYouIntoTheDark", ["f", "dm", "bb", "c", "a", "bbm"], 1);
  songList.addSong("babyOneMoreTime", ["cm", "g", "bb", "eb", "fm", "ab"], 1);
  songList.addSong("creep", ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"], 1);
  songList.addSong("paperBag", ["bm7", "e", "c", "g", "b7", "f", "em", "a"], 2);
  songList.addSong(
    "toxic",
    ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "fm", "bbm", "ebm", "db"],
    2
  );
  songList.addSong("bulletproof", ["d#m", "g#", "b", "f#", "g#m", "c#"], 2);
}

function train(chords, label) {
  classifier.songs.push({ label, chords });
  chords.forEach((chord) => classifier.allChords.add(chord));
  if (Array.from(classifier.labelCounts.keys()).includes(label)) {
    classifier.labelCounts.set(label, classifier.labelCounts.get(label) + 1);
  } else {
    classifier.labelCounts.set(label, 1);
  }
}

function trainAll() {
  setSongs();
  songList.songs.forEach((song) => train(song.chords, song.difficulty));
  setLabelsAndProbabilities();
}

function setLabelsAndProbabilities() {
  classifier.setLabelProbabilities();
  classifier.setChordCountsInLabels();
}

const wish = require("wish");
describe("the file", function () {
  trainAll();
  it("classifies", function () {
    const classified = classifier.classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
    wish(classified.get("easy") === 1.3433333333333333);
    wish(classified.get("medium") === 1.5060259259259259);
    wish(classified.get("hard") === 1.6884223991769547);
  });
  it("classifies again", function () {
    const classified = classifier.classify(["d", "g", "e", "dm"]);
    wish(classified.get("easy") === 2.023094827160494);
    wish(classified.get("medium") === 1.855758613168724);
    wish(classified.get("hard") === 1.855758613168724);
  });
  it("label probabilities", function () {
    wish(classifier.labelProbabilities.get("easy") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("medium") === 0.3333333333333333);
    wish(classifier.labelProbabilities.get("hard") === 0.3333333333333333);
  });
});
