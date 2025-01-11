import { EVENTS, IMAGES } from "./constants/Constants";

export class Letter extends Phaser.GameObjects.Container {
  constructor(scene, letter) {
    super(scene, 0, 0);

    this.isHorizontal = window.innerWidth > window.innerHeight;
    this.addBase(letter);
    // this.addInteractive();

    // window.addEventListener('resize', () => this.resize());
  }

  addBase(letter) {
    this.base = this.scene.add
      .image(0, 0, "atlas", "keyboard_key_normal")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.65);
    this.base_press = this.scene.add
      .image(0, 0, "atlas", "keyboard_key_pressed")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setScale(0.65);
    this.cross = this.scene.add
      .image(0, 0, "atlas", "cross")
      .setDepth(39)
      .setAlpha(0)
      .setScale(0.95);
    this.letter = this.scene.add
      .text(0, 0, letter, {
        font: "normal 110px Roboto-Medium",
        fill: "#fff",
      })
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.65);
    this.add([this.base, this.base_press, this.letter, this.cross]);
    this._sort();
  }

  disableKey() {
    this.base.setAlpha(0);
    this.base_press.setAlpha(1);
    this.letter.setStyle({ fill: "#261F53" });
  }
  enableKey() {
    this.base.setAlpha(1);
    this.base_press.setAlpha(0);
    this.letter.setStyle({ fill: "#fff" });
  }
  addInteractive() {
    this.base.setInteractive().on("pointerdown", () => {
      this.onLetterClick();
      // const index = this.scene.findIndex();
      // if (
      //   this.scene[`correctWord${this.scene.countWord}`].includes(
      //     this.letter.text
      //   )
      // ) {
      //   this.scene.emitter.emit(EVENTS.REMOVE_TUTORIAL);
      //   if (
      //     !this.scene[`correctWord${this.scene.countWord}`]
      //       .slice(index + 1)
      //       .includes(this.letter.text)
      //   ) {
      //     this.disableKey();
      //   }
      //   this.disableKey();
      //   this.scene.emitter.emit(EVENTS.ON_LETTER_CLICK, this.letter.text);
      //   if (
      //     this.scene[`correctWord${this.scene.countWord}`].length - 1 ===
      //     index
      //   ) {
      //     // this.scene.emitter.emit(EVENTS.ON_WORD_COMPLETE);
      //   }
      //   return;
      // }
      // this.cross.setAlpha(1);
      // this.base.disableInteractive();
      // this.scene.emitter.emit(EVENTS.ADD_TUTORIAL);
    });
  }
  onLetterClick() {
    const index = this.scene.header.currentPuzzle - 1;
    if (
      IMAGES[index].puzzleWord
        .toLowerCase()
        .includes(this.letter.text.toLowerCase())
    ) {
      this.scene.emitter.emit(EVENTS.ON_LETTER_CLICK, this.letter.text);
      this.disableKey();
    } else {
      if (this.scene.isTutorial) return;
      this.cross.setAlpha(1);
      this.base.disableInteractive();
    }
  }
}
