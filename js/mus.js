const calendarToggle = document.getElementById("cal-toggle");
const darkOverlayToggle = document.getElementById("webnovel-toggle");
const footerToggle = document.getElementById("toggle-footer");
const audio = document.getElementById("background-music");
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const audioControls = document.getElementById('audio-controls');
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
  if (!footerToggle.checked) {
    if (isPlaying) { // If the audio is playing when the footer is toggled off, pause the audio
      fadeOutAudio();
      pauseButton.classList.remove('visible');
      playButton.classList.add('visible');
    }
    playButton.classList.remove('visible');
    pauseButton.classList.remove('visible');
    audioControls.style.pointerEvents = "none"; // Disable pointer events
  } else {
    playButton.classList.add('visible');
    pauseButton.classList.remove('visible');
    audioControls.style.pointerEvents = "auto"; // Enable pointer events
  }
};
toggleFooter();
const fadeOutAudio = () => {
  clearInterval(fadeInInterval);
  fadeOutInterval = setInterval(() => {
    audio.volume = Math.max(audio.volume - 0.05, 0);
    audio.volume === 0 ? (clearInterval(fadeOutInterval), audio.pause(), isPlaying = false) : null;
  }, 100);
};
const fadeInAudio = () => {
  clearInterval(fadeOutInterval);
  audio.currentTime = storedTime;
  audio.play();
  isPlaying = true;
  fadeInInterval = setInterval(() => {
    audio.volume = Math.min(audio.volume + 0.05, 1);
    audio.volume === 1 ? clearInterval(fadeInInterval) : null;
  }, 100);
};
calendarToggle.addEventListener("change", toggleFooter);
darkOverlayToggle.addEventListener("change", toggleFooter);
audio.addEventListener("timeupdate", () => { storedTime = audio.currentTime; });
audioControls.addEventListener('click', () => {
  if(isPlaying) {
      pauseButton.classList.remove('visible');
      playButton.classList.add('visible');
  } else {
      playButton.classList.remove('visible');
      pauseButton.classList.add('visible');
  }
  isPlaying ? fadeOutAudio() : fadeInAudio();
});