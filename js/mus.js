const calendarToggle = document.getElementById("cal-toggle");
const darkOverlayToggle = document.getElementById("dark-mode-toggle");
const footerToggle = document.getElementById("toggle-footer");
const audio = document.getElementById("background-music");
const startTime = 1;
let isPlaying = false;
let fadeOutInterval;
let fadeInInterval;
let storedTime = 0;
let delayTimer;
const toggleFooter = () => {
  const calendarChecked = calendarToggle.checked;
  const darkOverlayToggleChecked = darkOverlayToggle.checked;
  footerToggle.checked = !(calendarChecked || darkOverlayToggleChecked);
  delayTimer ? clearTimeout(delayTimer) : null;
  isPlaying ? fadeOutAudio() : delayTimer = setTimeout(() => {
  (!calendarToggle.checked && !darkOverlayToggle.checked) ? fadeInAudio() : null;}, 2000);}
const fadeOutAudio = () => {
  clearInterval(fadeInInterval);
  fadeOutInterval = setInterval(() => {
    audio.volume = Math.max(audio.volume - 0.05, 0);
    audio.volume === 0 ? (clearInterval(fadeOutInterval), audio.pause(), isPlaying = false) : null;}, 100);} 
const fadeInAudio = () => {
  clearInterval(fadeOutInterval);
  audio.currentTime = storedTime || startTime;
  audio.play();
  isPlaying = true;
  fadeInInterval = setInterval(() => {
    audio.volume = Math.min(audio.volume + 0.05, 1);
    audio.volume === 1 ? clearInterval(fadeInInterval) : null;}, 100);}  
calendarToggle.addEventListener("change", toggleFooter);
darkOverlayToggle.addEventListener("change", toggleFooter);
audio.addEventListener("timeupdate", () => {storedTime = audio.currentTime;});