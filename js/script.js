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
const forestSound = new Audio("sounds/Floresta.wav");
const rainSound = new Audio("sounds/Chuva.wav");
const coffeeshopSound = new Audio("sounds/Cafeteria.wav");
const fireplaceSound = new Audio("sounds/Lareira.wav");
const clickSound = new Audio("sounds/Click.wav");
const playSound = new Audio("sounds/Play.wav");
// const alarmSound = new Audio("sounds/Alarm.ogg")
let isCountDownActive = false;
let elapsedMilliseconds = 1000;
let activeButton = null;
let activeSound = null;

forestButton.addEventListener("click", () => {
  if (activeSound) {
    activeSound.pause();
    activeSound.currentTime = 0;
    if (activeSound === forestSound) {
      activeSound = null;
    } else {
      activeSound = forestSound;
      activeSound.play();
      activeSound.loop = true;
    }
  } else {
    activeSound = forestSound;
    activeSound.play();
    activeSound.loop = true;
  }
});

rainButton.addEventListener("click", () => {
  if (activeSound) {
    activeSound.pause();
    activeSound.currentTime = 0;
    if (activeSound === rainSound) {
      activeSound = null;
    } else {
      activeSound = rainSound;
      activeSound.play();
      activeSound.loop = true;
    }
  } else {
    activeSound = rainSound;
    activeSound.play();
    activeSound.loop = true;
  }
});

coffeeshopButton.addEventListener("click", () => {
  if (activeSound) {
    activeSound.pause();
    activeSound.currentTime = 0;
    if (activeSound === coffeeshopSound) {
      activeSound = null;
    } else {
      activeSound = coffeeshopSound;
      activeSound.play();
      activeSound.loop = true;
    }
  } else {
    activeSound = coffeeshopSound;
    activeSound.play();
    activeSound.loop = true;
  }
});

fireplaceButton.addEventListener("click", () => {
  if (activeSound) {
    activeSound.pause();
    activeSound.currentTime = 0;
    if (activeSound === fireplaceSound) {
      activeSound = null;
    } else {
      activeSound = fireplaceSound;
      activeSound.play();
      activeSound.loop = true;
    }
  } else {
    activeSound = fireplaceSound;
    activeSound.play();
    activeSound.loop = true;
  }
});

selectSound = (button) => {
  if (button.classList.contains("button-pressed")) {
    activeButton = null;
    button.classList.toggle("button-pressed");
  } else {
    if (activeButton) {
      activeButton.classList.toggle("button-pressed");
    }
    activeButton = button;
    button.classList.toggle("button-pressed");
  }
};

soundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectSound(button);
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
              if (activeSound) {
                activeSound.pause();
                activeSound.currentTime = 0;
                activeSound = null;
                activeButton.classList.toggle("button-pressed");
                activeButton = null;
              }
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
