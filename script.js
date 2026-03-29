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
let lastViewportMode = "";

const isMobileViewport = () => window.matchMedia("(max-width: 640px)").matches;

const getEffectConfig = () => {
  if (isMobileViewport()) {
    return {
      heartChance: 0.12,
      initialHearts: 4,
      initialPhrases: 6,
      phraseDrift: 78,
      phraseInterval: 1250,
      phraseMax: 11,
      phraseMin: 14,
      sizeMax: 28,
      sizeMin: 16,
      heartInterval: 1450,
    };
  }

  return {
    heartChance: 0.16,
    initialHearts: 8,
    initialPhrases: 12,
    phraseDrift: 140,
    phraseInterval: 720,
    phraseMax: 18,
    phraseMin: 22,
    sizeMax: 42,
    sizeMin: 22,
    heartInterval: 880,
  };
};

const spawnRainPhrase = () => {
  if (!loveRainStage) {
    return;
  }

  const config = getEffectConfig();
  const phrase = document.createElement("span");
  const useHeart = Math.random() < config.heartChance;
  const contentPool = useHeart ? heartPhrases : rainPhrases;
  const stageWidth = loveRainStage.clientWidth;
  const startX = Math.random() * Math.max(stageWidth - 180, 120);
  const drift = (Math.random() - 0.5) * config.phraseDrift;
  const duration = isMobileViewport()
    ? 13500 + Math.random() * 7500
    : 11000 + Math.random() * 7000;
  const size = useHeart
    ? config.sizeMin + Math.random() * 12
    : config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin);
  const sizeMobile = Math.max(size - 4, 18);
  const blur = Math.random() < (isMobileViewport() ? 0.18 : 0.34)
    ? (Math.random() * (isMobileViewport() ? 1.1 : 1.9)).toFixed(2)
    : "0";
  const alpha = isMobileViewport()
    ? (0.44 + Math.random() * 0.18).toFixed(2)
    : (0.64 + Math.random() * 0.22).toFixed(2);
  const rotation = `${(-6 + Math.random() * 12).toFixed(2)}deg`;

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
  phrase.style.zIndex = Math.random() < 0.2 ? "3" : "5";

  loveRainStage.appendChild(phrase);
  phrase.addEventListener("animationend", () => {
    phrase.remove();
  });
};

const spawnHeart = () => {
  if (!heartStream) {
    return;
  }

  const config = getEffectConfig();
  const heart = document.createElement("span");
  const streamWidth = heartStream.clientWidth;
  const startX = Math.random() * Math.max(streamWidth - 60, 40);
  const drift = (Math.random() - 0.5) * (isMobileViewport() ? 72 : 120);
  const duration = isMobileViewport() ? 9000 + Math.random() * 4500 : 7000 + Math.random() * 4500;
  const size = isMobileViewport() ? 14 + Math.random() * 14 : 16 + Math.random() * 22;
  const scale = (0.85 + Math.random() * 0.45).toFixed(2);

  heart.className = "rising-heart";
  heart.textContent = Math.random() < 0.22 ? "♡" : "❤";
  heart.style.setProperty("--x-start", `${startX}px`);
  heart.style.setProperty("--x-end", `${startX + drift}px`);
  heart.style.setProperty("--duration", `${duration}ms`);
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--scale", scale);
  heart.style.zIndex = "1";

  heartStream.appendChild(heart);
  heart.addEventListener("animationend", () => {
    heart.remove();
  });
};

const startEffects = () => {
  const config = getEffectConfig();

  if (!rainTimerId) {
    Array.from({ length: config.initialPhrases }).forEach((_, index) => {
      window.setTimeout(spawnRainPhrase, index * (isMobileViewport() ? 360 : 240));
    });

    rainTimerId = window.setInterval(spawnRainPhrase, config.phraseInterval);
  }

  if (!heartTimerId) {
    Array.from({ length: config.initialHearts }).forEach((_, index) => {
      window.setTimeout(spawnHeart, index * (isMobileViewport() ? 420 : 320));
    });

    heartTimerId = window.setInterval(spawnHeart, config.heartInterval);
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

window.addEventListener("resize", () => {
  const viewportMode = isMobileViewport() ? "mobile" : "desktop";
  if (viewportMode === lastViewportMode) {
    return;
  }

  lastViewportMode = viewportMode;
  stopEffects();
  document.querySelectorAll(".rain-phrase, .rising-heart").forEach((element) => {
    element.remove();
  });
  startEffects();
});

lastViewportMode = isMobileViewport() ? "mobile" : "desktop";
startEffects();
