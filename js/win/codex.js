async function fetchData() {
  try {
    const response = await axios.get('../data.yaml');
    return jsyaml.load(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
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

async function updatePageList(collectionKey) {
  const data = await fetchData();
  const path = data.pages.path;
  const items = data.pages.collections[collectionKey].items;
  const selector = document.getElementById('page-list');
  const options = items.map((item) => ({
    value: `${path}/${item.file}`,
    text: item.title,
    key: item.key,
  }));
  updateSelectOptions(selector, options);
}

if (document.getElementById('collection-list')) {
  fetchData().then((data) => {
    const collectionList = Object.keys(data.pages.collections);
    const selector = document.getElementById('collection-list');
    const options = collectionList.map((collection) => ({
      value: collection,
      text: collection,
    }));
    updateSelectOptions(selector, options);
    selector.addEventListener('change', function () {
      updatePageList(this.value);
    });
    updatePageList(collectionList[0]);
  });
}

if (document.getElementById('page-list')) {
  const pageSelector = document.getElementById('page-list');
  pageSelector.addEventListener('change', function () {
    const filePath = this.value;
    const key = this.options[this.selectedIndex].getAttribute('data-key');
    displayContent('page-content', filePath, key);
  });
  const observer = new MutationObserver(function () {
    if (pageSelector.options.length > 0) {
      pageSelector.selectedIndex = 0;
      const filePath = pageSelector.options[0].value;
      const key = pageSelector.options[0].getAttribute('data-key');
      displayContent('page-content', filePath, key);
      observer.disconnect();
    }
  });
  observer.observe(pageSelector, { childList: true });
}

async function displayContent(contentId, filePath, key = null) {
  if (key && !sessionStorage.getItem(key)) {
    filePath = '';
  }
  try {
    const response = await axios.get(filePath);
    const md = new markdownit();
    const content = document.getElementById(contentId);
    content.innerHTML = md.render(response.data);
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}
