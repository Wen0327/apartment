import { changeStat, log } from "../Utils/GameUtils.js";

export const CorruptionEventLibrary = {
  corr_skin_peel: {
    text: "你的手臂奇癢無比。你忍不住抓撓，一大塊皮膚像濕紙一樣被撕了下來，露出了底下**黑色、堅硬的鱗片**。<br>奇怪的是，你一點都不覺得痛，反而覺得...很美。",
    choices: [
      {
        text: "撕下更多皮膚",
        action: () => {
          log(
            "你著魔似地撕扯著多餘的『人皮』，露出了更多美麗的新生肌膚。你感覺充滿力量。",
            "danger"
          );
          changeStat("corruption", 15);
          changeStat("sanity", -10);
          changeStat("stamina", 10); // 變異帶來體力
        },
      },
      {
        text: "用繃帶纏住",
        action: () => {
          log(
            "你顫抖著把傷口包起來，假裝沒看見那些鱗片。但你感覺它們正在你的肉裡呼吸。",
            "event"
          );
          changeStat("sanity", -20);
        },
      },
      {
        text: "用刀刮掉鱗片",
        action: () => {
          log("你試圖割掉鱗片，劇痛讓你差點昏過去，鮮血噴滿了地板。", "danger");
          changeStat("stamina", -30);
          changeStat("sanity", -10);
        },
      },
    ],
  },
  corr_delicious_stain: {
    text: "你感到極度的飢餓。你看向牆角一灘不知何時留下的**暗紅色血漬**，聞起來竟比世界上任何美食都要香甜。<br>口水不受控制地流了下來。",
    choices: [
      {
        text: "舔一口",
        action: () => {
          log(
            "甜美！充滿鐵鏽味的甘露順著喉嚨滑下，你的胃發出了滿足的蠕動聲。",
            "danger"
          );
          changeStat("corruption", 20);
          changeStat("stamina", 15);
        },
      },
      {
        text: "吃壓縮餅乾",
        action: () => {
          log(
            "你強迫自己吃下人類的食物，但它們在你嘴裡就像乾燥的灰燼，令人作嘔。",
            "event"
          );
          changeStat("stamina", -5); // 吃不下去
          changeStat("sanity", -10);
        },
      },
      {
        text: "催吐",
        action: () => {
          log("你試圖把那種渴望感吐出來，但只吐出了一些黑色的酸水。", "danger");
          changeStat("stamina", -15);
        },
      },
    ],
  },
  corr_friendly_shadow: {
    text: "走廊盡頭站著那個黑影怪物。但這一次，你看得清清楚楚——那不是怪物，那是**你的家人**。<br>它張開扭曲的手臂，溫柔地呼喚你的名字。",
    choices: [
      {
        text: "走過去擁抱",
        action: () => {
          log(
            "你投入它的懷抱，感覺冰冷黏膩。它在你耳邊低語：『再一點點，你就完全屬於我們了。』",
            "danger"
          );
          changeStat("corruption", 25);
          changeStat("sanity", -15);
        },
      },
      {
        text: "大聲斥責",
        action: () => {
          log(
            "你怒吼著驅趕它。它露出了受傷的表情（儘管它沒有臉），緩緩退回黑暗。",
            "event"
          );
          changeStat("sanity", -20);
        },
      },
      {
        text: "開槍/攻擊",
        action: () => {
          log(
            "你瘋狂攻擊，但打中的只有空氣。你意識到自己正在攻擊牆壁。",
            "danger"
          );
          changeStat("stamina", -15);
          changeStat("sanity", -10);
        },
      },
    ],
  },
  corr_rule_change: {
    text: "你再次閱讀保安守則。上面的文字正在像蟲子一樣蠕動重組：<br>『**規則0：公寓是安全的。住戶是家人。不要抵抗變化。接受它。**』<br>這看起來才是唯一的真理。",
    choices: [
      {
        text: "大聲朗讀",
        action: () => {
          log(
            "你的聲音變得嘶啞低沉，不像是人類的發聲構造能發出的聲音。規則銘刻進了你的腦海。",
            "danger"
          );
          changeStat("corruption", 20);
          changeStat("sanity", 10); // 接受瘋狂反而回復理智
        },
      },
      {
        text: "燒毀守則",
        action: () => {
          log(
            "你點燃了紙張，但火焰是綠色的。紙燒光了，那行字卻烙印在你的視網膜上。",
            "danger"
          );
          changeStat("sanity", -25);
        },
      },
      {
        text: "閉眼不看",
        action: () => {
          log("你在心中默念舊的規則，試圖對抗腦中的聲音。", "event");
          changeStat("sanity", -10);
        },
      },
    ],
  },
  corr_mirror_beauty: {
    text: "你照鏡子。鏡中的人臉色慘白，眼球全黑，嘴角裂開到耳根，皮膚正在潰爛。<br>**天啊，這真是太完美了。** 這才是進化的終極形態。",
    choices: [
      {
        text: "欣賞自己",
        action: () => {
          log(
            "你對著鏡子練習微笑，裂口處滲出了黑血。你看得如癡如醉。",
            "danger"
          );
          changeStat("corruption", 15);
          changeStat("sanity", 5); // 審美改變
        },
      },
      {
        text: "砸碎鏡子",
        action: () => {
          log(
            "『不准你毀了這麼美的藝術品！』你內心有個聲音在尖叫，你的手不聽使喚地停下了。",
            "danger"
          );
          changeStat("sanity", -20);
          changeStat("corruption", 5);
        },
      },
      {
        text: "化妝/整理",
        action: () => {
          log(
            "你試圖把撕裂的嘴角變得更大一點，以便符合這完美的造型。",
            "danger"
          );
          changeStat("stamina", -20);
          changeStat("corruption", 10);
        },
      },
    ],
  },
};
