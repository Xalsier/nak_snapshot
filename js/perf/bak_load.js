const bgImages = [
  '../ass/sera_r0.jpg',
  '../ass/sera_r1.jpg',
  '../ass/sera_r2.jpg',
  '../ass/sera_r3.jpg',
  '../ass/sera_r4.jpg'
];
const backgroundImage = document.getElementById('background-image');
const delay = 500; // Adjust the delay as per your preference
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      console.log(`Image loaded: ${src}`);
      resolve();
    };
  });
}
async function loadImages() {
  for (const src of bgImages) {
    await loadImage(src);
    backgroundImage.style.backgroundImage = `url('${src}')`;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}
document.addEventListener('DOMContentLoaded', () => {loadImages();});