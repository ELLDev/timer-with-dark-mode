const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
let isCountDownActive = false;

playButton.addEventListener("click", () => {
  isCountDownActive = true;
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
});

pauseButton.addEventListener("click", () => {
  isCountDownActive = false;
  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
});

function countdown() {
  setTimeout(() => {
    if (isCountDownActive) {
      switch (Number(seconds.textContent)) {
        case 1:
          seconds.textContent = "00";
          if (Number(minutes.textContent) === 0) {
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
    countdown();
  }, 1000);
}

countdown();
