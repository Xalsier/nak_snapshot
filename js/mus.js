document.addEventListener("DOMContentLoaded", function() {
    var calendarToggle = document.getElementById("cal-toggle");
    var darkOverlayToggle = document.getElementById("dark-mode-toggle");
    var footerToggle = document.getElementById("toggle-footer");
    var audio = document.getElementById("background-music");
    var startTime = 1;
    var isPlaying = false;
    var fadeOutInterval;
    var fadeInInterval;
    var storedTime = 0;
    function toggleFooter() {
      var calendarChecked = calendarToggle.checked;
      var darkOverlayChecked = darkOverlayToggle.checked;
      footerToggle.checked = !(calendarChecked || darkOverlayChecked);
      if (isPlaying) {
        fadeOutAudio();
      } else {
        fadeInAudio();
      }
    }
    function fadeOutAudio() {
      clearInterval(fadeInInterval);
      fadeOutInterval = setInterval(function() {
        audio.volume = Math.max(audio.volume - 0.05, 0);
        if (audio.volume === 0) {
          clearInterval(fadeOutInterval);
          audio.pause();
          isPlaying = false;
        }
      }, 100);
    }
    function fadeInAudio() {
      clearInterval(fadeOutInterval);
      audio.currentTime = storedTime || startTime;
      audio.play();
      isPlaying = true;
      fadeInInterval = setInterval(function() {
        audio.volume = Math.min(audio.volume + 0.05, 1);
        if (audio.volume === 1) {
          clearInterval(fadeInInterval);
        }
      }, 100);
    }
    calendarToggle.addEventListener("change", toggleFooter);
    darkOverlayToggle.addEventListener("change", toggleFooter);
    audio.addEventListener("timeupdate", function() {
      storedTime = audio.currentTime;
    });
  });