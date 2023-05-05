function loadScript(scriptUrl, fallbackUrl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          eval(xhr.responseText);
          callback();
        } else {
          console.error('Failed to load local script: ' + scriptUrl + '. Trying to load from CDN...');
          loadFallbackScript(fallbackUrl, callback);
        }
      }
    }
    xhr.open('GET', scriptUrl, true);
    xhr.send(null);
  }

  function loadFallbackScript(scriptUrl, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptUrl;
    script.onload = callback;
    document.head.appendChild(script);
  }

  loadScript('./js/lib/markdown-it.min.js', 'https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js', function() {
    console.log('markdown-it.min.js loaded');
  });

  loadScript('./js/lib/d3.v6.min.js', 'https://cdn.jsdelivr.net/npm/d3/dist/d3.min.js', function() {
    console.log('d3.v6.min.js loaded');
  });

  loadScript('./js/lib/js-yaml.min.js', 'https://cdn.jsdelivr.net/npm/js-yaml/dist/js-yaml.min.js', function() {
    console.log('js-yaml.min.js loaded');
  });

  loadScript('./js/lib/axios.js', 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', function() {
    console.log('axios.js loaded');
  });

