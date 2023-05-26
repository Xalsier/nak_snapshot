var trivia = [
    "#1. Leo's zodiac sign is.. well.. Leo.",
    "#2. The current moon is 24544. On earth that would be 2045!",
    "#3. Earth Julian date has already been calculated for ya!",
  ];
var randomTrivia = trivia[Math.floor(Math.random() * trivia.length)];
document.getElementById('warning-text').innerHTML = `<p>${randomTrivia}</p>`;