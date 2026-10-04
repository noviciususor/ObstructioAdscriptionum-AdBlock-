(() => {
  const blockedHosts = [
    'chaturbate.com','popads.net','popcash.net','propellerads.com','onclickads.net','adcash.com','hilltopads.net','evadav.com','adsterra.com'
  ];
  const sourceSpecific = {
    'youporn.com': ['chaturbate.com']
  };
  const host = location.hostname.replace(/^www\./,'');
  const hostname = value => {
    try { return new URL(String(value), location.href).hostname.replace(/^www\./,''); } catch { return ''; }
  };
  const isBlocked = value => {
    const h = hostname(value); if (!h) return false;
    if (blockedHosts.some(x => h===x || h.endsWith('.'+x))) return true;
    return (sourceSpecific[host]||[]).some(x => h===x || h.endsWith('.'+x));
  };
  const nativeOpen = window.open;
  window.open = function(url, ...args) {
    if (url && isBlocked(url)) return null;
    return nativeOpen.call(window, url, ...args);
  };
  document.addEventListener('click', e => {
    const a = e.target?.closest?.('a[href]');
    if (a && isBlocked(a.href)) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
})();
