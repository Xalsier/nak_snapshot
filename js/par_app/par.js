import { novel } from './nov.js';
import { createContentWarning, createVolumeCard } from './ele.js';
class NovelState {
  constructor(initialChapter, volumeCardVisible = true, contentWarningAccepted = false) {
    this._currentChapter = initialChapter;
    this._volumeCardVisible = volumeCardVisible;
    this._contentWarningAccepted = contentWarningAccepted;
  }
  get currentChapter() {
    return this._currentChapter;
  }
  set currentChapter(value) {
    this._currentChapter = value;
    this.renderContent();
  }
  get volumeCardVisible() {
    return this._volumeCardVisible;
  }
  set volumeCardVisible(value) {
    this._volumeCardVisible = value;
    this.renderContent();
  }
  get contentWarningAccepted() {
    return this._contentWarningAccepted;
  }
  set contentWarningAccepted(value) {
    this._contentWarningAccepted = value;
    this.renderContent();
  }
  renderContent() {
    chapterContainer.innerHTML = '';
    if (!this._contentWarningAccepted) {
      const contentWarning = createContentWarning(
        () => { this.contentWarningAccepted = true; },
        () => { window.location.href = 'https://www.google.com'; }
      );
      chapterContainer.appendChild(contentWarning);
      return;
    }
    if (this._volumeCardVisible) {
      const volumeCard = createVolumeCard(novel["Volume 1"], this);
      chapterContainer.appendChild(volumeCard);
      return;
    }
    const paragraphs = novel["Volume 1"].chapters[this.currentChapter];
    const chapterSelect = createElementWithText('select');
    chapterSelect.addEventListener('change', (event) => {
      const selectedChapter = event.target.value;
      if (selectedChapter !== '') {
        this.currentChapter = selectedChapter;
        this.volumeCardVisible = false;
      }
    });
    const defaultOption = createElementWithText('option', 'Select a chapter');
    defaultOption.value = '';
    chapterSelect.appendChild(defaultOption);
    for (const chapter in novel["Volume 1"].chapters) {
      const option = createElementWithText('option', chapter);
      option.value = chapter;
      option.selected = chapter === this.currentChapter;
      chapterSelect.appendChild(option);
    }
    const chapterHeader = createElementWithText('h2', this.currentChapter);
    const paragraphElements = paragraphs.map(paragraph => createElementWithText('p', paragraph));
    const brElements = Array(paragraphs.length - 1).fill(createElementWithText('br'));
    const elementsToAppend = [chapterSelect, chapterHeader, ...paragraphElements, ...brElements];
    chapterContainer.append(...elementsToAppend);
    const returnButton = createElementWithText('button', 'Return to Volume Select');
    returnButton.addEventListener('click', () => {
      this.volumeCardVisible = true;
    });
    chapterContainer.appendChild(returnButton);
  }
}  
const state = new NovelState("Chapter 1");
const chapterContainer = document.createElement('div');
chapterContainer.className = 'chapter';
document.getElementById('dark-overlay').appendChild(chapterContainer);
function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}
export function getWordCount(paragraphs) {
  if (Array.isArray(paragraphs)) {
    return paragraphs.reduce((count, paragraph) => {
      const words = paragraph.trim().split(' ');
      return count + words.length;
    }, 0);
  }
  return 0;
}
state.renderContent();