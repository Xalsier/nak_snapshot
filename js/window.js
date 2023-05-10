const NUMBER_OF_WINDOWS = 4;
let currentWindow = 1;

function changeWindow(windowNumber) {
  const windowElement = document.getElementById(`window${windowNumber}`);
  windowElement.classList.add("active");
  windowElement.classList.remove("inactive");
  windowElement.querySelector(".window-content").style.display = 'flex';

  for (let i = 1; i <= NUMBER_OF_WINDOWS; i++) {
    if (i !== windowNumber) {
      const otherWindow = document.getElementById(`window${i}`);
      otherWindow.classList.remove("active");
      otherWindow.classList.add("inactive");
      otherWindow.querySelector(".window-content").style.display = 'none';
    }
  }
  currentWindow = windowNumber;
}

document.addEventListener("DOMContentLoaded", () => {
  changeWindow(currentWindow);
  for (let i = 2; i <= NUMBER_OF_WINDOWS; i++) {
    document.querySelector(`#window${i} .window-content`).style.display = 'none';
  }
});

window.addEventListener('keydown', (e) => {
  if (e.code === "ArrowRight") {
    let nextWindow = currentWindow + 1;
    if (nextWindow > NUMBER_OF_WINDOWS) {
      nextWindow = 1;
    }
    changeWindow(nextWindow);
  } else if (e.code === "ArrowLeft") {
    let previousWindow = currentWindow - 1;
    if (previousWindow < 1) {
      previousWindow = NUMBER_OF_WINDOWS;
    }
    changeWindow(previousWindow);
  }
});

let touchStartX = null;
window.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

window.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].clientX;
  let diffX = touchStartX - touchEndX;
  if (Math.abs(diffX) > 50) { // to ensure that it's a swipe, not a tap
    if (diffX > 0) { // swipe left
      let nextWindow = currentWindow + 1;
      if (nextWindow > NUMBER_OF_WINDOWS) {
        nextWindow = 1;
      }
      changeWindow(nextWindow);
    } else { // swipe right
      let previousWindow = currentWindow - 1;
      if (previousWindow < 1) {
        previousWindow = NUMBER_OF_WINDOWS;
      }
      changeWindow(previousWindow);
    }
  }
});
