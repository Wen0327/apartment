import { GameState } from "../Config/GameState.js";
import { SoundSystem } from "../System/SoundSystem.js";

export function log(text, type = "event", callback = null) {
  const logDiv = document.getElementById("game-log");
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  logDiv.appendChild(entry);

  const isAtBottom =
    logDiv.scrollHeight - logDiv.scrollTop <= logDiv.clientHeight + 100;
  if (isAtBottom)
    setTimeout(() => {
      logDiv.scrollTop = logDiv.scrollHeight;
    }, 50);

  typeWriter(text, entry, () => {
    if (isAtBottom) logDiv.scrollTop = logDiv.scrollHeight;
    if (callback) callback();
  });
}

export function changeStat(type, amount) {
  GameState[type] += amount;
  if (GameState[type] > 100) GameState[type] = 100;
  if (GameState[type] < 0) GameState[type] = 0;

  if (amount < 0) {
    const body = document.body;
    if (type === "stamina") {
      body.classList.add("effect-damage");
      SoundSystem.play("damage");
      setTimeout(() => body.classList.remove("effect-damage"), 400);
    }
    if (type === "sanity") {
      body.classList.add("effect-sanity");
      SoundSystem.play("glitch");
      setTimeout(() => body.classList.remove("effect-sanity"), 500);
    }
  } else if (amount > 0 && type !== "corruption") {
    SoundSystem.play("success");
  }
  updateUI();
}

export function typeWriter(text, element, callback, speed = 20) {
  GameState.isTyping = true;
  let i = 0;
  element.innerHTML = "";
  element.classList.add("cursor");

  let parts = text.match(/<[^>]+>|[^<]/g) || [];
  let charCount = 0;

  function type() {
    if (i < parts.length) {
      element.innerHTML += parts[i];
      i++;
      if (!parts[i - 1].startsWith("<")) {
        charCount++;
        if (charCount % 2 === 0) SoundSystem.play("type");
      }
      if (parts[i - 1].startsWith("<")) {
        type();
      } else {
        setTimeout(type, speed);
      }
    } else {
      GameState.isTyping = false;
      element.classList.remove("cursor");
      if (callback) callback();
    }
  }
  type();
}

export function updateUI() {
    document.getElementById("disp-day").innerText = GameState.day;
    document.getElementById("disp-time").innerText =
      GameState.phase === "DAY"
        ? "白天"
        : GameState.timePoints[GameState.timeIndex];

    const getTxt = (type, val) => {
      for (let i of StatusTexts[type]) if (val >= i.t) return i.v;
      return StatusTexts[type][StatusTexts[type].length - 1].v;
    };

    // --- Meta Horror: 虛假數值 (新增功能) ---
    // 當理智極低時，顯示虛假的「正常」狀態，讓玩家誤判
    let showFakeUI = GameState.sanity < 20 && Math.random() < 0.5;

    const sanityEl = document.getElementById("disp-sanity");
    const staminaEl = document.getElementById("disp-stamina");
    const corrEl = document.getElementById("disp-corruption");

    if (showFakeUI) {
      // 欺騙玩家一切正常
      sanityEl.innerText = "極佳";
      sanityEl.classList.add("fake-stat");

      staminaEl.innerText = "無限";
      staminaEl.classList.add("fake-stat");

      corrEl.innerText = "無";
    } else {
      // 正常顯示
      sanityEl.innerText = getTxt("sanity", GameState.sanity);
      staminaEl.innerText = getTxt("stamina", GameState.stamina);
      corrEl.innerText = getTxt("corruption", GameState.corruption);

      // 移除特效
      sanityEl.classList.remove("fake-stat");
      staminaEl.classList.remove("fake-stat");
    }

    updateVisualFilters();
    if (GameState.isGameOver) return;
    checkDeath();
  }
