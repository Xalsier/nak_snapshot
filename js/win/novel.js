async function fetchData() {
  try {
    const response = await axios.get('../data.yaml');
    return jsyaml.load(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function displayContent(contentId, filePath) {
  try {
    const response = await axios.get(filePath);
    const md = new markdownit();
    const content = document.getElementById(contentId);
    content.innerHTML = md.render(response.data);
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}
function updateSelectOptions(selector, options) {
  selector.innerHTML = '';
  options.forEach((optionData) => {
    const option = document.createElement('option');
    option.value = optionData.value;
    option.text = optionData.text;
    if (optionData.key) option.setAttribute('data-key', optionData.key);
    selector.appendChild(option);
  });
}
async function updateChapterList(volumeKey) {
  const data = await fetchData();
  const path = data.chapters.path;
  const items = data.chapters.volumes[volumeKey].items;
  const selector = document.getElementById('chapter-list');
  const options = items.map((item) => ({
    value: `${path}/${item.file}`,
    text: item.title,
    key: item.key,
  }));
  updateSelectOptions(selector, options);
}
if (document.getElementById('volume-list')) {
  fetchData().then((data) => {
    const volumeList = Object.keys(data.chapters.volumes);
    const selector = document.getElementById('volume-list');
    const options = volumeList.map((volume) => ({
      value: volume,
      text: `Volume ${volume}`,
    }));
    updateSelectOptions(selector, options);
    selector.addEventListener('change', function () {
      updateChapterList(this.value);
    });
    updateChapterList(volumeList[0]);
  });
}
if (document.getElementById('chapter-list')) {
  const chapterSelector = document.getElementById('chapter-list');
  chapterSelector.addEventListener('change', function () {
    const filePath = this.value;
    displayContent('chapter-content', filePath);
  });
  const observer = new MutationObserver(function () {
    if (chapterSelector.options.length > 0) {
      chapterSelector.selectedIndex = 0;
      const filePath = chapterSelector.options[0].value;
      displayContent('chapter-content', filePath);
      observer.disconnect();
    }
  });
  observer.observe(chapterSelector, { childList: true });
}