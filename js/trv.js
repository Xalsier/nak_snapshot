const contentWarningToggle = document.querySelector('#content-warning-toggle');
const footerToggle = document.querySelector('#toggle-footer');
const calendarToggle = document.querySelector('#cal-toggle');
if (contentWarningToggle && footerToggle && calendarToggle) { // null-checking
    contentWarningToggle.addEventListener('change', () => { // using arrow function
        setTimeout(() => {
            footerToggle.checked = contentWarningToggle.checked;
            calendarToggle.checked = contentWarningToggle.checked;
        }, 1000);
    });
}
const trivia = [
    "Placeholder Trivia 1",
    "<span class='highlight-1'>24544</span>/<span class='highlight-2'>3</span>/<span class='highlight-3'>44°</span>\nA lunar dating system that tracks\nthe lunar <span class='highlight-1'>month</span>, <span class='highlight-2'>phase</span>, and <span class='highlight-3'>angle</span>.",
    "Placeholder Trivia 3",
];
function getTriviaByTime() {
    const date = new Date();
    const index = ((date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds()) % trivia.length; 
    return trivia[index];
}
function displayTrivia() {
    const triviaElement = document.getElementById('warning-text');
    
    if (triviaElement) { // null-checking
        const selectedTrivia = getTriviaByTime();
        triviaElement.innerHTML = selectedTrivia.replace(/\n/g, '<br>');
    }
}
displayTrivia();