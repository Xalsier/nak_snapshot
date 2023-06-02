const novel = [];
const converter = new showdown.Converter();
const div = document.createElement('div');

function getWordCount(paragraphs) {
  if (!Array.isArray(paragraphs)) return 0;
  return paragraphs.reduce((count, paragraph) => {
    div.innerHTML = converter.makeHtml(paragraph);
    const text = div.textContent || div.innerText || '';
    return count + text.replace(/<[^>]*>/g, '').trim().split(' ').length;
  }, 0);
}

async function fetchChapterContent(chapter) {
  try {
    const markdownResponse = await fetch(chapter.filePath);
    if (markdownResponse.ok) {
      const markdownContent = await markdownResponse.text();
      return markdownContent;
    } else {
      throw new Error(`Error loading chapter: ${markdownResponse.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching chapter: ${error}`);
  }
}

async function fetchAllChapters(chapters) {
  return await Promise.all(chapters.map(chapter => {
    if (chapter.title && chapter.filePath) {
      return fetchChapterContent(chapter)
        .then(content => {
          chapter.content = content;
          return chapter;
        });
    } else {
      throw new Error('Invalid chapter data.');
    }
  }));
}

async function fetchNovelData() {
  try {
    const response = await fetch('../vol_dat.json');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        novel.push(...data);
      } else {
        novel.push(data);
      }
      await Promise.all(novel.map(async volume => {
        const volumeData = volume[Object.keys(volume)[0]];
        if (!Array.isArray(volumeData.chapters)) {
          throw new Error('Invalid chapter data for volume: ' + volumeData.title);
        }
        await fetchAllChapters(volumeData.chapters);
        const wordCount = getWordCount(volumeData.chapters.map((chapter) => chapter.content));
        volumeData.totalWordCount = wordCount;
      }));
    } else {
      throw new Error('Request failed with status ' + response.status);
    }
  } catch (error) {
    console.error('Error fetching novel data:', error);
  }
}

class NovelState {
  constructor() {
    this._currentChapter = '';
    this._currentVolume = '';
    this._volumeCardVisible = true;
    this._contentWarningAccepted = false;
    this.chapterContainer = document.createElement('div');
    this.chapterContainer.className = 'chapter';
    document.getElementById('dark-overlay').appendChild(this.chapterContainer);
  }

  set currentChapter(value) {
    this._currentChapter = value;
    this._volumeCardVisible = false; // Hide volume cards when a chapter is selected
    this.renderChapterContent(); // Update the chapter content immediately
  }

  set currentVolume(value) {
    this._currentVolume = value;
    this._volumeCardVisible = false; // Hide volume cards when a volume is selected
    this.renderChapterContent(); // Update the chapter content immediately
  }

  set volumeCardVisible(value) {
    this._volumeCardVisible = value;
    this.renderChapterContent();
  }

  set contentWarningAccepted(value) {
    this._contentWarningAccepted = value;
    this.renderChapterContent();
  }

