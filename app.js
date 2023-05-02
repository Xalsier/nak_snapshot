function changeWindow(windowNumber, event) {
  if (event) {
    event.preventDefault(); // prevent default behavior of anchor tags
  }

  const windowElement = document.getElementById(`window${windowNumber}`);
  windowElement.classList.add("active");
  windowElement.classList.remove("inactive");
  const windowContentElement = windowElement.querySelector(".window-content");
  windowContentElement.style.display = 'flex';

  for (let i = 1; i <= 5; i++) {
    if (i !== windowNumber) {
      const otherWindow = document.getElementById(`window${i}`);
      otherWindow.classList.remove("active");
      otherWindow.classList.add("inactive");
      const otherWindowContent = otherWindow.querySelector(".window-content");
      otherWindowContent.style.display = 'none';
    }
  }
  enableDisableJavascript(windowNumber);
  activeWindow = windowNumber;
}

window.addEventListener('load', function() {
  changeWindow(1, new Event('click'));
  const firstWindow = document.getElementById('window1');
  firstWindow.classList.add('active');
});


document.addEventListener("DOMContentLoaded", () => {
  changeWindow(1);
  for (let i = 2; i <= 5; i++) {
    const otherWindowContent = document.querySelector(`#window${i} .window-content`);
    otherWindowContent.style.display = 'none';
  }
});

function enableDisableJavascript(activeWindowNumber) {
  const scripts = {
    1: '/js/calendar.js',
    2: '/js/novel.js',
    3: '/js/codex.js',
    4: '/js/yiff.js',
    5: '/js/pachinko.js',
  };
  for (let i = 1; i <= 4; i++) {
    const scriptElement = document.querySelector(`script[src="${scripts[i]}"]`);
    if (i === activeWindowNumber) {
      if (!scriptElement) {
        const newScript = document.createElement('script');
        newScript.src = scripts[i];
        document.body.appendChild(newScript);
      }
    }
  }
}