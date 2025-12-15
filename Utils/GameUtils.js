import { GameState } from "../Config/GameState.js";
import { SoundSystem } from "../System/SoundSystem.js";
import { StatusTexts } from "../Config/StatusTexts.js";
import { PanicSystem } from "../System/PanicSystem.js";

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

export function updateVisualFilters() {
  if (GameState.isGameOver) {
    document.body.style.filter = "none";
    document.body.classList.remove("glitch-text");
    document.body.removeAttribute("data-text");
    return;
  }

  let blurAmount = 0;
  let saturateAmount = 100;
  let hueRotate = 0;

  if (GameState.sanity < 60) {
    blurAmount = (60 - GameState.sanity) / 60;
    saturateAmount = 100 - (60 - GameState.sanity) * 2;
  }
  if (GameState.sanity < 30) {
    hueRotate = (30 - GameState.sanity) * 3;
    document.body.classList.add("glitch-text");
    document.body.setAttribute("data-text", "快逃快逃快逃");
  } else {
    document.body.classList.remove("glitch-text");
    document.body.removeAttribute("data-text");
  }

  document.body.style.filter = `blur(${blurAmount}px) saturate(${saturateAmount}%) hue-rotate(${hueRotate}deg) contrast(${
    100 + (100 - GameState.sanity) / 2
  }%)`;
}

export function checkDeath() {
  if (GameState.isGameOver) return;

  if (GameState.sanity <= 0) {
    gameOver(
      "你的理智徹底斷裂。在你看來，牆壁上的黴菌變成了美麗的花朵，你笑著搭電梯前往B1。",
      "精神崩潰"
    );
  } else if (GameState.corruption >= 100) {
    gameOver(
      "你的皮膚開始剝落，露出了下面的黑色鱗片。你成為了『公寓』的一部分。",
      "完全異變"
    );
  } else if (GameState.stamina <= 0) {
    gameOver(
      "你的心臟停止了跳動。過度驚嚇與受傷讓你倒在了黎明前。",
      "力竭而亡"
    );
  }
}

export function gameOver(reason, title) {
    GameState.isGameOver = true;
    PanicSystem.stop();
    SoundSystem.play("glitch");

    // 強制移除模糊效果
    updateVisualFilters();

    const area = document.getElementById("choices-area");
    area.classList.remove("show");

    if (
      GameState.clues.includes("item_charm") &&
      GameState.phase === "NIGHT"
    ) {
      log(
        "死亡降臨瞬間，口袋裡的平安符化為灰燼。你撿回了一條命。",
        "success",
        () => {
          SoundSystem.play("success");
          const index = GameState.clues.indexOf("item_charm");
          GameState.clues.splice(index, 1);
          GameState.sanity = 40;
          GameState.stamina = 40;
          GameState.isGameOver = false;
          updateUI();
          area.innerHTML =
            "<div style='padding:10px; text-align:center; color:gold'>★ 平安符生效 ★</div>";
          area.classList.add("show");
          setTimeout(() => {
            GameState.timeIndex++;
            nextTimeBlock();
          }, 2000);
        }
      );
      return;
    }

    setTimeout(() => {
      area.innerHTML = `
            <div class="game-over-screen">
                <div class="game-over-title">${title}</div>
                <p>${reason}</p>
                <button onclick="location.reload()"class="reincarnation-btn" style="margin-top:20px; border-color: red;">重新輪迴</button>
            </div>
        `;
      area.classList.add("show");
    }, 1000);
  }
