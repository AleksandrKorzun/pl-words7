import Screen from "./Screen";
import { EVENTS, POSITIONS, SCALES } from "./constants/Constants";

export default class Word extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.letters = [];
    this.isWordComplete = false;
    this.addWord();
    this.initListeners();
    this.addProperties(["pos", "scale"])
      .setCustomPosition(...POSITIONS.word)
      .setCustomScale(1, 1, 1, 1)
      .setCustomAlign("Center")
      .setDepth(125)
      .setAlpha(1);
  }
  initListeners() {
    this.scene.emitter.on(
      EVENTS.ON_LETTER_CLICK,
      (letter, index) => this.addLetter(letter, index),
      this
    );
    this.scene.emitter.on(
      EVENTS.ON_BONUS_CLICK2,
      () => this.onBonusClick2(),
      this
    );
    this.scene.emitter.on(
      EVENTS.ON_WORD_COMPLETE,
      () => this.removeLetter(),
      this
    );
  }

  removeLetter() {
    setTimeout(() => {
      this.letters.map((letter) => letter.destroy());
    }, 1000);
  }
  addLetter(letter) {
    if (!this.scene[`correctWord${this.scene.countWord}`].includes(letter))
      return;
    const indexes = this.scene.findCorrectIndex(letter);
    indexes.map((index) => {
      const xOffsset =
        this.scene[`word${this.scene.countWord}`].length === 9 ? -240 : -180;
      const x = xOffsset + index * 60;
      const y = 200;
      this[`letter_${letter}`] = this.scene.add
        .text(x, y, letter, {
          font: "normal 90px Roboto-Medium",
          fill: "#fff",
        })
        .setDepth(57)
        .setOrigin(0.5, 0.5)
        .setScale(0.65);
      this.letters.push(this[`letter_${letter}`]);
      this.add([this[`letter_${letter}`]]);
      this.scene[`word${this.scene.countWord}`][index] = letter;
      if (
        this.scene[`word${this.scene.countWord}`].filter(Boolean).length ===
          this.scene[`correctWord${this.scene.countWord}`].length &&
        !this.scene.isTutorial
      ) {
        this.scene.emitter.emit(EVENTS.ON_WORD_COMPLETE);
        // this.isWordComplete = true;
      }
      this._sort();
    });
  }
  addWord() {
    this.answer = [];
    this.word = [];
    // ["G", "O", "L", "D", "F", "I", "S", "H"].map((letter, index) => {
    this.scene[`word${this.scene.countWord}`].map((letter, index) => {
      const xOffsset =
        this.scene[`word${this.scene.countWord}`].length === 9 ? -240 : -180;
      const x = xOffsset + index * 60;
      this[`answer${index}`] = this.scene.add
        .image(x, 200, "atlas", "answer_box")
        .setDepth(54)
        .setScale(0.6)
        .setAlpha(1)
        .setOrigin(0.5, 0.5);
      this[`word${index}`] = this.scene.add
        .image(x, 200, "atlas", "background_overlay")
        .setDepth(54)
        .setScale(1)
        .setAlpha(0)
        .setOrigin(0.5, 0.5);
      this.answer.push(this[`answer${index}`]);
      this.word.push(this[`word${index}`]);
      this.add([this[`answer${index}`], this[`word${index}`]]);
      this._sort();
    });
  }
  changeWordLetterAnswer() {
    this.answer.map((answer) => answer.destroy());
    this.word.map((word) => word.destroy());
    this.addWord();
  }
  onBonusClick2() {
    let onComplete = false;
    ["", "", ""].map(() => {
      const index = this.scene.findIndex();

      // if (!index) return;
      const xOffsset =
        this.scene[`word${this.scene.countWord}`].length === 9 ? -240 : -180;
      const x = xOffsset + index * 60;
      const y = 200;
      const letter = this.scene[`correctWord${this.scene.countWord}`][index];
      if (this.scene[`correctWord${this.scene.countWord}`][index] !== letter) {
        return;
      }
      if (index === -1 && !onComplete) {
        onComplete = true;
        setTimeout(() => {
          this.scene.emitter.emit(EVENTS.ON_WORD_COMPLETE);
        }, 1000);
        return;
      }
      this[`letter_${letter}`] = this.scene.add
        .text(x, y, letter, {
          font: "normal 90px Roboto-Medium",
          fill: "#fff",
        })
        .setDepth(57)
        .setOrigin(0.5, 0.5)
        .setScale(0.65);
      this.add([this[`letter_${letter}`]]);
      this.letters.push(this[`letter_${letter}`]);
      this.scene[`word${this.scene.countWord}`][index] = letter;
      if (
        this.scene[`word${this.scene.countWord}`].filter(Boolean).length ===
          this.scene[`correctWord${this.scene.countWord}`].length &&
        !onComplete
      ) {
        onComplete = true;
        setTimeout(() => {
          this.scene.emitter.emit(EVENTS.ON_WORD_COMPLETE);
        }, 1000);
        return;
      }
      this._sort();
    });
  }
}
