fetch('/mod/footer.html')
.then(response => response.text())
.then(html => {
   document.getElementById('footerContainer').innerHTML = html;
   document.getElementById('help-button').addEventListener('click', function() {
      var footer = document.querySelector('footer');
      if (footer.style.bottom === '0px') {
         footer.style.bottom = '-90px';
      } else {
         footer.style.bottom = '0px';
      }
   });
})
.catch(error => {console.error('Error fetching footer.html:', error);})