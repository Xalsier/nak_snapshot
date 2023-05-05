const NUMBER_OF_WINDOWS = 4;
function changeWindow(windowNumber, event) {
  if (event) {
    event.preventDefault();
  }
  const windowElement = document.getElementById(`window${windowNumber}`);
  windowElement.classList.toggle("active", true);
  windowElement.classList.toggle("inactive", false);
  windowElement.querySelector(".window-content").style.display = 'flex';
  for (let i = 1; i <= NUMBER_OF_WINDOWS; i++) {
    if (i !== windowNumber) {
      const otherWindow = document.getElementById(`window${i}`);
      otherWindow.classList.toggle("active", false);
      otherWindow.classList.toggle("inactive", true);
      otherWindow.querySelector(".window-content").style.display = 'none';
    }
  }
  enableDisableJavascript(windowNumber);
}
window.addEventListener('load', () => {
  changeWindow(1, new Event('click'));
  document.getElementById('window1').classList.add('active');
});
document.addEventListener("DOMContentLoaded", () => {
  changeWindow(1);
  for (let i = 2; i <= NUMBER_OF_WINDOWS; i++) {
    document.querySelector(`#window${i} .window-content`).style.display = 'none';
  }
});