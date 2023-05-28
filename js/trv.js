"use strict";
// Constants
const LOADING_TIME_MS = 3000;
const INITIAL_LOADING_MS = 2000; // 2 seconds for initial loading up to 80%
const FINAL_LOADING_MS = 1000; // 1 second for final loading from 80% to 100%
const SYNC_DELAY_MS = 1000;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const BACKGROUND_IMAGE_PATH = "./he3.jpg";
const trivia = [
    "Placeholder Trivia 1",
    "<span class='highlight-3'>24544</span>/<span class='highlight-2'>34%</span>\nA lunar dating system that tracks\nthe <span class='highlight-3'>month</span> and <span class='highlight-2'>lumination</span>.",
    "Placeholder Trivia 3",
];
let isBgImageLoaded = false; // Flag for background image load status

function init() {
    const contentWarningToggle = document.querySelector('#content-warning-toggle');
    const calendarToggle = document.querySelector('#cal-toggle');
    createAndDisplayLoadingBar();
    syncToggleStates(contentWarningToggle, calendarToggle);
    displayTrivia();
}

function createAndDisplayLoadingBar() {
    const loadingBar = createLoadingBar();
    document.body.appendChild(loadingBar);
    loadBackgroundImage(loadingBar);
}

function createLoadingBar() {
    const loadingBar = document.createElement('div');
    loadingBar.classList.add('loading-bar');
    return loadingBar;
}

function loadBackgroundImage(loadingBar) {
    let img = new Image();
    img.onload = () => {
        document.body.style.backgroundImage = `url(${BACKGROUND_IMAGE_PATH})`;
        isBgImageLoaded = true; // Set the flag to true when image is loaded
    };
    img.src = BACKGROUND_IMAGE_PATH;
    animateLoadingBar(loadingBar); // Move animateLoadingBar call here
}

function animateLoadingBar(loadingBar) {
    loadingBar.style.width = '0%';
    requestAnimationFrame(() => {
        loadingBar.style.transition = 'width ' + INITIAL_LOADING_MS / 1000 + 's linear';
        loadingBar.style.width = '80%';
    });
    setTimeout(() => {
        if (isBgImageLoaded) {
            loadingBar.style.transition = 'width ' + FINAL_LOADING_MS / 1000 + 's linear';
            loadingBar.style.width = '100%';
            setTimeout(() => {
                finalizeLoading(loadingBar);
            }, FINAL_LOADING_MS);
        }
    }, INITIAL_LOADING_MS);
}

function finalizeLoading(loadingBar) {
    document.body.removeChild(loadingBar);
    autoCheckWarningToggle(document.querySelector('#content-warning-toggle'));
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
    if (contentWarningToggle) {
        contentWarningToggle.checked = true;
        contentWarningToggle.dispatchEvent(new Event('change'));
    }
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
init();