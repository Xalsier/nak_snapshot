"use strict";

function init() {
    const contentWarningToggle = document.querySelector('#content-warning-toggle');
    const calendarToggle = document.querySelector('#cal-toggle');
    const loadingBar = createLoadingBar();
    document.body.appendChild(loadingBar);
    let loadedPercentage = 0;

    const loadingInterval = setInterval(() => {
        loadedPercentage += 1;
        loadingBar.style.width = `${loadedPercentage}%`;

        if (loadedPercentage >= 100) {
            clearInterval(loadingInterval);
            document.body.removeChild(loadingBar);
        }
    }, 30);

    if (contentWarningToggle && calendarToggle) {
        contentWarningToggle.addEventListener('change', () => {
            setTimeout(() => {
                calendarToggle.checked = contentWarningToggle.checked;
            }, 1000);
        });
    }
    
    setTimeout(() => {
        if(contentWarningToggle) {
            contentWarningToggle.checked = true;
            let event = new Event('change');
            contentWarningToggle.dispatchEvent(event);
        }
    }, 3000);

    displayTrivia();
}

function createLoadingBar() {
    const loadingBar = document.createElement('div');
    loadingBar.classList.add('loading-bar');
    return loadingBar;
}

const trivia = [
    "Placeholder Trivia 1",
    "<span class='highlight-3'>24544</span>/<span class='highlight-2'>34%</span>\nA lunar dating system that tracks\nthe <span class='highlight-3'>month</span> and <span class='highlight-2'>lumination</span>.",
    "Placeholder Trivia 3",
];

function getTriviaByTime() {
    const date = new Date();
    const index = ((date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds()) % trivia.length; 
    return trivia[index];
}

function displayTrivia() {
    const triviaElement = document.getElementById('warning-text');
    
    if (triviaElement) {
        const selectedTrivia = getTriviaByTime();
        triviaElement.innerHTML = selectedTrivia.replace(/\n/g, '<br>');
    }
}

window.onload = init;