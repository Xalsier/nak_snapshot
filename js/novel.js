function populateSelect(yamlData, selectorId) {
  const selector = document.getElementById(selectorId);
  selector.innerHTML = '';
  yamlData.items.forEach((item) => {
    const option = document.createElement('option');
    option.value = `${yamlData.path}/${item.file}`;
    option.text = item.title;
    if (item.key) {option.setAttribute('data-key', item.key);}selector.appendChild(option);});}
function fetchAndPopulate(yamlData, selectorId, filterKey, filterValue) {
  fetch('../yaml/data.yaml').then((response) => response.text()).then((yamlText) => jsyaml.load(yamlText)).then((data) => {
      let path, items = [];
      if (filterKey === 'volumes') {
        path = data.chapters.path;
        items = data.chapters.volumes[filterValue].items;
        for (const [volume, value] of Object.entries(data.chapters.volumes)) {
          if (value.items) {
            items = items.concat(
              value.items.filter((item) => item.key === filterValue));}}} else if (filterKey === 'chapters') {
        path = data.chapters.path;
        items = data.chapters.volumes[filterValue].items;}
      populateSelect({ path, items }, selectorId);});}
if (document.getElementById('volume-list')) {
  fetch('../yaml/data.yaml').then((response) => response.text()).then((yamlText) => jsyaml.load(yamlText)).then((data) => {
      const volumeList = Object.keys(data.chapters.volumes);
      volumeList.forEach((volume) => {
        const option = document.createElement('option');
        option.value = volume;
        option.text = `Volume ${volume}`;
        document.getElementById('volume-list').appendChild(option);});fetchAndPopulate(data.chapters, 'chapter-list', 'volumes', volumeList[0]);});
  document.getElementById('volume-list').addEventListener('change', function () {fetchAndPopulate(data.chapters, 'chapter-list', 'volumes', this.value);});}
if (document.getElementById('chapter-list')) {
  const chapterSelector = document.getElementById('chapter-list');
  chapterSelector.addEventListener('change', function () {
    const selectedItem = this.options[this.selectedIndex];
    const filePath = selectedItem.value;
    displayContent('chapter-content', filePath);});
  chapterSelector.addEventListener('DOMNodeInserted', function () {
    if (this.options.length > 0) {
      this.selectedIndex = 0;
      const filePath = this.options[0].value;
      displayContent('chapter-content', filePath);
      this.removeEventListener('DOMNodeInserted', arguments.callee);}});}
function displayContent(contentId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {const md = new markdownit();const content = document.getElementById(contentId);content.innerHTML = md.render(data);})
    .catch(error => {console.error('Error fetching content:', error);});}