  renderChapterContent() {
    if (!this._contentWarningAccepted) {
      const contentWarning = createContentWarning(
        () => {
          this.contentWarningAccepted = true;
        },
        () => {
          document.getElementById('webnovel-toggle').click();
        }
      );
      this.chapterContainer.innerHTML = '';
      this.chapterContainer.appendChild(contentWarning);
      return;
    }

    if (!this._volumeCardVisible) {
      const volumeData = novel.find(
        (volume) => volume[Object.keys(volume)[0]].title === this._currentVolume
      );

      if (volumeData) {
        const chapterIndex = volumeData[Object.keys(volumeData)[0]].chapters.findIndex(
          (chapter) => chapter.title === this._currentChapter
        );

        if (chapterIndex !== -1) {
          const converter = new showdown.Converter();
          const htmlContent = converter.makeHtml(
            volumeData[Object.keys(volumeData)[0]].chapters[chapterIndex].content
          );
          const contentContainer = document.createElement('div');
          contentContainer.innerHTML = htmlContent;

          const chapterNavContainer = document.createElement('div');
          chapterNavContainer.className = 'chapter-nav-container';

          const returnButton = createElementWithText('button', 'Return to Volume Select');
          returnButton.addEventListener('click', () => {
            this._volumeCardVisible = true;
            this.renderChapterContent();
          });
          chapterNavContainer.appendChild(returnButton);

          const chapterSelect = document.createElement('select');
          const defaultOption = createElementWithText('option', 'Select a chapter');
          defaultOption.value = '';
          chapterSelect.appendChild(defaultOption);

          const chapters = volumeData[Object.keys(volumeData)[0]].chapters;
          for (let i = 0; i < chapters.length; i++) {
            const option = createElementWithText('option', chapters[i].title);
            option.value = chapters[i].title;
            chapterSelect.appendChild(option);
          }

          chapterSelect.value = this._currentChapter;
          chapterSelect.addEventListener('change', (event) => {
            if (event.target.value !== '') {
              this.currentChapter = event.target.value;
            }
          });

          const previousButton = createElementWithText('button', 'Previous Chapter');
          previousButton.addEventListener('click', () => {
            const previousIndex = chapterIndex - 1;
            if (previousIndex >= 0) {
              this.currentChapter = chapters[previousIndex].title;
            }
          });

          const nextButton = createElementWithText('button', 'Next Chapter');
          nextButton.addEventListener('click', () => {
            const nextIndex = chapterIndex + 1;
            if (nextIndex < chapters.length) {
              this.currentChapter = chapters[nextIndex].title;
            }
          });

          chapterNavContainer.appendChild(chapterSelect);
          chapterNavContainer.appendChild(previousButton);
          chapterNavContainer.appendChild(nextButton);

          this.chapterContainer.innerHTML = '';
          this.chapterContainer.appendChild(chapterNavContainer);
          this.chapterContainer.appendChild(contentContainer);
          return;
        }
      }
    }
    this.chapterContainer.innerHTML = '';
    if (this._contentWarningAccepted) {
      for (const volume of novel) {
        const volumeData = volume[Object.keys(volume)[0]];
        const volumeCard = createVolumeCard(volumeData, this);
        this.chapterContainer.appendChild(volumeCard);
      }
    }
  }
}


function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function createContentWarning(acceptHandler, declineHandler) {
  const contentWarning = document.createElement('div');

  const contentText = createElementWithText('div', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  contentText.className = 'content-warning-text';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'content-warning-buttons';

  const acceptButton = createElementWithText('button', 'Yes');
  acceptButton.addEventListener('click', acceptHandler);

  const declineButton = createElementWithText('button', 'No');
  declineButton.addEventListener('click', declineHandler);

  buttonContainer.appendChild(acceptButton);
  buttonContainer.appendChild(declineButton);

  contentWarning.appendChild(contentText);
  contentWarning.appendChild(document.createElement('br'));
  contentWarning.appendChild(buttonContainer);

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
      state.currentVolume = volumeData.title; // Add this line
    }
  });
  const defaultOption = createElementWithText('option', 'Select a chapter');
  defaultOption.value = '';
  chapterSelect.appendChild(defaultOption);

  if (Array.isArray(volumeData.chapters)) {
    for (const chapter of volumeData.chapters) {
      const option = createElementWithText('option', chapter.title);
      option.value = chapter.title;
      chapterSelect.appendChild(option);
    }
  }

  contentContainer.append(volumeTitle, volumeDescription, volumeWordCount, chapterSelect);
  imageContainer.appendChild(volumeImage);
  volumeCard.append(imageContainer, contentContainer);

  return volumeCard;
}

const state = new NovelState();
fetchNovelData()
  .then(() => {
    console.log('Novel data fetched:', novel);
    state.renderChapterContent();
  })
  .catch((error) => console.error('Error in fetchNovelData:', error));