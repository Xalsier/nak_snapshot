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
function enableDisableJavascript(activeWindowNumber) {
  // Use a Map instead of an object
  const scripts = new Map([
    [1, './calendar.js'],
    [2, './novel.js'],
    [3, './codex.js'],
    [4, './pac_app.js'],
  ]);

  // Use Map.prototype.forEach instead of for loop
  scripts.forEach((script, i) => {
    if (i === activeWindowNumber) {
      const scriptElement = document.querySelector(`script[src="${script}"]`);

      if (!scriptElement) {
        const newScript = document.createElement('script');
        newScript.src = script;

        // Add the module type for pac_app.js
        if (i === 4) {
          newScript.type = 'module';
        }

        document.body.appendChild(newScript);
      }
    }
  });
}