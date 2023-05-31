import { novel } from './nov.js';
import { createContentWarning, createVolumeCard } from './ele.js';
class NovelState {
  constructor(initialChapter, initialVolume, volumeCardVisible = true, contentWarningAccepted = false) {
    this._currentChapter = initialChapter;
    this._currentVolume = initialVolume;
    this._volumeCardVisible = volumeCardVisible;
    this._contentWarningAccepted = contentWarningAccepted;
    this.chapterContainer = document.createElement('div');
    this.chapterContainer.className = 'chapter';
    document.getElementById('dark-overlay').appendChild(this.chapterContainer);
  }
  get currentChapter() {return this._currentChapter;}
  set currentChapter(value) {this._currentChapter = value;this.renderContent();}
  get currentVolume() {return this._currentVolume;}
  set currentVolume(value) {this._currentVolume = value;this.renderContent();}
  get volumeCardVisible() {return this._volumeCardVisible;}
  set volumeCardVisible(value) {this._volumeCardVisible = value;this.renderContent();}
  get contentWarningAccepted() {return this._contentWarningAccepted;}
  set contentWarningAccepted(value) {this._contentWarningAccepted = value;this.renderContent();}
  createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  }
  renderChapterSelect(chapters) {
    const chapterSelect = this.createElementWithText('select', '');
    const defaultOption = this.createElementWithText('option', 'Select a chapter');
    defaultOption.value = '';
    chapterSelect.appendChild(defaultOption);
    for (const chapter in chapters) {
      const option = this.createElementWithText('option', chapter);
      option.value = chapter;
      option.selected = chapter === this.currentChapter;
      chapterSelect.appendChild(option);
    }
    chapterSelect.addEventListener('change', (event) => {
      const selectedChapter = event.target.value;
      if (selectedChapter !== '') {
        this.currentChapter = selectedChapter;
        this.volumeCardVisible = false;
      }
    });
    return chapterSelect;
  }
  renderContent() {
    this.chapterContainer.innerHTML = '';
    if (!this._contentWarningAccepted) {
      const contentWarning = createContentWarning(
        () => { this.contentWarningAccepted = true; },
        () => { document.getElementById('dark-mode-toggle').click(); }
      );
      this.chapterContainer.appendChild(contentWarning);
      return;
    }
    if (this._volumeCardVisible) {
      const volumeCard = createVolumeCard(novel[this.currentVolume], this);
      this.chapterContainer.appendChild(volumeCard);
      return;
    }
    const chapter = novel[this.currentVolume].chapters[this.currentChapter];
    const chapterSelect = this.renderChapterSelect(novel[this.currentVolume].chapters);
    const chapterHeader = this.createElementWithText('h2', this.currentChapter);
    const markdownContent = chapter.content || [];
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(markdownContent);
    const contentContainer = document.createElement('div');
    contentContainer.innerHTML = htmlContent;
    const elementsToAppend = [chapterSelect, chapterHeader, contentContainer];
    this.chapterContainer.innerHTML = '';
    this.chapterContainer.append(...elementsToAppend);
    const returnButton = this.createElementWithText('button', 'Return to Volume Select');
    returnButton.addEventListener('click', () => {
      this.volumeCardVisible = true;
      this.currentChapter = '';
    });
    this.chapterContainer.appendChild(returnButton);
  }
} 
const state = new NovelState("第1章", "Volume 1");
state.renderContent();