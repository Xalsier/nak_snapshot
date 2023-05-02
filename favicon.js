const cdns = [
  'https://cdn.discordapp.com/attachments/1098740627191107594/1098755154666328114/Yin_and_Yang_symbol-svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/3/3c/Yin_and_Yang_symbol.svg',];
  async function loadFavicon(index = 0) {
    const favicon = document.querySelector('link[rel="icon"]');
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
    } catch {
      loadFavicon(index + 1);}}
  document.addEventListener('DOMContentLoaded', async () => {await loadFavicon();});