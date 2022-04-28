const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");
const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");
let soundButtons = document.querySelectorAll(".sound-selector button");
let isCountDownActive = false;
let elapsedMilliseconds = 1000;
let activeSound;

selectSound = (button) => {
  if (button.classList.contains("down")) {
    activeSound.classList.remove("down");
    activeSound = null;
    button.classList.remove("down");
    button.classList.add("up");
  } else {
    if (activeSound) {
      activeSound.classList.remove("down");
      activeSound.classList.add("up");
    }
    activeSound = button;
    button.classList.add("down");
    button.classList.remove("up");
  }
};

soundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectSound(button);
  });
});

pauseTimer = () => {
  isCountDownActive = false;
  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
};

playButton.addEventListener("click", () => {
  if (Number(minutes.textContent) > 0 || Number(seconds.textContent) > 0) {
    isCountDownActive = true;
    playButton.classList.add("hide");
    pauseButton.classList.remove("hide");
  }
});

pauseButton.addEventListener("click", () => {
  pauseTimer();
});

stopButton.addEventListener("click", () => {
  pauseTimer();
  seconds.textContent = "00";
  minutes.textContent = "00";
});

incrementButton.addEventListener("click", () => {
  minutes.textContent = `${Number(minutes.textContent) + 5}`.padStart(2, 0);
});

decrementButton.addEventListener("click", () => {
  if (Number(minutes.textContent) > 0) {
    minutes.textContent = `${Number(minutes.textContent) - 5}`.padStart(2, 0);
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
