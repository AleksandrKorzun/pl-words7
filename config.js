module.exports = {
  name: "",
  networks: [
    "Applovin",
    "Facebook",
    "Google",
    "IronSource",
    "Liftoff",
    "TikTok",
    "UnityAds",
    "Vungle",
    "Landing",
    "Mindworks",
  ],
  customPhaser: true,
  qualityAtlas: [0.8, 0.8],
  qualityTexture: [0.8, 0.8],
  bitrateAudio: 32, // 128, 64, 32, 16
  ios: "https://apps.apple.com/us/app/pixelphrase-guess-the-word/id6535669815",
  android:
    "https://play.google.com/store/apps/details?id=com.word.guess.pixelphrase",
  currentVersion: "default", // после изменения значения нужно заново запустить npm run dev
  versions: {
    default: {
      lang: "en",
      audio: [],
      fonts: [],
      sheets: [],
      spine: [],
      textures: [],
    },
  },
};
