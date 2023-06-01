const novel = {};

function getWordCount(paragraphs) {
  if (!Array.isArray(paragraphs)) return 0;
  const converter = new showdown.Converter();
  const div = document.createElement('div');
  return paragraphs.reduce((count, paragraph) => {
    div.innerHTML = converter.makeHtml(paragraph);
    const text = div.textContent || div.innerText || '';
    return count + text.replace(/<[^>]*>/g, '').trim().split(' ').length;
  }, 0);
}

async function fetchNovelData() {
  try {
    const response = await fetch('../vol_dat.json');
    if (response.ok) {
      const data = await response.json();
      Object.assign(novel, data);
      for (const volumeKey in novel) {
        const volume = novel[volumeKey];
        for (const chapterKey in volume.chapters) {
          const chapter = volume.chapters[chapterKey];
          const markdownResponse = await fetch(chapter.filePath);
          if (markdownResponse.ok) {
            const markdownContent = await markdownResponse.text();
            chapter.content = markdownContent;
          } else {
            throw new Error('Failed to fetch chapter: ' + chapterKey);
          }
        }
        const chapters = Object.values(volume.chapters);
        const wordCount = getWordCount(chapters.map((chapter) => chapter.content));
        volume.totalWordCount = wordCount;
      }
    } else {
      throw new Error('Request failed with status ' + response.status);
    }
  } catch (error) {
    console.error('Error fetching novel data:', error);
  }
}

fetchNovelData();

function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function createContentWarning(acceptHandler, declineHandler) {
  const contentWarning = createElementWithText('div', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  contentWarning.className = 'content-warning-2';
  const acceptButton = createElementWithText('button', 'Yes');
  acceptButton.addEventListener('click', acceptHandler);
  const declineButton = createElementWithText('button', 'No');
  declineButton.addEventListener('click', declineHandler);
  contentWarning.append(acceptButton, declineButton);
  return contentWarning;
}

function createVolumeCard(volumeData, state) {
    const volumeCard = document.createElement('div');
    volumeCard.className = 'volume-card';
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';
    const volumeTitle = createElementWithText('h1', volumeData.title);
    const volumeDescription = createElementWithText('p', volumeData.synopsis);
    volumeDescription.className = 'volume-description';
    const totalWordCount = volumeData.totalWordCount;
    const volumeWordCount = createElementWithText('div', `Word Count: ${totalWordCount}`);
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    const volumeImage = document.createElement('img');
    volumeImage.src = volumeData.coverArtUrl;
    const chapterSelect = createElementWithText('select');
    chapterSelect.addEventListener('change', (event) => {
      if (event.target.value !== 'Select a chapter') {
        state.currentChapter = event.target.value;
        state.volumeCardVisible = false;
      }
    });
    const defaultOption = createElementWithText('option', 'Select a chapter');
    defaultOption.value = '';
    chapterSelect.appendChild(defaultOption);
    for (const chapter in volumeData.chapters) {
      const option = createElementWithText('option', chapter);
      option.value = chapter;
      chapterSelect.appendChild(option);
    }
    contentContainer.append(volumeTitle, volumeDescription, volumeWordCount, chapterSelect);
    imageContainer.appendChild(volumeImage);
    volumeCard.append(imageContainer, contentContainer);
    return volumeCard;
}

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
  get currentChapter() { return this._currentChapter; }
  set currentChapter(value) { this._currentChapter = value; this.renderContent(); }
  get currentVolume() { return this._currentVolume; }
  set currentVolume(value) { this._currentVolume = value; this.renderContent(); }
  get volumeCardVisible() { return this._volumeCardVisible; }
  set volumeCardVisible(value) { this._volumeCardVisible = value; this.renderContent(); }
  get contentWarningAccepted() { return this._contentWarningAccepted; }
  set contentWarningAccepted(value) { this._contentWarningAccepted = value; this.renderContent(); }
  
  renderChapterSelect(chapters) {
    const chapterSelect = createElementWithText('select', '');
    const defaultOption = createElementWithText('option', 'Select a chapter');
    defaultOption.value = '';
    chapterSelect.appendChild(defaultOption);
    for (const chapter in chapters) {
      const option = createElementWithText('option', chapter);
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
        () => { document.getElementById('dark-mode-toggle').click(); });
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
    const chapterHeader = createElementWithText('h2', this.currentChapter);
    const markdownContent = chapter.content || [];
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(markdownContent);
    const contentContainer = document.createElement('div');
    contentContainer.innerHTML = htmlContent;
    const elementsToAppend = [chapterSelect, chapterHeader, contentContainer];
    this.chapterContainer.innerHTML = '';
    this.chapterContainer.append(...elementsToAppend);
    const returnButton = createElementWithText('button', 'Return to Volume Select');
    returnButton.addEventListener('click', () => {
      this.volumeCardVisible = true;
      this.currentChapter = '';
    });
    this.chapterContainer.appendChild(returnButton);
  }
} 

const state = new NovelState("第1章", "Volume 1");
state.renderContent();