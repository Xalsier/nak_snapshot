fetch('../mod/footer.html')
  .then(response => response.text())
  .then(html => {document.getElementById('footerContainer').innerHTML = html;})
  .catch(error => {console.error('Error fetching footer.html:', error);})