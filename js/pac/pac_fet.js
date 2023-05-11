fetch('../mod/pachinko.html')
  .then(response => response.text())
  .then(html => {document.getElementById('pachinkoContainer').innerHTML = html;return import('./pac_app.js');})
  .catch(error => {console.error('Error fetching pachinko.html:', error);})
  .catch(error => {console.error('Error importing pac_app.js:', error);});