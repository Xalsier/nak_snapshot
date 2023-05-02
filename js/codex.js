function populateSelect(yamlData, selectorId) {
  const selector = document.getElementById(selectorId);
  selector.innerHTML = '';
  yamlData.items.forEach((item) => {
    const option = document.createElement('option');
    option.value = `${yamlData.path}/${item.file}`;
    option.text = item.title;
    if (item.key) {option.setAttribute('data-key', item.key);}selector.appendChild(option);});}
function fetchAndPopulate(yamlData, selectorId, filterKey, filterValue) {
  fetch('yaml/data.yaml').then((response) => response.text()).then((yamlText) => jsyaml.load(yamlText)).then((data) => {
      let path, items = [];
      if (filterKey === 'volumes') {path = data.chapters.path;items = data.chapters.volumes[filterValue].items;
      } else if (filterKey === 'collections') {path = data.pages.path;items = data.pages.collections[filterValue].items;}
      populateSelect({ path, items }, selectorId);});}
if (document.getElementById('collection-list')) {
  fetch('yaml/data.yaml')
    .then((response) => response.text())
    .then((yamlText) => jsyaml.load(yamlText))
    .then((data) => {
      const collectionList = Object.keys(data.pages.collections);
      collectionList.forEach((collection) => {
        const option = document.createElement('option');
        option.value = collection;
        option.text = collection;
        document.getElementById('collection-list').appendChild(option);});
      fetchAndPopulate(data.pages, 'page-list', 'collections', collectionList[0]);});
  document.getElementById('collection-list').addEventListener('change', function () {const selectedCollection = this.value;
    fetch('yaml/data.yaml').then((response) => response.text()).then((yamlText) => jsyaml.load(yamlText)).then((data) => {fetchAndPopulate(data.pages, 'page-list', 'collections', selectedCollection);});});}
if (document.getElementById('page-list')) {
  const pageSelector = document.getElementById('page-list');
  pageSelector.addEventListener('change', function () {
    const selectedItem = this.options[this.selectedIndex];
    const filePath = selectedItem.value;
    const key = selectedItem.getAttribute('data-key');
    displayContent('page-content', filePath, key);});
  pageSelector.addEventListener('DOMNodeInserted', function () {
    if (this.options.length > 0) {
      this.selectedIndex = 0;
      const filePath = this.options[0].value;
      const key = this.options[0].getAttribute('data-key');
      displayContent('page-content', filePath, key);
      this.removeEventListener('DOMNodeInserted', arguments.callee);}});}
function displayContent(contentId, filePath, key = null) {
  if (key) {if (!sessionStorage.getItem(key)) {filePath = '';}}
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      const md = new markdownit();
      const content = document.getElementById(contentId);
      content.innerHTML = md.render(data);}).catch(error => {console.error('Error fetching content:', error);});}