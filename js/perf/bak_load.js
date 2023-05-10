const bgImages = [
  '../ass/sera_low_res.jpg',
  '../ass/sera_med_res.jpg',
  '../ass/sera_lar_res.jpg',
  '../ass/sera.png'];
const backgroundImage = document.getElementById('background-image');
function loadImage(src) {return new Promise((resolve) => {const img = new Image();
img.src = src;img.onload = () => {resolve();};});}async function loadImages() 
{for (const src of bgImages) {await loadImage(src);backgroundImage.style.backgroundImage = `url('${src}')`;}}
document.addEventListener('DOMContentLoaded', () => {loadImages();});