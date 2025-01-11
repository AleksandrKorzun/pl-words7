import { EVENTS, PUZZLES, PUZZLES_OPEN } from "./constants/Constants";

export default class Puzzle extends Phaser.GameObjects.Container {
  constructor(scene, options) {
    super(scene, 0, 0);
    this.options = options;
    this.isHorizontal = window.innerWidth > window.innerHeight;
    this.addImage(options.img);
    // this.initAssets();
    this.addPuzzles();
    this.isShowBonus = false;
    this.addAnswerBox();
    this.scene.emitter.on("reveal", () => this.onReveal());
    this.scene.emitter.on("bonus", () => this.showBonus());
    this.scene.emitter.on(EVENTS.ON_LETTER_CLICK, (l) => this.showLetter(l));
    this.scene.emitter.on("changeImage", ({ prev, newPuzzle }) =>
      this.onChangeImage(prev, newPuzzle)
    );
    // this.scene.emitter.on("newGame", ({ prev, newPuzzle }) => {
    //   this.scene.header.onClickArrow("right");
    //   console.log("1", 1);
    // });
  }
  showBonus() {
    if (this.isShowBonus) return;

    this.scene.tweens.add({
      targets: this[`bonus${this.scene.header.currentPuzzle}`],
      alpha: 1,
      duration: 300,
      ease: "Ease.in",
    });
    this.isShowBonus = true;
  }
  onChangeImage(prev, newPuzzle) {
    const isLeft =
      (prev > newPuzzle && prev !== 5) ||
      (prev === 5 && newPuzzle === 4) ||
      (prev === 1 && newPuzzle === 5);
    if (this.options.num === newPuzzle) {
      this.scene.tweens.add({
        targets: this,
        onStart: () => {
          this.setPosition(isLeft ? -2000 : 2000, 0);
        },
        x: 0,
        duration: 300,
        ease: "Ease.in",
      });
    }
    if (this.options.num === prev) {
      this.scene.tweens.add({
        targets: this,
        x: isLeft ? 2000 : -2000,
        duration: 300,
        ease: "Ease.in",
        onComplete: () => {
          this.setPosition(2000, 0);
        },
      });
    }
  }
  addImage(image) {
    this.baseImage = this.scene.add
      .image(0, 0, image.toLowerCase())
      .setDepth(7)
      .setOrigin(0.5, 0.5)
      .setScale(0.7, 0.7)
      .setPosition(0, 230);
    this[`bonus${this.options.num}`] = this.scene.add
      .image(0, 0, `bonus${this.options.num}`)
      .setAlpha(0)
      .setScale(0.755)
      .setDepth(58)
      .setPosition(0, 370);
    this.add([this.baseImage, this[`bonus${this.options.num}`]]);
    this._sort();
  }
  onReveal() {
    if (this.scene.header.puzzleComplete[this.options.num] === 9) return;
    if (this.options.num === this.scene.header.currentPuzzle) {
      this.scene.tweens.add({
        targets:
          this[`puzzle_${this.scene.header.puzzleComplete[this.options.num]}`],
        alpha: 0,
        duration: 300,
        ease: "Ease.in",
      });
      this.scene.tweens.add({
        targets:
          this[
            `puzzle_open_${this.scene.header.puzzleComplete[this.options.num]}`
          ],
        alpha: 0,
        duration: 300,
        ease: "Ease.in",
      });
      this.scene.header.puzzleComplete = {
        ...this.scene.header.puzzleComplete,
        [this.options.num]:
          this.scene.header.puzzleComplete[this.options.num] + 1,
      };
    }
    // this.puzzleComplete += 1;
  }
  addPuzzles() {
    PUZZLES.map((puzzle, index) => {
      this[`puzzle_${index}`] = this.scene.add
        .image(puzzle.x, puzzle.y, "atlas", puzzle.name)
        .setScale(0.47)
        .setDepth(55);
      this.add([this[`puzzle_${index}`]]);
      this._sort();
    });
    PUZZLES_OPEN.map((puzzle, index) => {
      this[`puzzle_open_${index}`] = this.scene.add
        .image(puzzle.x, puzzle.y, "atlas", puzzle.name)
        .setScale(0.47)
        .setAlpha(0)
        .setDepth(55);
      this.add([this[`puzzle_open_${index}`]]);
      this._sort();
    });
  }
  addAnswerBox() {
    this.answer_base = this.scene.add
      .image(0, 0, `answer_base_${this.options.img.length}`)
      .setDepth(5)
      .setOrigin(0.5, 0.5)
      .setScale(0.74)
      .setPosition(0, 550);
    this.letters = [];
    this.options.img.split("").map((letter, index) => {
      let x = 0;
      if (this.options.img.length === 10) {
        x = -215 + index * 48;
      }

      if (this.options.img.length === 8) {
        x = -215 + index * 62;
      }
      if (this.options.img.length === 7) {
        x = -180 + index * 61;
      }
      //   const x = -215 + index * 48;
      this[`letter${index}`] = this.scene.add
        .text(x, 563, letter, {
          font: "normal 60px Roboto-Medium",
          fill: "#fff",
        })
        .setDepth(59)
        .setScale(0.6)
        .setAlpha(0)
        .setOrigin(0.5, 0.5);
      this[`letter${index}`].letter = letter;
      this[`letter${index}`].isShow = false;
      this.letters.push(this[`letter${index}`]);

      this.add([this[`letter${index}`]]);
    });
    this.add([this.answer_base]);
    this._sort();
  }
  showLetter(letter) {
    if (this.options.num !== this.scene.header.currentPuzzle) return;
    this.letters.map((l) => {
      if (l.letter.toLowerCase() === letter.toLowerCase()) {
        this.scene.tweens.add({
          targets: l,
          alpha: 1,
          duration: 300,
          ease: "Ease.in",
        });
        l.isShow = true;
      }
    });
    if (
      this.letters.every((l) => l.isShow) &&
      !this.scene.isFinish &&
      !this.scene.isTutorial
    ) {
      console.log("123123", 123123);
      this.scene.emitter.emit(EVENTS.ON_WORD_COMPLETE);
    }
  }
}
