import { novel } from './nov.js';
let currentPage = 1;
let currentChapter = "Chapter 1";
let totalPages = novel[currentChapter].length;
const chapterContainer = document.createElement('div');
chapterContainer.className = 'chapter';
document.getElementById('dark-overlay').appendChild(chapterContainer);

const pageNumberContainer = document.createElement('div');
pageNumberContainer.className = 'page-number';
document.getElementById('dark-overlay').appendChild(pageNumberContainer);

function renderPage() {
  chapterContainer.innerHTML = "";
  const chapterHeader = document.createElement('h2');
  chapterHeader.textContent = currentChapter;
  chapterContainer.appendChild(chapterHeader);
  const page = novel[currentChapter][currentPage - 1];
  
  for (const paragraph of page.content) {
    const para = document.createElement('p');
    para.innerHTML = paragraph;
    chapterContainer.appendChild(para);
    const emptyLine = document.createElement('br');
    chapterContainer.appendChild(emptyLine);
  }
  
  pageNumberContainer.textContent = `Page ${currentPage} of ${totalPages}`;
}

document.getElementById('prev-button').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

document.getElementById('next-button').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

renderPage();