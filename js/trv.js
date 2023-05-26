var trivia = [
    "Leo's zodiac sign is.. well.. Leo.",
    "The current moon year is 24544. Converted to Earth years, that would be 2045!",
    "The Earth Julian date has already been calculated for you!",
];
function getRandomTrivia() {
    return trivia[Math.floor(Math.random() * trivia.length)];
}
function displayTrivia() {
    var triviaElement = document.getElementById('warning-text');
    triviaElement.textContent = getRandomTrivia();
}
displayTrivia();
