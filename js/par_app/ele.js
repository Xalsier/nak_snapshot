function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}
export function createContentWarning(acceptHandler, declineHandler) {
  const contentWarning = createElementWithText('div', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  contentWarning.className = 'content-warning-2';
  const acceptButton = createElementWithText('button', 'Yes');
  acceptButton.addEventListener('click', acceptHandler);
  const declineButton = createElementWithText('button', 'No');
  declineButton.addEventListener('click', declineHandler);
  contentWarning.append(acceptButton, declineButton);
  return contentWarning;
}
export function createVolumeCard(volumeData, state) {
  const volumeCard = document.createElement('div');
  volumeCard.className = 'volume-card';
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container';
  const volumeTitle = createElementWithText('h1', volumeData.title);
  const volumeDescription = createElementWithText('p', volumeData.synopsis);
  volumeDescription.className = 'volume-description'; // Add this line to assign the CSS class
  const volumeWordCount = createElementWithText('div', `Word Count: ${volumeData.totalWordCount}`);
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