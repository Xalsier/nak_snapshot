var contentWarningToggle = document.querySelector('#content-warning-toggle');
var footerToggle = document.querySelector('#toggle-footer'); // Assuming this is the ID of your footer checkbox
var calendarToggle = document.querySelector('#cal-toggle'); // Assuming this is the ID of your calendar checkbox

contentWarningToggle.addEventListener('change', function() {
    var self = this;
    setTimeout(function() {
        footerToggle.checked = self.checked;
        calendarToggle.checked = self.checked;
    }, 1000); // This delay is in milliseconds (1000ms = 1s)
});

var trivia = [
    "Placeholder Trivia 1",
    "The Lotus lunar dating system tracks\nthe <span class='highlight'>current moon</span>, its <span class='highlight'>phase</span>, and its <span class='highlight'>angle</span> in the sky.\nHere's an example: 24544/3/44°",
    "Placeholder Trivia 3",
];

function getRandomTrivia() {
    return trivia[Math.floor(Math.random() * trivia.length)];
}

function displayTrivia() {
    var triviaElement = document.getElementById('warning-text');
    var randomTrivia = getRandomTrivia();
    triviaElement.innerHTML = randomTrivia.replace(/\n/g, '<br>');
}

displayTrivia();
