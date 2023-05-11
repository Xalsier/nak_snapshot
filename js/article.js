async function loadHtmlContent(contentAreaId, htmlFile) {
try {const response = await fetch(htmlFile);
if (!response.ok) {throw new Error(`HTTP error ${response.status}: ${response.statusText}`);}document.getElementById(contentAreaId).src = htmlFile;
} catch (error) {console.error('Error loading HTML file:', error);alert('An error occurred while loading the file: ' + error.message);}}
function handleDropdownChange(contentAreaId) {
return function () {const htmlFile = this.value;
if (htmlFile) {loadHtmlContent(contentAreaId, htmlFile);
} else {document.getElementById(contentAreaId).src = '';}};}
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('novel-html-selector').addEventListener('change', handleDropdownChange('novel-content-area'));
document.getElementById('codex-html-selector').addEventListener('change', handleDropdownChange('codex-content-area'));});