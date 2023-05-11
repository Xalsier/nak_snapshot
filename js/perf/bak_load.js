const bgImages = [
  '../ass/dat/bak_res1.dat',
  '../ass/dat/bak_res2.dat',
  '../ass/dat/bak_res3.dat',
  '../ass/sera_res4.jpg'
];
const backgroundImage = document.getElementById('background-image');

// Fetch the base64 strings for the dat files
async function fetchBase64Strings() {
  const base64Strings = [];
  for (const src of bgImages.slice(0, 3)) {
    const response = await fetch(src);
    const data = await response.text();
    base64Strings.push(data);
  }
  return base64Strings;
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve();
    };
  });
}

function loadImagesSequentially(images, index) {
  if (index >= images.length) {
    return;
  }

  loadImage(images[index]).then(() => {
    backgroundImage.style.backgroundImage = `url('${images[index]}')`;
    console.log(`Image loaded: ${images[index]}`);
    setTimeout(() => {
      loadImagesSequentially(images, index + 1);
    }, 500); // Adjust the delay as per your preference
  });
}

async function loadImages() {
  const base64Strings = await fetchBase64Strings();
  const updatedBgImages = [...base64Strings, ...bgImages.slice(3)];
  loadImagesSequentially(updatedBgImages, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  loadImages();
});