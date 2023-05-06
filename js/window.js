const NUMBER_OF_WINDOWS = 4;

function changeBodyBackground(windowNumber) {
  const bodyElement = document.getElementById("my-body");
  bodyElement.classList.remove("background-window1", "background-window2", "background-window3", "background-window4");
  bodyElement.classList.add(`background-window${windowNumber}`);
}

function changeWindow(windowNumber, event) {
  if (event) {
    event.preventDefault();
  }
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
  changeBodyBackground(windowNumber);
}

function handleWindowClick(event) {
  const target = event.target.closest(".window");
  if (target) {
    const windowNumber = Number(target.id.replace("window", ""));
    changeWindow(windowNumber, event);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  changeWindow(1);

  for (let i = 2; i <= NUMBER_OF_WINDOWS; i++) {
    document.querySelector(`#window${i} .window-content`).style.display = 'none';
  }

  document.body.addEventListener('click', handleWindowClick);
});
