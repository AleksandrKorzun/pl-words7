import { EVENTS_DEFAULT } from "@holywater-tech/ads-builder/framework/components/EventsDispatcher";
import Screen from "../Screen";

export const EVENTS = {
  ...EVENTS_DEFAULT,
  ON_LETTER_CLICK: "onLetterClick",
  ON_WORD_COMPLETE: "onWordComplete",
  ON_BONUS_CLICK1: "onBonusClick1",
  ON_BONUS_CLICK2: "onBonusClick2",
  ON_BONUS_CLICK3: "onBonusClick3",
  ON_OPEN_STORE: "onOpenStore",
  ON_NEXT_LEVEL: "onNextLevel",
  ADD_TUTORIAL: "addTutorial",
  REMOVE_TUTORIAL: "removeTutorial",
};

export const ITEMS = ["1", "2", "3", "4", "5"];
export const LAYERS_DEPTH = {
  TITLE: 5,
  ITEM_GLOW: 35,
  ITEM_BASE: 34,
  ITEM: 30,
  MISTAKES: 33,
  TIMER: 35,
  HAND_TUTORIAL: 44,
};

export const POSITION = {
  choices: Screen.phoneProportions ? [0, 380, 0, 480] : [0, 430, 0, 480],
  mistakes: Screen.phoneProportions ? [0, 180, 0, 230] : [0, 180, 0, 280],
  buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
  messageTitle: Screen.phoneProportions
    ? [0, -100, 0, -100]
    : [0, -100, 0, -30],
  level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};
export const SCALE = {
  keyboard: Screen.phoneProportions
    ? [0.8, 0.8, 0.8, 0.8]
    : [0.8, 0.8, 0.8, 0.8],
  mistakes: Screen.phoneProportions ? [0, 180, 0, 230] : [0, 180, 0, 280],
  buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
  title: Screen.phoneProportions
    ? [0.22, 0.22, 0.22, 0.22]
    : [0.22, 0.22, 0.22, 0.22],
  messageTitle: Screen.phoneProportions ? [0, 350, 0, -100] : [0, 350, 0, -30],
  level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};

export const LETTERS1 = [
  { letter: "Q", x: -250, y: -220 },
  { letter: "W", x: -130, y: -220 },
  { letter: "E", x: 0, y: -220 },
  { letter: "R", x: 130, y: -220 },
  { letter: "T", x: 260, y: -220 },
  { letter: "Y", x: -250, y: -90 },
  { letter: "U", x: -130, y: -90 },
  { letter: "I", x: 0, y: -90 },
  { letter: "O", x: 130, y: -90 },
  { letter: "P", x: 260, y: -90 },
];
export const LETTERS2 = [
  { letter: "A", x: -250, y: 40 },
  { letter: "S", x: -130, y: 40 },
  { letter: "D", x: 0, y: 40 },
  { letter: "F", x: 130, y: 40 },
  { letter: "G", x: 260, y: 40 },
  { letter: "H", x: -250, y: 170 },
  { letter: "J", x: -130, y: 170 },
  { letter: "K", x: 0, y: 170 },
  { letter: "L", x: 130, y: 170 },
];
export const LETTERS3 = [
  { letter: "Z", x: 260, y: 170 },
  { letter: "X", x: -250, y: 300 },
  { letter: "C", x: -130, y: 300 },
  { letter: "V", x: 0, y: 300 },
  { letter: "B", x: 130, y: 300 },
  { letter: "N", x: 260, y: 300 },
  { letter: "M", x: 260, y: 300 },
];
export const SHEETS = {
  ITEM_BASE: "btn",
  ITEM_GLOW: "btn_tap",
  HAND_TUTORIAL: "hand_tutorial",
};

