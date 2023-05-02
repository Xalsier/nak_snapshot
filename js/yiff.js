const imageFeed = document.getElementById('image-feed');
const filterList = document.getElementById('filter-list');
const cdnStatus = {};
fetch('/yaml/feed.yaml')
  .then(response => response.text())
  .then(yamlText => jsyaml.load(yamlText))
  .then(data => {
    data.images.reverse().forEach(image => {
      image.cdns.forEach(cdn => cdn && (cdnStatus[new URL(cdn).origin] = ''));
    });
    populateSelect(data, filterList);
    filterList.addEventListener('change', () => {
      const selectedTag = filterList.value !== 'All' ? filterList.value : null;
      displayImages(data.images, cdnStatus, selectedTag);
    });
    displayImages(data.images, cdnStatus);
  })
  .catch(error => console.error('Error fetching YAML data:', error));
  function populateSelect(data, selector) {
    if (!data || !selector) {
      console.error('populateSelect: Missing data or selector');
      return;
    }
    if (!data.images && !data.items) {
      console.error('populateSelect: Unable to find images or items in the data');
      return;
    }
    const tags = new Set(['All']);
    if (data.images) {
      data.images.forEach(image => tags.add(image.filter));
    } else if (data.items) {
      data.items.forEach(item => tags.add(item.title));
    }
    selector.innerHTML = [...tags].map(tag => `<option value="${tag}">${tag}</option>`).join('');
  }
  function displayImages(images, cdnStatus, selectedTag = null) {
    imageFeed.innerHTML = ''; // clear the current content before displaying new content
    images.forEach(image => {
      if ((!selectedTag || image.filter === selectedTag) && (!image.accessKey || sessionStorage.getItem(image.accessKey) === 'true')) {
        const cdnStatuses = image.cdns.map(cdn => (cdn ? cdnStatus[new URL(cdn).origin] || '' : 'Block'));
        const unblockedCdnIndex = cdnStatuses.findIndex(status => status !== 'Block');
        const media = image.cdns[0].endsWith('.mp4') ? Object.assign(document.createElement('video'), { controls: true }) : document.createElement('img');
        media.src = unblockedCdnIndex !== -1 && image.cdns[unblockedCdnIndex];
        media.onerror = () => {
          const nextUnblockedCdnIndex = cdnStatuses.findIndex((status, index) => status !== 'Block' && index > unblockedCdnIndex);
          nextUnblockedCdnIndex !== -1 && (media.src = image.cdns[nextUnblockedCdnIndex]);
        };
        const imgContainer = Object.assign(document.createElement('div'), { className: 'img-container' });
        imgContainer.append(media, Object.assign(document.createElement('p'), { textContent: image.text }));
        imageFeed.appendChild(imgContainer);
      }
    });
  }