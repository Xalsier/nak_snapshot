export const novel = {};

export function getWordCount(paragraphs) {
  if (Array.isArray(paragraphs)) {
    return paragraphs.reduce((count, paragraph) => {
      const div = document.createElement('div');
      div.innerHTML = new showdown.Converter().makeHtml(paragraph);
      const text = div.textContent || div.innerText || '';
      const words = text.replace(/<[^>]*>/g, '').trim().split(' ');
      return count + words.length;
    }, 0);
  }
  return 0;
}


export async function fetchNovelData() {
  try {
    const response = await fetch('../vol_dat.json');
    if (response.ok) {
      const data = await response.json();
      Object.assign(novel, data);

      // Fetch markdown content for each chapter
      for (const volumeKey in novel) {
        const volume = novel[volumeKey];
        for (const chapterKey in volume.chapters) {
          const chapter = volume.chapters[chapterKey];
          const markdownResponse = await fetch(chapter.filePath);
          if (markdownResponse.ok) {
            const markdownContent = await markdownResponse.text();
            chapter.content = markdownContent;
            console.log(`Chapter ${chapterKey} content:`, markdownContent); // Debug statement
          } else {
            throw new Error('Failed to fetch chapter: ' + chapterKey);
          }
        }
        const chapters = Object.values(volume.chapters);
        console.log(`Chapters for volume ${volumeKey}:`, chapters); // Debug statement
        const wordCount = getWordCount(chapters.map((chapter) => chapter.content));
        console.log(`Word count for volume ${volumeKey}:`, wordCount); // Debug statement
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
