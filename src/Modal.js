import { EVENTS } from "./constants/Constants";

export class Modal extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.isHorizontal = window.innerWidth > window.innerHeight;
    // this.addModalWin();

    this.initAssets();
    // window.addEventListener('resize', () => this.resize());
  }
  initAssets() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, -140, 0, -140)
      .setCustomScale(0, 0, 0, 0)
      .setCustomAlign("Bottom")
      .setDepth(35);
  }
  addModal() {
    this.modal_base = this.scene.add.image(0, 0, "base").setDepth(3);
    this.money_base = this.scene.add.image(0, -100, "reward_bg").setDepth(4);
    this.money = this.scene.add.image(-150, -100, "money_reward").setDepth(5);
    this.money_text = this.scene.add
      .text(100, -100, "+ 10", {
        font: "normal 110px Roboto-Medium",
        fill: "#D48930",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(6);
    this.level_solved = this.scene.add
      .image(0, -375, "level_solved")
      .setDepth(4);
    this.btn_next = this.scene.add
      .image(0, 130, "button_next")
      .setScale(0.7)
      .setDepth(7);
    this.btn_download = this.scene.add
      .image(0, 300, "btn_download")
      .setScale(0.7)
      .setDepth(7);
    this.btn_download.setInteractive().on("pointerdown", () => {
      this.scene.emitter.emit(EVENTS.ON_OPEN_STORE);
    });
    // this.btn_next.setInteractive().on("pointerdown", () => {
    //   this.scene.emitter.emit(
    //     this.scene.countWord === 1 ? EVENTS.ON_NEXT_LEVEL : EVENTS.ON_OPEN_STORE
    //   );
    // });
    this.add([
      this.modal_base,
      this.level_solved,
      this.money_base,
      this.money,
      this.money_text,
      this.btn_next,
      this.btn_download,
    ]);
    this._sort();
  }
  addModalWin(star) {
    if (this.scene.isFinish) return;
    console.log("first", this.scene.wordComplete);
    if (this.scene.wordComplete === 3) {
      console.log("store");
      this.scene.openstore2();
      // this.game.network.addClickToStore(this.bg);
    }
    this.solved = this.scene.add
      .image(0, 0, "atlas", "solved")
      .setDepth(3)
      .setScale(0.8)
      .setOrigin(0.5, 0.5);
    this.star1 = this.scene.add
      .image(-100, -130, "atlas", "icon_star_small")
      .setDepth(5)
      .setScale(1.2)
      .setOrigin(0.5, 0.5);
    if (star <= 6) {
      this.star2 = this.scene.add
        .image(0, -130, "atlas", "icon_star_small")
        .setDepth(5)
        .setScale(1.2)
        .setOrigin(0.5, 0.5);
      this.add([this.star2]);
    }
    if (star <= 3) {
      this.star3 = this.scene.add
        .image(100, -130, "atlas", "icon_star_small")
        .setDepth(5)
        .setScale(1.2)
        .setOrigin(0.5, 0.5);
      this.add([this.star3]);
    }
    this.star1_empty = this.scene.add
      .image(-100, -130, "atlas", "icon_star_small_empty")
      .setDepth(3)
      .setScale(1.2)
      .setOrigin(0.5, 0.5);
    this.star2_empty = this.scene.add
      .image(0, -130, "atlas", "icon_star_small_empty")
      .setDepth(3)
      .setScale(1.2)
      .setOrigin(0.5, 0.5);
    this.star3_empty = this.scene.add
      .image(100, -130, "atlas", "icon_star_small_empty")
      .setDepth(3)
      .setScale(1.2)
      .setOrigin(0.5, 0.5);
    this.play = this.scene.add
      .image(0, -280, "atlas", "btn_play")
      .setDepth(3)
      .setScale(1.5)
      .setOrigin(0.5, 0.5);
    if (this.scene.wordComplete < 3) {
      this.scene.wordComplete += 1;
      this.play.setInteractive().on("pointerdown", () => {
        this.scene.pieces = 10;
        this.scene.header.pieces_num.setText(`Pieces ${this.scene.pieces}`);
        this.scene.header.onClickArrow("right");
        this.destroyModal();
        this.scene.keyboard.setAlpha(1);
        this.scene.timer.resetTimer();
        this.scene.isFinish = false;
      });
    } else {
    }
    this.scene.tweens.add({
      targets: this.play,
      scale: 1.4,
      duration: 300,
      hold: 500,
      yoyo: true,
      repeat: -1,
    });
    this.add([
      this.solved,
      this.star1,
      // this.star2,
      // this.star3,
      this.star1_empty,
      this.star2_empty,
      this.star3_empty,
      this.play,
    ]);
    this._sort();
    this.showModal();
    this.scene.isFinish = true;
  }
  addModalLoose() {
    if (this.scene.isFinish) return;
    this.fail = this.scene.add
      .image(0, -280, "title_loose")
      .setDepth(3)
      .setScale(2)
      .setOrigin(0.5, 0.5);
    this.play = this.scene.add
      .image(0, -80, "atlas", "btn_try")
      .setDepth(3)
      .setScale(1.5)
      .setOrigin(0.5, 0.5);
    this.scene.tweens.add({
      targets: this.play,
      scale: 1.4,
      duration: 300,
      hold: 500,
      yoyo: true,
      repeat: -1,
    });
    this.add([this.fail, this.play]);
    this._sort();
    this.showModal();
    this.scene.isFinish = true;
  }
  showModal() {
    this.scene.tweens.add({
      targets: this,
      pScaleX: 0.6,
      pScaleY: 0.6,
      lScaleX: 0.6,
      lScaleY: 0.6,
      ease: "easeIn",
      duration: 500,
    });
  }
  destroyModal() {
    this.scene.tweens.add({
      targets: this,
      pScaleX: 0,
      pScaleY: 0,
      lScaleX: 0,
      lScaleY: 0,
      ease: "easeOut",
      duration: 300,
      onComplete: () => this.destroy(),
    });
  }
}
