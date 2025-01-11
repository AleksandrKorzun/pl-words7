import { EVENTS, LAYERS_DEPTH, SCALES } from "./constants/Constants";

export default class Timer extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    // this.tweens = scene.tweens;
    this.addCount();
    this.addStyle();
    this.isStarted = false;
    this.scene.emitter.on("startTimer", () => {
      if (this.isStarted) return;
      this.changeCount();
      this.isStarted = true;
    });
    this.scene.emitter.on(EVENTS.ON_WORD_COMPLETE, () => {
      this.removeCounter();
    });
  }

  addStyle() {
    this.addProperties(["pos", "scale", "align"])
      .setCustomPosition(-300, -60, 0, -60)
      .setCustomScale(1, 1, 1, 1)
      .setCustomAlign("Top", "Top Left")
      .setDepth(444);
    this.scene.mainContainer.add([this]);
    this.sort();
  }

  addCount() {
    // if (!this.isStarted) return;
    this.second = 30;
    // this.timerTitle = this.scene.add
    //   .image(-100, 0, "atlas", "left")
    //   .setDepth(7);
    this.textSecond = this.scene.add
      .text(20, 60, Math.floor(this.second), {
        font: "bold 80px BerlinSansFBDemiBold",
        fill: "#fff",
      })
      .setDepth(6);
    this.add([this.textSecond]);
    this._sort();
  }

  changeCount() {
    if (this.scene) {
      this.animationSecond = this.scene.tweens.addCounter({
        from: this.second,
        to: 0,
        delay: 1000,
        duration: 30000,
        onUpdate: (tween) => {
          this.textSecond.text = Math.floor(tween.getValue());
        },
        onComplete: () => this.scene.emitter.emit("timeOut"),
      });
    } else {
      this.animationSecond = this.tweens.addCounter({
        from: this.second,
        to: 0,
        delay: 1000,
        duration: 30000,
        onUpdate: (tween) => {
          this.textSecond.text = Math.floor(tween.getValue());
        },
        onComplete: () => this.scene.emitter.emit("timeOut"),
      });
    }
  }

  resetTimer() {
    this.second = 30;
    this.textSecond.text = 30;
    this.setAlpha(1);
    this.changeCount();
    // this.changeCount();
  }
  removeCounter() {
    this.audioTimer?.stop();
    this.isStarted = false;
    this.animationGlow?.remove();
    this.animationSecond?.remove();
    this.animationTimer?.remove();
    this.hide();
  }

  show() {
    this.scene.tweens.add({
      targets: this,
      py: 70,
      ly: 100,
      alpha: 1,
      duration: 400,
      delay: 1000,
    });
  }

  hide() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 300,
      // onComplete: () => {
      //   this.destroy();
      // },
    });
  }
}
