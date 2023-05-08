const footerContent = `
<div>
<a href="https://github.com/Xalsier/nak_snapshot" target="_blank" class="red-link">(v0.3.7)-snapshot</a>
<p data-translate="footer_text">>Na'kioku © 2023 Xalsier Kitsune. All rights reserved.</p>
<a href="https://twitter.com/Xalsier" target="_blank">
    <img src="./ass/twitter.png" alt="Twitter" width="32" height="32" loading="lazy"></a>
<a href="https://discord.gg/uzPGC2k3kp" target="_blank">
    <img src="./ass/discord.png" alt="Discord" width="32" height="32" loading="lazy"></a>
</div>
<select id="language-selector">
  <option value="en-JP">日本語-ENG</option>
  <option value="ja">日本語</option>
  <option value="en">English</option>
  <option value="es">Español</option>
</select>
`;

function injectFooterWhenScrolled() {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const documentHeight = document.documentElement.offsetHeight;

  if (scrollY > (documentHeight - windowHeight) * 0.8) {
    document.getElementById('footer-placeholder').innerHTML = footerContent;
    window.removeEventListener('scroll', injectFooterWhenScrolled);
    
    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      console.log('Language changed to', selectedLanguage);
      updateText(selectedLanguage, translations);
    });

    loadTranslations().then((loadedTranslations) => {
      translations = loadedTranslations;
      const defaultLanguage = 'en-JP';
      updateText(defaultLanguage, translations);
    });
  }
}

window.addEventListener('scroll', injectFooterWhenScrolled);
