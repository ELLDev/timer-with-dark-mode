const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");
const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");
const controlButtons = document.querySelectorAll(".controls button");
const lightThemeButton = document.querySelector(".light-theme");
const darkThemeButton = document.querySelector(".dark-theme");
const themeSelectorButtons = document.querySelectorAll(".theme-selector button");
const body = document.querySelector("body");
const timeDisplay = document.querySelectorAll(".time-display span");
const soundButtons = document.querySelectorAll(".sound-selector button");
const soundButtonIcons = document.querySelectorAll(".sound-selector path")
const volumeSliders = document.querySelectorAll(".sound-selector button input");
const forestSound = new Audio("sounds/Floresta.wav");
const rainSound = new Audio("sounds/Chuva.wav");
const coffeeshopSound = new Audio("sounds/Cafeteria.wav");
const fireplaceSound = new Audio("sounds/Lareira.wav");
const clickSound = new Audio("sounds/Click.wav");
const playSound = new Audio("sounds/Play.wav");
const alarmSound = new Audio("sounds/Alarm.mp3")
const setAlarmSound = new Audio("sounds/Set-Alarm.mp3")
const alarmButton = document.querySelector(".alarm button");
const alarmIcon = document.querySelector(".alarm-icon");
const alarmSoundbars = document.querySelector(".soundbars");
const alarmSoundbarsIcons = document.querySelectorAll(".soundbars path");
let isCountDownActive = false;
let elapsedMilliseconds = 1000;
let isAlarmSet = true;

alarmButton.addEventListener(("click"), () => {
  if (!alarmSound.paused) {
    alarmIcon.classList.toggle("alarm-icon-shake");
    stopButton.classList.toggle("alarm-alert");
    alarmSound.pause();
    alarmSound.currentTime = 0;
  } else {
    setAlarmSound.play();
    isAlarmSet = !isAlarmSet;
    alarmSoundbars.classList.toggle("hide");
  }
});

toggleDarkModeTheme = () => {
  lightThemeButton.classList.toggle("hide");
  darkThemeButton.classList.toggle("hide");
  body.classList.toggle("dark-mode-background");
  timeDisplay.forEach(display => display.classList.toggle("dark-mode-time-display"));
  controlButtons.forEach(button => {
    if (button.classList.contains("pause")) {
      button.childNodes[1].childNodes[3].classList.toggle("dark-mode-control-buttons");
      button.childNodes[1].childNodes[5].classList.toggle("dark-mode-control-buttons");  
    }
    button.childNodes[1].childNodes[1].classList.toggle("dark-mode-control-buttons");
    button.classList.toggle("dark-mode");
  });
  soundButtons.forEach(button => button.classList.toggle("dark-mode-sound-selector-buttons"));
  soundButtonIcons.forEach(icon => icon.classList.toggle("dark-mode-sound-selector-icons"));
  alarmButton.classList.toggle("dark-mode-alarm-hover");
  alarmIcon.childNodes[1].classList.toggle("dark-mode-alarm");
  alarmSoundbarsIcons.forEach(icon => icon.classList.toggle("dark-mode-soundbars"));
};

themeSelectorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleDarkModeTheme();
  });
});

backgroundSounds = {
  forest: forestSound,
  rain: rainSound,
  coffeeshop: coffeeshopSound,
  fireplace: fireplaceSound,
};
Object.values(backgroundSounds).forEach(sound => sound.loop = true);

soundButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT") {
      button.classList.toggle("button-pressed");
      let sound = backgroundSounds[button.classList[0]];
      if (Number(button.children[1].value) === 1) {
        button.children[1].value = 50;
        sound.volume = button.children[1].value / 100;
        sound.play();
      } else {
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
  if (!alarmSound.paused) {
    alarmIcon.classList.toggle("alarm-icon-shake");
    stopButton.classList.toggle("alarm-alert");
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
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
              Object.values(backgroundSounds).forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
              });
              soundButtons.forEach(button => {
                if (button.classList.contains("button-pressed")) {
                  button.classList.toggle("button-pressed");
                }
              });
              if (isAlarmSet) {
                alarmIcon.classList.toggle("alarm-icon-shake");
                stopButton.classList.toggle("alarm-alert");
                alarmSound.play();
                alarmSound.loop = true;
              }
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
