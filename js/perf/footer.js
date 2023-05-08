const footerContent = `
<div>
<a href="https://github.com/Xalsier/nak_snapshot" target="_blank" class="red-link">(v0.3.7)-snapshot</a>
<p>Na'kioku © 2023 Xalsier Kitsune. All rights reserved.</p>
<a href="https://twitter.com/Xalsier" target="_blank">
    <img src="./ass/twitter.png" alt="Twitter" width="32" height="32" loading="lazy"></a>
<a href="https://discord.gg/uzPGC2k3kp" target="_blank">
    <img src="./ass/discord.png" alt="Discord" width="32" height="32" loading="lazy"></a>
</div>
`;

function injectFooterWhenScrolled() {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const documentHeight = document.documentElement.offsetHeight;

  if (scrollY > (documentHeight - windowHeight) * 0.8) {
    document.getElementById('footer-placeholder').innerHTML = footerContent;
    window.removeEventListener('scroll', injectFooterWhenScrolled);
  }
}

window.addEventListener('scroll', injectFooterWhenScrolled);
