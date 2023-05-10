async function loadFooterHtml() {
  const response = await fetch('../js/perf/footer.html');
  return response.text();
}

async function injectFooter() {
  const footerHtml = await loadFooterHtml();
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHtml;
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
      languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        console.log('Language changed to', selectedLanguage);
        updateText(selectedLanguage, translations);
      });
    }
    const loadedTranslations = await loadTranslations();
    translations = loadedTranslations;
    const defaultLanguage = 'ja';
    updateText(defaultLanguage, translations);
  }
}


window.addEventListener('DOMContentLoaded', () => {
  injectFooter();
});