const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");
const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");
const forestButton = document.querySelector(".forest");
const rainButton = document.querySelector(".rain");
const coffeeshopButton = document.querySelector(".coffeeshop");
const fireplaceButton = document.querySelector(".fireplace");
const soundButtons = document.querySelectorAll(".sound-selector button");
const volumeSliders = document.querySelectorAll(".sound-selector button input");
const forestSound = new Audio("sounds/Floresta.wav");
const rainSound = new Audio("sounds/Chuva.wav");
const coffeeshopSound = new Audio("sounds/Cafeteria.wav");
const fireplaceSound = new Audio("sounds/Lareira.wav");
const clickSound = new Audio("sounds/Click.wav");
const playSound = new Audio("sounds/Play.wav");
// const alarmSound = new Audio("sounds/Alarm.ogg")
let isCountDownActive = false;
let elapsedMilliseconds = 1000;
// let activeButton = null;
// let activeSound = null;

backgroundSounds = {
  forest: forestSound,
  rain: rainSound,
  coffeeshop: coffeeshopSound,
  fireplace: fireplaceSound,
};

soundButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT") {
      if (button.children[1].value > 1) {
        let sound = backgroundSounds[button.classList[0]];
        button.classList.toggle("button-pressed");
        if (sound.paused === true) {
          sound.play();
        } else {
          sound.pause();
        }
      }
    }
  });
});

volumeSliders.forEach((slider) => {
  slider.addEventListener("change", () => {
    let sound = backgroundSounds[slider.parentElement.classList[0]];
    sound.volume = slider.value / 100;
    if (slider.value > 1) {
      sound.play();
      slider.parentElement.classList.add("button-pressed");
    } else {
      sound.pause();
      slider.parentElement.classList.remove("button-pressed");
    }
  });
});

pauseTimer = () => {
  playSound.pause();
  playSound.currentTime = 0;
  playSound.play();
  isCountDownActive = false;
  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
};

playButton.addEventListener("click", () => {
  if (Number(minutes.textContent) > 0 || Number(seconds.textContent) > 0) {
    playSound.pause();
    playSound.currentTime = 0;
    playSound.play();
    isCountDownActive = true;
    playButton.classList.add("hide");
    pauseButton.classList.remove("hide");
  }
});

pauseButton.addEventListener("click", () => {
  pauseTimer();
});

stopButton.addEventListener("click", () => {
  if (Number(minutes.textContent) > 0 || Number(seconds.textContent) > 0) {
    pauseTimer();
    seconds.textContent = "00";
    minutes.textContent = "00";
  }
});

incrementButton.addEventListener("click", () => {
  minutes.textContent = `${Number(minutes.textContent) + 5}`.padStart(2, 0);
  clickSound.play();
});

decrementButton.addEventListener("click", () => {
  if (Number(minutes.textContent) >= 5) {
    minutes.textContent = `${Number(minutes.textContent) - 5}`.padStart(2, 0);
    clickSound.play();
  }
});

countdown = () => {
  setTimeout(() => {
    if (isCountDownActive) {
      elapsedMilliseconds -= 250;
      if (elapsedMilliseconds === 0) {
        elapsedMilliseconds = 1000;
        switch (Number(seconds.textContent)) {
          case 1:
            seconds.textContent = "00";
            if (Number(minutes.textContent) === 0) {
              pauseTimer();
              // alarmSound.play();
              // alarmSound.loop = true;
              // if (activeSound) {
              //   activeSound.pause();  
              //   activeSound.currentTime = 0;
              //   activeSound = null;
              //   activeButton.classList.toggle("button-pressed");
              //   activeButton = null;
              // }
              return;
            }
            break;
          case 0:
            if (Number(minutes.textContent) > 0) {
              seconds.textContent = "59";
              minutes.textContent = `${Number(minutes.textContent) - 1}`.padStart(2, 0);
            }
            break;
          default:
            seconds.textContent = `${Number(seconds.textContent) - 1}`.padStart(2, 0);
        } 
      }
    }
    countdown();
  }, 250);
};

countdown();
