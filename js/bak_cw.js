document.addEventListener("DOMContentLoaded", function() {
  const contentWarning = document.getElementById('content-warning');
  const leaveButton = document.getElementById('leave');
  const proceedButton = document.getElementById('proceed');
  const mainContent = document.querySelector('main');

  function showContentWarning() {
    contentWarning.style.display = 'flex';
    mainContent.style.filter = 'blur(10px) grayscale(100%)';
    document.getElementById('background-image').style.filter = 'blur(10px) grayscale(100%)';
    mainContent.style.pointerEvents = 'none';
    contentWarning.style.pointerEvents = 'all';
  }
  
  function removeContentWarning() {
    contentWarning.style.display = 'none';
    mainContent.style.filter = 'blur(0px) grayscale(0%)';
    document.getElementById('background-image').style.filter = 'blur(0px) grayscale(0%)';
    mainContent.style.pointerEvents = 'auto';
    leaveButton.style.display = 'none';
    proceedButton.style.display = 'none';
    changeWindow(currentWindow); // call this function here after user clicks proceed
  }

  leaveButton.addEventListener('click', () => {
    window.location.href = 'https://www.google.com'; // Replace this with the desired URL to redirect to when the user chooses to leave
  });

  proceedButton.addEventListener('click', () => {
    mainContent.classList.add('transition-filters');
    backgroundImage.classList.add('transition-filters');
    removeContentWarning();
  });

  showContentWarning();
});