// bak_load.js

const bgImages = [
  '../ass/sera_low_res.jpg',
  '../ass/sera_med_res.jpg',
  '../ass/sera_lar_res.jpg',
  '../ass/sera.png'
];
const backgroundImage = document.getElementById('background-image');

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve();
    };
  });
}

async function loadImages() {
  for (const src of bgImages) {
    await loadImage(src);

    // Update the background-image element as images load
    backgroundImage.style.backgroundImage = `url('${src}')`;
    backgroundImage.style.backgroundSize = 'cover';
    backgroundImage.style.backgroundRepeat = 'no-repeat';
    backgroundImage.style.backgroundPosition = 'center center';
    backgroundImage.style.position = 'fixed';
    backgroundImage.style.width = '100%';
    backgroundImage.style.height = '100%';
    backgroundImage.style.zIndex = '-1';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadImages();
});
