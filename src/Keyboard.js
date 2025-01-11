import { Letter } from "./Letter";
import {
  EVENTS,
  IMAGES,
  LETTERS1,
  LETTERS2,
  LETTERS3,
  SCALES,
} from "./constants/Constants";
import Utils from "@holywater-tech/ads-builder/framework/Utils";

export default class Keyboard extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.isHorizontal = window.innerWidth > window.innerHeight;
    this.initAssets();
    this.addBase();
    this.addLetter();
    this.addBonus();
    this.isFinish = false;
    // this.addTutorial();
    this.isTutorial = true;
    this.scene.emitter.on(EVENTS.ON_WORD_COMPLETE, () =>
      this.setInterActiveLetters()
    );
    this.scene.emitter.on("changeImage", () => this.deleteCross([]));
    this.scene.emitter.on(EVENTS.ON_WORD_COMPLETE, () => {
      if (this.scene.isTutorial) return;
      this.setAlpha(0.2);
      this.removeInteractiveLetters();
    });
    this.scene.emitter.on("timeOut", () => {
      this.setAlpha(0.2);
      this.removeInteractiveLetters();
    });
    this.scene.emitter.on("reveal", () => {
      this.setAlpha(1);
      this.setInterActiveLetters();
    });

    // this.addTutorial();
    // this.setAlpha(1);
    // this.scene.emitter.on(EVENTS.ADD_TUTORIAL, () => this.addTutorial());
    // window.addEventListener('resize', () => this.resize());
  }
  addTutorial() {
    this.hand = this.scene.add
      .image(0, -300, "atlas", "tutorial_hand")
      .setScale(0.7)
      .setDepth(55);
    const timeline = this.scene.tweens.createTimeline();
    [...new Set(IMAGES[0].puzzleWord.toUpperCase().split(""))].map(
      (letter, index) => {
        timeline.add({
          targets: this.hand,
          x: this[`letter_${letter}`].x + 60,
          y: this[`letter_${letter}`].y - 40,
          duration: 500,
          onComplete: () => {
            this[`letter_${letter}`].onLetterClick();
          },
        });
        timeline.add({
          targets: this.hand,
          scale: "*=0.95",
          duration: 200,
          yoyo: true,
        });
      }
    );
    timeline.add({
      targets: this.hand,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.scene.emitter.emit("completeTut2");
      },
    });
    timeline.play();
    this.add([this.hand]);
    this._sort();
  }
  initAssets() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, -100, 0, -100)
      .setCustomScale(...SCALES.keyboard)
      .setCustomAlign("Bottom")
      .setAlpha(0.2)
      .setDepth(35);
  }
  addBase() {
    this.base_top = this.scene.add
      .image(0, -300, "keyboard_top")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.75, 0.75);
    this.base = this.scene.add
      .image(0, -130, "keyboard_base")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      //   .setAlpha(0)
      .setScale(0.75, 3);

    this.add([this.base, this.base_top]);
    this._sort();
  }
  addLetter() {
    LETTERS1.map((letter, index) => {
      const x = -260 + index * 58;
      const y = -220;
      this[`letter_${letter.letter}`] = new Letter(this.scene, letter.letter)
        .setPosition(x, y)
        .setScale(0.75)
        .setDepth(55);
      this;
      this.add([this[`letter_${letter.letter}`]]);
      this._sort();
    });
    LETTERS2.map((letter, index) => {
      const x = -230 + index * 58;
      const y = -150;
      this[`letter_${letter.letter}`] = new Letter(this.scene, letter.letter)
        .setPosition(x, y)
        .setScale(0.75)
        .setDepth(55);
      this.add([this[`letter_${letter.letter}`]]);
      this._sort();
    });
    LETTERS3.map((letter, index) => {
      const x = -172 + index * 58;
      const y = -80;
      this[`letter_${letter.letter}`] = new Letter(this.scene, letter.letter)
        .setPosition(x, y)
        .setScale(0.75)
        .setDepth(55);

      this.add([this[`letter_${letter.letter}`]]);
      this._sort();
    });
  }
  enableBonus() {
    this.bonus1.setTexture("atlas", "dummyPowerup_1");
    this.count_bonus1.setAlpha(1);
  }
  addBonus() {
    this.bonus_base = this.scene.add
      .image(0, 0, "keyboard_base")
      .setDepth(36)
      .setOrigin(0.5, 0.5)
      .setScale(0.3, 0.7)
      .setPosition(0, -350);
    this.bonus1 = this.scene.add
      .image(0, 0, "atlas", "powerup_icon_reveal_disabled")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.5)
      .setPosition(-100, -350);
    this.bonus1
      .setInteractive()
      .once("pointerdown", () => this.onFirstBonusClick());
    this.count_bonus1 = this.scene.add
      .image(0, 0, "atlas", "count_bonus")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.8)
      .setAlpha(0)
      .setPosition(-80, -325);
    this.bonus2 = this.scene.add
      .image(0, 0, "atlas", "dummyPowerup_2")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.5)
      .setPosition(0, -350);
    // this.bonus2
    //   .setInteractive()
    //   .once("pointerdown", () => this.onSecondBonusClick());
    // this.count_bonus2 = this.scene.add
    //   .image(0, 0, "atlas", "count_bonus")
    //   .setDepth(37)
    //   .setOrigin(0.5, 0.5)
    //   .setScale(0.8)
    //   .setPosition(20, -325);
    this.bonus3 = this.scene.add
      .image(100, 0, "atlas", "dummyPowerup_3")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.5)
      .setPosition(100, -350);
    // this.bonus3
    //   .setInteractive()
    //   .once("pointerdown", () => this.onThirdBonusClick());
    // this.count_bonus3 = this.scene.add
    //   .image(0, 0, "atlas", "count_bonus")
    //   .setDepth(37)
    //   .setOrigin(0.5, 0.5)
    //   .setScale(0.8)
    //   .setPosition(120, -325);
    this.add([
      this.bonus1,
      this.bonus2,
      this.bonus3,
      this.bonus_base,
      this.count_bonus1,
      // this.count_bonus2,
      // this.count_bonus3,
    ]);
    this._sort();
  }

  onFirstBonusClick() {
    this.scene.emitter.emit("bonus");
    this.count_bonus1.destroy();
  }
  onSecondBonusClick() {
    this.count_bonus2.destroy();
    this.scene.emitter.emit(EVENTS.ON_BONUS_CLICK2);
  }
  onThirdBonusClick() {
    this.count_bonus3?.destroy();
    const audio = this.scene.countWord === 1 ? "spaceship" : "cupcake";
    Utils.addAudio(this.scene, audio, 0.5, false);
  }
  deleteCross(notEnable) {
    LETTERS1.map((letter, index) => {
      this[`letter_${letter.letter}`].cross.setAlpha(0);
      this[`letter_${letter.letter}`].enableKey();
      this[`letter_${letter.letter}`].addInteractive();
    });
    LETTERS2.map((letter, index) => {
      this[`letter_${letter.letter}`].cross.setAlpha(0);
      this[`letter_${letter.letter}`].enableKey();
      this[`letter_${letter.letter}`].addInteractive();
    });
    LETTERS3.map((letter, index) => {
      this[`letter_${letter.letter}`].cross.setAlpha(0);
      this[`letter_${letter.letter}`].enableKey();
      this[`letter_${letter.letter}`].addInteractive();
    });
  }
  setInterActiveLetters() {
    LETTERS1.map((letter, index) => {
      this[`letter_${letter.letter}`].addInteractive();
    });
    LETTERS2.map((letter, index) => {
      this[`letter_${letter.letter}`].addInteractive();
    });
    LETTERS3.map((letter, index) => {
      this[`letter_${letter.letter}`].addInteractive();
    });
  }
  removeInteractiveLetters() {
    LETTERS1.map((letter, index) => {
      this[`letter_${letter.letter}`].disableKey();
    });
    LETTERS2.map((letter, index) => {
      this[`letter_${letter.letter}`].disableKey();
    });
    LETTERS3.map((letter, index) => {
      this[`letter_${letter.letter}`].disableKey();
    });
  }
  enableKeys(notEnable) {
    LETTERS1.map((letter, index) => {
      if (
        notEnable?.includes(letter.letter) ||
        this.scene.notEnable.includes(letter.letter)
      )
        return;

      this[`letter_${letter.letter}`].enableKey();
    });
    LETTERS2.map((letter, index) => {
      if (
        notEnable?.includes(letter.letter) ||
        this.scene.notEnable.includes(letter.letter)
      )
        return;
      this[`letter_${letter.letter}`].enableKey();
    });
    LETTERS3.map((letter, index) => {
      if (
        notEnable?.includes(letter.letter) ||
        this.scene.notEnable.includes(letter.letter)
      )
        return;
      this[`letter_${letter.letter}`].enableKey();
    });
  }
  // addTutorial() {
  //   const letterTutorial =
  //     this.scene[`correctWord${this.scene.countWord}`][this.scene.findIndex()];
  //   if (this.isTutorial) return;
  //   this.hand = this.scene.add
  //     .image(
  //       this[`letter_${letterTutorial}`].x + 10,
  //       this[`letter_${letterTutorial}`].y - 20,
  //       "atlas",
  //       "tutorial_hand"
  //     )
  //     .setOrigin(0, 1)
  //     .setDepth(440)
  //     .setScale(0.7);
  //   LETTERS1.map((letter, index) => {
  //     if (letterTutorial === letter.letter) return;
  //     this[`letter_${letter.letter}`].disableKey();
  //   });
  //   LETTERS2.map((letter, index) => {
  //     if (letterTutorial === letter.letter) return;
  //     this[`letter_${letter.letter}`].disableKey();
  //   });
  //   LETTERS3.map((letter, index) => {
  //     if (letterTutorial === letter.letter) return;
  //     this[`letter_${letter.letter}`].disableKey();
  //   });
  //   this.handAnim = this.scene.tweens.add({
  //     targets: this.hand,
  //     x: "-=30",
  //     y: "+=50",
  //     scale: "*=0.95",
  //     duration: 400,
  //     yoyo: true,
  //     repeat: -1,
  //   });
  //   this.add([this.hand]);
  //   this._sort();
  // }
  removeTutorial() {
    // if (this.isTutorial) return;
    this.handAnim?.remove();
    this.hand?.destroy();
    this.enableKeys(this.scene[`word${this.scene.countWord}`]);
    this.isTutorial = false;
  }
}
