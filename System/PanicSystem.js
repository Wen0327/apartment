import { GameState } from "../Config/GameState.js";
import { SoundSystem } from "./SoundSystem.js";

export const PanicSystem = {
    timerId: null,
    timeLeft: 0,
    maxTime: 0,
    bar: document.getElementById("panic-bar"),
    container: document.getElementById("panic-container"),

    start: function (baseSeconds, onTimeout) {
      if (this.timerId) clearInterval(this.timerId);

      let sanityMod = (100 - GameState.sanity) / 20;
      this.maxTime = Math.max(4, baseSeconds - sanityMod);
      this.timeLeft = this.maxTime;

      this.container.style.display = "block";
      this.bar.style.width = "100%";
      this.bar.style.background = "#4caf50";

      const tickRate = 50; // ms
      const step = 100 / (this.maxTime * (1000 / tickRate));
      let width = 100;

      let lastBeat = this.maxTime;

      this.timerId = setInterval(() => {
        this.timeLeft -= tickRate / 1000;
        width -= step;
        this.bar.style.width = width + "%";

        if (width < 60 && width > 30) {
          this.bar.style.background = "#ff9800";
        } else if (width <= 30) {
          this.bar.style.background = "#f44336";
          if (Math.ceil(this.timeLeft) < lastBeat) {
            SoundSystem.play("heartbeat");
            lastBeat = Math.ceil(this.timeLeft);
          }
        }

        if (this.timeLeft <= 0) {
          this.stop();
          onTimeout();
        }
      }, tickRate);
    },

    stop: function () {
      if (this.timerId) clearInterval(this.timerId);
      this.container.style.display = "none";
    },
  };