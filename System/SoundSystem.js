export const SoundSystem = {
    ctx: null,
    masterGain: null,
    droneOsc: null,
    heartbeatOsc: null,
    isMuted: false,

    init: function () {
      try {
        const AudioContext =
          window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.6;
        this.masterGain.connect(this.ctx.destination);
        this.startAmbience();
      } catch (e) {
        console.warn("Web Audio API not supported");
      }
    },

    startAmbience: function () {
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const droneGain = this.ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.value = 55;
      osc2.type = "sine";
      osc2.frequency.value = 58;

      filter.type = "lowpass";
      filter.frequency.value = 180;

      droneGain.gain.value = 0.15;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc1.start();
      osc2.start();
    },

    play: function (type) {
      if (!this.ctx || this.isMuted) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterGain);

      const now = this.ctx.currentTime;

      switch (type) {
        case "type":
          osc.type = "square";
          osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
          filter.type = "highpass";
          filter.frequency.value = 2000;
          gainNode.gain.setValueAtTime(0.05, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case "hover":
          osc.type = "sine";
          osc.frequency.setValueAtTime(400, now);
          gainNode.gain.setValueAtTime(0.05, now);
          gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
        case "click":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
          gainNode.gain.setValueAtTime(0.2, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
        case "damage":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(100, now);
          osc.frequency.exponentialRampToValueAtTime(20, now + 0.3);
          filter.type = "lowpass";
          filter.frequency.value = 300;
          gainNode.gain.setValueAtTime(0.5, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        case "glitch":
          const bufferSize = this.ctx.sampleRate * 0.5;
          const buffer = this.ctx.createBuffer(
            1,
            bufferSize,
            this.ctx.sampleRate
          );
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++)
            data[i] = Math.random() * 2 - 1;
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;
          noise.connect(gainNode);
          gainNode.gain.setValueAtTime(0.2, now);
          gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
          noise.start(now);
          break;
        case "success":
          osc.type = "sine";
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.linearRampToValueAtTime(1200, now + 0.1);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
        case "heartbeat":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(60, now);
          gainNode.gain.setValueAtTime(0.5, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
      }
    },
  };