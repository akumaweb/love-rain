const loveRainStage = document.getElementById("love-rain-stage");
const heartStream = document.getElementById("heart-stream");

const rainPhrases = [
  "anh yêu em",
  "i love you",
  "Bích Nga",
  "bé iu luôn xinh đẹp",
  "hạnh phúc và may mắn",
  "thương em thật lâu",
  "công chúa của anh",
  "mãi bên nhau nhé",
  "Bích Nga ơi",
  "nhớ em nhiều",
  "yêu em thật nhiều",
  "cười thật nhiều nhé",
];

const heartPhrases = ["❤", "❤", "❤", "♡"];
let rainTimerId = null;
let heartTimerId = null;

const spawnRainPhrase = () => {
  if (!loveRainStage) {
    return;
  }

  const phrase = document.createElement("span");
  const useHeart = Math.random() < 0.16;
  const contentPool = useHeart ? heartPhrases : rainPhrases;
  const stageWidth = loveRainStage.clientWidth;
  const startX = Math.random() * Math.max(stageWidth - 180, 120);
  const drift = (Math.random() - 0.5) * 140;
  const duration = 11000 + Math.random() * 7000;
  const size = useHeart ? 28 + Math.random() * 26 : 22 + Math.random() * 42;
  const sizeMobile = Math.max(size - 8, 20);
  const blur = Math.random() < 0.34 ? (Math.random() * 1.9).toFixed(2) : "0";
  const alpha = (0.68 + Math.random() * 0.28).toFixed(2);
  const rotation = `${(-8 + Math.random() * 16).toFixed(2)}deg`;

  phrase.className = `rain-phrase${useHeart ? " is-heart" : ""}`;
  phrase.textContent = contentPool[Math.floor(Math.random() * contentPool.length)];
  phrase.style.setProperty("--x-start", `${startX}px`);
  phrase.style.setProperty("--x-end", `${startX + drift}px`);
  phrase.style.setProperty("--duration", `${duration}ms`);
  phrase.style.setProperty("--size", `${size}px`);
  phrase.style.setProperty("--size-mobile", `${sizeMobile}px`);
  phrase.style.setProperty("--blur", `${blur}px`);
  phrase.style.setProperty("--alpha", alpha);
  phrase.style.setProperty("--rotate", rotation);
  phrase.style.zIndex = Math.random() < 0.3 ? "2" : "4";

  loveRainStage.appendChild(phrase);
  phrase.addEventListener("animationend", () => {
    phrase.remove();
  });
};

const spawnHeart = () => {
  if (!heartStream) {
    return;
  }

  const heart = document.createElement("span");
  const streamWidth = heartStream.clientWidth;
  const startX = Math.random() * Math.max(streamWidth - 60, 40);
  const drift = (Math.random() - 0.5) * 120;
  const duration = 7000 + Math.random() * 4500;
  const size = 16 + Math.random() * 22;
  const scale = (0.85 + Math.random() * 0.45).toFixed(2);

  heart.className = "rising-heart";
  heart.textContent = Math.random() < 0.22 ? "♡" : "❤";
  heart.style.setProperty("--x-start", `${startX}px`);
  heart.style.setProperty("--x-end", `${startX + drift}px`);
  heart.style.setProperty("--duration", `${duration}ms`);
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--scale", scale);
  heart.style.zIndex = Math.random() < 0.35 ? "1" : "3";

  heartStream.appendChild(heart);
  heart.addEventListener("animationend", () => {
    heart.remove();
  });
};

const startEffects = () => {
  if (!rainTimerId) {
    Array.from({ length: 12 }).forEach((_, index) => {
      window.setTimeout(spawnRainPhrase, index * 240);
    });

    rainTimerId = window.setInterval(spawnRainPhrase, 720);
  }

  if (!heartTimerId) {
    Array.from({ length: 8 }).forEach((_, index) => {
      window.setTimeout(spawnHeart, index * 320);
    });

    heartTimerId = window.setInterval(spawnHeart, 880);
  }
};

const stopEffects = () => {
  if (rainTimerId) {
    window.clearInterval(rainTimerId);
    rainTimerId = null;
  }

  if (heartTimerId) {
    window.clearInterval(heartTimerId);
    heartTimerId = null;
  }
};

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopEffects();
    return;
  }

  startEffects();
});

startEffects();
