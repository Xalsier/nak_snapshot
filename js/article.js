async function loadHtmlContent(contentAreaId, htmlFile) {
    try {
      const response = await fetch(htmlFile);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      const htmlContent = await response.text();
      $(`#${contentAreaId}`).attr('src', htmlFile);
    } catch (error) {
      console.error('Error loading HTML file:', error);
      alert('An error occurred while loading the file: ' + error.message);
    }
  }
  
  $(document).ready(function () {
    // Handle the change event for the webnovel dropdown
    $('#novel-html-selector').on('change', function () {
      const htmlFile = $(this).val();
      if (htmlFile) {
        loadHtmlContent('novel-content-area', htmlFile);
      } else {
        $('#novel-content-area').attr('src', '');
      }
    });
  
    // Handle the change event for the codex dropdown
    $('#codex-html-selector').on('change', function () {
      const htmlFile = $(this).val();
      if (htmlFile) {
        loadHtmlContent('codex-content-area', htmlFile);
      } else {
        $('#codex-content-area').attr('src', '');
      }
    });
  });
  