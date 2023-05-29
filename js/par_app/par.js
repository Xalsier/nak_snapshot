import { novel } from './nov.js';
const state = {
  currentChapter: "Chapter 1",
};
const chapterContainer = document.getElementById('dark-overlay').appendChild(document.createElement('div'));
chapterContainer.className = 'chapter';
function createElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}
function renderContent() {
  const currentChapter = state.currentChapter;
  const paragraphs = novel[currentChapter];
  chapterContainer.innerHTML = '';
  const wordCount = createElement('div', `Word Count: ${getWordCount(paragraphs)}`);
  wordCount.style.float = 'right';
  chapterContainer.appendChild(wordCount);
  const chapterSelect = createElement('select');
  chapterSelect.addEventListener('change', (event) => {
    state.currentChapter = event.target.value;
    renderContent();
  });
  for (const chapter in novel) {
    const option = createElement('option', chapter);
    option.value = chapter;
    option.selected = chapter === currentChapter;
    chapterSelect.appendChild(option);
  }
  chapterContainer.appendChild(chapterSelect);
  const chapterHeader = createElement('h2', currentChapter);
  chapterContainer.appendChild(chapterHeader);
  paragraphs.forEach(paragraph => {
    chapterContainer.appendChild(createElement('p', paragraph));
  });
}
function getWordCount(paragraphs) {
  return paragraphs.reduce((count, paragraph) => {
    const words = paragraph.trim().split(' ');
    return count + words.length;
  }, 0);
}
renderContent();