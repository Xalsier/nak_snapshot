fetch('../mod/pachinko.html')
  .then(response => response.text())
  .then(html => {document.getElementById('pachinkoContainer').innerHTML = html;})
  .catch(error => {console.error('Error fetching pachinko.html:', error);})

fetch('../mod/footer.html')
  .then(response => response.text())
  .then(html => {document.getElementById('footerContainer').innerHTML = html;})
  .catch(error => {console.error('Error fetching footer.html:', error);})