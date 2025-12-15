import { GameState } from "../Config/GameState.js";
import { SoundSystem } from "../System/SoundSystem.js";

export const CCTVSystem = {
  isOpen: false,
  currentCam: null,
  // 這裡儲存哪個鏡頭有異常: { 'LOBBY': true, '4F': false }
  anomalies: {},
  cameras: [
    {
      id: "LOBBY",
      name: "1F 大廳",
      desc: "空蕩蕩的大廳。自動販賣機的燈光在閃爍。",
    },
    {
      id: "4F",
      name: "4F 走廊",
      desc: "404號房的門前堆滿了奇怪的黑色袋子。",
    },
    { id: "13F", name: "13F 電梯口", desc: "電梯顯示屏顯示著亂碼。" },
    {
      id: "B1",
      name: "B1 地下室",
      desc: "畫面一片漆黑，只能聽見沉重的呼吸聲。",
    },
    { id: "STAIRS", name: "樓梯間", desc: "感應燈忽明忽滅。" },
  ],

  init: function () {
    const btnGroup = document.getElementById("cctv-controls");
    btnGroup.innerHTML = "";
    this.cameras.forEach((cam) => {
      const btn = document.createElement("button");
      btn.className = "cam-btn";
      btn.innerText = cam.name;
      btn.id = `btn-cam-${cam.id}`;
      // 點擊切換鏡頭
      btn.onclick = () => this.switchCam(cam);
      btnGroup.appendChild(btn);
    });

    // 更新按鈕：必須針對「當前畫面」進行決策
    const purgeBtn = document.createElement("button");
    purgeBtn.className = "cam-btn";
    purgeBtn.style.borderColor = "#0f0";
    purgeBtn.innerText = "[ 鎖定空間並更新 ]";
    purgeBtn.onclick = () => this.purgeAnomaly();
    btnGroup.appendChild(purgeBtn);
  },

  // 每個時間段結束時調用：產生新的威脅
  generatePassiveThreats: function () {
    // --- 修改處：大幅降低頻率 ---
    // 基礎 9% + 每天增加 3%
    // Day 1: 12% 機率 (很偶爾才會出現，保持神祕感)
    // Day 7: 30% 機率 (剛好符合您要求的強度)
    const threatChance = 0.09 + GameState.day * 0.03;

    // 隨機選一個鏡頭產生異常
    const targetCam =
      this.cameras[Math.floor(Math.random() * this.cameras.length)];

    if (Math.random() < threatChance) {
      if (!this.anomalies[targetCam.id]) {
        this.anomalies[targetCam.id] = true;
        // console.log(`Debug: Anomaly spawned at ${targetCam.id}`);
      }
    }
  },

  // 檢查是否有「未處理」的威脅導致懲罰
  checkUnpurgedThreats: function () {
    let count = 0;
    for (let camId in this.anomalies) {
      if (this.anomalies[camId]) count++;
    }

    // 如果有累積超過 1 個未更新的異常，就會出事
    if (count > 0) {
      const damage = count * 10;
      log(
        `<br><span style="color:red">[警告] 你感覺到空氣變得沉重...有 ${count} 個區域的錯誤正在實體化！</span>`,
        "danger"
      );
      changeStat("sanity", -damage);
      changeStat("corruption", count * 5);
      SoundSystem.play("damage");
    }
  },

  open: function () {
    if (GameState.phase === "DAY") {
      log("白天不需要監控系統。", "system");
      return;
    }
    if (GameState.isTyping || GameState.isGameOver) return;

    openModal("cctv-modal");
    this.isOpen = true;
    this.init();
    // 預設開啟第一個鏡頭
    this.switchCam(this.cameras[0]);
    SoundSystem.play("click");
  },

  switchCam: function (cam) {
    this.currentCam = cam;

    // UI 更新
    document
      .querySelectorAll(".cam-btn")
      .forEach((b) => b.classList.remove("active"));
    document.getElementById(`btn-cam-${cam.id}`).classList.add("active");

    const screen = document.getElementById("cctv-content");
    screen.innerHTML = "信號連接中...";
    SoundSystem.play("type");

    setTimeout(() => {
      // 只有切換到該鏡頭，玩家才能「看見」是否有異常
      const hasAnomaly = this.anomalies[cam.id];

      if (hasAnomaly) {
        // 這裡不自動標記紅色，要讓玩家自己看畫面判斷（或看文字描述）
        const horrors = [
          "畫面中央有一團黑霧正在凝聚成形。",
          "牆上滲出了黑色的液體，並拼寫出你的名字。",
          "所有的家具都違反重力浮在半空中。",
          "鏡頭前有一張蒼白的臉貼得非常近。",
          "你看見一個和你長得一模一樣的人站在角落。",
        ];
        // 隨機選一句恐怖描述
        const desc = horrors[Math.floor(Math.random() * horrors.length)];
        screen.innerHTML = `<span style="color:#ff3333; font-weight:bold;">[ 偵測到錯誤訊號 ]</span><br><br>${desc}`;
        SoundSystem.play("glitch");
      } else {
        screen.innerHTML = cam.desc;
      }
    }, 400);
  },

  purgeAnomaly: function () {
    const screen = document.getElementById("cctv-content");

    // 1. 如果玩家在沒有異常的地方亂按更新 -> 懲罰（浪費電力/體力）
    if (!this.currentCam || !this.anomalies[this.currentCam.id]) {
      screen.innerHTML =
        "<span style='color:yellow'>[ 錯誤 ] 該區域數值正常。</span><br>濫用系統導致電路過熱。";
      changeStat("stamina", -5); // 扣體力作為懲罰
      SoundSystem.play("click");
      return;
    }

    // 2. 正確更新
    screen.innerHTML = "啟動高頻光譜更新...";
    SoundSystem.play("drone");

    setTimeout(() => {
      // 移除該區域的異常
      this.anomalies[this.currentCam.id] = false;

      screen.innerHTML = `<span style='color:#0f0'>區域 [${this.currentCam.name}] 更新完成。</span><br>錯誤已消散。`;
      SoundSystem.play("success");

      // 給予獎勵
      changeStat("sanity", 5); // 恢復一點理智，因為解除了威脅
    }, 1200);
  },
};
