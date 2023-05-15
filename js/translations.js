let translations;

async function loadTranslations() {
    const response = await fetch('../translation.json');
    return await response.json();
}

function updateText(language, translations) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        element.innerText = translations[language][translationKey];
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', async (event) => {
            const selectedLanguage = event.target.value;
            if (!translations) {
                translations = await loadTranslations();
            }
            updateText(selectedLanguage, translations);
        });
    }
});
