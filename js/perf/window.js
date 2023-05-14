const NUMBER_OF_WINDOWS = 3;
let currentWindow = 1;
function makeWindowsVisible() {
for (let i = 1; i <= NUMBER_OF_WINDOWS; i++) {document.getElementById(`window${i}`).style.display = 'inline-block';}}
function changeWindow(windowNumber) {
  const windowElement = document.getElementById(`window${windowNumber}`);
  windowElement.classList.add("active");
  windowElement.classList.remove("inactive");
  windowElement.querySelector(".window-content").style.display = 'flex';
  windowElement.setAttribute('aria-live', 'assertive');
  windowElement.focus();
  for (let i = 1; i <= NUMBER_OF_WINDOWS; i++) {
    if (i !== windowNumber) {const otherWindow = document.getElementById(`window${i}`);
      otherWindow.classList.remove("active");
      otherWindow.classList.add("inactive");
      otherWindow.querySelector(".window-content").style.display = 'none';
      otherWindow.setAttribute('aria-live', 'polite');}}currentWindow = windowNumber;}
document.addEventListener("DOMContentLoaded", () => {changeWindow(currentWindow);
  for (let i = 2; i <= NUMBER_OF_WINDOWS; i++) {document.querySelector(`#window${i} .window-content`).style.display = 'none';}
  const proceedButton = document.getElementById('proceed');
  if (proceedButton) {proceedButton.addEventListener('click', () => {makeWindowsVisible();});}});
window.addEventListener('keydown', (e) => {
  if (e.code === "ArrowRight" || e.code === "Tab") {e.preventDefault();
    let nextWindow = currentWindow + 1;
    if (nextWindow > NUMBER_OF_WINDOWS) {nextWindow = 1;}changeWindow(nextWindow);
  } else if (e.code === "ArrowLeft" || e.shiftKey && e.code === "Tab") {e.preventDefault();
    let previousWindow = currentWindow - 1;
    if (previousWindow < 1) {previousWindow = NUMBER_OF_WINDOWS;}changeWindow(previousWindow);}});
let touchStartX = null;
window.addEventListener('touchstart', (e) => {touchStartX = e.changedTouches[0].clientX;});
window.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].clientX;
  let diffX = touchStartX - touchEndX;
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      let nextWindow = currentWindow + 1;
      if (nextWindow > NUMBER_OF_WINDOWS) {nextWindow = 1;}changeWindow(nextWindow);
    } else {let previousWindow = currentWindow - 1;
      if (previousWindow < 1) {previousWindow = NUMBER_OF_WINDOWS;}changeWindow(previousWindow);}}});