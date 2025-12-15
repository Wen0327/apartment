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
