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
  const cdns = [
    'https://cdn.discordapp.com/attachments/1098740627191107594/1098755154666328114/Yin_and_Yang_symbol-svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/3/3c/Yin_and_Yang_symbol.svg',
  ];
  async function loadFavicon(index = 0) {
    const favicon = document.querySelector('link[rel="icon"]');
    const siteTitle = document.getElementById('site-title');
    if (!favicon || index >= cdns.length) {
      return;
    }
    const img = new Image();
    img.src = cdns[index];
    try {
      await new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
      favicon.href = img.src;
      img.style.width = '2.5rem';
      img.style.height = '2.5rem';
      img.id = 'favicon-img';
      img.style.marginRight = '15px';
      img.classList.add('spin');
      const titleContainer = document.getElementById('title-container');
      titleContainer.insertBefore(img, siteTitle);
    } catch {
      loadFavicon(index + 1);
    }
  }
  document.addEventListener('DOMContentLoaded', async () => {
    await loadFavicon();
  });