export const POSITIONS_PHONE = {
  word: Screen.phoneProportions ? [0, -160, 0, -50] : [0, -140, 0, -50],
  board: Screen.phoneProportions ? [0, 150, 0, 250] : [0, 70, 0, 90],
};
export const POSITIONS = {
  word:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.word
      : [0, -150, 0, -100],
  board:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.board
      : [0, 150, 0, 150],
};

const SCALES_PHONE = {
  keyboard: Screen.phoneProportions
    ? [0.75, 0.75, 1, 1]
    : [0.75, 0.75, 0.75, 0.75],
  board: Screen.phoneProportions ? [0.7, 0.7, 1, 1] : [0.8, 0.8, 0.9, 0.9],
  img: Screen.phoneProportions
    ? [0.3, 0.3, 0.45, 0.45]
    : [0.33, 0.33, 0.35, 0.35],
  image_bg: Screen.phoneProportions
    ? [0.8, 1, 1.4, 1.4]
    : [0.9, 1.1, 1.4, 1.15],
  timer: Screen.phoneProportions ? [1.6, 1.6, 1, 1] : [1.4, 1.4, 1, 1],
};

export const SCALES = {
  keyboard:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.keyboard
      : [0.75, 0.75, 0.7, 0.7],
  board:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.board
      : [0.7, 0.7, 0.8, 0.8],
  img:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.img
      : [0.3, 0.3, 0.26, 0.26],
  image_bg:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.image_bg
      : [0.75, 1, 1.4, 0.9],
};

export const IMAGES = [
  {
    puzzleId: 1,
    minLevel: 15,
    puzzleWord: "Cannonball",
    puzzleImage: "Cannonball.jpg",
    puzzleHint: "A type of dive into water that creates a big splash.",
  },
  {
    puzzleId: 2,
    minLevel: 25,
    puzzleWord: "Ladybug",
    puzzleImage: "Ladybug.jpg",
    puzzleHint:
      "A small, colorful beetle, often red with black spots, known for eating pests.",
  },
  {
    puzzleId: 3,
    minLevel: 35,
    puzzleWord: "Sweetpea",
    puzzleImage: "Sweetpea.jpg",
    puzzleHint:
      "A term of endearment or a flowering plant with fragrant blossoms.",
  },
  {
    puzzleId: 4,
    minLevel: 45,
    puzzleWord: "Rocketship",
    puzzleImage: "Rocketship.jpg",
    puzzleHint: "A spacecraft designed for travel through space.",
  },
  {
    puzzleId: 5,
    minLevel: 55,
    puzzleWord: "Hogwash",
    puzzleImage: "Hogwash.jpg",
    puzzleHint: "Means nonsense or worthless talk; something untrue or absurd.",
  },
];
export const PUZZLES = [
  { name: "puzzle_piece_default_1", x: -140, y: 93 },
  { name: "puzzle_piece_default_2", x: -18, y: 110 },
  { name: "puzzle_piece_default_3", x: 120, y: 91 },
  { name: "puzzle_piece_default_4", x: -140, y: 215 },
  { name: "puzzle_piece_default_5", x: -1, y: 232 },
  { name: "puzzle_piece_default_6", x: 138, y: 212 },
  { name: "puzzle_piece_default_7", x: -139, y: 351 },
  { name: "puzzle_piece_default_8", x: -20, y: 352 },
  { name: "puzzle_piece_default_9", x: 120, y: 350 },
];
export const PUZZLES_OPEN = [
  { name: "puzzle_piece_1", x: -140, y: 93 },
  { name: "puzzle_piece_2", x: -18, y: 110 },
  { name: "puzzle_piece_3", x: 120, y: 91 },
  { name: "puzzle_piece_4", x: -140, y: 215 },
  { name: "puzzle_piece_5", x: -1, y: 232 },
  { name: "puzzle_piece_6", x: 138, y: 212 },
  { name: "puzzle_piece_7", x: -139, y: 351 },
  { name: "puzzle_piece_8", x: -20, y: 352 },
  { name: "puzzle_piece_9", x: 120, y: 350 },
];
