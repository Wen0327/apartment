import { GameState } from "../Config/GameState.js";
import { changeStat, log } from "../Utils/GameUtils.js";

export const EventLibrary = {
    trick_fire_check: {
      text: "門外傳來急促拍門聲，兩個消防員神色慌張：『大樓偵測到瓦斯外洩！火勢正在蔓延！快開門讓我們進去！』",
      choices: [
        {
          text: "配合緊急狀況開門",
          action: () => {
            log("高溫氣浪將你轟飛。你手臂嚴重燒傷。", "danger");
            changeStat("stamina", -40);
            changeStat("sanity", -20);
          },
        },
        {
          text: "大喊：『禁止開門！』",
          action: () => {
            log(
              "消防員表情瞬間僵硬：『真可惜...』隨後化作灰燼消失。",
              "success"
            );
            changeStat("sanity", -5);
          },
        },
        {
          text: "轉身檢查監控",
          action: () => {
            log(
              "監控顯示門口根本沒人。玻璃上卻留下一對焦黑的手印。",
              "danger"
            );
            changeStat("sanity", -15);
            changeStat("stamina", -5);
          },
        },
      ],
    },
    trick_blind_dog: {
      text: "盲人老先生敲窗：『年輕人，我的導盲犬好像不舒服，能借點水嗎？』",
      choices: [
        {
          text: "給水",
          action: () => {
            log("那東西抓住你的手，尖銳指甲刺入皮肉。", "danger");
            changeStat("stamina", -30);
            changeStat("corruption", 25);
          },
        },
        {
          text: "嚴厲驅趕",
          action: () => {
            log(
              "老先生露出詭異笑容：『被發現了嗎...』走進牆壁消失了。",
              "success"
            );
            changeStat("sanity", -5);
          },
        },
        {
          text: "保持沉默不動",
          action: () => {
            log("狗突然發出像人類哭聲的哀嚎。", "danger");
            changeStat("sanity", -10);
          },
        },
      ],
    },
    trick_elevator_voice: {
      text: "電梯下行至 B1。你閉眼默數。廣播傳來清晰女聲：『B1 到了，開門。』伴隨逼真開門聲。",
      choices: [
        {
          text: "睜開眼睛離開",
          action: () => {
            log("門沒開，但有東西穿透門板衝擊了你的大腦。", "danger");
            changeStat("sanity", -45);
          },
        },
        {
          text: "繼續閉眼默數",
          action: () => {
            log("你堅持數完10秒。再次確認後，震動才真正停止。", "success");
            changeStat("sanity", -10);
          },
        },
      ],
    },
    trick_grandma_404: {
      text: "一位老奶奶跌倒在 **404號房** 門口，門微微打開。她伸手向你求助。",
      choices: [
        {
          text: "過去扶她",
          action: () => {
            log("404門猛地打開，無數隻手試圖將你拖進去。", "danger");
            changeStat("stamina", -35);
            changeStat("sanity", -15);
          },
        },
        {
          text: "低頭快速通過",
          action: () => {
            log("身後傳來變調的尖叫：『為什麼不過來！』", "success");
            changeStat("sanity", -15);
            changeStat("corruption", 5);
          },
        },
      ],
    },
    trick_manager_reflection: {
      text: "經理本人帶著 **藍色識別證**。但鏡子裡的他帶著 **紅色識別證**。",
      choices: [
        {
          text: "相信本人",
          action: () => {
            log(
              "鏡像衝出來掐住你。你用手電筒砸碎鏡面，碎片劃破臉。",
              "danger"
            );
            changeStat("stamina", -30);
            changeStat("sanity", -20);
          },
        },
        {
          text: "相信鏡像",
          action: () => {
            log(
              "你假裝沒看見。經理看向鏡子，發出嘖的一聲離開了。",
              "success"
            );
            changeStat("sanity", -10);
          },
        },
        {
          text: "打破鏡子",
          action: () => {
            log(
              "你砸碎鏡子。經理消失了，只留下一地碎玻璃和紅色識別證。",
              "danger"
            );
            changeStat("stamina", -15);
            changeStat("sanity", -5);
          },
        },
      ],
    },
    trick_trash_rules: {
      text: "垃圾桶旁公告：『印刷錯誤，規則7更正為——紅色飲料安全，藍色有毒。』",
      choices: [
        {
          text: "相信公告",
          action: () => {
            log("喝下紅色飲料後，你嘔吐出大量黑水。", "danger");
            changeStat("stamina", -40);
            changeStat("corruption", 20);
          },
        },
        {
          text: "無視公告",
          action: () => {
            log("規則書是絕對的，不能輕信路邊垃圾。", "success");
            changeStat("sanity", 5);
          },
        },
        {
          text: "帶回保安室研究",
          action: () => {
            log("紙上的字變成：『你真好騙。』然後自燃。", "event");
            changeStat("sanity", -5);
          },
        },
      ],
    },
    courier_404: {
      text: "快遞員在門口喊：『404是吧？怎麼沒人接？保安，幫忙聯絡一下。』",
      choices: [
        {
          text: "告訴他404沒人",
          action: () => {
            log("快遞員臉融化了：『沒人？那電話是誰接的？』", "event");
            changeStat("sanity", -10);
            changeStat("corruption", 10);
          },
        },
        {
          text: "拒絕代收",
          action: () => {
            log("你指了指規則牌。他轉身走進黑暗。", "success");
            changeStat("sanity", 5);
          },
        },
        {
          text: "不理會",
          action: () => {
            log("他在門口站了整整一小時。", "danger");
            changeStat("sanity", -15);
          },
        },
      ],
    },
    laundry_red: {
      text: "洗衣房地上扔著一件鮮紅色的連衣裙，上面似乎還殘留著體溫。",
      choices: [
        {
          text: "用手電筒確認",
          reqClue: "item_flashlight",
          action: () => {
            log("強光照射下，那只是普通裙子。你鬆了一口氣。", "success");
            changeStat("sanity", -5);
          },
        },
        {
          text: "燒掉它",
          action: () => {
            log(
              "你燒了衣服，火焰呈現詭異的綠色。隔天聽說有女住戶詛咒偷衣服的人。",
              "danger"
            );
            changeStat("corruption", 15);
          },
        },
        {
          text: "無視離開",
          action: () => {
            log(
              "你轉身離開，背後傳來窸窸窣窣的穿衣聲，但你不敢回頭。",
              "event"
            );
            changeStat("sanity", -10);
          },
        },
      ],
    },
    elevator_maintain: {
      text: "電梯顯示『維修中』，紅色的指示燈瘋狂閃爍，裡面傳來有節奏的敲擊聲。",
      choices: [
        {
          text: "按開門鍵",
          action: () => {
            log(
              "門打開了，電梯內壁長滿了眼睛，所有的眼球同時轉向你看著你。",
              "danger"
            );
            changeStat("sanity", -40);
          },
        },
        {
          text: "閉眼默數離開",
          action: () => {
            log(
              "敲擊聲變成了尖銳的抓撓聲。你轉身跑回樓梯間，直到聲音消失。",
              "success"
            );
            changeStat("sanity", -10);
            changeStat("stamina", -5);
          },
        },
        {
          text: "敲門回應",
          action: () => {
            log("聲音停止了。門縫傳來一聲低語：『我聽見你了。』", "danger");
            changeStat("corruption", 20);
            changeStat("sanity", -20);
          },
        },
      ],
    },
    manager_id: {
      text: "你在地上撿到經理識別證。照片上的他帶著鮮紅色識別證，嘴角咧到了耳根。",
      choices: [
        {
          text: "交給經理",
          action: () => {
            log(
              "他接過證件笑了：『這是我遺失的臉。』隨後他的五官開始位移。",
              "danger"
            );
            changeStat("sanity", -30);
          },
        },
        {
          text: "丟進垃圾桶",
          action: () => {
            log(
              "沒過多久，識別證又出現在你口袋裡，而且變得濕黏。",
              "danger"
            );
            changeStat("sanity", -15);
            changeStat("corruption", 10);
          },
        },
        {
          text: "撕毀證件",
          action: () => {
            log("遠處傳來一聲慘叫。經理今晚似乎不會再出現了。", "success");
            changeStat("sanity", 10);
          },
        },
      ],
    },
    vending_leaking: {
      text: "販賣機的一罐藍色飲料正在滲出紅色黏液，散發著鐵鏽味。",
      choices: [
        {
          text: "冒險喝下",
          action: () => {
            if (Math.random() > 0.5) {
              log(
                "居然是蔓越莓汁？看來運氣不錯，你稍微恢復了體力。",
                "success"
              );
              changeStat("sanity", 10);
              changeStat("stamina", 5);
            } else {
              log(
                "入口全是血腥味。你看向罐子，上面寫著『藍血』，你感到一陣噁心。",
                "danger"
              );
              changeStat("corruption", 25);
              changeStat("sanity", -15);
            }
          },
        },
        {
          text: "不喝",
          action: () => {
            log("那股甜腥味揮之不去，你快步離開了。", "event");
          },
        },
      ],
    },
    manager_choice: {
      text: "經理站在走廊盡頭，他的脖子上空空如也，手裡拿著紅藍兩條識別證問：『今晚我該戴哪條？』",
      choices: [
        {
          text: "選藍色",
          action: () => {
            log(
              "『好品味。』他將藍識別證掛在空氣中，滿意地離開了。",
              "success"
            );
            changeStat("sanity", 5);
          },
        },
        {
          text: "選紅色",
          action: () => {
            log("他衝過來，把紅識別證死死勒在你脖子上。", "danger");
            changeStat("stamina", -40);
          },
        },
        {
          text: "沉默不語",
          action: () => {
            log("他失望地搖搖頭，消失在黑暗中。", "event");
            changeStat("sanity", -5);
          },
        },
      ],
    },
    cleaner_green: {
      text: "你經過洗手間，鏡子映出一個穿綠色制服的人影，正背對著你拖地。",
      choices: [
        {
          text: "打破鏡子",
          action: () => {
            log(
              "你砸碎了鏡子。那個清潔工錯愕地看著你。你好像只是浪費了體力。",
              "event"
            );
            changeStat("stamina", -15);
            changeStat("sanity", -5);
          },
        },
        {
          text: "打招呼",
          action: () => {
            log(
              "他轉過頭，只是一個普通的大叔。看來是你太緊張了。",
              "success"
            );
            changeStat("sanity", 5);
          },
        },
        {
          text: "逃跑",
          action: () => {
            log("你一口氣跑到下一層，其實什麼事都沒發生。", "event");
            changeStat("stamina", -5);
          },
        },
      ],
    },
    room_403_party: {
      text: "403號房大門敞開，裡面傳來熱鬧的音樂聲和人群的歡笑聲。",
      choices: [
        {
          text: "加入派對",
          action: () => {
            log(
              "你走進房間，音樂戛然而止。房間裡全是斷肢的人體模型。",
              "danger"
            );
            changeStat("sanity", -15);
          },
        },
        {
          text: "關上門",
          action: () => {
            log("你用力關上門。音樂瞬間消失，走廊重歸死寂。", "success");
            changeStat("sanity", 5);
          },
        },
        {
          text: "低頭通過",
          action: () => {
            log(
              "你感覺背上有無數道視線在盯著你，直到你轉過轉角。",
              "event"
            );
          },
        },
      ],
    },
    vending_purple: {
      text: "販賣機裡突然出現一罐發著微弱螢光的紫色飲料，你從未見過這個牌子。",
      choices: [
        {
          text: "喝下去",
          action: () => {
            log(
              "味道像藍莓混合著鐵鏽。你的頭腦變得異常清晰，但胃裡似乎有東西在蠕動。",
              "success"
            );
            changeStat("sanity", 10);
            changeStat("corruption", 15);
          },
        },
        {
          text: "不喝",
          action: () => {
            log("你總覺得自己錯過了什麼重要的東西。", "event");
          },
        },
      ],
    },
    manager_scarf: {
      text: "經理今天圍著一條厚重的圍巾，完全遮住了脖子部位。",
      choices: [
        {
          text: "禮貌問好",
          action: () => {
            if (Math.random() > 0.5) {
              log("他解開圍巾透氣，露出了裡面的紅識別證。", "danger");
              changeStat("stamina", -30);
            } else {
              log(
                "風吹起圍巾一角，你看到了藍色的識別證，你鬆了一口氣。",
                "success"
              );
              changeStat("sanity", 5);
            }
          },
        },
        {
          text: "假裝沒看見",
          action: () => {
            log("經理經過你身邊時低聲說：『算你運氣好。』", "event");
            changeStat("sanity", -5);
          },
        },
        {
          text: "稱讚圍巾",
          action: () => {
            log("他看起來很高興。這應該是安全的。", "success");
            changeStat("sanity", 5);
          },
        },
      ],
    },
    elevator_mirror: {
      text: "電梯停在B1，你從電梯裡的鏡子看到門外似乎站著一個紅色的東西。",
      choices: [
        {
          text: "堅持閉眼",
          action: () => {
            log(
              "耳邊傳來玻璃碎裂的聲音，但你緊閉雙眼。過了一會兒，電梯門關上了。安全。",
              "success"
            );
            changeStat("sanity", -10);
          },
        },
        {
          text: "睜眼檢查",
          action: () => {
            log("鏡子裡，一個穿紅制服的無臉人正死死盯著你。", "danger");
            changeStat("sanity", -30);
          },
        },
      ],
    },
    stray_dog_shadow: {
      text: "走廊的燈光將你的影子拉得很長，牆上投射出一個像巨大獵犬的影子，並傳來沉重的喘息聲。",
      choices: [
        {
          text: "關閉光源",
          action: () => {
            log(
              "你關掉手電筒。喘息聲在周圍徘徊了一陣後遠去了。",
              "success"
            );
            changeStat("sanity", -5);
          },
        },
        {
          text: "用手電筒驅趕",
          reqClue: "item_flashlight",
          action: () => {
            log("影子消失了，但你發現自己的影子多了一條尾巴。", "danger");
            changeStat("corruption", 20);
            changeStat("sanity", -15);
          },
        },
      ],
    },
    fake_rule_note: {
      text: "監控螢幕上貼著一張黃色便利貼，筆跡潦草：『規則12：請對鏡頭微笑，否則它們會發現你看得見。』",
      choices: [
        {
          text: "對鏡頭微笑",
          action: () => {
            log(
              "你看著鏡頭裡自己僵硬愚蠢的笑容，感到強烈的自我厭惡。",
              "event"
            );
            changeStat("sanity", -10);
          },
        },
        {
          text: "撕掉紙條",
          action: () => {
            log("這只是無聊的惡作劇。你把它揉成一團丟了。", "success");
            changeStat("sanity", 5);
          },
        },
        {
          text: "檢查回放",
          action: () => {
            log(
              "你調出錄影，發現從頭到尾只有你一個人在保安室...那是誰貼的？",
              "danger"
            );
            changeStat("sanity", -20);
          },
        },
      ],
    },
    toy_dog: {
      text: "大廳空無一人，卻突然傳來『汪！』的一聲，你低頭看到一隻發條機械狗。",
      choices: [
        {
          text: "關掉它",
          action: () => {
            log("你的手指剛碰到開關，它猛地咬了你一口！", "event");
            changeStat("stamina", -10);
          },
        },
        {
          text: "用手電筒照它",
          reqClue: "item_flashlight",
          action: () => {
            log(
              "在強光下，發條停止了轉動。這只是個普通的玩具。",
              "success"
            );
            changeStat("sanity", 5);
          },
        },
        {
          text: "躲回保安室",
          action: () => {
            log(
              "玩具狗噠噠噠地走進黑暗，隨後發出了一聲像人類慘叫的聲音。",
              "danger"
            );
            changeStat("sanity", -15);
          },
        },
      ],
    },
    green_drink: {
      text: "販賣機哐噹一聲吐出一罐沒有標籤的綠色飲料。",
      choices: [
        {
          text: "喝掉它",
          action: () => {
            const outcome = Math.random();
            if (outcome > 0.5) {
              log("居然是哈密瓜汽水？喝完後精神好多了。", "success");
              changeStat("stamina", 20);
              changeStat("sanity", 10);
            } else {
              log("喝起來像是燃燒的電池液，你的食道劇痛不已。", "danger");
              changeStat("stamina", -20);
              changeStat("corruption", 10);
            }
          },
        },
        {
          text: "無視",
          action: () => {
            log("你沒有理會。再次回頭時，飲料已經不見了。", "event");
          },
        },
      ],
    },
    neighbor_405: {
      text: "405號房的住戶憤怒地衝出來吼道：『隔壁404吵死了！你們保安都不管管嗎？』",
      choices: [
        {
          text: "答應查看",
          action: () => {
            log("你去敲了404的門，門開了，裡面是無盡的深淵。", "danger");
            changeStat("sanity", -20);
            changeStat("stamina", -10);
          },
        },
        {
          text: "告知404沒人",
          action: () => {
            log(
              "住戶的臉色瞬間變得慘白，什麼都沒說就跑回了房間。",
              "event"
            );
            changeStat("sanity", -5);
            changeStat("corruption", 5);
          },
        },
        {
          text: "保持沉默",
          action: () => {
            log("住戶罵罵咧咧了一句，轉身回去了。", "success");
          },
        },
      ],
    },
    neighbor_knock: {
      text: "對講機突然響起：『我是302的住戶，我忘帶鑰匙了，幫我開一下大門！』",
      choices: [
        {
          text: "幫她開門",
          action: () => {
            log(
              "門開了。幾秒鐘後，她出現在你身後，給了你狠狠一爪。",
              "danger"
            );
            changeStat("stamina", -30);
            changeStat("sanity", -20);
          },
        },
        {
          text: "拒絕並檢查名單",
          action: () => {
            log(
              "你查了名冊，302根本沒住人。對講機那頭傳來野獸般的低吼。",
              "success"
            );
            changeStat("sanity", -5);
          },
        },
        {
          text: "詢問特徵",
          action: () => {
            log("『我有...紅色的眼睛...』聲音開始扭曲變形。", "danger");
            changeStat("sanity", -15);
          },
        },
      ],
    },
    restock_man: {
      text: "你看見有人在給販賣機補貨，但他補進去的全是鮮紅色的罐子。",
      choices: [
        {
          text: "質問",
          action: () => {
            log("他轉過頭，臉上沒有五官，只有一張巨大的嘴。", "danger");
            changeStat("sanity", -20);
            changeStat("stamina", -10);
          },
        },
        {
          text: "假裝沒看見",
          action: () => {
            log(
              "等你再看過去，人已經消失了，販賣機裡塞滿了血紅色的罐子。",
              "event"
            );
            changeStat("sanity", -5);
          },
        },
        {
          text: "買一罐",
          action: () => {
            log("液體濺到手上，腐蝕了你的皮膚。", "danger");
            changeStat("stamina", -20);
          },
        },
      ],
    },
    extra_floor: {
      text: "你走進電梯，發現控制面板上多了一個寫著『14F』的按鈕。",
      choices: [
        {
          text: "好奇按下",
          action: () => {
            log("電梯上升到了不存在的樓層。缺氧感讓你幾乎暈厥。", "danger");
            changeStat("stamina", -30);
            changeStat("sanity", -20);
          },
        },
        {
          text: "無視離開",
          action: () => {
            log("你選擇走樓梯離開。這最安全。", "success");
            changeStat("stamina", -5);
          },
        },
        {
          text: "拍照",
          action: () => {
            log("你拍了張照。照片顯示電梯裡其實站滿了人。", "danger");
            changeStat("sanity", -25);
            changeStat("corruption", 10);
          },
        },
      ],
    },
    red_tie_gift: {
      text: "保安室的桌上突然出現一個精美的禮盒，裡面有一條紅識別證和一張卡片：『加入我們。——經理』",
      choices: [
        {
          text: "戴上識別證",
          action: () => {
            log(
              "你剛戴上，識別證就自動收緊，彷彿要勒斷你的脖子。",
              "danger"
            );
            changeStat("stamina", -30);
          },
        },
        {
          text: "扔進垃圾桶",
          action: () => {
            log("你剛轉身，它又出現在桌上。你不敢再碰它了。", "event");
            changeStat("sanity", -10);
            changeStat("corruption", 5);
          },
        },
      ],
    },
    glitch_anomaly: {
      text: "走廊前方懸浮著一團幾何狀的黑霧，周圍的空間伴隨著強烈的數位雜訊在跳動。",
      choices: [
        {
          text: "繞道",
          action: () => {
            log("你小心翼翼地繞過了它，沒有發生異狀。", "success");
            changeStat("sanity", -5);
            changeStat("stamina", -5);
          },
        },
        {
          text: "觸碰",
          action: () => {
            log("指尖剛碰到，無數混亂的畫面瞬間塞滿你的大腦。", "danger");
            changeStat("sanity", -25);
            changeStat("corruption", 15);
          },
        },
        {
          text: "聆聽聲音",
          condition: () => GameState.day >= 4,
          action: () => {
            log("你聽到了來自地獄的頻率，耳朵開始流血。", "danger");
            changeStat("stamina", -20);
            changeStat("sanity", -20);
          },
        },
      ],
    },
    room_404_encounter: {
      text: "你巡邏經過404號房，門縫透出詭異的紅光，裡面傳來指甲抓撓門板的聲音。",
      choices: [
        {
          text: "看一眼",
          action: () => {
            log("紅光刺入你的眼睛，眼球劇痛無比。", "danger");
            changeStat("stamina", -20);
            changeStat("sanity", -20);
          },
        },
        {
          text: "低頭通過",
          action: () => {
            log("門在你身後砰地一聲關上了。你沒有回頭。", "success");
            changeStat("sanity", -5);
            changeStat("stamina", -5);
          },
        },
        {
          text: "幫忙關門",
          action: () => {
            log("一隻冰冷的手突然從門縫伸出抓住了你！", "danger");
            changeStat("stamina", -20);
            changeStat("corruption", 10);
          },
        },
      ],
    },
    phantom_pet: {
      text: "漆黑的樓梯角傳來微弱的貓叫聲，聽起來非常可憐。",
      choices: [
        {
          text: "查看",
          action: () => {
            log("手電筒照過去，那隻貓長著一張蒼白的人臉。", "danger");
            changeStat("sanity", -20);
          },
        },
        {
          text: "關燈安靜",
          action: () => {
            log("你關掉燈屏住呼吸。過了一會，它離開了。", "success");
            changeStat("sanity", -5);
          },
        },
        {
          text: "給罐頭",
          condition: () => GameState.day >= 4,
          action: () => {
            log("它沒有吃罐頭，而是咬了你的手。", "danger");
            changeStat("stamina", -20);
          },
        },
      ],
    },
    noise_upstairs: {
      text: "深夜的樓板上方傳來清脆的彈珠滾動聲...噠、噠、噠...聲音從臥室上方一路滾到了客廳，但你記得樓上根本沒有住人。",
      choices: [
        {
          text: "上樓查看",
          action: () => {
            log("你剛上樓梯，就有人從背後用力推了你一把！", "danger");
            changeStat("sanity", -20);
            changeStat("stamina", -15);
            changeStat("corruption", 5);
          },
        },
        {
          text: "戴上耳機",
          action: () => {
            log("聲音聽不到了，但你總覺得背後有人在對你吹氣。", "event");
            changeStat("sanity", -10);
          },
        },
      ],
    },
    elevator_b1: {
      text: "電梯門無聲滑開，顯示樓層為B1。裡面一片漆黑，彷彿連光線都被吞噬了，深處傳來潮濕的腐臭味。",
      choices: [
        {
          text: "走進去",
          action: () => {
            log("你剛踏進去，電梯開始急速下墜，彷彿沒有底。", "danger");
            changeStat("sanity", -30);
            changeStat("stamina", -20);
          },
        },
        {
          text: "默數10秒",
          action: () => {
            log(
              "你閉眼數到10。再睜眼時門關上了，沉重的呼吸聲就在鼻尖消失。",
              "success"
            );
            changeStat("sanity", -15);
          },
        },
        {
          text: "逃跑",
          condition: () => GameState.stamina > 25,
          action: () => {
            log("你狂奔回保安室，鎖上了門。", "event");
            changeStat("stamina", -25);
          },
        },
      ],
    },
    phone_call: {
      text: "寂靜的保安室裡，那台早已拔掉線路的內線電話突然發出刺耳的鈴聲，紅色的信號燈瘋狂閃爍。",
      choices: [
        {
          text: "接起",
          action: () => {
            if (Math.random() < 0.5) {
              log("話筒裡傳來你自己的聲音：『別回頭...』", "danger");
              changeStat("sanity", -25);
            } else {
              log("刺耳的尖叫聲幾乎刺破你的耳膜！", "danger");
              changeStat("sanity", -15);
              changeStat("stamina", -10);
            }
          },
        },
        {
          text: "拔掉電話線",
          action: () => {
            log("你拔掉了線，但鈴聲又響了整整三聲才停下。", "event");
            changeStat("sanity", -10);
            changeStat("corruption", 5);
          },
        },
      ],
    },
    vending_machine: {
      text: "走廊盡頭的販賣機燈光忽明忽暗，發出嗡嗡的電流聲。",
      choices: [
        {
          text: "買藍色飲料",
          action: () => {
            if (GameState.day >= 4) {
              log("飲料滾出來，裡面漂浮著一顆眼球。", "danger");
              changeStat("sanity", -15);
              changeStat("corruption", 10);
            } else {
              log("冰涼的飲料讓你精神一振。", "success");
              changeStat("stamina", 15);
              changeStat("sanity", 5);
            }
          },
        },
        {
          text: "買紅色飲料",
          action: () => {
            log("喝起來像血...但異常香甜，你忍不住想再喝一罐。", "danger");
            changeStat("corruption", 40);
            changeStat("sanity", -30);
          },
        },
        {
          text: "踢一下機台",
          action: () => {
            log("哐噹！掉下來一罐生鏽的綠色罐子。", "event");
            changeStat("stamina", -5);
          },
        },
      ],
    },
    midnight_delivery: {
      text: "暴雨夜，一個穿著黃色雨衣的人站在玻璃門外，指著地上的包裹示意你簽收。",
      choices: [
        {
          text: "開門",
          action: () => {
            log("門剛開，它就化作一攤黑泥衝了進來。", "danger");
            changeStat("stamina", -30);
            changeStat("corruption", 20);
          },
        },
        {
          text: "拒絕",
          action: () => {
            log("它僵硬地點點頭，消失在雨中。", "success");
            changeStat("sanity", -5);
          },
        },
        {
          text: "查看包裹",
          reqClue: "clue_package",
          action: () => {
            log("你拿出手機拍照存證，它似乎被閃光燈嚇跑了。", "success");
            changeStat("sanity", 5);
          },
        },
      ],
    },
    cctv_anomaly: {
      text: "你注意到13樓走廊的監視器畫面裡，有一群人正背對著鏡頭一動也不動。",
      choices: [
        {
          text: "仔細觀察",
          action: () => {
            log("突然，所有人同時轉過頭看向鏡頭！屏幕瞬間炸裂。", "danger");
            changeStat("sanity", -30);
            changeStat("corruption", 10);
          },
        },
        {
          text: "關閉螢幕",
          action: () => {
            log("你關掉了螢幕。幾秒後，門外傳來了整齊的腳步聲。", "event");
            changeStat("sanity", -10);
            changeStat("stamina", -5);
          },
        },
      ],
    },
    hallway_shadow: {
      text: "巡邏時，你看見走廊盡頭站著一個高大的人形黑影，似乎在等待著誰。",
      choices: [
        {
          text: "用手電筒照",
          reqClue: "item_flashlight",
          action: () => {
            log("光線照過去，那裡只掛著一件舊大衣。", "event");
            changeStat("sanity", -5);
          },
        },
        {
          text: "躲在桌下",
          action: () => {
            log("你屏住呼吸。它在門口徘徊了一陣後離開了。", "success");
            changeStat("stamina", -5);
          },
        },
      ],
    },
    strange_smell: {
      text: "空氣中突然瀰漫著一股燒焦的味道，隱約還能聽到細微的求救聲。",
      choices: [
        {
          text: "尋找來源",
          action: () => {
            log("你在角落發現了一堆正在燃燒的紙錢。", "danger");
            changeStat("sanity", -15);
            changeStat("corruption", 5);
          },
        },
        {
          text: "無視",
          action: () => {
            log("味道讓你感到強烈的噁心和頭暈。", "event");
            changeStat("stamina", -10);
          },
        },
      ],
    },
    crying_baby: {
      text: "夜深人靜，不知從哪裡傳來了淒厲的嬰兒哭聲，在空蕩的走廊迴盪。",
      choices: [
        {
          text: "尋找哭聲",
          action: () => {
            log("你找到了一個被遺棄的舊洋娃娃，眼睛被挖空了。", "event");
            changeStat("sanity", -10);
          },
        },
        {
          text: "戴上耳塞",
          action: () => {
            log("沒用。哭聲直接在你的腦海深處響起。", "danger");
            changeStat("sanity", -20);
          },
        },
      ],
    },
    manager_visit: {
      text: "經理（帶著紅識別證）突然出現在窗口，遞給你一杯水：『辛苦了，喝口水吧。』",
      choices: [
        {
          text: "喝水",
          action: () => {
            log("水像岩漿一樣灼燒著你的喉嚨。", "danger");
            changeStat("stamina", -30);
          },
        },
        {
          text: "無視",
          action: () => {
            log(
              "他在窗外磨牙，發出咯吱咯吱的聲音，最後離開了。",
              "success"
            );
            changeStat("sanity", -15);
          },
        },
        {
          text: "質詢識別證",
          reqClue: "clue_manager",
          action: () => {
            log("被拆穿後，他化作一團黑霧消散了。", "success");
            changeStat("sanity", 10);
          },
        },
      ],
    },
    lost_girl: {
      text: "一個穿著睡衣的小女孩蹲在牆角哭泣，看起來迷路了。",
      choices: [
        {
          text: "上前安慰",
          action: () => {
            log(
              "她抬起頭，臉上沒有五官。她抱住你，開始吸食你的體溫。",
              "danger"
            );
            changeStat("corruption", 30);
            changeStat("stamina", -30);
          },
        },
        {
          text: "用手電筒照",
          reqClue: "item_flashlight",
          action: () => {
            log("在強光下，小女孩的身影慢慢消散了。", "success");
            changeStat("sanity", 5);
          },
        },
        {
          text: "躲回保安室",
          action: () => {
            log("哭聲變成了尖銳的嬉笑聲，漸漸遠去。", "event");
            changeStat("sanity", -10);
          },
        },
      ],
    },
    power_outage: {
      text: "公寓突然停電，四周陷入死寂，你聽到地板上傳來濕膩的爬行聲。",
      choices: [
        {
          text: "用手電筒",
          reqClue: "item_flashlight",
          action: () => {
            log("光束逼退了黑暗中靠近的影子。", "success");
            changeStat("stamina", -5);
          },
        },
        {
          text: "保持不動",
          action: () => {
            log("有東西爬過了你的鞋面，留下一灘黏液。", "event");
            changeStat("sanity", -20);
            changeStat("corruption", 10);
          },
        },
        {
          text: "去配電室",
          condition: () => GameState.stamina > 30,
          action: () => {
            log("配電室裡沾滿了黏液，你滑了一跤。", "danger");
            changeStat("stamina", -20);
            changeStat("corruption", 20);
          },
        },
      ],
    },
    blood_moon: {
      text: "窗外的月亮變成了鮮血般的紅色，將整個大廳染成了詭異的緋紅。",
      choices: [
        {
          text: "欣賞",
          action: () => {
            log("你感覺靈魂正在被一點點剝離身體。", "danger");
            changeStat("sanity", -40);
            changeStat("corruption", 20);
          },
        },
        {
          text: "躲桌下",
          action: () => {
            log("你躲在桌下瑟瑟發抖，直到紅光退去。", "success");
            changeStat("sanity", -20);
          },
        },
      ],
    },
    red_lady_encounter: {
      text: "紅衣女子出現在你面前。她的臉變成了你母親的樣子，張開雙臂等你。",
      choices: [
        {
          text: "後退",
          action: () => {
            log("那不是你母親，那是散發著惡臭的腐爛屍體。", "success");
            changeStat("sanity", -15);
          },
        },
        {
          text: "擁抱",
          action: () => {
            log("她抱住你的瞬間，尖銳的肋骨刺穿了你的胸膛。", "danger");
            changeStat("stamina", -50);
          },
        },
        {
          text: "無視通過",
          reqClue: "clue_red_lady",
          action: () => {
            log(
              "擦肩而過時，你聽到耳邊傳來：『你看得見我，對吧？』",
              "success"
            );
            changeStat("sanity", -5);
            changeStat("corruption", 5);
          },
        },
      ],
    },
    mirror_reflection: {
      text: "你照鏡子整理儀容，卻發現鏡中的倒影穿著紅衣，正微笑著向你伸出手。",
      choices: [
        {
          text: "打破鏡子",
          action: () => {
            log("你的手流血了，但鏡中的倒影發出了淒厲的慘叫。", "success");
            changeStat("stamina", -20);
            GameState.flags["mirror_broken"] = true;
          },
        },
        {
          text: "詢問秘密",
          reqClue: "clue_mirror",
          action: () => {
            log("倒影的嘴唇蠕動：『它是時間的奴隸。』", "success");
            changeStat("sanity", -10);
            GameState.clues.push("clue_final_hint");
          },
        },
        {
          text: "整理制服",
          action: () => {
            log("你的靈魂彷彿被鏡子拉扯，劇痛無比。", "danger");
            changeStat("sanity", -30);
            changeStat("corruption", 20);
          },
        },
      ],
    },
    final_confrontation: {
      text: "門外傳來早班老王的求救聲：『快開門啊！後面有怪物在追我！』",
      choices: [
        {
          text: "開門",
          action: () => {
            log(
              "門外站著的只是一張漂浮的人皮。你的生命力瞬間被抽空。",
              "danger"
            );
            changeStat("stamina", -90);
          },
        },
        {
          text: "死守",
          action: () => {
            log("門板被瘋狂撞擊，彷彿隨時會碎裂。", "danger");
            changeStat("stamina", -50);
          },
        },
        {
          text: "問名字",
          reqClue: "clue_manager",
          action: () => {
            log("門外沉默了許久，傳來一聲：『我...忘...了...』", "success");
          },
        },
      ],
    },
  };