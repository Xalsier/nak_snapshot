let translations;

// Load the translations
async function loadTranslations() {
    const response = await fetch('./translations.yaml');
    const yamlText = await response.text();
    const translations = jsyaml.load(yamlText);
  
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
      languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        console.log('Language changed to', selectedLanguage);
        updateText(selectedLanguage, translations);
      });
    }
      
    return translations;
  }
  

function updateText(language, translations) {
    console.log('Selected Language:', language);
    console.log('Translations:', translations);
    
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
      const translationKey = element.getAttribute('data-translate');
      element.innerText = translations[language][translationKey];
    });
  }
  

document.addEventListener('DOMContentLoaded', async () => {
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      console.log('Language changed to', selectedLanguage);
      updateText(selectedLanguage, translations);
    });
  }

  translations = await loadTranslations();
  const defaultLanguage = 'ja';
  updateText(defaultLanguage, translations);
});
