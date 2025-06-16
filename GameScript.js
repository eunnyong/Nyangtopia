const sfxCoin = document.getElementById("sfx-coin");
const sfxHappyUp = document.getElementById("sfx-happy-up");
const sfxHappyDown = document.getElementById("sfx-happy-down");

let currentEventIndex = 0;
let money = 1000000;
let happiness = 50;

const eventText = document.getElementById("event-text");
const choicesBox = document.getElementById("choices");
const happyBar = document.getElementById("happy-bar");
const moneyText = document.getElementById("money");
const catImage = document.querySelector(".cat");

function typeText(text, callback) {
  eventText.textContent = "";
  eventText.classList.remove("reaction-text");
  let i = 0;
  const interval = setInterval(() => {
    eventText.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 50);
}

const events = [
  {
    text: "돼진이가 배가 고파 보이는데 사료가 없다.",
    initialImage: "img/cat_nomal.png",
    choices: [
      {
        text: "고양이용 사료 사기",
        effect: { money: -100000 },
        image: "img/cat_happy.png",
        reactionText: "(사료 구매에 10만 원을 소비했다.)"
      },
      {
        text: "집에 있는 참치 캔 주기",
        effect: { money: 0 },
        reactionText: "(고양이용이 아니라 그런지 돼진이가 잘 못 먹는 것 같다...)"
      }
    ]
  },
  {
    text: "돼진이가 심심해보인다.",
    initialImage: "img/cat_boring.png",
    choices: [
      {
        text: "놀아주기",
        effect: { money: -200000, happiness: 10, mode: "add" },
        image: "img/cat_happy.png",
        reactionText: "(장난감 구매에 20만 원을 소비했다. 돼진이가 기뻐하는 것 같다!)"
      },
      {
        text: "내버려두기",
        effect: { money: 0, happiness: 10, mode: "set" },
        reactionText: "(돼진이가 많이 실망한 것 같다...)"
      }
    ]
  },
  {
    text: "이상한 소리가 들린다.",
    initialImage: "",
    choices: [
      {
        text: "소리의 근원지 찾기",
        effect: { money: -300000 },
        image: "img/cat_laptop.png",
        reactionText: "(돼진이가 노트북에 물을 쏟았다. 노트북 수리비로 30만 원이 청구되었다...)"
      },
      {
        text: "돼진이 찾기",
        effect: { money: -300000 },
        image: "img/cat_laptop.png",
        reactionText: "(돼진이가 노트북에 물을 쏟았다. 노트북 수리비로 30만 원이 청구되었다...)"
      }
    ]
  },
  {
    text: "돼진이가 아파 보인다.",
    initialImage: "img/cat_sick.png",
    choices: [
      {
        text: "병원에 데려가기",
        effect: { money: -800000 },
        reactionText: "(병원비로 80만 원이 청구되었다. 이제 남은 돈이 없다...)"
      },
      {
        text: "내버려두기",
        effect: { money: 0, happiness: 0, mode: "set" },
        reactionText: "(돼진이의 상태가 심각해 보인다...)"
      }
    ]
  }
];

function updateStatus() {
  happyBar.style.width = happiness + "%";
  moneyText.textContent = money.toLocaleString() + "원";
}

function showEvent(index) {
  const event = events[index];

  if (event.initialImage) {
    catImage.style.display = "block";
    catImage.src = event.initialImage;
  } else {
    catImage.style.display = "none";
  }

  typeText(event.text, () => {
    setTimeout(() => {
      choicesBox.innerHTML = "";
      choicesBox.style.display = "flex";

      event.choices.forEach(choice => {
        const span = document.createElement("span");
        span.className = "choice";
        span.textContent = choice.text;
        span.onclick = () => {
          const previousHappiness = happiness;

          money += choice.effect.money;
          if (choice.effect.mode === "set") {
            happiness = choice.effect.happiness;
          } else if (choice.effect.mode === "add") {
            happiness += choice.effect.happiness;
          }

          if (choice.effect.money < 0) {
            sfxCoin.currentTime = 0;
            sfxCoin.play();
          }

          if (choice.effect.happiness !== undefined) {
            if (happiness > previousHappiness) {
              sfxHappyUp.currentTime = 0;
              sfxHappyUp.play();
            } else if (happiness < previousHappiness) {
              sfxHappyDown.currentTime = 0;
              sfxHappyDown.play();
            }
          }

          if (choice.effect.happiness !== undefined) {
            if (choice.effect.mode === "add") {
              if (choice.effect.happiness > 0) {
                sfxHappyUp.currentTime = 0;
                sfxHappyUp.play();
              } else if (choice.effect.happiness < 0) {
                sfxHappyDown.currentTime = 0;
                sfxHappyDown.play();
              }
            } else if (choice.effect.mode === "set") {
              if (choice.effect.happiness > happiness) {
                sfxHappyUp.currentTime = 0;
                sfxHappyUp.play();
              } else if (choice.effect.happiness < happiness) {
                sfxHappyDown.currentTime = 0;
                sfxHappyDown.play();
              }
            }
          }

          if (choice.image) {
            catImage.style.display = "block";
            catImage.src = choice.image;
          }

          updateStatus();

          eventText.classList.add("reaction-text");
          eventText.textContent = choice.reactionText || "";
          choicesBox.style.display = "none";

          currentEventIndex++;
          if (currentEventIndex < events.length) {
            setTimeout(() => showEvent(currentEventIndex), 2300);
          } else {
            setTimeout(() => {
              const endingVideo = document.getElementById("ending-video");
              endingVideo.style.display = "block";
              endingVideo.play();

              endingVideo.addEventListener("ended", () => {
                const buttons = document.getElementById("ending-buttons");
                if (buttons) {
                  buttons.style.display = "flex";
                }
              });

              window.addEventListener('click', () => {
                endingVideo.muted = false;
                endingVideo.play().catch(err => {
                  console.warn("영상 소리 재생 실패:", err);
                });
              }, { once: true });
            }, 2300);
          }
        };
        choicesBox.appendChild(span);
      });
    }, 400);
  });
}

window.onload = () => {
  updateStatus();
  showEvent(currentEventIndex);
};