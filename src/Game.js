import ParentScene from "@holywater-tech/ads-builder/framework/components/Scene";
import Background from "@holywater-tech/ads-builder/framework/components/ui/Background";
import Header from "./Header";
import Keyboard from "./Keyboard";
import Word from "./Word";
import { EVENTS, SCALES } from "./constants/Constants";
import { Modal } from "./Modal";
// import Utils from '@holywater-tech/ads-builder/framework/Utils';
// import { EVENTS } from './constants/Constants';
import Buttons from "./Buttons";
import Timer from "./timer";
import Tutorial from "./Tutorial";
// import Timer from './timer';
// import Bonus from './Bonus';
// import Footer from './Footer';
// import Machine from './Machine';

export default class Game extends ParentScene {
  create() {
    this.addBackground("bg");
    // this.addGoTitle();
    // this.word1 = ["", "", "", "", "", "", "", "", ""];
    // this.correctWord1 = ["S", "P", "A", "C", "E", "S", "H", "I", "P"];
    // this.word2 = ["", "", "", "", "", "", ""];
    // this.correctWord2 = ["C", "U", "P", "C", "A", "K", "E"];
    this.countWord = 1;
    this.puzzle = 1;
    this.pieces = 10;
    this.puzzleComplete = 0;
    this.wordComplete = 0;
    this.addHeader();
    // this.addTimer();
    this.addBanner();
    this.addTutorial();
    // this.addKeyboard();
    this.isTutorial = true;
    // this.addWord();
    // this.addCta();
    // this.addTitle();
    this.notEnable = [];
    // this.addModal();
    // this.modal.addModalWin();
    // this.addBonus();
    // this.addFinalScene();
    this.initListeners();
  }
  findIndex() {
    return this[`word${this.countWord}`]?.findIndex((v) => !v) || 0;
  }
  findCorrectIndex(letterFind) {
    const i = [];
    this[`correctWord${this.countWord}`].map((letter, index) => {
      if (this[`correctWord${this.countWord}`][index] === letterFind) {
        i.push(index);
      }
    });
    return i;
  }
  addBanner() {
    this.banner = this.add
      .image(0, 0, "end_card_h")
      .addProperties(["pos", "scale"])
      .setCustomAlign("Bottom")
      .setDepth(38)
      .setCustomScale(1.8, 1.8, 0.7, 0.7)
      // .setCustomImage("end_card_h", "end_card_v")
      .setCustomPosition(0, 250, 0, 30);

    this.guess = this.add
      .image(0, 0, "guess")
      .addProperties(["pos", "scale"])
      .setCustomAlign("Bottom")
      .setDepth(38)
      .setCustomScale(0.6, 0.6, 0.5, 0.5)
      .setCustomPosition(-120, -60, -120, -60);
    this.playBtn = this.add
      .image(0, 0, "atlas", "play")
      .addProperties(["pos", "scale"])
      .setCustomAlign("Bottom")
      .setDepth(38)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomPosition(120, -60, 120, -60);
    this.tweens.add({
      targets: this.playBtn,
      scale: "*=0.95",
      duration: 500,
      repeat: -1,
      yoyo: true,
    });
    this.game.network.addClickToStore(this.playBtn);
    this.mainContainer.add([this.banner, this.guess, this.playBtn]);
    this.sort();
  }
  addGoTitle() {
    this.goTitle1 = this.add
      .image(0, 0, "go1")
      .addProperties(["pos", "scale"])
      .setCustomAlign("Center")
      .setDepth(138)
      .setCustomScale(0.65, 0.65, 0.65, 0.65)
      .setCustomPosition(1500, 20, 1500, -120);
    this.goTitle2 = this.add
      .image(0, 0, "go2")
      .addProperties(["pos", "scale"])
      .setCustomAlign("Center")
      .setDepth(138)
      .setCustomScale(0.65, 0.65, 0.65, 0.65)
      .setCustomPosition(1500, 20, 1500, -120);
    this.tweens.add({
      targets: this.goTitle1,
      x: "-=1500",
      duration: 400,
      delay: 500,
      hold: 2000,
    });
    this.tweens.add({
      targets: this.goTitle1,
      x: "-=1500",
      duration: 400,
      delay: 2500,
    });
    this.tweens.add({
      targets: this.goTitle2,
      x: "-=1500",
      duration: 400,
      delay: 3000,
    });
    this.tweens.add({
      targets: this.goTitle2,
      x: "-=1500",
      duration: 400,
      delay: 6500,
      onComplete: () => {
        this.emitter.emit("startTimer");
      },
    });
    this.mainContainer.add([this.goTitle1, this.goTitle2]);
    this.sort();
  }
  addModal() {
    this.notEnable = [];

    this.modal = new Modal(this);
    console.log("this.wordComplete", this.wordComplete);
    // if (this.wordComplete === 3) {
    //   console.log("store");
    //   this.game.network.addClickToStore(this.bg);
    // }
    this.mainContainer.add([this.modal]);
    this.sort;
  }
  addTutorial() {
    this.tutorial = new Tutorial(this);
    this.mainContainer.add([this.tutorial]);
    this.sort;
  }
  newGame() {
    this.pieces = 10;
    this.header.pieces_num.setText(`Pieces ${this.scene.pieces}`);
    this.header.onClickArrow("right");
    this.modal.destroyModal();
    this.keyboard.setAlpha(1);
    this.timer.resetTimer();
    this.isFinish = false;
  }
  initListeners() {
    // this.emitter.on("newGame", () => this.newGame(), this);
    this.emitter.on(
      EVENTS.ON_WORD_COMPLETE,
      () => {
        setTimeout(() => {
          this.addModal();
          console.log(
            "terter",
            this.header.puzzleComplete[this.header.currentPuzzle]
          );
          this.modal.addModalWin(
            this.header.puzzleComplete[this.header.currentPuzzle]
          );
        }, 1000);
      },
      this
    );
    this.emitter.on(
      "timeOut",
      () => {
        setTimeout(() => {
          this.addModal();
          this.modal.addModalLoose();
          this.game.network.addClickToStore(this.bg);
        }, 1000);
      },
      this
    );
    // this.emitter.on(EVENTS.ON_NEXT_LEVEL, this.nextWord, this);
    // this.emitter.on(EVENTS.ON_OPEN_STORE, () => this.openStore(), this);
  }

