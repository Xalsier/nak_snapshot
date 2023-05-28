"use strict";
// Constants
const LOADING_TIME_MS = 3000;
const SYNC_DELAY_MS = 1000;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const trivia = [
    "Placeholder Trivia 1",
    "<span class='highlight-3'>24544</span>/<span class='highlight-2'>34%</span>\nA lunar dating system that tracks\nthe <span class='highlight-3'>month</span> and <span class='highlight-2'>lumination</span>.",
    "Placeholder Trivia 3",
];
function init() {
    const contentWarningToggle = document.querySelector('#content-warning-toggle');
    const calendarToggle = document.querySelector('#cal-toggle');
    createAndDisplayLoadingBar();
    syncToggleStates(contentWarningToggle, calendarToggle);
    autoCheckWarningToggle(contentWarningToggle);
    displayTrivia();
}
function createAndDisplayLoadingBar() {
    const loadingBar = createLoadingBar();
    document.body.appendChild(loadingBar);
    animateLoadingBar(loadingBar);
}
function createLoadingBar() {
    const loadingBar = document.createElement('div');
    loadingBar.classList.add('loading-bar');
    return loadingBar;
}
function animateLoadingBar(loadingBar) {
    loadingBar.style.transition = 'width ' + LOADING_TIME_MS / 1000 + 's linear';
    requestAnimationFrame(() => {
        loadingBar.style.width = '100%';
    });
    setTimeout(() => {
        document.body.removeChild(loadingBar);
    }, LOADING_TIME_MS);
}
function syncToggleStates(contentWarningToggle, calendarToggle) {
    if (contentWarningToggle && calendarToggle) {
        contentWarningToggle.addEventListener('change', () => {
            setTimeout(() => {
                calendarToggle.checked = contentWarningToggle.checked;
            }, SYNC_DELAY_MS);
        });
    }
}
function autoCheckWarningToggle(contentWarningToggle) {
    setTimeout(() => {
        if(contentWarningToggle) {
            contentWarningToggle.checked = true;
            let event = new Event('change');
            contentWarningToggle.dispatchEvent(event);
        }
    }, LOADING_TIME_MS);
}
function getTriviaByTime() {
    const date = new Date();
    const index = ((date.getHours() * SECONDS_PER_HOUR) + (date.getMinutes() * SECONDS_PER_MINUTE) + date.getSeconds()) % trivia.length; 
    return trivia[index];
}
function displayTrivia() {
    const triviaElement = document.getElementById('warning-text');
    if (triviaElement) {
        const selectedTrivia = getTriviaByTime();
        triviaElement.textContent = ''; // Clear the previous trivia if any
        triviaElement.insertAdjacentHTML('beforeend', selectedTrivia.replace(/\n/g, '<br>'));
    }
}
window.onload = init;