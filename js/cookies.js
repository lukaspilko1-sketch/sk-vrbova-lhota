(function () {
  if (localStorage.getItem('cookieConsent') === 'true') return;

  var bar = document.createElement('div');
  bar.id = 'cookie-bar';
  bar.innerHTML =
    '<span>Tento web používá pouze technické cookies nezbytné pro svůj provoz. ' +
    'YouTube videa jsou přehrávána přes youtube-nocookie.com.</span>' +
    '<button id="cookie-bar-btn">Rozumím</button>';

  bar.style.cssText =
    'position:fixed;bottom:0;left:0;right:0;background:#0a1c35;color:#fff;' +
    'padding:14px 24px;display:flex;align-items:center;justify-content:space-between;' +
    'gap:16px;z-index:9999;font-size:0.88em;box-shadow:0 -2px 12px rgba(0,0,0,.25);' +
    'font-family:system-ui,sans-serif;';

  document.body.appendChild(bar);

  document.getElementById('cookie-bar-btn').style.cssText =
    'background:#2f8f4e;color:#fff;border:none;padding:8px 20px;cursor:pointer;' +
    'border-radius:5px;white-space:nowrap;font-weight:700;font-size:.85em;flex-shrink:0;';

  document.getElementById('cookie-bar-btn').addEventListener('click', function () {
    bar.style.display = 'none';
    localStorage.setItem('cookieConsent', 'true');
  });
})();