  nextWord() {
    this.modal.destroyModal();
    setTimeout(() => {
      this.countWord += 1;
      // this.animImage.destroy();
      this.img.destroy();
      this.addImage("cupcake");
      this.word.changeWordLetterAnswer();
    }, 1000);
  }
  addBackground(bg, options = {}) {
    this.bg = new Background(this, bg, true, [1.5, 1.5, 1.1, 1.1]).setDepth(
      options.depth || 4
    );
    this.mainContainer.add([this.bg]);
    this.sort();
  }
  addLogo() {
    this.logo = this.add
      .image(0, 0, "logo")
      .addProperties(["pos"])
      .setCustomAlign("Top Left")
      .setDepth(38)
      .setOrigin(0.5, 0.5)
      .setScale(0.35)
      .setCustomPosition(80, 80, 80, 80);
    this.mainContainer.add([this.logo]);
    this.sort();
  }
  addTitle() {
    this.title = this.add
      .image(0, 0, "title")
      .addProperties(["pos"])
      .setCustomAlign("Top")
      .setDepth(38)
      .setOrigin(0.5, 0)
      .setScale(0.4)
      .setCustomPosition(0, -10, 0, -10);
    this.mainContainer.add([this.title]);
    this.sort();
  }

  addImage(image) {
    this.bg_img = this.add
      .image(0, 0, "bg_img")
      .addProperties(["pos", "scale"])
      .setOrigin(0.5, 0)
      .setCustomPosition(0, 0, 0, 150)
      .setCustomAlign("Top")
      .setDepth(100)
      .setCustomScale(...SCALES.image_bg);

    this.img = this.add
      .image(0, 0, image)
      .addProperties(["pos", "scale"])
      .setOrigin(0.5, 0)
      .setCustomPosition(0, 50, 0, 200)
      .setCustomAlign("Top")
      .setDepth(100)
      .setCustomScale(...SCALES.img);
    this.mainContainer.add([this.bg_img, this.img]);
    this.sort();
  }

  addCta() {
    this.cta = new Buttons(
      this,
      "btn_download",
      { lx: 0, ly: 0, px: 100, py: 100 },
      () => this.openStore()
    )
      .setCustomScale(0.3, 0.3, 0.4, 0.4)
      .setDepth(100);
    this.tweens.add({
      targets: this.cta,
      scale: "*=0.95",
      duration: 500,
      repeat: -1,
      yoyo: true,
    });
    this.mainContainer.add([this.cta]);
    this.sort();
  }

  addKeyboard() {
    this.keyboard = new Keyboard(this);
    this.mainContainer.add([this.keyboard]);
    this.sort();
  }
  addTimer(scene) {
    this.timer = new Timer(this);
    this.mainContainer.add([this.timer]);
    this.sort();
  }
  addWord() {
    this.word = new Word(this);
    this.mainContainer.add([this.word]);
    this.sort();
  }

  addHeader() {
    this.header = new Header(this);
    this.mainContainer.add([this.header]);
    this.sort();
  }

  openStore() {
    this.game.network.openStore();
  }
  openstore2() {
    this.game.network.addClickToStore(this.bg);
  }
}
