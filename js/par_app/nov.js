import { getWordCount } from './par.js';
export const novel = {
  "Volume 1": {
    title: "Volume 1 Title",
    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris gravida.",
    coverArtUrl: "../../nov.jpg", 
    chapters: {
      "第1章": [
        "Please ignore this I'm trying to get the webnovel parser to work",
        "Pellentesque euismod massa et scelerisque lobortis.",
        "Please ignore this I'm trying to get the webnovel parser to work",
        "Pellentesque euismod massa et scelerisque lobortis.",
        //...
      ],
      "第2章": [
        "Aliquam consectetur enim nec lobortis pellentesque.",
        "Cras hendrerit odio sed ante dictum, sit amet hendrerit velit porttitor.",
        "Aliquam consectetur enim nec lobortis pellentesque.",
        "Cras hendrerit odio sed ante dictum, sit amet hendrerit velit porttitor.",
        //...
      ],
      //...
    },
    get totalWordCount() {
      return Object.values(this.chapters).reduce((total, chapter) => total + getWordCount(chapter), 0);
    },
  },
  // Additional volumes go here...
};