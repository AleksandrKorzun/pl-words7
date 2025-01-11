import {
  EVENTS,
  IMAGES,
  POSITIONS,
  PUZZLES,
  SCALES,
} from "./constants/Constants";
import Puzzle from "./Puzzle";

export default class Header extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.isHorizontal = window.innerWidth > window.innerHeight;
    this.addHeader();
    this.initAssets();
    this.addPuzzles();
    this.addFooter();
    this.currentPuzzle = 1;
    this.puzzleComplete = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    // this.scene.emitter.on(EVENTS.ON_WORD_COMPLETE, () =>
    //   this.removeInteractive()
    // );
    // this.scene.emitter.on("reveal", () => this.removeTutorial());
    // this.addTutorial();
    // this.animationPopup();
    // window.addEventListener('resize', () => this.resize());
  }

  initAssets() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(...POSITIONS.board)
      .setCustomScale(...SCALES.board)
      .setCustomAlign("Top")
      .setDepth(35);
  }

  addHideImage() {
    this.hideImage = this.scene.add
      .image(0, 0, "hide_img")
      .setDepth(66)
      .setOrigin(0.5, 0.5)
      .setScale(0.7)
      .setPosition(0, 230);
    this.arrow_down = this.scene.add
      .image(0, 0, "atlas", "arrow_down")
      .setDepth(66)
      .setOrigin(0.5, 0.5)
      .setScale(0.6)
      .setPosition(0, 380);
    this.arrowAnim = this.scene.tweens.add({
      targets: this.arrow_down,
      y: "+=10",
      duration: 300,
      yoyo: true,
      repeat: -1,
    });
    this.add([this.hideImage, this.arrow_down]);
    this._sort();
  }

  removeHideImage() {
    this.arrowAnim.remove();
    // this.hideImage.destroy();
    this.arrow_down.destroy();
  }
  addHeader() {
    this.header = this.scene.add
      .image(0, 0, "logo2")
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.45)
      .setPosition(0, -20);
    this.base = this.scene.add
      .image(0, 0, "popup_base")
      .setDepth(7)
      .setOrigin(0.5, 0.5)
      .setScale(0.7, 0.7)
      .setPosition(0, 230);

    // this.arrowLeft = this.scene.add
    //   .image(0, 0, "atlas", "button_arrow")
    //   .setDepth(7)
    //   .setOrigin(0.5, 0.5)
    //   .setScale(0.6)
    //   .setFlipX(true)
    //   .setPosition(-250, 230);
    // this.arrowRight = this.scene.add
    //   .image(0, 0, "atlas", "button_arrow")
    //   .setDepth(7)
    //   .setOrigin(0.5, 0.5)
    //   .setScale(0.6)
    //   .setPosition(250, 230);
    // this.arrowLeft.setInteractive().on("pointerdown", () => {
    //   this.onClickArrow("left");
    // });
    // this.arrowRight.setInteractive().on("pointerdown", () => {
    //   this.onClickArrow("right");
    // });
    this.add([
      this.header,
      this.base,
      // this.arrowLeft,
      // this.arrowRight,
      // this.answer_base,
    ]);
    this._sort();
  }
  addFooter() {
    this.reveal = this.scene.add
      .image(0, 450, "atlas", "button_reveal_normal")
      .setScale(0.5)
      .setDepth(8);
    this.reveal_press = this.scene.add
      .image(0, 450, "atlas", "button_reveal_pressed")
      .setScale(0.5)
      .setDepth(7);
    this.bg_left = this.scene.add
      .image(-174, 447, "atlas", "bg_1")
      .setScale(0.6, 0.6)
      .setFlipX(true)
      .setDepth(7);
    this.puzzle_num = this.scene.add
      .text(-174, 447, `Puzzle #1`, {
        font: "normal 30px Roboto-Medium",
        fill: "#1B2872",
      })
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.65);
    this.pieces_num = this.scene.add
      .text(194, 447, `Pieces 10`, {
        font: "normal 30px Roboto-Medium",
        fill: "#1B2872",
      })
      .setDepth(37)
      .setOrigin(0.5, 0.5)
      .setScale(0.65);
    this.bg_right = this.scene.add
      .image(174, 447, "atlas", "bg_1")
      .setScale(0.6, 0.6)
      .setDepth(7);
    this.icon = this.scene.add
      .image(134, 447, "atlas", "icon_puzzle")
      .setScale(0.4)
      .setDepth(7);
    this.reveal.setInteractive().on("pointerdown", () => {
      if (this.scene.isTutorial) return;
      this.onClickReveal();
      this.scene.emitter.emit("reveal");
    });
    this.add([
      this.reveal,
      this.reveal_press,
      this.bg_left,
      this.bg_right,
      this.puzzle_num,
      this.pieces_num,
      this.icon,
    ]);
    this._sort();
  }
  onClickReveal() {
    this.scene.pieces--;
    this.pieces_num.setText(`Pieces ${this.scene.pieces}`);
    if (this.scene.pieces <= 0) {
      this.reveal.setAlpha(0);
      this.reveal_press.setAlpha(1);
      this.reveal.disableInteractive();
    } else {
      this.scene.tweens.add({
        targets: this.reveal,
        alpha: 0,
        duration: 300,
        yoyo: true,
        onComplete: () => {
          this.reveal.setAlpha(1);
          // this.reveal_press.setAlpha(0);
        },
      });
    }
  }
  removeInteractive() {
    this.reveal.disableInteractive();
    this.arrowLeft?.disableInteractive();
    this.arrowRight?.disableInteractive();
  }
  onClickArrow(arrow) {
    if (arrow === "left") {
      const newPuzzle = this.currentPuzzle === 1 ? 5 : this.currentPuzzle - 1;
      this.scene.emitter.emit("changeImage", {
        prev: this.currentPuzzle,
        newPuzzle: newPuzzle,
      });
      this.currentPuzzle = newPuzzle;
    } else {
      const newPuzzle = this.currentPuzzle === 5 ? 1 : this.currentPuzzle + 1;
      this.scene.emitter.emit("changeImage", {
        prev: this.currentPuzzle,
        newPuzzle: newPuzzle,
      });

      this.currentPuzzle =
        this.currentPuzzle === 5 ? 1 : this.currentPuzzle + 1;
    }
    this.puzzle_num.setText(`Puzzle #${this.currentPuzzle}`);
  }

  addTutorial() {
    this.hand = this.scene.add
      .image(30, 340, "atlas", "tutorial_hand")
      .setDepth(440)
      .setAngle(-20)
      .setScale(0.6);
    this.add([this.hand]);
    this._sort();
    this.handAnim = this.scene.tweens.add({
      targets: this.hand,
      x: "+10",
      y: "+=40",
      scale: "*=0.95",
      duration: 400,
      yoyo: true,
      repeat: 8,
      hold: 500,
      onCompleteRepeat: () => {
        setTimeout(() => {
          this.scene.emitter.emit("reveal");
          this.onClickReveal();
        }, 200);
      },
      onComplete: () => {
        this.scene.emitter.emit("completeTut1");
        this.removeTutorial();
      },
    });
  }
  removeTutorial() {
    this.handAnim.remove();
    this.hand.destroy();
  }
  addPuzzles() {
    IMAGES.map(({ puzzleWord }, index) => {
      this.imgPuzzle = new Puzzle(this.scene, {
        img: puzzleWord,
        x: index ? 1400 : 0,
        y: 0,
        num: index + 1,
      })
        .setScale(0.95)
        .setPosition(index ? 2000 : 0, 0)
        .setDepth(12);
      this.imgPuzzle.num = index + 1;
      this.add([this.imgPuzzle]);
      this._sort();
    });
  }
  show() {
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 400,
    });
  }

  hide() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 400,
    });
  }
}
