export default class Tutorial extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.initAssets();
    this.addRevealTutorial();
    this.scene.emitter.on("completeTut1", () => {
      this.hideTutorial(this.tutorial1, 1400);
      this.scene.addKeyboard();
      this.scene.keyboard.setAlpha(1);
      this.addKeyboardTutorial();
      this.showTutorial(this.tutorial2, -200);
      this.scene.header.addHideImage();
      this.scene.input.once("pointerdown", () => {
        this.scene.keyboard.addTutorial();
      });
    });
    this.scene.emitter.on("completeTut2", () => {
      this.hideTutorial(this.tutorial2, 1400);
      this.addFinalTutorial();
      this.scene.header.removeHideImage();
      this.scene.input.once("pointerdown", () => {
        this.scene.header.hideImage.destroy();
        this.scene.keyboard.enableKeys();
        this.scene.keyboard.enableBonus();
        this.hideTutorial(this.tutorial3, 1400);
        this.scene.pieces = 10;
        this.scene.addTimer();
        this.scene.isTutorial = false;
        this.scene.header.pieces_num.setText(`Pieces ${this.scene.pieces}`);
        this.scene.header.onClickArrow("right");
        this.scene.addGoTitle();
        // setTimeout(() => {
        // }, 1000);
      });
    });
    // this.scene.emitter.on("completeTut3", () => {
    // });
  }
  initAssets() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomScale(1.2, 1.2, 1.2, 1.2)
      .setCustomAlign("Center")
      .setDepth(135);
  }
  addRevealTutorial() {
    this.tutorial1 = this.scene.add
      .image(0, 900, "tut1")
      .setDepth(37)
      .setScale(0);
    this.showTutorial(this.tutorial1, 200);
    this.add([this.tutorial1]);
    this._sort();
    setTimeout(() => {
      this.scene.header.addTutorial();
    }, 2000);
  }
  addKeyboardTutorial() {
    this.tutorial2 = this.scene.add
      .image(0, 900, "tut2")
      .setDepth(37)
      .setScale(0);
    this.showTutorial(this.tutorial2, 200);
    this.add([this.tutorial2]);
    this._sort();
  }
  addFinalTutorial() {
    this.tutorial3 = this.scene.add
      .image(0, 900, "tut3")
      .setDepth(37)
      .setScale(0);
    this.showTutorial(this.tutorial3, -200);
    this.add([this.tutorial3]);
    this._sort();
  }
  showTutorial(targets, y) {
    this.scene.tweens.add({
      targets: targets,
      scale: 0.75,
      y,
      duration: 500,
      ease: "Linear",
    });
  }
  hideTutorial(targets, y) {
    this.scene.tweens.add({
      targets: targets,
      scale: 0,
      y: 1400,
      duration: 500,
      ease: "Linear",
    });
  }
}
