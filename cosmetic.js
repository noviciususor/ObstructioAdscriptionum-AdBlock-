(() => {
  const selectors = [
    'iframe[src*="doubleclick.net"]','iframe[src*="googlesyndication.com"]','iframe[src*="exoclick.com"]','iframe[src*="trafficjunky"]','iframe[src*="juicyads"]',
    '[data-ad-container="true"]','[data-ad-slot]','[data-ad-unit]','[aria-label="Advertisement"]','[id^="google_ads_"]','[id^="div-gpt-ad-"]'
  ];
  const clean = root => {
    for (const s of selectors) {
      try { root.querySelectorAll?.(s).forEach(el => el.remove()); } catch {}
    }
  };
  clean(document);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType===1 && clean(n))))
    .observe(document.documentElement || document, {subtree:true, childList:true});
})();
